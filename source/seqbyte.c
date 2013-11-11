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

// version 13: delta treatment added 8/7/04


Arraybyte mk_Arraybyte(int capacity)
{
	Arrayint rs;
	int* dt;
	rs = (Arrayint)heap_alloc(sizeof(Arrayint_struct)+capacity);
	rs -> length = 0;
	rs -> capacity = capacity;
	rs -> obkind = arraybyte_kind;
	if (alloc_verbose) printf("Allocated seqbyte with capacity %d\n",capacity);
	return rs;
}


Seqbyte mk_Seqbyte(int capacity)
{
	return (Seqbyte)mk_Seq((ob)mk_Arraybyte(capacity));
}

Seqbyte mk_hexBinary(int capacity)
{
	Seqbyte rs;
	rs =  (Seqbyte)mk_Seq((ob)mk_Arraybyte(capacity));
	set_xsdKind(rs,xsd_hexBinary_kind);
	return rs;
}



	
// UNSAFE! (no bounds check on dst)
void Arraybyte_copyto(Arraybyte dst,Arraybyte src) 
{
	int ln;
	ln = src->length;
memcpy((void*)Arraybyte_contents(dst),(void*)Arraybyte_contents(src),ln);
if (deltaEnabled && (dst->tenured)) declareRangeModified(dst,Array_preamble_wsize+(ln+3)/4,whichHeap(dst));
}






Seqbyte mk_empty_Seqbyte()
{
	return mk_Seqbyte(INITIAL_SEQUENCE_SIZE);
}





void Seqbyte_ensure_capacity(Seqbyte bx,int ncp)
{
	Arraybyte s,nsq;int ln,idr,*md;
    s = bx->data;
	if (ncp > (s ->capacity))
	   {
	   ob_push2(bx,s);
	   nsq = mk_Arraybyte(ncp);
	   ln = s->length;
	   memcpy((char*)Arraybyte_contents(nsq),(char*)Arraybyte_contents(s),ln);
	   nsq -> length = ln;
	   set_ob(bx->data,nsq);
	   if (deltaEnabled && (nsq->tenured))
	   {
		   md = &(nsq->length);
		   declareModified(md);
	   }
	   ob_popn(2);
	   }
}
  


Seqbyte Seqbyte_add(Seqbyte bx,int n)
{
	int ln,nln,cp,hpi,*md;Arraybyte sq;
    sq = bx->data;
	ln = sq->length;
	nln = ln+1;
	cp = sq->capacity;
	ob_push(bx);
	if (nln > cp) 
	{
		Seqbyte_ensure_capacity(bx,nln*2);
        sq = bx->data;
	}
	sq -> length = nln;
	Arraybyte_setn(sq,ln,(char)n);
	if (deltaEnabled && (sq->tenured))
	{
		hpi = whichHeap(sq);
		Arraybyte_declareModified(sq,ln,hpi);
		md = &(sq->length);
		declareModifiedf(md,hpi);
    }
	ob_pop();
	return bx;
}






void Seqbyte_append(Seqbyte s,Seqbyte x)
{
	Arrayint sd,xd;int ln,cp,lnx,nln;char *dt,*dtx;
	if (!x) return;
	sd = s->data;
	xd = x->data;
	ln = sd -> length;
	cp = sd -> capacity;
	lnx = xd -> length;
	nln = ln + lnx;
	ob_push2(s,x);
	if (nln > cp) 
	{
		Seqbyte_ensure_capacity(s,nln*2);
		xd = x->data;
		sd = s->data;
	}
	sd -> length = nln;
	dt = Arraybyte_contents(sd);
	dtx = Arraybyte_contents(xd);
	memcpy((char*)(dt + ln),(char*)dtx,lnx);
	ob_popn(2);

}



Seqbyte Seqbyte_copy(Seqbyte s)
{
	Arraybyte rsd,sd;Seqbyte rs;int ln,hpi,*md;char *dt,*dtr;
	sd = s->data;
	ob_push2(s,sd);
	ln = sd->length;
	rs = mk_Seqbyte(ln);
	rsd = rs->data;
	set_ob(rs->types,rs->types);
	rsd -> length = ln;
	dt = Arraybyte_contents(sd);
	dtr = Arraybyte_contents(rsd);
    memcpy((char*)dtr,(char*)dt,ln);
	if (deltaEnabled && (sd->tenured)) 
	{
		hpi = whichHeap(sd);
		declareRangeModified(dt,(ln+3)/4,hpi);
		md = &(sd->length);
		declareModifiedf(md,hpi);
	}
	ob_popn(2);
    return rs;
}

int Seqbyte_contains(Seqint s,int n)
{
	Arraybyte sd;int ln,i;char nc,*dt;
	nc = (char)n;
	sd = s->data;
	ln = sd -> length;
	dt = Arraybyte_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == nc) return 1;
	}
	return 0;
}

