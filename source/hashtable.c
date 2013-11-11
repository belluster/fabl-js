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

int htverbose = 0;

void htVerbose()
{
	 htverbose = 1;
}



	
	
void   Seqob_compact(Seqob x)
  {
  int i,ln,putp;Arrayob xd;
  ob v;
  int* dt;
  xd = x -> data;
  ln = xd->length;
  putp = 0;
  dt = Arrayob_contents(xd);
  for (i=0;i<ln;i++)
      {
	  v = dt[i];
	  if (v)
	     {
		 set_ob(dt[putp],v);
		 putp++;
		 }
	  }
  for (i = putp;i<ln;i++) set_ob(dt[i],nul);
   xd -> length = putp;
   }

void   Hashtable_compact(Hashtable ht)
  {
	   Seqob_compact(ht->goods);
   }

void  Hashtable_reset(Hashtable ht)
  {
  Seqint ha;int ln,i;int* hag;Arrayint hadt;
  Seqob_reset(ht->goods);
  ha = ht->harray;
  hadt = ha->data;
  hag = Arrayint_contents(hadt);
  ln = hadt->length;
  memset(hag,0,ln * aword_size);
  ht -> num_values = 0;
// for (i = 0;i<ln;i++) hag[i] = 0;
  }





/* Hashtable_find_spot(x:int_Hashtable;k:ob):int;
Returns the index of a spot where an object with name k  "belongs".
If there is an entry with name the same as k
this spot is returned; otherwise, the index of an empty spot where an object with
name b could be put  is returned 
*/


static int hashkey_counter = 1;
static int hashkey_offset = 0;
int allocHashkey()
{
	int rs;
	rs = hashkey_offset + 7919 * (hashkey_counter++); // 7919 is prime
	if (rs > (2147483647 - 10000)) // 2**31 - 10000
	{
		hashkey_counter = 1; // wrap around
		hashkey_offset++;
	}
	return rs;
}
  
void Hashtable_expand(Hashtable);





#define HASH_SEQ 0
#define STRING_SET 1
#define BINDING_TABLE 2

int same_internable(Object x,Object y)
{
	int qtx,qty;Type tx,ty,fxtp,fytp;Arrayob xa,ya;Smallob fx,fy;
	qtx = x->quickType;
	qty = y->quickType;
    if  (qtx != qty) return 0;
	if (qtx == qtNone) 
	{
		if (((x->obkind) == seq_kind) && ((y->obkind)==seq_kind))
		{
			xa = ((Seqob)x)->data;
			ya = ((Seqob)y)->data;
			if (((xa->obkind) != arrayob_kind)||((xa->obkind) != arrayob_kind)) return 0;
			return Arrayob_eqContents(xa,ya,0);
		}
	return 0;
	}
	if (qtx == qtRegarding)
	{
		return ((regardingValue(x)) == (regardingValue(y))) && ((regardingAspect(x)) == (regardingAspect(y)));
	}
	if (qtx == qtFunction)  //note that return type is not involved
	{
		fx = (Smallob)x;
		fy = (Smallob)y;
		fxtp = functionFunType(fx);
		fytp = functionFunType(fy);
		return ((functionName(fx)) == (functionName(fy))) && 
		       ((functionDefinedIn(fx)) == (functionDefinedIn(fy))) && 
			Seqob_eqContents(typeParams(fxtp),typeParams(fytp),0);
	}
	if (qtx == qtType)
	{
		tx = (Type)x;
		ty = (Type)y;
		return (typeConstructor(tx) == typeConstructor(ty)) && 
			   (typeParam(tx) == typeParam(ty)) && 
			   (typeParams(tx) == typeParams(ty));
	}	return 0;
		
}

		

int   Hashtable_find_spot(Hashtable x,ob iv)
{
  int ahsh,cs,nv,sz,h,v,hsh,ist,frob,stint,isint,isdouble,ivi,k,isinternable,hsq;
  double ivd;Binding ivb;//ivb for debugging
  ob vl;Seqob g;Dblock db;Smallob bky;
  int nfnd,i,rs,hk,bkyk;
  int* ha;
  Object ov;
  cs = x->hashtable_variety;
  stint = cs == STRING_SET;
  frob =  cs == BINDING_TABLE;
  hsq = cs == HASH_SEQ;
  k = iv -> obkind;
  isinternable = 0;
  isint = 0;
  ist = 0;
  isdouble = 0; 
  ob_push2(x,iv);
  if (k == int_kind)
  {
	  isint = 1;
	  ivi = ob_to_intn(iv);
	  hsh = int_hash(ivi);
  }

  else
  if (k == double_kind)
  {
	  isdouble = 1;
	  ivd = ob_to_doublen(iv);
	  hsh = double_hash(ivd);
  }
  else
  if ((k == nstring_kind)||(k == wstring_kind))
  {
	  ist = 1;
	  hsh = string_hash((string)iv);
  }
  else
  if (k < 16) UM_ERROR("Wrong kind of key");
  else
  {

	  
	  if ((iv ->obkind)== binding_kind)
	  {
		  ivb = (Binding)iv;
		  bky = ivb->key;
		  bkyk = bky->obkind;
		  if ((bkyk == nstring_kind)||(bkyk == wstring_kind)) 
			  hsh = string_hash(bky);
		  else
			  hsh = ((Object)bky)->hashkey;
	  }
	  else
		  hsh = ((Object)iv)->hashkey;
	  if (!hsh) 
	  {
		  if (hsq) hsh = allocHashkey(); else UM_ERROR("No hashkey");
	  }
	  isinternable = hsq && (iv -> internable);
  }
	
  
	  
  rs = -1;
  sz = x->size;
  nv = x->num_values;
  if (nv > (sz/3))
     {
     Hashtable_expand(x);
     sz = x->size;
     }
  ahsh = abs(hsh);
  h = ahsh - (sz * (ahsh/sz));
  g = x -> goods;
  ha = Arrayint_contents(x->harray->data);
  v = ha[h] - 1;
  if (v == -1)
     rs = h;
  else
     {
     // search for first empty bucket 
     vl = Seqob_select(g,v);
	 if (frob && vl) vl = (ob)(((Binding)vl)->key);
     nfnd = 0;
     if   ((!vl)||(vl==iv)||
		   (isinternable && same_internable(vl,iv)) ||
		   (isint && ((vl->obkind)==int_kind)&&(ob_to_intn(vl)==ivi)) ||
		   (isdouble && ((vl->obkind)==double_kind)&&(ob_to_doublen(vl)==ivd)) ||  
		   (stint && string_equal((string)vl,(string)iv))) rs = h; else
     nfnd = 1;
     while  (nfnd)
         {
         h = h + 1;
         if (h >= sz) h = 0;
         v = ha[h] - 1;
         if (v == -1)
           {
            nfnd = 0;
            rs = h;
            }
         else 
           {
           vl = Seqob_select(g,v);
	       if (frob && vl) vl = (ob)(((Binding)vl)->key);
           if   ((!vl)||(vl==iv)||
		         (isinternable && same_internable(vl,iv)) ||
		         (isint && ((vl->obkind)==int_kind)&&(ob_to_intn(vl)==ivi)) ||
		         (isdouble && ((vl->obkind)==double_kind)&&(ob_to_doublen(vl)==ivd)) || 
			     (stint && string_equal((string)vl,(string)iv)))
                 {
                 rs = h;
                 nfnd = 0;
                 }
           }
         }
      }
  ob_popn(2);
  if (htverbose) printf("findspot=%d iv = %d hsh=%d\n",rs,iv,hsh);
   return rs;
   }

