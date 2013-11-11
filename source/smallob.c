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
// utilities


ob  addTo1(ob x,ob v)
{
	Values svl;Arrayob dt;
	if (!x||(x == v)) return v;
	if ((x->obkind) == values_kind) 
	{
		ob_push(x);
		Values_add(x,v);
		ob_pop();
		return x;
	}
	ob_push2(x,v);
	svl = mk_Values(4);//allocate a little extra space
	dt = svl -> data;
	dt -> length = 2;
	Arrayob_setn(dt,0,x);
	Arrayob_setn(dt,1,v);
	ob_popn(2);
	return svl;
	
}

ob toValues(ob x)
{
	Values svl;Arrayob dt;
	ob_push(x);
	svl = mk_Values(1);
	dt = svl -> data;
	Arrayob_setn(dt,0,x);
	dt->length = 1;
	ob_pop();
	return svl;
}

Smallob  mkSmallob_int(int cp)
   {
   Hetarray ht;Smallob rs;
   ht = mk_Hetarray(cp);
   ob_push(ht);
   rs = (Smallob)heap_alloc(sizeof(Smallob_struct));
   rs -> pagenumber =  c_page;
   rs -> values = ht;
   rs -> obkind = smallob_kind;
   ob_pop();
   return rs;
}


// rule: for double-valued properties, two consequtive entries in the properties should appear,
// the second being nul
Smallob  mkSmallob_properties(Seqob props)
   {
	Arrayob pd;int ln;Hetarray ht;
   Smallob rs;
   pd = props -> data;
   ln = pd -> length;
   ob_push(props);
   rs = mkSmallob_int(ln);
   rs -> properties = props;
   ht = rs -> values;
   ht -> length = ln;
   ob_pop();
   return rs;

}

Smallob copySmallob(Smallob c)
{
	int cp;Hetarray vls;Seqob prps;ob tps,ntps;int shp;Smallob rs;
	cp = c -> values -> capacity;
	ob_push(c);
	rs = mkSmallob_int(cp);
    ob_push(rs);
	vls = c -> values;
	set_ob(rs->values,copyHetarray(vls));
	prps = c -> properties;
	shp = c -> sharedProperties;
	if (shp)
	{
		set_ob(rs->properties,prps);
		rs ->sharedProperties = 1;
	}
	else
		set_ob(rs->properties,Seqob_copy(prps));
	tps = c -> types;
	if ((tps->obkind) == seq_kind) ntps = Seqob_copy(tps);
	else ntps = tps;
	set_ob(rs -> types,ntps);
    ob_popn(2);
	return rs;
}


void Smallob_obChildren(Seqob properties,Seqob values,Smallob c)
{
	Hetarray vls;int cp,nmaw,ln,i,st;Seqob prps;Arrayob sq;char cann,*an;
	vls = c -> values;
	cp = vls -> capacity;
    nmaw = 1+ ((cp-1)/4); // num annotation words
	prps = c -> properties;
	ln = vls -> length;
	// copy annotation words
    sq = prps->data;
   ob_push2(vls,sq);
   ob_push2(properties,values);
	for (i=0;i<ln;i++)
	{
		an = Hetarray_annotations(vls);// need to do this every time in case of gc
		cann = an[i];
		st = cann & 3; // storage
		if (st == storage_ob)
		{
			Seqob_add(values,Hetarray_obSelectn(vls,nmaw,i));
		    Seqob_add(properties,Arrayob_selectn(sq,i));
		}

	}
   ob_popn(4);
}


void SmallobEnsureCapacity(Smallob c,int ncp)
{
	Hetarray vls,dst;int ccp;
	vls = c -> values;
	ccp = vls -> capacity;
	if (ccp < ncp)
	{
		ob_push2(c,vls);		
		dst = mk_Hetarray(ncp);
		copyintoHetarray(dst,vls);
		set_ob(c->values,dst);
		ob_popn(2);
	}
}
// with undefined values; assumes property is not already present
int Smallob_addProperty(Smallob c,ob p)
{
	Seqob prps,nprps;Hetarray vls,nvls;int shp,ln;
	prps = c -> properties;
	ob_push2(c,p);
	shp = c -> sharedProperties;
	ln = prps->data->length;
	if (shp)
	{
		nprps = Seqob_copy2(prps,ln+1);
		set_ob(c->properties,nprps);
		c -> sharedProperties = 0;
	}
	else nprps = prps;
	Seqob_add1(nprps,p);
	vls = c -> values;
	nvls = Hetarray_addEntry(vls);
	if (nvls != vls) set_ob(c->values,nvls);
	ob_popn(2);
	return ln;
}




