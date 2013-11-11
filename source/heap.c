/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review


#include "includes.h"

//#define XHEAP 
// using the external heap


// heap sizes 

//int regularHeapSizes[] ={40,3000}; for stimulating the fortscott bug
int regularHeapSizes[] ={1000,3000};
int tenuredHeapSizes[] ={15000,800000};
int serializeNodes = 100000;
int serializeBufferSize = 5000; // in kilobytes; must fit in tenured heap
int whichHeapSize = 0;


// THE INITIAL HEAP SIZES
// in kilobytes
// for normal shipment: 400; 3000 is for TIGER work
int regular_heap_size;//= 3000; // in kilobytes
int external_heap_size = 2000;
// for normal shipment: 5000; 500000 is for TIGER work
int tenured_heap_size;// = 800000;
int ob_stack_size = 40;

int forceTenure = 0;

int deltaEnabled = 0; //compute deltas on the tenured heap
int allocDelta = 1; // allocate the delta block



// The ref_stack maintains references from the C stack to the heap
// push and pop 

void*** ob_stack;
int ob_stack_ptr;

#define max_r_heaps 10
#define max_t_heaps 10


int tenuring_enabled = 1;
int sweep_verbose  = 0;
int sweep_extra_verbose = 0;

int now_in_gc = 0;

int gc_verbose = 0;
int gc_announce = 0;
int gc_verbose_mod = 1;  // applies to both gc_verbose and gc_announce; only every n gcs reported

/*

int gc_verbose = 0;
int gc_announce = 0;
int gc_verbose_mod = 0;  // applies to both gc_verbose and gc_announce; only every n gcs reported
*/

int alloc_verbose = 0;
int regular_alloc_disabled = 0;
int alloc_disabled = 0;
int gc_count = 0;
int alloc_count = 0;
int sweepingTenured = 0;




int bump_generation = 1; 
R_heap_struct r_heaps[max_r_heaps];
T_heap_struct  t_heaps[max_t_heaps];
// x heap (external heap) contains of "external" content in persistMode
// This heap remains stable (though it may be added to) through transactions,


T_heap_struct x_heap;


void ob_push_check(ob x)
{
//	if ((x ->obkind) == aux_kind) UM_ERROR("Attempt to ob_push an aux");
}

int r_heap_count,t_heap_count;
int t_heap_count = 0;
int multi_t_heaps = 0;

Sarray mk_Sarray(int ln)
{
	Sarray rs;
	rs = (Sarray)malloc(aword_size*(ln+2));
	rs -> capacity = ln;
	rs -> length = 0;
	return rs;
}

Sarray Sarray_add(Sarray x,aword* y)
{
	int cp,ln;aword *cn,*ncn;Sarray rs;
	cp = x->capacity;
	ln = x->length;
    cn = Sarray_contents(x);
	if (ln < cp)
	{
		cn[ln] = (int)y;
		x -> length = ln + 1;
		return x;
	}
	else
	{
		rs = mk_Sarray(ln*2);
		ncn = Sarray_contents(rs);
		memcpy((char*)ncn,(char*)cn,aword_size * ln);
		ncn[ln] = (int)y;
		rs -> length = ln+1;
		return rs;
	}
}




R_heap_struct alloc_R_heap(int sz) //sz in awords  better be a multiple of 2
{
	R_heap_struct rs;aword *hp;
	if (r_heap_count == max_r_heaps) UM_ERROR("too many regular heaps");
	rs = r_heaps[r_heap_count];
	r_heap_count++;
	hp = (aword*)malloc(2*sz*aword_size);
	rs . base = hp;
	rs . middle = hp + sz;
	rs . top = hp + sz * 2;
	rs . next = hp;
	rs . low = 1;
	return rs;
}
// for debugging
int lastBsz;

T_heap alloc_T_heap(int sz) //sz in awords  better be a multiple of 2
{
	T_heap rs;aword *hp;int *bmp,bsz,i;
	if (t_heap_count == max_t_heaps) UM_ERROR("too many tenured heaps");
	if (t_heap_count > 0)
	{
		rs = &(t_heaps[t_heap_count-1]);
		rs -> next = t_next;
		multi_t_heaps = 1;
	}
	rs = &(t_heaps[t_heap_count]);
	t_heap_count++;
	hp = (aword*)malloc(sz*aword_size);
	bsz = WORD_ALIGN(sz/8); // size of bitmap in bytes
	lastBsz = bsz;
	bmp = (int*)malloc(bsz);
	memset(bmp,0,bsz);
//    for (i = 0;i<bszw;i++) bmp[i] = 0;
	rs -> base = hp;
	rs -> top = hp + sz;
	rs -> bitmap = (char*)bmp;
	rs -> next = hp;
	// assume not more then 1/2 of regular heap is pointed to by tenured heap
	rs -> rrefs = (int*)mk_Sarray(256 * regular_heap_size);
	if (allocDelta)
	{
		bmp = (int*)malloc(bsz);
		memset(bmp,0,bsz);
		rs -> modmap = (char*)bmp;
		bmp = (int*)malloc(bsz);
		memset(bmp,0,bsz);
		rs -> obmap = (char*)bmp;
	}

	return rs;
}



void alloc_X_heap(int sz) //sz in awords  better be a multiple of 2
{
	T_heap rs;aword *hp;int *bmp,bsz,i;
	hp = (aword*)malloc(sz*aword_size);
	bsz = WORD_ALIGN(sz/8); // size of bitmap in bytes
	bmp = (int*)malloc(bsz);
	memset(bmp,0,bsz);
//    for (i = 0;i<bszw;i++) bmp[i] = 0;
	x_heap . base = hp;
	x_heap . top = hp + sz;
	x_heap . bitmap = (char*)bmp;
	x_heap . next = hp;
	// assume not more then 1/2 of regular heap is pointed to by tenured heap
	x_heap . rrefs = (int*)mk_Sarray(256 * regular_heap_size);
}

// just linear search for now; shouldn't be many tenured heaps, after all



int* whichHeapf(void* x)
{
   int i;T_heap_struct hp;
#ifdef XHEAP
   hp = x_heap;
   if ((hp.base <= x) && (x < hp.top)) return -1;
#endif
   for (i = 0;i<t_heap_count;i++)
   {
	   hp = t_heaps[i];
	   if ((hp.base <= x) && (x < hp.top)) return i;
   }
   UM_ERROR("Internal error: object not present in any heap");
}



int in_tenured(void* x)
{
   int i;T_heap_struct hp;
   for (i = 0;i<t_heap_count;i++)
   {
	   hp = t_heaps[i];
	   if ((hp.base <= x) && (x < hp.top)) return 1;
   }
   return 0;
}



int in_external(void* x)
{
	return ((x_heap.base <= x) && (x < x_heap.top));
}



// r_dest is the "destination regular heap": the destination of copies

aword *t_base,*t_limit,*t_next,
        *r_base,*r_limit,*r_next,*r_middle,*r_dest_base,*r_dest_limit;

R_heap_struct c_r_heap;
T_heap c_t_heap;
int c_t_heap_index,c_r_heap_index;
Sarray c_rrefs;
int* c_rrefs_c; // for debugging
char* c_refbitmap;

void set_r_heap(R_heap_struct rhp)

{
	c_r_heap = rhp;
	r_next = rhp.next;
	if (rhp.low)
	{
		r_base = rhp.base;
		r_limit = rhp.middle;
		r_dest_base = r_limit;
		r_dest_limit = rhp.top;
	}
	else
	{
		r_base = rhp.middle;
		r_limit = rhp.top;
		r_dest_base = rhp.base;
		r_dest_limit = r_base;
	}
	r_middle = rhp.middle;
}