/* if the spot is a discard, then replace it, ow add a new
  value */

void   Hashtable_fill_spot(Hashtable tb,int s,ob vl)
  {
  Seqob g;int se;Arrayint ha;int* had;ob og;
  g = tb -> goods;
  ha = tb->harray->data;
  ob_push(tb);
  ob_push2(ha,g);
  had = Arrayint_contents(ha);
  se = had[s] == 0;
  if (se)
     {
     Seqob_add(g,vl); 
     had = Arrayint_contents(ha);
     had[s] = g->data->length;
     tb -> num_values =  (tb -> num_values)+1;
     }
  else
     {
	 // s points to a discarded (empty slot) which we can refill with x 
     og = Seqob_select(g,s-1);
     if (og) UM_ERROR("internal");
     Seqob_set(g,s-1,vl);
     }
  ob_popn(3);
  }


		

void  rehash(Hashtable x)
  {
  int cs,i,ln,s,n,sz,nsz,gln,frob;Seqob g;
      int* hadt;Seqint ha;ob j,key;
  ob_push2(x,g);
  ob_push(ha);
  cs = x -> hashtable_variety;
  g = x->goods;
  ha = x->harray;
  hadt = Arrayint_contents(ha->data);
  n = 1;  //because the hash array maps to the index in g + 1
  Hashtable_compact(x);
  x -> hashkeyed_elements = 0;
  ln = ha->data->length;
  for (i = 0;i<ln;i++) hadt[i] = 0;
  gln= g->data->length;
  frob = cs == BINDING_TABLE;
  for (i = 0;i<gln;i++)
      {
	  j = Seqob_select(g,i);
	  if (frob) key = (ob)(((Binding)j)->key); else key = j;
      s = Hashtable_find_spot(x,key);
      hadt = Arrayint_contents(ha->data);
      hadt[s] = n;
      n = n + 1;
      }
  x -> needs_rehash = 0;
  ob_popn(3);
  }



void   Hashtable_expand(Hashtable x)
  {
  int cs,i,ln,s,frob,n,sz,nsz;Seqob g;ob j,key;
      Seqint ha;Arrayint haa;int* hadt,sva;
  cs = x->hashtable_variety;
 sz = x->size;
  nsz = hash_size(sz + 1);
  ha = x->harray;
  haa = ha -> data;
  ln = haa->length;
  hadt = Arrayint_contents(haa);
  for (i = 0;i<ln;i++) hadt[i] = 0;
  ob_push2(x,ha);
  Seqint_expand_with_zeros(ha,nsz + 1);
  hadt = Arrayint_contents(ha->data);
  	
  sva = alloc_disabled;
  alloc_disabled = 1;
  Hashtable_compact(x);
  g = x -> goods;
  n = 1;  // because the hash array maps to the index in g + 1
  x -> size = nsz;
  ln = g->data->length;
  frob = cs == BINDING_TABLE;
  for (i = 0;i<ln;i++)
      {
	  j = Seqob_select(g,i);
	  if (frob) key = (ob)(((Binding)j)->key); else key = j;
      s = Hashtable_find_spot(x,key);
      hadt[s] = n;
      n = n + 1;
      }
  alloc_disabled = sva;
  ob_popn(2);
  }


double admissable_Hashtable_hole_fraction = 0.2;
	
	

int rehash_needed(Hashtable x)
   {
   int nv,niu;
   nv = x->num_values;
   niu = x->goods->data->length;
   if (nv < 2) return 0; else
      return
       (nv - niu) > admissable_Hashtable_hole_fraction * nv;
   }

void   rehash_if_needed(Hashtable x)
   {
   if (rehash_needed(x)) rehash(x);
   }




int   Hashtable_put0(Hashtable tb,ob x,int sp)
  {
  Seqob  g;int cs,k,i,v,rs;Arrayint had;
      Seqint ha;ob og;int* hadt;
	cs = tb->hashtable_variety;
	k = x->obkind;
    if (!Hashtable_kind_allowed(k)) UM_ERROR("Wrong kind of object for Hashtable");
    ob_push2(tb,x);
	if (tb->needs_rehash) rehash(tb);
  if (sp >= 0) i = sp; else
  {
	  if (cs == BINDING_TABLE)
		  i = Hashtable_find_spot(tb,(ob)(((Binding)x)->key));
	  else i = Hashtable_find_spot(tb,x);
  }
  ha = tb->harray;
  had = ha->data;
  g = tb->goods;
  hadt = Arrayint_contents(had);
  v = hadt[i];
  if (v == 0) 
     {
     ob_push2(had,g);
     Seqob_add(g,x);
	 rs = (g->data->length);
     hadt = Arrayint_contents(had);//in case of gc
     hadt[i] = rs;
     tb -> num_values = (tb -> num_values) + 1;
	 ob_popn(4);
     return -rs;
     }
  else 
     {
     og = Seqob_select(g,v - 1);
     if (!og) 
 // fill in discarded entry in g 
	 {
		 Seqob_set(g,v-1,x);
		 ob_popn(2);
		 return -v;
	 }
	 ob_popn(2);
     return v;
     }
  }


// returns the value retreived via interning if already present, ow returns nil (meaning
// that x has been placed in the sequence)
ob  HashSeq_put(Hashtable tb,ob x)
   {
	int pt;ob rs;
	ob_push(tb);
	pt = Hashtable_put0(tb,x,-1);
	if (pt > 0) // already present
	   rs = Seqob_select(tb->goods,pt-1);
   else rs = nul;
   ob_pop();
   return rs;
   }

