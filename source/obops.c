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
// the primitive operations on obs


int xsdKind_fun(ob x)
{
	return xsdKind(x);
}

void set_xsdKind_fun(ob x,int v)
{
	set_xsdKind(x,v);
}

int isDate(ob x)
{

	return x && ((x->obkind) == xsd_intRep_kind) && (xsdKind(x) == xsd_date_kind);
}

int dateToInt(ob x)
{
	boxedint xi;
	
	if (x && ((x->obkind) == xsd_intRep_kind) && (xsdKind(x) == xsd_date_kind))
	{
		xi = (boxedint)x;
		return xi->value;
	}
	return 0;
}


ob intToDate(int x)
{
	ob rs;
	rs = int_to_ob(x);
	rs -> obkind = xsd_intRep_kind;
	set_xsdKind(rs,xsd_date_kind);
	return rs;
}


	

int mod_fun(int x,int y)
{
	return x%y;
}



	

ob rootResource_fun()
{
	return rootResource;
}


void set_collectingSubjects(int v)
{
	collectingSubjects = v;
}

int nowCollectingSubjects()
{
	return collectingSubjects;
}

Seqob theCollectedSubjects()
{
	return collectedSubjects;
}

void ob_set_tempbit(ob x,int v)
{
	x -> tempbit = v;
}

int ob_tempbit(ob x)
{
	if (x->tempbit) return 1; 
	return 0;
}


void ob_set_tempbit0(ob x,int v)
{
	x -> tempbit0 = v;
}

int ob_tempbit0(ob x)
{
	if (x->tempbit0) return 1; 
	return 0;
}

void Binding_set_tempbit2(Binding x,int v)
{
	x -> tempbit2 = v;
}

int Binding_tempbit2(Binding x)
{
	if (x->tempbit2) return 1; 
	return 0;
}



void Binding_set_isConstant(Binding x,int v)
{
	x -> isConstant = v;
}

int Binding_isConstant(Binding x)
{
	if (x->isConstant) return 1; 
	return 0;
}
  
  
int ob_interned(ob x)
{
	if (!x) return 0;
	if (x->interned) return 1;
	return 0;
}


ob int_to_ob(int n)
{
	ob rs;
	rs = heap_alloc(sizeof(boxedint_struct));
	rs -> obkind = int_kind;
	((boxedint)rs) -> value = n;
	return rs;
}


ob double_to_ob(double n)
{
	boxeddouble rs;
	rs = dwa_heap_alloc(sizeof(boxeddouble_struct));
	rs -> obkind = double_kind;
	rs -> value = n;
	return (ob)rs;
}



int ob_to_int(ob x)
{
	if (x && ((x->obkind) == int_kind)) return ((boxedint)x)->value;
	UM_ERROR("ob_to_int applied to ob which is not a boxed int");
}



double ob_to_double(ob x)
{
	if (x && ((x->obkind) == double_kind)) return ((boxeddouble)x)->value;
	UM_ERROR("ob_to_double applied to ob which is not a boxed double");
}



ob to_boxeddouble(int n)
{
	double d;
	d = (double)n;
	return double_to_ob(n);
}

ob ob_label(ob x)
{
   if (!is_Object(x)) return nul;
   return ((Object)x)->parent;
}

ob ob_parent(ob x)
{
   ob pr;int prk,xk;
   if (!is_Object(x)) return nul;
   xk = x->obkind;
   if (xk == binding_kind)
	   return ((Binding)x)->parent;
   pr = ((Object)x)->parent;
   if (!pr) return nul;
   prk = pr -> obkind;
   if (prk == binding_kind)
	   return ((Binding)pr)->parent;
   else return pr;
}


int isRegarding(ob x)
{
	int k,qtx;
	if (!x) return 0;
	k = x->obkind;
	if (k == smallob_kind)
	{
		qtx = x->quickType;
		if (qtx == qtRegarding) return 1;
	}
	return 0;
}

string ob_name(ob x)
{
   ob pr;int prk;ob ky,rv;int kyk,xk,rvk;
   if (!is_Object(x)) return nul;
   xk = x->obkind;
   if (xk == binding_kind)
	   ky = ((Binding)x)->key;
   else
   {
	   pr = ((Object)x)->parent;
	   if (!pr) return nul;
	   prk = pr -> obkind;
	   if (prk != binding_kind) return nul;
	   ky = ((Binding)pr)->key;
   }
   kyk = ky -> obkind;
   if ((kyk == nstring_kind)||(kyk == wstring_kind)) return (string)ky;
   if (isRegarding(ky))
   {
	   rv = regardingValue(ky);
	   rvk = rv->obkind;
	   if ((rvk == nstring_kind)||(rvk == wstring_kind)) return (string)rv;
   }

   return nul;
}
// for debugging from C
void print_name(ob x)
{
	string_print(ob_name(x));
}
ob bindingKey(ob x)
{
	int xk;
	xk = x->obkind;
	if (xk == binding_kind) return ((Binding)x)->key;
	return nul;
}




