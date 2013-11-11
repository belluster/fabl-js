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

#define HASH_SEQ 0
#define STRING_SET 1
#define BINDING_TABLE 2

ob* toSerialize;
int toSerializeCount;

int preambleObCount;
Sarray serializedBindings;


void addObToSerialize(ob x)
{
	toSerialize[toSerializeCount++] = x;
	if (toSerializeCount == maxSnodes) UM_ERROR("Filled up toSerialize array");
}	

int amongFirstN(ob* s,int n,ob v)
{
  int i;
  for (i = 0;i<n;i++) 
     {
	 if (v ==s[i]) return 1;
	 }
  return 0;
}

void setPreambleObCount()
{
	preambleObCount = toSerializeCount;
}


void resetToSerialize()
{
	toSerializeCount = 0;
	serializedBindings -> length = 0;

}
void serializeCollect0();
// page of -2 means persistent

void  serializeCollect0(ob x,int pg)
{
  int k,bk,ln,dk,i,xp,nmo;Seqob bns;Binding cb;Type btp;ob cv,ext,tp,bky,pr;
  int onpage;Seqob prps,sq;Dblock db;ob dbv;int itrn,isprototypefield,istp, sdp;Object xo;
  Hashtable ht;Arrayob bndt,prpsd,sqd;ob *bndc,*prpsc,*sqdc;Smallob sm;Binding xb;
  if (!x) return;
  if (x->tempbit) return;
  k = x->obkind;
  if (k == hashtable_kind)
     {
	  xo = (Object)x;
	  ht = (Hashtable)x;
	 if ((ht->hashtable_variety) == HASH_SEQ) return;
	 xp = xo->pagenumber;
	 onpage = (xp == pg) || (xp < 0); // < 0 means multipage object
     x->tempbit = 1;
	 // if one of the first three, recurse, but don't add
	 if (!amongFirstN(toSerialize,preambleObCount,x))
 	 addObToSerialize(x);
	 itrn = x->interned;
     pr = ob_parent(x);
	 if (pr) 
	    {
		serializeCollect0(pr,pg);
		serializeCollect0(ob_name(x),pg); // this key won't be collected if parent is on a different page
		}
	 tp = ob_iType(x);
	 if (tp) serializeCollect0(tp,pg);
	 if ((!onpage) && (!itrn)) return;
	 bns = ht->goods;//bindings(x);
	 bndt = bns->data;
	 ln = bndt ->length;
	 bndc = Arrayob_contents(bndt);
	 // need to serialize the keys of uri bindings in the uri tree 
	 for (i=0;i<ln;i++)
	     {
		 cb = bndc[i];

		 if (itrn || (ob_page(cb) == pg))
		    {
			serializedBindings = Sarray_add(serializedBindings,cb);
		    bky = cb->key;
		    bk = cb->bindingKind;
		    btp = cb -> valueType;
		    serializeCollect0(btp,pg);
		    serializeCollect0(bky,pg);
		    if (!((bk == bindingIntKind)||(bk == bindingDoubleKind))) 
		       serializeCollect0(((ObBinding)cb)->value,pg);
			}
		 }
	 return;
	 } 

  if (k == smallob_kind)
     {
	  xo = (Object)x;
	  sm = (Smallob)x;
	 xp = xo->pagenumber;
	 itrn = x->interned;
	 onpage = xp == pg;
     x->tempbit = 1;
	 // for now assume all fields of an internable fellow are key properties
	 if (!amongFirstN(toSerialize,preambleObCount,x)) 
		 addObToSerialize(x);
     pr = ob_parent(x);
	 if (pr) 
	    {
		serializeCollect0(pr,pg);
		serializeCollect0(ob_name(x),pg); // this key won't be collected if parent is on a different page
		}
	 tp = ob_iType(x);
	 istp = tp == TypeT;
	 if (tp) 
		serializeCollect0(tp,pg);
	 if ((!onpage) && (!itrn)) return; // write out kep properties of interned fellow
	 ln = compactobNumFields(x);
    // PROTOTYPES (FIELD 6) are not serialized for types (built on demand at other end
	// This avoids a circularity- in the form of an 
	// attempt to deserializae the prototype before the type
	// is ready)
	 for (i=0;i<ln;i++)
	     {
		 cv = smallobSelectNthOb(x,i);
		 isprototypefield = istp && (i==6);
		 if (cv && (!isprototypefield)) 
			serializeCollect0(cv,pg);
		 }
	 prps = sm->properties;
	 if (prps) UM_ERROR("MISSING PROPERTIES");
	 prpsd = prps->data;
	 ln = prpsd->length;
	 prpsc = Arrayob_contents(prpsd);
	 for (i = 0;i< ln;i++) serializeCollect0(prpsc[i],pg);
//	 ext = compactobExtension(x);
//	 if (nnul(ext)) serializeCollect0(ext,pg);
	 return;
	 }





	if (k == nstring_kind)
    {
	 x->tempbit = 1;
	 if (!amongFirstN(toSerialize,preambleObCount,x)) 
		 addObToSerialize(x);
	 return;
	}
	if ((k == seq_kind)||(k == values_kind))
	{
	 
	 itrn = x->interned;
	  xo = (Object)x;
	 sq = (Seq)x;
	 xp = xo->pagenumber;
	 onpage = (xp == pg) || (xp < 0); // < 0 means multipage object
     x->tempbit = 1;
	 // if in the preamble, recurse, but don't add
	 if (!amongFirstN(toSerialize,preambleObCount,x))
		 addObToSerialize(x);
     pr = ob_parent(x);
	 if (pr) serializeCollect0(pr,pg);
	 tp = ob_iType(x);
//	 if (eq(tp,Restriction)) writeln("Restriction at ",length(toSerialize));
	 if (tp) serializeCollect0(tp,pg);
	 if ((k == seq_kind) && (!onpage)  && (!itrn)) return;
	 sqd = sq->data;
	 dk = sqd->obkind;
	 if (dk == arrayob_kind)
	   {
	   ln = sqd->length;
	   sqdc = Arrayob_contents(sqd);
	   for (i = 0;i<ln;i++) 
		   serializeCollect0(sqdc[i],pg);
	   }
	 return;

	 }
	if (k == dblock_kind)
	{
	   addObToSerialize(x);
	   x -> tempbit = 1;
	   db = (Dblock)x;
	   nmo = db->numobs;
	   for (i = 0;i<nmo;i++)
	       {
		   dbv = Dblock_select_ob(db,i);
		   if (dbv) 
			  serializeCollect0(dbv,pg);
		   }
//	 set_length(serializeStack,sdp);
	 return;
	}
// bindings, for serialization, are references to triples, not the triples themselves
// only the parent and key are serialized
	if (k == binding_kind)
	{
	   x -> tempbit = 1;
	   xb = (Binding)x;
	   x -> tempbit = 1;
	   serializeCollect0(xb->parent,pg);
	   serializeCollect0(xb->key,pg);
	   return;
	}

    UM_ERROR("Not yet serializing this kind");

}


void  setSerializedBindingBits()
{
	int ln,i;ob* cn;Binding cb;
	ln = serializedBindings->length;
	cn = Sarray_contents(serializedBindings);
	for (i=0;i<ln;i++)
	{
		cb = (Binding)cn[i];
		cb -> tempbit2 = 1;
	}
}




void  restoreTempBits()
{
   int i,ln;ob cs;Binding cb;ob* cn;
 //  writeln('restoring temp bits');
   for (i=0;i<toSerializeCount;i++) 
       {
	   cs = toSerialize[i];
	   cs -> tempbit = 0;
	   }   
   ln = serializedBindings->length;
   cn = Sarray_contents(serializedBindings);
   for (i=0;i<ln;i++) 
       {
	   cb = (Binding)cn[i];
	   cb -> tempbit2 = 0;
	   }   
}
