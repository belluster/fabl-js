/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review


//lfs
#include "includes.h"
// djb2 (used by PHP among many)

hash_string1(unsigned char *str,int ln)
    {
        unsigned long hash = 5381;
        char* ec = str + ln;
        while (str < ec) 
		{
            hash = ((hash << 5) + hash) + *str++; /* hash * 33 + c */

		}
		if (!hash) hash = 1; // 0 not allowed
		if (htverbose) printf("hash str = %s ln = %d rs = %d\n",str,ln,hash);
        return hash;
    }


// with a seed; adds in the hash of "/"


hash_string2(unsigned long hash,unsigned char *str,int ln)
    {
        char* ec = str + ln;
		hash = ((hash << 5) + hash) + 47;
        while (str < ec) 
		{
            hash = ((hash << 5) + hash) + *str++; /* hash * 33 + c */

		}
		if (!hash) hash = 1; // 0 not allowed
        return hash;
    }
// special case of hash_description, to be implemented later
// used for Regarding 
// hash_description(tp,vl) resembles hash([ hash(tp),hash(vl) ]
// but it takes hash(tp) and hash(vl) into account just by adding them into the brew

 hash_description2(Object tp,Object vl)
 {
        unsigned long hash,vlh;int vlk;
		hash = 5863012 + (tp->hashkey);// 5863012 = hash('[d');	
		vlk = vl->obkind;
		if ((vlk == nstring_kind)||(vlk == wstring_kind)) vlh = string_hash(vl);
		else vlh = vl->hashkey;
		hash = ((hash << 5) + hash) + vlh;
		hash = ((hash << 5) + hash) + 93;// 93 = ] ascii
		return hash;
 }

 // special case for parametric types
 hash_description3(Object tp,string nm,Object vl)
 {
        unsigned long hash;
		hash = 5863012 + (tp->hashkey);// 5863012 = hash('[d');		
		hash = ((hash << 5) + hash) + string_hash(nm);
		hash = ((hash << 5) + hash) + (vl->hashkey);
		hash = ((hash << 5) + hash) + 93;// 93 = ] ascii
		return hash;
 }

  hash_description4(Object tp,string nm,Object vl0,Object vl1)
 {
        unsigned long hash;
		hash = 5863012 + (tp->hashkey);// 5863012 = hash('[d');		
		hash = ((hash << 5) + hash) + string_hash(nm);
		hash = ((hash << 5) + hash) + (vl0->hashkey);
		hash = ((hash << 5) + hash) + (vl1->hashkey);
		hash = ((hash << 5) + hash) + 93;// 93 = ] ascii
		return hash;
 }
// for sequences of objects or strings
 hash_seqob(Seqob sq)
 {
        unsigned long hash;int k;
	    Arrayob cn;ob *dt;int ln,i,hk;ob v;
		hash = 5863027;// 5863027 = hash('[s');		
		cn = sq -> data;
		ln = cn -> length;
		dt = Arrayob_contents(cn);
		for (i=0;i<ln;i++)
		{
			v = *(dt++);
			k = v->obkind;
			if ((k == nstring_kind) || (k == wstring_kind)) hk = string_hash(v);
			else if (k < 16)  UM_ERROR("Expected object or string");
			else hk = ((Object)v)->hashkey;
			if (!hk) UM_ERROR("No hashkey");
		    hash = ((hash << 5) + hash) + hk;
		}
		hash = ((hash << 5) + hash) + 93;// 93 = ] ascii
		if (htverbose) printf("sq = %d rs = %d\n",sq,hash);
		return hash;
 }

 // take into account the name, definedIn, the input types, but not result type
  hash_function(Smallob f)
 {
        unsigned long hash;int k,sqh;Type fnt;Seqob sq;
	    Arrayob cn;ob *dt;int ln,i,hk;ob v;Object dfi;
		hash = 5863012 + (FunctionT->hashkey);// 5863012 = hash('[d');		
		hash = ((hash << 5) + hash) + string_hash(functionName(f));	
		dfi = functionDefinedIn(f);
		hash = ((hash << 5) + hash) + (dfi->hashkey);		
		fnt = functionFunType(f);
		sq = (Seqob)typeParams(fnt);
		sqh = sq->hashkey;
		if (htverbose) printf("sq = %d sqh = %d\n",sq,sqh);
		if (!sqh) UM_ERROR("inputTypes of Function not interned");
		hash = ((hash << 5) + hash) + sqh;		
		hash = ((hash << 5) + hash) + 93;// 93 = ] ascii
		return hash;
 }


static int hash_table_sizes[] = 
{23,101,401,1601,6421,25693,102793,411193,1644781,6579137,26316557};


int hash_size(int n)
{
  int k,sz;
  k = 0;
  sz = 0;
  while ((sz == 0)  && (k < 11))
     {
     if (hash_table_sizes[k] >= n)   sz = hash_table_sizes[k]; else
     k = k + 1;
     }
 if (k == 11) UM_ERROR("too big");
 return sz;
 }



int string_hash2(int seed,string x)
  {
   int	ln = x->length;
	if ((x->obkind) == wstring_kind) ln = 2 * ln;
  return hash_string2(seed,(char*)x + 8,ln);
  }


int string_hash(string x)
  {
   int	ln = x->length;
	if ((x->obkind) == wstring_kind) ln = 2 * ln;
  return hash_string1((char*)x + 8,ln);
  }

int double_hash(double x)
{
	return hash_string1((char*)(&x),8);
}

int int_hash(int x)
{
	return hash_string1((char*)(&x),4);
}
