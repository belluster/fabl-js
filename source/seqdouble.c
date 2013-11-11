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






// low level; pre boxing 

Arrayint mk_Arraydouble(int capacity)
{
	Arraydouble rs;
	int* dt;
	rs = (Arraydouble)heap_alloc(sizeof(Arraydouble_struct)+8*capacity);
	rs -> length = 0;
	rs -> capacity = capacity;
	rs -> obkind = arraydouble_kind;
	if (alloc_verbose) printf("Allocated seqdouble with capacity %d\n",capacity);
	return rs;
}



double Arraydouble_select(Arraydouble s,int n)
{
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	return Arraydouble_selectn(s,n);
}



Seqdouble mk_Seqdouble(int capacity)
{
	return (Seqdouble)mk_Seq((ob)mk_Arraydouble(capacity));
}


	
// UNSAFE! (no bounds check on dst)
void Arraydouble_copyto(Arraydouble dst,Arraydouble src) 
{
	int ln;
	ln = src->length;
memcpy((void*)Arraydouble_contents(dst),(void*)Arraydouble_contents(src),8*ln);
if (deltaEnabled && (dst->tenured)) declareRangeModified(dst,Arraydouble_preamble_wsize+2*ln,whichHeap(dst));
}




double Seqdouble_select(Seqdouble s,int n)
{
	Arraydouble sq;int sqk;ob rso;
    sq = s->data;
	if (n >=(sq->length)) UM_ERROR("out of bounds sequence access");
	sqk = sq -> obkind;
	if (sqk == arrayob_kind)
	{
		rso = Arrayob_selectn(sq,n);
		if ((rso->obkind) != double_kind) UM_ERROR("Non double in SeqOf(double) select");
		return ((boxeddouble)rso)->value;
	}
    if (sqk == arraydouble_kind) return Arraydouble_selectn(sq,n);
	UM_ERROR("Non double contents in Seqdouble select");
}



void Seqdouble_set(Seqint s,int n,double v)
{
	Arraydouble sq;int hpi;
    sq = s->data;
	if (n >= (sq->length)) UM_ERROR("out of bounds sequence access");
	Arraydouble_setn(sq,n,v);
	if (deltaEnabled && (sq->tenured))
	{
		hpi = whichHeap(sq);
		Arraydword_declareModified(sq,n,hpi);
	}
}



Seqdouble mk_empty_Seqdouble()
{
	return mk_Seqdouble(INITIAL_SEQUENCE_SIZE);
}

//zzzzzzzzzzz;




