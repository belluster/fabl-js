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




ob selectCharp(ob x,char* s)
{
	ob rs;
	 rs  = selectUri(x,charp_intern_string(s));
	 if (!rs) UM_ERROR("Selection failure");
	 return rs;
}


ob selectCharpPath(ob x,char** pth,int ln)
{
	 ob cv;int i;
	 cv = x;
	 for (i = 0;i<ln;i++)
	 {
		 cv = selectUri(cv,charp_intern_string(pth[i]));
	     if (!cv) UM_ERROR("Selection failure");
	 }
	 return cv;
}

char* fablPath[]= {"http",":","nurl.org","0","fabl"};
char* rdfsPath[]= {"http",":","www.w3.org","2000","01","rdf-schema","#"};
char* fimpPath[]= {"http",":","nurl.org","0","fimp"};
char* xsdPath[] = {"http",":","www.w3.org","2000","10","XMLSchema","#"};
char* rdfPath[]= {"http",":","www.w3.org","1999","02","22-rdf-syntax-ns","#"};
char* owlPath[]= {"http",":","www.w3.org","2002","07","owl","#"};

char* foafPath[]= {"http",":","xmlns.com","foaf","0.1"};


//ob rdfResource;
ob rdfsResource;


ob FablTypeT; 

ob charpBindUri(ob rsr,char* st)
{
	ob rs;
	rs = mk_Bindingtable();
	bindUri(rsr,charp_intern_string(st),rs);
	return rs;
}


void bindGlobal(ob sb,char* nm,ob vl,Type tp)
{
	ob p;
	ob_push3(sb,vl,tp);
	p = regarding1(charp_intern_string(nm));
	setObT(sb,p,vl,tp);
	ob_popn(3);
}

Type charpBindClass(ob rsr,char* st)
{
	Type rs;
	rs = mk_Typeob();
	bindUri(rsr,charp_intern_string(st),rs);
	return rs;
}

Type charpBindClass1(ob rsr,char* st)
{
	ob ist,rs,p;
	ob_push(rsr);
	ist = charp_intern_string(st);
	rs = mk_Typeob();
	ob_push2(rs,ist);
	bindUri(rsr,ist,rs);
	p = regarding1(ist);
	setObT(rsr,p,rs,TypeT);
	ob_popn(3);
	return rs;
}

Type charpBindProperty(ob rsr,char* st)
{
	ob rs;
	rs = mk_Bindingtable();
	ob_setType(rs,PropertyT);
	bindUri(rsr,charp_intern_string(st),rs);
	return rs;
}


Type charpBindFunctionalProperty(ob rsr,char* st)
{
	ob rs;
	rs = mk_Bindingtable();
	ob_setType(rs,FunctionalPropertyT);
	bindUri(rsr,charp_intern_string(st),rs);
	return rs;
}


Smallob mkAllValuesFromRestriction(ob prp,Type tp)
{
   Smallob rs;RestrictionHetarray rsv;
   ob_push2(prp,tp);
   rs = mk_Restriction();
   rsv = rs -> values;
   set_ob(rsv->allValuesFrom,tp);
   set_ob(rsv->onProperty,prp);
   rsv -> onPropertyAnn = annob_onevalue;
   rsv -> allValuesFromAnn = annob_onevalue;

   ob_popn(2);
   return rs;
}


Smallob mkHasValueRestriction(ob prp,ob vl)
{
   Smallob rs;RestrictionHetarray rsv;
   ob_push2(prp,vl);
   rs = mk_Restriction();
   rsv = rs -> values;
   set_ob(rsv->hasValue,vl);
   set_ob(rsv->onProperty,prp);
   rsv -> onPropertyAnn = annob_onevalue;
   rsv -> hasValueAnn = annob_onevalue;
 //  rs->cardinality = 1;
   ob_popn(2);
   return rs;
}




Smallob mkCardinalityRestriction(ob prp,int c)
{
   Smallob rs;RestrictionHetarray rsv;
   if (c != 1) UM_ERROR("NOT YET");
   ob_push(prp);
   rs = mk_Restriction();
   rsv = rs -> values;
   set_ob(rsv->onProperty,prp);
   rsv -> cardinality = 1;
   rsv -> onPropertyAnn = annob_onevalue;
   rsv -> cardinalityAnn = annint_onevalue;
   ob_pop();
   return rs;
}



Smallob mkMaxCardinalityRestriction(ob prp,int c)
{
   Smallob rs;RestrictionHetarray rsv;
   if (c != 1) UM_ERROR("NOT YET");
   ob_push(prp);
   rs = mk_Restriction();
   rsv = rs -> values;
   set_ob(rsv->onProperty,prp);
   rsv->maxCardinality = 1;
   rsv -> onPropertyAnn = annob_onevalue;
   rsv -> maxCardinalityAnn = annint_onevalue;
   ob_pop();
   return rs;
}

