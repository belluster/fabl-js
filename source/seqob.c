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

// These operations work on Values as well.

Arrayob mk_Arrayob(int capacity)
{
	Arrayint rs;
	int* dt;
	rs = (Arrayob)heap_alloc(sizeof(Arrayint_struct)+4*capacity);
	rs -> length = 0;
	rs -> capacity = capacity;
	rs -> obkind = arrayob_kind;
	if (alloc_verbose) printf("Allocated seqob with capacity %d\n",capacity);
	return rs;
}


ob Arrayob_select(Arrayob s,int n)
{
	ob* dt;
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	if ((s->obkind)!= arrayob_kind) UM_ERROR("Wrong kind of sequence in select");
	return Arrayob_selectn(s,n);
}

void Arrayob_set(Arrayob s,int n,ob v)
{
	ob* dt;
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	Arrayob_setn(s,n,v);
}


Seqob mk_Seqob(int capacity)
{
	return (Seqob)mk_Seq((ob)mk_Arrayob(capacity));
}



// UNSAFE! (no bounds check on dst)


void Arrayob_copyto(Arrayob dst,Arrayob src) 
{
int i,ln,*md;
ob *dcn,*scn;
ln = src -> length;
dcn = Arrayob_contents(dst);
scn = Arrayob_contents(src);
for (i = 0;i<ln;i++) set_obp(dcn+i,scn[i]);
dst -> length = ln;
if (deltaEnabled && (dst->tenured))
{
	md = &(dst->length);
	declareModifiedf(md,whichHeap(dst));
}
}

// UNSAFE! (no bounds check on dst)


void Arrayob_copyto2(Arrayob dst,Arrayob src,int ln) 
{
int i;
ob *dcn,*scn;
dcn = Arrayob_contents(dst);
scn = Arrayob_contents(src);
for (i = 0;i<ln;i++) set_obp(dcn+i,scn[i]);
}





ob Seqob_select(Seqob s,int n)
{
	Arrayob sq;
    sq = s->data;
	if (n >=(sq->length)) UM_ERROR("out of bounds sequence access");
	if ((sq->obkind)!= arrayob_kind) UM_ERROR("Wrong kind of sequence in select");
	return Arrayob_selectn(sq,n);
}



void Seqob_set(Seqob s,int n,ob v)
{
	Arrayob sq;
	if ((s->obkind) != seq_kind) UM_ERROR("Attempt to modify a values sequence");
    sq = s->data;
	if (n >= (sq->length)) UM_ERROR("out of bounds sequence access");
	Arrayob_setn(sq,n,v);
}



Seqob mk_empty_Seqob()
{
	return mk_Seqob(INITIAL_SEQUENCE_SIZE);
}





void Seqob_ensure_capacity(Seqob bx,int ncp)
{
	Arrayob s,nsq;int ln,idr,*md;
    s = bx->data;
	if (ncp > (s ->capacity))
	   {
	   ob_push2(bx,s);
	   nsq = mk_Arrayob(ncp);
	   ln = s->length;
	   Arrayob_copyto(nsq,s);
	   nsq -> length = ln;
	   if (deltaEnabled && (nsq->tenured))
	   {
		   md = &(nsq->length);
		   declareModifiedf(md,whichHeap(nsq));
	   }
	   set_ob(bx->data,nsq);
	   ob_popn(2);
	   }
}
  


Seqob Seqob_add1(Seqob bx,ob n)
{
	int ln,nln,cp;Arrayob sq;
    sq = bx->data;
	ln = sq->length;
	if (ln == 1198)
	{
		ln = ln;
	}
	nln = ln+1;
	cp = sq->capacity;
	ob_push2(bx,n);
	if (nln > cp) 
	{
		Seqob_ensure_capacity(bx,nln*2);
        sq = bx->data;
	}
	sq -> length = nln;
	if (deltaEnabled && (sq->tenured))
		   declareModifiedf(&(sq->length),whichHeap(sq));
	Arrayob_setn(sq,ln,n);
	ob_popn(2);
	return bx;
}

Seqob Seqob_add(Seqob bx,ob n)
{
	if ((bx->obkind) != seq_kind) UM_ERROR("Attempt to modify a values sequence");
    return Seqob_add1(bx,n);
}

int Arrayob_eqContents(Arrayob xd,Arrayob yd,int startat)
{
	ob *cnx,*cny;int xln,yln,i;
	xln = xd->length;
	yln = yd->length;
	if (xln != yln) return 0;
	cnx = Arrayob_contents(xd);
	cny = Arrayob_contents(yd);
	for (i=startat;i<xln;i++)
	{
		if ((*(cnx++)) != (*(cny++))) return 0;
	}
	return 1;
}

int Seqob_eqContents(Seqob x,Seqob y,int startat)
{
	return Arrayob_eqContents(x->data,y->data,startat);
}







Seqob Seqob_insert(Seqob sq,int n,ob x)
{
	int* dt;int i,ln,cp,nln;Arrayob s;
	if ((sq->obkind) != seq_kind) UM_ERROR("Attempt to modify a values sequence");
	s = sq->data;
	ln = s -> length;
	cp = s -> capacity;
	nln = ln + 1;
	if (n > ln) UM_ERROR("Out of bounds in sequence insertion");
	ob_push2(sq,x);
	if (nln > cp) 
	{
		Seqob_ensure_capacity(sq,nln*2);
		s = sq -> data;
	}
	s -> length = nln;
	if (deltaEnabled && (s->tenured))
		   declareModifiedf(&(s->length),whichHeap(s));
	dt = Arrayob_contents(s);
	for (i = ln;i>n;i--)
		set_obp(dt+i,dt[i-1]);
	set_obp(dt+n,x);
	ob_popn(2);
	return s;
}