#define FINDPROPERTY() 	prpsq = (Seqob)(c->properties);\
	if (prpsq) \
	{ \
	   prps = prpsq -> data; \
	   prpln = prps -> length; \
	   prpc = Arrayob_contents(prps); \
	   for (i = 0;i < prpln;i++) \
	   { \
		   if (prpc[i] == p) break; \
	   } \
	   notfnd = (i == prpln); \
    } \
	else notfnd = 1;
	

Seqob smallobProperties(Smallob c)
{
	return c->properties;
}


Hetarray smallobValues(Smallob c)
{
	return c->values;
}

//follows the get rules: if there is only one value (even if b's kind is Multi), return this
// 0 = get mode, 1 = fget mode 2 = mget mode
ob Smallob_mgetOb(Smallob c,ob p,int md)
{
	int notfnd,prpln,i;Arrayob prps;Seqob prpsq;ob *prpc;
	FINDPROPERTY();				
	if (notfnd) return emptyValues;
	return Hetarray_mgetOb(c->values,i);
}

ob Smallob_fgetOb(Smallob c,ob p)
{
	int notfnd,prpln,i;Arrayob prps;Seqob prpsq;ob *prpc;
	FINDPROPERTY();				
	if (notfnd) return nul;
	return Hetarray_fgetOb(c->values,i,1);
}

int Smallob_fgetInt(Smallob c,ob p)
{
	int notfnd,prpln,i;Arrayob prps;Seqob prpsq;ob *prpc;
	FINDPROPERTY();				
	if (notfnd) return nul;
	return Hetarray_fgetInt(c->values,i);
}


double Smallob_fgetDouble(Smallob c,ob p)
{
	int notfnd,prpln,i;Arrayob prps;Seqob prpsq;ob *prpc;
	FINDPROPERTY();				
	if (notfnd) return 0.0;
	return Hetarray_fgetDouble(c->values,i);
}


// if there is a field in c that matches, set that
// ow add it to the extension

Binding Smallob_setOb(Smallob c,ob p,ob v)
{
	int notfnd,prpln,i;Arrayob prps;Seqob prpsq;ob *prpc;
//	tp = (Type)c;
	FINDPROPERTY();	
	if (notfnd) 
	{
		ob_push2(c,v);
		i = Smallob_addProperty(c,p);
		Hetarray_setOb(c->values,i,v);
		ob_popn(2);
	}
	else 
		Hetarray_setOb(c->values,i,v);
	return (Binding)nul;
}


Binding Smallob_setInt(Smallob c,ob p,int v)
{
	int notfnd,prpln,i;Arrayob prps;Seqob prpsq;ob *prpc;
//	tp = (Type)c;
	FINDPROPERTY();	
	if (notfnd) 
	{
		ob_push(c);
		i = Smallob_addProperty(c,p);
		Hetarray_setInt(c->values,i,v);
		ob_pop();
	}
	else 
		Hetarray_setInt(c->values,i,v);
	return (Binding)nul;
}


Binding Smallob_setDouble(Smallob c,ob p,double v)
{
	int notfnd,prpln,i;Arrayob prps;Seqob prpsq;ob *prpc;
//	tp = (Type)c;
	FINDPROPERTY();	
	if (notfnd) 
	{
		ob_push(c);
		i = Smallob_addProperty(c,p);
		Hetarray_setDouble(c->values,i,v);
		ob_pop();
	}
	else 
		Hetarray_setDouble(c->values,i,v);
	return (Binding)nul;
}





int smallobLength(Smallob c)
{
	Hetarray vls;
	vls = c -> values;
	return vls->length;
}



ob smallobSelectNthOb(Smallob c,int n)
{
	return Hetarray_fgetOb(c->values,n,0);
}

