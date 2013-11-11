#define FORIMPORTS
#include "includes.h"
#include <math.h>

extern void (*getStartupFile)();

extern void (*string_length)();

extern void (*string_int_select)();

extern void (*int_to_ob)();

extern void (*double_to_ob)();

extern void (*ob_to_int)();

extern void (*literalToInt)();

extern void (*literalToDouble)();

extern void (*to_boxeddouble)();

extern void (*StringBuf_to_int)();

extern void (*literalToInt)();

extern void (*StringBuf_to_double)();

extern void (*literalToDouble)();

extern void (*literalToString)();

extern void (*ob_obkind)();

extern void (*selectUri)();

extern void (*selectUri)();

extern void (*selectOb)();

extern void (*mkEmptySeq)();

extern void (*ob_type0)();

extern void (*mk_paramType)();

extern void (*ob_setType)();

extern void (*ob_setType)();

extern void (*ob_iType)();

extern void (*ob_hasType)();

extern void (*ob_iNew)();

extern void (*ob_Install)();

extern void (*mk_Bindingtable)();

extern void (*mk_Bindingtable)();

extern void (*setOb)();

extern void (*setInt)();

extern void (*setDouble)();

extern void (*setObFunctional)();

extern void (*setIntFunctional)();

extern void (*setDoubleFunctional)();

extern void (*setObTyped)();

extern void (*setIntTyped)();

extern void (*setDoubleTyped)();

extern void (*selectUriBinding)();

extern void (*selectBinding)();

extern void (*bindUri)();

extern void (*regarding1)();

extern void (*ob_regardingValue)();

extern void (*fixBootType)();

extern void (*ob_name)();

extern void (*ob_parent)();

extern void (*ob_check_obkind)();

extern void (*bindingKey)();

extern void (*Binding_inDblock)();

extern void (*Binding_setInDblock)();

extern void (*string_int_select)();

extern void (*StringBuf_set)();

extern void (*StringBuf_select)();

extern void (*mk_StringBuf)();

extern void (*mk_empty_StringBuf)();

extern void (*string_mk_StringBuf)();

extern void (*mk_empty_StringBuf)();

extern void (*string_mk_StringBuf)();

extern void (*mk_StringBuf)();

extern void (*StringBuf_copy)();

extern void (*StringBuf_copy)();

extern void (*StringBuf_equal)();

extern void (*StringBuf_add)();

extern void (*Seqob_add)();

extern void (*Seqob_contains)();

extern void (*Seqob_append)();

extern void (*Seqob_copy)();

extern void (*Seq_copy)();

extern void (*Seqob_expand_with_nuls)();

extern void (*Seqob_reset)();

extern void (*Seq_reset)();

extern void (*Seqob_set_length)();

extern void (*Seq_set_length)();

extern void (*Seqint_expand_with_zeros)();

extern void (*Seqint_append)();

extern void (*Seq_length)();

extern void (*Seq_length)();

extern void (*Seq_capacity)();

extern void (*StringBuf_print)();

extern void (*terpri)();

extern void (*after_error)();

extern void (*StringBuf_to_string)();

extern void (*StringBuf_to_string)();

extern void (*StringBuf_int_int_select)();

extern void (*Seq_reset)();

extern void (*set_silentMode)();

extern void (*get_silentMode)();

extern void (*StringBuf_add)();

extern void (*StringBuf_add)();

extern void (*StringBuf_string_append)();

extern void (*StringBuf_append)();

extern void (*StringBuf_int_append)();

extern void (*StringBuf_double_append)();

extern void (*mk_hexBinary)();

extern void (*StringBuf_add)();

extern void (*StringBuf_add)();

extern void (*StringBuf_append)();

extern void (*StringBuf_append)();

extern void (*Seq_length)();

extern void (*StringBuf_set)();

extern void (*StringBuf_select)();

extern void (*Seqbyte_select_short)();

extern void (*Seqbyte_select_short_bigendian)();

extern void (*Seqbyte_select_int)();

extern void (*Seqbyte_select_int_bigendian)();

extern void (*Seqbyte_select_double)();

extern void (*Seqbyte_select_double_bigendian)();

extern void (*Seqbyte_set_swf_double)();

extern void (*string_string_times)();

extern void (*mk_Functionob)();

extern void (*internFunction)();

extern void (*identifyFunction)();

extern void (*mk_functionType)();

extern void (*addBitField)();

extern void (*splice1)();

extern void (*cons)();

extern void (*list_select)();

extern void (*list_set)();

extern void (*list_setRest)();

extern void (*list_length)();

extern void (*isList)();

extern void (*bindingValue)();

extern void (*setBindingValue)();

extern void (*Function_ob_applyn_ob)();

extern void (*Function_ob_ob_applyn_ob)();

extern void (*mk_HashSeq)();

extern void (*HashSeq_put)();

extern void (*HashSeq_put2)();

extern void (*HashSeq_get)();

extern void (*HashSeq_contents)();

extern void (*Hashtable_reset)();

extern void (*Hashtable_reset)();

extern void (*isHashSeq)();

extern void (*Dblock_alloc)();

