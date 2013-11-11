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


 

int isList(ob x)
{
	int k;ob tp;
	if (!x) return 0;
	k = x->obkind;
	if (k != smallob_kind) return 0;
	tp = ((Object)x) -> types;
	return (tp == ListT);
}



ob  mk_List0()
{
	Smallob rs;ob irs;int vlk,k;ListHetarray rsv;
	rs = mkSmallob_int(2);
    rs ->pagenumber = c_page;
	rs -> properties = listProperties;
	rsv = (ListHetarray)(rs -> values);
	rsv -> length = 2;
	rsv -> ann0 = 0; //first
	rsv -> ann1 = 0;//rest
	rs -> obkind = smallob_kind;
	rs -> internable = 1;
	set_ob(rs -> types,ListT);
   return rs;
}

ob cons(ob x, ob y)
{
	Smallob rs;ListHetarray rsv;
	ob_push2(x,y);
	rs = mk_List0();
	rsv = (ListHetarray)(rs->values);
	set_ob(rsv->first,x);
	set_ob(rsv->rest,y);
	ob_popn(2);
	return rs;
}



 

ob list_select(ob x,int n)
  {
  ob cx;int k,i;
  cx = x;
  for (i = 0;i<n;i++)
     {
	 if (!isList(cx)) UM_ERROR("x[n] where n > length(x)");
     cx = listRest(cx);
	 }
  if (!isList(cx)) UM_ERROR("x[n] where n > length(x)");
  return listFirst(cx);
  }



void list_set(ob x,int n,ob v)
  {
  ob cx;int k,i;
  cx = x;
  for (i = 0;i<n;i++)
     {
	 if (!isList(cx)) UM_ERROR("x[n] where n > length(x)");
     cx = listRest(cx);
	 }
  if (!isList(cx)) UM_ERROR("x[n] where n > length(x)");
  ((ListHetarray)(((Smallob)cx)->values))->first = v;
}

void list_setRest(ob x,int n,ob v)
  {
  ob cx;int k,i;
  cx = x;
  for (i = 0;i<n;i++)
     {
	 if (!isList(cx)) UM_ERROR("x[n] where n > length(x)");
     cx = listRest(cx);
	 }
  if (!isList(cx)) UM_ERROR("x[n] where n > length(x)");
  ((ListHetarray)(((Smallob)cx)->values))->rest = v;
}


 


int list_length(ob x)
  {
  ob cx;int i;
  i =0;
  cx = x;
  while (cx && isList(cx))
     {
	 cx = listRest(cx);
	 i++;
	 }
  if (cx && (cx != List_nil)) UM_ERROR("Non-list input to length(n)");
  return i;
  }



 


