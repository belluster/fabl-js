/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review


#define BIT(nm) unsigned nm : 1;


#define aword int
#define aword_size 4

// quickType has these values 
#define qtNone 0
#define qtType 1
#define qtRegarding 2
#define qtFunction 3

#define TAG_BITS() \
 unsigned storage:2; \
 unsigned obkind:5;  \
 unsigned tenured:1; \
 unsigned generation:3; \
 unsigned forwarded:1; \
 unsigned internable:1; \
 unsigned tempbit0:1; \
 unsigned monitored:1; \
 unsigned tempbit:1; \
 unsigned touched:1; \
 unsigned hasDoubles:1; \
 unsigned hasUri:1; \
 unsigned hasParent:1; \
 unsigned quickType:2; \
 unsigned interned:1; \
 unsigned immutable:1; \
 unsigned persistent:1; \
unsigned unused:7;

#define FOURBYTES() \
 unsigned byte0:8; \
 unsigned byte1:8; \
 unsigned byte2:8; \
 unsigned byte3:8;


/*__C__*
Kinds of objects for persistence:
externalKind referenced from the persistent world, but not to be saved (must be interned)
dPersistent explicitly declared persistent
rPersistent persistent by reference
transient

Once in persistence mode, new objects are created transient unless explicitly persistent.
When a transient object is assigned as the value of a property (or array entry) of a persistent
object, it becomes rPersistent.
The page + 1000 is the persistence index of persistent objects.
The persistArray maps persistence indices to persistent objects.
Op logs name objects by persistence index. 

  */

#define externalKind 0
#define transientKind 1
#define dPersistent 2
#define rPersistent 3




#define bindingObKind 0
#define bindingIntKind 1
#define bindingDoubleKind 2
#define bindingUriKind 3
#define bindingMultiKind 4
#define bindingUndefinedKind 5




//BINDINGTAG bits are mostly identical to TAG_BITS
#define BINDINGTAG_BITS() \
 unsigned storage:2; \
 unsigned obkind:5;  \
 unsigned tenured:1; \
 unsigned generation:3; \
 unsigned forwarded:1; \
 unsigned compact:1; \
 unsigned podForward:1; \
 unsigned monitored:1; \
 unsigned tempbit:1; \
 unsigned touched:1; \
 unsigned hasDoubles:1; \
unsigned bindingKind:3; \
 unsigned inDblock:1; \
  unsigned tempbit2:1; \
 unsigned isConstant:1; \
 unsigned cardinality_constraint:2; \
unsigned unused5:6;





//#define compactTag 4164



// pad_kind only appears in heap padding words (for double word alignment)
#define pad_kind 0
//boxed int
#define int_kind 1
//boxed double
#define double_kind  2
#define nstring_kind 3
#define wstring_kind 4
#define dblock_kind 5
// nul_kind is the kind of nul; no ob has this kind; it is returned as the ob_kind of nil
#define nul_kind 6
//void kind is not the kind of any ob, but  appears in the i_obkind field of the void type
#define void_kind 7




#define arrayob_kind 8
#define arraybyte_kind 9
#define arrayshort_kind 10
#define arrayint_kind 11
#define arraydouble_kind 12


// xsd types that are represented by an int (other than int itself, and for now, boolean)
#define xsd_intRep_kind 13
#define hetarray_kind 14




#define hashtable_kind 16
#define compact_kind 17
#define binding_kind 18
#define smallob_kind 19
#define pm_stack_kind 23
#define seq_kind 24
#define values_kind 25


typedef  struct {
  FOURBYTES()
} *fourBytes;



// For int_kind double_kind nstring_kind wstring_kind, the compactObNumFields
// byte in the tag is used to store the variety of xsd literal represented by the datum
#define xsdKind(x) (((fourBytes)x)->byte3)
#define set_xsdKind(x,v) (((fourBytes)x)->byte3 = v)


