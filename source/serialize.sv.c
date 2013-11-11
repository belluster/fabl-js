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
#include "serialize.h"
#include <stdio.h>




char* sbuffer;
int* sbufferI;// for debugging
int maxSnodes;
int sbufferSize;
int sbufferMaxSize;
int restoreWordCount;
int numSnodes;
int* savedWord1s;
int sbufferP; // offset in characters to the next available character in sbuffer
int dataP;  // another offset variable; points at where data (rather than descriptions) is being written
int tripleCountIn;//how many triples have been read?
// For deserialization

int* snodeOffsets;  // maps snode indices to offsets within the buffer
int* snodeParents; //maps snode indices to the indices of their parents (if any)
ob* snodeValues; // the deserialized nodes
int typeP_index;  // index in the buffer of the rdf:type property
int typeT_index;  // index in the buffer of the Type type
int regardingT_index;  // index in the buffer of the Regarding type
int restrictionT_index;  // index in the buffer of the Restriction type
int functionT_index;  // index in the buffer of the Function type
int pcodeT_index;  // index in the buffer of the Pcode type
int bitFieldT_index;  // index in the buffer of the BitField type
int deserializePage; // set to the page index being deserialized
// In loading page0 (pass2-uri tree building)
// types are created before the type Type is defined;
// We need to keep track of these, and go back and fix them up before going on 
// to the allocation phase
int* untypedTypes;  
int numUntypedTypes;
// this is a fixed number - the number of types in page0
#define maxUntypedTypes 1000

Seqbyte serializeBuffer;


void serializeMalloc(int snodes,int bufsize)
{
	serializeBuffer = mk_Seqbyte(bufsize);
    sbuffer = (char*)Arraybyte_contents(serializeBuffer->data);
//	sbuffer = (char*)malloc(bufsize);
	
	sbufferI = sbuffer;
	maxSnodes = snodes;
	sbufferMaxSize = bufsize;
	savedWord1s  = (int*)malloc(4 * snodes);
	snodeOffsets = (int*)malloc(4 * snodes);
	snodeParents = (int*)malloc(4 * snodes);
	snodeValues = (ob*)malloc(4 * snodes);
	untypedTypes  = (ob*)malloc(4 * maxUntypedTypes);
	numUntypedTypes = 0;
}
// reset sbuffer to the current contents of serializeBuffer
void serializeSync()
{
	Arraybyte dt;
	dt = serializeBuffer -> data;
	sbufferMaxSize = dt -> capacity;
    sbuffer = (char*)Arraybyte_contents(dt);
}


Seqbyte getSerializeBuffer()
{
	 return serializeBuffer;
}
// call this after each serialize
void serializeReset()
{
    serializeSync();
	memset(sbuffer,0,sbufferMaxSize);
}




void installIndex(ob x)
{
	if ((x->tempbit) && !(x->tempbit0))
	{
	*(savedWord1s + numSnodes) = *(((int*)x)+1);
	*(((int*)x)+1) = numSnodes;
	x -> tempbit0 = 1;
	numSnodes++;
	}
	else 
		numSnodes = numSnodes;

}


void restoreWord1(ob x)
{
	if (((int)x) == 0x548e8b8)
		printf("REMOVEME\n");
	if (x->tempbit0) 
	{
	*(((int*)x)+1) = *(savedWord1s + restoreWordCount);
	x->tempbit0 = 0;
	restoreWordCount++;
	}
	else 
		restoreWordCount = restoreWordCount;
}



int word1Of(int* x)
{
	int rs;ob xo;  	
	if (x)
	{
		xo = (ob)x;
		if (xo->tempbit)
		{
			rs = *(x+1);
			return rs;
		}
		return -1;
	}
	return -1;//denotes nil
}

int swizzle_count = 0;
int swizzle_record_count = 0;

int swizzleRecord() // returns 1 if this is a record, ow 0
{
    char* cp;int rk,ln,i;int w1,*cpi,*cw;Object pr;
	R_X rx;//for debugging
	R_PO rpo;
	cp = sbuffer + sbufferP;
	rx = (R_X)cp;
	if (sbufferP >= sbufferSize) return 0;
	if isSnode(cp) return  0;
	rk = snodeKind(cp);
	swizzle_record_count++;
	if (rk == rkind_PI)
	{
		set_rProperty(cp,word1Of(pProperty(cp)));
		sbufferP = sbufferP + sizeof(P_PO_struct);
		return 1;
	}
	if (rk == rkind_PD)
	{
		set_rProperty(cp,word1Of(pProperty(cp)));
		sbufferP = sbufferP + sizeof(P_PD_struct);
		return 1;
	}
    if ((rk == rkind_PO) || (rk == rkind_URI))
	{
		pr = (Object)pProperty(cp);
		w1 = word1Of(pr);
		if (w1 == -1)
		{
			w1 = w1;
		}
		set_rProperty(cp,w1);
		rpo = (R_PO)cp;
		set_rPOvalue(cp,word1Of(pPOvalue(cp)));
		sbufferP = sbufferP + sizeof(P_PO_struct);
		return 1;
	}
    if (rk == rkind_POT)
	{
		pr = (Object)pProperty(cp);
		w1 = word1Of(pr);
		if (w1 == -1)
		{
			w1 = w1;
		}
		set_rProperty(cp,w1);
		set_rPOTvalue(cp,word1Of(pPOTvalue(cp)));
		set_rPOTvalueType(cp,word1Of(pPOTvalueType(cp)));
		sbufferP = sbufferP + sizeof(P_POT_struct);
		return 1;
	}
    if (rk == rkind_PIT)
	{
		set_rProperty(cp,word1Of(pProperty(cp)));
		set_rPITvalueType(cp,word1Of(pPITvalueType(cp)));
		sbufferP = sbufferP + sizeof(P_PIT_struct);
		return 1;
	}
    if (rk == rkind_PDT)
	{
		set_rProperty(cp,word1Of(pProperty(cp)));
		set_rPDTvalueType(cp,word1Of(pPDTvalueType(cp)));
		sbufferP = sbufferP + P_PDT_size;
		return 1;
	}
	if (rk == rkind_SEQ_OB)
	{
		ln = rSEQlength(cp);
		sbufferP = sbufferP + sizeof(R_SEQ_struct);
		cpi =  (int*)(sbuffer + sbufferP);
		for (i = 0;i<ln;i++)
		{
			cw = cpi + i;
			*cw = word1Of(*cw); // *????
		}
		sbufferP = sbufferP + 4*ln;
		return 1;
	}
	if (rk == rkind_SEQ_BYTE)
	{
		ln = rSEQlength(cp);
		sbufferP = sbufferP + sizeof(R_SEQ_struct) + ln;
		sbufferP = 4 * ((sbufferP+3)/4); // pad to word boundary
		return 1;
	}
	if (rk == rkind_SEQ_INT)
	{
		ln = rSEQlength(cp);
		sbufferP = sbufferP + sizeof(R_SEQ_struct) + 4*ln;
		return 1;
	}			
	if (rk == rkind_SEQ_DOUBLE)
	{
		ln = rSEQlength(cp);
		sbufferP = sbufferP + sizeof(R_SEQ_struct) + 8*ln;
		return 1;
	}			
    UM_ERROR("unknown kind");
}