// version used when the index where the fellow was put is wanted
int  HashSeq_put2(Hashtable tb,ob x)
   {
   return Hashtable_put0(tb,x,-1);
   }


int  Bindingtable_put(Hashtable tb,ob x)
   {
   return Hashtable_put0((Hashtable)tb,x,-1);
   }



// result = index of old value, -1 if none
// for Binding tables,  x is the key of the binding, not the binding itself

int  Hashtable_remove1(Hashtable tb,ob x)
  {
  Seqob g;int cs,i,v,rs;Seqint ha;int* hadt;int k,isint,xi;
      ob pv;
  ob_push2(tb,x);
  cs = tb -> hashtable_variety;
  if (tb->needs_rehash) rehash(tb);
  if (cs == BINDING_TABLE)
	 i = Hashtable_find_spot(tb,(ob)(((Binding)x)->key));
  else i = Hashtable_find_spot(tb,x);
  ha = tb->harray;
  hadt = Arrayint_contents(ha->data);
  g = tb->goods;
  v = hadt[i];
  k = x -> obkind;
  if (k == int_kind)
  {
	  isint = 1;
	  xi = ob_to_intn(x);
  }
  if (v==0) return -1;
  else
    {
    pv = Seqob_select(g,v - 1);
	
	
    if ((x==pv)||(isint && ((pv->obkind)==int_kind) && (ob_to_intn(pv) == xi)))
       {
	   rs = v-1;
	   Seqob_set(g,v-1,(ob)0);
	   tb -> num_values = (tb->num_values) - 1;
	   ob_popn(2);
       return rs;
       }
    else 
	{
		ob_popn(2);
        return -1;
	}
    } 
  }

int  Hashtable_remove(Hashtable tb,ob x)
  {
  int idx;
  idx = Hashtable_remove1(tb,x);
  if (idx >= 0) rehash_if_needed(tb);
  return idx;
  }



// looks up the index associated with k, if any (-1) if none

int  Hashtable_geti(Hashtable tb,ob k)
  {
  int i,kk,v;Seqob g;int* hadt;int rs,cs;
  cs = tb -> hashtable_variety;
  kk = k -> obkind;
  if (!Hashtable_kind_allowed(kk)) return -1;
  ob_push(tb);
  if (tb->needs_rehash) rehash(tb);
  i = Hashtable_find_spot(tb,k);
  g = tb->goods;
  hadt = Arrayint_contents(tb->harray->data);
  rs = hadt[i] - 1;
  ob_pop();
  if ((rs < 0) || (!Seqob_select(g,rs)))  return -1; else
  return rs;
  }

// if x (or its interned version) is in the table, it is returned,ow nil
ob HashSeq_get(Hashtable tb,ob k)
{
	int idx;
	idx = Hashtable_geti(tb,k);
	if (idx < 0) return (ob)0;
	return Seqob_select(tb->goods,idx);
}

//for import

Seqob HashSeq_contents(Hashtable tb)
{
	return tb->goods;

}

Binding  Hashtable_selectBinding(Hashtable tb,ob v)
  {
	int i;
	ob_push(tb);
	i =  Hashtable_geti(tb,(ob)v);
	ob_pop();
	if (i>=0) return (Binding)Seqob_select((Hashtable)tb->goods,i);
	return (Binding)0;
}

// the integer 0 is different from nil; the former is an IntBinding, and the latter
// an ObBinding.




ob bindingValue(Binding b)
{
	int iv;double dv;ob rs;int bk;
	bk = b->bindingKind;
	if (bk == bindingIntKind) 
	{
		iv = ((IntBinding)b)->value;
		return int_to_ob(iv);
	} 
	else
	if (bk == bindingDoubleKind) 
	{
		dv = ((DoubleBinding)b)->value;
		return double_to_ob(dv);
	}
	else return ((ObBinding)b)->value;
}

// if b is an obbinding,and its value cell is an rref, this needs to be cleared
// before turning it into another kind of binding
void bindingClearRref(Binding b)
{
	int bk;ob cv,*r;
	bk = b -> bindingKind;
	if (bk = bindingObKind) // need to nul out the ob value, to keep refs from tenured to regular straight
	{
		if (!in_regular(b))
		{
			cv = ((ObBinding)b)->value;
			if (cv && in_regular(cv))
			{
				r = &(((ObBinding)b)->value);
				set_is_rref(r,0,whichHeap(r));
			}
		}
	}
}


//LATER DOUBLE
void setBindingValueOb(Binding b,ob v,int cuc)
{
	int k,bk;Values svl;Arrayob dt;
	if (collectingSubjects) b -> pagenumber = c_page;
	bk = b ->bindingKind;
	if (cuc && (bk == bindingMultiKind))
	{
		svl = (Values)(((ObBinding)b)->value);
	    dt = svl -> data;
		dt -> length = 1;
		Arrayob_setn(dt,0,v);
		return;
    }	
	if (!v)
	{
		 b ->bindingKind = bindingObKind;
		((ObBinding)b)->value = v;
		return;
	}
	k = (v->obkind);
	if (k == int_kind)
	{
		bindingClearRref(b);
		b ->bindingKind = bindingIntKind;
		((IntBinding)b)->value = ((boxedint)v)->value;
	}
	else
	if (k == double_kind)
	{
		bindingClearRref(b);
		b ->bindingKind = bindingDoubleKind;
		((DoubleBinding)b)->value = ((boxeddouble)v)->value;
	}
	else
	{
		 bk = b->bindingKind;
		 if (bk != bindingObKind)
		 { 
			 // nul so as not to confuse set_ob
			 ((ObBinding)b)->value = nul;
			 b ->bindingKind = bindingObKind;
		 }
		 set_ob(((ObBinding)b)->value,v);
	}
	if (!cuc) b->cardinality_constraint = cardinality_functional;
}


void setBindingValueInt(Binding b,int v,int cuc)
{
	int k,bk;Values svl;Arrayob dt;
	if (collectingSubjects) b -> pagenumber = c_page;
	bk = b ->bindingKind;
	if (cuc && (bk == bindingMultiKind))
	{
		svl = (Values)(((ObBinding)b)->value);
	    dt = svl -> data;
		dt -> length = 1;
		ob_push(dt);
		Arrayob_setn(dt,0,int_to_ob(v));
		ob_pop();
		return;
    }	
	b ->bindingKind = bindingIntKind;
	((IntBinding)b)->value = v;
	if (!cuc) b->cardinality_constraint = cardinality_functional;
}