int ob_obkind(ob x)
{
	if (x) return x->obkind; else return nul_kind;
}



ob ob_check_obkind(ob x,int k)
{
  int kx;
  if (x)
     {
	 kx = x->obkind;
	 if ((kx == k) || (kx == nul_kind) ) return x;
	 UM_ERROR("Runtime cast error");
	 }
  return x;
}

Type ob_type0(ob x)
{
	int k;ob tps;
	if (!x) return obT;
	k = x->obkind;
	
	switch (k)
	{
    case binding_kind:return BindingT;
    case nstring_kind:return stringT;
    case wstring_kind:return stringT;
    case int_kind:return intT;
    case double_kind:return doubleT;
	}
	if (k == compact_kind) UM_ERROR("COMPACTOB");
	if ((k == smallob_kind)||(k == hashtable_kind)||(k == seq_kind))
	{
			 tps = ((Object)x)->types;
			 if (!tps) return obT; // no type is equivalent to obT = AnyT
			 if ((tps->obkind) == seq_kind) return (Type)Seqob_select(tps,0);
			 return (Type)tps;
	}
	return obT;
}

// i means "internal"; returns either a single type or a sequence, depending
ob ob_iType(ob x)
{
	int k;ob tps;
	if (!x) return obT;
	k = x->obkind;
	
	switch (k)
	{
    case binding_kind:return BindingT;
    case nstring_kind:return stringT;
    case wstring_kind:return stringT;
    case int_kind:return intT;
    case double_kind:return doubleT;
	}
	if (k == compact_kind) UM_ERROR("COMPACTOB");
	if ((k == smallob_kind)||(k == hashtable_kind)||(k == seq_kind)||(k == values_kind))
			 return ((Object)x)->types;
	return obT;
}

// the subclasses given as the explicit value of rdfs:subClassOf
// should not include subclass-comparable elements-only the most specific subclasses
// Hence the recursion 
int isSubClassOf(Type stp,Type tp)
{
	Object stps;Arrayob sd;int ln,i;ob *dt;Values vls;
	if (tp == obT) return 1;
	if (stp == tp) return 1;

	if ((stp->types) == RestrictionT) return (tp == TypeT);
	stps = (Object)(typeSubClassOf(stp));
	if (!stps) return 0;
	if ((stps->obkind) == values_kind) 
	{
		vls = (Values)stps;
		sd = vls->data;
		ln = sd -> length;
		dt = Arrayob_contents(sd);
		for (i = 0;i<ln;i++) 
		{
			if (isSubClassOf(dt[i],tp)) return 1;
		}
	return 0;
	}
	else 
		return isSubClassOf(stps,tp);
}




int ob_hasType(ob x,Type tp)
{
	int k;ob tps;Values vtps;Arrayob dt;int vln,i;
	if (tp == obT) return 1;
	if (!x) return 0;// is this right? perhaps nil is a member of other types as well
	k = x->obkind;
	
	switch (k)
	{
    case binding_kind:return tp == BindingT;
    case nstring_kind:return tp == stringT;
    case wstring_kind:return tp == stringT;
    case int_kind:return tp == intT;
	case double_kind:return tp == doubleT;
	}
	if (k == compact_kind) UM_ERROR("COMPACTOB");
	if ((k == hashtable_kind)||(k == smallob_kind)||(k == seq_kind))
	{
		tps = ((Object)x)->types;
		if (!tps)
			return 0;
		if ((tps->obkind) == seq_kind) 
		{
			k = k;
		}
		if (((tps->obkind) == seq_kind)||((tps->obkind)==values_kind))
		{
			vtps = (Values)tps;
			dt = vtps->data;
			vln = dt->length;
			for (i=0;i<vln;i++)
			{
				if (isSubClassOf(Arrayob_selectn(dt,i),tp)) return 1;
			}
		    return 0;
		}

		return isSubClassOf(tps,tp);
	}
	return 0;
}

void ob_setType(ob x,Seqob tps)
{
	int k;
	if (!x) UM_ERROR("Cannot set the type of nil");
	k = x->obkind;
	if (k == compact_kind) UM_ERROR("COMPACTOB");
	if ((k == hashtable_kind)||(k == smallob_kind)||(k == seq_kind))
      set_ob(((Object)x)->types,(ob)tps);
   else UM_ERROR("Cannot apply setType to a primitive object");
}