//-1 means not found
int Seqbyte_find(Seqbyte s,int n)
{
	Arrayint sd;int ln,i;char nc,*dt;
	nc = (char)n;
	sd = s -> data;
	ln = sd -> length;
	dt = Arraybyte_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == nc) return i;
	}
	return -1;
}

void  Seqbyte_expand_with_zeros(Seqbyte s,int ln)
  {
  int cln,i,wln,cwln,hpi,* gd;Arraybyte sd;
  sd = s->data;
  cln = sd->length;
  if (cln < ln)
     {
	  ob_push(s);
     Seqbyte_ensure_capacity(s,ln);
	 sd = s->data;
     gd = Arraybyte_contents(sd);
	 wln = (ln+3)/4;
	 cwln = (cln+3)/4;
     for (i = cln;i<wln;i++)
	     gd[i] = 0;
	 sd ->length = ln;
	 if (deltaEnabled && (sd->tenured))
	 {
		 hpi = whichHeap(sd);
		 declareRangeModified(gd+cwln,wln-cwln,hpi);//
		 declareModifiedf(&(sd->length),hpi);
	 }
	 ob_pop();
	 }
  }

char Seqbyte_print_buf[Seqbyte_print_buf_length];

void Seqbyte_copyto(char* dst,int dstln,Seqbyte src)
{
	Arraybyte srca;int ln;
	srca = src->data;
	ln = srca->length;
	if (ln >= dstln) ln = dstln-1;
	memcpy(dst,Arraybyte_contents(srca),ln);
	dst[ln] = 0;
}



void Seqbyte_print(Seqbyte s)
{
	char* cn;Arraybyte dt;int ln,cp;
	dt = s->data;
	ln = dt->length;
	cp = dt -> capacity;
    if (cp == ln)
	{
		if (ln < 30) 
		{
			Seqbyte_copyto(Seqbyte_print_buf,Seqbyte_print_buf_length,s);
			printf("%s",Seqbyte_print_buf);
            return;
		}
		ob_push(s);
		Seqbyte_ensure_capacity(s,ln*2);
        dt = s->data;
		ob_pop();
	}
	cn = Arraybyte_contents(dt);
    cn[ln] = 0;
	printf("%s",cn);
}



int Arraybyte_select(Arraybyte s,int n)
{
	char* dt;int rs,i;
	if (n >=(s->length)) UM_ERROR("out of bounds array access");
	i  = (int)Arraybyte_selectn(s,n);
	rs = 255 & i;//don't extend the sign
	return rs;
}


int Seqbyte_select(Seqbyte s,int n)
{
	return Arraybyte_select(s->data,n);
}



//little endian


int Seqbyte_select_short(Seqbyte s,int n)
{
	short rs;int irs;char* prs,*dt;Arraybyte sa;
	sa = s->data;
	if (n >=(sa->length)) UM_ERROR("out of bounds sequence access");
	prs = (char*)(&rs);
	prs[0] = Arraybyte_selectn(sa,n);
	prs[1] = Arraybyte_selectn(sa,n+1);
	irs = 65355 && ((int)rs);//don't extend the sign
	return (int)rs;
}


int Seqbyte_select_short_bigendian(Seqbyte s,int n)
{
	short rs;char* prs;Arraybyte dt;
	dt = s->data;
	if (n >=(dt->length)) UM_ERROR("out of bounds sequence access");
	prs = (char*)(&rs);
	prs[1] = Arraybyte_selectn(dt,n);
	prs[0] = Arraybyte_selectn(dt,n+1);
	return (int)rs;
}


int Seqbyte_select_int(Seqbyte s,int n)
{
	int rs;Arraybyte dt;
	dt = s->data;
	if (n >=(dt->length)) UM_ERROR("out of bounds sequence access");
	memcpy(&rs,(char*)dt + Array_preamble_size+n,4);
	return rs;
}



int Seqbyte_select_int_bigendian(Seqbyte s,int n)
{
	int rs;char* prs;Arraybyte dt;
	dt = s->data;
	if (n >=(dt->length)) UM_ERROR("out of bounds sequence access");
	prs = (char*)(&rs);
	prs[3] = Arraybyte_selectn(dt,n);
	prs[2] = Arraybyte_selectn(dt,n+1);
	prs[1] = Arraybyte_selectn(dt,n+2);
	prs[0] = Arraybyte_selectn(dt,n+3);
	return rs;
}

double Seqbyte_select_double(Seqbyte s,int n)
{
	double rs;Arraybyte dt;
	dt = s->data;
	if (n >=(dt->length)) UM_ERROR("out of bounds sequence access");
	memcpy(&rs,(char*)dt + Array_preamble_size+n,8);
	return rs;
}