void set_t_heap(T_heap thp)
{
	c_t_heap = thp;
	t_base = thp->base;
	t_next = thp->next;
	t_limit = thp->top;
	c_rrefs = (Sarray)thp->rrefs;
	c_rrefs_c = Sarray_contents(c_rrefs); // for debugging
	c_refbitmap = thp->bitmap;
}




extern Hashtable string_intern_table;

int allocating_statically = 1;
int allocating_externally = 0;

void sweep_heaps();

string empty_string;

void init_heap()
  {
  regular_heap_size = regularHeapSizes[whichHeapSize];
  tenured_heap_size = tenuredHeapSizes[whichHeapSize];
  set_r_heap(alloc_R_heap(256 * regular_heap_size));
  set_t_heap(alloc_T_heap(256 * tenured_heap_size));
//  alloc_X_heap(256 * external_heap_size); LATER
  ob_stack = (void***)malloc(256 * ob_stack_size);
  ob_stack_ptr = 0;
  allocating_statically = 1;
  memoryAllocated = regular_heap_size + tenured_heap_size + ob_stack_size;

  string_intern_table = mk_StringSet();

  }

void fromXalloc()
{
   set_t_heap(&t_heaps[t_heap_count-1]);
   allocating_externally = 0;
}

void toXalloc()
{
	set_t_heap(&x_heap);
	allocating_externally = 1;
}

int is_rref(ob* x,int hpi)
{
	int xa,bt,w;char *cr;ob *bs;T_heap_struct hp;
	if (hpi < 0) hp = x_heap; else hp = t_heaps[hpi];
	bs = hp.base;
	xa = (int)(x - bs);// in words
	bt = xa % 8;
	w = xa / 8;
    cr = hp.bitmap;
	return cr[w] & (1 << bt);
}
// also declares modified

void set_is_rref(ob* x,int v,int hpi)
{
	int xa,bt,w,bts;char *wp,*cr,wv,nw;ob *bs;T_heap_struct hp;
	if (hpi < 0) hp = x_heap; else hp = t_heaps[hpi];
	bs = hp.base;
	xa = (int)(x - bs);// in words
	bt = xa % 8;
	w = xa / 8;
	bts = 1 << bt;
    cr = hp.bitmap;
	wp = cr + w;
	wv = *wp;
	if (v) nw = wv | bts;
	else nw = wv & (~bts);
	*wp = nw;

    cr = hp.modmap;
	wp = cr + w;
	wv = *wp;
	nw = wv | bts;
	*wp = nw;
}


void declareModifiedf(ob* x,int hpi)
{
	int xa,bt,w,bts;char *wp,*cr,wv,nw;ob *bs;T_heap_struct hp;
	if (hpi < 0) hp = x_heap; else hp = t_heaps[hpi];
	bs = hp.base;
	xa = (int)(x - bs);// in words
	bt = xa % 8;
	w = xa / 8;
	bts = 1 << bt;
    cr = hp.modmap;
	wp = cr + w;
	wv = *wp;
    nw = wv | bts;
	*wp = nw;
}


static int onesInLowBits[] =  {1,3,7,15,31,63,127,255};
static int onesInHighBits[] =  {255,254,252,248,240,224,192,128};



// lw is the low word modified and hg is one past the high word modified
void declareRangeModified(ob* x,int nw,int hpi)
{
	int xa,bt,w,ha,hw,hbt,nfb;char *wp,*cr,wv;ob *bs;T_heap_struct hp;
	if (!deltaEnabled) return;
	if (hpi < 0) hp = x_heap; else hp = t_heaps[hpi];
	bs = hp.base;
	xa = (int)(x - bs);// in words
	bt = xa % 8;
	w = xa / 8;
	ha = xa + nw - 1;
	hbt = ha % 8;
	hw = ha / 8;
	if (hw >= lastBsz)
		printf("TOO BIG");//debugging, obviously
	nfb = hw-w-1; // number of bytes to fill
    cr = hp.modmap;
	if (nfb > 0)
		memset(cr+w+1,255,nfb);
	wp = cr + w;
	// now set the bits in the low byte
	wv = *wp;
	wv = wv | onesInHighBits[bt];
	*wp = wv;
	// and the high byte
	wp = cr + hw;
	wv = *wp;
	wv = wv | onesInLowBits[bt];
	*wp = wv;
}





/* for debugging */

void check_rrefs(hpi)
{
	int i,isr,ln,*cr;ob* r;int k;ob v;T_heap_struct hp;Sarray rr;
	if (hpi < 0) hp = x_heap; else hp = t_heaps[hpi];
	rr = hp.rrefs;
	ln = rr->length;
	cr = Sarray_contents(rr);
	for (i = 0;i<ln;i++)
	{
		r = (ob*)(cr[i]);
		if (!is_rref(r,hpi)) UM_ERROR("IS_RREF FAILURE");
		v = *r;
		if (v)
		{
			if ((!in_regular(v))&& !in_tenured(v)) UM_ERROR("REF IS BAD OB");
			k = v->obkind;
			if (bad_kind(k)) UM_ERROR("BAD REF");
		}
	}
}





// assumes x is a field in a tenured ob
void set_ob_(ob *x,ob y)
{
	ob xv;Sarray rr;int hpi,dmd;T_heap_struct hp;
	int ctn,ntn;
	if (in_Pm_stacks((ob)x)) UM_ERROR("set_ob in PM_STACK");
//	if (((int*)x >= t_base) && ((int*)x < t_limit))
	if (!x) return;
	if (!in_regular(x))
	{
    dmd = 0; // been declared modified (which set_is_rref does)
	xv = *x; 
	ctn =  ((!xv) || (xv->tenured)); //currently tenured
	ntn = ((!y) || (y->tenured)); // will be tenured
    hpi = whichHeap(x);
	if (ctn && !ntn && !is_rref(x,hpi))
	{
		// sanity check;take out when everything is working
		if ((!now_in_gc) && !in_regular(y)) UM_ERROR("Internal gc error:y should be in regular");
        hp = t_heaps[hpi];
		rr = hp.rrefs;
		rr = Sarray_add(rr,(aword*) x);
		set_is_rref(x,1,hpi);
		dmd = 1;
	}
	if (deltaEnabled && !dmd) declareModifiedf(x,hpi);
	}
	if (x) *x = y;
}



    

// testing flags

int gc_test = 0; // runs gcs at intervals determined by the various gc_test_ flags
int gc_test_sweep_only = 1; // only sweeps - no gc
int gc_sweep = 0;  // always sweep just after each gc
int gc_test_alloc = 0;
int gc_test_alloc_mod = 1;
int sweep_test = 1; // runs sweep_heaps at intervals determined by the various gc_test_ flags
int sweep_test_alloc = 0;
int sweep_test_gc = 0;// do sweeps as part of every gc
void gc();
void test_gc();
int allocNewHeapVerbose = 1;
//min_size in kilobytes
void allocTenuredMemory(int min_size)
{
	int new_size,new_memory;T_heap nhp;

	 if ((memoryAllocated + min_size) > maxMemory)
	 {
		 if (cgiMode) emitHtmlHeader();
		 printf("OUT OF MEMORY\n");
		 fablQuit();
	 }
     if (min_size > tenured_heap_size) 
		 new_size = min_size + tenured_heap_size/2;
	 else
	     new_size = tenured_heap_size + tenured_heap_size/2;	 
	 new_memory = memoryAllocated + new_size;
	 if (new_memory > maxMemory) new_size = maxMemory - memoryAllocated;
     nhp = alloc_T_heap(256 * new_memory); 
	 set_t_heap(nhp);
	 memoryAllocated = new_memory;
	 if (allocNewHeapVerbose) printf("Allocated heap of size %d kb\n",new_size);
}
	  
