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



#define FINDPROPERTY() 	prpsq = (Seqob)(c->properties);\
	if (prpsq) \
	{ \
	   prps = prpsq -> data; \
	   prpln = prps -> length; \
	   prpc = Arrayob_contents(prps); \
	   anns = Compactob_annotations(c); \
	   for (i = 0;i < prpln;i++) \
	   { \
		   if (prpc[i] == p) break; \
	   } \
	   notfnd = (i == prpln); \
    } \
	else notfnd = 1;
	

Seqob compactobProperties(Compactob c)
{
	
	int k;Smallob sm;
	k = c -> obkind;
	if (k == compact_kind) 
	return c->properties;
	if (k == smallob_kind)
	{
		sm = (Smallob)c;
		return sm->properties;
	}
    return nul;
}


int compactobNumFields(Compactob c)
{
	int k;Hetarray vls;
	k = c -> obkind;
	if (k == compact_kind) 
	return c->compactObNumFields;
	if (k == smallob_kind)
	{
		vls = ((Smallob)c)->values;
		return vls -> length;
	}
	return 0;
}


ob selectNthOb(Compactob c,int idx)
{
	int k,nmf,nmaw,ast;char *anns;ob vl;Annotation ann;
	k = c -> obkind;
	if (k == smallob_kind) return smallobSelectNthOb(c,idx);
	nmf = c -> compactObNumFields;
	if (idx >= nmf) UM_ERROR("Index too large in selectNthOb");
	anns = Compactob_annotations(c);
    ann = (Annotation)(anns + idx);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	ast = ann->storage;
	if (ast == storage_ob) 
	{
		vl = *((ob*)c + Compactob_annotation_woffset + nmaw + idx);
		return vl;
	}
    return nul;
}
//for import into Fabl
ob Compactob_extension(Compactob c)
{
	return c -> extension;
}

int Compactob_numFields(Compactob c)
{
	return c->compactObNumFields;
}



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

//follows the get rules: if there is only one value (even if b's kind is Multi), return this
// 0 = get mode, 1 = fget mode 2 = mget mode
ob Compactob_selectOb1(Compactob c,ob p,int md)
{
	int pk,notfnd,ast,nmf,vk,vln,ln,nmaw,prpln,i;Arrayob prps;Seqob prpsq;
	char *anns;ob vl,*prpc;Annotation ann;Hashtable ext;Arrayob dt;Values vls;
	pk = p -> obkind;
	if ((pk == nstring_kind)||(pk == wstring_kind)) notfnd = 1;
	else
	{
	FINDPROPERTY();				
	}
	if (notfnd)
	{
		ext = (Hashtable)(c->extension);
		if (ext) return Hashtable_selectOb1(ext,p,md);
		vk = value_kind_undefined;
	}
	else
	{
	anns = Compactob_annotations(c);
	ann = (Annotation)(anns + i);
	nmf = c -> compactObNumFields;
        nmaw = 1+ ((nmf-1)/4); // num annotation words
	vl = *((ob*)c + Compactob_annotation_woffset + nmaw + i);
	vk = ann->value_kind;
	ast = ann->storage;
	}
	//hack: the value_kind is not always initialized properly; but if cv
	// is nul, this signifies undefined too.
	if ((vk == value_kind_undefined) || !vl) 
	{
		if (md == 2) return emptyValues;
		return nul;
	}
	if (vk == value_kind_multivalued)
		UM_ERROR("COMPACTMULTIVALUED");
	// vk = value_kind_functional
	if ((md == 0) || (md == 1)) 
	{
		if (ast == storage_ob) return vl;
		UM_ERROR("LATER: box int of double");
	}
   return toValues(vl);
}

ob Compactob_selectOb(Compactob c,ob p)
{
	return Compactob_selectOb1(c,p,0);
}

ob Compactob_getOb(Compactob c,ob p)
{
	return Compactob_selectOb1(c,p,0);
}