#define xsd_date_kind 1
#define xsd_hexBinary_kind 2


#define storage_ob 0
#define storage_int 1
#define storage_double 2
#define storage_boxeddouble 3


typedef  struct {
  int tag;
} *tagOnly;

typedef  struct {
  TAG_BITS()
} obStruct,*ob;

#define nul ((ob)0)


typedef  struct {
  TAG_BITS()
  int length;
  } string_struct,*string;

// the ob_kind of a string might be either nstring or wstring
// meaning narrow (8bit) characters, or wide (16bit) characters



typedef  struct {
  TAG_BITS()
  int value;
  } boxedint_struct,*boxedint;



typedef  struct {
  TAG_BITS()
  int pad;
  double value;
  } boxeddouble_struct,*boxeddouble;



#define OBJECT_PREAMBLE() \
  TAG_BITS() \
  int hashkey; \
  int pagenumber; \
  ob parent; \
  ob types;

/*
#define TINY_PREAMBLE() \
	OBJECT_PREAMBLE() \
	ob pages; \
	ob extension; \
	ob properties; \
    unsigned ann0:8; \
    unsigned ann1:8; \
    unsigned ann2:8; \
    unsigned ann3:8;
*/

#define object_preamble_wsize 5

/*

#define Compactob_annotation_woffset 8
#define Compactob_annotation_offset 32

#define COMPACT_PREAMBLE() \
	OBJECT_PREAMBLE() \
	ob pages; \
	ob extension; \
	ob properties;
*/


#define ARRAY_PREAMBLE() \
  TAG_BITS() \
  int capacity; \
  int length;


#define Array_preamble_wsize 3
#define Array_preamble_size 12


// a pad word is included in double arrays
#define Arraydouble_preamble_dwsize 2
#define Arraydouble_preamble_wsize 4
#define Arraydouble_preamble_size 16


#define annOb ((char)0)
#define annInt ((char)1)
#define annDouble ((char)2)
#define annNone ((char)3)






typedef struct  {
  OBJECT_PREAMBLE()
  } ObjectStruct,*Object;



#define ANN_BITS() \
 unsigned storage:2; \
unsigned value_kind:2; \
unsigned cardinality_constraint:2; \
unsigned annunused:2


#define value_kind_functional 0



// value_kind_secondword: used in hetarray for a double represented in boxed form
#define value_kind_onevalue 0
#define value_kind_multivalued 1
#define value_kind_undefined 2
#define value_kind_secondword 3

// in class definitions, or cardinality_constraint of binding,
// these indicate maxcardinality = 1,no constraint, and cardinality = 1,respectively
#define cardinality_functional 0
#define cardinality_unconstrained 1
#define cardinality_one 2

#define annob_undefined 8
#define annint_undefined 9
#define annob_functional 0

#define annob_onevalue 0
#define annint_functional 1

#define annint_onevalue 1
#define annob_undefined_unconstrained 24

typedef struct {
	ANN_BITS();
}
Annotation_struct,*Annotation;

/*
typedef struct  {
  TINY_PREAMBLE()
  } CompactobStruct,*Compactob;
*/



    









typedef struct {
  ARRAY_PREAMBLE()
  } Arraygeneric_struct,*Arraygeneric;


typedef struct {
  ARRAY_PREAMBLE()
  } Arrayob_struct,*Arrayob;


typedef struct {
  ARRAY_PREAMBLE()
  } Arraybyte_struct,*Arraybyte;


typedef struct {
  ARRAY_PREAMBLE()
  } Arrayshort_struct,*Arrayshort;


typedef struct {
  ARRAY_PREAMBLE()
  } Arrayint_struct,*Arrayint;

typedef struct {
  ARRAY_PREAMBLE()
  } Hetarray_struct,*Hetarray;


typedef struct {
  ARRAY_PREAMBLE()
  int pad;  // so that the doubles are double-word aligned if the array is
  } Arraydouble_struct,*Arraydouble;