void Seqdouble_ensure_capacity(Seqdouble bx,int ncp)
{
	Arraydouble s,nsq;int ln,idr,*md;
    s = bx->data;
	if (ncp > (s ->capacity))
	   {
	   ob_push2(bx,s);
	   nsq = mk_Arraydouble(ncp);
	   ln = s->length;
	   memcpy((char*)Arraydouble_contents(nsq),(char*)Arraydouble_contents(s),ln*8);
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
  


Seqdouble Seqdouble_add(Seqdouble bx,double n)
{
	int ln,nln,cp,hpi,*md;Arraydouble sq;
    sq = bx->data;
	ln = sq->length;
	nln = ln+1;
	cp = sq->capacity;
	ob_push(bx);
	if (nln > cp) 
	{
		Seqdouble_ensure_capacity(bx,nln*2);
        sq = bx->data;
	}
	sq -> length = nln;
	Arraydouble_setn(sq,ln,n);
	if (deltaEnabled && (sq->tenured))
	{
		hpi = whichHeap(sq);
		Arraydword_declareModified(sq,ln,hpi);
		md = &(sq->length);
		declareModifiedf(md,hpi);
    }

	ob_pop();
	return bx;
}


// TO HERE
Seqdouble Seqdouble_append(Seqdouble s,Seqdouble x)
{
	Arraydouble sd,xd;int hpi,ln,cp,lnx,nln,*md;double *dt,*dtx;
	sd = s->data;
	xd = x->data;
	ln = sd -> length;
	cp = sd -> capacity;
	lnx = xd -> length;
	nln = ln + lnx;
	ob_push2(s,x);
	if (nln > cp) 
	{
		Seqdouble_ensure_capacity(s,nln*2);
		xd = x->data;
		sd = s->data;
	}
	sd -> length = nln;
	dt = Arraydouble_contents(sd);
	dtx = Arraydouble_contents(xd);
	memcpy((char*)(dt + ln),(char*)dtx,lnx*8);
	if (deltaEnabled && (sd->tenured)) 
	{
		hpi = whichHeap(sd);
		declareRangeModified(dt+ln,lnx*2,hpi);
		md = &(sd->length);
		declareModifiedf(md,hpi);
	}	ob_popn(2);
	return s;
}



Seqdouble Seqdouble_copy(Seqdouble s)
{
	Arraydouble rsd,sd,hpi;Seqdouble rs;int ln;double *dt,*dtr;
	sd = s->data;
	ob_push2(s,sd);
	ln = sd->length;
	rs = mk_Seqdouble(ln);
	rsd = rs->data;
	set_ob(rs->types,rs->types);
	rsd -> length = ln;
	dt = Arraydouble_contents(sd);
	dtr = Arraydouble_contents(rsd);
    memcpy((char*)dtr,(char*)dt,ln * 8);
	if (deltaEnabled && (rsd->tenured)) 
	{
		hpi = whichHeap(rsd);
		declareRangeModified(dtr,ln*2,hpi);
		declareModifiedf(&(rsd->length),hpi);
	}	ob_popn(2);
    return rs;
}

int Seqdouble_contains(Seqdouble s,int n)
{
	Arraydouble sd;int ln,i;double *dt;
	sd = s->data;
	ln = sd -> length;
	dt = Arraydouble_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == n) return 1;
	}
	return 0;
}

//-1 means not found
int Seqdouble_find(Seqdouble s,double n)
{
	Arraydouble sd;int ln,i;double *dt;
	sd = s -> data;
	ln = sd -> length;
	dt = Arraydouble_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == n) return i;
	}
	return -1;
}

void  Seqdouble_expand_with_zeros(Seqdouble s,int ln)
  {
  int cln,i,hpi;double *gd;Arraydouble sd;
  sd = s->data;
  cln = sd->length;
  if (cln < ln)
     {
	  ob_push(s);
     Seqdouble_ensure_capacity(s,ln);
	 sd = s->data;
     gd = Arraydouble_contents(sd);
     for (i = cln;i<ln;i++)
	     gd[i] = 0;
	 sd ->length = ln;
	 if (deltaEnabled && (sd->tenured))
	 {
		 hpi = whichHeap(sd);
		 declareRangeModified(gd+cln,2*(ln-cln),hpi);//
		 declareModifiedf(&(sd->length),hpi);
	 }
	 ob_pop();
	 }
  }

// used in serialization.  Takes n words starting at word offset ofs within object
// src and appends them onto dst

// APPARENTLY UNUSED

void  Seqdouble_append_at_offset(Seqdouble dst,ob src,int ofs,int n)
{
	int* dtd,dts;int ln,hpi,cp,nln;Arraydouble dstd;
	dstd = dst -> data;
	ln = dstd -> length;
	cp = dstd -> capacity;
	nln = ln + n;
	ob_push2(dst,src);
	if (nln > cp) 
	{
		Seqdouble_ensure_capacity(dst,nln*2);
		dstd = dst->data;
	}
	dstd -> length = nln;
	dtd = Arraydouble_contents(dstd);
	dts = ((double*)src + ofs);
	memcpy((char*)(dtd + ln),(char*)dts,n*8);
	if (dstd->tenured)
	{
		hpi = whichHeap(dstd);
		declareRangeModified(dtd+ln,2*n,hpi);
		declareModifiedf(&(dstd->length),hpi);
	}
	ob_popn(2);
//	return s;
}