// n in bytes; dw means should be allocated on a double word boundary

ob t_heap_alloc(int n,int dw)
{
ob rs;int na,i,new_size,min_size,new_memory;ob rso;T_heap nhp;
  if (gc_test && gc_test_alloc && !regular_alloc_disabled && ((alloc_count%gc_test_alloc_mod)==0)) test_gc();
  if (sweep_test && sweep_test_alloc && !sweep_test_gc) sweep_heaps();
  na = (n+3)/4; // allocate enough words to hold n bytes
  if ((na + t_next) >= t_limit) 
	 {
     if (na > 256 * tenured_heap_size) 
		 min_size = (na/256) + 1;
	 else min_size = 10; // don't bother with less than 10k
	 if ((memoryAllocated + min_size) > maxMemory)
	 {
		 if (cgiMode) emitHtmlHeader();
		 printf("OUT OF MEMORY\n");
		 fablQuit();
	 }
	 allocTenuredMemory(min_size);

	 }
	  
  if (alloc_verbose) printf("Allocating %d words from tenured heap at %d\n",na,t_next-t_base);
  if (dw && ((((int)t_next)%8)!=0))
  {
	  *t_next=0;
	  t_next++;
  }
  rs = (ob)t_next;
  if (((int)rs)==0x2e313b0) 
  {
	  printf("problem alloc\n");
  }
  t_next = t_next  + na;
  //zero the fellow
   memset(rs,0,na * aword_size);

  rso = (ob)rs;
  rso -> tenured = 1;
  alloc_count++;
  if (deltaEnabled) declareRangeModified(rs,na,t_heap_count-1);
  return rs;
}


ob x_heap_alloc(int n,int dw)
{
ob rs;int na,i,new_size,min_size,new_memory;ob rso;T_heap nhp;
  if (gc_test && gc_test_alloc && !regular_alloc_disabled && ((alloc_count%gc_test_alloc_mod)==0)) test_gc();
  if (sweep_test && sweep_test_alloc && !sweep_test_gc) sweep_heaps();
  na = (n+3)/4; // allocate enough words to hold n bytes
  if ((na + t_next) >= t_limit) UM_ERROR("Exhausted External Heap");

  if (alloc_verbose) printf("Allocating %d words from external heap at %d\n",na,t_next-t_base);
  if (dw && ((((int)t_next)%8)!=0))
  {
	  *t_next=0;
	  t_next++;
  }
  rs = (ob)t_next;
  t_next = t_next  + na;
  //zero the fellow
   memset(rs,0,na * aword_size);

  rso = (ob)rs;
  rso -> tenured = 1;
  alloc_count++;
  return rs;
}

int r_bytes_left()
{
	return r_limit - r_next;
}

ob  r_heap_alloc(int n,int dw)
{
ob rs;int na,i;
   if (n > 200000)
	   alloc_count = alloc_count;
	if (regular_alloc_disabled) UM_ERROR("REGULAR ALLOC DISABLED");
  if (gc_test && gc_test_alloc && !regular_alloc_disabled && ((alloc_count%gc_test_alloc_mod)==0)) test_gc();
  na = (n+3)/4; // allocate enough words to hold n bytes
  if ((na + r_next) >= r_limit) gc();
  if ((na + r_next) >= r_limit) return t_heap_alloc(n,dw);
	if (alloc_verbose) printf("Allocating %d words from regular heap at %d\n",na,r_next-r_base);
  if (dw && ((((int)r_next)%8)!=0)) 
  {
	  *r_next=0;
	  r_next++;
  }
  rs = (ob)r_next;
  r_next = r_next  + na;

   //zero the fellow
   memset(rs,0,na * aword_size);

 
  
  alloc_count++;
  return rs;
}


ob last_allocated_ob;
// regular_alloc_disabled is turned on when the gcs would be a bad idea
// (eg during deserialization).  So, the testing flags are overriden in this case.
ob heap_alloc(int n)
{
	if (alloc_disabled) UM_ERROR("REGULAR ALLOC DISABLED");
	if (allocating_externally) last_allocated_ob = x_heap_alloc(n,0); else
	if (allocating_statically) last_allocated_ob =  t_heap_alloc(n,0); else
    last_allocated_ob = r_heap_alloc(n,0);
//	if (persistMode) last_allocated_ob -> persistKind = transientKind;
	return last_allocated_ob;
}
//double word aligned heap alloc
ob dwa_heap_alloc(int n)
{
	if (alloc_disabled) UM_ERROR("REGULAR ALLOC DISABLED");
	if (allocating_statically) last_allocated_ob =  t_heap_alloc(n,1);
	else last_allocated_ob = r_heap_alloc(n,1);
	return last_allocated_ob;
}





// copying 
// copies src to dst.

aword* gccopy_next;
aword* last_r_next;

void gccopy_setup()
{
	last_r_next = r_next;	
	if (c_r_heap.low)
		gccopy_next = c_r_heap.middle;
	else
		gccopy_next = c_r_heap.base;
}


// this is needed if heap sweeping is done; ow not necessary
int zero_after_gccopy = 1;


void gccopy_complete()
{
	if (zero_after_gccopy && last_r_next)
	{
		if (c_r_heap.low)
			memset(c_r_heap.base,0,aword_size * (last_r_next - c_r_heap.base));
		else
			memset(c_r_heap.middle,0,aword_size * (last_r_next - c_r_heap.middle));
	}
	c_r_heap.next = gccopy_next;
	c_r_heap.low = !(c_r_heap.low);
	set_r_heap(c_r_heap);
}

ob gccopy(ob);


void check_ob1(ob pr)
{
	int k,prt,prr;
	if (!pr) return;
		k = (pr->obkind);
		if (bad_kind(k)) UM_ERROR("Ob with bad kind");

		prt = in_tenured(pr);
		prr = in_regular(pr);
		if ((!prt)&&!prr) UM_ERROR("Bad ob");
}

void check_ob(ob pr,ob* x)
{
	ob xv;int hpi,prt,k,xtn;Object xvo;int rg;
	xv = *x;
	if (xv)
	{
		k = (xv->obkind);
		if (bad_kind(k)) UM_ERROR("Ob with bad kind");

		prt = in_tenured(pr);
		xtn = in_tenured(xv);
		rg = in_regular(xv);
		if ((!xtn)&&!rg) UM_ERROR("Bad ob");
		if (in_regular(x)) return;
		hpi = whichHeap(x);
        if (prt && (!xtn) && !is_rref(x,hpi)) UM_ERROR("Missing rref");
	}
}

void Pm_stack_check_ob(ob pr,ob* x)
{
	ob xv;int xtn;
	xv = *x;
	if (xv)
	{
		xtn = in_tenured(xv);
		if ((!xtn)&&!in_regular(xv)) UM_ERROR("Bad ob");
	}
}



#define gc_set_dest()	if (tenure) dst = (ob)t_next; else dst = (ob)gccopy_next




void copy_tag(ob dst,ob src)
{
*((aword*)dst) = *((aword*)src);
((ob)dst)->forwarded=0;
((ob)dst)->generation=bump_generation;
}