Binding setOb1(ob x,ob p,ob nv,int cuc)
{
  int xk; Binding b;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (p == rdf_typeP)
  {
	  if (xk < 16) UM_ERROR("Expected object");
	  set_ob(((Object)x)->types,nv);
	  return nul;
  }
  if (xk == binding_kind)
  {
	  b = (Binding)x;
	  if (p == bindingKeyP) {set_ob(b->key,nv); return nul;}
	  if (p == bindingValueP) {setBindingValueOb(b,nv,cuc);return nul;}
	  if (p == bindingTypeP) {set_ob(b->valueType,nv);return nul;}

	  UM_ERROR("No such property of binding");
  }
  if (xk == hashtable_kind) return Hashtable_setOb(x,p,nv,cuc);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_setOb(x,p,nv);
  if (xk == smallob_kind) return Smallob_setOb(x,p,nv);
  UM_ERROR("Wrong kind for setOb");
}

Binding setOb(ob x,ob p,ob nv)
{
  return setOb1(x,p,nv,cardinality_unconstrained);
}

Binding setObFunctional(ob x,ob p,ob nv)
{
  return setOb1(x,p,nv,cardinality_functional);
}


ob getOb(ob x,ob p)
{
  int xk;Binding b;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
  if (xk == binding_kind)
  {
	  b = (Binding)x;
	  if (p == bindingKeyP) return b->key;
	  if (p == bindingValueP) return bindingValue(b);
	  if (p == bindingTypeP) return b->valueType;


	  UM_ERROR("No such property of binding");
  }
  if (xk == hashtable_kind) return Hashtable_getOb(x,p);
//  else
//  if (xk == compact_kind) return Compactob_getOb(x,p);
  else return nul;
}

// old terminology
ob selectOb(ob x,ob p)
{
	return getOb(x,p);
}
	
ob fgetOb(ob x,ob p)
{
  int xk,tpk;Binding b;ob tps;Seqob svl;Arrayob dt;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk < 16) UM_ERROR("This kind of resource has no properties");
  if (p == rdf_typeP)
  {
	  tps = ((Object)x)->types;
	  if (!tps) return obT;
	  tpk = tps->obkind;
	  if (tpk == seq_kind)
	  {
		  svl = (Seqob)tps;
		  dt = svl->data;
		  if ((dt->length)==0) UM_ERROR("internal");//shouldn't happen
		  return Arrayob_selectn(dt,0);
	  }
	  else return tps;
  }
  if (xk == binding_kind)
  {
	  b = (Binding)x;
	  if (p == bindingKeyP) return b->key;
	  if (p == bindingValueP) return bindingValue(b);
	  if (p == bindingTypeP) return b->valueType;


	  UM_ERROR("No such property of binding");
  }
  if (xk == hashtable_kind) return Hashtable_fgetOb(x,p);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_selectOb(x,p);
  if (xk == smallob_kind) return Smallob_fgetOb(x,p);
  return nul;
}



static mgetAllocCount = 0; // so we can count potentially wasteful allocs here

ob mgetOb(ob x,ob p)
{
  int xk,qt,tpk;Binding b;ob tps;ob rs;Values svl;Arrayob dt;Object xo;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk < 16) UM_ERROR("This kind of resource has no properties");
  xo = (Object)x;
  qt = xo->quickType;
  if (p == rdf_typeP)
  {
	  tps = xo->types;
	  if (tps)
	  {
		  tpk = tps->obkind;
		  if (tpk == values_kind) return tps;
	  }
	  ob_push(x);
	  svl = mk_Values(1);
	  tps = ((Object)x)->types;//in case gc moved x
	  if (!tps) tps = obT;
	  dt = svl->data;
	  dt->length = 1;
	  Arrayob_setn(dt,0,tps);
      set_ob(xo->types,svl);
	  ob_pop();
	  return svl;
  }
  if (xk == hashtable_kind) return Hashtable_mgetOb(x,p);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_mgetOb(x,p);
  if (xk == smallob_kind) return Smallob_mgetOb(x,p);
  return emptyValues;


}

void ob_Install();