void swizzle0() // returns the offset of the next fellow
{
    char* cp;int sk;S_string sst;int ln,lnp,rcnt,nmo,nmi,nmd,nmw,i;int *cpi,*cw;
	cp = sbuffer + sbufferP;
	sk = snodeKind(cp);
	swizzle_count++;
	if (sk == nkind_string)
	{
		sst = (S_string)cp;
		ln = sst->length;
        lnp = 4 * ((ln+3)/4); // pad to word boundary
		sbufferP = sbufferP + lnp + sizeof(S_string_struct);
		return;
	}
	if (sk == nkind_Resource)
	{
		sbufferP = sbufferP + 4;
		rcnt = 0;
		while (1) 
		{
			if (!swizzleRecord()) return;
			rcnt++;
		}
		return;
	}
	if (sk == nkind_Dblock)
	{
		cp = sbuffer + sbufferP;
		nmo = sDblockNumobs(cp);
		nmi = sDblockNumints(cp);
		nmd = sDblockNumdoubles(cp);
		nmw = nmo + nmi + 2*nmd;
		sbufferP = sbufferP + sizeof(S_DBLOCK_struct);
		cpi =  (int*)(sbuffer + sbufferP);
		for (i = 0;i<nmo;i++)
		{
			cw = cpi + i;
			*cw = word1Of(*cw);
		}
		sbufferP = sbufferP + 4*nmw;
	    return;
	}
	if (sk == nkind_Binding)
	{
		cp = sbuffer + sbufferP;
		set_sBindingParent(cp,word1Of(pBindingParent(cp)));
		set_sBindingKey(cp,word1Of(pBindingKey(cp)));
		sbufferP = sbufferP + sizeof(S_BINDING_struct);
	    return;
	}	
	UM_ERROR("UNKNOWN SNODE KIND");
}


void swizzle()
{
	sbufferP = sizeof(S_Header_struct);
	swizzle_count = 0;
	while (sbufferP < sbufferSize)
		swizzle0();

}












// this counts bindings in a hashtable that should be included.

int countIncludedBindings(Hashtable x,int pg)
{
   Seqob g;Arrayob xd;ob *dt;int ln,i,cnt;Binding b;
   g = x->goods;
   xd = g->data;
   dt = Arrayob_contents(xd);
   ln = xd -> length;
   cnt = 0;
   for (i=0;i<ln;i++)
   {
	   b = (Binding)(dt[i]);
	   if ((b->pagenumber)==pg) cnt++;
   }
 return cnt;	   
}


/*
int countIncludedFields(Compactob c,int pg)
{
	int serializeFields;
	// this criterion will work for the only internable fellows: regarding, and parameterized
	// types
   serializeFields = (c->internable) || ((c->pagenumber) == pg);
    if (serializeFields) return  c -> compactObNumFields;
	return 0;

}
*/


void serializeObStatement1(ob ip,ob vl,Type vltp,int isC)
{
   char* cp;int pk;Object vo;ob p;

   if (ip == string_bfimp_) 
   {
	   p = string_fimp_; // for serializing a new build of fimp
   }
   else p = ip;
   cp = sbuffer + sbufferP;
   set_isSnode(cp,0);
   set_rProperty(cp,p);
   set_rIsConstant(cp,isC);
   if (!vltp || (vltp == obT)) //PO case (no value type)
   {
	   pk = p->obkind;
	   if ((pk == nstring_kind)||(pk == wstring_kind)) 
		   set_rKind(cp,rkind_URI);
	   else
		   set_rKind(cp,rkind_PO);
	   set_rPOvalue(cp,vl);
	   sbufferP = sbufferP + sizeof(P_PO_struct);
   }
   else
   {
	   set_rKind(cp,rkind_POT);
	   set_rPOTvalue(cp,vl);
	   set_rPOTvalueType(cp,vltp);
	   sbufferP = sbufferP + sizeof(P_POT_struct);
   }
}


void serializeObStatement(ob ip,ob vl,Type vltp,int isC)
{
	Values vls;Arrayob dt;int ln,i;ob cv;
	if (vl && ((vl->obkind) == values_kind)) // serialize each of the values, 1 by 1
	{
		vls = (Values)vl;
		dt = vls->data;
		ln = dt -> length;
		for (i=0;i<ln;i++)
		{
			cv = Arrayob_selectn(dt,i);
			serializeObStatement1(ip,cv,vltp,isC);
		}
	}
	else 
	  serializeObStatement1(ip,vl,vltp,isC);
}

void serializeIntStatement(ob p,int vl,Type vltp,int isC)
{
   char* cp;int pk;
   cp = sbuffer + sbufferP;
   set_isSnode(cp,0);
   set_rProperty(cp,p);
   set_rIsConstant(cp,isC);
   if (!vltp || (vltp == obT)) //PI case (no value type)
   {
	   set_rKind(cp,rkind_PI);
	   set_rPIvalue(cp,vl);
	   sbufferP = sbufferP + sizeof(P_PI_struct);
   }
   else
   {
	   set_rKind(cp,rkind_PIT);
	   set_rPITvalue(cp,vl);
	   set_rPITvalueType(cp,vltp);
	   sbufferP = sbufferP + sizeof(P_PIT_struct);
   }
}


void serializeDoubleStatement(ob p,double vl,Type vltp,int isC)
{
   char* cp;int pk;
   cp = sbuffer + sbufferP;
   set_isSnode(cp,0);
   set_rProperty(cp,p);
   set_rIsConstant(cp,isC);
   if (!vltp || (vltp == obT)) //PI case (no value type)
   {
	   set_rKind(cp,rkind_PD);
	   set_rPDvalue(cp,vl);
	   sbufferP = sbufferP + sizeof(P_PD_struct);
   }
   else
   {
	   set_rKind(cp,rkind_PDT);
	   set_rPDTvalue(cp,vl);
	   set_rPDTvalueType(cp,vltp);
	   sbufferP = sbufferP + P_PDT_size;
   }
}



// bumps sbufferP (points to descriptions) and dataP (points to data) as side effect

void serializeBinding(Binding b)
{
   int bk;Type vltp;ob p;
	   bk = b->bindingKind;
	   vltp = b->valueType;
	   p = b->key;
	   if (bk == bindingIntKind) 
		  serializeIntStatement(p,((IntBinding)b)->value,vltp,b->isConstant);
	   else
	   if (bk == bindingDoubleKind) 
		  serializeDoubleStatement(p,((DoubleBinding)b)->value,vltp,b->isConstant);
	   else
		  serializeObStatement(p,((ObBinding)b)->value,vltp,b->isConstant);

}



#define HASH_SEQ 0
#define STRING_SET 1
#define BINDING_TABLE 2

int alwaysSerializeTypesField = 1;  