ob Compactob_fgetOb(Compactob c,ob p)
{
	return Compactob_selectOb1(c,p,1);
}



ob Compactob_mgetOb(Compactob c,ob p)
{
	
	return Compactob_selectOb1(c,p,2);
}


int Compactob_selectInt(Compactob c,ob p)
{
	int notfnd,ast,nmf,ln,vk,nmaw,prpln,i;Arrayob prps;Seqob prpsq;
	Hashtable ext;char *anns;int vl,*prpc;Annotation ann;
	nmf = c -> compactObNumFields;


    FINDPROPERTY();
	

	if (notfnd)
	{
		ext = (Hashtable)(c->extension);
		if (ext) return Hashtable_selectInt(ext,p);
		return 0;
	}
    ann = (Annotation)(anns + i);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	vk =(ann -> value_kind);
	if (vk == value_kind_undefined) 
		return 0;
	if (vk == value_kind_multivalued) UM_ERROR("COMPACTOBMULTIVALUED");
	vl = *((int*)c + Compactob_annotation_woffset + nmaw +i);
	ast = ann->storage;
	if (ast == storage_int) return vl;
	UM_ERROR("LATER: box int of double");
}



double Compactob_selectDouble(Compactob c,ob p)
{
	int notfnd,ast,nmf,ln,nmaw,prpln,i;Arrayob prps;Seqob prpsq;
	Hashtable ext;char *anns;double vl;ob *prpc;Annotation ann;
	nmf = c -> compactObNumFields;
    FINDPROPERTY();



	if (notfnd)
	{
		ext = (Hashtable)(c->extension);
		if (ext) return Hashtable_selectInt(ext,p);
		return 0;
	}
    ann = (Annotation)(anns + i);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	vl = *((double*)((int*)c + Compactob_annotation_woffset + nmaw +i) );
	if (ann -> value_kind) UM_ERROR("LATER");
	ast = ann->storage;
	if (ast == storage_double) return vl;
	UM_ERROR("LATER: box int of double");
}




Binding Compactob_assertOb(Compactob c,ob p,ob v)
{
	UM_ERROR("OBSOLETE");

}
    		




Type CompactobNthFieldType(Compactob c,int n)
{
   Type tp0;Hashtable rsth;Seqob gdsq;ObBinding b;Smallob rst;
   tp0 = ob_type0(c);
   rsth = typeRestrictions(tp0);
   if (!rsth) return nul;
   gdsq = rsth->goods;
   if ((gdsq->data->length) == 0) return nul; // uninitialized; may happen during bootstrap
   b = (ObBinding)Seqob_select(gdsq,n);
   rst = (Smallob)(b->value);
   return restrictionAllValuesFrom(rst);
}

// check type match 
#define FINDPROPERTYT() prpsq = (Seqob)(c->properties); \
	if (prpsq) \
{ \
	   prps = prpsq -> data; \
	   prpln = prps -> length; \
	   prpc = Arrayob_contents(prps); \
	   for (i = 0;i < prpln;i++) \
{ \
		   if (prpc[i] == p) \
{ \
			   if (tp && (tp != obT)) \
{ \
				   ftp = CompactobNthFieldType(c,i); \
				   if (tp != ftp) UM_ERROR("Type mismatch in assert"); \
} \
			   break; \
} \
} \
	   notfnd = (i == prpln); \
} \
	else notfnd = 1;
	
int findPropertyT(Compactob c,ob p,ob tp)
{
	int i,prpln,notfnd;Seqob prpsq;Type ftp;
	Arrayob prps;ob *prpc;
	prpsq = (Seqob)(c->properties);
	if (prpsq) 
	{
	   prps = prpsq -> data;
	   prpln = prps -> length;
	   prpc = Arrayob_contents(prps);
	   for (i = 0;i < prpln;i++)
	   {
		   if (prpc[i] == p) 
		   {
			   // a nul tp or tp = obT means no type asserted, so consistent with any type
			   if (tp && (tp != obT))
			   {
				   ftp = CompactobNthFieldType(c,i);
				   if (tp != ftp) UM_ERROR("Type mismatch in assert");
			   }
			   break;
		   }
	   }
	   notfnd = (i == prpln);
    }
	else notfnd = 1;
	if (notfnd) return -1;
	return i;
}