Binding assertOb0(ob x,ob p,ob nv,int install)
{
  int xk,tpk;ob tps,ntps;Object xo;
  xk = x->obkind;
  if (xk < 16) UM_ERROR("Cannot apply assert to this kind of resource");
  if (p == rdf_typeP)
  {
	  if (!nv) return nul;
	  if (ob_hasType(x,nv)) return nul;
	  xo = (Object)x;
	  tps = xo->types;
	  if (!tps || (tps == obT)) 
		  set_ob(xo->types,nv);
	  else
	  {
		  tpk = tps -> obkind;
		  if (tpk == values_kind)
			  Values_add0(tps,nv,0);//no need to check if nv is already among tps
		  else
		  {
			  ob_push(xo);
			  ntps = addTo1(tps,nv);
			  set_ob(xo->types,ntps);
			  ob_pop();
		  }
	  }
   if (install)  ob_Install(x,nv,1); // last arg: alreadyAsserted
   return nul;
   }
  if (xk == hashtable_kind) return Hashtable_assertOb(x,p,nv);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_setOb(x,p,nv);//compactob fields are univalued
  if (xk == smallob_kind) return Smallob_setOb(x,p,nv);//compactob fields are univalued
  UM_ERROR("Cannot apply assert to this kind of resource");
}

Binding assertOb(ob x,ob p,ob nv)
{
	return assertOb0(x,p,nv,cardinality_unconstrained);
}


Binding assertInt(ob x,ob p,int nv)
{
  int xk,tpk;ob tps,ntps;Object xo;
  xk = x->obkind;
  if (xk < 16) UM_ERROR("Cannot apply assert to this kind of resource");

  if (xk == hashtable_kind) return Hashtable_assertInt(x,p,nv);
  UM_ERROR("Cannot apply assert to this kind of resource and an int");
}



Binding assertDouble(ob x,ob p,double nv)
{
  int xk,tpk;ob tps,ntps;Object xo;
  xk = x->obkind;
  if (xk < 16) UM_ERROR("Cannot apply assert to this kind of resource");

  if (xk == hashtable_kind) return Hashtable_assertDouble(x,p,nv);
  UM_ERROR("Cannot apply assert to this kind of resource and an int");
}
int valueCount(ob x,ob p)
{
	ob tps;int xk;
	xk = x->obkind;
    if (xk < 16) return 0;	
	if (p == rdf_typeP)
	{
		tps = ((Object)x)->types;
		if (!tps) return 1;// everything has the Resource type
		if ((tps->obkind) == seq_kind)
		{
			return ((Seq)tps)->data->length;
		}
		else return 1;
	}
	if (xk == hashtable_kind) return Hashtable_valueCount(x,p);
	// LATER deal with subClassOf
	return 0;
}

int valueCountOfType(ob x,ob p,Type tp)
{
	ob tps;int xk;
	xk = x->obkind;
    if (xk < 16) return 0;	
	if (p == rdf_typeP)
	{
		if (tp != TypeT) return 0; // not exactly right LATER fix
		tps = ((Object)x)->types;
		if (!tps) return 1;// everything has the Resource type
		if ((tps->obkind) == seq_kind)
		{
			return ((Seq)tps)->data->length;
		}
		else return 1;
	}
	if (xk == hashtable_kind) return Hashtable_valueCountOfType(x,p,tp);
	// LATER deal with subClassOf
	return 1;
}



ob selectUri(ob x,ob p)
{
  int xk,pk;Binding b;
  if (!x || !p) return nul;
  xk = x->obkind;
  pk = p -> obkind;
  if ((pk != nstring_kind)&&(pk != wstring_kind)) UM_ERROR("Expected string");
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
  if (xk == binding_kind) return nul;
  if (xk == hashtable_kind) return Hashtable_selectOb(x,p);
  else
//  if (xk == compact_kind) return Compactob_selectOb(x,p);
//  else
  if (xk == smallob_kind) return Smallob_fgetOb(x,p);
  else return nul;
}

ob selectBinding(ob x,ob p)
{
  int xk;
  if (!x || !p) return nul;
  xk = x->obkind;
  if (xk == hashtable_kind) return Hashtable_selectBinding(x,p);
  return nul;
}


ob selectUriBinding(ob x,ob p)
{
  int xk,pk;
  if (!x || !p) return nul;
  xk = x->obkind;
  pk = p -> obkind;
  if ((pk != nstring_kind)&&(pk != wstring_kind)) UM_ERROR("Expected string");
  if (xk == hashtable_kind) return Hashtable_selectBinding(x,p);
  return nul;
}




Binding setObT(ob x,ob p,ob nv,ob tp)
{
  int xk;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (p == rdf_typeP)
  {
	  if (xk < 16) UM_ERROR("Expected object");
	  set_ob(((Object)x)->types,nv);
	  return nul;
  }
  if (xk == hashtable_kind) return Hashtable_setObT(x,p,nv,tp,cardinality_functional);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_setObT(x,p,nv,tp);
  else UM_ERROR("Wrong kind for setObT");
}


Binding setObTyped(ob x,ob p,ob nv,ob tp)
{
	return setObT(x,p,nv,tp);
}