void setBindingValueUndefined(Binding b)
{
	int k,bk;Values svl;Arrayob dt;
	if (collectingSubjects) b -> pagenumber = c_page;
	bk = b ->bindingKind;
	if (bk == bindingMultiKind)
	{
		svl = (Values)(((ObBinding)b)->value);
	    dt = svl -> data;
		dt -> length = 0;
    }	
	else
		((IntBinding)b)->value = 0;
	b ->bindingKind = bindingUndefinedKind;
}



void setBindingValueDouble(Binding b,double v,int cuc)
{
	int k,bk;Values svl;Arrayob dt;
	if (collectingSubjects) b -> pagenumber = c_page;
	bk = b ->bindingKind;
	if (cuc && (bk == bindingMultiKind))
	{
		svl = (Values)(((ObBinding)b)->value);
	    dt = svl -> data;
		dt -> length = 1;
		ob_push(dt);
		Arrayob_setn(dt,0,double_to_ob(v));
		ob_pop();
		return;
    }	
	b ->bindingKind = bindingDoubleKind;
	((DoubleBinding)b)->value = v;
	if (!cuc) b->cardinality_constraint = cardinality_functional;
}


// note: this is where the page numbers of values should be set individually LATER
void assertBindingValueOb(Binding b,ob v)
{
	int k,bk,cuc;Values svl;Arrayob dt;ob cv;
	if (collectingSubjects) b -> pagenumber = c_page;
	bk = b ->bindingKind;
	cuc = b -> cardinality_constraint;
	if (cuc) // cardinality is unconstrained
	{
		if (bk == bindingMultiKind)
		{
			svl = (Values)(((ObBinding)b)->value);
			Values_add(svl,v);
			return;
		}
		if (bk == bindingUndefinedKind)
		{
			setBindingValueOb(b,v,cuc);
			return;
		}
		ob_push2(b,v);
		cv = bindingValue(b);
		if (cv == v)
		{
			ob_popn(2);
			return;
		}
		ob_push(cv);
		svl = mk_Values(4);
		dt = svl -> data;
		Arrayob_setn(dt,0,cv);
		Arrayob_setn(dt,1,v);
		dt->length = 2;
		set_ob(((ObBinding)b)->value,svl);
	    b ->bindingKind = bindingMultiKind;
		ob_popn(3);
		return;

	}
	setBindingValueOb(b,v,0);
}



void assertBindingValueInt(Binding b,int v)
{
	int k,bk,cuc;Values svl;Arrayob dt;ob cv,nv;
	if (collectingSubjects) b -> pagenumber = c_page;
	bk = b ->bindingKind;
	cuc = b -> cardinality_constraint;
	if (cuc) // cardinality is unconstrained
	{
		if (bk == bindingMultiKind)
		{
			svl = (Values)(((ObBinding)b)->value);
			Values_addInt(svl,v);
			return;
		}
		if (bk == bindingUndefinedKind)
		{
			setBindingValueInt(b,v,cuc);
			return;
		}
		ob_push2(b,v);
		cv = bindingValue(b);
		if (((cv -> obkind) == int_kind) && ((((boxedint)cv)->value)==v))
		{
			ob_popn(2);
			return;
		}
		nv = int_to_ob(v);
		ob_push2(nv,cv);
		svl = mk_Values(4);
		dt = svl -> data;
		Arrayob_setn(dt,0,cv);
		Arrayob_setn(dt,1,nv);
		dt->length = 2;
		set_ob(((ObBinding)b)->value,svl);
	    b ->bindingKind = bindingMultiKind;
		ob_popn(4);
		return;

	}
	setBindingValueInt(b,v,cuc);
}


void assertBindingValueDouble(Binding b,double v)
{
	int k,bk,cuc;Values svl;Arrayob dt;ob cv,nv;
	if (collectingSubjects) b -> pagenumber = c_page;
	bk = b ->bindingKind;
	cuc = b -> cardinality_constraint;
	if (cuc) // cardinality is unconstrained
	{
		if (bk == bindingMultiKind)
		{
			svl = (Values)(((ObBinding)b)->value);
			Values_addDouble(svl,v);
			return;
		}
		if (bk == bindingUndefinedKind)
		{
			setBindingValueDouble(b,v,cuc);
			return;
		}
		ob_push2(b,v);
		cv = bindingValue(b);
		if (((cv -> obkind) == double_kind) && ((((boxeddouble)cv)->value)==v))
		{
			ob_popn(2);
			return;
		}
		nv = double_to_ob(v);
		ob_push2(nv,cv);
		svl = mk_Values(4);
		dt = svl -> data;
		Arrayob_setn(dt,0,cv);
		Arrayob_setn(dt,1,nv);
		dt->length = 2;
		set_ob(((ObBinding)b)->value,svl);
	    b ->bindingKind = bindingMultiKind;
		ob_popn(4);
		return;

	}
	setBindingValueDouble(b,v,cuc);
}




//follows the get rules: if there is only one value (even if b's kind is Multi), return this
ob getBindingValue(Binding b)
{
	ob v,rs;int bk,ln;Arrayob dt;
	ob_push(b);
	v = bindingValue(b);
	bk = b->bindingKind;
	if (bk == bindingMultiKind)
	{
		dt = ((Values)v)->data;
		ln = dt->length;
		if (ln == 1) rs = Arrayob_selectn(dt,0);
		else rs = v;
	}
	else rs = v;
	ob_pop();
	return rs;
}


StringBuf literalToString(ob v)
{
	int vk;
	vk = v->obkind;
	if (vk == int_kind) return int_to_string(((boxedint)v)->value);
	if (vk == double_kind) return double_to_string(((boxeddouble)v)->value);
	if (vk == seq_kind)  return (StringBuf)v;
	UM_ERROR("Unexpected data in a Literal");
}

int literalToInt(ob v)
{
	int vk;ob tp;
	if (!v) return 0;
	vk = v->obkind;
	if (vk == int_kind) return ((boxedint)v)->value;
	if (vk == double_kind) return (int)(((boxeddouble)v)->value);
	if (vk == seq_kind)
	{
		return StringBuf_to_int(v);
	}
	UM_ERROR("Expected int");
}


double literalToDouble(ob v)
{
	int vk;ob tp;
	if (!v) return 0.0;
	vk = v->obkind;
	if (vk == int_kind) return (double)(((boxedint)v)->value);
	if (vk == double_kind) return ((boxeddouble)v)->value;
	if (vk == seq_kind)
	{
		return StringBuf_to_double(v);
	}
	UM_ERROR("Expected double");
}
//follows the fget (functional get)rules: return the first value if there are multiple values

