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



ob  mk_DblockLayout0()
{
	Smallob rs;DblockLayoutHetarray rsv;
	rs = mkSmallob_int(5);
    rs ->pagenumber = c_page;
	rs -> properties = dblockLayoutProperties;
	rsv = (DblockLayoutHetarray)(rs -> values);
	rsv -> length = 5;
	rsv -> ann0 = storage_int;
	rsv -> ann1 = storage_int;
	rsv -> ann2 = storage_int;
	rsv -> ann3 = storage_int;
	rsv -> ann4 = storage_int;
	rs -> obkind = smallob_kind;
	rs -> types = DblockLayoutT;
    return rs;
}

Smallob  mk_Dblock_layout(int o,int i,int r)
{
	DblockLayoutHetarray rsv;Smallob rs;int ioff,roff;
	rs = mk_DblockLayout0();
	rsv = (DblockLayoutHetarray)(rs -> values);
    rsv -> numobs = o;
    rsv -> numints = i;
    rsv -> numdoubles = r;
    roff = o + i;
    rsv -> doubleoffset = roff;
    rsv -> wsize = o + i + 2*r + Dblock_preamble_wsize;
    return rs;
}



Dblock Dblock_alloc(int nmo,int nmi,int nmd)
  {
  Dblock rs;int wsize;
  wsize =  nmo + nmi + 2*nmd + Dblock_preamble_wsize;
  rs = (Dblock)heap_alloc(wsize*4);
  rs -> obkind = dblock_kind;
  rs -> numobs = nmo;
  rs -> numints = nmi;
  rs -> numdoubles = nmd;
  return rs;
  }


void Dblock_set_int_fun(Dblock x,int n,int v)
{
Dblock_set_int(x,n,v);
}

int Dblock_select_int_fun(Dblock x,int n)
{
return Dblock_select_int(x,n);
}


void Dblock_set_ob_fun(Dblock x,int n,ob v)
{
Dblock_set_ob(x,n,v);
}

ob Dblock_select_ob_fun(Dblock x,int n)
{
return Dblock_select_ob(x,n);
}


void Dblock_set_double_fun(Dblock x,int n,double v)
{
Dblock_set_double(x,n,v);
}

double Dblock_select_double_fun(Dblock x,int n)
{
return Dblock_select_double(x,n);
}

void Dblock_set_function_of_fun(Dblock x,Smallob fn)
{
	set_ob(x->function_of,fn);
}

Smallob Dblock_function_of_fun(Dblock x)
{
	return x->function_of;
}


int Dblock_numobs_fun(Dblock x)
{
	return x->numobs;
}

int Dblock_numints_fun(Dblock x)
{
	return x->numints;
}


int Dblock_numdoubles_fun(Dblock x)
{
	return x->numdoubles;
}