void serializeHashtable(Hashtable x,int pg)
{
   ob *dt;Seqob g;Arrayob xd;int ln,i,sk;char* cp;Object bv;int cs,ishsq;
   Binding b;ob tps;
   tps = x->types;
   cp = sbuffer + sbufferP;
   set_isSnode(cp,1);
   cs = x->hashtable_variety;
   ishsq = 0;
   if (cs == STRING_SET)
	   UM_ERROR("String sets not supported in serialization");
   if (cs == BINDING_TABLE)
	   set_snodeKind(cp,nkind_Resource);
   else
   if (cs == HASH_SEQ)
   {
	   UM_ERROR("HASH_SEQs not yet handled in serialization");

   }


   if (x->interned) set_snodeInterned(cp,1);
   sk = snodeKind(cp);//for debugging
   sbufferP = sbufferP + 4;

   g = x->goods;
   xd = g->data;
   ln = xd -> length;
   dt = Arrayob_contents(xd);
   if (tps && (alwaysSerializeTypesField || ((x->pagenumber) == pg)))
	   serializeObStatement(rdf_typeP,tps,nul,0);
   if (ishsq) 
   {
	      installIndex(x);
          return;
   }
   
   for (i=0;i<ln;i++)
   {
	   b = (Binding)(dt[i]);
	   if (b->tempbit2) serializeBinding(b);
	   // to gaurantee serialization of the relevant part of the uri tree
	   // serialize URI bindings whose values are serialized
	   else
	   if ((b->key->obkind) ==  nstring_kind)
	   {
		   bv = (Object)bindingValue(b);
		   if (bv->tempbit) serializeBinding(b);
	   }		   
   }
   installIndex(x);
}

/*

void serializeCompactob(Compactob x,int pg)
{
   ob pr,bv;int ast,nme,elst,bk,i;char *cp;
   int ln,vli;ob tps;Hashtable ext;
	int serializeFields,nmf,nmaw;Arrayob prps;Seqob prpsq;
	char *anns;ob vl,*prpc;Annotation ann;
	 ob *dt;Seqob g;Arrayob xd;Binding b;
	// this criterion will work for the only internable fellows: regarding, and parameterized
	// types
	serializeFields = (x->interned) || ((x->pagenumber) == pg);

   cp = sbuffer + sbufferP;
   set_isSnode(cp,1);
   set_snodeKind(cp,nkind_Resource);
    if (x->interned) 
		set_snodeInterned(cp,1);
  sbufferP = sbufferP + 4;

	
   tps = x->types;

   nmf = x -> compactObNumFields;
   if (tps) serializeObStatement(rdf_typeP,tps,nul,0);
   if (serializeFields) 
   {
   nmaw = 1+ ((nmf-1)/4); // num annotation words
   anns = Compactob_annotations(x);
   prpsq = (Seqob)(x->properties);
   prps = prpsq -> data;
   prpc = Arrayob_contents(prps);

   for (i=0;i<nmf;i++)
   {

        ann = (Annotation)(anns + i);
	    ast = ann->storage;
	    if (ast == storage_ob) 
		{
		   vl = *((ob*)x + Compactob_annotation_woffset + nmaw + i);
		   if (prpc[i] != prototypeP) // special case: prototypes are not serialized
			   serializeObStatement(prpc[i],vl,nul,0);
		   else
			   ann = ann; //for debugging

		}
		else
		if (ast == storage_int)
		{
		   vli = *((int*)x + Compactob_annotation_woffset + nmaw + i);
		   serializeIntStatement(prpc[i],vli,nul,0);
		}
   }
   }

   ext = x->extension;
   if (ext)
   {
	   g = ext->goods;
	   xd = g->data;
	   ln = xd -> length;
	   dt = Arrayob_contents(xd);
	   for (i=0;i<ln;i++)
	   {
		   b = (Binding)(dt[i]);
		   if (b->tempbit2) serializeBinding(b);
		   else
	   // to gaurantee serialization of the relevant part of the uri tree
	   // serialize URI bindings whose values are serialized
		   if ((b->key->obkind) ==  nstring_kind)
		   {
			   bv = (Object)bindingValue(b);
			   if (bv->tempbit) serializeBinding(b);
		   }
	   }
   }
   installIndex(x);
}


*/

void serializeSmallob(Smallob x,int pg)
{
   ob pr,bv;int ast,nme,elst,bk,i;char *cp;
   int ln,vli;ob tps;
	int serializeFields,nmf,nmaw;Arrayob prps;Seqob prpsq;
	Hetarray vls;
	char *anns;ob vl,*prpc;Annotation ann;
	 ob *dt;Seqob g;Arrayob xd;Binding b;
	// this criterion will work for the only internable fellows: regarding, and parameterized
	// types
	serializeFields = (x->interned) || ((x->pagenumber) == pg);

   cp = sbuffer + sbufferP;
   set_isSnode(cp,1);
   set_snodeKind(cp,nkind_Resource);
    if (x->interned) 
		set_snodeInterned(cp,1);
  sbufferP = sbufferP + 4;

	
   tps = x->types;
   vls = x -> values;

   nmf = vls -> length;

   if (tps) serializeObStatement(rdf_typeP,tps,nul,0);
   if (serializeFields) 
   {
   nmaw = 1+ ((nmf-1)/4); // num annotation words
   anns = Hetarray_annotations(vls);
   prpsq = (Seqob)(x->properties);
   prps = prpsq -> data;
   prpc = Arrayob_contents(prps);

   for (i=0;i<nmf;i++)
   {

        ann = (Annotation)(anns + i);

	    ast = ann->storage;
	    if (ast == storage_ob) 
		{
		   vl = *((ob*)vls + Array_preamble_wsize + nmaw + i);

		   if (prpc[i] != prototypeP) // special case: prototypes are not serialized
			   serializeObStatement(prpc[i],vl,nul,0);
		   else
			   ann = ann; //for debugging

		}
		else
		if (ast == storage_int)
		{
		   vli = *((int*)vls + Array_preamble_wsize + nmaw + i);
		   serializeIntStatement(prpc[i],vli,nul,0);
		}

   }
   }
   installIndex(x);
}


// LATER deal with wstrings
void serializeString(string x)
{
   int ln;S_string sst;char* cp;
   cp = sbuffer + sbufferP;
   ln = x -> length;
   set_isSnode(cp,1);
   set_snodeKind(cp,nkind_string);
   sst = (S_string)cp;
   sst -> length = ln;
   memcpy(sbuffer + sbufferP + 8,(char*)NSTRINGBODY(x),ln);
   sbufferP = sbufferP + 8 + ln;
   sbufferP = 4 * ((sbufferP+3)/4); // pad to word boundary
   if (((int)x)==0x548cea8) 
	   printf("REMOVEME");
   installIndex(x);
}



// FOR NOW, sequences are assumed not to have properties as well

void serializeSeq(Seq x,int pg)
{
   char* cp;ob tps;Arraygeneric dt;ob* dtc;int ln,dtk;R_X rx; // rx for debugging
   cp = sbuffer + sbufferP;
   set_isSnode(cp,1);
   set_snodeKind(cp,nkind_Resource);
   if (x->interned) 
	   set_snodeInterned(cp,1);
   sbufferP = sbufferP + 4;

   tps = x->types;
   if (tps) serializeObStatement(rdf_typeP,tps,nul,0);
   dt = x -> data;
   ln = dt->length;
   cp = sbuffer + sbufferP;
   rx = (R_X)cp;
   set_isSnode(cp,0);
   set_rSEQlength(cp,ln);
   sbufferP = sbufferP + sizeof(R_SEQ_struct);
   dtk = dt -> obkind;
   switch (dtk)
	{
	case arrayob_kind:
		{
			set_rKind(cp,rkind_SEQ_OB);
			dtc = Arrayob_contents(dt);//for debugging
			memcpy(sbuffer + sbufferP,Arrayob_contents(dt),4 * ln);
			sbufferP = sbufferP + 4*ln;
		}
		break;
	case arraybyte_kind:
		{
			set_rKind(cp,rkind_SEQ_BYTE);
			set_rXsdKind(cp,xsdKind(x));
			memcpy(sbuffer + sbufferP,Arrayob_contents(dt),ln);
			sbufferP = sbufferP + ln;
			sbufferP = 4 * ((sbufferP+3)/4); // pad to word boundary
		}
		break;
	case arrayint_kind:
		{
			set_rKind(cp,rkind_SEQ_INT);
			memcpy(sbuffer + sbufferP,Arrayob_contents(dt),4 * ln);
			sbufferP = sbufferP + 4*ln;
		}
		break;	
	case arraydouble_kind:
		{
			set_rKind(cp,rkind_SEQ_DOUBLE);
			memcpy(sbuffer + sbufferP,Arraydouble_contents(dt),8 * ln);
			sbufferP = sbufferP + 8*ln;
		}
		break;	
	default: UM_ERROR("NOT HANDLED YET");
	}
   installIndex(x);
	}