extern void (*Dblock_set_function_of_fun)();

extern void (*get_bits)();

extern void (*set_bits)();

extern void (*int_setBit)();

extern void (*int_getBit)();

extern void (*Dblock_set_ob_fun)();

extern void (*Dblock_set_int_fun)();

extern void (*Dblock_set_double_fun)();

extern void (*Dblock_select_ob_fun)();

extern void (*Dblock_select_int_fun)();

extern void (*Dblock_select_double_fun)();

extern void (*Dblock_numobs_fun)();

extern void (*Dblock_numints_fun)();

extern void (*Dblock_numdoubles_fun)();

extern void (*ob_bindings)();

extern void (*Dblock_Seqbyte_pm_evaluate)();

extern void (*tb)();

extern void (*console_stack_extract)();

extern void (*console_stack_depth)();

extern void (*fablReset)();

extern void (*isFunction)();

extern void (*charAvail)();

extern void (*sleepMsec)();

extern void (*Seqbyte_readLine)();

extern void (*serializeMalloc)();

extern void (*serializeReset)();

extern void (*serializeToBuffer2)();

extern void (*serializeToFile)();

extern void (*getSerializeBuffer)();

extern void (*deserializeFromStringBuf)();

extern void (*deserializeFromStringBuf2)();

extern void (*deserializeFromFile)();

extern void (*serializeCollect0)();

extern void (*restoreTempBits)();

extern void (*addObToSerialize)();

extern void (*resetToSerialize)();

extern void (*setPreambleObCount)();

extern void (*setSerializedBindingBits)();

extern void (*ob_tempbit)();

extern void (*ob_set_tempbit)();

extern void (*ob_tempbit0)();

extern void (*ob_set_tempbit0)();

extern void (*Binding_tempbit2)();

extern void (*Binding_set_tempbit2)();

extern void (*bindingKind)();

extern void (*ob_interned)();

extern void (*ob_page)();

extern void (*ob_set_page)();

extern void (*currentPage)();

extern void (*set_currentPage)();

extern void (*compactobNumFields)();

extern void (*compactobProperties)();

extern void (*selectNthOb)();

extern void (*mk_Typeob)();

extern void (*HashtableBindingsSetPage)();

extern void (*Seq_dataKind)();

extern void (*Seqbyte_Seqbyte_readFromFile)();

extern void (*Seqbyte_readFromStdin)();

extern void (*Seqbyte_Seqbyte_writeToFile)();

extern void (*Seqbyte_filesize)();

extern void (*Seqbyte_fileExists)();

extern void (*Seqob_Seqbyte_directoryEntries)();

extern void (*writeToPubFile)();

extern void (*writeToTempFile)();

extern void (*writeToUserDir)();

extern void (*setUserDir)();

extern void (*Cinspect)();

extern void (*time_msec)();

extern void (*current_time)();

extern void (*getStartCount)();

extern void (*pmSteps)();

extern void (*cgiInit)();

extern void (*fablQuit)();

extern void (*Seqbyte_string_getenv)();

extern void (*Binding_isConstant)();

extern void (*Binding_set_isConstant)();

extern void (*mk_Restriction)();

extern void (*mk_BitField)();

extern void (*Seqint_add)();

extern void (*Seqdouble_add)();

extern void (*Seqdouble_append)();

extern void (*mkSmallob_properties)();

extern void (*Seqbyte_select)();

extern void (*Seqbyte_set)();

extern void (*Seqbyte_add)();

extern void (*mk_empty_Seqbyte)();

extern void (*raptorInit)();

extern void (*raptorParseFile)();

extern void (*raptorParseUri)();

extern void (*raptorParseBuf)();

extern void (*init_www)();

extern void (*www_fetch)();

extern void (*emitHtmlHeaderWithLength)();

extern void (*setHttpHeaderEmitted)();

extern void (*sweep_r_heap)();

extern void (*sweep_t_heap)();

extern void (*sweep_heaps)();

extern void (*heap_stat)();

extern void (*gc)();

extern void (*alloc_statically)();

extern void (*set_gc_test_flags)();

extern void (*check_stack)();

extern void (*assertOb)();

extern void (*assertInt)();

extern void (*assertDouble)();

extern void (*valueCount)();

extern void (*valueCountOfType)();

extern void (*mgetOb)();

extern void (*fgetOb)();

extern void (*mkCardinalityRestriction)();

extern void (*mkMaxCardinalityRestriction)();

extern void (*mkAllValuesFromRestriction)();

extern void (*mkHasValueRestriction)();

extern void (*toLiteral)();

extern void (*isSubClassOf)();

extern void (*nowCollectingSubjects)();

extern void (*set_collectingSubjects)();

extern void (*theCollectedSubjects)();

extern void (*collectSubject)();

extern void (*double_trunc)();

extern void (*double_round)();

extern void (*mod_fun)();

extern void (*rand)();

extern void (*srand)();

extern void (*getSafeMode)();

extern void (*setSafeMode)();

extern void (*getMemoryAllocated)();

extern void (*getMaxMemory)();

extern void (*setMaxMemory)();

extern void (*getMaxPmSteps)();

extern void (*setMaxPmSteps)();