void gc_bump_dest(int n,int tenure)
{
if (tenure) t_next = t_next + n; else gccopy_next = gccopy_next + n;
}






ob nstring_gccopy(ob src,int tenure)
{
	ob dst;int ln,bmp,btcp;string s;
	s = (string)src;
	gc_set_dest();
	ln = WORD_ALIGN(s->length);
	btcp = aword_size + ln; // bytes to copy
	bmp = (btcp/4) + 1;
	if (ln == 0) bmp++;
	gc_bump_dest(bmp,tenure);
	copy_tag(dst,src);
	dst->tenured = tenure;
	memcpy(((char*)dst)+aword_size,((char*)s)+aword_size,btcp);
    s-> forwarded = 1; 
	set_forwarded_value(s,dst);
	return dst;
}




int sweep_count = 0;
int sweep_pad_count = 0;
aword* nstring_sweep(aword* src)
{
	int ln,btcp;string s;
	s = (string)src;
	ln = WORD_ALIGN(s->length);
	if (ln == 0) 
		ln = 4;
	if (sweep_extra_verbose) printf("String of length %d\n",s->length);
	btcp = aword_size * 2 + ln; // bytes to copy
	return src + btcp/4;
}



ob boxedint_gccopy(ob src,int tenure)
{
	ob dst;int ln;boxedint s;
	s = (boxedint)src;
	gc_set_dest();
	gc_bump_dest(2,tenure);
	copy_tag(dst,src);
	dst->tenured = tenure;
	((boxedint)dst)->value =s->value;
    s-> forwarded = 1; 
	set_forwarded_value(s,dst);
//	sf = (Forward)s;
	return dst;
}

aword* boxedint_sweep(ob src)
{
	boxedint s;
	s = (boxedint)src;
	if (sweep_extra_verbose) printf("boxedint\n");
	return (aword*)(src + 2);
}



ob boxeddouble_gccopy(ob src,int tenure)
{
	ob dst;int ln;string s;
	s = (string)src;
	gc_set_dest();
	if ((((int)dst)%8)!=0) 
	{
		dst++;
		if (tenure) t_next = t_next+5; else gccopy_next = gccopy_next + 5;
	}
	else
		gc_bump_dest(4,tenure);
	copy_tag(dst,src);
	dst->tenured = tenure;
	((boxeddouble)dst)->value = ((boxeddouble)src)->value;
    s-> forwarded = 1; 
	set_forwarded_value(s,dst);
//	sf = (Forward)s;
	return dst;
}

aword* boxeddouble_sweep(ob src)
{
	if (sweep_extra_verbose) printf("boxeddouble\n");
	if ((((int)src)%8)!=0) printf("boxeddouble not aligned");
	return (aword*)(src + 4);
}



ob Arrayob_gccopy(ob src,int tenure)
{
	Arrayob tsrc,tdst;
	ob dst,nwv,*srcp,*dstp,csrc;
    int bmp,ln,i,cp;
		  
	tsrc = (Arrayob)(src);
	gc_set_dest();
	tdst = (Arrayob)dst;
    tsrc -> forwarded = 1; // 
	ln = tsrc->length;
	cp = tsrc->capacity;
	tdst->length = ln;
	tdst -> capacity = cp;
	bmp = Array_preamble_wsize + cp;
    gc_bump_dest(bmp,tenure);
	copy_tag(dst,src); // copy tag
	dst->tenured = tenure;
//	gccopy_next = gccopy_next + Array_preamble_wsize + ln;   
	// now all of the non-ob data is copied. Recursive calls are now ok.
	set_forwarded_value(src,dst); // fill in forwarding address for src
	srcp = (ob*)(src + Array_preamble_wsize);
	dstp = (ob*)(dst + Array_preamble_wsize);
	for (i = 0;i<ln;i++)
	{
		csrc = *srcp;
		GCCOPY_OB_SLOT(dstp,csrc)
		srcp++;
		dstp++;
	
	}
	return dst;
}


ob Arrayob_sweep(ob src)
{
	Arrayob tsrc;ob* srcp;
    int ln,i,cp;
	ob rs;
	tsrc = (Arrayob)(src);
	ln = tsrc->length;
	cp = tsrc->capacity;
	if (sweep_extra_verbose) printf("Arrayob of length %d\n",ln);
	srcp = (ob*)(src + Array_preamble_wsize);
	for (i = 0;i<ln;i++)
		check_ob(src,srcp+i);
	return src + Array_preamble_wsize + cp;
}


// this works for each of the sequence sorts



ob Seq_gccopy(ob src,int tenure)
{
	Seq tsrc,tdst;ob dst,nwv;		  
	tsrc = (Seq)(src);
	gc_set_dest();
	copy_tag(dst,src);// copy tag
	dst->tenured = tenure;
	tdst = (Seq)dst;
	tdst->pagenumber = tsrc->pagenumber;
	tdst->hashkey = tsrc->hashkey;
    tsrc -> forwarded = 1; //
	set_forwarded_value(src,dst);
	gc_bump_dest(sizeof(Seq_struct)/4,tenure);
	GCCOPY_OB_SLOT(&(tdst->types),tsrc->types)
	GCCOPY_OB_SLOT(&(tdst->parent),tsrc->parent)
	GCCOPY_OB_SLOT((ob*)(&(tdst->data)),(ob)(tsrc->data))

	return dst;
}



ob Values_gccopy(ob src,int tenure)
{
	Values tsrc,tdst;ob dst,nwv;		  
	tsrc = (Values)(src);
	gc_set_dest();
	copy_tag(dst,src);// copy tag
	dst->tenured = tenure;
	tdst = (Values)dst;
	tdst->pagenumber = tsrc->pagenumber;
	tdst->hashkey = tsrc->hashkey;
    tsrc -> forwarded = 1; // 
	set_forwarded_value(src,dst);
	gc_bump_dest(sizeof(Values_struct)/4,tenure);
	GCCOPY_OB_SLOT(&(tdst->types),tsrc->types)
	GCCOPY_OB_SLOT(&(tdst->parent),tsrc->parent)
	GCCOPY_OB_SLOT((ob*)(&(tdst->data)),(ob)(tsrc->data))

	return dst;
}
// checks that the obkind of the sequence and its data agree




ob Seq_sweep(ob src)
{

	Seq tsrc;
    int ln;	
	ob rs;
	tsrc = (Seq)(src);
	check_ob(src,&(tsrc->types));
	check_ob(src,&(tsrc->parent));
	check_ob(src,&(tsrc->data));
	return  src + Seq_wsize;
}




ob Values_sweep(ob src)
{

	Values tsrc;
    int ln;	
	ob rs;
	tsrc = (Values)(src);
	check_ob(src,&(tsrc->types));
	check_ob(src,&(tsrc->parent));
	check_ob(src,&(tsrc->data));
	return  src + Seq_wsize;
}


// linux gcc optimization bug! evidently optimized 
// cp = tsrc->capacity;set_forwarded_value(src,dst);tdst->capacity to 
// tdst->capacity = tsrc->capacity, though set_forwarded_value has smashed it!
ob Arrayint_gccopy(ob src,int tenure)
{
	Arrayint tsrc,tdst;
	ob dst,nwv,csrc;
    int bmp,i,cp,ln;
		  
	tsrc = (Arrayint)(src);
	gc_set_dest();
	tdst = (Arrayint)dst;
    tsrc -> forwarded = 1; // 
	ln = tsrc->length;
	cp = tsrc->capacity;
//	set_forwarded_value(src,dst); // fill in forwarding address for src
	tdst->length = ln;
	tdst -> capacity = cp;
	bmp = Array_preamble_wsize + cp;
    gc_bump_dest(bmp,tenure);
	copy_tag(dst,src); // copy tag
	dst->tenured = tenure;
	memcpy((char*)(dst+Array_preamble_wsize),(char*)(src+Array_preamble_wsize),ln*aword_size);
	set_forwarded_value(src,dst); // fill in forwarding address for src
	return dst;
}



