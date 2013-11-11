/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review



extern ob* toSerialize;
extern int toSerializeCount;
extern int maxSnodes;
extern Sarray serializedBindings;

/* form of Snode (serializatoin node)
NodeD
records

where the kinds of records are
R_PO
R_PI
R_PD
R_POT
R_PIT
R_PDT
R_SEQ

*/
//Ed = element description

//a triple is "resolved" in deserialization if it has been reflected in the triple store
#define SNODE_BITS() \
unsigned isSnode:1; \
unsigned kind:4; \
unsigned interned:1; \
unsigned unused:26;

typedef struct {
SNODE_BITS()
}
Snode_struct,*Snode;

#define isSnode(x) (((Snode)x)->isSnode)
#define set_isSnode(x,v) ((Snode)x)->isSnode = v

#define  snodeInterned(x) (((Snode)x)->interned)
#define  set_snodeInterned(x,v) ((Snode)x)->interned = v

#define snodeKind(x) (((Snode)x)->kind)
#define set_snodeKind(x,v) ((Snode)x) -> kind = v

// so = subject ommitted; use same subject as last

#define nkind_string 0
#define nkind_wstring 1
#define nkind_StringBuf 2
#define nkind_Resource 3
#define nkind_Dblock 4
#define nkind_Binding 5
#define nkind_HashSeq 6

typedef struct {
	SNODE_BITS()
	int length;
}
S_string_struct,*S_string;

// the contents of the dblock are serialized sequentially after the header
typedef struct {
SNODE_BITS()
int numobs;
int numints;
int numdoubles;
} S_DBLOCK_struct,*S_DBLOCK;

#define sDblockNumobs(x) (((S_DBLOCK)x)->numobs)
#define set_sDblockNumobs(x,v) ((S_DBLOCK)x)->numobs = v
#define sDblockNumints(x) (((S_DBLOCK)x)->numints)
#define set_sDblockNumints(x,v) ((S_DBLOCK)x)->numints = v
#define sDblockNumdoubles(x) (((S_DBLOCK)x)->numdoubles)
#define set_sDblockNumdoubles(x,v) ((S_DBLOCK)x)->numdoubles = v




typedef struct {
SNODE_BITS()
int parent;
int key;
} S_BINDING_struct,*S_BINDING;


#define sBindingParent(x) (((S_BINDING)x)->parent)
#define set_sBindingParent(x,v) ((S_BINDING)x)->parent = v
#define sBindingKey(x) (((S_BINDING)x)->key)
#define set_sBindingKey(x,v) ((S_BINDING)x)->key = v

// preswizzle 
typedef struct {
SNODE_BITS()
ob parent;
ob key;
} P_BINDING_struct,*P_BINDING;


#define pBindingParent(x) (((P_BINDING)x)->parent)
#define set_pBindingParent(x,v) ((P_BINDING)x)->parent = v
#define pBindingKey(x) (((P_BINDING)x)->key)
#define set_pBindingKey(x,v) ((P_BINDING)x)->key = v


// rtag = record tag

#define RTAG_BITS() \
unsigned isSnode:1; \
unsigned kind:4; \
unsigned multiValued:1; \
unsigned resolved:1;\
unsigned keyProperty:1; \
unsigned isConstant:1;\
unsigned xsdRKind:7;\
unsigned unused:16;

#define rkind_PO 0
#define rkind_URI 1
#define rkind_PI 2
#define rkind_PD 3
#define rkind_POT 4
#define rkind_PIT 5
#define rkind_PDT 6
#define rkind_SEQ_OB 7
#define rkind_SEQ_BYTE 8
#define rkind_SEQ_SHORT 9
#define rkind_SEQ_INT 10
#define rkind_SEQ_DOUBLE 11


//note: code in serialize depends on the above order of sequence rkinds

// any kind of record with a property
typedef struct {
RTAG_BITS()
int property;
} R_X_struct,*R_X;


#define rKind(x) (((R_X)x)->kind)
#define set_rKind(x,v) ((R_X)x)->kind  = v

#define rXsdKind(x) (((R_X)x)->xsdRKind)
#define set_rXsdKind(x,v) ((R_X)x)->xsdRKind  = v

#define rIsConstant(x)  ((R_X)x)->isConstant
#define set_rIsConstant(x,y) ((R_X)x)->isConstant = y

#define rProperty(x) (((R_X)x)->property)
#define set_rProperty(x,y) ((R_X)x)->property = y

typedef struct {
RTAG_BITS()
int property;
int value;
} R_PO_struct,*R_PO;


#define rPOvalue(x) (((R_PO)x)->value)
#define set_rPOvalue(x,v) ((R_PO)x)->value = v

typedef struct {
RTAG_BITS()
int property;
int value;
} R_PI_struct,*R_PI;