typedef struct {
  OBJECT_PREAMBLE()
  ob extension;
  Arraygeneric data;
  } Seq_struct,*Seq;

#define Seq_wsize 7

// stringbuffer contains either bytes or short (unicode)
typedef struct {
  OBJECT_PREAMBLE()
  Arraygeneric data;
  } StringBuf_struct,*StringBuf;



typedef struct {
  OBJECT_PREAMBLE()
  ob extension;
  Arrayob data;
  Arrayint pages;
  } Values_struct,*Values;



typedef struct {
  OBJECT_PREAMBLE()
  ob extension;
  Arrayob data;
  } Seqob_struct,*Seqob;


typedef struct {
  OBJECT_PREAMBLE()
  ob extension;
  Arraybyte data;
  } Seqbyte_struct,*Seqbyte;


typedef struct {
  OBJECT_PREAMBLE()
  ob extension;
  Arrayshort data;
  } Seqshort_struct,*Seqshort;



typedef struct {
  OBJECT_PREAMBLE()
  ob extension;
  Arrayint data;
  } Seqint_struct,*Seqint;




typedef struct {
  OBJECT_PREAMBLE()
  ob extension;
  Arraydouble data;
  } Seqdouble_struct,*Seqdouble;





typedef struct {
  OBJECT_PREAMBLE()
  Seqint harray;//a seqint
  Seqob goods;// a seqob
  ob sequencepart;
  int num_values;
  int size;
  unsigned hashkeyed_elements:1; // some elements have hashkeys 
  unsigned needs_rehash:1; 
  unsigned hashtable_variety:2; //0 = hashseq 1 = stringset 2 = bindingtable
  unsigned isExtension:1; //is this the extension of a compactob?[Obsolete]
  unsigned hashtableunused:3;
  unsigned reserved_for_bits:24; 
}  Hashtable_struct,*Hashtable,*Type;

typedef struct {
  BINDINGTAG_BITS() 
  int pagenumber; 
  ob parent;
  ob extension;
  ob key;
  ob valueType;
}Binding_struct,*Binding;



typedef struct {
  BINDINGTAG_BITS() 
  int pagenumber; 
  ob parent;
  ob extension;
  ob key;
  ob valueType;
  ob value;
  int intValue; // not used
}ObBinding_struct,*ObBinding;

typedef struct {
  BINDINGTAG_BITS() 
  int pagenumber; 
  ob parent;
  ob extension;
  ob key;
  ob valueType;
  ob obValue; //not used
  int value;
}IntBinding_struct,*IntBinding;


typedef struct {
  BINDINGTAG_BITS() 
  int pagenumber; 
  ob parent;
  ob extension;
  ob key;
  ob valueType;
  double value;
}DoubleBinding_struct,*DoubleBinding;









typedef struct {
 unsigned in_stack:1;
 unsigned unused0:1;
 unsigned obkind:5; 
 unsigned tenured:1;
 unsigned generation:3;
 unsigned forwarded:1;
 unsigned unused1:4;
 unsigned numobs:16;
 int hashkey;
 short numints;
 short numdoubles;
 ob function_of;
}
Dblock_struct,*Dblock;

#define Dblock_preamble_wsize 4




// used in garbage collection
typedef struct {
  TAG_BITS()
  ob value;
} Forward_struct,*Forward;



// used for rrefs (regular heap reference lists)

typedef struct {
	int capacity;
	int length;
} Sarray_struct,*Sarray;  // sized array

#define Sarray_preamble_wsize 2
#define Sarray_contents(x) ((aword*)(((int*)x) + Sarray_preamble_wsize))


ob Hashtable_getOb();

#define typeConstructor(x) Hashtable_getOb(x,constructorP)
#define setTypeConstructor(x,y) Hashtable_setOb(x,constructorP,y)