// if there is a field in c that matches, set that
// ow add it to the extension

Binding Compactob_setObT(Compactob c,ob p,ob v,ob tp)
{
	int notfnd,ast,nmf,ln,nmaw,prpln,i;Hashtable ext;
	char *anns;Annotation ann;Binding rs;
//	tp = (Type)c;
	nmf = c -> compactObNumFields;
	anns = Compactob_annotations(c);
    i = findPropertyT(c,p,tp);
	
	if (i < 0) 
	{
		ext = (Hashtable)(c->extension);
		if (!ext)
		{
			ob_push3(c,p,v);
			ob_push(tp);
			ext = mk_Bindingtable();
			set_ob(c->extension,ext);
			ext -> isExtension = 1;
			rs = Hashtable_setObT(ext,p,v,tp);
			ob_popn(4);
		}
		else rs = Hashtable_setObT(ext,p,v,tp);
		if (collectingSubjects) collectSubject(c);
		return rs;
	}
    ann = (Annotation)(anns + i);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	ast = ann->storage;
	ann -> value_kind = 0;
	if (ast == storage_ob) ;
	   {
		 set_obp((ob*)c + Compactob_annotation_woffset + nmaw + i,v);
		 if (collectingSubjects) collectSubject(c);
		 return nul;
	   }
	UM_ERROR("LATER: box int or double");
}



Binding Compactob_setIntT(Compactob c,ob p,int v,ob tp)
{
	int ast,nmf,ln,nmaw,i;Hashtable ext;
	char *anns;Annotation ann;Binding rs;
//	tp = (Type)c;
	nmf = c -> compactObNumFields;

	anns = Compactob_annotations(c);
    i = findPropertyT(c,p,tp);	
	if (i<0) 
	{
		ext = (Hashtable)(c->extension);
		if (!ext)
		{
			ob_push3(c,p,tp);
			ext = mk_Bindingtable();
			set_ob(c->extension,ext);
			ext->isExtension = 1;
			rs = Hashtable_setIntT(ext,p,v,tp);
			ob_popn(3);
		}
		else rs = Hashtable_setIntT(ext,p,v,tp);
		if (collectingSubjects) collectSubject(c);
		return rs;
	}
    ann = (Annotation)(anns + i);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	ast = ann->storage;
	ann -> value_kind = 0;
	if (ast == storage_int) ;
	   {
		 *((int*)c + Compactob_annotation_woffset + nmaw + i) = v;
  		 if (collectingSubjects) collectSubject(c);
		 return nul;
	   }
	UM_ERROR("Expected int field");
}



Binding Compactob_setDoubleT(Compactob c,ob p,double v,ob tp)
{
	int ast,nmf,ln,nmaw,i;Hashtable ext;
	char *anns;Annotation ann;Binding rs;
//	tp = (Type)c;
	nmf = c -> compactObNumFields;
	anns = Compactob_annotations(c);
    i = findPropertyT(c,p,tp);	
	
	if (i<0) 
	{
		ext = (Hashtable)(c->extension);
		if (!ext)
		{
			ob_push3(c,p,tp);
			ext = mk_Bindingtable();
			set_ob(c->extension,ext);
			ext -> isExtension = 1;
			rs = Hashtable_setDoubleT(ext,p,v,tp);
			ob_popn(3);
			
		}
		else rs = Hashtable_setDoubleT(ext,p,v,tp);
		if (collectingSubjects) collectSubject(c);
		return rs;
	}
    ann = (Annotation)(anns + i);
    nmaw = 1+ ((nmf-1)/4); // num annotation words
	ast = ann->storage;
	ann -> value_kind = 0;
	if (ast == storage_double) ;
	   {
       *((double*)((int*)c + Compactob_annotation_woffset + nmaw +i)) = v;
		if (collectingSubjects) collectSubject(c);
		 return nul;
	   }
	UM_ERROR("Expected double field");
}