Binding  setInt(ob x,ob p,int nv)
{
  int xk; Binding b;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk == binding_kind)

      
	  UM_ERROR("No such property of binding");
  if (xk == hashtable_kind) return Hashtable_setInt(x,p,nv,cardinality_unconstrained);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_setInt(x,p,nv);
  if (xk == smallob_kind) return Smallob_setInt(x,p,nv);
  UM_ERROR("Wrong kind for setInt");
}

Binding  setIntFunctional(ob x,ob p,int nv)
{
	return setInt(x,p,nv);
}



Binding  setDouble(ob x,ob p,double nv)
{
  int xk; Binding b;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk == binding_kind)


	  UM_ERROR("No such property of binding");
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
  if (xk == hashtable_kind) return Hashtable_setDouble(x,p,nv,cardinality_functional);
  if (xk == smallob_kind) return Smallob_setDouble(x,p,nv);
//  else
//	  if (xk == compact_kind) return Compactob_setDouble(x,p,nv);
  else UM_ERROR("Wrong kind for setInt");
}



Binding  setDoubleFunctional(ob x,ob p,int nv)
{
	return setDouble(x,p,nv);
}




int int_setBit(int x,int bt,int vl)
{
	if (vl) return x | (1<<bt);
	else return x & ~(1<<bt);
}



int int_getBit(int x,int bt)
{
	return (x & (1<<bt))!=0;
}

void setBit(ob x,ob p,int bt,int nv)
{
  int cfv,nfv;
  cfv = selectInt(x,p);
  if (nv)
	  nfv = (1 << bt)|cfv;
  else
	  nfv = (~(1 << bt))&cfv;
  setInt(x,p,nfv);
}


int selectInt(ob x,ob p)
{
  int xk;Binding b;
  if (!x) return 0;
  xk = x->obkind;
  if (xk == binding_kind)


	  UM_ERROR("No such property of binding");
  if (xk == hashtable_kind) return Hashtable_selectInt(x,p);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_selectInt(x,p);
  if (xk == smallob_kind) return Smallob_fgetInt(x,p);
  return 0;
}

double Compactob_selectDouble();
double Hashtable_selectDouble();


double selectDouble(ob x,ob p)
{
  int xk;Binding b;
  if (!x) return 0.0;
  xk = x->obkind;
  if (xk == binding_kind)


	  UM_ERROR("No such property of binding");
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
  if (xk == hashtable_kind) return Hashtable_selectDouble(x,p);
  if (xk == smallob_kind) return Smallob_fgetDouble(x,p);
//  else
//  if (xk == compact_kind) return Compactob_selectDouble(x,p);
  else return 0.0;
}


int selectBit(ob x,ob p,int bt)
{
  int cfv;
  cfv = selectInt(x,p);
  if ((1 << bt) & cfv) return 1;
  return 0;
}



Binding setIntT(ob x,ob p,int nv,ob tp)
{
  int xk;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk == hashtable_kind) return Hashtable_setIntT(x,p,nv,tp,cardinality_functional);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_setIntT(x,p,nv,tp);
  UM_ERROR("Wrong kind for setIntT");
}

Binding setIntTyped(ob x,ob p,int nv,ob tp)
{
	return setIntT(x,p,nv,tp);
}


Binding setDoubleT(ob x,ob p,double nv,ob tp)
{
  int xk;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk == hashtable_kind) return Hashtable_setDoubleT(x,p,nv,tp,cardinality_functional);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_setDoubleT(x,p,nv,tp);
  UM_ERROR("Wrong kind for setDoubleT");
}

Binding setDoubleTyped(ob x,ob p,double nv,ob tp)
{
	return setDoubleT(x,p,nv,tp);
}



Binding bindUri(ob x,string nm,ob vl)
{
  int xk;
  if (!x) UM_ERROR("Nul value");
  xk = x->obkind;
  if (xk == hashtable_kind) return Hashtable_bindUri(x,nm,vl);
  if (xk == compact_kind) UM_ERROR("COMPACTOB");
//  if (xk == compact_kind) return Compactob_bindUri(x,nm,vl);
   UM_ERROR("Wrong kind for bindUri");
}







Smallob findFunction(Hashtable cn,string nm,Seqob itps)
  {
	Type fntp;Smallob fno;Smallob rs;
	ob_push3(cn,nm,itps);
	fntp = mk_functionType(AnyT,itps);// not interned
	fno = mk_Functionob(nm,cn,fntp);
	rs = HashSeq_get(cn,fno);
	ob_popn(3);
	return rs;
}

int Binding_inDblock(Binding b)
{
	return b->inDblock;
}

void Binding_setInDblock(Binding b,int v)
{ 
	if (v) b->inDblock = 1; else b->inDblock = 0;
}