// assumes the nth fellow is a single, defined ob

ob smallob_fastSelectNthOb(Smallob c,int n)
{
	int cp,nmaw;Hetarray v;
	v = c ->values;
	cp = v->capacity;
	nmaw = 1+ ((cp-1)/4);
	return Hetarray_obSelectn(v,nmaw,n);
}


// assumes the nth fellow is a single, defined int

int smallob_fastSelectNthInt(Smallob c,int n)
{
	int cp,nmaw;Hetarray v;
	v = c ->values;
	cp = v->capacity;
	nmaw = 1+ ((cp-1)/4);
	return Hetarray_intSelectn(v,nmaw,n);
}


// assumes the nth fellow is a single, defined ob

ob smallob_fastSetNthOb(Smallob c,int n,ob vl)
{
	int cp,nmaw;Hetarray v;
	v = c ->values;
	cp = v->capacity;
	nmaw = 1+ ((cp-1)/4);
	return Hetarray_obSetn(v,nmaw,n,vl);
}


// assumes the nth fellow is a single, defined int

int smallob_fastSetNthInt(Smallob c,int n,int vl)
{
	int cp,nmaw;Hetarray v;
	v = c ->values;
	cp = v->capacity;
	nmaw = 1+ ((cp-1)/4);
	return Hetarray_intSetn(v,nmaw,n,vl);
}

void setFunctionNumobs(Smallob x,int n)
{
	int cp,nmaw,w,nw;Hetarray v;
	v = x ->values;
	cp = v->capacity;
	nmaw = 1+ ((cp-1)/4);
	w = Hetarray_intSelectn(v,nmaw,FunctionSignatureIndex);
    nw = (w & (~15)) | n;
	Hetarray_intSetn(v,nmaw,FunctionSignatureIndex,nw);

}


void setFunctionNumints(Smallob x,int n)
{
	int cp,nmaw,w,nw;Hetarray v;
	v = x ->values;
	cp = v->capacity;
	nmaw = 1+ ((cp-1)/4);
	w = Hetarray_intSelectn(v,nmaw,FunctionSignatureIndex);
    nw = (w & (~240)) | (n << 4);
	Hetarray_intSetn(v,nmaw,FunctionSignatureIndex,nw);

}




void setFunctionNumdoubles(Smallob x,int n)
{
	int cp,nmaw,w,nw;Hetarray v;
	v = x ->values;
	cp = v->capacity;
	nmaw = 1+ ((cp-1)/4);
	w = Hetarray_intSelectn(v,nmaw,FunctionSignatureIndex);
    nw = (w & (~3840)) | (n << 8);
	Hetarray_intSetn(v,nmaw,FunctionSignatureIndex,nw);

}

void smallob_buildPrototype(Type tp)
{
	Seqob tpr;Smallob rs;
	if (typePrototype(tp)) return;
	tpr = typeTypeProperties(tp);
	if (!tpr) return;
	ob_push(tp);
	rs = mkSmallob_properties(tpr);
	rs -> sharedProperties = 1;
	set_ob(rs->types,tp);
	setTypePrototype(tp,rs);
	ob_pop();
}

ob mk_Restriction();

ob smallob_New(Type tp)
{
	ob pr;Object rs;
	// special case; has undefined properties which are not handled generally
	if (tp == RestrictionT) return mk_Restriction(); 
	ob_push(tp);
	smallob_buildPrototype(tp);
	pr = typePrototype(tp);
	if (pr) rs = copySmallob(pr);
	else
	{
		rs = mk_Bindingtable();
		set_ob(rs->types,tp);
	}
	ob_pop();
	return rs;
}