Binding Compactob_setOb(Compactob c,ob p,ob v)
{
	return Compactob_setObT(c,p,v,nul);
}


Binding Compactob_setInt(Compactob c,ob p,int v)
{
    return Compactob_setIntT(c,p,v,nul);
}


Binding Compactob_setDouble(Compactob c,ob p,double v)
{
    return Compactob_setDoubleT(c,p,v,nul);
}



Binding  Compactob_bindUri(Compactob c,string nm,ob v)
{
	Hashtable ext;Binding rs;

	ext = (Hashtable)(c->extension);
	if (ext) 
	{
		ob_push(c);
		rs = Hashtable_bindUri(ext,nm,v);
        set_ob(rs -> parent,(ob)c);// repoint parent at the compactob rather than the extension
        ob_pop();
		if (collectingSubjects) collectSubject(c);
		return rs;
	}
	ob_push3(ext,nm,v);
	ext = mk_Bindingtable();
	set_ob(c->extension,ext);
	ext -> isExtension = 1;
	rs =  Hashtable_bindUri(ext,nm,v);
    set_ob(rs -> parent,(ob)c);// repoint parent at the compactob rather than the extension
	if (collectingSubjects) collectSubject(c);
	ob_popn(3);
	return rs;
}


ob mk_Tinyob(int nmf,Seqob prps,int ann0,int ann1,int ann2,int ann3)
{
	Compactob rs;
	   ob_push(prps);
	   rs = (Compactob)heap_alloc(sizeof(CompactobStruct)+4*nmf);
	   rs ->pagenumber = c_page;
	   rs -> ann0 = ann0;
	   rs -> ann1 = ann1;
	   rs -> ann2 = ann2;
	   rs -> ann3 = ann3;
	   rs -> compactObNumFields = nmf;
	   rs -> obkind = compact_kind;
	   set_ob(rs -> properties,prps);
	   ob_pop();
	   return rs;
}



ob  mk_compactob(Type tp,Seqob prps,Seqint annotations)
{
	Compactob rs;Arrayint dt;int i,nmf,nma;char *anns;

	ob_push2(prps,annotations);
	dt = annotations->data;
	nmf = dt->length;
	if ((prps->data->length)!=nmf) UM_ERROR("Length mismatch in mk_Compactob");
	if (!nmf) UM_ERROR("Length of zero not allowed in mk_Compactob");
	nma = 1+ ((nmf-1)/4); // num annotation words
	rs = (Compactob)heap_alloc(sizeof(CompactobStruct)+4*(nma + nmf));
    rs ->pagenumber = c_page;
	rs -> compactObNumFields = nmf;
	rs -> obkind = compact_kind;
	set_ob(rs->types,tp);
	anns = Compactob_annotations(rs);
	for (i=0;i<nmf;i++)
		anns[i] = Arrayint_selectn(dt,i);
	set_ob(rs -> properties,prps);
	ob_popn(2);
    return rs;
}

ob  mk_Compactob(Seqob prps,Seqint annotations)
{
UM_ERROR("OBSOLETE");
}
ob copy_Compactob(Compactob c)
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

        


Type lasttype;//for debugging



ob  mk_Typeob()
{
	Compactob rs;int i;char* anns;Annotation ann;
	rs = mk_Bindingtable();
	if (TypeT) set_ob(rs->types,TypeT);
    rs -> quickType = qtType;
    return rs;
}

// some types exist before the creation of typeProperties; this fixes such a type

