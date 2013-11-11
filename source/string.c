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

string int_mk_nstring(int n)
  {
  string rs;
  if (n == 0) rs = (string)heap_alloc(12); 
  else
	  rs = (string)heap_alloc(n+8);
  rs -> length = n;
  rs -> obkind = nstring_kind;
  return rs;
  }

string int_mk_wstring(int n)
  {
  string rs;
  if (n == 0) rs = (string)heap_alloc(12);  
  else
	  rs = (string)heap_alloc(2*n+8);
  rs -> length = n;
  rs -> obkind = wstring_kind;
  return rs;
  }

string charp_mk_string(char* s)
{
	int ln;string rs;
	ln = strlen(s);
	rs = int_mk_nstring(ln);
	memcpy((void*)NSTRINGBODY(rs),s,ln);
	return rs;
}

string charp_intern_string(char* s)
{
	return string_intern(charp_mk_string(s));
}


string charp_mk_string2(char* s,int ln)
{
	string rs;
	rs = int_mk_nstring(ln);
	memcpy((char*)NSTRINGBODY(rs),s,ln);
	return rs;
}


string Seqbyte_to_string(Seqbyte s)
{
	string rs,rslt;Arraybyte dt;
	int ln;
	if (!s) UM_ERROR("Nul string");
	dt = s -> data;
	ob_push2(s,dt);
	ln = dt->length;
	rs = int_mk_nstring(ln);
	memcpy(NSTRINGBODY(rs),Arraybyte_contents(dt),ln);
	rslt = string_intern(rs);
	ob_popn(2);
	return rslt;
}


char string_print_buf[STRING_PRINT_BUF_LENGTH];

void string_copyto(char* dst,int dstln,string src)
{
	int ln;
	ln = src->length;
	if ((src -> obkind)==wstring_kind) ln = 2*ln;
	if (ln >= dstln) ln = dstln-1;
	memcpy(dst,NSTRINGBODY(src),ln);
	dst[ln] = 0;
}

void string_print(string s)
{
	if (!s) printf("%s\n","<nul id>");
	string_copyto(string_print_buf,STRING_PRINT_BUF_LENGTH,s);
	printf("%s\n",string_print_buf);
}

int string_equal(string x,string y)
{
	int lnx,lny,i,xk,yk;char *cx,*cy;
	if (x == y) return 1;
	if (!x || !y) return 0;
	lnx = x->length;
	lny = y->length;
	xk = x -> obkind;
	yk = y -> obkind;
	if ((lnx == lny) && (xk == yk))
	{
		cx = NSTRINGBODY(x);
		cy = NSTRINGBODY(y);
		if (xk == wstring_kind) lnx = 2 * lnx;
		for (i=0;i<lnx;i++)
		{
			if (cx[i]!=cy[i]) return 0;
		}
		return 1;
	}
	return 0;
}

int nstring_charp_equal(string x,char* cy)
{
	int lnx,lny,i;char *cx;
	lnx = x->length;
	lny = strlen(cy);
	if (lnx == lny)
	{
		cx = NSTRINGBODY(x);
		for (i=0;i<lnx;i++)
		{
			if (cx[i]!=cy[i]) return 0;
		}
		return 1;
	}
	return 0;
}
//included for import into fabl
int string_length(string x)
{
	if (!x) UM_ERROR("Nul id");
	return x->length;
}

int string_int_select(string x,int n)
{
	char* bx;short* wbx;
	if (!x) UM_ERROR("Nul id");	
	if ((x -> obkind) == wstring_kind)
	{
		wbx = WSTRINGBODY(x);
		return wbx[n];
	}
	bx = NSTRINGBODY(x);
	return bx[n];
	
}


void string_int_int_set(string x,int n,int v)
{
	char* bx;short* wbx;
	if (!x) UM_ERROR("Nul id");
	if (n >= (x->length)) UM_ERROR("Out of bounds access to string");
	if ((x->obkind) == wstring_kind)
	{   
		wbx = WSTRINGBODY(x);
		wbx[n] = (short)v;
	}
	bx = NSTRINGBODY(x);
	bx[n] = (char)v;

}


string string_int_int_select(string x,int lb,int ub)
{
	char* bx,*brs;short* wbx,wbrs;int ln;string rs;
	if (!x) UM_ERROR("Nul id");
    ob_push(x);
	ln = 1 + ub - lb;
	if ((x -> obkind) == wstring_kind)
	{
		rs = int_mk_wstring(ln);
		wbrs = WSTRINGBODY(rs);
		wbx = WSTRINGBODY(x);
		memcpy((char*)wbrs,(char*)(wbx+lb),ln*2);
	}
	else
	{
		rs = int_mk_nstring(ln);
		brs = NSTRINGBODY(rs);
		bx = NSTRINGBODY(x);
		memcpy(brs,bx+lb,ln);
		ob_pop();
		return string_intern(rs);
	}
	ob_pop();
	return string_intern(rs);

}

// LATER put automatic conversion to wstring here 
string string_string_times(string x,string y)
{
	char* bx,*by,*brs;short* wbx,*wby,*wbrs;int lnx,lny;string rs;
	if (!x || !y) UM_ERROR("Nul id");
    ob_push2(x,y);
	lnx = x->length;
	lny = y->length;
    if ((x->obkind) != (y->obkind)) 
		UM_ERROR("Mixed string widths in string append");
    if ((x->obkind) == wstring_kind)
	{
		rs = int_mk_wstring(lnx+lny);
		wbrs = WSTRINGBODY(rs);
		wbx = WSTRINGBODY(x);
		wby = WSTRINGBODY(y);
		memcpy((char*)brs,(char*)bx,2*lnx);
		memcpy((char*)(brs+lnx),(char*)by,2*lny);
	}
	else
	{
		rs = int_mk_nstring(lnx+lny);
		brs = NSTRINGBODY(rs);
		bx = NSTRINGBODY(x);
		by = NSTRINGBODY(y);
		memcpy(brs,bx,lnx);
		memcpy(brs+lnx,by,lny);
	}
	ob_popn(2);
	return string_intern(rs);
}



int string_find(string x,int f,int starthere)
{
	char n,*b;short w,*wb;int ln,i;
	if (!x) UM_ERROR("Nul id");
	ln = x->length;
	if ((x->obkind) == wstring_kind)
	{
		n = (char)f;
		b = NSTRINGBODY(x);
		for (i=starthere;i<ln;i++)
		{
			if (b[i] == n) return i;
		}
		return -1;
	}
	else
	{
		w = (short)f;
		wb = WSTRINGBODY(x);
		for (i=starthere;i<ln;i++)
		{
			if (wb[i] == w) return i;
		}
		return -1;
	}

}