/*
  ob copy_Smallob(Compactob c)
{
	int offs,nmf,nma,i,st;Compactob rs;char cann,*canns,*anns;int *srcp,*dstp;
	ob_push(c);
	nmf = c -> compactObNumFields;
	nma = 1+ ((nmf-1)/4); // num annotation words
	rs = (Compactob)heap_alloc(sizeof(CompactobStruct)+4*(nma + nmf));
    rs ->pagenumber = c_page;
	rs -> compactObNumFields = nmf;
	rs -> obkind = compact_kind;
    canns = Compactob_annotations(c);
	anns = Compactob_annotations(rs);
    offs = Compactob_annotation_woffset + nma; // num annotation words + annotation offset
	srcp = (int*)c + offs;
	dstp = (int*)rs + offs;
	for (i=0;i<nmf;i++)
	{
		cann = canns[i];
	    anns[i] = cann & 7; // copy storage and multivalued bits only
		st = cann & 3; // storage
		if (st == storage_ob)
			set_obp(dstp,*((ob*)srcp));
		else
			*dstp = *srcp;
		srcp++;
		dstp++;
	}
	set_ob(rs -> properties,c -> properties);
	set_ob(rs -> types,c -> types);
	ob_pop();
	return rs;
}
  */





Type lasttype;//for debugging


ob  mk_Typeob()
{
	Smallob rs;int i;char* anns;Annotation ann;
	rs = mk_Bindingtable();
	if (TypeT) set_ob(rs->types,TypeT);
    rs -> quickType = qtType;
    return rs;
}

// some types exist before the creation of typeProperties; this fixes such a type

int fixBootType(Type tp)
{
/*	Compactob rs;
	rs = (Compactob)tp;
	if (!(rs -> properties))
	{
		set_ob(rs->properties,typeProperties);
		return 1;
	}
*/
	if (!(tp -> types))
	{
		set_ob(tp->types,TypeT);
		return 1;
	}
	return 0;
}

// for import
// if more boolean fields are defined, this will need modification
void typeSetInstanceStorage(Type tp,int st)
{
	if ((tp->obkind) == hashtable_kind) setInt(tp,typeBoolesP,st);
    else
	 UM_ERROR("Internal error in typeSetInstanceStorage");
}

ob mk_paramType(string cns,ob prm)
{
  Type rs,irs;
  ob_push2(cns,prm);
  if ((prm->obkind) == seq_kind) prm = Seqob_intern(prm);
  rs = (Type)mk_Typeob();
  rs -> internable = 1;
  setTypeParam(rs,prm);
  setTypeConstructor(rs,cns);
  rs -> hashkey = hash_description3(TypeT,cns,prm);
  ob_push(rs);
  irs = HashSeq_put(typeIntern,rs);
  if (irs) rs = irs;
  else rs->interned = 1;
  ob_popn(3);
  return rs;
}

ob internType(Type tp)
{
	ob prm,cns,rs,irs;
	prm = typeParam(tp);//tp->param;
	cns =  typeConstructor(tp);
	if (!string_Function_) 
		UM_ERROR("XXX");
	if (cns == string_Function_)
		tp->hashkey = hash_description4(TypeT,cns,prm,typeParams(tp));
	else
		tp -> hashkey = hash_description3(TypeT,cns,prm);
	ob_push(tp);
    irs = HashSeq_put(typeIntern,tp);
    if (irs) rs = irs;else 
	{
		rs = tp;
		rs -> interned = 1;
	}
	ob_pop();
	return rs;
}


ob mk_functionType0(string cns,Type rslt,Seqob itps0,int intern)
{
  Type rs,irs;Seqob itps;
  if (!rslt) 
	 UM_ERROR("Missing result type");
  ob_push3(cns,rslt,itps0);
  itps = Seqob_intern(itps0);
  rs = (Type)mk_Typeob();
  rs -> internable = 1;
  setTypeParam(rs,rslt);
  setTypeConstructor(rs,cns);
  setTypeParams(rs,itps);
  rs -> hashkey = hash_description4(TypeT,cns,rslt,itps);
  if (intern)
  {
	  ob_push(rs);
	  irs = HashSeq_put(typeIntern,rs);
	  if (irs) rs = irs;
	  else rs ->interned = 1;
	  ob_popn(4);
  }
  else ob_popn(3);
  return rs;
}

ob mk_functionType(Type rslt,Seqob itps0)
{
  return mk_functionType0(string_Function_,rslt,itps0,1);
}



ob  mk_Regarding()
{
	Smallob rs;ob irs;int vlk,k;RegardingHetarray rsv;
	rs = mkSmallob_int(3);
    rs ->pagenumber = c_page;
    rs -> quickType = qtRegarding;
	rs -> properties = regardingProperties;
	rs -> sharedProperties = 1;
	rsv = (RegardingHetarray)(rs -> values);
	rsv -> length = 2;
	rsv -> ann0 = 0;
	rsv -> ann1 = 0;
	rs -> obkind = smallob_kind;
	rs -> internable = 1;
	set_ob(rs -> types,RegardingT);
    return rs;
}

