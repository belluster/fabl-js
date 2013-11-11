/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

// Supports printing, mostly



#include "includes.h"

void Seqbyte_int_append(Seqbyte s,int c)
{ 
  int ln,cp,nln;char* st;Arraybyte sta;
  sta = s->data;
  ln = sta->length;
  cp = ln + 12;
  ob_push(s);
  Seqbyte_ensure_capacity(s,cp);
  sta = s->data;
  st = Arraybyte_contents(sta) + ln;
  nln = ln + sprintf(st,"%d",c);
  sta -> length = nln;
  ob_pop();
}

void Seqbyte_double_append(Seqbyte s,double c)
{ 
  int ln,cp,nln;char* st;Arraybyte sta;
  sta = s -> data;
  ln = sta->length;
  cp = ln + 30;
  ob_push(s);
  Seqbyte_ensure_capacity(s,cp);
  sta = s->data;
  st = Arraybyte_contents(sta) + ln;
  nln = ln + sprintf(st,"%f",c);
  sta -> length = nln;
  ob_pop();
}


void Seqbyte_Type_append();

void Seqbyte_Types_append(Seqbyte st,Seqob tps)
  {
	Type tp,ctp;Arrayob dt;int i,ln;
	dt = tps -> data;
	ln = dt->length;
	ob_push2(st,dt);
	for (i=0;i<ln;i++)
	{
		ctp = Arrayob_selectn(dt,i);
		Seqbyte_Type_append(st,ctp);
		if (i < (ln-1)) Seqbyte_charp_append(st,",");
	}
	ob_popn(2);


}

void Seqbyte_Type_append(Seqbyte st,Type s)
  {
  string nm;Type tp;Seqob tps;
  ob_push2(st,s);
  tp = typeParam(s);
  tps = typeParams(s);
  if (tps) 
  {
	  ob_push(tps);
	  Seqbyte_charp_append(st,"Function(");
	  Seqbyte_Type_append(st,tp);
	  if ((tps->data->length)>0) 
	  {
		  Seqbyte_charp_append(st,",");
		  Seqbyte_Types_append(st,tps);
	  }
	  ob_pop();
	  return;
  }
  if (tp) 
  {
      ob_push(tp);
	  Seqbyte_charp_append(st,"SeqOf(");
	  Seqbyte_Type_append(st,tp);
	  Seqbyte_charp_append(st,")");
	  ob_pop();
	  return;
  }  
  nm = ob_name(s);
  if (nm) Seqbyte_string_append(st,nm);
  else Seqbyte_charp_append(st,"<unnamed>");
  ob_popn(2);
  }



void Seqbyte_Function_append(Seqbyte st,Smallob f)
  {
	Type tp,ctp;Seqob tpp;Arrayob dt;int i,ln;
	ob_push2(st,f);
	Seqbyte_string_append(st,functionName(f));
	tp = functionFunType(f);
	tpp = typeParams(tp);
	ob_push(tpp);
	Seqbyte_charp_append(st,"[");
	Seqbyte_Types_append(st,tpp);
	Seqbyte_charp_append(st,"]");
	ob_popn(3);


}

  
Seqbyte Function_print_buffer = nul;

void Function_print(Smallob f)
{
	int sv;
	if (!f) 
	{
			printf("%s\n","nulFunction");
			return;
	}

	sv = allocating_statically;
    allocating_statically = 1;
	if (!Function_print_buffer) Function_print_buffer = mk_Seqbyte(40);
	Function_print_buffer -> data -> length  = 0;
    Seqbyte_Function_append(Function_print_buffer,f);
	Seqbyte_print(Function_print_buffer);
	allocating_statically = sv;
}

	


void Seqbyte_boolean_append(Seqbyte st,int x)
  {
  if (x) Seqbyte_charp_append(st,"true"); else Seqbyte_charp_append(st,"false");
  }