extern void (*getMaxTempFileSize)();

extern void (*setMaxTempFileSize)();

extern void (*xsdKind_fun)();

extern void (*set_xsdKind_fun)();

extern void (*intToDate)();

extern void (*dateToInt)();

extern void (*isDate)();

extern void (*allocTheDelta)();

extern void (*recordDeltas)();

extern void (*enableDelta)();

extern void (*resetDelta)();

void cImports()
{cImport("startupFile",0,importTypes,&getStartupFile);
importTypes[0]=idT;
cImport("length",1,importTypes,&string_length);
importTypes[0]=idT;
importTypes[1]=intT;
cImport("array_ref",2,importTypes,&string_int_select);
importTypes[0]=intT;
cImport("integer_to_ob",1,importTypes,&int_to_ob);
importTypes[0]=doubleT;
cImport("toOb",1,importTypes,&double_to_ob);
importTypes[0]=obT;
cImport("ob_to_integer",1,importTypes,&ob_to_int);
importTypes[0]=obT;
cImport("toInt",1,importTypes,&literalToInt);
importTypes[0]=obT;
cImport("toDouble",1,importTypes,&literalToDouble);
importTypes[0]=intT;
cImport("toDoubleOb",1,importTypes,&to_boxeddouble);
importTypes[0]=StringBufT;
cImport("toInt",1,importTypes,&StringBuf_to_int);
importTypes[0]=LiteralT;
cImport("toInt",1,importTypes,&literalToInt);
importTypes[0]=StringBufT;
cImport("toDouble",1,importTypes,&StringBuf_to_double);
importTypes[0]=LiteralT;
cImport("toDouble",1,importTypes,&literalToDouble);
importTypes[0]=LiteralT;
cImport("toString",1,importTypes,&literalToString);
importTypes[0]=obT;
cImport("obkind",1,importTypes,&ob_obkind);
importTypes[0]=obT;
importTypes[1]=idT;
cImport("selectUri",2,importTypes,&selectUri);
importTypes[0]=obT;
importTypes[1]=idT;
cImport("uriChild",2,importTypes,&selectUri);
importTypes[0]=obT;
importTypes[1]=PropertyT;
cImport("get",2,importTypes,&selectOb);
importTypes[0]=TypeT;
cImport("mk_emptysequence",1,importTypes,&mkEmptySeq);
importTypes[0]=obT;
cImport("type0",1,importTypes,&ob_type0);
importTypes[0]=idT;
importTypes[1]=TypeT;
cImport("mkParamType",2,importTypes,&mk_paramType);
importTypes[0]=obT;
importTypes[1]=SeqOfTypeT;
cImport("setType",2,importTypes,&ob_setType);
importTypes[0]=obT;
importTypes[1]=TypeT;
cImport("setType",2,importTypes,&ob_setType);
importTypes[0]=obT;
cImport("iType",1,importTypes,&ob_iType);
importTypes[0]=obT;
importTypes[1]=TypeT;
cImport("hasType",2,importTypes,&ob_hasType);
importTypes[0]=TypeT;
cImport("iNew",1,importTypes,&ob_iNew);
importTypes[0]=obT;
importTypes[1]=TypeT;
importTypes[2]=booleanT;
cImport("iInstall",3,importTypes,&ob_Install);
cImport("mkObject",0,importTypes,&mk_Bindingtable);
cImport("mkResource",0,importTypes,&mk_Bindingtable);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=obT;
cImport("set",3,importTypes,&setOb);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=intT;
cImport("set",3,importTypes,&setInt);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=doubleT;
cImport("set",3,importTypes,&setDouble);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=obT;
cImport("setFunctional",3,importTypes,&setObFunctional);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=intT;
cImport("setFunctional",3,importTypes,&setIntFunctional);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=doubleT;
cImport("setFunctional",3,importTypes,&setDoubleFunctional);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=obT;
importTypes[3]=TypeT;
cImport("set",4,importTypes,&setObTyped);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=intT;
importTypes[3]=TypeT;
cImport("set",4,importTypes,&setIntTyped);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=doubleT;
importTypes[3]=TypeT;
cImport("set",4,importTypes,&setDoubleTyped);
importTypes[0]=obT;
importTypes[1]=idT;
cImport("selectUriBinding",2,importTypes,&selectUriBinding);
importTypes[0]=obT;
importTypes[1]=PropertyT;
cImport("selectBinding",2,importTypes,&selectBinding);
importTypes[0]=obT;
importTypes[1]=idT;
importTypes[2]=obT;
cImport("bindUri",3,importTypes,&bindUri);
importTypes[0]=obT;
cImport("regarding",1,importTypes,&regarding1);
importTypes[0]=obT;
cImport("regardingValue",1,importTypes,&ob_regardingValue);
importTypes[0]=TypeT;
cImport("fixBootType",1,importTypes,&fixBootType);
importTypes[0]=obT;
cImport("name",1,importTypes,&ob_name);
importTypes[0]=obT;
cImport("parent",1,importTypes,&ob_parent);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("checkObkind",2,importTypes,&ob_check_obkind);
importTypes[0]=obT;
cImport("bindingKey",1,importTypes,&bindingKey);
importTypes[0]=BindingT;
cImport("inDblock",1,importTypes,&Binding_inDblock);
importTypes[0]=BindingT;
importTypes[1]=booleanT;
cImport("setInDblock",2,importTypes,&Binding_setInDblock);
importTypes[0]=idT;
importTypes[1]=intT;
cImport("select",2,importTypes,&string_int_select);
importTypes[0]=StringBufT;
importTypes[1]=intT;
importTypes[2]=intT;
cImport("set",3,importTypes,&StringBuf_set);
importTypes[0]=StringBufT;
importTypes[1]=intT;
cImport("select",2,importTypes,&StringBuf_select);
importTypes[0]=intT;
cImport("mkStringBuf",1,importTypes,&mk_StringBuf);
cImport("mkStringBuf",0,importTypes,&mk_empty_StringBuf);
importTypes[0]=idT;
cImport("mkStringBuf",1,importTypes,&string_mk_StringBuf);
cImport("mkString",0,importTypes,&mk_empty_StringBuf);
importTypes[0]=idT;
cImport("mkString",1,importTypes,&string_mk_StringBuf);
importTypes[0]=intT;
cImport("mkString",1,importTypes,&mk_StringBuf);
importTypes[0]=StringBufT;
cImport("copyStringConst",1,importTypes,&StringBuf_copy);
importTypes[0]=StringBufT;
cImport("copy",1,importTypes,&StringBuf_copy);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
cImport("equal",2,importTypes,&StringBuf_equal);
importTypes[0]=StringBufT;
importTypes[1]=byteT;
cImport("add",2,importTypes,&StringBuf_add);
importTypes[0]=obT;
importTypes[1]=obT;
cImport("seqobAdd",2,importTypes,&Seqob_add);
importTypes[0]=obT;
importTypes[1]=obT;
cImport("seqobContains",2,importTypes,&Seqob_contains);
importTypes[0]=obT;
importTypes[1]=obT;
cImport("seqobAppend",2,importTypes,&Seqob_append);
importTypes[0]=obT;
cImport("seqobCopy",1,importTypes,&Seqob_copy);
importTypes[0]=obT;
cImport("seqCopy",1,importTypes,&Seq_copy);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("seqobExpand",2,importTypes,&Seqob_expand_with_nuls);
importTypes[0]=obT;
cImport("seqobReset",1,importTypes,&Seqob_reset);
importTypes[0]=obT;
cImport("seqReset",1,importTypes,&Seq_reset);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("seqobSetLength",2,importTypes,&Seqob_set_length);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("seqSetLength",2,importTypes,&Seq_set_length);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("seqintExpand",2,importTypes,&Seqint_expand_with_zeros);
importTypes[0]=obT;
importTypes[1]=obT;
cImport("seqintAppend",2,importTypes,&Seqint_append);
importTypes[0]=StringBufT;
cImport("length",1,importTypes,&Seq_length);
importTypes[0]=obT;
cImport("seqLength",1,importTypes,&Seq_length);
importTypes[0]=obT;
cImport("seqCapacity",1,importTypes,&Seq_capacity);
importTypes[0]=StringBufT;
cImport("tprint",1,importTypes,&StringBuf_print);
cImport("terpri",0,importTypes,&terpri);
cImport("afterError",0,importTypes,&after_error);
importTypes[0]=StringBufT;
cImport("toString",1,importTypes,&StringBuf_to_string);
importTypes[0]=StringBufT;
cImport("toId",1,importTypes,&StringBuf_to_string);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
importTypes[2]=intT;
importTypes[3]=intT;
cImport("select",4,importTypes,&StringBuf_int_int_select);
importTypes[0]=StringBufT;
cImport("reset",1,importTypes,&Seq_reset);
importTypes[0]=booleanT;
cImport("silent",1,importTypes,&set_silentMode);
cImport("silent",0,importTypes,&get_silentMode);
importTypes[0]=StringBufT;
importTypes[1]=byteT;
cImport("times",2,importTypes,&StringBuf_add);
importTypes[0]=StringBufT;
importTypes[1]=intT;
cImport("addChar",2,importTypes,&StringBuf_add);
importTypes[0]=StringBufT;
importTypes[1]=idT;
cImport("times",2,importTypes,&StringBuf_string_append);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
cImport("times",2,importTypes,&StringBuf_append);
importTypes[0]=StringBufT;
importTypes[1]=intT;
cImport("times",2,importTypes,&StringBuf_int_append);
importTypes[0]=StringBufT;
importTypes[1]=doubleT;
cImport("times",2,importTypes,&StringBuf_double_append);
importTypes[0]=intT;
cImport("mk_hexBinary",1,importTypes,&mk_hexBinary);
importTypes[0]=hexBinaryT;
importTypes[1]=byteT;
cImport("times",2,importTypes,&StringBuf_add);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("pushByte",2,importTypes,&StringBuf_add);
importTypes[0]=hexBinaryT;
importTypes[1]=StringBufT;
cImport("times",2,importTypes,&StringBuf_append);
importTypes[0]=hexBinaryT;
importTypes[1]=hexBinaryT;
cImport("times",2,importTypes,&StringBuf_append);
importTypes[0]=hexBinaryT;
cImport("length",1,importTypes,&Seq_length);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
importTypes[2]=intT;
cImport("set",3,importTypes,&StringBuf_set);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("select",2,importTypes,&StringBuf_select);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("selectShort",2,importTypes,&Seqbyte_select_short);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("selectShortBigendian",2,importTypes,&Seqbyte_select_short_bigendian);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("selectInt",2,importTypes,&Seqbyte_select_int);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("selectIntBigendian",2,importTypes,&Seqbyte_select_int_bigendian);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("selectDouble",2,importTypes,&Seqbyte_select_double);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
cImport("selectDoubleBigendian",2,importTypes,&Seqbyte_select_double_bigendian);
importTypes[0]=hexBinaryT;
importTypes[1]=intT;
importTypes[2]=doubleT;
cImport("swfSetDouble",3,importTypes,&Seqbyte_set_swf_double);
importTypes[0]=idT;
importTypes[1]=idT;
cImport("concat",2,importTypes,&string_string_times);
importTypes[0]=idT;
importTypes[1]=obT;
importTypes[2]=TypeT;
cImport("mkFunctionOb",3,importTypes,&mk_Functionob);
importTypes[0]=FunctionT;
cImport("internFunction",1,importTypes,&internFunction);
importTypes[0]=FunctionT;
cImport("identifyFunction",1,importTypes,&identifyFunction);
importTypes[0]=TypeT;
importTypes[1]=SeqOfTypeT;
cImport("mkFunctionType",2,importTypes,&mk_functionType);
importTypes[0]=TypeT;
importTypes[1]=PropertyT;
importTypes[2]=PropertyT;
importTypes[3]=intT;
cImport("addBitField",4,importTypes,&addBitField);
importTypes[0]=obT;
importTypes[1]=obT;
cImport("splice1",2,importTypes,&splice1);
importTypes[0]=obT;
importTypes[1]=obT;
cImport("cons",2,importTypes,&cons);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("listSelect",2,importTypes,&list_select);
importTypes[0]=obT;
importTypes[1]=intT;
importTypes[2]=obT;
cImport("listSet",3,importTypes,&list_set);
importTypes[0]=obT;
importTypes[1]=intT;
importTypes[2]=obT;
cImport("listSetRest",3,importTypes,&list_setRest);
importTypes[0]=obT;
cImport("listLength",1,importTypes,&list_length);
importTypes[0]=obT;
cImport("isList",1,importTypes,&isList);
importTypes[0]=BindingT;
cImport("bindingValue",1,importTypes,&bindingValue);
importTypes[0]=BindingT;
importTypes[1]=obT;
cImport("setBindingValue",2,importTypes,&setBindingValue);
importTypes[0]=FunctionT;
importTypes[1]=obT;
cImport("applynOb",2,importTypes,&Function_ob_applyn_ob);
importTypes[0]=FunctionT;
importTypes[1]=obT;
importTypes[2]=obT;
cImport("applynOb",3,importTypes,&Function_ob_ob_applyn_ob);
cImport("mkHashSeq",0,importTypes,&mk_HashSeq);
importTypes[0]=HashSeqT;
importTypes[1]=obT;
cImport("put",2,importTypes,&HashSeq_put);
importTypes[0]=HashSeqT;
importTypes[1]=obT;
cImport("put2",2,importTypes,&HashSeq_put2);
importTypes[0]=HashSeqT;
importTypes[1]=obT;
cImport("get",2,importTypes,&HashSeq_get);
importTypes[0]=HashSeqT;
cImport("contents",1,importTypes,&HashSeq_contents);
importTypes[0]=HashSeqT;
cImport("reset",1,importTypes,&Hashtable_reset);
importTypes[0]=obT;
cImport("removeProperties",1,importTypes,&Hashtable_reset);
importTypes[0]=obT;
cImport("isHashSeq",1,importTypes,&isHashSeq);
importTypes[0]=intT;
importTypes[1]=intT;
importTypes[2]=intT;
cImport("allocDblock",3,importTypes,&Dblock_alloc);
importTypes[0]=DblockT;
importTypes[1]=FunctionT;
cImport("setFunctionOf",2,importTypes,&Dblock_set_function_of_fun);
importTypes[0]=intT;
importTypes[1]=intT;
importTypes[2]=intT;
cImport("selectBits",3,importTypes,&get_bits);
importTypes[0]=intT;
importTypes[1]=intT;
importTypes[2]=intT;
importTypes[3]=intT;
cImport("setBits",4,importTypes,&set_bits);
importTypes[0]=intT;
importTypes[1]=intT;
importTypes[2]=booleanT;
cImport("setBit",3,importTypes,&int_setBit);
importTypes[0]=intT;
importTypes[1]=intT;
cImport("getBit",2,importTypes,&int_getBit);
importTypes[0]=DblockT;
importTypes[1]=intT;
importTypes[2]=obT;
cImport("setOb",3,importTypes,&Dblock_set_ob_fun);
importTypes[0]=DblockT;
importTypes[1]=intT;
importTypes[2]=intT;
cImport("setInt",3,importTypes,&Dblock_set_int_fun);
importTypes[0]=DblockT;
importTypes[1]=intT;
importTypes[2]=doubleT;
cImport("setDouble",3,importTypes,&Dblock_set_double_fun);
importTypes[0]=DblockT;
importTypes[1]=intT;
cImport("selectOb",2,importTypes,&Dblock_select_ob_fun);
importTypes[0]=DblockT;
importTypes[1]=intT;
cImport("selectInt",2,importTypes,&Dblock_select_int_fun);
importTypes[0]=DblockT;
importTypes[1]=intT;
cImport("selectDouble",2,importTypes,&Dblock_select_double_fun);
importTypes[0]=DblockT;
cImport("numobs",1,importTypes,&Dblock_numobs_fun);
importTypes[0]=DblockT;
cImport("numint",1,importTypes,&Dblock_numints_fun);
importTypes[0]=DblockT;
cImport("numdoubles",1,importTypes,&Dblock_numdoubles_fun);
importTypes[0]=obT;
cImport("bindings",1,importTypes,&ob_bindings);
importTypes[0]=DblockT;
importTypes[1]=SeqOfByteT;
cImport("pmEvaluate",2,importTypes,&Dblock_Seqbyte_pm_evaluate);
cImport("tb",0,importTypes,&tb);
importTypes[0]=intT;
importTypes[1]=obT;
importTypes[2]=obT;
importTypes[3]=obT;
cImport("consoleStackExtract",4,importTypes,&console_stack_extract);
cImport("consoleStackDepth",0,importTypes,&console_stack_depth);
cImport("rs",0,importTypes,&fablReset);
importTypes[0]=obT;
cImport("isFunction",1,importTypes,&isFunction);
cImport("charAvail",0,importTypes,&charAvail);
importTypes[0]=intT;
cImport("sleepMsec",1,importTypes,&sleepMsec);
importTypes[0]=StringBufT;
cImport("readLine",1,importTypes,&Seqbyte_readLine);
importTypes[0]=intT;
importTypes[1]=intT;
cImport("serializeMalloc",2,importTypes,&serializeMalloc);
cImport("serializeReset",0,importTypes,&serializeReset);
importTypes[0]=StringBufT;
importTypes[1]=SeqOfObT;
importTypes[2]=intT;
cImport("serializeToBuffer",3,importTypes,&serializeToBuffer2);
importTypes[0]=StringBufT;
importTypes[1]=SeqOfObT;
importTypes[2]=intT;
cImport("serializeToFile",3,importTypes,&serializeToFile);
cImport("getSerializeBuffer",0,importTypes,&getSerializeBuffer);
importTypes[0]=StringBufT;
importTypes[1]=intT;
cImport("deserializeFromBuffer",2,importTypes,&deserializeFromStringBuf);
importTypes[0]=SeqOfObT;
importTypes[1]=StringBufT;
importTypes[2]=intT;
cImport("deserializeFromBuffer",3,importTypes,&deserializeFromStringBuf2);
importTypes[0]=StringBufT;
importTypes[1]=intT;
cImport("deserializeFromFile",2,importTypes,&deserializeFromFile);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("cserializeCollect0",2,importTypes,&serializeCollect0);
cImport("crestoreTempBits",0,importTypes,&restoreTempBits);
importTypes[0]=obT;
cImport("addObToSerialize",1,importTypes,&addObToSerialize);
cImport("resetToSerialize",0,importTypes,&resetToSerialize);
cImport("setPreambleObCount",0,importTypes,&setPreambleObCount);
cImport("setSerializedBindingBits",0,importTypes,&setSerializedBindingBits);
importTypes[0]=obT;
cImport("tempbit",1,importTypes,&ob_tempbit);
importTypes[0]=obT;
importTypes[1]=booleanT;
cImport("set_tempbit",2,importTypes,&ob_set_tempbit);
importTypes[0]=obT;
cImport("tempbit0",1,importTypes,&ob_tempbit0);
importTypes[0]=obT;
importTypes[1]=booleanT;
cImport("set_tempbit0",2,importTypes,&ob_set_tempbit0);
importTypes[0]=BindingT;
cImport("tempbit2",1,importTypes,&Binding_tempbit2);
importTypes[0]=BindingT;
importTypes[1]=booleanT;
cImport("set_tempbit2",2,importTypes,&Binding_set_tempbit2);
importTypes[0]=BindingT;
cImport("kind",1,importTypes,&bindingKind);
importTypes[0]=obT;
cImport("interned",1,importTypes,&ob_interned);
importTypes[0]=obT;
cImport("page",1,importTypes,&ob_page);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("set_page",2,importTypes,&ob_set_page);
cImport("currentPage",0,importTypes,&currentPage);
importTypes[0]=intT;
cImport("setCurrentPage",1,importTypes,&set_currentPage);
importTypes[0]=obT;
cImport("compactobNumFields",1,importTypes,&compactobNumFields);
importTypes[0]=obT;
cImport("compactobProperties",1,importTypes,&compactobProperties);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("selectNthOb",2,importTypes,&selectNthOb);
cImport("mkTypeob",0,importTypes,&mk_Typeob);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("hashtableBindingsSetPage",2,importTypes,&HashtableBindingsSetPage);
importTypes[0]=obT;
cImport("seqDataKind",1,importTypes,&Seq_dataKind);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
cImport("readFromFile",2,importTypes,&Seqbyte_Seqbyte_readFromFile);
importTypes[0]=StringBufT;
importTypes[1]=intT;
cImport("readFromStdin",2,importTypes,&Seqbyte_readFromStdin);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
cImport("writeToFile",2,importTypes,&Seqbyte_Seqbyte_writeToFile);
importTypes[0]=StringBufT;
cImport("filesize",1,importTypes,&Seqbyte_filesize);
importTypes[0]=StringBufT;
cImport("fileExistsI",1,importTypes,&Seqbyte_fileExists);
importTypes[0]=SeqOfObT;
importTypes[1]=StringBufT;
cImport("directoryEntries0",2,importTypes,&Seqob_Seqbyte_directoryEntries);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
importTypes[2]=StringBufT;
importTypes[3]=StringBufT;
cImport("writeToPubFile",4,importTypes,&writeToPubFile);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
importTypes[2]=StringBufT;
cImport("writeToTempFile",3,importTypes,&writeToTempFile);
importTypes[0]=StringBufT;
importTypes[1]=StringBufT;
cImport("writeToUserDir",2,importTypes,&writeToUserDir);
importTypes[0]=StringBufT;
cImport("setUserDir",1,importTypes,&setUserDir);
importTypes[0]=obT;
cImport("cinspect",1,importTypes,&Cinspect);
cImport("timeMsec",0,importTypes,&time_msec);
cImport("time",0,importTypes,&current_time);
cImport("startCount",0,importTypes,&getStartCount);
cImport("pmSteps",0,importTypes,&pmSteps);
cImport("cgiInit",0,importTypes,&cgiInit);
cImport("quit",0,importTypes,&fablQuit);
importTypes[0]=StringBufT;
importTypes[1]=idT;
cImport("getenv",2,importTypes,&Seqbyte_string_getenv);
importTypes[0]=BindingT;
cImport("isConstant",1,importTypes,&Binding_isConstant);
importTypes[0]=BindingT;
importTypes[1]=booleanT;
cImport("set_isConstant",2,importTypes,&Binding_set_isConstant);
cImport("mkRestriction",0,importTypes,&mk_Restriction);
cImport("mkBitField",0,importTypes,&mk_BitField);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("seqintAdd",2,importTypes,&Seqint_add);
importTypes[0]=obT;
importTypes[1]=doubleT;
cImport("seqdoubleAdd",2,importTypes,&Seqdouble_add);
importTypes[0]=obT;
importTypes[1]=obT;
cImport("seqdoubleAppend",2,importTypes,&Seqdouble_append);
importTypes[0]=SeqOfObT;
cImport("mkSmallob",1,importTypes,&mkSmallob_properties);
importTypes[0]=SeqOfByteT;
importTypes[1]=intT;
cImport("selectByte",2,importTypes,&Seqbyte_select);
importTypes[0]=SeqOfByteT;
importTypes[1]=intT;
importTypes[2]=intT;
cImport("setByte",3,importTypes,&Seqbyte_set);
importTypes[0]=SeqOfByteT;
importTypes[1]=intT;
cImport("addByte",2,importTypes,&Seqbyte_add);
cImport("mkSeqOfByte",0,importTypes,&mk_empty_Seqbyte);
cImport("raptorInit",0,importTypes,&raptorInit);
importTypes[0]=SeqOfObT;
importTypes[1]=StringBufT;
importTypes[2]=idT;
cImport("raptorParseFile",3,importTypes,&raptorParseFile);
importTypes[0]=SeqOfObT;
importTypes[1]=StringBufT;
importTypes[2]=idT;
cImport("raptorParseUri",3,importTypes,&raptorParseUri);
importTypes[0]=SeqOfObT;
importTypes[1]=StringBufT;
importTypes[2]=idT;
cImport("raptorParseBuf",3,importTypes,&raptorParseBuf);
cImport("init_www",0,importTypes,&init_www);
importTypes[0]=StringBufT;
cImport("www_fetch",1,importTypes,&www_fetch);
importTypes[0]=intT;
cImport("emitHtmlHeader",1,importTypes,&emitHtmlHeaderWithLength);
cImport("setHttpHeaderEmitted",0,importTypes,&setHttpHeaderEmitted);
cImport("sweepRheap",0,importTypes,&sweep_r_heap);
cImport("sweepTheap",0,importTypes,&sweep_t_heap);
cImport("sweepHeaps",0,importTypes,&sweep_heaps);
cImport("heapStat",0,importTypes,&heap_stat);
cImport("gc",0,importTypes,&gc);
importTypes[0]=booleanT;
cImport("allocStatically",1,importTypes,&alloc_statically);
importTypes[0]=intT;
importTypes[1]=intT;
importTypes[2]=intT;
importTypes[3]=intT;
cImport("gcTest",4,importTypes,&set_gc_test_flags);
cImport("checkStack",0,importTypes,&check_stack);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=obT;
cImport("assert",3,importTypes,&assertOb);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=intT;
cImport("assert",3,importTypes,&assertInt);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=doubleT;
cImport("assert",3,importTypes,&assertDouble);
importTypes[0]=obT;
importTypes[1]=PropertyT;
cImport("count",2,importTypes,&valueCount);
importTypes[0]=obT;
importTypes[1]=PropertyT;
importTypes[2]=TypeT;
cImport("count",3,importTypes,&valueCountOfType);
importTypes[0]=obT;
importTypes[1]=PropertyT;
cImport("mget",2,importTypes,&mgetOb);
importTypes[0]=obT;
importTypes[1]=PropertyT;
cImport("fget",2,importTypes,&fgetOb);
importTypes[0]=PropertyT;
importTypes[1]=intT;
cImport("mkCardinalityRestriction",2,importTypes,&mkCardinalityRestriction);
importTypes[0]=PropertyT;
importTypes[1]=intT;
cImport("mkMaxCardinalityRestriction",2,importTypes,&mkMaxCardinalityRestriction);
importTypes[0]=PropertyT;
importTypes[1]=TypeT;
cImport("mkAllValuesFromRestriction",2,importTypes,&mkAllValuesFromRestriction);
importTypes[0]=PropertyT;
importTypes[1]=obT;
cImport("mkHasValueRestriction",2,importTypes,&mkHasValueRestriction);
importTypes[0]=StringBufT;
cImport("toLiteral",1,importTypes,&toLiteral);
importTypes[0]=TypeT;
importTypes[1]=TypeT;
cImport("isSubClassOf",2,importTypes,&isSubClassOf);
cImport("collectingSubjects",0,importTypes,&nowCollectingSubjects);
importTypes[0]=booleanT;
cImport("set_collectingSubjects",1,importTypes,&set_collectingSubjects);
cImport("collectedSubjects",0,importTypes,&theCollectedSubjects);
importTypes[0]=obT;
cImport("collectSubject",1,importTypes,&collectSubject);
importTypes[0]=doubleT;
cImport("sqrt",1,importTypes,&sqrt);
importTypes[0]=doubleT;
cImport("sin",1,importTypes,&sin);
importTypes[0]=doubleT;
cImport("cos",1,importTypes,&cos);
importTypes[0]=doubleT;
cImport("tan",1,importTypes,&tan);
importTypes[0]=doubleT;
cImport("asin",1,importTypes,&asin);
importTypes[0]=doubleT;
cImport("acos",1,importTypes,&acos);
importTypes[0]=doubleT;
cImport("atan",1,importTypes,&atan);
importTypes[0]=doubleT;
importTypes[1]=doubleT;
cImport("atan2",2,importTypes,&atan2);
importTypes[0]=doubleT;
importTypes[1]=doubleT;
cImport("pow",2,importTypes,&pow);
importTypes[0]=doubleT;
cImport("trunc",1,importTypes,&double_trunc);
importTypes[0]=doubleT;
cImport("round",1,importTypes,&double_round);
importTypes[0]=intT;
importTypes[1]=intT;
cImport("mod",2,importTypes,&mod_fun);
importTypes[0]=doubleT;
cImport("log",1,importTypes,&log);
cImport("rand",0,importTypes,&rand);
importTypes[0]=intT;
cImport("srand",1,importTypes,&srand);
cImport("safeMode",0,importTypes,&getSafeMode);
importTypes[0]=booleanT;
cImport("safeMode",1,importTypes,&setSafeMode);
cImport("memoryAllocated",0,importTypes,&getMemoryAllocated);
cImport("maxMemory",0,importTypes,&getMaxMemory);
importTypes[0]=intT;
cImport("maxMemory",1,importTypes,&setMaxMemory);
cImport("maxPmSteps",0,importTypes,&getMaxPmSteps);
importTypes[0]=intT;
cImport("maxPmSteps",1,importTypes,&setMaxPmSteps);
cImport("maxTempFileSize",0,importTypes,&getMaxTempFileSize);
importTypes[0]=intT;
cImport("maxTempFileSize",1,importTypes,&setMaxTempFileSize);
importTypes[0]=obT;
cImport("xsdKind",1,importTypes,&xsdKind_fun);
importTypes[0]=obT;
importTypes[1]=intT;
cImport("set_xsdKind",2,importTypes,&set_xsdKind_fun);
importTypes[0]=intT;
cImport("toDate",1,importTypes,&intToDate);
importTypes[0]=dateT;
cImport("toInt",1,importTypes,&dateToInt);
importTypes[0]=obT;
cImport("isDate",1,importTypes,&isDate);
importTypes[0]=intT;
cImport("allocTheDelta",1,importTypes,&allocTheDelta);
importTypes[0]=intT;
cImport("recordDeltas",1,importTypes,&recordDeltas);
importTypes[0]=booleanT;
cImport("enableDelta",1,importTypes,&enableDelta);
importTypes[0]=intT;
cImport("resetDelta",1,importTypes,&resetDelta);

}