ob  regarding1(ob vl)
{
	Smallob rs;ob irs;int vlk,k;
	ob_push(vl);
	k = vl->obkind;
	if (k > 15) 
		vlk = ((Object)vl)->hashkey;
	else
	if ((k==nstring_kind)||(k==wstring_kind))
		vlk = string_hash(vl);
	else UM_ERROR("regarding(<neither object nor string>)");
	rs = mk_Regarding();
	setRegardingValue(rs,vl);
	rs -> hashkey = hash_description2(RegardingT,vl);
    ob_push(rs);
	irs = HashSeq_put(regardingIntern,rs);
	if (irs) rs = irs;
	else rs ->interned = 1;
	ob_popn(2);
    return rs;
}


ob ob_regardingValue(ob vl)
{
	int vk,qt;
	vk = vl->obkind;
	if (vk == smallob_kind)
	{
		qt = vl->quickType;
		if (qt == qtRegarding)
		{
			return regardingValue(vl);
		}
	}
	return nul;
}


ob internRegarding(Smallob r)
{
	ob vl,irs,rs;
	vl = regardingValue(r);
	r -> hashkey = hash_description2(RegardingT,vl);
    ob_push(r);
	irs = HashSeq_put(regardingIntern,r);
	if (irs) rs = irs; else 
	{
		rs = r;
	    rs ->interned = 1;
	}
	ob_pop();
    return rs;
}

// The next few functions are needed because general instantiation
// wont work during the bootstrap, so need to create the initial
// objects by hand in C.



ob  mk_Restriction()
{
	Smallob rs;RestrictionHetarray rsv;
	rs = mkSmallob_int(5);
    rs ->pagenumber = c_page;
	rs -> properties = restrictionProperties;
	rs -> sharedProperties = 1;
	rs -> obkind = smallob_kind;
	rs -> types = RestrictionT;
	rsv = (RestrictionHetarray)(rs -> values);
	rsv -> length = 5;
	rsv -> onPropertyAnn = annob_undefined; 
	rsv -> allValuesFromAnn = annob_undefined; 
	rsv -> hasValueAnn = annob_undefined; 
	rsv -> cardinalityAnn = annint_undefined; 
	rsv -> maxCardinalityAnn = annint_undefined; 	
    return rs;
}


ob  mk_BitField()
{
	Smallob rs;ob irs;BitFieldHetarray rsv;
	rs = mkSmallob_int(3);
    rs ->pagenumber = c_page;
	rs -> properties = bitFieldProperties;
	rs -> sharedProperties = 1;
	rsv = (BitFieldHetarray)(rs -> values);
	rsv -> length = 3;
	rsv -> ann0 = 0; //ofProperty
	rsv -> ann1 = storage_int;//lowBit
	rsv -> ann2 = storage_int;//highBit
	rs -> obkind = smallob_kind;
	set_ob(rs -> types,BitFieldT);
   return rs;
}

int isFunction(ob x)
{
	int k;
	if (!x) return 0;
	k = x->obkind;
	if (k != smallob_kind) return 0;
	return     (x -> quickType) == qtFunction;
}


ob  mk_Functionob0()
{
	Smallob rs;ob irs;int vlk,k;FunctionHetarray rsv;
	rs = mkSmallob_int(6);
    rs ->pagenumber = c_page;
    rs -> quickType = qtFunction;
	rs -> properties = functionProperties;
	rs -> sharedProperties = 1;
	rsv = (FunctionHetarray)(rs -> values);
	rsv -> length = 6;
	rsv -> ann0 = 0; //name
	rsv -> ann1 = 0;//definedIn
	rsv -> ann2 = 0;//type
	rsv -> ann3 = 0;//implementation
	rsv -> ann4 = storage_int;//cimp
	rsv -> ann5 = storage_int;//booles
	rs -> obkind = smallob_kind;
	rs -> internable = 1;
	set_ob(rs -> types,FunctionT);
   return rs;
}