// cardinality 1 variant
// vlk = value_kind
ob addPropertyRestrictions(Seqob prps,ob rs,ob prp,Type tp,int vlk)
{
	ob rst,rrst,avf,crd;
	ob_push3(rs,prp,prps);
	avf = mkAllValuesFromRestriction(prp,tp);
	ob_push(avf);
	if (vlk == cardinality_unconstrained)
	{
		rst = mk_Seqob(1);
		Seqob_add(rst,avf);
		ob_push(rst);
	}
	else
	{
		if (vlk == cardinality_one) crd = mkCardinalityRestriction(prp,1);
		else crd = mkMaxCardinalityRestriction(prp,1);
		ob_push(crd);
		rst = mk_Seqob(2);
		Seqob_add(rst,avf);
		Seqob_add(rst,crd);
		ob_push(rst);
	}
	if (prps) Seqob_add(prps,prp);
	rrst = regarding1(prp);
	setObT(rs,rrst,rst,obT);//a sequence or restrictions
	if (vlk == cardinality_unconstrained) {ob_popn(5);} else {ob_popn(6);}
	return rst;
}
// the default: cardinality 1

ob addPropertyRestriction(Seqob prps,ob rs,ob prp,Type tp)
{
	return addPropertyRestrictions(prps,rs,prp,tp,cardinality_one);
}


ob addPropertyRestrictionFunctional(Seqob prps,ob rs,ob prp,Type tp)
{
	return addPropertyRestrictions(prps,rs,prp,tp,cardinality_functional);
}





void addBitField(ob rs,ob btp,ob prp,int bt)
{
	Smallob brst;Smallob btf;BitFieldHetarray btfv;
	ob_push2(rs,prp);
	btf = mk_BitField();
	btfv = btf->values;
	set_ob(btfv->ofProperty,prp);
	btfv -> lowBit = bt;
	btfv -> highBit = bt;
	ob_push(btf);
	setObT(btp,bitFieldP,btf,BitFieldT);
	brst = addPropertyRestrictionFunctional(nul,rs,btp,booleanT);
//	brst -> bitField = btf;
	ob_popn(3);
	return brst;
}

// these are sequences of restrictions for each of the properties of Xob
ob xob1typeR,xob1nameR,xob1parentR,xob1valueR,xob1labelsR,xob1boolesR;
ob xob1typeP,xob1nameP,xob1parentP,xob1valueP,xob1labelsP,xob1boolesP;


/*note: the Xob classes are subclasses of Xob1. The following code replicates
some of the effect of initialize(C) where C is a subclass of Xob1 by installing
the Xob1 restrictions */


void addXob1Restrictions(ob rs)
{
	setObT(rs,regarding1(xob1typeP),xob1typeR,obT);
	setObT(rs,regarding1(xob1nameP),xob1nameR,obT);
	setObT(rs,regarding1(xob1parentP),xob1parentR,obT);
	setObT(rs,regarding1(xob1valueP),xob1valueR,obT);
	setObT(rs,regarding1(xob1labelsP),xob1labelsR,obT);
	setObT(rs,regarding1(xob1boolesP),xob1boolesR,obT);
}


int deserializeSubst;

