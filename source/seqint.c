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



#define INITIAL_SEQUENCE_SIZE 4

// first generic functions
Seq mk_Seq(ob dt)
{
	Seq rs;
	ob_push(dt);
	rs = (Seq)heap_alloc(sizeof(Seq_struct));
	set_ob(rs -> data,dt);
	rs -> obkind = seq_kind;
    rs ->pagenumber = c_page;
	ob_pop();
	return rs;
}

//generic

void Seq_reset(Seq x)
{
	int dtk;Arrayob dt;int* dtd;ob* md;
	dt = x->data;
	dtk = (dt->obkind);
	if (dtk == arrayob_kind) Seqob_set_length(x,0);//nulls dt
	else  
	{
		dt -> length = 0;
		if (deltaEnabled && (x->tenured))
		{
			md = &(dt->length);
			declareModifiedf(md,whichHeap(x));
		}
	}
}

void Seq_set_length(Seq x,int n)
{
	int dtk;Arrayob dt;int* dtd;ob* md;
	dt = x->data;
	dtk = (dt->obkind);
	if (dtk == arrayob_kind) Seqob_set_length(x,n);//nulls dt
	else  
	{
		dt -> length = n;
		if (deltaEnabled && (x->tenured))
		{
			md = &(dt->length);
			declareModifiedf(md,whichHeap(x));
		}
	}
}

Seqint Seqint_copy();
//generic
Seq Seq_copy(Seq x)
{
	int dtk;Arraygeneric dt;int* dtd;
	dt = x->data;
	dtk = (dt->obkind);
	switch (dtk)
	{
	case arrayob_kind:return Seqob_copy(x);
	case arrayint_kind:return Seqint_copy(x);
	case arraybyte_kind:return Seqbyte_copy(x);
	case arraydouble_kind:return Seqdouble_copy(x);
	default:UM_ERROR("Bad kind in Seq_copy");
	}
}


int Seq_length(Seq x)
{
	checkOb(x);
	return x->data->length;
}

int Seq_capacity(Seq x)
{
	return x->data->capacity;
}

int Seq_dataKind(ob x)
{
	int xk;
	if (x)
	{
		xk = x->obkind;
		if ((xk == seq_kind)||(xk == values_kind))
			return ((Seq)x)->data->obkind;
	}
	return 0;
}


// low level; pre boxing 

Arrayint mk_Arrayint(int capacity)
{
	Arrayint rs;
	int* dt;
	rs = (Arrayint)heap_alloc(sizeof(Arrayint_struct)+4*capacity);
	rs -> length = 0;
	rs -> capacity = capacity;
	rs -> obkind = arrayint_kind;
	if (alloc_verbose) printf("Allocated seqint with capacity %d\n",capacity);
	return rs;
}



ob Arrayint_select(Arrayint s,int n)
{
	ob* dt;
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	return Arrayint_selectn(s,n);
}



Seqint mk_Seqint(int capacity)
{
	return (Seqint)mk_Seq((ob)mk_Arrayint(capacity));
}




//declareModified to here
	
// UNSAFE! (no bounds check on dst)
void Arrayint_copyto(Arrayint dst,Arrayint src) 
{
	int ln;
	ln = src->length;
memcpy((void*)Arrayint_contents(dst),(void*)Arrayint_contents(src),4*ln);
if (deltaEnabled && (dst->tenured)) declareRangeModified(dst,Array_preamble_wsize+ln,whichHeap(dst));
}


// needed for selecting entries of a Values represeting a multiple int values


int Seqint_select(Seqint s,int n)
{
	Arrayint sq; int sk;
    sq = s->data;
	if (n >=(sq->length)) UM_ERROR("out of bounds sequence access");
	sk = sq->obkind;
	if (sk == arrayint_kind) return Arrayint_selectn(sq,n);
	if (sk == arrayob_kind) return ob_to_int(Arrayob_selectn(sq,n));
	UM_ERROR("Wrong kind of data in Seqint_select");
}



void Seqint_set(Seqint s,int n,int v)
{
	Arrayint sq;int hpi;
    sq = s->data;
	if (n >= (sq->length)) UM_ERROR("out of bounds sequence access");
	Arrayint_setn(sq,n,v);
	if (deltaEnabled && (sq->tenured))
	{
		hpi = whichHeap(sq);
		Arrayword_declareModified(sq,n,hpi);
	}
}



Seqint mk_empty_Seqint()
{
	return mk_Seqint(INITIAL_SEQUENCE_SIZE);
}





void Seqint_ensure_capacity(Seqint bx,int ncp)
{
	Arrayint s,nsq;int ln,idr,*md;
    s = bx->data;
	if (ncp > (s ->capacity))
	   {
	   ob_push2(bx,s);
	   nsq = mk_Arrayint(ncp);
	   ln = s->length;
	   memcpy((char*)Arrayint_contents(nsq),(char*)Arrayint_contents(s),ln*4);
	   nsq -> length = ln;
	   set_ob(bx->data,nsq);
	   if (deltaEnabled && (nsq->tenured))
	   {
		   md = &(nsq->length);
		   declareModifiedf(md,whichHeap(nsq));
	   }
	   ob_popn(2);
	   }
}
  
// FIX HERE