void serializeDblock(Dblock x,int pg)
{
   char* cp;int nmo,nmi,nmw,nmd;
   cp = sbuffer + sbufferP;
   set_isSnode(cp,1);
   set_snodeKind(cp,nkind_Dblock);
   nmo = x->numobs;
   nmi = x->numints;
   nmd = x->numdoubles;
   nmw = nmo + nmi + 2 * nmd;
   set_sDblockNumobs(cp,nmo);
   set_sDblockNumints(cp,nmi);
   set_sDblockNumdoubles(cp,nmd);
   sbufferP = sbufferP + sizeof(S_DBLOCK_struct);
   memcpy(sbuffer + sbufferP,((int*)x)+Dblock_preamble_wsize,4 * nmw);
   sbufferP = sbufferP + 4*nmw;
   installIndex(x);
}


void serializeBindingNode(Binding b,int pg)
{
   char* cp;
   // for debugging
   cp = sbuffer + sbufferP;
   set_isSnode(cp,1);
   set_snodeKind(cp,nkind_Binding);
   set_sBindingParent(cp,b->parent);
   set_sBindingKey(cp,b->key);
   sbufferP = sbufferP + sizeof(P_BINDING_struct);
   installIndex(b);
}


 



ob* obsToSerialize;
int serializeCount;  // the number of objects in toSerialize
void computeOffsets();
void deserialize();




void patchType(ob x)
{
	int qt,k;Object xo;Type tp; //tp for debugging
	tp = (Type)x;
	k = x->obkind;
	if (!((k == smallob_kind)||(k == hashtable_kind))) return;
	xo = (Object)x;
	if (xo->types) return;
	qt = xo -> quickType;
	if (qt == qtFunction) set_ob(xo->types,FunctionT);
	else
	if (qt == qtType) set_ob(xo->types,TypeT);
	else
	if (qt == qtRegarding) set_ob(xo->types,RegardingT);
}

void serializeToBuffer(Seqob s,int pg)
{
   ob *dt;Seqob g;Arrayob xd;int ln,i,ck;Object cob;S_Header hdr;int alsv;
   sweep_heaps();
   alsv = allocating_statically;
   allocating_statically = 1;
   serializeSync();
   xd = s->data;
   ln = xd -> length;
   if (ln > maxSnodes) UM_ERROR("Too many objects to serialize"); // later;malloc
   serializeCount = ln;
   sbufferP = sizeof(S_Header_struct);//past header
   numSnodes = 0;
   dt = Arrayob_contents(xd);
   obsToSerialize = dt;
   //save off pagenumbers
	for (i=0;i<ln;i++)
	{
	   cob = (Object)(dt[i]);
	   patchType(cob);

	   ck = cob->obkind;
       switch (ck)
	   {
	   case nstring_kind:serializeString(cob);break;
	   case hashtable_kind:serializeHashtable(cob,pg);break;
//	   case compact_kind:serializeCompactob(cob,pg);break;
	   case smallob_kind:serializeSmallob(cob,pg);break;
	   case seq_kind:serializeSeq(cob,pg);break;

	   case values_kind:break; 
	   case dblock_kind:serializeDblock(cob,pg);break;
	   case binding_kind:serializeBindingNode(cob,pg);break;
       default: UM_ERROR("Cannot yet serialize this kind of ob");
	   }
	}
   sbufferSize = sbufferP;
   hdr = (S_Header)sbuffer;
   sprintf(sbuffer,"FB__");
   hdr->version = 0;
   hdr->variant = 0;
   hdr->length = sbufferSize;
   hdr-> nodeCount = numSnodes;
   // restore word1Ofs, where indices were stored
   swizzle();
   restoreWordCount = 0;
   for (i=0;i<ln;i++)
   {
	   if (restoreWordCount == 6660)
		   printf("REMOVEME");
	   restoreWord1(dt[i]);
   }
     allocating_statically = alsv;
	 sweep_heaps();

}

void serializeToBuffer2(Seqbyte rs,Seqob s,int pg)
{
	Arraybyte dt;
	serializeToBuffer(s,pg);
	if (rs == serializeBuffer)
	{
		rs->data->length = sbufferSize;
		return;
	}
	ob_push(rs);
	rs->data->length = 0;
    Seqbyte_ensure_capacity(rs,sbufferSize);
	dt = rs->data;
	memcpy((char*)Arraybyte_contents(dt),sbuffer,sbufferSize);
	dt->length = sbufferSize;
	ob_pop();
}



// pg 1 = fimp

void serializeToFile(StringBuf fln,Seqob s,int pg)
{
	int rs;FILE *file;char* fbf;

   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
	serializeToBuffer(s,pg);
	fbf = Seqbyte_print_buf;
	Seqbyte_copyto(fbf,Seqbyte_print_buf_length,fln);
   if( (file = fopen( fbf, "wb" )) != NULL )
   {
       rs =  fwrite(sbuffer,1,sbufferSize,file);
      fclose( file );
	  if (pg == 1) exit(0);
   }
  else
	   UM_ERROR("File could not be opened\n");
}

#define substCount 1
ob* substkeys[substCount];
ob* substvalues[substCount];

// set in rdfinit



void doSubst(ob* p)
{
	int i;ob pv;
	pv = *p;
	for (i = 0;i<substCount;i++)
	{
		if (pv == substkeys[i])
		{
			*p = substvalues[i];
		}
	}
}

int substValueCount = 0;
ob substValue(ob v)
{
	int i;
	substValueCount++;
	for (i = 0;i<substCount;i++)
	{
		if (v == substkeys[i]) 
			return substvalues[i];
	}
	return v;
}



int deserializeVerbose = 0;

Seqob deserializeSubjects;