void rdfInit()
{
	ob httpR,httpclR,xmlnsR,nurlR,nurl0R,foafns;
	ob w3R,w3_2000R,w3_1999R,w3_2002R,thisFileR,FablTypePropsParent,rhome;
	ob listRestrictions,crst,prps;Type XobT,Xob1T,SeqOfXobT,XapplyT;
	Type XsequenceT,XcastT,XselectPropertyT,XselectIndexT,XassignT;
	Type XforT,XwhileT,XreturnT,XblockT,SeqOfDblockT,XgoT,XifT;
	Type PcodeArgT,SeqOfPcodeArgT,TempStackMarkT;
	Type TokenT,SeqOfTokenT;ob BoolesP,xsdStringT,fablStringBufT;
	ob maxCardinalityP,hasValueP,rangeP,hasBeenLoadedP,foafTopicP;
	Type XMLLiteralT,ContainerT,BagT,AltT,StatementT,ContainerMembershipPropertyT;
	ob subPropertyOfP,labelP,commentP,memberP,subjectP,predicateP,objectP,seeAlsoP,valueP;
    Type AllDifferentT,AnnotationPropertyT,owlClassT,DataRangeT,DatatypePropertyT,DeprecatedClassT;
	Type DeprecatedPropertyT,InverseFunctionalPropertyT,ObjectPropertyT,OntologyT,OntologyPropertyT;
	Type SymmetricPropertyT,ThingT,TransitivePropertyT,NothingT;
	ob backwardCompatibleWithP,complementOfP,differentFromP,disjointWithP,distinctMembersP;
	ob equivalentClassP,equivalentPropertyP,inverseOfP,importsP,incompatibleWithP,intersectionOfP;
	ob minCardinalityP,oneOfP,priorVersionP,sameAsP,someValuesFromP,unionOfP,versionInfoP;
	ob bitFieldsP;






	
string_Function_ = charp_intern_string("Function");
string_SeqOf_ = charp_intern_string("SeqOf");
string_bfimp_ = charp_intern_string("bfimp");
string_fimp_ = charp_intern_string("fimp");


	httpR = 	charpBindUri(rootResource,"http");
	httpclR = charpBindUri(httpR,":");
	nurlR = charpBindUri(httpclR,"nurl.org");
	nurl0R = charpBindUri(nurlR,"0");
	fablns = charpBindUri(nurl0R,"fabl");
	boot_fimp = charpBindUri(nurl0R,"fimp");
	w3R =   charpBindUri(httpclR,"www.w3.org");
	w3_2000R = charpBindUri(w3R,"2000");
	w3_1999R = charpBindUri(w3R,"1999");
	w3_2002R = charpBindUri(w3R,"2002");
	xmlnsR = charpBindUri(httpclR,"xmlns.com");
	rdfsns = charpBindUri(charpBindUri(charpBindUri(w3_2000R,"01"),"rdf-schema"),"#");
	xsdns = charpBindUri(charpBindUri(charpBindUri(w3_2000R,"10"),"XMLSchema"),"#");
	rdfns = charpBindUri(charpBindUri(charpBindUri(w3_1999R,"02"),"22-rdf-syntax-ns"),"#");
	owlns = charpBindUri(charpBindUri(charpBindUri(w3_2002R,"07"),"owl"),"#");
	foafns = charpBindUri(charpBindUri(xmlnsR,"foaf"),"0.1");
	TypeT = charpBindClass(rdfsns,"Class");
//    rdfResource = charpBindClass(rdfns,"Resource");
    rdfsResource = charpBindClass(rdfsns,"Resource");
	obT = rdfsResource;
	PropertyT = charpBindClass(rdfns,"Property");
	rdf_typeP = charpBindProperty(rdfns,"type");
    FablTypePropsParent = charpBindUri(fablns,"Type"); // root for the various fablish properties of type
	foafTopicP = charpBindProperty(foafns,"topic");
	thisFileR = charpBindUri(fablns,"thisFile");

	typeProperties = mk_Seqob(8);

	constructorP = charpBindProperty(FablTypePropsParent,"constructor");
	paramP = charpBindProperty(FablTypePropsParent,"param");
	paramsP = charpBindProperty(FablTypePropsParent,"params");
	typePropertiesP = charpBindProperty(FablTypePropsParent,"typeProperties");
	subClassOfP = charpBindProperty(rdfsns,"subClassOf");
	restrictionsP = charpBindProperty(fablns,"restrictions");
	prototypeP = charpBindProperty(FablTypePropsParent,"prototype");
    typeBoolesP = charpBindProperty(FablTypePropsParent,"booles");

	Seqob_add(typeProperties,constructorP);
	Seqob_add(typeProperties,paramP);
	Seqob_add(typeProperties,paramsP);
	Seqob_add(typeProperties,typePropertiesP);
	Seqob_add(typeProperties,subClassOfP);
	Seqob_add(typeProperties,restrictionsP);
	Seqob_add(typeProperties,prototypeP);
	Seqob_add(typeProperties,typeBoolesP);

	fixBootType(TypeT);
	fixBootType(rdfsResource);
	fixBootType(PropertyT);

	FunctionalPropertyT = charpBindClass(owlns,"FunctionalProperty");
    assertOb(FunctionalPropertyT,subClassOfP,PropertyT);

	RegardingT = charpBindClass(fablns,"Regarding");
	regardingProperties = mk_Seqob(2);
	Seqob_add(regardingProperties,charpBindProperty(RegardingT,"value"));
	Seqob_add(regardingProperties,charpBindProperty(RegardingT,"aspect"));
	setOb(RegardingT,typePropertiesP,regardingProperties);

	bindGlobal(fablns,"Class",TypeT,TypeT);
	bindGlobal(fablns,"Regarding",RegardingT,TypeT);
	bindGlobal(fablns,"Resource",obT,TypeT);
	bindGlobal(fablns,"ob",obT,TypeT);
	bindGlobal(fablns,"Property",PropertyT,TypeT);
	bindGlobal(fablns,"thisFileR",thisFileR,obT);
	bindGlobal(fablns,"topicP",foafTopicP,PropertyT);


	RestrictionT = charpBindClass1(owlns,"Restriction");
	onPropertyP = charpBindFunctionalProperty(owlns,"onProperty");
	allValuesFromP = charpBindFunctionalProperty(owlns,"allValuesFrom");
	hasValueP = charpBindFunctionalProperty(owlns,"hasValue");
	cardinalityP = charpBindFunctionalProperty(owlns,"cardinality");
	maxCardinalityP = charpBindFunctionalProperty(owlns,"maxCardinality");
	bitFieldP = charpBindProperty(fablns,"bitField");
	bitFieldsP = charpBindProperty(fablns,"bitFields");
	bindGlobal(fablns,"bitField",bitFieldP,PropertyT);
	bindGlobal(fablns,"bitFields",bitFieldsP,PropertyT);
	restrictionProperties = mk_Seqob(4);
	Seqob_add(restrictionProperties,onPropertyP);
	Seqob_add(restrictionProperties,allValuesFromP);
	Seqob_add(restrictionProperties,hasValueP);



	Seqob_add(restrictionProperties,cardinalityP);
	Seqob_add(restrictionProperties,maxCardinalityP);
	setOb(RestrictionT,typePropertiesP,restrictionProperties);
    assertOb(RestrictionT,subClassOfP,TypeT);


	string_Function_ = charp_intern_string("Function");
	string_SeqOf_ = charp_intern_string("SeqOf");
	stringT = charpBindClass1(fablns,"id");
	idT = stringT;
	xsdStringT = charpBindClass1(xsdns,"string");
	hexBinaryT = charpBindClass1(xsdns,"hexBinary");
	StringBufT = xsdStringT;
	intT = charpBindClass1(xsdns,"int");
	typeSetInstanceStorage(intT,1);
	doubleT = charpBindClass1(xsdns,"double");
	typeSetInstanceStorage(doubleT,2);
	booleanT = charpBindClass1(xsdns,"boolean");
	typeSetInstanceStorage(booleanT,1);
	byteT = charpBindClass1(xsdns,"byte");
	typeSetInstanceStorage(byteT,1);
	HashSeqT = charpBindClass1(fablns,"HashSeq");
	DblockT = charpBindClass1(fablns,"Dblock");

// date types from xsd

	dateT = charpBindClass1(xsdns,"date");
/* a little later
	gYearMonthT = charpBindClass1(xsdns,"gYearMonth");
	gYear = charpBindClass1(xsdns,"gYear");
	gMonthDay = charpBindClass1(xsdns,"gMonthDay");
	gDay = charpBindClass1(xsdns,"gDay");
*/
   

	crst = mk_Bindingtable();
	setOb(RegardingT,restrictionsP,crst);
	addPropertyRestriction(nul,crst,selectCharp(RegardingT,"value"),obT);
	addPropertyRestriction(nul,crst,selectCharp(RegardingT,"aspect"),obT);

	crst = mk_Bindingtable();
	setOb(TypeT,restrictionsP,crst);
	addPropertyRestrictions(nul,crst,selectCharp(FablTypePropsParent,"constructor"),stringT,cardinality_functional);
	addPropertyRestrictions(nul,crst,selectCharp(FablTypePropsParent,"param"),TypeT,cardinality_functional);
	addPropertyRestrictions(nul,crst,selectCharp(FablTypePropsParent,"params"),obT,cardinality_functional);
	addPropertyRestrictions(nul,crst,selectCharp(FablTypePropsParent,"typeProperties"),obT,cardinality_functional);
	addPropertyRestrictions(nul,crst,subClassOfP,TypeT,cardinality_unconstrained);
	addPropertyRestrictions(nul,crst,restrictionsP,obT,cardinality_functional);
	addPropertyRestrictions(nul,crst,selectCharp(FablTypePropsParent,"prototype"),obT,cardinality_functional);
	addPropertyRestrictions(nul,crst,selectCharp(FablTypePropsParent,"booles"),intT,cardinality_functional);


	BindingT = charpBindClass1(fablns,"Binding");
	bindingKeyP = charpBindProperty(BindingT,"key");
	bindingValueP = charpBindProperty(BindingT,"value");
	bindingTypeP = charpBindProperty(BindingT,"type");
	crst = mk_Bindingtable();
	setOb(BindingT,restrictionsP,crst);
	addPropertyRestriction(nul,crst,bindingValueP,obT);
	addPropertyRestriction(nul,crst,bindingTypeP,TypeT);
	addPropertyRestriction(nul,crst,bindingKeyP,obT);


	XobT = charpBindClass1(fablns,"Xob");
	Xob1T = charpBindClass1(fablns,"Xob1");
	crst = mk_Bindingtable();
	prps = mk_Seqob(5);
	setOb(Xob1T,restrictionsP,crst);
	xob1typeP = charpBindProperty(Xob1T,"type");
	xob1typeR = addPropertyRestrictionFunctional(prps,crst,xob1typeP,TypeT);
	xob1nameP = charpBindProperty(Xob1T,"name");
	xob1nameR = addPropertyRestrictionFunctional(prps,crst,xob1nameP,stringT);
	xob1parentP = charpBindProperty(Xob1T,"parent");
	xob1parentR = addPropertyRestrictionFunctional(prps,crst,xob1parentP,XobT);
	xob1valueP = charpBindProperty(Xob1T,"value");
	xob1valueR = addPropertyRestrictionFunctional(prps,crst,xob1valueP,obT);
	xob1labelsP = charpBindProperty(Xob1T,"labels");
	xob1labelsR = addPropertyRestrictionFunctional(prps,crst,xob1labelsP,obT);
	xob1boolesP = charpBindProperty(Xob1T,"booles");
	xob1boolesR = addPropertyRestriction(prps,crst,xob1boolesP,intT);
	addBitField(crst,charpBindProperty(Xob1T,"isConstant"),xob1boolesP,0);
	addBitField(crst,charpBindProperty(Xob1T,"isNoop"),xob1boolesP,1);




	SeqOfTypeT = mk_paramType(string_SeqOf_,TypeT);
	SeqOfByteT = mk_paramType(string_SeqOf_,byteT);
	SeqOfObT = mk_paramType(string_SeqOf_,obT); 
	SeqOfIntT = mk_paramType(string_SeqOf_,intT);
	SeqOfDoubleT = mk_paramType(string_SeqOf_,doubleT);
	SeqOfXobT = mk_paramType(string_SeqOf_,XobT); 
	SeqOfDblockT = mk_paramType(string_SeqOf_,DblockT); 



	XapplyT = charpBindClass1(fablns,"Xapply");
	crst = mk_Bindingtable();
	prps = mk_Seqob(4);
	setOb(XapplyT,restrictionsP,crst);
	addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XapplyT,"dest"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XapplyT,"functionOf"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XapplyT,"arguments"),SeqOfXobT);
	addPropertyRestriction(prps,crst,charpBindProperty(XapplyT,"booles"),intT);
    assertOb(XapplyT,subClassOfP,Xob1T);


	XsequenceT = charpBindClass1(fablns,"Xsequence");
	crst = mk_Bindingtable();
	prps = mk_Seqob(3);
	setOb(XsequenceT,restrictionsP,crst);
	addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XsequenceT,"dest"),XsequenceT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XsequenceT,"elementType"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XsequenceT,"arguments"),SeqOfXobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XsequenceT,"booles"),intT);
    assertOb(XsequenceT,subClassOfP,Xob1T);


	XcastT = charpBindClass1(fablns,"Xcast");
	crst = mk_Bindingtable();
	prps = mk_Seqob(2);
	setOb(XcastT,restrictionsP,crst);
	addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XcastT,"castee"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XcastT,"booles"),intT);
    assertOb(XcastT,subClassOfP,Xob1T);

	

	BitFieldT = charpBindClass1(fablns,"BitField");
	bitFieldProperties = mk_Seqob(3);
	Seqob_add(bitFieldProperties,charpBindProperty(BitFieldT,"ofProperty"));
	Seqob_add(bitFieldProperties,charpBindProperty(BitFieldT,"lowbit"));
	Seqob_add(bitFieldProperties,charpBindProperty(BitFieldT,"highbit"));
	setOb(BitFieldT,typePropertiesP,bitFieldProperties);


	crst = mk_Bindingtable();
	setOb(RestrictionT,restrictionsP,crst);
	addPropertyRestriction(nul,crst,onPropertyP,PropertyT);
	// a functional property; doesn't need cardinality constraints
	addPropertyRestrictions(nul,crst,allValuesFromP,TypeT,cardinality_unconstrained);
	addPropertyRestriction(nul,crst,bitFieldP,BitFieldT);
	addPropertyRestrictions(nul,crst,cardinalityP,intT,cardinality_unconstrained);
	addPropertyRestrictions(nul,crst,maxCardinalityP,intT,cardinality_unconstrained);

	XselectPropertyT = charpBindClass1(fablns,"XselectProperty");
	crst = mk_Bindingtable();
	prps = mk_Seqob(3);
	setOb(XselectPropertyT,restrictionsP,crst);
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XselectPropertyT,"source"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XselectPropertyT,"selector"),PropertyT);
	BoolesP = charpBindProperty(XselectPropertyT,"booles");
	addPropertyRestrictionFunctional(prps,crst,BoolesP,intT);
	addBitField(crst,charpBindProperty(XselectPropertyT,"isBitField"),BoolesP,0);
	addBitField(crst,charpBindProperty(XselectPropertyT,"isFunctional"),BoolesP,1);
    assertOb(XselectPropertyT,subClassOfP,Xob1T);

	XselectIndexT = charpBindClass1(fablns,"XselectIndex");
	crst = mk_Bindingtable();
	prps = mk_Seqob(3);
	setOb(XselectIndexT,restrictionsP,crst);
    addXob1Restrictions(crst);