Seqob Seqob_append(Seqob s,Seqob x)
{
	Arrayob sd,xd;int ln,i,cp,lnx,nln;ob *dt,*dtx;
	if ((s->obkind) != seq_kind) UM_ERROR("Attempt to modify a values sequence");
	sd = s->data;
	xd = x->data;
	ln = sd -> length;
	cp = sd -> capacity;
	lnx = xd -> length;
	nln = ln + lnx;
	ob_push2(s,x);
	if (nln > cp) 
	{
		Seqob_ensure_capacity(s,nln*2);
		xd = x->data;
		sd = s->data;
	}
	sd -> length = nln;
	if (deltaEnabled && (sd->tenured))
		   declareModifiedf(&(sd->length),whichHeap(sd));
	dt = Arrayob_contents(sd)+ln;;
	dtx = Arrayob_contents(xd);
    for (i = 0;i<lnx;i++) set_obp(dt+i,dtx[i]);
	ob_popn(2);
	return s;
}

//ensure capacity cp in destination
Seqob Seqob_copy2(Seqob s,int cp)
{
	Arrayob rsd,sd;Seqint rs;int ln,i;ob *dt,*dtr;
	sd = s->data;
	ob_push2(s,sd);
	ln = sd->length;
	if (cp > ln) rs = mk_Seqob(cp); else 
	rs = mk_Seqob(ln);
	rsd = rs->data;
	set_ob(rs->types,rs->types);
	rsd -> length = ln;
	if (deltaEnabled && (rsd->tenured))
		   declareModifiedf(&(rsd->length),whichHeap(rsd));
	dt = Arrayob_contents(sd);
	dtr = Arrayob_contents(rsd);
    for (i = 0;i<ln;i++) set_obp(dtr+i,dt[i]);
	ob_popn(2);
    return rs;
}


Seqob Seqob_copy(Seqob s)
{
	return Seqob_copy2(s,0);
}

int Seqob_contains(Seqob s,ob n)
{
	Arrayob sd;int ln,i;ob *dt;
	sd = s->data;
	ln = sd -> length;
	dt = Arrayob_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == n) return 1;
	}
	return 0;
}

//-1 means not found
int Seqob_find(Seqob s,ob n)
{
	Arrayint sd;int ln,i;ob *dt;
	sd = s -> data;
	ln = sd -> length;
	dt = Arrayob_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		if (dt[i] == n) return i;
	}
	return -1;
}

void  Seqob_expand_with_nuls(Seqob s,int ln)
  {
  int cln,i,* gd;Arrayob sd;
  sd = s->data;
  cln = sd->length;
  if (cln < ln)
     {
	  ob_push(s);
     Seqob_ensure_capacity(s,ln);
	 sd = s->data;
     gd = Arrayob_contents(sd);
     for (i = cln;i<ln;i++)
	     set_obp(gd+i,nul);
	 sd ->length = ln;
	 if (deltaEnabled && (sd->tenured))
		   declareModifiedf(&(sd->length),whichHeap(sd));
	 ob_pop();
	 }
  }

// used in serialization.  Takes n words starting at word offset ofs within object
// src and appends them onto dst


// generic (works on any kind of sequence)
void Seqob_set_length(Seqob x,int nln)
{
    int i,ln,dtk,vk,tk;Arrayob dt;int* dtd;
	vk = x->obkind;
	if ((vk != seq_kind)&&(vk != values_kind)) UM_ERROR("Attempt to modify a values sequence");
	dt = x -> data;
	ln = dt -> length;
	dtk = (dt->obkind);
	if (nln > ln) UM_ERROR("Cannot extend length of Seqob with Seqob_set_length");
	dt->length = nln;
	if (deltaEnabled && (dt->tenured))
		   declareModifiedf(&(dt->length),whichHeap(dt));
	if (dtk != arrayob_kind) return;
    dtd = Arrayob_contents(dt);
	for (i = nln;i<ln;i++)
	{
		set_obp(dtd+i,nul);
	}
}

void Seqob_reset(Seqob x)
{
  Seqob_set_length(x,0);
}

Seqob Seqob_intern(Seqob rs)
{
	Seqob irs;
	if (rs->interned) return rs;
    ob_push(rs);
	if (!(rs -> immutable)) 
	{
		rs = Seqob_copy(rs);
		rs -> immutable = 1;
	}
	if (!(rs->hashkey)) rs -> hashkey = hash_seqob(rs);
	rs -> internable = 1;
	irs = HashSeq_put(seqIntern,rs);
	if (htverbose) printf("seqobintern %d hk %d irs %d seqIntern %d\n",rs,rs->hashkey,irs,seqIntern);
	if (irs) rs = irs;
	rs -> interned = 1;
	if (deltaEnabled && (rs->tenured))
		   declareModifiedf(rs,whichHeap(rs));// tag word is the first word
	ob_pop();
	return rs;
}

// used in cImport
//assumes the values in vl are tenured

Seqob fillInternSeqob(int ln,ob* vl)
{
	Arrayob dt;ob* dtc;Seqob rs,irs;int i,hpi;
	rs = mk_Seqob(ln);
	rs -> immutable = 1;
	dt = rs -> data;
	dtc = Arrayob_contents(dt);
	// since *vl tenured, can just do array set
	for (i=0;i<ln;i++) dtc[i] = *(vl++);
	dt -> length = ln;
	if (deltaEnabled && (dt->tenured))
	{
		hpi = whichHeap(dt);
		declareModifiedf(dt,hpi);// tag word is the first word
		declareModifiedf(&(dt->length),hpi);// tag word is the first word
	}
	return Seqob_intern(rs);
}