ob fgetBindingValue(Binding b)
{
	ob v;int bk,ln;Arrayob dt;
	bk = b->bindingKind;
	if (bk == bindingMultiKind)
	{
		v = ((ObBinding)b)->value;
		dt = ((Values)v)->data;
		ln = dt->length;
		if (ln > 0) return Arrayob_selectn(dt,ln-1);
		else return  nul;
	}
	else return bindingValue(b);
}

int fgetBindingValueInt(Binding b)
{
	ob v;int bk,vi,ln;Arrayob dt;
	bk = b->bindingKind;
	if (bk == bindingIntKind) return ((IntBinding)b)->value;
	if (bk == bindingMultiKind)
	{
	    v = ((ObBinding)b)->value;
		dt = ((Values)v)->data;
		ln = dt->length;
		if (ln > 0) return literalToInt(Arrayob_selectn(dt,ln-1));
		else return 0;
	}
	if (bk == bindingObKind) 
	{
	    v = ((ObBinding)b)->value;
		vi = literalToInt(v);
		bindingClearRref(b);
		b -> bindingKind = bindingIntKind;
		((IntBinding)b) -> value = vi;
		return vi;
	}
	UM_ERROR("Expected an int");
}

double fgetBindingValueDouble(Binding b)
{
	ob v;int bk,ln;Arrayob dt;double vd;
	bk = b->bindingKind;
	if (bk == bindingDoubleKind) return ((DoubleBinding)b)->value;
	if (bk == bindingIntKind) return (double)(((IntBinding)b)->value);
	if (bk == bindingMultiKind)
	{
	    v = ((ObBinding)b)->value;
		dt = ((Values)v)->data;
		ln = dt->length;
		if (ln > 0) return literalToDouble(Arrayob_selectn(dt,ln-1));
		else return 0.0;
	}
	if (bk == bindingObKind) 
	{
	    v = ((ObBinding)b)->value;
		vd = literalToDouble(v);
		bindingClearRref(b);
		b -> bindingKind = bindingDoubleKind;
		((DoubleBinding)b) -> value = vd;
		return vd;
	}
	UM_ERROR("Expected a double");
}

ob toValues();

// follows mget rules: always returns Values
ob mgetBindingValue(Binding b)
{
	ob v;int bk,cuc;Arrayob dt;Seqob svl;
	ob_push(b);
	v = bindingValue(b);
	bk = b->bindingKind;
	if (bk == bindingMultiKind) 
	{
		ob_pop();
		return v;
	}
	ob_push(b);
	cuc = b->cardinality_constraint;
	svl = toValues(v);
	if (cuc) 
	{
		if (bk == bindingDoubleKind) // in this case, the to-be-value field does not now contain an ob
			((ObBinding)b) -> value = svl;
		else 
			set_ob(((ObBinding)b)->value,svl);
	    b -> bindingKind = bindingMultiKind;
	}
	ob_popn(2);
	return svl;
}







ob bindingValueCount(Binding b)
{
	ob v,rs;int bk,ln;Arrayob dt;
//	ob_push(b);
	bk = b->bindingKind;
	v = bindingValue(b);

	if (bk == bindingMultiKind)
	{
		dt = ((Values)v)->data;
		return dt->length;
	}
	return 1;
}

int Hashtable_valueCount(Hashtable tb,ob p)
{
	Binding b;
	b = Hashtable_selectBinding(tb,p);
	if (!b) return 0;
	return bindingValueCount(b);
}




int elementsOfType(Seq x,Type tp)
{
	Arraygeneric dt;ob* cno;int cnt,i,ln,dtk,st;
	dt = x -> data;
	dtk = dt -> obkind;
	cnt = 0;
	if (dtk == arrayob_kind)
	{
		ln = dt -> length;
	    cno = Arrayob_contents(dt);
	    for (i = 0;i<ln;i++)
		{
			if (ob_hasType(cno[i],tp))  cnt++;
		}
	}
	st = typeInstanceStorage(tp);
	if (dtk == arrayint_kind)
	{
		if (st != storage_int) return 0;
		return ln;
	}
	if (dtk == arraydouble_kind)
	{
		if (st != storage_double) return 0;
		return ln;
	}


}



int bindingValueCountOfType(Binding b,Type tp)
{
	ob v;int rs,bk,st;
	ob_push(b);
	v = bindingValue(b);
	bk = b->bindingKind;
	if (bk == bindingMultiKind)
	{
		rs =  elementsOfType(v,tp);
		ob_pop();
		return rs;
	}
	if (bk == bindingObKind)
	{
		if (ob_hasType(v,tp)) rs =  1;
		else rs = 0;
		ob_pop();
		return rs;
	}
	st = typeInstanceStorage(tp);
	ob_pop();
	if (bk == bindingIntKind)
	{
		if (st == storage_int) return 1;
		return 0;
	}
	if (bk == bindingDoubleKind)
	{
		if (st == storage_double) return 1;
		return 0;
	}
	return 0;
}

int Hashtable_valueCountOfType(Hashtable tb,ob p,Type tp)
{
	Binding b;
	b = Hashtable_selectBinding(tb,p);
	if (!b) return 0;
	return bindingValueCountOfType(b,tp);
}

ob Hashtable_fgetOb(Hashtable tb,ob p)
  {
	Binding b;
	b = Hashtable_selectBinding(tb,p);
	if (!b) return nul;
	return fgetBindingValue(b);
}


Values emptyValues = nul;

ob Hashtable_mgetOb(Hashtable tb,ob p)
  {
	Binding b;
	b = Hashtable_selectBinding(tb,p);
	if (!b) 
	{
		if (!emptyValues)
		{
			emptyValues = mk_Values(0);
		}
		return emptyValues;
	}
	return mgetBindingValue(b);
}

// get mode
ob Hashtable_getOb(Hashtable tb,ob p)
  {
	Binding b;
   if (p == rdf_typeP)
	   return tb->types;
	b = Hashtable_selectBinding(tb,p);
	if (!b) return (ob)0;
	return getBindingValue(b);
}

ob Hashtable_selectOb(Hashtable tb,ob p)
{
	return Hashtable_getOb(tb,p);
}

// 0 = get mode, 1 = fget mode 2 = mget mode

ob Hashtable_selectOb1(Hashtable tb,ob p,int md)
{
	if (md == 0) return Hashtable_getOb(tb,p);
	if (md == 1) return Hashtable_fgetOb(tb,p);
	return Hashtable_mgetOb(tb,p);
}


// selectInt,selectDouble operate in fget mode

int Hashtable_selectInt(Hashtable tb,ob k)
  {
	Binding b;
	b = Hashtable_selectBinding(tb,k);
	if (!b)  return 0;
	
	return fgetBindingValueInt(b);
}