void hashtableTransferBindings1(ob x,Hashtable h,int override)
{
   Seqob gdsq;Arrayob gds;int ln,i,bk;Binding b;ObBinding obn;IntBinding ib;DoubleBinding db;
   Type tp;ob p;
   if (!override) UM_ERROR("NOT YET non-override");
   gdsq = h->goods;
   gds = gdsq->data;
   ln = gds->length;
   ob_push(gds);
   for (i = 0;i < ln;i++)
   {
	   b = (Binding)Arrayob_selectn(gds,i);
	   bk = b -> bindingKind;
	   p = b -> key;
	   tp = b -> valueType;
	   if (bk == bindingObKind)
	   {
		   obn = (ObBinding)b;
		   setObT(x,p,obn->value,tp);
	   }
	   else
	   if (bk == bindingIntKind)
	   {
		   ib = (IntBinding)b;
		   setIntT(x,p,ib->value,tp);
	   }
	   else
	   if (bk == bindingDoubleKind)
	   {
		   db = (DoubleBinding)b;
		   setDoubleT(x,p,db->value,tp);
	   }
	   else
		   UM_ERROR("NOT YET");
   }
}

void hashtableTransferBindings(ob x,Hashtable h)
{
   hashtableTransferBindings1(x,h,1);
}



void splice1(ob x,ob y)
{
	int xk,yk,yln,i,xts,yts;ob xt,yt;Seqob xtseq;
	ob_push2(x,y);
	xk = x -> obkind;
	yk = y -> obkind;
	if (xk < 16) UM_ERROR("Non-object splice argument");
	if (yk < 16) UM_ERROR("Non-object splice argument");
    if (xk == compact_kind) UM_ERROR("COMPACTOB");
	if (yk == hashtable_kind) hashtableTransferBindings(x,y);
//	else
//	if (xk == compact_kind) compactobTransferBindings(x,y);


	else UM_ERROR("Not yet");
	// now splice the types together
	xt = ((Object)x)->types;
	yt = ((Object)y)->types;
	if (yt==AnyT) 
	{
		ob_popn(2);
		return;
	}
    if (xt==AnyT)
	{
		set_ob(((Object)x)->types,yt);
		ob_popn(2);
		return;
	}
	ob_push2(xt,yt);
	xts = ((xt->obkind)==seq_kind);
	yts = ((yt->obkind)==seq_kind);
	if (yts) 
		yln = ((Seqob)yt)->data->length;
	else yln = 1;
	if (xts)
	{
		xtseq = (Seqob)xt;
		ob_push(xtseq);
	}
	else
	{
		xtseq = mk_Seqob(yln+1);
		ob_push(xtseq);
		set_ob(((Object)x)->types,xtseq);
		Seqob_add(xtseq,xt);
	}
	if (yts)
	{
		for (i=0;i<yln;i++)
		{
			Seqob_add(xtseq,Seqob_select((Seqob)yt,i)); // LATER optimize
		}
	}
	else Seqob_add(xtseq,yt);
	ob_popn(5);
}



ob ob_bindings(ob x)
{
	int yk;
	if (x)
	{
		yk = x -> obkind;
		if (yk == hashtable_kind) return ((Hashtable)x)->goods;
	}
    return nul;
}

int bindingKind(Binding x)
{
	return x->bindingKind;
}

int ob_page(ob x)
{
	int k;
	if (!x) return -1;
	k = x->obkind;
	if (k < 16) return -1;
	if (k == binding_kind) return ((Binding)x)->pagenumber;
	return ((Object)x)->pagenumber;
}

void ob_set_page(ob x,int p)
{
	int k;
	if (!x) UM_ERROR("Cannot set page of nul");
	k = x->obkind;
	if (k == binding_kind) return ((Binding)x)->pagenumber = p;
	if (k < 16) UM_ERROR("Attempt to set page of non object");
	((Object)x)->pagenumber = p;
}

void set_currentPage(int n)
{
	c_page = n;
}

int currentPage()
{
	return c_page;
}

void HashtableBindingsSetPage(Hashtable tb,int pg)
{
   Seqob g;Arrayob xd;int ln,i;Binding b;ob* dt;
   g = tb->goods;
   xd = g->data;
   ln = xd -> length;
   dt = Arrayob_contents(xd);
   for (i=0;i<ln;i++)
   {
	   b = (Binding)(dt[i]);
	   b -> pagenumber = pg;
   }
}

/* for  debugging */

int Cinspect(ob x)
{
	Smallob rx,fx;Seq sx;Object ox;FunctionHetarray fxv;Binding bx;
	fx = (Smallob)x;
	bx = (Binding)x;
	fxv = (FunctionHetarray)(fx->values);
	rx = (Smallob)x;
	sx = (Seq)x;
	ox = (Object)x;
	return (int)x;
}