int deserializeRecordCount = 0;
int deserializeRecordPass1(int idx) // returns 1 if this is a record, ow 0
{
    char* cp;int rk,v,ln;
	R_X rx;//for debugging
	if (sbufferP >= sbufferSize) return 0;
	cp = sbuffer + sbufferP;
	rx = (R_X)cp;
	if isSnode(cp) return  0;
	rk = rKind(cp);
	tripleCountIn++;
    switch (rk)
	{
	case rkind_PI:
		sbufferP = sbufferP + sizeof(R_PI_struct);break;
	case rkind_URI:		
		v = rPOvalue(cp);
		if (v >= 0) snodeParents[v] = idx;
		sbufferP = sbufferP + sizeof(R_PO_struct);
		break;
	case rkind_PO:
		sbufferP = sbufferP + sizeof(R_PO_struct);
		break;
	case rkind_PD:
		sbufferP = sbufferP + sizeof(R_PD_struct);
		break;
	case rkind_POT:
		sbufferP = sbufferP + sizeof(R_POT_struct);
		break;
	case rkind_PIT:
		sbufferP = sbufferP + sizeof(R_PIT_struct);
		break;
	case rkind_PDT:
		sbufferP = sbufferP + R_PDT_size;
		break;
	case rkind_SEQ_OB:
			ln = rSEQlength(cp);
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + 4 * ln;
			break;
	case rkind_SEQ_INT:
			ln = rSEQlength(cp);
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + 4 * ln;
			break;
	case rkind_SEQ_DOUBLE:
			ln = rSEQlength(cp);
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + 8 * ln;
			break;
	case rkind_SEQ_BYTE:
			ln = rSEQlength(cp);
			ln = 4 * ((ln+3)/4);//pad to word boundary
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + ln;
			break;
	default:UM_ERROR("No such kind");
	}
    return 1;
}


void deserializeNodePass1(int idx)
{
	char* cp;int sk,ln,lnp,nmi,nmd,nmo,nmw;S_string sst;
    if (deserializeVerbose) printf("NODE pass1 %d\n",idx);
	if (idx == 559) 
	{
		idx = idx;
	}
	snodeOffsets[idx] = sbufferP;
	cp = sbuffer + sbufferP;
	sk = snodeKind(cp);
	if (sk == nkind_Resource)
	{
		sbufferP = sbufferP + 4;
		while (1)
		{
			if (!deserializeRecordPass1(idx)) return;
		}
	}
	if (sk == nkind_string)
	{
		sst = (S_string)cp;
		ln = sst -> length;
		snodeValues[idx] = string_intern(charp_mk_string2(cp+8,ln));
		if (deserializeVerbose) printf("index %d\n",idx);
		if (deserializeVerbose) string_print(snodeValues[idx]);
		lnp = 4 * ((ln+3)/4);//pad to word boundary
		sbufferP = sbufferP + 8 + lnp;
		return;
	}
	if (sk == nkind_Dblock)
	{
		nmo = sDblockNumobs(cp);
		nmi = sDblockNumints(cp);
		nmd = sDblockNumdoubles(cp);
		nmw = nmo + nmi + 2 * nmd;
		sbufferP = sbufferP + sizeof(S_DBLOCK_struct) + 4 * nmw;
		return;
	}
	if (sk == nkind_Binding)
	{
		sbufferP = sbufferP + sizeof(S_BINDING_struct);
		return;
	}

	UM_ERROR("Unknown kind");
}





void  deserializePass1()
{
	int idx,i;S_Header hdr;
	sbufferP = sizeof(S_Header_struct);
	hdr = (S_Header)sbuffer;
	numSnodes = hdr->nodeCount;
	sbufferSize = hdr->length;
	idx = 0;
	for (i=0;i<numSnodes;i++) 
	{
		snodeParents[i] = -1;
		snodeValues[i] = 0;
	}
	while (sbufferP < sbufferSize) deserializeNodePass1(idx++);
}



int sType(int idx)
{
	char* cp;int coff;int sk,rk,p;
	coff = snodeOffsets[idx];
	cp = sbuffer + coff;
	sk = snodeKind(cp);
	if (sk == nkind_Resource)
	{
		cp = cp + 4;
		rk = rKind(cp);
        if (rk == rkind_PO)
		{
			p = rProperty(cp);
			if (p == typeP_index) return rPOvalue(cp);
		}
	}
	return -1;
}

// returns the offset of the sequence record, or -1 if none



int seqRecordOffset(int idx)
{
	char* cp;int coff;int sk,rk;R_X rx;
	coff = snodeOffsets[idx];
	cp = sbuffer + coff;


	sk = snodeKind(cp);
	if (sk == nkind_Resource)
	{
		coff = coff + 4;
		cp = sbuffer + coff;
		if (isSnode(cp)) return -1;
		rk = rKind(cp);
	    rx = (R_X)(sbuffer + coff);//for debugging
        if (rk == rkind_PO)
		{
			coff =  coff + sizeof(R_PO_struct); //cruise past type
	        rx = (R_X)(sbuffer + coff);//for debugging
			cp = sbuffer + coff;
			if (isSnode(cp)) return -1;
			rk = rKind(cp);
		}

		if ((rkind_SEQ_OB <= rk) && (rk <= rkind_SEQ_DOUBLE)) return coff;
	}
	return -1;
}





ob deserializeAllocate(int idx)
{
	char* cp;int xsdrk,coff,tpi,nmi,nmd,nmo,rk,ln,sqr,sk;ob v,tp,tps,rs;Seq sq;
	v = snodeValues[idx];
	if (v) return v;
	coff = snodeOffsets[idx];
	cp = sbuffer + coff;
	sk = snodeKind(cp);
	rs = nul;
	if (sk == nkind_Resource)
	{
		sqr = seqRecordOffset(idx);
		if (sqr >= 0)
		{
			cp = sbuffer + sqr;
			rk = rKind(cp);
			xsdrk = rXsdKind(cp);
			ln = rSEQlength(cp);
			switch (rk)
			{
			case rkind_SEQ_OB: sq = mk_Seqob(ln);break;
			case rkind_SEQ_INT: sq = mk_Seqint(ln);break;
			case rkind_SEQ_DOUBLE: sq = mk_Seqdouble(ln);break;
			case rkind_SEQ_BYTE: sq = mk_Seqbyte(ln);break;
			default: UM_ERROR("kind not yet handled");
			}
			sq -> data -> length = ln;
			rs = sq;
			snodeValues[idx] = rs;
			set_xsdKind(rs,xsdrk);
			return rs;
		}		
		tpi = sType(idx);
		if (tpi == typeT_index) 
		{
			rs = mk_Typeob();
			if (!TypeT)
			{
				if (numUntypedTypes >= maxUntypedTypes) UM_ERROR("too many untyped types");
				untypedTypes[numUntypedTypes++] = rs;
			}
		}
		else
		if (tpi == regardingT_index) 
		{
			rs = mk_Regarding();
			if (!(((Object)rs)->types))
				printf("RegardingT not defined");
		}
		else
		if (tpi == functionT_index) 
		{
			rs = mk_Functionob0();
			if (!(((Object)rs)->types))
				printf("FunctionT not defined");
		}
		else
		if (tpi == pcodeT_index) 
		{
			rs = mk_Pcode0();
			if (!(((Object)rs)->types))
				printf("PcodeT not defined");
		}
		else
		if (tpi == restrictionT_index) 
		{
			rs = mk_Restriction();
			if (!(((Object)rs)->types))
				printf("PcodeT not defined");
		}
		else
		if (tpi == bitFieldT_index) 
		{
			rs = mk_BitField();
			if (!(((Object)rs)->types))
				printf("PcodeT not defined");
		}
		else
		{
			if (tpi < 0) rs = mk_Bindingtable();
			else
			{
				tps = snodeValues[tpi];
				if (!tps) rs = mk_Bindingtable();
				else
				{
					if ((tps->obkind) == seq_kind) 
						tp =  (Type)Seqob_select(tps,0);
					else tp = (Type)tps;
					rs = ob_iNew(tp);
					if (!rs) rs = mk_Bindingtable();
				}
			}
		}
		snodeValues[idx] = rs;
	}
	else
	if (sk == nkind_Dblock)
	{
		nmo = sDblockNumobs(cp);
		nmi = sDblockNumints(cp);
		nmd = sDblockNumdoubles(cp);
		rs = Dblock_alloc(nmo,nmi,nmd);
		snodeValues[idx] = rs;
	}
	return rs;
}