double Hashtable_selectDouble(Hashtable tb,ob k)
  {
	Binding b;
	b = Hashtable_selectBinding(tb,k);
	if (!b)  return 0.0;
	
	return fgetBindingValueDouble(b);
}


#define init_Hashtable_size 23
#define default_Hashtable_hash_threshold 15



Hashtable  mk_Hashtable0(int k)
   {
   Seqint isa;Hashtable rs;
   isa = mk_Seqint(init_Hashtable_size);
   ob_push(isa);
   Seqint_expand_with_zeros(isa,init_Hashtable_size);

   rs = (Hashtable)heap_alloc(sizeof(Hashtable_struct));
   rs -> pagenumber =  c_page;
   rs -> hashkey = 0;
   rs -> hashtable_variety = k;
   rs -> obkind = hashtable_kind; 
   ob_push(rs);

   set_ob(rs -> goods,mk_empty_Seqob());

   set_ob(rs -> harray,isa);
   rs -> size = init_Hashtable_size;
   rs -> num_values = 0;

   if (alloc_verbose) printf("Allocated Hashtable\n");

   ob_popn(2);
   return rs;
}

Hashtable  mk_Bindingtable()
   {
	return mk_Hashtable0(BINDING_TABLE);
}

int isHashSeq(ob x)
{
	int k;
	if (!x) return 0;
	k = x->obkind;
	if (k != hashtable_kind) return 0;	
    return ((((Hashtable)x)->hashtable_variety) == HASH_SEQ);
}

Hashtable mk_HashSeq()
{
	return mk_Hashtable0(HASH_SEQ);
}

Hashtable mk_StringSet()
{
	return mk_Hashtable0(STRING_SET);
}

Hashtable  Hashtable_copy(Hashtable x)
   {
   Hashtable rs;Seqint har;Seqob gds;
   ob_push(x);

   gds = Seqob_copy(x->goods);
   ob_push(gds);
   har = Seqint_copy(x->harray);
   ob_push(har);
   rs = (Hashtable)heap_alloc(sizeof(Hashtable_struct));
   ob_push(rs);
   rs -> pagenumber = c_page;
   rs -> obkind = x->obkind; 
   rs -> size = x->size;
   rs -> num_values = x->num_values;
   set_ob(rs -> types,x->types);

   set_ob(rs -> goods,gds);

   set_ob(rs -> harray,har);
   if (alloc_verbose) printf("Allocated Hashtable\n");
   ob_popn(4);
   return rs;
}



Binding  mk_Binding(int bk)
   {
	Binding rs;
	if (bk == bindingDoubleKind)
		rs = (Binding)dwa_heap_alloc(sizeof(DoubleBinding_struct));
   else
	   rs = (Binding)heap_alloc(sizeof(ObBinding_struct));
   rs -> obkind = binding_kind;
   rs -> bindingKind = bk;

   rs -> cardinality_constraint = cardinality_functional;
   rs ->pagenumber = c_page;
   if (alloc_verbose) printf("Allocated Binding\n");
   return rs;
}





Hashtable string_intern_table;


string string_intern(string s)
{
  int i,j;
  ob_push(s);
  i = Hashtable_find_spot(string_intern_table,s);
  j = abs(Hashtable_put0(string_intern_table,(ob)s,i))-1;
  ob_pop();
  return (string)Seqob_select(string_intern_table->goods,j);
}




void Hashtable_check(Hashtable s)
{
	Seqob g;int ln,i;
	g = s -> goods;
	ln = g -> data->length;
	for (i =0;i<ln;i++)
		check_ob(s,Seqob_select(g,i));
}

void intern_table_check()
{
	Hashtable_check(string_intern_table);
}

extern int error_on_relabel;
extern int error_on_rebind;


			
// if tp is nul, then the binding should already exist, and its type is not changed
// if v is a boxed int,bk must be bindingIntKind, and similaraly for boxed double

//note: if mvalued, v is the value, and bk is ignored



int propertyIsFunctional(Object ky)
{
	ob pt;int ptk;
	pt = ky->types;
	if (pt == FunctionalPropertyT) return 1;
	if (!pt) ptk = nul_kind; else ptk = pt -> obkind;
	if ((ptk == values_kind) && Values_contains(pt,FunctionalPropertyT)) return 1;
	return 0;
}

Binding  bind1(Hashtable xi,ob ky,ob tp,int bk,ob v,int iv,double dv,int cuci)
  {
  Binding r,xb;int xbk,kk,xk,nk,sp,gi,cuc;int* ha;Hashtable tb;DoubleBinding dbn;
  Values svl;Arrayob dt;ob ovl;
  if (bk == bindingUriKind)  // isuri binding
     {
     if (!(xi&&is_Object(v))) UM_ERROR("Cannot assign a uri to a non-object");
	 kk = ky -> obkind;
     if (!((kk == nstring_kind) || (kk == wstring_kind)))
         UM_ERROR("Expected string key");
	 if (v->hasParent)
	 {
	    if (error_on_relabel)
		  UM_ERROR("Attempt to change the uri of an object"); else
		  printf("Attempt to change the uri of an objec\n");
	 }
	 xk = xi -> hashkey;
	 nk = string_hash2(xk,(string)ky);
	 ((Object)v)->hashkey = nk;

	 }
  tb = (Hashtable)xi;
  ob_push2(tb,ky);
  ob_push2(v,tp);
  if (tb->needs_rehash) rehash(tb);
  sp = Hashtable_find_spot(tb,ky);
  ha = Arrayint_contents(tb->harray->data);
  gi = ha[sp];
  if (gi == 0) r = (Binding)0; else
	  r = Seqob_select(tb->goods,gi-1);
  if (!r)
     {
     xb = mk_Binding(bk);
	 cuc = cuci;
	 if (cuc)
	 {
		 if (propertyIsFunctional(ky)) cuc = cardinality_functional;
	 }		 
	 xb -> cardinality_constraint = cuc;
	 ob_push(xb);
     set_ob(xb -> key,ky);
	 if (bk == bindingIntKind) ((IntBinding)xb) -> value =iv;
	 else  
	 if (bk == bindingDoubleKind) 
	 {
		 dbn =  (DoubleBinding)xb;
		 dbn -> value =dv;
	 }
	 else
	 if ((bk == bindingObKind)||(bk == bindingUriKind)) set_ob(((ObBinding)xb) -> value,v);
	 if (tp) set_ob(xb->valueType,tp);
     set_ob(xb -> parent,(ob)tb);
     Hashtable_fill_spot(tb,sp,(ob)xb);
	 if (bk == bindingUriKind)
	    {
		v -> hasUri = 1;

		v -> hasParent = 1;
		set_ob(((Object)v)->parent,xb);
		}
	 ob_popn(5);
     return xb;
     }
  UM_ERROR("Internal:bind1 is only for creating new bindings");
 }  