Seqint Seqint_add(Seqint bx,int n)
{
	int hpi,ln,nln,cp;Arrayint sq;int *md;
    sq = bx->data;
	ln = sq->length;
	nln = ln+1;
	cp = sq->capacity;
	ob_push(bx);
	if (nln > cp) 
	{
		Seqint_ensure_capacity(bx,nln*2);
        sq = bx->data;
	}
	sq -> length = nln;
	Arrayint_setn(sq,ln,n);
	if (deltaEnabled && (sq->tenured))
	{
		hpi = whichHeap(sq);
		Arrayword_declareModified(sq,ln,hpi);
		md = &(sq->length);
		declareModifiedf(md,hpi);
    }
	ob_pop();
	return bx;
}



Seqint Seqint_append(Seqint s,Seqint x)
{
	Arrayint sd,xd;int hpi,ln,cp,lnx,nln,*dt,*dtx,*md;
	sd = s->data;
	xd = x->data;
	ln = sd -> length;
	cp = sd -> capacity;
	lnx = xd -> length;
	nln = ln + lnx;
	ob_push2(s,x);
	if (nln > cp) 
	{
		Seqint_ensure_capacity(s,nln*2);
		xd = x->data;
		sd = s->data;
	}
	sd -> length = nln;
	dt = Arrayint_contents(sd);
	dtx = Arrayint_contents(xd);
	memcpy((char*)(dt + ln),(char*)dtx,lnx*4);
	if (deltaEnabled && (sd->tenured)) 
	{
		hpi = whichHeap(sd);
		declareRangeModified(dt+ln,lnx,hpi);
		md = &(sd->length);
		declareModifiedf(md,hpi);
	}
	ob_popn(2);
	return s;
}



Seqint Seqint_copy(Seqint s)
{
	Arrayint rsd,sd;Seqint rs;int hpi,ln,*dt,*dtr;
	sd = s->data;
	ob_push2(s,sd);
	ln = sd->length;
	rs = mk_Seqint(ln);
	rsd = rs->data;
	set_ob(rs->types,rs->types);
	rsd -> length = ln;
	dt = Arrayint_contents(sd);
	dtr = Arrayint_contents(rsd);
    memcpy((char*)dtr,(char*)dt,ln * 4);
	
	if (deltaEnabled && (rsd->tenured)) 
	{
		hpi = whichHeap(rsd);
		declareRangeModified(dtr,ln,hpi);
		declareModifiedf(&(rsd->length),hpi);
	}
	ob_popn(2);
    return rs;
}

int Seqint_contains(Seqint s,int n)
{
	Arrayint sd;int ln,i,*dt;
	sd = s->data;
	ln = sd -> length;
	dt = Arrayint_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == n) return 1;
	}
	return 0;
}

//-1 means not found
int Seqint_find(Seqint s,int n)
{
	Arrayint sd;int ln,i,*dt;
	sd = s -> data;
	ln = sd -> length;
	dt = Arrayint_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == n) return i;
	}
	return -1;
}

void  Seqint_expand_with_zeros(Seqint s,int ln)
  {
  int hpi,cln,i,*gd,*md;Arrayint sd;
  sd = s->data;
  cln = sd->length;
  if (cln < ln)
     {
	  ob_push(s);
     Seqint_ensure_capacity(s,ln);
	 sd = s->data;
     gd = Arrayint_contents(sd);
     for (i = cln;i<ln;i++)
	     gd[i] = 0;
	 sd ->length = ln;
	 if (deltaEnabled && (sd->tenured))
	 {
		 hpi = whichHeap(sd);
		 declareRangeModified(gd+cln,ln-cln,hpi);//
		 declareModifiedf(&(sd->length),hpi);
	 }
	 ob_pop();
	 }
  }

// used in serialization.  Takes n words starting at word offset ofs within object
// src and appends them onto dst


void  Seqint_append_at_offset(Seqint dst,ob src,int ofs,int n)
{
	int* dtd,dts,hpi,ln,cp,nln;Arrayint dstd;
	dstd = dst -> data;
	ln = dstd -> length;
	cp = dstd -> capacity;
	nln = ln + n;
	ob_push2(dst,src);
	if (nln > cp) 
	{
		Seqint_ensure_capacity(dst,nln*2);
		dstd = dst->data;
	}
	dstd -> length = nln;
	dtd = Arrayint_contents(dstd);
	dts = ((int*)src + ofs);
	memcpy((char*)(dtd + ln),(char*)dts,n*4);
	if (dstd->tenured)
	{
		hpi = whichHeap(dstd);
		declareRangeModified(dtd+ln,n,hpi);
		declareModifiedf(&(dstd->length),hpi);
	}

	ob_popn(2);
//	return s;
}

Seq mkEmptySeq1(Type s,int ln)
  {
  int st;Type es;Seq rs;
  es = (Type)typeParam(s);
  if (!es) UM_ERROR("expected sequence sort input to mk_emptysequence");
  if (es == byteT)
     return mk_Seqbyte(ln);
  else
     {
	  ob_push(s);
	 st = typeInstanceStorage(es);
	 if (st == storage_ob) rs = (Seq)mk_Seqob(ln); else
	 if (st == storage_int) rs = (Seq)mk_Seqint(ln); 
	 else rs = (Seq)mk_Seqdouble(ln);
	 set_ob(rs->types,(ob)s);
	 ob_pop();
	 return rs;

	 }
  }

ob mkEmptySeq(Type s)
{
	return mkEmptySeq1(s,INITIAL_SEQUENCE_SIZE);
}