int fixBootType(Type tp)
{
	Compactob rs;
	rs = (Compactob)tp;
	if (!(rs -> properties))
	{
		set_ob(rs->properties,typeProperties);
		return 1;
	}
	if (!(rs -> types))
	{
		set_ob(rs->types,TypeT);
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
  return rs;
}

ob mk_functionType(Type rslt,Seqob itps0)
{
  return mk_functionType0(string_Function_,rslt,itps0,1);
}
// LATER avoid alloc if the fellow will be found anyway


ob  mk_Regarding()
{
	Smallob rs;ob irs;int vlk,k;RegardingHetarray rsv;
	rs = mkSmallob_int(3);
    rs ->pagenumber = c_page;
    rs -> quickType = qtRegarding;
	rs -> properties = regardingProperties;
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
/*

ob  mk_Restriction()
{
	Restriction rs;ob irs;int vlk,k;Annotation_struct oann,iann;
	oann . storage = 0;
	oann . value_kind = value_kind_undefined;
    iann . storage = 1;
	iann . value_kind = value_kind_undefined;
	rs = (Restriction)heap_alloc(sizeof(Restriction_struct));
    rs ->pagenumber = c_page;
	rs -> properties = restrictionProperties;
	rs -> onPropertyAnn = annob_undefined; 
	rs -> allValuesFromAnn = annob_undefined; 
	rs -> hasValueAnn = annob_undefined; 
	rs -> cardinalityAnn = annint_undefined; 
	rs -> maxCardinalityAnn = annint_undefined; 
	rs -> compactObNumFields = 5;
	rs -> obkind = compact_kind;
	set_ob(rs -> types,RestrictionT);
    return rs;
}

ob  mk_BitField()
{
	BitField rs;ob irs;int vlk,k;
	rs = (BitField)heap_alloc(sizeof(Restriction_struct));
    rs ->pagenumber = c_page;
	rs -> properties = bitFieldProperties;
	rs -> ann0 = 0;
	rs -> ann1 = 1;
	rs -> ann2 = 1;
	rs -> compactObNumFields = 3;
	rs -> obkind = compact_kind;
	set_ob(rs -> types,BitFieldT);
    return rs;
}
*/

ob  mk_BitField()
{
	Smallob rs;ob irs;BitFieldHetarray rsv;
	rs = mkSmallob_int(3);
    rs ->pagenumber = c_page;
	rs -> properties = bitFieldProperties;
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

ob test0(ob v)
{
	return mk_Tinyob(3,v,0,0,0,0);
}
	


/*
Pcode  mk_Pcode0()
{
	Pcode rs;
	rs = (Pcode)heap_alloc(sizeof(Pcode_struct));
   rs ->pagenumber = c_page;
	rs -> obkind = compact_kind;
	rs -> properties = pcodeProperties; 
	rs -> ann0 = storage_ob;
	rs -> ann1 = storage_ob;
	rs -> ann2 = storage_int;
	rs -> compactObNumFields = 3;
	set_ob(rs->types,PcodeT);
	set_ob(rs->properties,pcodeProperties);
    return rs;
}
*/


ob  mk_Pcode0()
{
	Smallob rs;PcodeHetarray rsv;
	rs = mkSmallob_int(3);
    rs ->pagenumber = c_page;
	rs -> properties = pcodeProperties;
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

void buildPrototype(Type tp)
{
	Seqob tpr;Arrayob tpa;int ln,i,nmf,nma;Hashtable rst;Type vlf;
	ob cp;ob rcp;Smallob cr;Compactob rs;char* anns;Annotation ann;Object rsts;

	if (typePrototype(tp)) return;
	tpr = typeTypeProperties(tp);
	if (!tpr) return;
	tpa = tpr -> data;
    ln = tpa -> length;
	rst = typeRestrictions(tp);
	// first, count the fields to know how many annotation words to allocate
	nmf = 0;
	ob_push2(tp,tpa);
	ob_push(rst);

	nmf = ln;
	nma = 1+ ((nmf-1)/4); // num annotation words
	rs = (Compactob)heap_alloc(sizeof(CompactobStruct)+4*(nma + nmf));
    rs ->pagenumber = c_page;
	rs -> compactObNumFields = nmf;
	rs -> obkind = compact_kind;
	set_ob(rs->types,tp);
	set_ob(rs->properties,tpr);
	ob_push(rs);

	nmf = 0;
	anns = Compactob_annotations(rs);
	for (i=0;i<ln;i++)
	{
		cp = Arrayob_selectn(tpa,i);
		if (cp)
		{
			rcp = regarding1(cp);
			rsts = Hashtable_selectOb(rst,rcp);
			// the allvaluesfrom part is always at 0 in the sequence
			if ((rsts -> obkind) == seq_kind) 
			{
				cr = Arrayob_selectn(((Seq)rsts)->data,0);
				vlf = restrictionAllValuesFrom(cr);
				anns[nmf++] = typeInstanceStorage(vlf);
			}
			else // multivalued fellow
			{
                ann = (Annotation)(anns + (nmf++));
				ann -> storage = 0;
				ann -> value_kind = value_kind_multivalued;
			}
		}
	}
	setTypePrototype(tp,rs);
	ob_popn(4);
}

ob compactob_New(Type tp)
{
	ob pr;Object rs;
	// special case; has undefined properties which are not handled generally
	if (tp == RestrictionT) return mk_Restriction(); 
	ob_push(tp);
	if (pm_step_count > 2730)
		pm_step_count = pm_step_count;
	buildPrototype(tp);
	pr = typePrototype(tp);
	if (pr) rs = copy_Compactob(pr);
	else
	{
		rs = mk_Bindingtable();
		set_ob(rs->types,tp);
	}
	ob_pop();
	return rs;
}



// transfer the bindings in c to x (ignore the extension of c)
void compactobTransferBindings(ob x,Compactob c)
{
	Type tp0,tp;Hashtable rsth;Seqob gdsq,prpsq;Arrayob gds,prps;ObBinding rstb;
   int i,ast,nmf,prpln,nmaw,vli;ob vl,p;char *anns;Smallob vfr;ob rsts;Annotation ann;
   tp0 = ob_type0(c);
   rsth = typeRestrictions(tp0);
   gdsq = rsth->goods;
   gds = gdsq->data;

   nmf = c -> compactObNumFields;
   prpsq = (Seqob)(c->properties);
   prps = prpsq -> data;
   prpln = prps -> length;
   nmaw = 1+ ((nmf-1)/4); // num annotation words
   ob_push3(c,prps,gds);
   ob_push(x);
   for (i = 0;i < prpln;i++)
   {
       anns = Compactob_annotations(c); 
       ann = (Annotation)(anns + i);
	   ast = ann->storage;
	   p = Arrayob_selectn(prps,i);
	   rstb = (ObBinding)Arrayob_selectn(gds,i);
	   rsts = rstb -> value;
	   if ((rsts->obkind) == seq_kind)
		   vfr = Arrayob_selectn(((Seq)rsts)->data,0);
	   else
		   vfr = rsts;
	   tp = restrictionAllValuesFrom(vfr);
	   // just to be sure 
	   if ((restrictionOnProperty(vfr))!=p) UM_ERROR("INTERNAL: mismatch of retrictions and properties");
	   if (ast == storage_ob) 
	   {
		   vl = *((ob*)c + Compactob_annotation_woffset + nmaw + i);
		   setOb(x,p,vl,tp);
	   }
	   else 
	   if (ast == storage_int)
	   {
		   vli = *((int*)c + Compactob_annotation_woffset + nmaw + i);
		   setInt(x,p,vli,tp);
	   }
	   else
	   UM_ERROR("NOT YET:DOUBLE CASE");
	   //LATER DOUBLE CASE
   }
   ob_popn(4);
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
	if (!((k == compact_kind)||(k == smallob_kind)||(k==hashtable_kind))) return x;
	if ((!(x->internable))||(x->interned)) return x;
	qt = x -> quickType;
	if (qt == qtFunction) return internFunction(x);
	if (qt == qtType) return internType(x);
	if (qt == qtRegarding) return internRegarding(x);
    return x;
}