ob Arrayint_sweep(ob src)
{
	Arrayint tsrc;
    int cp;
	tsrc = (Arrayint)(src);
	cp = tsrc->capacity;
	return  src + Array_preamble_wsize + cp;
}




ob Arraydouble_gccopy(ob src,int tenure)
{
	Arraydouble tsrc,tdst;
	ob dst,nwv,csrc;
    int bmp,i,cp,ln;
		  
	tsrc = (Arrayob)(src);
	gc_set_dest();
	tdst = (Arrayob)dst;
    tsrc -> forwarded = 1; // 
	ln = tsrc->length;
	cp = tsrc->capacity;
	tdst->length = ln;
	tdst -> capacity = cp;
	bmp = Arraydouble_preamble_wsize + 2*cp;
    gc_bump_dest(bmp,tenure);
	copy_tag(dst,src); // copy tag
	dst->tenured = tenure;
	memcpy((char*)(dst+Arraydouble_preamble_wsize),(char*)(src+Arraydouble_preamble_wsize),2*ln*aword_size);
	set_forwarded_value(src,dst); // fill in forwarding address for src
	return dst;
}


ob Arraydouble_sweep(ob src)
{
	Arraydouble tsrc;
    int cp;
	tsrc = (Arraydouble)(src);
	cp = tsrc->capacity;
	return  src + Arraydouble_preamble_wsize + 2*cp;
}





ob Arraybyte_gccopy(ob src,int tenure)
{
	Arraybyte tsrc,tdst;
	ob dst,nwv,csrc;
    int bmp,i,cp,ln,cpw;
		  
	tsrc = (Arrayob)(src);
	gc_set_dest();
	tdst = (Arrayob)dst;
    tsrc -> forwarded = 1; // 
	ln = tsrc->length;
	cp = tsrc->capacity;
	cpw = (cp+3)/4;
	tdst->length = ln;
	tdst -> capacity = cp;
	bmp = Array_preamble_wsize + cpw;
    gc_bump_dest(bmp,tenure);
	copy_tag(dst,src); // copy tag
	dst->tenured = tenure;
	memcpy((char*)(dst+Array_preamble_wsize),(char*)(src+Array_preamble_wsize),ln);
	set_forwarded_value(src,dst); // fill in forwarding address for src
	return dst;
}


ob Arraybyte_sweep(ob src)
{
	Arraybyte tsrc;
    int cp,cpw;
	tsrc = (Arraybyte)(src);
	cp = tsrc->capacity;
	cpw = (cp+3)/4;
	return  src + Array_preamble_wsize + cpw;
}


ob Hetarray_gccopy(ob src,int tenure)
{
    Hetarray tsrc,tdst;ob dst,csrc,nwv;int cp,nmaw,sz,ln,i,st;char cann,*san,*dan;ob *srcp,*dstp;	
	tsrc = (Hetarray)src;
	gc_set_dest();
	tdst = (Hetarray)dst;
    cp = tsrc->capacity;
	nmaw = 1+ ((cp-1)/4);
    src-> forwarded = 1; 
    sz = sizeof(Hetarray_struct)+4*(nmaw +cp);
	gc_bump_dest(sz/4,tenure);
	copy_tag(dst,src); 
	dst->tenured = tenure;
	ln = tsrc -> length;
	tdst -> length = ln;
	tdst -> capacity = cp;
	// copy annotation words
	dan = Hetarray_annotations(tdst);
	san = Hetarray_annotations(tsrc);
    memcpy(dan,san,ln);

	dstp = (ob*)(Hetarray_contents(tdst,nmaw));
	srcp = (ob*)(Hetarray_contents(tsrc,nmaw));
	set_forwarded_value(src,dst);

	for (i=0;i<ln;i++)
	{
		cann = san[i];
		st = cann & 3; // storage
		if ((st == storage_ob)||(st == storage_boxeddouble)) 
		{
			csrc = *srcp;
		   GCCOPY_OB_SLOT(dstp,csrc);
		}
		else
		  *dstp = *srcp;
		srcp++;
		dstp++;
	}
	return dst;
}

ob Hetarray_sweep(ob src)
{
    Hetarray tsrc;ob *srcp;int cp,nmaw,sz,ln,i,st;char cann,*san;
	tsrc = (Hetarray)src;
    cp = tsrc->capacity;
	nmaw = 1+ ((cp-1)/4);
    sz = sizeof(Hetarray_struct)+4*(nmaw +cp);
	ln = tsrc -> length;
	// copy annotation words
	san = Hetarray_annotations(tsrc);
	srcp = (ob*)(Hetarray_contents(tsrc,nmaw));
	for (i=0;i<ln;i++)
	{
		cann = san[i];
		st = cann & 3; // storage
		if ((st == storage_ob)||(st == storage_boxeddouble)) 
		check_ob(src,srcp+i);
	}
	return src + (sz/4);
}


ob Smallob_gccopy(ob src,int tenure)
{
	Smallob tsrc,tdst;ob dst,nwv;		  
	tsrc = (Smallob)(src);
	gc_set_dest();
	copy_tag(dst,src);// copy tag
	dst->tenured = tenure;
	tdst = (Smallob)dst;
	tdst->pagenumber = tsrc->pagenumber;
	tdst->hashkey = tsrc->hashkey;
    tsrc -> forwarded = 1; //
	tdst -> sharedProperties = tsrc->sharedProperties;
	set_forwarded_value(src,dst);
	gc_bump_dest(sizeof(Smallob_struct)/4,tenure);
	GCCOPY_OB_SLOT(&(tdst->types),tsrc->types)
	GCCOPY_OB_SLOT(&(tdst->parent),tsrc->parent)
	GCCOPY_OB_SLOT((ob*)(&(tdst->values)),(ob)(tsrc->values))
	GCCOPY_OB_SLOT((ob*)(&(tdst->properties)),(ob)(tsrc->properties))
   
	return dst;
}




ob Smallob_sweep(ob src)
{

	Smallob tsrc;
	tsrc = (Seq)(src);
	check_ob(src,&(tsrc->types));
	check_ob(src,&(tsrc->parent));
	check_ob(src,&(tsrc->values));
	check_ob(src,&(tsrc->properties));
	return  src + (sizeof(Smallob_struct)/4);
}