#define rPIvalue(x) (((R_PI)x)->value)
#define set_rPIvalue(x,v) ((R_PI)x)->value = v

typedef struct {
RTAG_BITS()
int property;
double value;
} R_PD_struct,*R_PD;


#define rPDvalue(x) (((R_PD)x)->value)
#define set_rPDvalue(x,v) ((R_PD)x)->value = v


typedef struct {
RTAG_BITS()
int property;
int value;
int valueType;
} R_POT_struct,*R_POT;



#define rPOTvalue(x) (((R_POT)x)->value)
#define set_rPOTvalue(x,v) ((R_POT)x)->value = v


#define rPOTvalueType(x) (((R_POT)x)->valueType)
#define set_rPOTvalueType(x,v) ((R_POT)x)->valueType = v


typedef struct {
RTAG_BITS()
int property;
int value;
int valueType;
} R_PIT_struct,*R_PIT;



#define rPITvalue(x) (((R_PIT)x)->value)
#define set_rPITvalue(x,v) ((R_PIT)x)->value = v


#define rPITvalueType(x) (((R_PIT)x)->valueType)
#define set_rPITvalueType(x,v) ((R_PIT)x)->valueType = v




typedef struct {
RTAG_BITS()
int property;
double value;
int valueType;
} R_PDT_struct,*R_PDT;

// we don't double align, so set this to the unaligned size, rather than
// the padded size that the Microsoft C compiler would generate (rather than
// using the /Zp4 compile flag)

#define R_PDT_size 20



#define rPDTvalue(x) (((R_PDT)x)->value)
#define set_rPDTvalue(x,v) ((R_PDT)x)->value = v


#define rPDTvalueType(x) (((R_PDT)x)->valueType)
#define set_rPDTvalueType(x,v) ((R_PDT)x)->valueType = v



typedef struct {
RTAG_BITS()
int length;
} R_SEQ_struct,*R_SEQ;

#define rSEQlength(x) (((R_SEQ)x)->length)
#define set_rSEQlength(x,v) ((R_SEQ)x)->length = v


// preserialized variants (containing object pointers not indices)



typedef struct {
RTAG_BITS()
ob property;
} P_X_struct,*P_X;

#define pTag(x) (((P_X)x)->tag)
#define pProperty(x) (((P_X)x)->property)

#define set_pTag(x,y) ((P_X)x)->tag = y
#define set_pProperty(x,y) ((P_X)x)->property = y

typedef struct {
RTAG_BITS()
ob property;
ob value;
} P_PO_struct,*P_PO;

#define pPOvalue(x) (((P_PO)x)->value)
#define set_pPOvalue(x,v) ((P_PO)x)->value = v

typedef struct {
RTAG_BITS()
ob property;
int value;
} P_PI_struct,*P_PI;


#define pPIvalue(x) (((P_PI)x)->value))
#define set_pPIvalue(x,v) ((P_PI)x)->value = v



typedef struct {
RTAG_BITS()
ob property;
double value;
} P_PD_struct,*P_PD;



#define pPDvalue(x) (((P_PD)x)->value))
#define set_pPDvalue(x,v) ((P_PD)x)->value = v


typedef struct {
RTAG_BITS()
ob property;
ob value;
ob valueType;
} P_POT_struct,*P_POT;


#define pPOTvalue(x) (((P_POT)x)->value)
#define set_pPOTvalue(x,v) ((P_POT)x)->value = v


#define pPOTvalueType(x) (((P_POT)x)->valueType)
#define set_pPOTvalueType(x,v) ((P_POT)x)->valueType = v


typedef struct {
RTAG_BITS()
ob property;
int value;
ob valueType;
} P_PIT_struct,*P_PIT;



#define pPITvalue(x) (((P_PIT)x)->value)
#define set_pPITvalue(x,v) ((P_PIT)x)->value = v


#define pPITvalueType(x) (((P_PIT)x)->valueType)
#define set_pPITvalueType(x,v) ((P_PIT)x)->valueType = v


typedef struct {
RTAG_BITS()
ob property;
double value;
ob valueType;
} P_PDT_struct,*P_PDT;

// we don't double align, so set this to the unaligned size, rather than
// the padded size that the Microsoft C compiler would generate (rather than
// using the /Zp4 compile flag)

#define P_PDT_size 20


#define pPDTvalue(x) (((P_PDT)x)->value)
#define set_pPDTvalue(x,v) ((P_PDT)x)->value = v


#define pPDTvalueType(x) (((P_PDT)x)->valueType)
#define set_pPDTvalueType(x,v) ((P_PDT)x)->valueType = v


typedef struct {
int signature;
short version;
short variant;
int length;
int nodeCount;
}
S_Header_struct,*S_Header;