void fixUntypedTypes()
{
	int i;Type tp;
	for (i = 0;i<numUntypedTypes;i++)
	{
		tp = untypedTypes[i];
		if (!(tp->types)) tp -> types = TypeT;
		setTypeTypeProperties(tp,typeProperties);// this actually the one that's needed
	}

}


void deserializeUriNode();

void setPage0Global(int idx)
{
	switch (idx)
	{
	case 1:if (!rdf_typeP) rdf_typeP = snodeValues[idx];break;
	case 2:if (!TypeT) TypeT = snodeValues[idx];break;
	case 3:if (!RegardingT) RegardingT = snodeValues[idx];break;
	case 4:if (!FunctionT) FunctionT = snodeValues[idx];break;
	case 5:if (!PcodeT) PcodeT = snodeValues[idx];break;
	case 6:if (!RestrictionT) 
			   RestrictionT = snodeValues[idx];break;
	case 7:if (!BitFieldT) 
			   BitFieldT = snodeValues[idx];break;
	}
}

/* pass2: resolve fellows with URIs.  */
// idx = index of resource being deserialized, ofs = offset of the record
// returns offset of next record
int deserializeUriNodeRecord(int idx,int ofs) // returns 1 if this is a record, ow 0
{
    char* cp;ob ps,vl,pr;int rk,p,v;int sbufferPsv;
	R_X rx;//for debugging   
	if (ofs >= sbufferSize) return 0;
	pr = snodeValues[idx];
	if (idx == 8)
	{
		idx = idx;
	}
	cp = sbuffer + ofs;
	rx = (R_X)cp;
	if isSnode(cp) return  0;
	rk = rKind(cp);
    switch (rk)
	{
	case rkind_PI:
		return ofs + sizeof(R_PI_struct);
	case rkind_URI:		
		p = rProperty(cp);
		ps = snodeValues[p];
		if ((ps->obkind) == nstring_kind) 
		{
			if (deserializeVerbose) string_print(ps);
		}
		else UM_ERROR("EXPECTED String");
		v = rPOvalue(cp);
		if (v < 0) UM_ERROR("Unexpected nul");
		vl = selectUri(pr,ps);// is this value present in the store? 
		if ( !vl)
		{
			vl = deserializeAllocate(v);// sets snodeValues[v] to vl
			bindUri(pr,ps,vl);
//			if (deserializePage == 0) setPage0Global(v);
		}
		else 
		{
		
			if (snodeValues[v]) {printf("%d ALREADY exists below %d\n",v,idx);}
			snodeValues[v] = vl;
		}
		rx -> resolved = 1;
		
		//recurse down the tree
		deserializeUriNode(v);
		return ofs + sizeof(R_PO_struct);
	case rkind_PO:
		return ofs + sizeof(R_PO_struct);
	case rkind_POT:
		return ofs + sizeof(R_POT_struct);
	case rkind_PIT:
		return ofs + sizeof(R_PIT_struct);
	case rkind_PD:
		return ofs + sizeof(R_PD_struct);
	case rkind_PDT:
		return ofs + R_PDT_size;
	default:UM_ERROR("No such kind");
	}
}

int deserializeNodeCount = 0;
int deserializeUriNodeCount = 0;

void deserializeUriNode(int idx) 
{
	char* cp;int sk,coff;
	if (deserializeVerbose) printf("Node pass2(uri tree) %d %d\n",idx,deserializeNodeCount++);
	deserializeUriNodeCount++;
	if (idx == 84)
	{
		idx = idx;
	}
	coff = snodeOffsets[idx];
	cp = sbuffer + coff;
	sk = snodeKind(cp);
	if (sk == nkind_Resource)
	{
		coff = coff + 4;
		while (coff)
		{
			if (coff == 1832)
			{
				coff = coff;
			}
			coff = deserializeUriNodeRecord(idx,coff);
		}
	}
	else


	UM_ERROR("Not yet");
}

void deserializeUriTree()
{
     snodeValues[0] = rootResource;
	 deserializeUriNode(0);
}

// now the uri tree is ready; pass3, allocation  and interning

ob deserializeNodePass3();
ob deserializeResolveBinding();
// resolving is true during pass4 - final resolution

