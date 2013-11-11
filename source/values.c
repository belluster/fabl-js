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

// holds the values of a multi-valued property
Seq mk_Values0(ob dt)
{
	Seq rs;
	ob_push(dt);
	rs = (Values)heap_alloc(sizeof(Values_struct));
	set_ob(rs -> data,dt);
	rs -> obkind = values_kind;
    rs ->pagenumber = c_page;
	ob_pop();
	return rs;
}

Values mk_Values(int capacity)
{
	return (Values)mk_Values0((ob)mk_Arrayob(capacity));
}





ob Values_select(Values s,int n)
{
	Arrayob sq;
    sq = s->data;
	if (n >=(sq->length)) UM_ERROR("out of bounds sequence access");
	return Arrayob_selectn(sq,n);
}



void Values_set(Values s,int n,ob v)
{
	Arrayob sq;
    sq = s->data;
	if (n >= (sq->length)) UM_ERROR("out of bounds sequence access");
	Arrayob_setn(sq,n,v);
}



int Values_length(Values s)
{
	Arrayob sq;
    sq = s->data;
	return sq->length;
}



Values mk_empty_Values()
{
	return mk_Values(INITIAL_SEQUENCE_SIZE);
}





void Values_ensure_capacity(Values bx,int ncp)
{
	Arrayob s,nsq;int ln,idr;
    s = bx->data;
	if (ncp > (s ->capacity))
	   {
	   ob_push2(bx,s);
	   nsq = mk_Arrayob(ncp);
	   ln = s->length;
	   Arrayob_copyto(nsq,s);
	   nsq -> length = ln;
	   set_ob(bx->data,nsq);
	   ob_popn(2);
	   }
}
  

// returns 1 if the value is added (ie was not alread present)
// if check is true, check for if n is already in bx
int Values_add0(Values bx,ob n,int check)
{
	int i,ln,nln,cp;Arrayob sq;ob *dt;
    sq = bx->data;
	ln = sq->length;
	dt = Arrayob_contents(sq);
	if (check)
	{
		for (i = 0;i<ln;i++) 
		{
			if (dt[i] == n) return 0;
		}	
	}
	nln = ln+1;
	cp = sq->capacity;
	ob_push2(bx,n);
	if (nln > cp) 
	{
		Values_ensure_capacity(bx,nln*2);
        sq = bx->data;
	}
	sq -> length = nln;
	Arrayob_setn(sq,ln,n);
	ob_popn(2);
	return 1;
}


int Values_add(Values bx,ob n)
{
   return Values_add0(bx,n,1);
}

int Values_containsInt(Values s,int n)
{
	Arrayob sd;int ln,i;ob *dt;ob cv;
	sd = s->data;
	ln = sd -> length;
	dt = Arrayob_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		cv = dt[i];
		if (((cv->obkind)==int_kind) && ((((boxedint)cv)->value)==n)) return 1;
	}
	return 0;
}

Values Values_addInt(Values bx,int v)
{
	ob vo;
	if (Values_containsInt(bx,v)) return bx;
	ob_push(bx);
	vo =  int_to_ob(v);
	Values_add0(bx,vo,0);
	ob_pop();
	return bx;
}



int Values_containsDouble(Values s,double n)
{
	Arrayob sd;int ln,i;ob *dt;ob cv;
	sd = s->data;
	ln = sd -> length;
	dt = Arrayob_contents(sd);
	for (i = 0;i<ln;i++) 
	{
		cv = dt[i];
		if (((cv->obkind)==double_kind) && ((((boxeddouble)cv)->value)==n)) return 1;
	}
	return 0;
}

Values Values_addDouble(Values bx,double v)
{
	ob vo;
	if (Values_containsDouble(bx,v)) return bx;
	ob_push(bx);
	vo =  double_to_ob(v);
	Values_add0(bx,vo,0);
	ob_pop();
	return bx;
}






int Values_contains(Values s,ob n)
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
int Values_find(Values s,ob n)
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


void Values_reset(Values x)
{
  Seqob_set_length(x,0);
}

