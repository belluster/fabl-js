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
// Nothing particular to do with bootstrapping anymore,BTW



Seqob toSeqob(ob *sq,int ln)
{
	Seqob rs,irs;int i;
	rs = mk_Seqob(ln);
	ob_push(rs);
	for (i=0;i<ln;i++) Seqob_add(rs,sq[i]);
	rs -> immutable = 1;  
	irs = Seqob_intern(rs);
	ob_popn(3);
	return rs;
}

ob evalBootGlobal(string nm)
{
	ob gl;
	gl = regarding1(nm);
	return selectOb(boot_fimp,gl);
}

ob selectPathC(ob x,char** s,int n)
{
	ob cx;int i;
	cx = x;
	for (i = 0;i<n;i++)
		cx = selectUri(cx,charp_intern_string(s[i]));
	return cx;
}

ob selectUriC(ob x,char* s)
{
	 return selectUri(x,charp_intern_string(s));
}

char* rdf_ns_path[]= {"http",":","www.w3.org","1999","02","22-rdf-syntax-ns","#"};




Smallob getVariant(ob cn,char* nm,int ln,Type* itypes)
{
	Seqob isq;string fnm;Type fntp;Smallob fno,ifn;
	isq = fillInternSeqob(ln,itypes);
	ob_push(isq);
	fnm = charp_intern_string(nm); 
	ob_push(fnm);
// no interning of this function type
	fntp = mk_functionType0(string_Function_,intT,isq,0); // it matters not what the result type is
	ob_push(fntp);
	fno = mk_Functionob(fnm,cn,fntp);
	ob_push(fno);
	ifn = (Smallob) identifyFunction(fno); // this returns a value if there was already one present
	ob_popn(4);
	return ifn;
 }

void cImport(char* nm,int ln,Type* itypes,void* cfn)
{
	Smallob fno,ifn;
	ifn = getVariant(boot_fimp,nm,ln,itypes);
	if (!ifn) UM_ERROR("NO SUCH FUNCTION");
	setFunctionCimp(ifn,cfn);
 }