/* miscellaneous; could go anywhere*/


int set_bits(int b,int lb,int hb,int v)
  {
  int nb,msk,msk0,bmsk;
  nb= (hb - lb)+1;
  msk0 = (1<<nb)-1;
  msk = msk0<<lb;
  bmsk = b & ~msk;
  return bmsk|((v&msk0)<<lb);
  }

int get_bits(int b,int lb,int hb)
{
  int nb,sb,msk,rs;
  nb = (hb - lb)+1;
  sb =b >> lb;
  msk = (1<<nb)-1;
  return msk&sb;
}



// if property p has an int or double range, or if alloctp has storage int or double
// allocate accordingingly



ob ob_iNew(Type tp)
{
	Hashtable rst;Object rs;Seqob rstb,crst;Arrayob rstd,crstd;
	int istr,mxc,ln,cln,i,j,crd;
    ObBinding cb;Smallob cr;Type alv,alvc;ob nv,hsv,hsvc;ob p;
	Binding b;
	// special cases
	if (tp == TypeT) return mk_Typeob(); 
	if (tp == RestrictionT) return mk_Restriction(); 
	if (tp == StringBufT) return mk_empty_StringBuf();
	if (tp == PcodeT) return mk_Pcode0();
	if (tp == ListT) return mk_List0();
	if (tp == BitFieldT) 
		return mk_BitField();
	if (tp == RestrictionT) 
		return mk_Restriction();
	if (tp == DblockLayoutT) return mk_DblockLayout0();
    if (typeParam(tp)) return mkEmptySeq(tp);
	if (tp == RdfSeqT) 
	{
		rs = mkEmptySeq(SeqOfObT);
		set_ob(rs -> types,RdfSeqT);
		return rs;
	}
//	if (typeTypeProperties(tp)) return compactob_New(tp);
	if (typeTypeProperties(tp)) return smallob_New(tp);
	rst = (Hashtable)typeRestrictions(tp);
	if (!rst)  
	{
		ob_push(tp);
		rs = mk_Bindingtable();
		set_ob(rs->types,tp);
		ob_pop();
		return rs;
	}
	// rst is a hashtable that binding the sequence of restrictions on property P to regarding(p)
	rstb = (Seqob)rst->goods;
    rstd = rstb->data;
	ob_push2(tp,rstd);
	rs = mk_Bindingtable();
	ob_push(rs);
	set_ob(rs->types,tp);
	ln = rstd->length;
	for (i=0;i<ln;i++)
	{
		cb = (ObBinding)(Arrayob_selectn(rstd,i));
		crst = (Seqob)(cb->value);
		crstd = crst->data;
		cln = crstd->length;
		crd = 0;
		mxc = 0;
		alv = nul;
		hsv = nul;
		b = nul;
		// only allocate if cardinality = 1
		for (j=0;j<cln;j++)
		{
			cr = (Smallob)(Arrayob_selectn(crstd,j));
			if ((restrictionCardinality(cr)) == 1) 
			{
				crd = 1;
				p = restrictionOnProperty(cr);
			}
			else
			if ((restrictionMaxCardinality(cr)) == 1) 
			{
				mxc = 1;
				p = restrictionOnProperty(cr);
			}
			alvc = restrictionAllValuesFrom(cr);
			if (alvc) 
			{
				alv = alvc;
				p = restrictionOnProperty(cr);
			}
			hsvc = restrictionHasValue(cr);
			if (hsvc)
			{
				hsv = hsvc;
				p = restrictionOnProperty(cr);
			}
		}
		if (hsv)
		{
			b = setOb(rs,p,hsv);
		}
		if (crd) 
		{
			ob_push(p);
            if (!b) // 
			{
				b = allocBinding(rs,p,nul);
				ob_pop();
			}
		b -> cardinality_constraint = cardinality_functional;
		}
	}
	ob_popn(3);
	return rs;
}

ob ob_pNew(Type tp)
{
	ob rs;
	rs = ob_iNew(tp);
//stubbed  until there is a real persistence implementation*/
//	if (persistMode) declarePersistent(rs);
	return rs;
}



int enableLiteralConversion = 1;