void Seqbyte_set_swf_double(Seqbyte s,int n,double rs)
{
	char* prs;Arraybyte dt;
	dt = s->data;
	if ((n+8) >(dt->length)) UM_ERROR("out of bounds sequence access");
	prs = (char*)(&rs);
	Arraybyte_setn(dt,n,prs[4]);
	Arraybyte_setn(dt,n+1,prs[5]);
	Arraybyte_setn(dt,n+2,prs[6]);
	Arraybyte_setn(dt,n+3,prs[7]);

	Arraybyte_setn(dt,n+4,prs[0]);
	Arraybyte_setn(dt,n+5,prs[1]);
	Arraybyte_setn(dt,n+6,prs[2]);
	Arraybyte_setn(dt,n+7,prs[3]);
}



double Seqbyte_select_double_bigendian(Seqbyte s,int n)
{
	double rs;char* prs;Arraybyte dt;
	dt = s->data;
	if (n >=(dt->length)) UM_ERROR("out of bounds sequence access");
	prs = (char*)(&rs);
	prs[7] = Arraybyte_selectn(dt,n);
	prs[6] = Arraybyte_selectn(dt,n+1);
	prs[5] = Arraybyte_selectn(dt,n+2);
	prs[4] = Arraybyte_selectn(dt,n+3);
	prs[3] = Arraybyte_selectn(dt,n+4);
	prs[2] = Arraybyte_selectn(dt,n+5);
	prs[1] = Arraybyte_selectn(dt,n+6);
	prs[0] = Arraybyte_selectn(dt,n+7);
	return rs;
}






void Arraybyte_set(Arraybyte s,int n,int v)
{
	int hpi;
	if (n >= (s->length)) UM_ERROR("out of bounds array access");
	Arraybyte_setn(s,n,(char)v);
	if (deltaEnabled && (s->tenured))
	{
		hpi = whichHeap(s);
		Arraybyte_declareModified(s,n,hpi);
	}
}


void Seqbyte_set(Seqbyte s,int n,int v)
{
	Arraybyte_set(s->data,n,v);
}






void Seqbyte_charp_int_append(Seqbyte s,char* x,int xln)
  {
	char* dt;Arraybyte sa;int ln,cp,nln,hpi,*md;
	sa = s->data;
	ln = sa -> length;
	cp = sa-> capacity;
	nln = ln + xln;
	ob_push(s);
	if (nln > cp) 
		Seqbyte_ensure_capacity(s,nln*2);
	sa = s->data;
	sa -> length = nln;
	dt = Arraybyte_contents(sa);
	memcpy(dt + ln,x,xln);
	if (deltaEnabled && (sa->tenured)) 
	{
		hpi = whichHeap(sa);
		declareRangeModified(dt+ln,(xln+3)/4,hpi);
		md = &(sa->length);
		declareModifiedf(md,hpi);
	}
	ob_pop();
	return s;
  }

void Seqbyte_charp_append(Seqbyte s,char* x)
{
	Seqbyte_charp_int_append(s,x,strlen(x));
}

void Seqbyte_string_append(Seqbyte s,string x)
{
	char* dt;Arraybyte sa;int ln,cp,xln,nln,sk,hpi,*md;
	if (!x || ((x->obkind) != nstring_kind)) UM_ERROR("only works for nstrings");
	sa = s->data;
	ln = sa -> length;
	cp = sa -> capacity;
	xln = x->length;
	nln = ln + xln;
	ob_push2(s,x);
	if (nln > cp) 
		Seqbyte_ensure_capacity(s,nln*2);
	sa = s->data;
	sa -> length = nln;
	dt = Arraybyte_contents(s -> data);
	sk = x->obkind;
	if (sk != nstring_kind) UM_ERROR("WIDE STRING");
	memcpy(dt + ln,NSTRINGBODY(x),xln);
	if (deltaEnabled && (sa->tenured)) 
	{
		hpi = whichHeap(sa);
		declareRangeModified(dt+ln,(xln+3)/4,hpi);
		md = &(sa->length);
		declareModifiedf(md,hpi);
	}
	ob_popn(2);
	return s;
  }


void Seqbyte_string_int_int_append(Seqbyte s,string x,int startat,int endat)
{
	char* dt;Arraybyte sa;int ln,cp,xln,nln,sk,hpi,*md;
	sa = s->data;
	ln = sa -> length;
	cp = sa -> capacity;
	xln = (endat - startat) + 1;
	nln = ln + xln;
	ob_push2(s,x);
	if (nln > cp) 
		Seqbyte_ensure_capacity(s,nln*2);
	sa = s->data;
	sa -> length = nln;
	dt = Arraybyte_contents(sa);
	sk = x->obkind;
	if (sk != nstring_kind) UM_ERROR("WIDE STRING");
	memcpy(dt + ln,NSTRINGBODY(x)+startat,xln);
	if (deltaEnabled && (sa->tenured)) 
	{
		hpi = whichHeap(sa);
		declareRangeModified(dt+ln,(xln+3)/4,hpi);
		md = &(sa->length);
		declareModifiedf(md,hpi);
	}
	ob_popn(2);
	return s;
  }


