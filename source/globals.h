/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review


extern int gc_disabled;
extern int c_page_number;
extern int gc_count;
extern Hashtable rootResource;
extern Hashtable regardingIntern;
extern Hashtable typeIntern;
extern Hashtable seqIntern;
extern Hashtable functionIntern;
extern int  htverbose; // for debugging
extern char Seqbyte_print_buf[];

extern Type importTypes[];
#define Seqbyte_print_buf_length 10000

#define INITIAL_SEQUENCE_SIZE 4
// the following are globals initialized in set_boot_globals0
extern ob bindingKeyP;
extern ob bindingTypeP;
extern ob bindingValueP;
//extern ob bindingBoolesP;
extern Type RegardingT;
extern Type TypeT;// the type Type
extern Type PcodeT;
extern Type RestrictionT;
extern Type DblockLayoutT;

extern Seqob typeProperties;
extern Seqob pcodeProperties;
extern Seqob regardingProperties;
extern Seqob restrictionProperties;
extern Seqob bitFieldProperties;
extern Seqob dblockLayoutProperties;

extern Type FunctionT;
extern Type BitFieldT;
extern Type LiteralT;
extern Type hexBinaryT;

extern Seqob functionProperties;
extern Seqob pcodeProperties;
extern Seqob listProperties;

extern Hashtable boot_root;
//extern Hashtable boot_globals; noglob
extern Hashtable boot_fabl;
extern Hashtable boot_fimp;

// these are types set by set_type_globlals, later in the bootstrap

extern Type intT;
extern Type doubleT;
extern Type stringT;
extern Type idT;
extern Type obT; // = AnyT
extern Type AnyT;
extern Type byteT;
extern Type booleanT;
extern Type dateT;
extern Type BindingT;
extern Type SeqOfTypeT;
extern Type PropertyT;
extern Type FunctionalPropertyT;
extern Type StringBufT;
extern Type ListT;
extern Type HashSeqT;
extern Type DblockT;
extern Type SeqOfByteT;
extern Type SeqOfObT;
extern Type SeqOfClassT;
extern Type SeqOfIntT;
extern Type SeqOfDoubleT;
extern Type ValuesT;
extern Type DatatypeT;
extern Type RdfSeqT;

extern ob List_first;
extern ob List_rest;
extern ob List_nil;


extern ob rdf_ns;
extern ob rdf_typeP;

extern ob constructorP;
extern ob paramP;
extern ob paramsP;
extern ob typePropertiesP;
extern ob subClassOfP;
extern ob restrictionsP;
extern ob prototypeP;
extern ob typeBoolesP;




extern string string_int_;
extern string string_string_;
extern string string_ob_;
extern string string_byte_;
extern string string_boolean_;
extern string string_Binding_;
extern string string_Function_;
extern string string_SeqOf_;
extern string string_Property_;
extern string string_StringBuf_;
extern string string_List_;
extern string string_HashSeq_;
extern string string_List_first_;
extern string string_List_rest_;
extern string string_List_nil_;
extern string string_Dblock_;
extern string string_Pcode_;
extern string string_pcodeProperties_;
extern string string_bfimp_;
extern string string_fimp_;

extern int c_page;

extern ob fablns;
extern ob rdfsns;
extern ob xsdns;
extern ob rdfns;
extern ob owlns;
extern ob onPropertyP;
extern Object allValuesFromP;
extern ob cardinalityP;
extern ob bitFieldP;
extern ob prototypeP;

extern int pm_step_count;
extern int pm_break_step;
extern int pm_gc_mod;
extern ob ob_call_return_value;

extern char filenameBuf[];
extern char string_print_buf[];
#define STRING_PRINT_BUF_LENGTH 100

#define userDirBuf_length 200
extern char userDir[];

extern int lastSignal;

extern void* stackBottom;

extern char *fablPath[],*rdfsPath[],*fimpPath[],*xsdPath[],*rdfPath[],*owlPath[];

extern int deserializeSubst;  
extern int substValueCount;

extern ob rdfsClassT;

extern ob* substkeys[];
extern ob* substvalues[];
extern Values emptyValues;

extern int cgiMode;

extern int collectingSubjects; // for serialization
extern Seqob collectedSubjects; 

extern int silentMode; // no printing to stdout

extern int safeMode; // no reading or writing to files
extern int maxMemory; // in kilobytes
extern int maxPmSteps; // no limit!!; in thousands
extern int memoryAllocated; // in kilobytes: 
extern int maxTempFileSize; // in bytes

extern char* tempDir;
extern char* pubDir;
extern int startCount;
extern int tempFileCount;
extern int persistMode;
extern int multi_t_heaps;
extern int deltaEnabled;
extern char startupFile[];// command line argument
extern int whichHeapSize;
extern int serializeNodes;
extern int serializeBufferSize;