int sameBindingValue(Binding x,Binding y)
{
	int kx,ky;
	if (x == y) return 1;
	kx = x->bindingKind;
	ky = y->bindingKind;
	if (kx == ky)
	{
		if (kx == bindingDoubleKind) 
		return (((DoubleBinding)x)->value) == (((DoubleBinding)y) -> value);
		 return (((IntBinding)x)->value) == (((IntBinding)y)->value);
	}
	return 0;
}

int sameValue(ob x,ob y)
{
	int kx,ky;
	if (x == y) return 1;
	kx = x->obkind;
	ky = y->obkind;
	if (kx == ky)
	{
		if (kx == int_kind) 
			return (((boxedint)x)->value)==(((boxedint)y)->value);
		if (kx == double_kind) 
			return (((boxeddouble)x)->value)==(((boxeddouble)y)->value);
	}
    return 0;
}




int addBinding(Hashtable xi,Binding b,int override)
  {
  int sp,gi;Hashtable tb;string nm;int* ha;Seqob g;int isb;Binding cb;
  tb = (Hashtable)xi;
  ob_push2(tb,b);
  nm = b->key;
  if (tb->needs_rehash) rehash(tb);
  sp = Hashtable_find_spot(tb,nm);

  g = tb->goods;
  ha = Arrayint_contents(tb->harray->data);
  gi = ha[sp];
  cb = nul;
  if (gi > 0) cb = (Binding)Seqob_select(g,gi-1);
  isb =  (gi > 0) && cb; //is there a binding to nm?

  if (isb) 
  {
	  if (override) 
	  {
		  Seqob_set(g,gi-1,b);
		  set_ob(b -> parent,(ob)tb);
	  }	
	  else
	  if (sameBindingValue(b,cb)) 
	  {
		  ob_popn(2);
		  return 0;
	  }
  }
  else
  {
	  set_ob(b -> parent,(ob)tb);
	  Hashtable_fill_spot(tb,sp,(ob)b);
  }
  ob_popn(2);
  return isb;
}

void assignNewType(Binding b,ob ntp)
{
	ob ctp;
	if (ntp)
	{
		ctp = b->valueType;
		if (ctp && !isSubClassOf(ntp,ctp)) 
			UM_ERROR("Incompatible change of type of a variable");
		set_ob(b->valueType,ntp);
    }
}

void collectSubject(Object s)
{
	int sv,sk;
	if (!collectingSubjects) return;
	sk = s -> obkind;
	if (sk == hashtable_kind)
	{
		if (((Hashtable)s)->isExtension) return;
	}
	if ((s->pagenumber) != c_page) s->pagenumber = -1; // indicating a multipage object
	if (!(s->tempbit))
	{
		sv = allocating_statically;
		allocating_statically = 0;
		Seqob_add1(collectedSubjects,s);
		allocating_statically = sv;
		s->tempbit = 1;
	}
}


// Replaces the triple;does not add it if one is present
// note that a boxed 0 ends up with bindingIntKind, and 0 with bindingObKind
// This preserves the distinction between 0 ~ ob and nil

Binding  Hashtable_setOrAssertObT(int asrt,Hashtable xi,ob ky,ob v,ob tp,int cuc)
{
	int vk;Binding b,rs;
	b = Hashtable_selectBinding(xi,ky);
	ob_push(xi);
	if (!b)
	{

		if (!v) 
			rs = bind1(xi,ky,tp,bindingObKind,nul,0,0.0,cuc);
		else
		{
		    vk = v -> obkind;
		    if (vk == int_kind) 
				rs = bind1(xi,ky,tp,bindingIntKind,nul,((boxedint)v)->value,0.0,cuc);
			else
			{
				if (vk == double_kind) 
		           rs =bind1(xi,ky,tp,bindingDoubleKind,nul,0,((boxeddouble)v)->value,cuc);
				else
				   rs = bind1(xi,ky,tp,bindingObKind,v,0,0.0,cuc);
			}
		}
	ob_push(rs);
	if (collectingSubjects) collectSubject(xi);
	ob_popn(2);
	return rs;
    }
	assignNewType(b,tp);
	if (asrt) assertBindingValueOb(b,v); else setBindingValueOb(b,v,cuc);
	ob_push(b);
	if (collectingSubjects) collectSubject(xi);
	ob_popn(2);
	return b;
}

Binding  Hashtable_setObT(Hashtable xi,ob ky,ob v,ob tp,int cuc)
{
  return Hashtable_setOrAssertObT(0,xi,ky,v,tp,cuc);
}






Binding  Hashtable_setIntT(Hashtable xi,ob ky,int v,ob tp,int cuc)
{
	int vk;Binding b,rs;
	b = Hashtable_selectBinding(xi,ky);
	ob_push(xi);
	if (!b) 
	{
		
		rs = bind1(xi,ky,tp,bindingIntKind,nul,v,0.0,cuc);
		ob_push(rs);
		if (collectingSubjects) collectSubject(xi);
		ob_popn(2);
		return rs;
	}
	ob_push(b);
	assignNewType(b,tp);
	setBindingValueInt(b,v,cuc);
	if (collectingSubjects) collectSubject(xi);
	ob_popn(2);
	return b;
}



Binding  Hashtable_setDoubleT(Hashtable xi,ob ky,double v,ob tp,int cuc)
{
	int vk;Binding b,rs;
	b = Hashtable_selectBinding(xi,ky);
	ob_push(xi);
	if (!b) 
	{
		
		rs = bind1(xi,ky,tp,bindingDoubleKind,nul,0,v,cuc);
		ob_push(rs);
		if (collectingSubjects) collectSubject(xi);
		ob_popn(2);
		return rs;
	}
	ob_push(b);
	assignNewType(b,tp);
	setBindingValueDouble(b,v,cuc);
	if (collectingSubjects) collectSubject(xi);
	ob_popn(2);
	return b;
}


Binding  Hashtable_bindUri(Hashtable xi,string nm,ob v)
{
	Binding b;
	b =  bind1(xi,(ob)nm,nul,bindingUriKind,v,0,0.0,0);
	if (collectingSubjects) collectSubject(xi);
	return b;
}


Binding Hashtable_setOb(Hashtable xi,ob ky,ob v,int cuc)
{
    return Hashtable_setObT(xi,ky,v,nul,cuc);
}