//	XselectIndexT -> typeProperties = prps;
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XselectIndexT,"source"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XselectIndexT,"selector"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XselectIndexT,"booles"),intT);
    assertOb(XselectIndexT,subClassOfP,Xob1T);


	XassignT = charpBindClass1(fablns,"Xassign");
	crst = mk_Bindingtable();
	prps = mk_Seqob(3);
	setOb(XassignT,restrictionsP,crst);
	BoolesP = charpBindProperty(XassignT,"booles");
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XassignT,"source"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XassignT,"dest"),XobT);
	addPropertyRestrictionFunctional(prps,crst,BoolesP,intT);
//  if x.addValue, then the new value should be added, not the old value replaced
	addBitField(crst,charpBindProperty(XassignT,"addValue"),BoolesP,0);
    assertOb(XassignT,subClassOfP,Xob1T);

	XforT = charpBindClass1(fablns,"Xfor");
	crst = mk_Bindingtable();
	prps = mk_Seqob(5);
	setOb(XforT,restrictionsP,crst);
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XforT,"init"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XforT,"test"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XforT,"incr"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XforT,"body"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XforT,"booles"),intT);
    assertOb(XforT,subClassOfP,Xob1T);

	XwhileT = charpBindClass1(fablns,"Xwhile");
	crst = mk_Bindingtable();
	prps = mk_Seqob(4);
	setOb(XwhileT,restrictionsP,crst);
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XwhileT,"test"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XwhileT,"incr"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XwhileT,"body"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XwhileT,"booles"),intT);
    assertOb(XwhileT,subClassOfP,Xob1T);

	XreturnT = charpBindClass1(fablns,"Xreturn");
	crst = mk_Bindingtable();
	prps = mk_Seqob(3);
	setOb(XreturnT,restrictionsP,crst);
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XreturnT,"value"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XreturnT,"target"),stringT);
	BoolesP = charpBindProperty(XreturnT,"booles");
	addPropertyRestrictionFunctional(prps,crst,BoolesP,intT);

	addBitField(crst,charpBindProperty(XreturnT,"blockReturn"),BoolesP,0);
	addBitField(crst,charpBindProperty(XreturnT,"loopBreak"),BoolesP,1);
	addBitField(crst,charpBindProperty(XreturnT,"loopContinue"),BoolesP,2);
    assertOb(XreturnT,subClassOfP,Xob1T);


	XblockT = charpBindClass1(fablns,"Xblock");
	crst = mk_Bindingtable();
	prps = mk_Seqob(4);
	setOb(XblockT,restrictionsP,crst);
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XblockT,"returnType"),TypeT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XblockT,"locals"),obT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XblockT,"statements"),SeqOfXobT);
	BoolesP = charpBindProperty(XblockT,"booles");
	addPropertyRestrictionFunctional(prps,crst,BoolesP,intT);
	addBitField(crst,charpBindProperty(XblockT,"isFunctionBody"),BoolesP,0);
    assertOb(XblockT,subClassOfP,Xob1T);



	XgoT = charpBindClass1(fablns,"Xgo");
	crst = mk_Bindingtable();
	prps = mk_Seqob(3);
	setOb(XgoT,restrictionsP,crst);
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XgoT,"condition"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XgoT,"toLabel"),stringT);
	BoolesP = charpBindProperty(XgoT,"booles");
	addPropertyRestrictionFunctional(prps,crst,BoolesP,intT);
	addBitField(crst,charpBindProperty(XgoT,"goIfFalse"),BoolesP,0);
    assertOb(XgoT,subClassOfP,Xob1T);

	XifT = charpBindClass1(fablns,"Xif");
	crst = mk_Bindingtable();
	prps = mk_Seqob(4);
	setOb(XifT,restrictionsP,crst);
    addXob1Restrictions(crst);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XifT,"condition"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XifT,"ifTrue"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XifT,"ifFalse"),XobT);
	addPropertyRestrictionFunctional(prps,crst,charpBindProperty(XifT,"booles"),intT);
    assertOb(XifT,subClassOfP,Xob1T);





	DblockLayoutT = charpBindClass1(fablns,"DblockLayout");
	crst = mk_Bindingtable();
	dblockLayoutProperties = mk_Seqob(5);
	setOb(DblockLayoutT,restrictionsP,crst);
	setOb(DblockLayoutT,typePropertiesP,prps);
	addPropertyRestriction(dblockLayoutProperties,crst,charpBindProperty(DblockLayoutT,"numobs"),intT);
	addPropertyRestriction(dblockLayoutProperties,crst,charpBindProperty(DblockLayoutT,"numints"),intT);
	addPropertyRestriction(dblockLayoutProperties,crst,charpBindProperty(DblockLayoutT,"doubleoffset"),intT);
	addPropertyRestriction(dblockLayoutProperties,crst,charpBindProperty(DblockLayoutT,"numdoubles"),intT);
	addPropertyRestriction(dblockLayoutProperties,crst,charpBindProperty(DblockLayoutT,"booles"),intT);



	PcodeT = charpBindClass1(fablns,"Pcode");
	pcodeProperties = mk_Seqob(4);
 	crst  = mk_Bindingtable();
    setOb(PcodeT,typePropertiesP,pcodeProperties);
	setOb(PcodeT,restrictionsP,crst);
	addPropertyRestriction(pcodeProperties,crst,charpBindProperty(PcodeT,"code"),stringT);
	addPropertyRestriction(pcodeProperties,crst,charpBindProperty(PcodeT,"dblock"),DblockT);