// return type of function type, subtype of seq, bag, etc
#define typeParam(x) Hashtable_getOb(x,paramP)
#define setTypeParam(x,y) Hashtable_setOb(x,paramP,y)

// input types to function type
#define typeParams(x) Hashtable_getOb(x,paramsP)
#define setTypeParams(x,y) Hashtable_setOb(x,paramsP,y)

 // each instance properties field points at this
#define typeTypeProperties(x) Hashtable_getOb(x,typePropertiesP)
#define setTypeTypeProperties(x,y) Hashtable_setOb(x,typePropertiesP,y)

#define typeSubClassOf(x) Hashtable_getOb(x,subClassOfP)
#define setTypeSubClassOf(x,y) Hashtable_setOb(x,subClassOfP,y)

// binds regarding(P) to the Restriction mentioning P
#define typeRestrictions(x) Hashtable_getOb(x,restrictionsP)
#define setTypeRestrictions(x,y) Hashtable_setOb(x,restrictionsP,y)


#define typePrototype(x) Hashtable_getOb(x,prototypeP)
#define setTypePrototype(x,y) Hashtable_setOb(x,prototypeP,y)
// if more boolean fields are defined, this will need modification
#define typeInstanceStorage(x) Hashtable_selectInt(x,typeBoolesP)


typedef struct {
	ARRAY_PREAMBLE()
    unsigned ann0:8;
    unsigned ann1:8;
    unsigned ann2:8;
    unsigned ann3:8;
	ob value;
	ob aspect;
} RegardingHetarray_struct,*RegardingHetarray;  

#define regardingValue(x) ((RegardingHetarray)(((Smallob)x)->values))->value
#define setRegardingValue(x,v) set_ob(((RegardingHetarray)(((Smallob)x)->values))->value,v)

#define regardingAspect(x) ((RegardingHetarray)(((Smallob)x)->values))->aspect
#define setRegardingAspect(x,v) set_ob(((RegardingHetarray)(((Smallob)x)->values))->aspect,v)




typedef struct {
	ARRAY_PREAMBLE()
    unsigned ann0:8;
    unsigned ann1:8;
    unsigned ann2:8;
    unsigned ann3:8;
	ob first;
	ob rest;
} ListHetarray_struct,*ListHetarray;  
/*
typedef struct {
	TINY_PREAMBLE()
	ob first;
	ob rest;
} List_struct,*List;  
*/


#define listFirst(x) ((ListHetarray)(((Smallob)x)->values))->first
#define listRest(x) ((ListHetarray)(((Smallob)x)->values))->rest



/*
typedef struct {
 TINY_PREAMBLE()
 unsigned ann4:8; \
 unsigned ann5:8; \
 unsigned ann6:8; \
 unsigned ann7:8;
 string name;
 ob definedIn;
 Type funType;
 ob implementation;
 void* cimp;  // a c function pointer 
 unsigned numobs:4;
 unsigned numints:4;
 unsigned numdoubles:4; 
 unsigned unused2:4;
}
Function_struct,*Function;
*/


typedef struct {
 unsigned numobs:4;
 unsigned numints:4;
 unsigned numdoubles:4; 
 unsigned unused2:20;
}
FunctionSignature_struct;



typedef struct {
 ARRAY_PREAMBLE()
 unsigned ann0:8;
 unsigned ann1:8;
 unsigned ann2:8;
 unsigned ann3:8;
 unsigned ann4:8;
 unsigned ann5:8;
 unsigned ann6:8;
 unsigned ann7:8;
 string name;
 ob definedIn;
 Type funType;
 ob implementation;
 void* cimp;  // a c function pointer 
 unsigned numobs:4;
 unsigned numints:4;
 unsigned numdoubles:4; 
 unsigned unused2:20;
}
FunctionHetarray_struct,*FunctionHetarray;