/*
ob Compactob_gccopy(ob src,int tenure)
{
	Compactob tsrc,tdst;ob dst,nwv;		  
	int ast,nmf,nmaw,i;
	char *anns,*danns;Annotation ann;
	ob *dstvp,*srcvp;
	tsrc = (Compactob)(src);
	gc_set_dest();
	copy_tag(dst,src);// copy tag
	dst->tenured = tenure;
	tdst = (Compactob)dst;
    tsrc -> forwarded = 1; // 
	nmf = tsrc -> compactObNumFields;
	tdst->hashkey = tsrc->hashkey;
	tdst->pagenumber = tsrc->pagenumber;
	anns = Compactob_annotations(tsrc);
	danns = Compactob_annotations(tdst);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	set_forwarded_value(src,dst);
	memcpy(danns,anns,nmf);
	gc_bump_dest(Compactob_annotation_woffset + nmaw + nmf,tenure);
	GCCOPY_OB_SLOT(&(tdst->types),tsrc->types)
	GCCOPY_OB_SLOT(&(tdst->parent),tsrc->parent)
	GCCOPY_OB_SLOT(&(tdst->pages),tsrc->pages)
	GCCOPY_OB_SLOT(&(tdst->extension),tsrc->extension)
	GCCOPY_OB_SLOT(&(tdst->properties),tsrc->properties)
	dstvp  = (ob*)dst + Compactob_annotation_woffset + nmaw;// property values in dst
	srcvp  = (ob*)src + Compactob_annotation_woffset + nmaw;// property values in src
	for (i = 0;i<nmf;i++)
	{
		ann = (Annotation)(anns + i);
		ast = ann->storage;
		if (ast == storage_ob) 
		{GCCOPY_OB_SLOT((ob*)(dstvp + i),(ob)(*(srcvp + i)));}
	    else
			break;
	}
	memcpy((char*)(dstvp+i),(char*)(srcvp+i),4 * (nmf-i));//copy the non-ob property values
    return dst;
}




ob Compactob_sweep(ob src)
{

	Compactob tsrc;
	int ast,nmf,nmaw,i;
	char *anns;Annotation ann;
	ob *srcvp;
	tsrc = (Compactob)(src);
	check_ob(src,&(tsrc->types));
	check_ob(src,&(tsrc->parent));
	check_ob(src,&(tsrc->pages));
	check_ob(src,&(tsrc->extension));
	check_ob(src,&(tsrc->properties));
	nmf = tsrc -> compactObNumFields;
	anns = Compactob_annotations(tsrc);
    ann = (Annotation)(anns + i);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	srcvp  = (ob*)src + Compactob_annotation_woffset + nmaw;// property values in src
	for (i = 0;i<nmf;i++)
	{
		ann = (Annotation)(anns + i);
		ast = ann->storage;
		if (ast == storage_ob) check_ob(src,(ob*)(srcvp + i));
	    else
			break;
	}	
	return  src + Compactob_annotation_woffset + nmaw + nmf;
}


*/



ob Hashtable_gccopy(ob src,int tenure)
{
	Hashtable tsrc,tdst;ob dst,nwv;		  
	tsrc = (Hashtable)(src);
	gc_set_dest();
	copy_tag(dst,src);// copy tag
	dst->tenured = tenure;
	tdst = (Seq)dst;
    tsrc -> forwarded = 1; // 
	tdst->hashkey = tsrc->hashkey;
	tdst->pagenumber = tsrc->pagenumber;
	memcpy((char*)(&(tdst->num_values)),(char*)(&(tsrc->num_values)),12);//num_values,size,and bits
	set_forwarded_value(src,dst);
	gc_bump_dest(sizeof(Hashtable_struct)/4,tenure);
	GCCOPY_OB_SLOT(&(tdst->types),tsrc->types)
	GCCOPY_OB_SLOT(&(tdst->parent),tsrc->parent)
	GCCOPY_OB_SLOT(&(tdst->harray),tsrc->harray)
	GCCOPY_OB_SLOT(&(tdst->goods),tsrc->goods)
	GCCOPY_OB_SLOT(&(tdst->sequencepart),tsrc->sequencepart)

	return dst;
}
// checks that the obkind of the sequence and its data agree




ob Hashtable_sweep(ob src)
{

	Hashtable tsrc;
    int ln;	
	ob rs;
	tsrc = (Hashtable)(src);
	check_ob(src,&(tsrc->types));
	check_ob(src,&(tsrc->parent));
	check_ob(src,&(tsrc->harray));
	check_ob(src,&(tsrc->goods));
	check_ob(src,&(tsrc->sequencepart));
	return  src + sizeof(Hashtable_struct)/4;
}



ob Binding_gccopy(ob src,int tenure)
{
	Binding tsrc,tdst;ob dst,nwv;ObBinding osrc,odst;
	IntBinding isrc,idst;DoubleBinding dsrc,ddst;
	int knd;	  
	tsrc = (Binding)(src);
	gc_set_dest();
	copy_tag(dst,src);// copy tag
	dst->tenured = tenure;
	tdst = (Binding)dst;
    tsrc -> forwarded = 1; // 
	tdst->pagenumber = tsrc->pagenumber;
	set_forwarded_value(src,dst);
	knd = tsrc ->bindingKind;
	if (knd == bindingDoubleKind)
	{gc_bump_dest(sizeof(DoubleBinding_struct)/4,tenure);}
	else
	{gc_bump_dest(sizeof(IntBinding_struct)/4,tenure);}
	GCCOPY_OB_SLOT(&(tdst->parent),tsrc->parent)
	GCCOPY_OB_SLOT(&(tdst->extension),tsrc->extension)
	GCCOPY_OB_SLOT(&(tdst->key),tsrc->key)
	GCCOPY_OB_SLOT(&(tdst->valueType),tsrc->valueType)
    if ((knd == bindingObKind) || (knd == bindingUriKind)||(knd == bindingMultiKind))
	{
		osrc= (ObBinding)src;
		odst = (ObBinding)dst;
		GCCOPY_OB_SLOT(&(odst->value),osrc->value);
	}
	else
	if (knd == bindingIntKind)
	{
		isrc = (IntBinding)src;
		idst = (IntBinding)dst;
		idst->value=isrc->value;
	}
	else
	{
		dsrc = (IntBinding)src;
		ddst = (IntBinding)dst;
		ddst->value=dsrc->value;
	}

	return dst;
}
// checks that the obkind of the sequence and its data agree




ob Binding_sweep(ob src)
{

	Binding tsrc;ObBinding osrc;int knd,vk;ob ov;
	tsrc = (Binding)(src);
	check_ob(src,&(tsrc->parent));
	check_ob(src,&(tsrc->extension));
	check_ob(src,&(tsrc->key));
	check_ob(src,&(tsrc->valueType));
	knd = tsrc ->bindingKind;
    if ((knd == bindingObKind)||(knd == bindingUriKind)) //LATER bindingMultiKind
	{
		osrc= (ObBinding)src;
		ov = osrc->value;
		if (ov)
		{
			vk = ov->obkind;
			if (bad_kind(vk)) print_name(src);
		}
		check_ob(src,&(osrc->value));
	}
	if (knd == bindingDoubleKind)
	return  src + sizeof(DoubleBinding_struct)/4;
	return  src + sizeof(IntBinding_struct)/4;

}

ob Dblock_gccopy(ob src,int tenure)
{
	Dblock tsrc,tdst;//fr for debugging
	ob csrc,nwv;
//	Forward fs;//fs for debugging
	ob dst,*srcp,*dstp;
	int nmo,wsz,cpoff,btoc,i,nmi,nmd;
	gc_set_dest();
	copy_tag(dst,src); // copy tag	
	dst->tenured = tenure;
	tsrc = (Dblock)(src);
	tdst = (Dblock)(dst);
	tdst ->hashkey = tsrc->hashkey;
	tdst -> numints = tsrc->numints; 
	tdst -> numdoubles = tsrc->numdoubles;
    nmo = tsrc->numobs;
    nmi = tsrc->numints;
    nmd = tsrc->numdoubles;
    tsrc -> forwarded = 1; // 
	set_forwarded_value(src,dst);
	wsz = Dblock_preamble_wsize + nmo + nmi + 2*nmd;
	// first, copy the non ob parts of the struct
	cpoff = nmo + Dblock_preamble_wsize;
	btoc = aword_size * (wsz - cpoff);//bytes to copy
	memcpy((char*)(dst+cpoff),(char*)(src+cpoff),btoc);

	gc_bump_dest(wsz,tenure);
	// now all of the non-ob data is copied. Recursive calls are now ok.
	srcp = src + Dblock_preamble_wsize -1;  // -1 causes copy of the function_of field
	dstp = dst + Dblock_preamble_wsize -1;
	for (i = 0;i<=nmo;i++)
	{
		csrc = *srcp;
		GCCOPY_OB_SLOT(dstp,csrc);
		srcp++;
		dstp++;
	}
	return dst;
}