//	addPropertyRestriction(pcodeProperties,crst,charpBindProperty(PcodeT,"dblockPool"),SeqOfDblockT);
	addPropertyRestriction(pcodeProperties,crst,charpBindProperty(PcodeT,"booles"),intT);


	PcodeArgT = charpBindClass1(fablns,"PcodeArg");
	prps = mk_Seqob(7);
 	crst  = mk_Bindingtable();
    setOb(PcodeArgT,typePropertiesP,prps);
	setOb(PcodeArgT,restrictionsP,crst);
	addPropertyRestriction(prps,crst,charpBindProperty(PcodeArgT,"kind"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(PcodeArgT,"dblockStorage"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(PcodeArgT,"dblockIndex"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(PcodeArgT,"selectionIndex"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(PcodeArgT,"pcodePos"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(PcodeArgT,"pcodeLength"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(PcodeArgT,"booles"),intT);

	SeqOfPcodeArgT = mk_paramType(string_SeqOf_,PcodeArgT); 


	TempStackMarkT = charpBindClass1(fablns,"TempStackMark");
	prps = mk_Seqob(3);
 	crst  = mk_Bindingtable();
    setOb(TempStackMarkT,typePropertiesP,prps);
	setOb(TempStackMarkT,restrictionsP,crst);
	addPropertyRestriction(prps,crst,charpBindProperty(TempStackMarkT,"obIndex"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(TempStackMarkT,"intIndex"),intT);
	addPropertyRestriction(prps,crst,charpBindProperty(TempStackMarkT,"doubleIndex"),intT);

	TokenT = charpBindClass1(fablns,"Token");
	prps = mk_Seqob(3);
 	crst  = mk_Bindingtable();
    setOb(TokenT,typePropertiesP,prps);
	setOb(TokenT,restrictionsP,crst);
	addPropertyRestriction(prps,crst,charpBindProperty(TokenT,"datum"),obT);
	addPropertyRestriction(prps,crst,charpBindProperty(TokenT,"position"),intT);
	BoolesP = charpBindProperty(TokenT,"booles");
	addPropertyRestriction(prps,crst,BoolesP,intT);
	addBitField(crst,charpBindProperty(TokenT,"isInfix"),BoolesP,0);
	addBitField(crst,charpBindProperty(TokenT,"isPrefix"),BoolesP,1);
	addBitField(crst,charpBindProperty(TokenT,"isPostfix"),BoolesP,2);
	addBitField(crst,charpBindProperty(TokenT,"isTerminator"),BoolesP,3);
	addBitField(crst,charpBindProperty(TokenT,"isOperator"),BoolesP,4);
	addBitField(crst,charpBindProperty(TokenT,"isAtom"),BoolesP,5);
	addBitField(crst,charpBindProperty(TokenT,"isKeyword"),BoolesP,6);
	addBitField(crst,charpBindProperty(TokenT,"isNumber"),BoolesP,7);
	addBitField(crst,charpBindProperty(TokenT,"isString"),BoolesP,9);
	addBitField(crst,charpBindProperty(TokenT,"isId"),BoolesP,9);


	


    SeqOfTokenT = mk_paramType(string_SeqOf_,TokenT); 


	FunctionT = charpBindClass1(fablns,"Function");
	functionProperties = mk_Seqob(6);
	crst  = mk_Bindingtable();
	addPropertyRestriction(functionProperties,crst,charpBindProperty(FunctionT,"name"),stringT);
	addPropertyRestriction(functionProperties,crst,charpBindProperty(FunctionT,"definedIn"),obT);
	addPropertyRestriction(functionProperties,crst,charpBindProperty(FunctionT,"type"),TypeT);
	addPropertyRestriction(functionProperties,crst,charpBindProperty(FunctionT,"implementation"),obT);
	addPropertyRestriction(functionProperties,crst,charpBindProperty(FunctionT,"cimp"),intT);
	addPropertyRestriction(functionProperties,crst,charpBindProperty(FunctionT,"booles"),intT);
	setOb(FunctionT,typePropertiesP,functionProperties);
	setOb(FunctionT,restrictionsP,crst);

	



	ListT = charpBindClass(rdfns,"List");
	listProperties = mk_Seqob(2);
	listRestrictions = mk_Bindingtable();
	setOb(ListT,typePropertiesP,listProperties);
	setOb(ListT,restrictionsP,listRestrictions);
	addPropertyRestriction(listProperties,listRestrictions,charpBindProperty(rdfns,"first"),obT);
	addPropertyRestriction(listProperties,listRestrictions,charpBindProperty(rdfns,"rest"),obT);
	List_nil = charpBindUri(rdfns,"nil");




	rangeP = charpBindProperty(rdfsns,"range");
	charpBindProperty(rdfsns,"domain");
	charpBindClass1(fablns,"void");


	hasBeenLoadedP = charpBindFunctionalProperty(fablns,"hasBeenLoaded");
	assertOb(hasBeenLoadedP,rangeP,booleanT);
	charpBindProperty(rdfsns,"isDefinedBy");


	LiteralT = charpBindClass(rdfsns,"Literal");
	bindGlobal(fablns,"Literal",LiteralT,TypeT);

	DatatypeT = charpBindClass(rdfsns,"Datatype");
	bindGlobal(fablns,"Datatype",DatatypeT,TypeT);

	RdfSeqT = charpBindClass(rdfns,"Seq");
	bindGlobal(fablns,"Seq",RdfSeqT,TypeT);


	rhome = regarding1(charp_intern_string("home"));
	setObT(fablns,rhome,fablns,obT);

// the remaining resources are auxilliary, in the sense that they are not needed
// for deserializing the analyzer. 

	XMLLiteralT = charpBindClass(rdfns,"XMLLiteral");
    assertOb(XMLLiteralT,subClassOfP,LiteralT);

	subPropertyOfP = charpBindProperty(rdfsns,"subPropertyOf");

	labelP = charpBindProperty(rdfsns,"label");

	commentP = charpBindProperty(rdfsns,"comment");

	ContainerT = charpBindClass(rdfsns,"Container");
    assertOb(RdfSeqT,subClassOfP,ContainerT);


	BagT = charpBindClass(rdfns,"Bag");
    assertOb(BagT,subClassOfP,ContainerT);


	AltT = charpBindClass(rdfns,"Alt");
    assertOb(AltT,subClassOfP,ContainerT);

	ContainerMembershipPropertyT = charpBindClass(rdfsns,"ContainerMembershipProperty");
    assertOb(ContainerMembershipPropertyT,subClassOfP,PropertyT);

	memberP = charpBindProperty(rdfsns,"member");


    StatementT = charpBindClass(rdfns,"Statement");
	
	subjectP = charpBindProperty(rdfns,"subject");
	
	predicateP = charpBindProperty(rdfns,"predicate");

	objectP = charpBindProperty(rdfns,"object");

	seeAlsoP = charpBindProperty(rdfsns,"seeAlso");
	
	valueP = charpBindProperty(rdfns,"value");


	// now owl

    AllDifferentT = charpBindClass(owlns,"AllDifferent");

    AnnotationPropertyT = charpBindClass(owlns,"AnnotationProperty");

	backwardCompatibleWithP = charpBindProperty(owlns,"backwardCompatibleWith");

	owlClassT = charpBindClass(owlns,"Class"); //equivalent to rdfs:Class in OWL Full

    complementOfP = charpBindProperty(owlns,"complementOf");

	DataRangeT = charpBindClass(owlns,"DataRange");

	DatatypePropertyT = charpBindClass(owlns,"DatatypeProperty"); //equivalent to rdf:Property in OWL Full


	DeprecatedClassT = charpBindClass(owlns,"DeprecatedClass"); 

	DeprecatedPropertyT = charpBindClass(owlns,"DeprecatedProperty"); 

    differentFromP = charpBindProperty(owlns,"differentFrom");

    disjointWithP = charpBindProperty(owlns,"disjointWith");

    distinctMembersP = charpBindProperty(owlns,"distinctMembers");

    equivalentClassP = charpBindProperty(owlns,"equivalentClass");

    equivalentPropertyP = charpBindProperty(owlns,"equivalentProperty");

    inverseOfP = charpBindProperty(owlns,"inverseOf");

    importsP = charpBindProperty(owlns,"imports");

    incompatibleWithP = charpBindProperty(owlns,"incompatibleWith");

    intersectionOfP = charpBindProperty(owlns,"intersectionOf");

	InverseFunctionalPropertyT = charpBindClass(owlns,"InverseFunctionalProperty"); 


    minCardinalityP = charpBindProperty(owlns,"minCardinality");

	NothingT = charpBindClass(owlns,"Nothing"); 

	ObjectPropertyT = charpBindClass(owlns,"ObjectProperty"); // equivalent to rdf:Property in OWL Full

    oneOfP = charpBindProperty(owlns,"oneOf");

	OntologyT = charpBindClass(owlns,"Ontology"); 

	OntologyPropertyT = charpBindClass(owlns,"OntologyProperty"); 

    priorVersionP = charpBindProperty(owlns,"priorVersion");

    sameAsP = charpBindProperty(owlns,"sameAs");

    someValuesFromP = charpBindProperty(owlns,"someValuesFrom");

	SymmetricPropertyT = charpBindClass(owlns,"SymmetricProperty"); 

	ThingT = charpBindClass(owlns,"Thing"); // equivalent to rdfs:Resource in OWL Full

	TransitivePropertyT = charpBindClass(owlns,"TransitiveProperty"); 

    unionOfP = charpBindProperty(owlns,"unionOf");

    versionInfoP = charpBindProperty(owlns,"versionInfo");

//	substkeys[0] = rdfResource;
//	substvalues[0] = rdfsResource;

	deserializeSubst = 0;


}



void fixFablns()
{

	   assertOb(LiteralT,rdf_typeP,DatatypeT);
}