#define functionName(x) smallob_fastSelectNthOb((Smallob)x,0)
#define functionDefinedIn(x) smallob_fastSelectNthOb((Smallob)x,1)
#define functionFunType(x) smallob_fastSelectNthOb((Smallob)x,2)
#define functionImplementation(x) smallob_fastSelectNthOb((Smallob)x,3)
#define functionCimp(x)  smallob_fastSelectNthInt((Smallob)x,4)
#define functionNumobs(x) (smallob_fastSelectNthInt((Smallob)x,5) & 15)
#define functionNumints(x) ((smallob_fastSelectNthInt((Smallob)x,5)>>4) & 15)
#define functionNumdoubles(x) ((smallob_fastSelectNthInt((Smallob)x,5)>>8) & 15)


#define setFunctionImplementation(x,v) smallob_fastSetNthOb((Smallob)x,3,v)
#define setFunctionCimp(x,v) smallob_fastSetNthInt((Smallob)x,4,v)

#define FunctionSignatureIndex 5

//#define setFunctionNumobs(x,v) smallob_fastSetNthInt(x,5,(smallob_fastSelectNthInt((Smallob)x,5) & (~15)) | v)
//#define setFunctionNumints(x,v) smallob_fastSetNthInt(x,5,(smallob_fastSelectNthInt((Smallob)x,5) & (~240)) | (v<<4))
//#define setFunctionNumdoubles(x,v) smallob_fastSetNthInt(x,5,(smallob_fastSelectNthInt((Smallob)x,5) & (~3840)) | (v<<8))



typedef struct {
 ARRAY_PREAMBLE()
 unsigned ann0:8;
 unsigned ann1:8;
 unsigned ann2:8;
 unsigned ann3:8;
 ob ofProperty;
 int lowBit;
 int highBit;
}
BitFieldHetarray_struct,*BitFieldHetarray;
/*
typedef struct {
	TINY_PREAMBLE()
	ob ofProperty;
	int lowBit;
	int highBit;
} BitField_struct,*BitField;  
*/


typedef struct {
    ARRAY_PREAMBLE()
    unsigned onPropertyAnn:8;
    unsigned allValuesFromAnn:8;
    unsigned hasValueAnn:8;
    unsigned cardinalityAnn:8;
    unsigned maxCardinalityAnn:8;
	unsigned restrictionUnused:24;
	ob onProperty;
	Type allValuesFrom;
	ob hasValue;
	int cardinality;
	int maxCardinality; 
}
RestrictionHetarray_struct,*RestrictionHetarray;


#define restrictionOnProperty(x) ((RestrictionHetarray)(((Smallob)x)->values))->onProperty
#define restrictionAllValuesFrom(x) ((RestrictionHetarray)(((Smallob)x)->values))->allValuesFrom
#define restrictionHasValue(x) ((RestrictionHetarray)(((Smallob)x)->values))->hasValue
#define restrictionCardinality(x) ((RestrictionHetarray)(((Smallob)x)->values))->cardinality
#define restrictionMaxCardinality(x) ((RestrictionHetarray)(((Smallob)x)->values))->maxCardinality

#define restrictionCardinality(x) ((RestrictionHetarray)(((Smallob)x)->values))->cardinality
/*
typedef struct {
	COMPACT_PREAMBLE()
    unsigned onPropertyAnn:8;
    unsigned allValuesFromAnn:8;
    unsigned hasValueAnn:8;
    unsigned cardinalityAnn:8;
    unsigned maxCardinalityAnn:8;
	unsigned restrictionUnused:24;
	ob onProperty;
	Type allValuesFrom;
	ob hasValue;
	int cardinality;
	int maxCardinality;
} Restriction_struct,*Restriction;  
*/


typedef struct {
  OBJECT_PREAMBLE()
  Hetarray values;
  Seqob properties;
  ob sequencepart;// not used 
  int num_values;//not used
  int size;//not used
  unsigned sharedProperties:1;
  int smallobUnused:31;
}  Smallob_struct,*Smallob;