// 1 means cardinality unconstrained

Binding Hashtable_assertOb(Hashtable xi,ob ky,ob v)
{
	return Hashtable_setOrAssertObT(1,xi,ky,v,nul,1);
}


Binding Hashtable_setInt(Hashtable xi,ob ky,int v,int cuc)
{
	int vk;Binding b;
	b = Hashtable_selectBinding(xi,ky);
	if (!b) return bind1(xi,ky,nul,bindingIntKind,nul,v,0.0,cuc);
	setBindingValueInt(b,v,cuc);
	if (collectingSubjects) collectSubject(xi);
	return b;
}




Binding Hashtable_setUndefined(Hashtable xi,ob ky)
{
	int vk;Binding b;
	b = Hashtable_selectBinding(xi,ky);
	if (!b) return bind1(xi,ky,nul,bindingUndefinedKind,nul,nul,0.0,1);
	setBindingValueUndefined(b);
	if (collectingSubjects) collectSubject(xi);
	return b;
}

Binding Hashtable_assertInt(Hashtable xi,ob ky,int v)
{
	int vk;Binding b;
	b = Hashtable_selectBinding(xi,ky);
	if (!b) return bind1(xi,ky,nul,bindingIntKind,nul,v,0.0,1);
	assertBindingValueInt(b,v);
	if (collectingSubjects) collectSubject(xi);
	return b;
}



Binding Hashtable_setDouble(Hashtable xi,ob ky,double v,int cuc)
{
	int vk;Binding b;
	b = Hashtable_selectBinding(xi,ky);
	if (!b) return bind1(xi,ky,nul,bindingDoubleKind,nul,0,v,cuc);
	setBindingValueDouble(b,v,cuc);
	if (collectingSubjects) collectSubject(xi);
	return b;
}


Binding Hashtable_assertDouble(Hashtable xi,ob ky,double v)
{
	int vk;Binding b;
	b = Hashtable_selectBinding(xi,ky);
	if (!b) return bind1(xi,ky,nul,bindingDoubleKind,nul,0,v,1);
	assertBindingValueDouble(b,v);
	if (collectingSubjects) collectSubject(xi);
	return b;
}





// Interning of Regarding and parametric tyeps are handled as
// special cases, with their own intern tables

Hashtable init_root()
{
	rootResource = mk_Bindingtable();
	rootResource -> hashkey = hash_string1("root",4);
	regardingIntern = mk_HashSeq();
	typeIntern = mk_HashSeq();
	seqIntern = mk_HashSeq();
	functionIntern = mk_HashSeq();
	return rootResource;
}



int objectHashkey(Object x)
{
	return x->hashkey;
}

void setCardinalityConstraint(Binding b,int c)
{
	b->cardinality_constraint = c;
}
// assumes type cardinality_contraint = cardinality_one (only case where allocation is warranted)

Binding allocBinding(Hashtable x,ob p,Type tp)
{
	int st;Binding rs;ob v;
	ob_push2(x,p);
	if (!tp) st = storage_ob; else
	st = typeInstanceStorage(tp);
	if (st == storage_int) rs =  Hashtable_setInt(x,p,0,cardinality_functional);
	else
	if (st == storage_double) rs =  Hashtable_setDouble(x,p,0.0,cardinality_functional);
	else
		rs = Hashtable_setOb(x,p,nul,cardinality_functional);
	ob_popn(2);
	return rs;
}



void enforceCardinalityConstraint(Hashtable x,ob p,int c)
{
    Binding b;int bk,ln,vk;Values v;ob v0;Arrayob dt;
	ObBinding obn;IntBinding ibn;DoubleBinding dbn;
	b = selectBinding(x,p);
	if (!b) return;
	bk = b ->bindingKind;
	b -> cardinality_constraint = c;
	if (bk == bindingMultiKind)
	{
		if (c == cardinality_unconstrained) return;
		obn = (ObBinding)b;
		// put the first value in the multivalue sequence into the value field
		v = (Values)(((ObBinding)b)->value);
		dt = v->data;
		ln = dt->length;
		if (ln == 0)
		{
			set_ob(obn -> value,nul);
			b -> bindingKind = bindingUndefinedKind;
			return;
		}
		v0 = Arrayob_select(dt,0);
		if ( !v0) UM_ERROR("Unexpected");
		vk = v0->obkind;
		if (vk == int_kind) 
		{
			ibn = (IntBinding)b;
			ibn -> value = ob_to_int(v0);
			b -> bindingKind = bindingIntKind;
			return;
		}
		if (vk == double_kind) 
		{
			dbn = (DoubleBinding)b;
			dbn -> value = ob_to_double(v0);
			b -> bindingKind = bindingDoubleKind;
			return;
		}
		if (bk != bindingObKind)
		{ 
			 // nul so as not to confuse set_ob
			 ((ObBinding)b)->value = nul;
			 b ->bindingKind = bindingObKind;
		 }
		set_ob(obn->value,v0);
		return;
	}
    return;
}



Values literalsToInts(Values v)
{
	Arrayob dt;int ln,i,iv,cvk;ob cv,tp,ivo;
	dt = v -> data;
	ln = dt-> length;
	ob_push(dt);
	for (i=0;i<ln;i++)
	{
		cv = Arrayob_selectn(dt,i);
		cvk = cv->obkind;
		if (cvk == seq_kind)
		{
			tp = ((Object)v) -> types;
			if (tp == LiteralT) 
			{
				iv = StringBuf_to_int(cv);
				ivo = int_to_ob(iv);
				Arrayob_setn(dt,i,ivo);
			}
			else UM_ERROR("Expected rdfs:Literal or int");
		}
		else 
		if (cvk != int_kind) UM_ERROR("Expected rdfs:Literal or int");
	}
    ob_pop();
}





void convertLiterals(Hashtable x,ob p,Type tp)
{
    Binding b;int bk;Values v;ob vo;int vi;
	b = selectBinding(x,p);

	if (!b) return;
	bk = b ->bindingKind;
	if (bk == bindingMultiKind)
	{
		// put the first value in the multivalue sequence into the value field
		v = (Values)(((ObBinding)b)->value);
		if (tp == intT) literalsToInts(v);
	}
	else
	if (bk == bindingObKind)
	{
		vo = (Values)(((ObBinding)b)->value);
		if (tp == intT) 
		{
			vi = literalToInt(vo);
			bindingClearRref(b);
			((IntBinding)b)->value = vi;
			b -> bindingKind = bindingIntKind;
		}
	}
}



			
			