ob Dblock_sweep(ob src)
  {
  ob srcp;Dblock tsrc;int i,nmo,nmi,nmd;
  srcp = src + Dblock_preamble_wsize;
  tsrc = (Dblock)src;
  nmo = tsrc->numobs;
  nmi = tsrc->numints;
  nmd = tsrc->numdoubles;
  check_ob(src,&(tsrc->function_of)); //function_of
  for (i = 0;i<nmo;i++) 
	{
		check_ob((ob)src,srcp);
		srcp++;
	}
  return srcp + nmi+2*nmd;

  }



ob gccopy(ob src)
{
	ob srco;
	int k,tn;
	tn = 0;
	srco = (ob)src;
	if (srco->forwarded) return forwarded_value(src);
	if (srco->tenured) return src;
	if (forceTenure || (tenuring_enabled && ((srco->generation)||(srco->persistent)))) tn = 1;
	k = srco->obkind;
	switch (k)
	{
		case nstring_kind:return nstring_gccopy(src,tn);//LATER wstring_kind
		case int_kind:return boxedint_gccopy(src,tn);
		case double_kind:return boxeddouble_gccopy(src,tn);
		case dblock_kind:return Dblock_gccopy(src,tn);
		case arrayob_kind:return Arrayob_gccopy(src,tn);
		case arrayint_kind:return Arrayint_gccopy(src,tn);
		case arraydouble_kind:return Arraydouble_gccopy(src,tn);
		case arraybyte_kind:return Arraybyte_gccopy(src,tn);
		case seq_kind:return Seq_gccopy(src,tn);
		case values_kind:return Values_gccopy(src,tn);
		case hetarray_kind:return Hetarray_gccopy(src,tn);
		case smallob_kind:return Smallob_gccopy(src,tn);
		case hashtable_kind:return Hashtable_gccopy(src,tn);
		case binding_kind:return Binding_gccopy(src,tn);
		default: UM_ERROR("gccopy does not handle this case yet");
	}
}





ob sweep1(ob src)
{
	ob srco;
	int k,pfl,tn;
	srco = (ob)src;

	k = srco->obkind;
	if (k==pad_kind) 
	{
		sweep_pad_count++;
		return src+1;
	}
	// for debugging
	tn = src->tenured;
	if (tn != sweepingTenured)
	{
		UM_ERROR("Wrong heap in sweep\n");
	}	
/*
	if (sweep_count == 10000)
	{
		printf("sweep_count %d\n",sweep_count);
	}
*/
	if bad_kind(k) UM_ERROR("Bad kind");

	switch (k)
	{
		case dblock_kind:return Dblock_sweep(src);
		case nstring_kind:return nstring_sweep(src);//LATER wstring_kind
		case int_kind:return boxedint_sweep(src);
		case double_kind:return boxeddouble_sweep(src);
		case arrayob_kind:return Arrayob_sweep(src);
		case arraybyte_kind:return Arraybyte_sweep(src);
		case arrayint_kind:return Arrayint_sweep(src);
		case arraydouble_kind:return Arraydouble_sweep(src);
		case seq_kind:return Seq_sweep(src);
		case values_kind:return Values_sweep(src);
		case hetarray_kind:return Hetarray_sweep(src);
		case smallob_kind:return Smallob_sweep(src);
		case hashtable_kind:return Hashtable_sweep(src);
		case binding_kind:return Binding_sweep(src);
		case pm_stack_kind:return Pm_stack_sweep(src);
		default: UM_ERROR("sweep does not handle this case yet");
	}

}
ob last_sweep_ob; // last ob successfully swept

void heap_sweep(aword* lw,aword* hg)
{
	ob cp;ob lst;
	cp = lw;
	lst = lw;
	sweep_count = 0;
	sweep_pad_count = 0;
	while (cp < hg)
	{
//	    if (sweep_extra_verbose) printf("at %d ",cp-lw);
		lst = cp;
		cp = sweep1(cp);
		last_sweep_ob = lst;
    sweep_count++;
	}
}

void sweep_r_heap()
{
	if (sweep_verbose) printf("Sweeping regular heap\n");
	sweep_count = 0;
	sweepingTenured = 0;
	heap_sweep(r_base,r_next);
	if (sweep_verbose) printf("Found %d objects in sweeping regular heap\n",sweep_count);
}
void sweep_t_heap(int hpi)
{
	T_heap_struct hp;
	if (sweep_verbose) printf("Sweeping tenured heap %hpi\n");
	sweep_count = 0;
	sweepingTenured = 1;
	hp = t_heaps[hpi];
    if (hpi == (t_heap_count-1)) hp.next = t_next;
	heap_sweep(hp.base,hp.next);
	if (sweep_verbose) printf("Found %d objects in sweeping tenured heap\n",sweep_count);
}
void sweep_heaps()
{
	int i;
	sweep_r_heap();
    for (i=0;i<t_heap_count;i++) sweep_t_heap(i);
    for (i=0;i<t_heap_count;i++) check_rrefs(i);
}

//note: the gccopy within gccopy_rrefs may itself add to the 
// end of the rrefs; hence the form of the while
void gccopy_rrefs0(int hpi)
{
	int i,ln,*cr,cf;ob *r,v,nv;T_heap_struct hp;Sarray rr;
	hp = t_heaps[hpi];
	rr = hp.rrefs;
	cr = Sarray_contents(rr);
	cf = 0;  // points  word to copy down into
	i = 0;
	while (i < (rr->length)) 
	{
		cr = Sarray_contents(rr);
        r = (ob*)cr[i];
		if (is_rref(r,hpi))
		{
			v = *r;
			if (in_regular(v))
			{
				if (v->forwarded) nv = forwarded_value(v);
				else nv = gccopy(v);
				*r = nv;
				if (nv->tenured) set_is_rref(r,0,hpi);
				else
				{
					cr[cf] = r;
					cf++;
				}
			}
			else
		//v is in the new,destination regular buffer (ie already copied to the new space)
			if (in_dest_regular(v))
			{
				cr[cf] = r;
				cf++;
			}
			else set_is_rref(r,0,hpi); 
			i++;
		}
	}
	rr -> length = cf;
}

void gccopy_rrefs()
{
	int i;
	for (i=0;i<t_heap_count;i++) gccopy_rrefs0(i);
}


void gccopy_ob_stack()
{
	int i,ln;ob *r,v,nv;
	for (i = 0;i<ob_stack_ptr;i++)
	{
        r = (ob*)ob_stack[i];
		v = *r;
		if (in_regular(v))
		{
			if (v->forwarded) nv = forwarded_value(v);
			else nv = gccopy(v);
			*r = nv;
		}
	}
}

int in_ob_stack(ob *x)
{
	int i;ob *r;
	for (i = 0;i<ob_stack_ptr;i++)
	{
        r = (ob*)ob_stack[i];
        if (r == x) return 1;
	}
	return 0;
}