void ob_Install(ob irs,Type tp,int alreadyAsserted)
{
	Hashtable rst;Object rs;Seqob rstb,crst;Arrayob rstd,crstd;
	int istr,mxc,ln,cln,i,j,cc,crd,vcnt;
    ObBinding cb;Smallob cr;Type alv,alvc;ob nv,hsv,hsvc;ob p;
	Binding b;
	if ((irs->obkind)<16) return;
    rs = (Object)irs;
	if (!alreadyAsserted && ob_hasType(rs,tp)) return rs;
	if ((irs->obkind)!=hashtable_kind) return;
	// special cases
	if ((tp != TypeT) && typeTypeProperties(tp)) UM_ERROR("Cannot install this class");
	if (!alreadyAsserted) assertOb0(rs,rdf_typeP,tp,0);
	rst = (Hashtable)typeRestrictions(tp);
	if (!rst)  
		return;
	// rst is a hashtable that binds the sequence of restrictions on property P to regarding(p)
	rstb = (Seqob)rst->goods;
    rstd = rstb->data;
	ob_push2(tp,rstd);
	ob_push(rs);


	ln = rstd->length;
	for (i=0;i<ln;i++)
	{
		cb = (ObBinding)(Arrayob_selectn(rstd,i));
		crst = (Seqob)(cb->value);
		crstd = crst->data;
		cln = crstd->length;
		crd = 0;
		mxc = 0;
		alv = nul;
		hsv = nul;
		b = nul;
		// only allocate if cardinality = 1
		for (j=0;j<cln;j++)
		{
			cr = (Smallob)(Arrayob_selectn(crstd,j));
			if ((restrictionCardinality(cr)) == 1) 
			{
				crd = 1;
				p = restrictionOnProperty(cr);
			}
			else
			if ((restrictionMaxCardinality(cr)) == 1) 
			{
				mxc = 1;
				p = restrictionOnProperty(cr);
			}
			alvc = restrictionAllValuesFrom(cr);
			if (alvc) 
			{
				alv = alvc;
				p = restrictionOnProperty(cr);
			}
			hsvc = restrictionHasValue(cr);
			if (hsvc)
			{
				hsv = hsvc;
				p = restrictionOnProperty(cr);
			}
		}
		if (hsv)
		{
			if (crd || mxc) b = setOb(rs,p,hsv); else
				b = assertOb(rs,p,hsv);
			b -> cardinality_constraint = cardinality_functional;
		}
		else
		{
			b = selectBinding(rs,p);
			if (crd  && !b)
				allocBinding(rs,p,alv);
			else
			{
				vcnt = valueCount(rs,p);
				if (valueCount(rs,p) && (crd || mxc)) 
				{
					if (crd) cc = cardinality_one; else cc = cardinality_functional;
					enforceCardinalityConstraint(rs,p,cc);
				}
				// literals will only be present in XML derived content
				if (vcnt && enableLiteralConversion)
				{
					if (alv == intT)
						convertLiterals(rs,p,alv);
				}
			}

		}

	}		
	ob_popn(3);
}




// mostly for testing

ob toLiteral(ob x)
{
	int k;Object rs;
	k = x->obkind;
	if (k != seq_kind) UM_ERROR("Expected string");
	rs = StringBuf_copy(x);
	set_ob(rs->types,LiteralT);
	return rs;
}
	

void setBindingValue(Binding b,ob v)
{
   setBindingValueOb(b,v,0);
}
	

// have to put this somewhere

int double_trunc(double x)
{
	return (int)x;
}

int double_round(double x)
{
	if (x > 0) return (int)(x + 0.5);
	return (int)(x-0.5);
}




void Hashtable_obChildren(Seqob properties,Seqob values,Hashtable h)
{
   Seqob gdsq;Arrayob gds;int ln,i,bk;Binding b;ObBinding obn;
   Type tp;ob p;
   gdsq = h->goods;
   gds = gdsq->data;
   ln = gds->length;
   ob_push3(gds,properties,values);
   for (i = 0;i < ln;i++)
   {
	   b = (Binding)Arrayob_selectn(gds,i);
	   bk = b -> bindingKind;
	   tp = b -> valueType;
	   p = b -> key;
	   if (bk == bindingObKind)
	   {
		   obn = (ObBinding)b;
		   Seqob_add(values,obn->value);
		   Seqob_add(properties,p);
	   }
   }
   ob_popn(3);

}


Hashtable  Hashtable_shallowCopy(Hashtable x)
   {
   Hashtable rs;ob tps,ntps;
   ob_push(x);
   rs = mk_Bindingtable();
   ob_push(rs);
   hashtableTransferBindings(rs,x);
   tps = x -> types;
   if ((tps->obkind) == seq_kind) ntps = Seqob_copy(tps);
   else ntps = tps;
   set_ob(rs -> types,ntps);
   ob_popn(2);
   return rs;
}


ob shallowCopy(ob x)
{
	int k;
	k = x -> obkind;
	if (k == smallob_kind) return copySmallob(x);
	else
	if (k == hashtable_kind) return Hashtable_shallowCopy(x);
	else
	if (k == seq_kind) return Seq_copy(x);
	else 
	return x;
}


