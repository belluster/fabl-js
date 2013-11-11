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

int gc_disabled = 0;
int error_on_relabel = 1;
int error_on_rebind = 1;
Hashtable rootResource;
Hashtable regardingIntern;
Hashtable typeIntern;
Hashtable seqIntern;
Hashtable functionIntern;
Type importTypes[20];

ob bindingKeyP;
ob bindingTypeP;
ob bindingValueP;
Type RegardingT = (Type)nul; // the type Regarding
Type TypeT = (Type)nul;// the type Type
Type RestrictionT = (Type)nul;
Type BitFieldT = (Type)nul;
Type DblockLayoutT = (Type)nul;
Seqob typeProperties = (Seqob)0;
Seqob regardingProperties  = (Seqob)0;
Seqob pcodeProperties = (Seqob)0;
Seqob bitFieldProperties = (Seqob)0;
Type FunctionT = (Type)nul;
Seqob functionProperties = (Seqob)0;
Seqob listProperties = (Seqob)0;
Seqob dblockLayoutProperties = (Seqob)0;

Hashtable boot_root;
Hashtable boot_fabl;
Hashtable boot_fimp;

// these are  set by initBootGlobals in deserializing page 0

Type doubleT;
Type intT;
Type stringT;
Type idT;
Type obT; // = AnyT
Type AnyT;
Type byteT;
Type booleanT;
Type dateT;
Type BindingT;
Type SeqOfTypeT;
Type SeqOfClassT;
Type PropertyT;
Type FunctionalPropertyT;
Type BindingT;
Type StringBufT;
Type ListT;
Type HashSeqT;
Type DblockT;
Type SeqOfByteT;
Type SeqOfObT;
Type SeqOfIntT;
Type SeqOfDoubleT;
Type PcodeT;
Type ValuesT;
Type LiteralT;
Type DatatypeT;
Type RdfSeqT;
Type hexBinaryT;



ob List_first;
ob List_rest;
ob List_nil;

ob rdf_ns;
ob rdf_typeP = nul;
ob subClassOfP = nul;


ob constructorP;
ob paramP;
ob paramsP;
ob typePropertiesP;
ob restrictionsP;
ob prototypeP;
ob typeBoolesP;

string string_int_;
string string_string_;
string string_ob_;
string string_byte_;
string string_boolean_;
string string_Binding_;
string string_Function_;
string string_SeqOf_;
string string_Property_;
string string_Binding_;
string string_StringBuf_;
string string_List_;
string string_HashSeq_;
string string_List_first_;
string string_List_rest_;
string string_List_nil_;
string string_Dblock_;
string string_Pcode_;
string string_pcodeProperties_;
string string_bfimp_;
string string_fimp_;

int c_page;

ob fablns;
ob rdfsns;
ob xsdns;
ob rdfns;


ob owlns;
ob onPropertyP;
Object allValuesFromP;
ob cardinalityP;
ob bitFieldP;
ob prototypeP;
Seqob restrictionProperties;

int lastSignal = 0;

Values emptyValues;

int cgiMode = 0;

int collectingSubjects = 0; // for serialization
Seqob collectedSubjects; 

int silentMode = 0; // no printing to stdout

int safeMode = 0; // no reading or writing to files
int maxMemory = 1000000; // in kilobytes
int maxPmSteps = -1; // no limit!!; in thousands
int memoryAllocated; // in kilobytes: 
int maxTempFileSize = 10000000; // in bytes
char* tempDir = "../temp/";
char* pubDir = "../pub/";
int startCount;
int tempFileCount = 0;