int in_regular_fun(x){return in_regular(x);} // so that r_base,r_limit aren't themselves on the stack


void check_stack()
{
   void *stackTop;int ino,csv,*csp,tn,rg;ob cso;
   stackTop = &stackTop;
   csp = stackTop;
   while (csp <= stackBottom)
   {
	   csv = *((int*)csp);
	   tn = in_tenured(csv);
	   rg = in_regular(csv);
	   if (rg && (csv != r_base))
	   {
		   cso = (ob)csv;
		   ino = in_ob_stack(csp);
		   if (ino)
			   rg = rg;
		   else
			   tn = tn;
	   }
	   csp++;
   }
}

void heap_stat()
{
printf("Regular size: %d Tenured size: %d rrefs: %d ob_stack: %d\n",
	   r_next-r_base,t_next-t_base,c_rrefs->length,ob_stack_ptr);
}

// here's gc itself

void gc1(int test_mode)
{
	int min_size,i,isr,ln,*cr,tm;
	now_in_gc = 1;
	if (gc_verbose && ((gc_count%gc_verbose_mod)==0))
	{
		tm = time_msec();
		if (test_mode) printf("   Before test_gc: "); else printf("   Before gc: ");
		heap_stat();
	}
	if (sweep_test && sweep_test_gc) sweep_heaps();
	if (test_mode && gc_test_sweep_only) return;
	if (test_mode) bump_generation = 0; else bump_generation = 1;
    if (((int)(t_limit-t_next)) < ((regular_heap_size * 256) + 8))
		allocTenuredMemory( regular_heap_size +10);
	check_stack();
	gccopy_setup();
	gccopy_ob_stack();
	gccopy_pm_stacks();
	gccopy_rrefs();
	gccopy_complete();
	now_in_gc = 0;
    if (gc_verbose) 
	{
		if  ((gc_count%gc_verbose_mod)==0)
		{
			printf("   After gc %d  ",gc_count);heap_stat(); 
			printf("   pm_step  %d; took %d milliseconds\n",pm_step_count,time_msec()-tm);
		}
	}
	else
	if (gc_announce && ((gc_count%gc_verbose_mod)==0))
	{
		if (test_mode) printf("   test_gc %d\n",gc_count);
		else printf("   gc %d\n",gc_count);
	}
	gc_count++;
	if (sweep_test && sweep_test_gc) sweep_heaps();
//	if (gc_sweep) sweep_heaps();
}


void gc() {
	if (gc_disabled) UM_ERROR("gc disabled");
	gc1(0);}
void test_gc(){gc1(1);}


#ifdef DEBUG_OBSTACK
void obPush(ob *x)
{
	ob xv;
	xv = *x;
//	check_stack();
	check_ob1(xv);
}
//  x is a pointer to the location to be pushed

int obPopCount = 0;
int obPopCountWatch = 13040;

void ob_pop() 
{
	obPopCount++;
	if (obPopCount >= obPopCountWatch)
		obPopCountWatch = obPopCount;
	if ((--ob_stack_ptr) < 0) UM_ERROR("ob_stack underflow");
}
void ob_popn(n) 
{
	obPopCount++;
	if (obPopCount >= obPopCountWatch)
		obPopCountWatch = obPopCount;
	ob_stack_ptr = ob_stack_ptr - n; 
	if (ob_stack_ptr < 0) UM_ERROR("ob_stack underflow");
}

void ob_pop_to(n) {ob_stack_ptr = n;}
#endif



int alloc_statically(int nv)
{
	int rs;
	rs = allocating_statically;
	allocating_statically = nv;
	return rs;
}




void reset_after_error()
{
	pm_verbose = 0;
	regular_alloc_disabled = 0;
}

void set_gc_test_flags(int a0,int a1,int a2,int a3)
{
	gc_test = a0;
	sweep_test = a1;
	pm_break_step = a2;
	pm_gc_mod = a3;
}

int in_heap(ob x)
{
	return in_regular(x)||in_tenured(x)||in_external(x);
}

void checkOb(ob x)
{
	if (!in_heap(x)) UM_ERROR("Bad ob");
}

//  DELTA HACKS

/* Delta blocks have two forms:

  <offset,value>

or
  <offset|1,N,N values>

offsets are in bytes from the beginning of the tenured heap, so have 
low bit = 0. Turning this bit on indicates a block of multiple modified words.
Right NOW: only the former is supported.

*/
int* theDelta;
int theDeltaLength; 
int theDeltaIndex;
int lastDeltaOffset;
int deltaBlockStart;// pointer to the beginning of the block
int deltaBlockSize;

void recordOneDelta(int offset,int vl)
{
	if ((theDeltaIndex + 2)>theDeltaLength) UM_ERROR("Delta overflow");
	if (offset == (lastDeltaOffset+1))
	{
        if (deltaBlockSize == 1) 
		{
			theDelta[theDeltaIndex] = theDelta[theDeltaIndex-1]; // last value gets pushed along one word
			theDeltaIndex++; 
		}
		theDelta[theDeltaIndex] = vl;
		deltaBlockSize++;
		theDeltaIndex++;
	}
	else // new block
	{
		if (deltaBlockSize > 1) // close out the last block
		{
			theDelta[deltaBlockStart] |= 1;
			theDelta[deltaBlockStart+1] = deltaBlockSize;
		}
		// star new block
		theDelta[theDeltaIndex] = offset;
		theDelta[theDeltaIndex+1] = vl;
		deltaBlockSize = 1;
		deltaBlockStart = theDeltaIndex;
		theDeltaIndex += 2;
	}
	lastDeltaOffset = offset;
}

void allocTheDelta(int n)
{
	theDelta = malloc(n);
	theDeltaLength = n;
}


void recordDeltas(int hpi)
{
	int *bs,*nxt;char *mmp;int i,j,nmb,bt,coff,coffj;char cw;T_heap_struct hp;
	lastDeltaOffset = -2;
	theDeltaIndex = 0;
	deltaBlockSize = 0;
	hp = t_heaps[hpi];
	if (hpi == (t_heap_count-1)) hp.next = t_next;
	bs = hp.base;
	nxt = hp.next;
	mmp = hp.modmap;
	nmb = (nxt-bs)/8 + 1;
	coff = 0;
	for (i = 0;i<nmb;i++)
	{
		cw = *(mmp + i);
		if (cw)
		{
			bt = 1;
			for (j=0;j<8;j++)
			{
				if (cw & bt)
				{
					coffj = coff+j;
					recordOneDelta(coffj,*(bs + coffj));
				}
			bt = bt << 1;
			}
		}
		coff = coff + 8;
	}
	nmb = nmb;// just to have a line to point the debugger at
}




void enableDelta(int v)
{
	deltaEnabled = v;
}


void resetDelta(int hpi)
{
	int *bs,*nxt;char *mmp;int nmb;T_heap_struct hp;
	lastDeltaOffset = -2;
	deltaBlockSize = 0;
	hp = t_heaps[hpi];
	if (hpi == (t_heap_count-1)) hp.next = t_next;
	bs = hp.base;
	nxt = hp.next;
	mmp = hp.modmap;
	nmb = (nxt-bs)/8 + 1;
	memset(mmp,0,nmb);
}

/*
void checkStack()
{
	void *csp,*ssp;
	csp = &csp;
	ssp = startupStackP;
}
*/

/*

allocStatically(true);
enableDelta(true);
allocTheDelta(1000000);

recordDeltas(0);

  */