int deserializeRecordPass3(ob dst,int interning,int resolving) // returns 1 if this is a record, ow 0
{
    char *cp;int rk,ln,pi,rslv,vi,tpi,i,svi,*sqp;Arraygeneric xd;Arraydouble xdd;R_X rx;double vd;
	ob tp,sv,p,v;ob *dt;Smallob fn;Type dtp;Binding b;//fn,tpfor debugging
	int sbufferPsv;
	fn = (Smallob)dst;
	dtp = (Type)dst;
	if (sbufferP >= sbufferSize) return 0;
	cp = sbuffer + sbufferP;
	rx = (R_X)cp;
	if isSnode(cp) return  0;
	rslv = rx->resolved;
	rk = rKind(cp);
    switch (rk)
	{
	case rkind_PI:
		if (!rslv)
		{
			pi = rProperty(cp);
			if (pi == -1) UM_ERROR("Nul property");
			p = snodeValues[pi];
			if (!p) UM_ERROR("Unresolved property");
			vi = rPIvalue(cp);
			b = setInt(dst,p,vi);
			rx -> resolved = 1;
			if ((rx->isConstant) && b) Binding_set_isConstant(b,1);
		}
		sbufferP = sbufferP + sizeof(R_PI_struct);break;
	case rkind_PD:
		if (!rslv)
		{
			pi = rProperty(cp);
			if (pi == -1) UM_ERROR("Nul property");
			p = snodeValues[pi];
			if (!p) UM_ERROR("Unresolved property");
			vd = rPDvalue(cp);
			b = setDouble(dst,p,vd);
			rx -> resolved = 1;
			if ((rx->isConstant) && b) Binding_set_isConstant(b,1);
		}
		sbufferP = sbufferP + sizeof(R_PD_struct);break;

	case rkind_URI:
		// already dealt with in URI tree pass
		sbufferP = sbufferP + sizeof(R_PO_struct);
		break;
	case rkind_PO:
		if ((interning || resolving) && !rslv)
		{
			pi = rProperty(cp);
			if (pi == -1) UM_ERROR("Nul property");
			p = snodeValues[pi];
			if (!p) UM_ERROR("Unresolved property");
			vi = rPOvalue(cp);
			if (vi == -1)
				v = nul;
			else
			{
				v = snodeValues[vi];
				sbufferPsv = sbufferP;
				if (resolving)
				{
					if (!v) UM_ERROR("Missing value");
				}
				else
				if (!v) v = deserializeNodePass3(vi);
				sbufferP = sbufferPsv;
			}
			if (deserializeSubst) v = substValue(v);

			b = assertOb(dst,p,v);
			rx -> resolved = 1;
			if ((rx->isConstant) && b) Binding_set_isConstant(b,1);
		}	
		sbufferP = sbufferP + sizeof(R_PO_struct);
		break;
	case rkind_POT:
		if ((interning || resolving) && !rslv)
		{
			pi = rProperty(cp);
			if (pi == -1) UM_ERROR("Nul property");
			p = snodeValues[pi];
			if (!p) UM_ERROR("Unresolved property");
			vi = rPOTvalue(cp);
			sbufferPsv = sbufferP;
			if (vi == -1)
				v = nul;
			else
			{

				v = snodeValues[vi];
				if (resolving)
				{
					v = deserializeResolveBinding(vi);
					if (!v) UM_ERROR("Missing value");
				}
				else
				if (!v) v = deserializeNodePass3(vi);
			}
			tpi = rPOTvalueType(cp);
			tp = snodeValues[tpi];
			if (resolving)
			{
				if (!tp) UM_ERROR("Missing type");
			}
			else
			if (!tp) tp = deserializeNodePass3(tpi);
			sbufferP = sbufferPsv;
			if (deserializeSubst) 
			{
				v = substValue(v);
				tp = substValue(tp);
			}
			b = setObT(dst,p,v,tp);
			rx -> resolved = 1;
			if ((rx->isConstant) && b) Binding_set_isConstant(b,1);
		}	
		sbufferP = sbufferP + sizeof(R_POT_struct);
		break;
	case rkind_PIT:
		if ((interning || resolving) && !rslv)
		{
			pi = rProperty(cp);
			if (pi == -1) UM_ERROR("Nul property");
			p = snodeValues[pi];
			if (!p) UM_ERROR("Unresolved property");
			vi = rPITvalue(cp);
			tpi = rPITvalueType(cp);
			tp = snodeValues[tpi];
		    sbufferPsv = sbufferP;
			if (resolving)
			{
				if (!tp) UM_ERROR("Missing type");
			}
			else
			if (!tp) tp = deserializeNodePass3(tpi);
			 sbufferP = sbufferPsv;
			b = setIntT(dst,p,vi,tp);
			rx -> resolved = 1;
			if ((rx->isConstant) && b) Binding_set_isConstant(b,1);
		}	
		sbufferP = sbufferP + sizeof(R_PIT_struct);
		break;
	case rkind_PDT:
		if ((interning || resolving) && !rslv)
		{
			pi = rProperty(cp);
			if (pi == -1) UM_ERROR("Nul property");
			p = snodeValues[pi];
			if (!p) UM_ERROR("Unresolved property");
			vd = rPDTvalue(cp);
			tpi = rPDTvalueType(cp);
			tp = snodeValues[tpi];
		    sbufferPsv = sbufferP;
			if (resolving)
			{
				if (!tp) UM_ERROR("Missing type");
			}
			else
			if (!tp) tp = deserializeNodePass3(tpi);
			 sbufferP = sbufferPsv;
			b = setDoubleT(dst,p,vd,tp);
			rx -> resolved = 1;
			if ((rx->isConstant) && b) Binding_set_isConstant(b,1);
		}	
		sbufferP = sbufferP + R_PDT_size;
		break;
	case rkind_SEQ_OB:
			ln = rSEQlength(cp);
			if ((interning || resolving) && !rslv)
			{
				sqp = (int*)(sbuffer + sbufferP + sizeof(R_SEQ_struct));
				xd = ((Seqob)dst)->data;
				dt = Arrayob_contents(xd);
				sbufferPsv = sbufferP;
				for (i=0;i<ln;i++)
				{
					svi = *(sqp++);
					if (svi == -1) dt[i] = nul;
					else
					{
						sv = snodeValues[svi];
						if (resolving)
						{
							if (!sv) UM_ERROR("Missing sequence value");
						}
						else
							if (!sv) sv = deserializeNodePass3(svi);
						if (deserializeSubst) sv = substValue(sv);
						dt[i] = sv;
					}
				}
				sbufferP = sbufferPsv;
			rx -> resolved = 1;
			}
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + 4 * ln;
			break;
	case rkind_SEQ_INT:
			ln = rSEQlength(cp);
			if ((interning || resolving) && !rslv)
			{
				sqp = (int*)(sbuffer + sbufferP + sizeof(R_SEQ_struct));
				xd = ((Seqint)dst)->data;
			    memcpy(Arrayint_contents(xd),sqp,4 * ln);
				rx -> resolved = 1;
			}
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + 4 * ln;
			break;
	case rkind_SEQ_DOUBLE:
			ln = rSEQlength(cp);
			if ((interning || resolving) && !rslv)
			{
				sqp = (double*)(sbuffer + sbufferP + sizeof(R_SEQ_struct));
				xdd = ((Seqdouble)dst)->data;
			    memcpy(Arraydouble_contents(xdd),sqp,8 * ln);
				rx -> resolved = 1;
			}
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + 8 * ln;
			break;
	case rkind_SEQ_BYTE:
			ln = rSEQlength(cp);
			if ((interning || resolving) & !rslv)
			{
				sqp = (int*)(sbuffer + sbufferP + sizeof(R_SEQ_struct));
				xd = ((Seqbyte)dst)->data;
			    memcpy(Arrayint_contents(xd),sqp,ln);
				rx -> resolved = 1;
			}
			sbufferP = sbufferP + sizeof(R_SEQ_struct) + ln;
			sbufferP = 4 * ((sbufferP+3)/4); // pad to word boundary
			break;
	default:UM_ERROR("No such kind");
	}
    return 1;
}




ob deserializeNodePass3(int idx)
{
	char* cp;int sk,ln,itrn,lnp,nmi,nmo,nmw;ob dst;Dblock db;
    if (deserializeVerbose) printf("pass3 %d\n",idx);
	dst = snodeValues[idx];
	if (dst) return dst; // already done
	sbufferP = snodeOffsets[idx];
	cp = sbuffer + sbufferP;
	sk = snodeKind(cp);
	itrn = snodeInterned(cp);
	dst =  deserializeAllocate(idx);
	if (sk == nkind_Resource)
	{
		sbufferP = sbufferP + 4;
		while (deserializeRecordPass3(dst,itrn,0)) 1;
		if (itrn) 
		{
			dst -> internable = 1;
			dst = internOb(dst);
			snodeValues[idx] = dst;
		}
		return dst;
	}
	if (sk == nkind_string)
		UM_ERROR("Expected string to be allocated already");
    return dst;
	UM_ERROR("Unknown kind");
}




void  deserializePass3()
{
  int i;
  for (i = 0;i<numSnodes;i++)  deserializeNodePass3(i);
}

string keyName(ob ky)
{
	int k,vk;ob v;
	k = ky->obkind;
	if ((k==nstring_kind)||(k==wstring_kind)) return k;
	else
	if (k == hashtable_kind)
		return ob_name(ky);
	else
	if (k == smallob_kind)
	{
		if ((ky->quickType) == qtRegarding)
		{
			v = regardingValue(ky);
			vk = v->obkind;
			if ((vk==nstring_kind)||(vk==wstring_kind)) return v;
		}
	}
	return "unnamed";
}

	



ob deserializeResolveBinding(int idx)
{
	char* cp;int sk,pri,kyi;ob pr,ky,rs;string mk;ObBinding rso;
	rs = snodeValues[idx];
	if (rs) return rs;
	sbufferP = snodeOffsets[idx];
	cp = sbuffer + sbufferP;
	sk = snodeKind(cp);
	if (sk == nkind_Binding)
	{
		pri = sBindingParent(cp);
		kyi = sBindingKey(cp);
		pr = snodeValues[pri];
		ky = snodeValues[kyi];
		rs = selectBinding(pr,ky);
		rso = (ObBinding)rs;
		if (!rs) 
		{
			mk = keyName(ky);
			printf("UNRESOLVED BINDING:");
			string_print(mk);
			printf("\n\n");
		}
//		if (!rs) UM_ERROR("Failure to resolve binding");
		snodeValues[idx] = rs;
		return rs;
	}
	return nul;
}