Smallob  mk_Functionob(string nm,ob df,Type tp)
{
	Smallob rs;FunctionHetarray rsv;int tpk;
	ob_push(nm);
	ob_push(tp);
	ob_push(df);
	tpk = tp->hashkey;
	if (!tpk) UM_ERROR("Function: type is anonymous");
	rs = mk_Functionob0();
	rsv = (FunctionHetarray)(rs -> values);
	set_ob(rsv->name,nm);
	set_ob(rsv->definedIn,df);
	set_ob(rsv->funType,tp);
	set_ob(rs->types,FunctionT);
	rs -> hashkey = hash_function(rs);
	ob_popn(3);
    return rs;
}




void Function_setsig(Smallob f,int numobs,int numints)
{
	setFunctionNumobs(f,numobs);
	setFunctionNumints(f,numints);
	setFunctionNumdoubles(f,0);
}

Smallob internFunction(Smallob f)
{
    ob rs,irs;
	if (f -> interned) return f;
	ob_push(f);
	if (!(f -> hashkey)) 
		f -> hashkey = hash_function(f);
	irs = HashSeq_put(functionIntern,f);
	if (irs) rs = irs;
	else 
	{
		rs = f;
		rs -> interned = 1;
	}
	ob_pop();
	return rs;
}

Smallob identifyFunction(Smallob f)
{
	if (f -> interned) return f;
 	return HashSeq_get(functionIntern,f);
}



ob  mk_Pcode0()
{
	Smallob rs;PcodeHetarray rsv;
	rs = mkSmallob_int(3);
    rs ->pagenumber = c_page;
	rs -> properties = pcodeProperties;
	rs -> sharedProperties = 1;
	rsv = (PcodeHetarray)(rs -> values);
	rsv -> length = 3;
	rsv -> ann0 = 0;
	rsv -> ann1 = 0;
	rsv -> ann2 = storage_int;
	rs -> obkind = smallob_kind;
	rs -> types = PcodeT;
    return rs;
}



Smallob  mk_Pcode(Seqbyte cd,Dblock db)
{
	Smallob rs;PcodeHetarray rsv;
	ob_push2(cd,db);
	rs = mk_Pcode0();
	rsv = (PcodeHetarray)(rs->values);
    set_ob(rsv -> code,cd);
 	set_ob(rsv -> dblock,db);
	ob_popn(2);
    return rs;
}



void setImplementation(Smallob f,Smallob p)
{
	setFunctionImplementation(f,p);
}



ob internOb(ob x)
{
	int k,qt;Arraygeneric dt;
	if (!x) return 0;
	k = x->obkind;
	if (k == seq_kind) 
	{
		dt = ((Seq)x)->data;
		if ((dt->obkind) != arrayob_kind) UM_ERROR("Only ob sequences can be interned for now");
		x -> immutable = 1;
		return Seqob_intern(x);
	}
	if (!((k == smallob_kind)||(k==hashtable_kind))) return x;
	if ((!(x->internable))||(x->interned)) return x;
	qt = x -> quickType;
	if (qt == qtFunction) return internFunction(x);
	if (qt == qtType) return internType(x);
	if (qt == qtRegarding) return internRegarding(x);
    return x;
}




int compactobNumFields(ob c)
{
	int k;Hetarray vls;
	k = c -> obkind;
	if (k == compact_kind) UM_ERROR("COMPACTOB");
	if (k == smallob_kind)
	{
		vls = ((Smallob)c)->values;
		return vls -> length;
	}
	return 0;
}


ob selectNthOb(ob c,int idx)
{
	int k,nmf,nmaw,ast;char *anns;ob vl;Annotation ann;
	k = c -> obkind;
	if (k == compact_kind) UM_ERROR("COMPACTOB");
	if (k == smallob_kind) return smallobSelectNthOb(c,idx);
	return nul;
}


Seqob compactobProperties(ob c)
{
	
	int k;Smallob sm;
	k = c -> obkind;
	if (k == compact_kind)  UM_ERROR("COMPACTOB");
	if (k == smallob_kind)
	{
		sm = (Smallob)c;
		return sm->properties;
	}
    return nul;
}