int Seqbyte_int_find(Seqint s,int n,int af)
{
	char* dt;int ln,i;char c;Arraybyte sa;
	sa = s->data;
	ln = sa -> length;
	c = (char)n;
	dt = Arraybyte_contents(sa);
	for (i = af;i<ln;i++) 
	{
		if (dt[i] == c) return i;
	}
	return -1;
}


Seqbyte string_mk_Seqbyte(string s)
{
	int ln,sk;Seqbyte rs;Arraybyte a;
	if ((s->obkind) != nstring_kind) UM_ERROR("only works for nstrings");
	ob_push(s);
	ln = s->length;
	rs = mk_Seqbyte(ln);
	a = rs -> data;
	sk = s->obkind;
	if (sk != nstring_kind) UM_ERROR("WIDE STRING");
	memcpy(Arraybyte_contents(a),NSTRINGBODY(s),ln);
	a->length = ln;
	ob_pop();
	return rs;
}


// LATER optimize this:
//little-endian version!
void Seqbyte_append_hex(Seqbyte x,int n)
{
	int cln,nln,i,cn,cc,hpi,*md;char* dt;Arraybyte sa;
	sa = x->data;
	cln = sa->length;
	nln = cln + 8;
	ob_push(x);
	Seqbyte_ensure_capacity(x,nln);
	sa = x->data;
	sa -> length = nln;
	dt = Arraybyte_contents(sa);
	cn = n;
	nln--;
	for (i = 0;i<8;i++)
	{
		cc = cn & 15;
		if (cc < 10) dt[nln--] = 48 + cc;
		else
		dt[nln--] = 87 + cc;
		cn = cn >> 4;
	}
	if (deltaEnabled && (sa->tenured)) 
	{
		hpi = whichHeap(sa);
		declareRangeModified(dt+cln,2,hpi);
		md = &(sa->length);
		declareModifiedf(md,hpi);
	}
	ob_pop();
}
static char to_int_buf[40];

int Seqbyte_to_int(Seqbyte x)
{
	int ln,rs;Arraybyte sa;
	sa = x->data;
	ln = sa -> length;
	if (ln > 38) ln = 38;
	memcpy(to_int_buf,Arraybyte_contents(sa),ln);
	to_int_buf[ln] = 0;
	sscanf(to_int_buf,"%d",&rs);
	return rs;
}



double Seqbyte_to_double(Seqbyte x)
{
	int ln;float rs;Arraybyte sa;
	sa = x->data;
	ln = sa -> length;
	if (ln > 38) ln = 38;
	memcpy(to_int_buf,Arraybyte_contents(sa),ln);
	to_int_buf[ln] = 0;
	sscanf(to_int_buf,"%f",&rs);
	return (double)rs;
}



// appends chars lb through ub of x onto rs

void Arraybyte_int_int_select(Seqbyte rs,Arraybyte x,int lb,int ub)
{
	char* rsc,*xc;int rsln,lnc,tln;Arraybyte rsa;
    ob_push(x);
	ob_push(rs);
	rsa = rs -> data;
	rsln = rsa -> length;
	lnc = 1 + ub - lb;
	tln = rsln + lnc;
	Seqbyte_ensure_capacity(rs,tln);
	rsa = rs -> data;
    rsc = Arraybyte_contents(rsa);
	xc = Arraybyte_contents(x);
	memcpy(rsc+rsln,xc+lb,lnc);
	rsa->length = rsln + lnc;
	ob_popn(2);
}

void Seqbyte_int_int_select(Seqbyte rs,Seqbyte x,int lb,int ub)
{
	 if (ub >= (x->data->length)) UM_ERROR("Out of bounds selection in StringBuffer");
	 if (ub < 0) return;
	 if (ub == (lb-1)) return;
	 if (lb > ub) UM_ERROR("Bounds in wrong order in select");
	 Arraybyte_int_int_select(rs,x->data,lb,ub);
}




int Seqbyte_equal(Seqbyte x,Seqbyte y)
{
	 Arraybyte dtx,dty;int lnx,i;char *xcn,*ycn;
	 dtx = x->data;
	 dty = y->data;
	 lnx = dtx->length;
	 if (lnx != (dty->length)) return 0;
	 xcn = Arraybyte_contents(dtx);
	 ycn = Arraybyte_contents(dty);
	 for (i=0;i<lnx;i++)
	 {
		 if (xcn[i]!=ycn[i]) return 0;
	 }
	 return 1;
}