ObBinding badB; // for debugging,obviously
void deserializeNodePass4(int idx)
{
	char* cp;int sk,ln,itrn,lnp,nmi,vi,i,nmo,*cpi,*dsti;
	ob dst;Dblock db;
    if (deserializeVerbose) printf("pass4 %d\n",idx);
	sbufferP = snodeOffsets[idx];
	cp = sbuffer + sbufferP;
	sk = snodeKind(cp);
	if (sk == nkind_Resource)
	{
		dst = snodeValues[idx];
		if (!dst) UM_ERROR("Missing dst");
		sbufferP = sbufferP + 4;
		while (deserializeRecordPass3(dst,0,1)) 1;
		return;
	}
	if (sk == nkind_Binding) 
	{
		deserializeResolveBinding(idx);
		if (idx == 84) badB = (ObBinding)snodeValues[idx];
		return;
	}
	

	if (sk == nkind_Dblock) return;

	if (sk == nkind_string) return;

	printf("Unknown kind\n");
}






void  deserializePass4()
{
  int i;
  for (i = 0;i<numSnodes;i++)  deserializeNodePass4(i);
}



void fixDblockFunctionField(Smallob fn)
{
	ob imp;Dblock db;
	imp = functionImplementation(fn);
	if (imp)
	{
		db = pcodeDblock(imp);
		if (!db) 
		{
			string_print(functionName(fn));
			UM_ERROR(" NUL DBLOCK");
		}
		else
			db -> function_of = fn;
	}
}

// fix the dblocks, and also fill the subjects sequence, if any
//  Rule: subjects are of kind hashtable_kind or compact_kind,
// or sequences other than strings (byte sequences)

void deserializeNodePass5(Seqob subjects,int idx)
{
	char* cp;int sk,ats,ln,itrn,lnp,nmi,nmd,vi,i,vlk,dtk,nmo,*cpi,*dsti;ob dst;
	    Arraygeneric dt;Dblock db;ob vl;ObBinding rso;
    if (deserializeVerbose) printf("pass5 %d\n",idx);

	dst = snodeValues[idx];
	if (!dst) UM_ERROR("Missing dst");
	sbufferP = snodeOffsets[idx];
	cp = sbuffer + sbufferP;
	sk = snodeKind(cp);
	if (sk == nkind_Dblock)
	{
		cp = sbuffer + sbufferP;
		nmo = sDblockNumobs(cp);
		nmi = sDblockNumints(cp);
		nmd = sDblockNumdoubles(cp);
		sbufferP = sbufferP + sizeof(S_DBLOCK_struct);
		cpi =  (int*)(sbuffer + sbufferP);
		for (i = 0;i<nmo;i++)
		{
			vi  = *(cpi + i);
			if (vi == -1) vl = nul; else vl = snodeValues[vi];
			Dblock_set_ob(dst,i,vl);
		}
		sbufferP = sbufferP + 4*nmo;
		dsti = ((int*)dst + Dblock_preamble_wsize+nmo);
		memcpy(dsti,sbuffer + sbufferP,nmi * 4 + nmd * 8);
	    return;
	}
	else
	if ((sk == nkind_Resource )&& ((dst -> quickType) == qtFunction)) fixDblockFunctionField(dst);	
	if (subjects && (sk == nkind_Resource))
	{
		ats = 0;
		//exclude strings
		vl = snodeValues[idx];
		vlk = vl -> obkind;
		if (vlk != seq_kind) ats = 1;
		else
		{
			dt = ((Seq)vl)->data;
			if ((dtk != arraybyte_kind)&&(dtk != arrayshort_kind))
				ats = 1;
		}
		if (ats) Seqob_add(subjects,vl);
	}
}

void  deserializePass5(Seqob subjects)
{
  int i;
  for (i = 0;i<numSnodes;i++)  deserializeNodePass5(subjects,i);
}

//2 = 2 arg variant
ob deserializeFromBuffer2(Seqob subjects,int pg)
{
	int alsv;
	alsv = allocating_statically;
    allocating_statically = 1;
	serializeSync();
	deserializeRecordCount = 0;
	deserializePass1();

		typeP_index = 1;
		typeT_index = 2;
		regardingT_index = 3;
		functionT_index = 4;
		pcodeT_index = 5;
		restrictionT_index = 6;
		bitFieldT_index = 7;

	deserializeUriTree(); //build the uri tree
	deserializePass3(); // allocate and intern
	deserializePass4(); // fill in remaining values, reslove bindings
	deserializePass5(subjects); // fill in binding values in dblocks, fill in subjects
	// see serialize.v*.fbl ; entry 8 is the value of the serialization
	allocating_statically = alsv;
	return snodeValues[8];
}

ob deserializeFromBuffer(int pg)
{
  return deserializeFromBuffer2(nul,pg);
}

void fixFimp()
{
	ob fmp,string_fimp_,regarding_fimp_,regarding_root_;ObBinding sb;
	fmp = selectCharpPath(rootResource,fimpPath,5);
	string_fimp_ = charp_intern_string("fimp");
	regarding_fimp_ = regarding1(string_fimp_);
	regarding_root_ = regarding1(charp_intern_string("root"));
	sb = (ObBinding)selectBinding(fmp,regarding_fimp_);
	if (sb)
	{
	sb -> value = fmp;
	sb -> valueType = obT;
	}
	sb = (ObBinding)selectBinding(fmp,regarding_root_);
	if (sb)
	{
	sb -> value = rootResource;
	sb -> valueType = obT;
	}
	sb = (ObBinding)selectBinding(fablns,regarding1(charp_intern_string("home")));
	if (sb)
	{
	sb -> value = fmp;
	sb -> valueType = obT;
	}
}


ob deserializeFromStringBuf2(Seqob subjects,StringBuf bf,int pg)
{

   S_Header hdr;
   if (bf != serializeBuffer) 
	   Seqbyte_copyto(sbuffer,sbufferMaxSize,bf);
   hdr = (S_Header)sbuffer;
   sbufferSize = hdr->length;
   numSnodes = hdr->nodeCount;
   return deserializeFromBuffer2(subjects,pg);
}

ob deserializeFromStringBuf(StringBuf bf,int pg)
{
   return deserializeFromStringBuf2(nul,bf,pg);
}

   

ob deserializeFromFile(StringBuf fln,int pg)
{

   FILE *file;int sig,v;char* fbf;S_Header hdr;ob rs;
   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   fbf = Seqbyte_print_buf;
   Seqbyte_copyto(fbf,Seqbyte_print_buf_length,fln);
   deserializeUriNodeCount = 0;
   if( (file = fopen( fbf, "rb" )) == NULL ) return nul;
   {
	  fread(sbuffer,4*sizeof(int),1,file);
	  hdr = (S_Header)sbuffer;
	  sbufferSize = hdr->length;
	  numSnodes = hdr->nodeCount;
      fread(sbuffer+4*sizeof(int),sbufferSize-4*sizeof(int),1,file);
	  fclose(file);
	  rs = deserializeFromBuffer(pg);
	  if (pg == 1) fixFimp();
	  return rs;
   }
}








