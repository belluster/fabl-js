var fablVersion = "2.0.8";

var xsdNS = rdfs_Resource__SeqOf_fabl_id___selectUri(root, [ "http", ":", "www.w3.org", "2000", "10", "XMLSchema", "#" ]);

var rdfNS = rdfs_Resource__SeqOf_fabl_id___selectUri(root, [ "http", ":", "www.w3.org", "1999", "02", "22-rdf-syntax-ns", "#" ]);

var owlNS = rdfs_Resource__SeqOf_fabl_id___selectUri(root, [ "http", ":", "www.w3.org", "2002", "07", "owl", "#" ]);

var rdfsNS = rdfs_Resource__SeqOf_fabl_id___selectUri(root, [ "http", ":", "www.w3.org", "2000", "01", "rdf-schema", "#" ]);

var fimp = path[1];

var fabl = path[0];

var cPath = rdfs_Class__mk_emptysequence("<unknown binding type>16unprintable Class");

var Property = rdfs_Resource__fabl_id__selectUri(rdfNS, "Property");

var fabl_int = rdfs_Resource__fabl_id__selectUri(xsdNS, "int");

var fabl_string = rdfs_Resource__fabl_id__selectUri(xsdNS, "string");

var fabl_id = rdfs_Resource__fabl_id__selectUri(fabl, "id");

var fabl_double = rdfs_Resource__fabl_id__selectUri(xsdNS, "double");

var fabl_boolean = rdfs_Resource__fabl_id__selectUri(xsdNS, "boolean");

var fabl_byte = rdfs_Resource__fabl_id__selectUri(xsdNS, "byte");

var fabl_date = rdfs_Resource__fabl_id__selectUri(xsdNS, "date");

var hexBinary = rdfs_Resource__fabl_id__selectUri(xsdNS, "hexBinary");

var Any = rdfs_Resource__fabl_id__selectUri(rdfsNS, "Resource");

var fabl_void = rdfs_Resource__fabl_id__selectUri(fabl, "void");

var ob = Any;

var Resource = Any;

var BitField_lowbit = rdfs_Resource__SeqOf_fabl_id___selectUri(fabl, [ "BitField", "lowbit" ]);

var BitField_highbit = rdfs_Resource__SeqOf_fabl_id___selectUri(fabl, [ "BitField", "highbit" ]);

var BitField_ofProperty = rdfs_Resource__SeqOf_fabl_id___selectUri(fabl, [ "BitField", "ofProperty" ]);

var Restriction_bitField;

rdfs_Resource__SeqOf_fabl_id___selectUri(owlNS, [ "Restriction", "bitField" ]);

var Restriction_allValuesFrom = rdfs_Resource__fabl_id__selectUri(owlNS, "allValuesFrom");

var Restriction_onProperty = rdfs_Resource__fabl_id__selectUri(owlNS, "onProperty");

var List_first = rdfs_Resource__fabl_id__selectUri(rdfNS, "first");

var List_rest = rdfs_Resource__fabl_id__selectUri(rdfNS, "rest");

var Restriction = rdfs_Resource__fabl_id__selectUri(owlNS, "Restriction");

var Xob1 = rdfs_Resource__fabl_id__selectUri(fabl, "Xob1");

var Xob = rdfs_Resource__fabl_id__selectUri(fabl, "Xob");

var Sort = rdfs_Resource__fabl_id__selectUri(rdfsNS, "Class");

var Class = rdfs_Resource__fabl_id__selectUri(rdfsNS, "Class");

var fablType = rdfs_Resource__fabl_id__selectUri(fabl, "Type");

var Xblock = rdfs_Resource__fabl_id__selectUri(fabl, "Xblock");

var Xapply = rdfs_Resource__fabl_id__selectUri(fabl, "Xapply");

var Xsequence = rdfs_Resource__fabl_id__selectUri(fabl, "Xsequence");

var BitField = rdfs_Resource__fabl_id__selectUri(fabl, "BitField");

var Xcast = rdfs_Resource__fabl_id__selectUri(fabl, "Xcast");

var XselectProperty = rdfs_Resource__fabl_id__selectUri(fabl, "XselectProperty");

var XselectIndex = rdfs_Resource__fabl_id__selectUri(fabl, "XselectIndex");

var Xassign = rdfs_Resource__fabl_id__selectUri(fabl, "Xassign");

var Xfor = rdfs_Resource__fabl_id__selectUri(fabl, "Xfor");

var Xwhile = rdfs_Resource__fabl_id__selectUri(fabl, "Xwhile");

var Xreturn = rdfs_Resource__fabl_id__selectUri(fabl, "Xreturn");

var Xblock = rdfs_Resource__fabl_id__selectUri(fabl, "Xblock");

var Xgo = rdfs_Resource__fabl_id__selectUri(fabl, "Xgo");

var Xif = rdfs_Resource__fabl_id__selectUri(fabl, "Xif");

var Dblock = rdfs_Resource__fabl_id__selectUri(fabl, "Dblock");

var Pcode = rdfs_Resource__fabl_id__selectUri(fabl, "Pcode");

var PcodeArg = rdfs_Resource__fabl_id__selectUri(fabl, "PcodeArg");

var TempStackMark = rdfs_Resource__fabl_id__selectUri(fabl, "TempStackMark");

var Token = rdfs_Resource__fabl_id__selectUri(fabl, "Token");

var Regarding = rdfs_Resource__fabl_id__selectUri(fabl, "Regarding");

var DblockLayout = rdfs_Resource__fabl_id__selectUri(fabl, "DblockLayout");

var Function = rdfs_Resource__fabl_id__selectUri(fabl, "Function");

var Binding = rdfs_Resource__fabl_id__selectUri(fabl, "Binding");

var HashSeq = rdfs_Resource__fabl_id__selectUri(fabl, "HashSeq");

var uwriteBuffer = "";

var fabl_true = 1;

var fabl_false;

0;

var SeqOfFunction = rdfs_Class__SeqOf(Function);

var SeqOfOb = rdfs_Class__SeqOf(ob);

var SeqOfId = rdfs_Class__SeqOf(fabl_id);

var SeqOfXob = rdfs_Class__SeqOf(Xob);

var SeqOfType = rdfs_Class__SeqOf(Sort);

var SeqOfBinding = rdfs_Class__SeqOf(Binding);

var SeqOfPcodeArg = rdfs_Class__SeqOf(PcodeArg);

var SeqOfToken = rdfs_Class__SeqOf(Token);

var SeqOfString = rdfs_Class__SeqOf(fabl_string);

var rangeProperty;

rdfs_Class__SeqOf(fabl_string);

var FunctionalProperty = rdfs_Resource__fabl_id__selectUri(owlNS, "FunctionalProperty");

var subClassOf;

rdfs_Resource__fabl_id__selectUri(owlNS, "FunctionalProperty");

var char = fabl_int;

var owlOnProperty = rdfs_Resource__fabl_id__selectUri(owlNS, "onProperty");

var owlAllValuesFrom = rdfs_Resource__fabl_id__selectUri(owlNS, "allValuesFrom");

var owlCardinality = rdfs_Resource__fabl_id__selectUri(owlNS, "cardinality");

var fablRestrictions = rdfs_Resource__fabl_id__selectUri(fabl, "restrictions");

var owlRestrictionBitField;

rdfs_Resource__fabl_id__selectUri(Restriction, "bitField");

var Regarding_value = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Regarding, "value");

var Regarding_aspect = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Regarding, "aspect");

var Sort_constructor = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(fablType, "constructor");

var Sort_param = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(fablType, "param");

var Sort_params = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(fablType, "params");

var Sort_properties = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(fablType, "properties");

var Sort_prototype = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(fablType, "prototype");

var Sort_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(fablType, "booles");

var Binding_value = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Binding, "value");

var Binding_type = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Binding, "type");

var Binding_key = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Binding, "key");

var Xob1_type = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xob1, "type");

var Xob1_name = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xob1, "name");

var Xob1_parent = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xob1, "parent");

var Xob1_value = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xob1, "value");

var Xob1_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xob1, "booles");

var Function_name = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Function, "name");

var Function_definedIn = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Function, "definedIn");

var Function_type = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Function, "type");

var Function_implementation = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Function, "implementation");

var Function_cimp = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Function, "cimp");

var Function_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Function, "booles");

var Xapply_dest = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xapply, "dest");

var Xapply_functionOf = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xapply, "functionOf");

var Xapply_arguments = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xapply, "arguments");

var Xapply_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xapply, "booles");

var Xsequence_dest = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xsequence, "dest");

var Xsequence_elementType = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xsequence, "elementType");

var Xsequence_arguments = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xsequence, "arguments");

var Xsequence_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xsequence, "booles");

var Xcast_castee = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xcast, "castee");

var Xcast_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xcast, "booles");

var XselectProperty_source = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(XselectProperty, "source");

var XselectProperty_selector = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(XselectProperty, "selector");

var XselectProperty_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(XselectProperty, "booles");

var XselectIndex_source = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(XselectIndex, "source");

var XselectIndex_selector = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(XselectIndex, "selector");

var XselectIndex_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(XselectIndex, "booles");

var Xassign_source = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xassign, "source");

var Xassign_dest = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xassign, "dest");

var Xassign_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xassign, "booles");

var Xfor_init = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xfor, "init");

var Xfor_test = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xfor, "test");

var Xfor_incr = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xfor, "incr");

var Xfor_body = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xfor, "body");

var Xfor_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xfor, "booles");

var Xwhile_test = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xwhile, "test");

var Xwhile_incr = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xwhile, "incr");

var Xwhile_body = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xwhile, "body");

var Xwhile_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xwhile, "booles");

var Xreturn_value = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xreturn, "value");

var Xreturn_target = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xreturn, "target");

var Xreturn_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xreturn, "booles");

var Xblock_returnType = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xblock, "returnType");

var Xblock_locals = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xblock, "locals");

var Xblock_statements = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xblock, "statements");

var Xblock_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xblock, "booles");

var Xgo_condition = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xgo, "condition");

var Xgo_toLabel = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xgo, "toLabel");

var Xgo_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xgo, "booles");

var Xif_condition = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xif, "condition");

var Xif_ifTrue = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xif, "ifTrue");

var Xif_ifFalse = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xif, "ifFalse");

var Xif_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Xif, "booles");

var DblockLayout_numobs = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(DblockLayout, "numobs");

var DblockLayout_numints = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(DblockLayout, "numints");

var DblockLayout_doubleoffset = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(DblockLayout, "doubleoffset");

var DblockLayout_numdoubles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(DblockLayout, "numdoubles");

var DblockLayout_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(DblockLayout, "booles");

var Pcode_code = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Pcode, "code");

var Pcode_dblock = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Pcode, "dblock");

var Pcode_dblockPool = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Pcode, "dblockPool");

var Pcode_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Pcode, "booles");

var PcodeArg_kind = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(PcodeArg, "kind");

var PcodeArg_dblockStorage = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(PcodeArg, "dblockStorage");

var PcodeArg_dblockIndex = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(PcodeArg, "dblockIndex");

var PcodeArg_selectionIndex = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(PcodeArg, "selectionIndex");

var PcodeArg_pcodePos = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(PcodeArg, "pcodePos");

var PcodeArg_pcodeLength = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(PcodeArg, "pcodeLength");

var PcodeArg_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(PcodeArg, "booles");

var TempStackMark_obIndex = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(TempStackMark, "obIndex");

var TempStackMark_intIndex = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(TempStackMark, "intIndex");

var TempStackMark_doubleIndex = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(TempStackMark, "doubleIndex");

var Token_datum = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Token, "datum");

var Token_position = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Token, "position");

var Token_booles = rdfs_Resource__fabl_id__assertUriChildAsFunctionalProperty(Token, "booles");

var Xob1_labels = rdfs_Resource__fabl_id__selectUri(Xob1, "labels");

var Xob1_isNoop = 1;

var Xob1_isConstant;

0;

var XselectProperty_isBitField;

0;

var XselectProperty_isFunctional = 1;

var Xreturn_blockReturn;

0;

var Xreturn_loopBreak = 1;

var Xreturn_loopContinue = 2;

var Xgo_goIfFalse;

0;

var Xblock_isFunctionBody;

0;

var Xassign_addValue;

0;

var Token_isInfix;

0;

var Token_isPrefix = 1;

var Token_isPostfix = 2;

var Token_isTerminator = 3;

var Token_isOperator = 4;

var Token_isAtom = 5;

var Token_isKeyword = 6;

var Token_isNumber = 7;

var Token_isString = 8;

var Token_isId = 9;

var stringbufReset_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "reset", [ fabl_string ]);

var stringBuf_tprint_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "tprint", [ fabl_string ]);

var stringStringPlus_fun;

rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "plus", [ fabl_string, fabl_string ]);

var stringStringTimes_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "times", [ fabl_string, fabl_string ]);

var terpri_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "terpri", rdfs_Class__mk_emptysequence("<unprintable>"));

function afterError() {}

function beforeError() {}

var afterError_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "afterError", rdfs_Class__mk_emptysequence("<unprintable>"));

var beforeError_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "beforeError", rdfs_Class__mk_emptysequence("<unprintable>"));

var new_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "iNew", [ Sort ]);

var mk_emptyseq_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "mk_emptysequence", [ Sort ]);

var seqLength_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqLength", [ ob ]);

var seqobAdd_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqobAdd", [ ob, ob ]);

var seqReset_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqReset", [ ob ]);

var seqCopy_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqCopy", [ ob ]);

var seqobCopy_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqCopy", [ ob ]);

var seqSetLength_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqSetLength", [ ob, fabl_int ]);

var seqintAdd_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqintAdd", [ ob, fabl_int ]);

var seqbyteAdd_fun;

rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqbyteAdd", [ ob, fabl_byte ]);

var seqdoubleAdd_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqdoubleAdd", [ ob, fabl_double ]);

var seqobAppend_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqobAppend", [ ob, ob ]);

var seqintAppend_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqintAppend", [ ob, ob ]);

var seqbyteAppend_fun;

rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqbyteAppend", [ ob, ob ]);

var seqdoubleAppend_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqdoubleAppend", [ ob, ob ]);

var seqLength_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqLength", [ ob ]);

var seqobContains_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqobContains", [ ob, ob ]);

var seqintContains_fun;

rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqintContains", [ ob, fabl_int ]);

var seqbyteContains_fun;

rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqbyteContains", [ ob, fabl_byte ]);

var seqdoubleContains_fun;

rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "seqdoubleContains", [ ob, fabl_double ]);

var obassert_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "assert", [ ob, Property, ob ]);

var intassert_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "assert", [ ob, Property, fabl_int ]);

var doubleassert_fun = rdfs_Resource__fabl_id__SeqOf_rdfs_Class___getVariant(home, "assert", [ ob, Property, fabl_double ]);

function ____times(s, tp) {
    var s;
    var tp;
}

var null_pcode_arg = -1;

var pam_local;

0;

var pam_local_eob_select = 1;

var pam_binding_value = 2;

var pam_binding_eob_select = 3;

var pam_local_field_select = 4;

var pam_local_sequence_select = 5;

var pam_binding_field_select = 6;

var pam_binding_sequence_select = 7;

var storage_bit = 3;

var storage_byte = 4;

var storage_short = 5;

var jump_s_op = 1;

var iftrue_s_op = 4;

var iffalse_s_op = 7;

var switch_s_op = 10;

var call_op = 12;

var assign_call_op = 13;

var assign_op = 14;

var copyto_op = 15;

var return_op = 16;

var return_void_op = 17;

var noop_op = 18;

var integer_minus_op = 32;

var integer_increment_op = 33;

var integer_decrement_op = 34;

var integer_plus_op = 35;

var integer_difference_op = 36;

var integer_quotient_op = 37;

var integer_times_op = 38;

var integer_equal_op = 39;

var integer_lessp_op = 40;

var integer_leq_op = 41;

var integer_not_op = 42;

var integer_and_op = 43;

var integer_or_op = 44;

var integer_lshift_op = 45;

var integer_float_op = 46;

var boole_not_op = 47;

var boole_and_op = 48;

var boole_or_op = 49;

var ob_nul_op = 50;

var ob_nnul_op = 51;

var sequence_op = 52;

var seqob_get_op = 53;

var seqint_get_op = 54;

var seqbyte_get_op = 55;

var seqob_put_op = 56;

var seqint_put_op = 57;

var seqbyte_put_op = 58;

var noreturn_increment_op = 59;

var noreturn_decrement_op = 60;

var ob_eq_op = 61;

var double_minus_op = 64;

var double_increment_op = 65;

var double_decrement_op = 66;

var double_plus_op = 67;

var double_difference_op = 68;

var double_quotient_op = 69;

var double_times_op = 70;

var double_equal_op = 71;

var double_lessp_op = 72;

var double_leq_op = 73;

var seqdouble_get_op = 74;

var seqdouble_put_op = 75;

var arrayob_get_op = 76;

var arrayint_get_op = 77;

var arraydouble_get_op = 78;

var arraychar_get_op = 79;

var arrayob_put_op = 80;

var arrayint_put_op = 81;

var arraydouble_put_op = 82;

var arraychar_put_op = 83;

var ob_selectproperty_op = 84;

var integer_selectproperty_op = 85;

var double_selectproperty_op = 86;

var ob_setproperty_op = 87;

var integer_setproperty_op = 88;

var double_setproperty_op = 89;

var bit_selectproperty_op = 90;

var bit_setproperty_op = 91;

var stringbuf_get_op = 92;

var stringbuf_put_op = 93;

var ob_mselectproperty_op = 94;

var double_greaterp_op = 254;

var double_geq_op = 255;

var integer_greaterp_op = 256;

var integer_geq_op = 257;

var opKinds = __mk_emptysequence("<unprintable>");

var opNames = __mk_emptysequence("<unprintable>");

var opKind_int_int = 1;

var opKind_int_int_int = 2;

var opKind_call = 3;

var opKind_int_ob = 4;

function initOpKinds() {
    var i;
    ____seqintExpand(opKinds, 100);
    opKinds[integer_minus_op] = opKind_int_int;
    opKinds[integer_not_op] = opKind_int_int;
    opKinds[boole_not_op] = opKind_int_int;
    for (i = 35; i <= 41; i++) opKinds[i] = opKind_int_int_int;
    for (i = 43; i <= 45; i++) opKinds[i] = opKind_int_int_int;
    for (i = 48; i <= 49; i++) opKinds[i] = opKind_int_int_int;
    opKinds[call_op] = opKind_call;
    opKinds[assign_call_op] = opKind_call;
    opKinds[ob_nul_op] = opKind_int_ob;
    opKinds[ob_nnul_op] = opKind_int_ob;
}

initOpKinds();

function initOpNames() {
    ____seqobExpand(opNames, 100);
    opNames[jump_s_op] = "jump_s";
    opNames[iftrue_s_op] = "iftrue_s";
    opNames[iffalse_s_op] = "iffalse_s";
    opNames[switch_s_op] = "switch_s";
    opNames[call_op] = "call";
    opNames[assign_call_op] = "assign_call";
    opNames[assign_op] = "assign";
    opNames[copyto_op] = "copyto";
    opNames[return_op] = "return";
    opNames[return_void_op] = "return_void";
    opNames[noop_op] = "noop";
    opNames[integer_minus_op] = "minus";
    opNames[integer_increment_op] = "increment";
    opNames[integer_decrement_op] = "decrement";
    opNames[integer_plus_op] = "plus";
    opNames[integer_difference_op] = "difference";
    opNames[integer_quotient_op] = "quotient";
    opNames[integer_times_op] = "times";
    opNames[integer_equal_op] = "equal";
    opNames[integer_lessp_op] = "lessp";
    opNames[integer_leq_op] = "leq";
    opNames[integer_not_op] = "lnot";
    opNames[integer_and_op] = "land";
    opNames[integer_or_op] = "lor";
    opNames[integer_lshift_op] = "lshift";
    opNames[integer_float_op] = "float";
    opNames[boole_not_op] = "not";
    opNames[boole_and_op] = "and";
    opNames[boole_or_op] = "or";
    opNames[ob_nul_op] = "nul";
    opNames[ob_nnul_op] = "nnul";
    opNames[ob_eq_op] = "eq";
    opNames[sequence_op] = "sequence";
    opNames[seqob_get_op] = "seqob_get";
    opNames[seqint_get_op] = "seqint_get";
    opNames[seqbyte_get_op] = "seqbyte_get";
    opNames[seqint_put_op] = "seqint_put";
    opNames[seqob_put_op] = "seqob_put";
    opNames[seqbyte_put_op] = "seqbyte_put";
    opNames[arrayob_get_op] = "arrayob_get";
    opNames[arrayint_get_op] = "arrayint_get";
    opNames[arraychar_get_op] = "arraychar_get";
    opNames[arrayint_put_op] = "arrayint_put";
    opNames[arrayob_put_op] = "arrayob_put";
    opNames[arraychar_put_op] = "arraychar_put";
    opNames[double_plus_op] = "double_plus";
    opNames[double_difference_op] = "double_difference";
    opNames[double_quotient_op] = "double_quotient";
    opNames[double_times_op] = "double_times";
    opNames[double_equal_op] = "double_equal";
    opNames[double_lessp_op] = "double_lessp";
    opNames[double_leq_op] = "double_leq";
    opNames[noreturn_increment_op] = "increment_noreturn";
    opNames[noreturn_decrement_op] = "decrement_noreturn";
    opNames[ob_selectproperty_op] = "ob_selectproperty_op";
    opNames[integer_selectproperty_op] = "integer_selectproperty_op";
    opNames[double_selectproperty_op] = "double_selectproperty_op";
    opNames[ob_setproperty_op] = "ob_setproperty_op";
    opNames[integer_setproperty_op] = "integer_setproperty_op";
    opNames[double_setproperty_op] = "double_setproperty_op";
}

initOpNames();

var int_kind = 1;

var string_kind = 3;

var nstring_kind = 3;

var wstring_kind = 4;

var double_kind = 2;

var nil_kind = 4;

var ob_kind;

0;

var dblock_kind = 5;

var hashtable_kind = 16;

var compact_kind = 17;

var binding_kind = 18;

var smallob_kind = 19;

var pm_stack_kind = 23;

var seq_kind = 24;

var values_kind = 25;

var seqDataOb_kind = 8;

var seqDataByte_kind = 9;

var seqDataShort_kind = 10;

var seqDataInt_kind = 11;

var seqDataDouble_kind = 12;

var ob = Any;

function __isObject(x) {
    var x;
    return __obkind(x) > 15;
}

var typeP = ____selectUri(rdfNS, "type");

var typesInt = [ fabl_int ];

var typesDouble = [ fabl_double ];

var typesBinding = [ Binding ];

var typesNone = __mk_emptysequence("<unprintable>");

var typesString = [ fabl_id ];

function __SeqOf(s) {
    var s;
    return ____mkParamType("SeqOf", s);
}

function __BagOf(s) {
    var s;
    return ____mkParamType("BagOf", s);
}

function __AltOf(s) {
    var s;
    return ____mkParamType("AltOf", s);
}

var Bag = "rdf:Bag";

var Alt = "rdf:Alt";

var BagOfOb = __BagOf(ob);

var AltOfOb = __AltOf(ob);

var BagOfInt = __BagOf(fabl_int);

var AltOfInt = __AltOf(fabl_int);

var BagOfDouble = __BagOf(fabl_double);

var AltOfDouble = __AltOf(fabl_double);

function __isBinding(x) {
    var x;
    return __obkind(x) === binding_kind;
}

function __type(b) {
    var b;
    var rs;
    rs = ____obsel(b, Binding_type);
    if (!rs) rs = ob;
    return rs;
}

function __value(b) {
    var b;
    return ____obsel(b, Binding_value);
}

function __Xobish(x) {
    var x;
    if (__isObject(x)) return !(__isBinding(x) || __isFunction(x));
    return fabl_false;
}

function __Xobish(x) {
    var x;
    var xo;
    xo = x;
    if (__isObject(xo)) return !(__isBinding(xo) || __isFunction(xo));
    return fabl_false;
}

function ____equal(x, y) {
    var x;
    var y;
    return ____um_eq(x, y);
}

function __mkXob(tp) {
    var tp;
    var rs;
    rs = __iNew(Xob1);
    rs["[unnamed Property]"] = tp;
    return rs;
}

function mkNoopXob() {
    var rs;
    rs = __mkXob(fabl_void);
    ________bitset(rs, Xob1_booles, Xob1_isNoop, 1);
    return rs;
}

var storage_int = 1;

var storage_ob;

0;

var storage_double = 2;

function __storage(tp) {
    var tp;
    if (tp === fabl_int || tp === fabl_boolean || tp === fabl_byte) return storage_int;
    if (tp === fabl_double) return storage_double;
    return storage_ob;
}

function __nulValue(x) {
    var x;
    var s;
    s = __storage(x);
    if (s === storage_ob) return null;
    if (s === storage_int) return __integer_to_ob(0);
    return __toDoubleOb(0);
}

function ______assertDefaultValue(bn, nm, s) {
    var bn;
    var nm;
    var s;
    return ________set(bn, nm, __nulValue(s), s);
}

function ________bindLocal(bn, nm, vl, s) {
    var bn;
    var nm;
    var vl;
    var s;
    var rs;
    if (translateJS) __________translateToJS(bn, nm, vl, s, fabl_true);
    rs = ________set(bn, __regarding(nm), vl, s);
    ____setInDblock(rs, fabl_true);
    return rs;
}

function ______bindLocal(bn, nm, s) {
    var bn;
    var nm;
    var s;
    var rs;
    if (translateJS) __________translateToJS(bn, nm, __nulValue(s), s, fabl_true);
    rs = ________set(bn, __regarding(nm), __nulValue(s), s);
    ____setInDblock(rs, fabl_true);
    return rs;
}

function ________bindGlobal(x, nm, vl, s) {
    var x;
    var nm;
    var vl;
    var s;
    var gpr;
    gpr = __regarding(nm);
    if (translateJS) __________translateToJS(x, nm, vl, s, fabl_false);
    return ________set(x, gpr, vl, s);
}

function ______hasValueAndType(b, vl, s) {
    var b;
    var vl;
    var s;
    var bvl;
    var st;
    if (!(__type(b) === s)) return fabl_false;
    bvl = __value(b);
    st = __storage(s);
    if (st === storage_ob) return ____um_eq(bvl, vl);
    if (st === storage_int) return __ob_to_integer(bvl) === __ob_to_integer(vl);
    return __toDouble(bvl) === __toDouble(vl);
}

function ________bindConstant(x, nm, vl, s) {
    var x;
    var nm;
    var vl;
    var s;
    var gpr;
    var b;
    var cb;
    var ctp;
    gpr = __regarding(nm);
    cb = ____selectBinding(x, gpr);
    if (cb) {
        if (__isConstant(cb)) {
            if (______hasValueAndType(cb, vl, s)) return cb;
            {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Cannot modify a constant: ");
                ____times(uwriteBuffer, nm);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        } else {
            ctp = __type(cb);
            if (!ctp || ctp === ob) {
                if (!____um_eq(s, ctp)) ______obset(cb, Binding_type, s);
                ______set(x, gpr, vl);
                ____set_isConstant(cb, fabl_true);
            } else {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Cannot modify type of ");
                ____times(uwriteBuffer, nm);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
        return cb;
    }
    b = ________set(x, gpr, vl, s);
    if (b) ____set_isConstant(b, fabl_true); else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot bind as constant ");
        ____times(uwriteBuffer, nm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______bindGlobal(x, nm, s) {
    var x;
    var nm;
    var s;
    return ________bindGlobal(x, nm, __nulValue(s), s);
}

function ____selectBinding(x, nm) {
    var x;
    var nm;
    var gpr;
    gpr = __regarding(nm);
    return ____selectBinding(x, gpr);
}

function ____selectGlobalBinding(x, nm) {
    var x;
    var nm;
    return ____selectBinding(x, nm);
}

function ____selectBinding(x, nm) {
    var x;
    var nm;
    var gpr;
    var ln;
    var i;
    var b;
    ln = __seqLength(x);
    gpr = __regarding(nm);
    for (i = ln - 1; i >= 0; i--) {
        b = ____selectBinding(x[i], gpr);
        if (b) return b;
    }
    return null;
}

function ____get(x, nm) {
    var x;
    var nm;
    return ____get(x, __regarding(nm));
}

function ____globalValue(cn, nm) {
    var cn;
    var nm;
    var b;
    b = ____selectBinding(cn, nm);
    if (!b) return null;
    return __bindingValue(b);
}

var regardingPath = __regarding("path");

function homePath() {
    var b;
    b = ____selectBinding(home, regardingPath);
    if (!b) return null;
    return __bindingValue(b);
}

var buildingFimp;

fabl_false;

var analyzingFunction;

fabl_false;

function homeFimp() {
    if (buildingFimp) return home; else return fimp;
}

var missingFimpFuns = __mk_emptysequence("<unprintable>");

function __homeFimpFun(nm) {
    var nm;
    var rs;
    var rnm;
    rnm = __regarding(nm);
    if (buildingFimp && analyzingFunction) {
        rs = ____get(home, rnm);
        if (!rs) {
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Warning: homeFimpFun missing function:");
                ____times(uwriteBuffer, nm);
                __tprint(uwriteBuffer);
                terpri();
            }
            ____seqobAdd(missingFimpFuns, nm);
            rs = ____get(fimp, rnm);
        }
    } else rs = ____get(fimp, rnm);
    return rs;
}

function __type(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === int_kind) return fabl_int;
    if (k === string_kind) return fabl_id;
    if (k === double_kind) return fabl_double;
    if (__isBinding(x)) return __type(x);
    if (__isFunction(x)) return ____obsel(x, Function_type);
    return ____obsel(x, Xob1_type);
}

function ____setParent(x, y) {
    var x;
    var y;
    if (__Xobish(x)) ______obset(x, Xob1_parent, y);
}

function __regarding(nm) {
    var nm;
    return __regarding(nm);
}

function __isId(x) {
    var x;
    var k;
    k = __obkind(x);
    return k === nstring_kind || k === wstring_kind;
}

function __isString(x) {
    var x;
    var k;
    var dk;
    k = __obkind(x);
    if (k === seq_kind) {
        dk = __seqDataKind(x);
        return dk === seqDataByte_kind;
    }
    return fabl_false;
}

function ____assertUriChildAsProperty(x, y) {
    var x;
    var y;
    var rs;
    rs = ____selectUri(x, y);
    ____setType(rs, Property);
    return rs;
}

function ____assertUriChildAsFunctionalProperty(x, y) {
    var x;
    var y;
    var rs;
    rs = ____selectUri(x, y);
    ____setType(rs, FunctionalProperty);
    return rs;
}

var lhwm = 65535;

var hhwm = -65536;

var byte0_mask = 255;

var byte1_mask = 65280;

var byte2_mask = 16711680;

var byte3_mask = -16777216;

function __highHalf(x) {
    var x;
    return ____lshift(x, -16);
}

function __low_half(x) {
    var x;
    return ____land(x, lhwm);
}

function ____setLowHalf(x, y) {
    var x;
    var y;
    return ____lor(____land(x, hhwm), ____land(y, lhwm));
}

function ____setHighHalf(x, y) {
    var x;
    var y;
    return ____lor(____lshift(y, 16), ____land(x, lhwm));
}

function __byte0(x) {
    var x;
    return ____land(x, byte0_mask);
}

function __byte1(x) {
    var x;
    return ____land(____lshift(x, -8), byte0_mask);
}

function __byte2(x) {
    var x;
    return ____land(____lshift(x, -16), byte0_mask);
}

function __byte3(x) {
    var x;
    return ____land(____lshift(x, -24), byte0_mask);
}

function ____setByte0(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte0_mask)), ____land(y, byte0_mask));
}

function ____setByte0(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte0_mask)), y);
}

function ____setByte1(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte1_mask)), ____lshift(____land(y, byte0_mask), 8));
}

function ____setByte1(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte1_mask)), ____lshift(y, 8));
}

function ____setByte2(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte2_mask)), ____lshift(____land(y, byte0_mask), 16));
}

function ____setByte2(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte2_mask)), ____lshift(y, 16));
}

function ____setByte3(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte3_mask)), ____lshift(____land(y, byte0_mask), 24));
}

function ____setByte3(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte3_mask)), ____lshift(y, 24));
}

function __toHex(x) {
    var x;
    var s;
    var i;
    var cx;
    var ln;
    s = "        ";
    cx = x;
    for (i = 0; i < 8; i++) {
        ln = ____land(cx, 15);
        if (ln < 10) ______set(s, 7 - i, 48 + ln); else ______set(s, 7 - i, 87 + ln);
        cx = ____lshift(cx, -4);
    }
    return s;
}

function ______to_hex(rs, x, numdigits) {
    var rs;
    var x;
    var numdigits;
    var i;
    var cx;
    var ln;
    var lnr;
    for (i = 0; i < numdigits; i++) ____times(rs, "0");
    lnr = __length(rs) - 1;
    cx = x;
    for (i = 0; i < numdigits; i++) {
        ln = ____land(cx, 15);
        if (ln < 10) ______set(rs, lnr - i, 48 + ln); else ______set(rs, lnr - i, 87 + ln);
        cx = ____lshift(cx, -4);
    }
}

function __toInt(x) {
    var x;
    if (x) return 1;
    return 0;
}

function ____equal(a, b) {
    var a;
    var b;
    return ____um_eq(a, b);
}

var regardingNamespaces = __regarding("namespaces");

function homeNamespaces() {
    var nms;
    nms = ____get(home, regardingNamespaces);
    if (!nms) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Home is missing namespaces property");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return nms;
}

function __car(x) {
    var x;
    return ____listSelect(x, 0);
}

function __cdr(x) {
    var x;
    if (!__isList(x)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "cdr of non-list");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____obsel(x, List_rest);
}

function __cadr(x) {
    var x;
    return ____listSelect(x, 1);
}

function __caddr(x) {
    var x;
    return ____listSelect(x, 2);
}

function __cadddr(x) {
    var x;
    return ____listSelect(x, 3);
}

function __garbageCollection(v) {
    var v;
    __allocStatically(!v);
}

function __list1(x) {
    var x;
    return ____cons(x, "rdf:nil");
}

function ____list2(x, y) {
    var x;
    var y;
    return ____cons(x, ____cons(y, "rdf:nil"));
}

function ______list3(x, y, z) {
    var x;
    var y;
    var z;
    return ____cons(x, ____cons(y, ____cons(z, "rdf:nil")));
}

function ________list4(x, y, z, z2) {
    var x;
    var y;
    var z;
    var z2;
    return ____cons(x, ____cons(y, ____cons(z, ____cons(z2, "rdf:nil"))));
}

function __________list5(x, y, z, z2, z3) {
    var x;
    var y;
    var z;
    var z2;
    var z3;
    return ____cons(x, ____cons(y, ____cons(z, ____cons(z2, ____cons(z3, "rdf:nil")))));
}

function __toList(a) {
    var a;
    var rs;
    var ln;
    var i;
    if (!a) return "rdf:nil";
    ln = __seqLength(a);
    rs = "rdf:nil";
    for (i = ln - 1; i >= 0; i--) rs = ____cons(a[i], rs);
    return rs;
}

function __listNul(x) {
    var x;
    return !x || ____um_eq(x, "rdf:nil");
}

function __abs(x) {
    var x;
    if (x < 0) return -x;
    return x;
}

function ____max(x, y) {
    var x;
    var y;
    if (x < y) return y;
    return x;
}

function ____min(x, y) {
    var x;
    var y;
    if (x < y) return x;
    return y;
}

function __abs(x) {
    var x;
    if (x < __float(0)) return -x;
    return x;
}

function ____max(x, y) {
    var x;
    var y;
    if (x < y) return y;
    return x;
}

function ____min(x, y) {
    var x;
    var y;
    if (x < y) return x;
    return y;
}

var pi = 3.141593;

var degreesToRadians = ____quotient(pi, 180);

var radiansToDegrees = ____quotient(180, pi);

function __byte_to_hex(cn) {
    var cn;
    var rs;
    var n;
    n = cn;
    if (n < 48) return -1;
    if (n <= 57) return n - 48;
    if (n < 65) return -1;
    if (n <= 70) return 10 + n - 65;
    if (n < 97) return -1;
    if (n <= 102) return 10 + n - 97;
    return -1;
}

function __hex(x) {
    var x;
    var n;
    var i;
    var rs;
    var cv;
    var ln;
    ln = __length(x);
    n = 0;
    rs = 0;
    for (i = 0; i < ln; i++) {
        cv = __byte_to_hex(____select(x, i));
        if (cv < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "not a lower-case hex number: ");
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rs = ____times(rs, 16) + cv;
    }
    return rs;
}

function __hex(x) {
    var x;
    var n;
    var i;
    var rs;
    var cv;
    var ln;
    ln = __length(x);
    n = 0;
    rs = 0;
    for (i = 0; i < ln; i++) {
        cv = __byte_to_hex(____select(x, i));
        if (cv < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "not a lower-case hex number: ");
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rs = ____times(rs, 16) + cv;
    }
    return rs;
}

function __int2str(x) {
    var x;
    var sb;
    sb = 1;
    ____times(sb, x);
    return __toString(sb);
}

function __funsig_numobs(x) {
    var x;
    return ____land(x, 15);
}

function __funsig_numints(x) {
    var x;
    return ____lshift(____land(x, 240), -4);
}

function __funsig_numdoubles(x) {
    var x;
    return ____lshift(____land(x, 3840), -8);
}

function __________setsig(fn, rts, numobs, numints, numdoubles) {
    var fn;
    var rts;
    var numobs;
    var numints;
    var numdoubles;
    var b;
    b = ____intsel(fn, Function_booles);
    ______intset(fn, Function_booles, ____setLowHalf(b, ____lor(numobs, ____lor(____lshift(numints, 4), ____lshift(numdoubles, 8)))));
}

function __getsig(fn) {
    var fn;
    return __low_half(____intsel(fn, Function_booles));
}

function __inputTypes(srt) {
    var srt;
    var cns;
    cns = ____get(srt, Sort_constructor);
    if (!(cns === "Function")) return null;
    return ____obsel(srt, Sort_params);
}

function __resultType(srt) {
    var srt;
    var cns;
    cns = ____get(srt, Sort_constructor);
    if (!cns) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected Function type");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (!(cns === "Function")) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected Function type: encountered ");
        ____times(uwriteBuffer, cns);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____obsel(srt, Sort_param);
}

function ________mkFunction(df, nm, tp, impl) {
    var df;
    var nm;
    var tp;
    var impl;
    var ci;
    var rtp;
    var sti;
    var ln;
    var i;
    var numo;
    var numi;
    var numr;
    var rs;
    var isrts;
    isrts = __inputTypes(tp);
    rtp = __resultType(tp);
    if (!isrts) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Sort of function is non-functional: ");
        ____times(uwriteBuffer, nm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ln = __seqLength(isrts);
    numi = 0;
    numo = 0;
    numr = 0;
    for (i = 0; i < ln; i++) {
        ci = isrts[i];
        sti = __storage(ci);
        if (sti === storage_ob) numo++; else if (sti === storage_int) numi++; else numr++;
    }
    rs = ______mkFunctionOb(nm, df, tp);
    ______obset(rs, Function_implementation, impl);
    __________setsig(rs, __storage(rtp), numo, numi, numr);
    return rs;
}

function __________mkFunction(df, nm, resulttype, isrts, impl) {
    var df;
    var nm;
    var resulttype;
    var isrts;
    var impl;
    var tp;
    tp = ____mkFunctionType(resulttype, isrts);
    return ________mkFunction(df, nm, tp, impl);
}

function ________mkFunction(df, nm, resulttype, isrts) {
    var df;
    var nm;
    var resulttype;
    var isrts;
    return __________mkFunction(df, nm, resulttype, isrts, null);
}

function ______mkFunction(df, nm, srt) {
    var df;
    var nm;
    var srt;
    return ________mkFunction(df, nm, srt, null);
}

var variantsP = ____selectUri(fabl, "functionVariants");

function ____variants(cn, nm) {
    var cn;
    var nm;
    var vrs;
    vrs = ____get(cn, variantsP);
    if (!vrs) return null;
    return ____get(vrs, __regarding(nm));
}

function __allocateVariantsObject(cn) {
    var cn;
    var vrs;
    vrs = ____get(cn, variantsP);
    if (!vrs) {
        vrs = mkResource();
        ________set(cn, variantsP, vrs, ob);
    }
    return vrs;
}

function ______sameInputTypes(x, y, st) {
    var x;
    var y;
    var st;
    var ix;
    var iy;
    var lnx;
    var lny;
    var i;
    ix = __inputTypes(x);
    iy = __inputTypes(y);
    if (____um_eq(ix, iy)) return fabl_true;
    if (!ix || !iy) return fabl_false;
    lnx = __seqLength(ix);
    lny = __seqLength(iy);
    if (!(lnx === lny)) return fabl_false;
    for (i = st; i < lnx; i++) {
        if (!____um_eq(ix[i], iy[i])) return fabl_false;
    }
    return fabl_true;
}

function ________internFunction(cn, nm, fns, pcd) {
    var cn;
    var nm;
    var fns;
    var pcd;
    var fn;
    var fni;
    var vrs;
    var vrsq;
    var rnm;
    fn = ________mkFunction(cn, nm, fns, pcd);
    fni = __identifyFunction(fn);
    if (fni) {
        ______obset(fni, Function_implementation, pcd);
        return fni;
    }
    fni = __internFunction(fn);
    vrs = __allocateVariantsObject(cn);
    rnm = __regarding(nm);
    vrsq = ____get(vrs, rnm);
    if (!vrsq) {
        vrsq = [ fni ];
        ________set(vrs, rnm, vrsq, ob);
    } else ____seqobAdd(vrsq, fni);
    return fni;
}

function ______internFunction(cn, nm, fns) {
    var cn;
    var nm;
    var fns;
    return ________internFunction(cn, nm, fns, null);
}

function ______internFunction(cn, nm, fns) {
    var cn;
    var nm;
    var fns;
    return ________internFunction(cn, nm, fns, null);
}

function ________internFunction(cn, nm, rtp, itps) {
    var cn;
    var nm;
    var rtp;
    var itps;
    return ______internFunction(cn, nm, ____mkFunctionType(rtp, itps));
}

function ________internCFunction(cn, nm, rtp, itps) {
    var cn;
    var nm;
    var rtp;
    var itps;
    var rs;
    var ccimp;
    var fv;
    rs = ______internFunction(cn, nm, ____mkFunctionType(rtp, itps));
    fv = ______getVariant(fimp, nm, itps);
    if (fv) {
        ccimp = ____intsel(fv, Function_cimp);
        ______intset(rs, Function_cimp, ccimp);
    }
    return rs;
}

function ____times(s, r) {
    var s;
    var r;
    var prp;
    var avf;
    var crd;
    var hsv;
    prp = ____fget(r, "owl:onProperty");
    avf = ____fget(r, "owl:allValuesFrom");
    if (avf) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": allValuesFrom ");
            ____times(s, avf);
            ____times(s, "]");
        }
        return;
    }
    crd = ____intsel(r, "owl:cardinality");
    if (crd > 0) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": cardinality ");
            ____times(s, crd);
            ____times(s, "]");
        }
        return;
    }
    crd = ____intsel(r, "owl:maxCardinality");
    if (crd > 0) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": maxCardinality ");
            ____times(s, crd);
            ____times(s, "]");
        }
        return;
    }
    hsv = ____fget(r, "owl:hasValue");
    if (hsv) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": hasValue ");
            ____times(s, hsv);
            ____times(s, "]");
        }
        return;
    }
}

var printQualifiedClassNames = fabl_true;

function xsd_string__rdfs_Class__times(s, tp) {
    var s;
    var tp;
    var nm;
    var cns;
    var cm;
    var rtp;
    var sbt;
    var itps;
    var ln;
    var i;
    if (rdfs_Resource__rdfs_Resource__um_eq(rdfs_Resource__type0(tp), Restriction)) {
        xsd_string__owl_Restriction__times(s, tp);
        return;
    }
    nm = rdfs_Resource__name(tp);
    if (!nm) {
        cns = rdfs_Resource__rdf_Property__obsel(tp, Sort_constructor);
        if (!cns) {
            xsd_string__fabl_id__times(s, "unprintable Class");
            return;
        }
        if (cns === "Function") {
            rtp = rdfs_Class__resultType(tp);
            itps = rdfs_Class__inputTypes(tp);
            xsd_string__fabl_id__times(s, "Function(");
            xsd_string__rdfs_Class__times(s, rtp);
            ln = rdfs_Resource__seqLength(itps);
            for (i = 0; i < ln; i++) {
                xsd_string__fabl_id__times(s, ",");
                xsd_string__rdfs_Class__times(s, itps[i]);
            }
            xsd_string__fabl_id__times(s, ")");
        } else {
            sbt = rdfs_Resource__rdf_Property__obsel(tp, Sort_param);
            xsd_string__fabl_id__times(s, cns);
            xsd_string__fabl_id__times(s, "(");
            xsd_string__rdfs_Class__times(s, sbt);
            xsd_string__fabl_id__times(s, ")");
        }
    } else {
        if (printQualifiedClassNames) {
            if (!xsd_string__rdfs_Resource__qualifiedName(s, tp)) xsd_string__fabl_id__times(s, nm);
        } else xsd_string__fabl_id__times(s, nm);
    }
}

var obToInt_fun = ______getVariant(home, "ob_to_integer", [ ob ]);

var obToDouble_fun = ______getVariant(home, "toDouble", [ ob ]);

var doubleToOb_fun = ______getVariant(home, "toOb", [ fabl_double ]);

var funReturnType;

______getVariant(home, "toOb", [ fabl_double ]);

var blockReturnType;

______getVariant(home, "toOb", [ fabl_double ]);

var not_fun;

______getVariant(home, "toOb", [ fabl_double ]);

function __meta(n) {
    var n;
    return __integer_to_ob(n);
}

function __meta(n) {
    var n;
    return __toOb(n);
}

function ____meta(x, s) {
    var x;
    var s;
    var rs;
    if (s === fabl_int || s === fabl_double || s === fabl_id) return x;
    rs = __mkXob(s);
    ______obset(rs, Xob1_value, x);
    ________bitset(rs, Xob1_booles, Xob1_isConstant, 1);
    return rs;
}

var nulXob = ____meta(null, ob);

function __meta(n) {
    var n;
    if (!n) return nulXob; else return n;
}

function __meta(s) {
    var s;
    return ____meta(s, Sort);
}

var typesXapply = [ Xob, Xapply ];

function ________metaApplyn(dst, rt, fn, args) {
    var dst;
    var rt;
    var fn;
    var args;
    var rs;
    var xb;
    var a;
    var ln;
    var i;
    rs = __iNew(Xapply);
    xb = rs;
    ______obset(rs, Xapply_dest, dst);
    ______obset(rs, Xapply_functionOf, fn);
    ______obset(rs, Xapply_arguments, args);
    ______obset(rs, Xob1_type, rt);
    ln = __seqLength(args);
    for (i = 0; i < ln; i++) {
        a = args[i];
        if (__Xobish(a)) ____setParent(a, xb);
    }
    return xb;
}

function ______metaApplyn(dst, fn, args) {
    var dst;
    var fn;
    var args;
    var rt;
    var rs;
    var xb;
    var a;
    var ln;
    var i;
    rt = __resultType(__type(fn));
    return ________metaApplyn(dst, rt, fn, args);
}

function ________metaSequencen(dst, esrt, args, ck) {
    var dst;
    var esrt;
    var args;
    var ck;
    var rt;
    var rs;
    var xb;
    var a;
    var ln;
    var i;
    if (ck === "seq") rt = __SeqOf(esrt); else if (ck === "bag") rt = __BagOf(esrt); else if (ck === "alt") rt = __AltOf(esrt); else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unknown collection kind: ");
        ____times(uwriteBuffer, ck);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    rs = __iNew(Xsequence);
    xb = rs;
    ______obset(rs, Xsequence_dest, dst);
    ______obset(rs, Xsequence_elementType, esrt);
    ______obset(rs, Xsequence_arguments, args);
    ______obset(rs, Xob1_type, rt);
    ln = __seqLength(args);
    for (i = 0; i < ln; i++) {
        a = args[i];
        if (__Xobish(a)) ____setParent(a, xb);
    }
    return xb;
}

function ______metaSequencen(dst, esrt, args) {
    var dst;
    var esrt;
    var args;
    return ________metaSequencen(dst, esrt, args, "seq");
}

function ____metaApplyn(fn, a0) {
    var fn;
    var a0;
    return ______metaApplyn(null, fn, [ a0 ]);
}

function ______metaApplyn(fn, a0, a1) {
    var fn;
    var a0;
    var a1;
    return ______metaApplyn(null, fn, [ a0, a1 ]);
}

function ________metaApplyn(fn, a0, a1, a2) {
    var fn;
    var a0;
    var a1;
    var a2;
    return ______metaApplyn(null, fn, [ a0, a1, a2 ]);
}

function ____metaApplyn(fn, args) {
    var fn;
    var args;
    return ______metaApplyn(null, fn, args);
}

function __isBoolean(x) {
    var x;
    return ____intsel(x, BitField_lowbit) === ____intsel(x, BitField_highbit);
}

var restrictionsP = ____selectUri(fabl, "restrictions");

function ____selectField(cl, nm) {
    var cl;
    var nm;
    var ip;
    var prp;
    prp = ____selectUri(cl, nm);
    if (!prp) return null;
    ip = ____get(cl, restrictionsP);
    if (!ip) return null;
    return ____get(ip, __regarding(prp));
}

function __isConstant(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === binding_kind) return __isConstant(x);
    if (k === smallob_kind || k === compact_kind || k === hashtable_kind) return ______bitsel(x, Xob1_booles, Xob1_isConstant);
    return fabl_true;
}

function __constantValue(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === binding_kind) return __bindingValue(x); else if (k === smallob_kind || k === compact_kind || k === hashtable_kind) return ____obsel(x, Xob1_value);
    return x;
}

function ____metaCast1(x, s) {
    var x;
    var s;
    var rs;
    var xb;
    if (__type(x) === s) return x;
    rs = __iNew(Xcast);
    xb = rs;
    ______obset(rs, Xcast_castee, x);
    ______obset(rs, Xob1_type, s);
    if (__Xobish(x)) ____setParent(x, xb);
    return xb;
}

function __lowbit(x) {
    var x;
    return __byte2(____intsel(x, XselectProperty_booles));
}

function __highbit(x) {
    var x;
    return __byte3(____intsel(x, XselectProperty_booles));
}

function ____set_lowbit(x, b) {
    var x;
    var b;
    ______intset(x, XselectProperty_booles, ____setByte2(____intsel(x, XselectProperty_booles), b));
}

function ____set_highbit(x, b) {
    var x;
    var b;
    ______intset(x, XselectProperty_booles, ____setByte3(____intsel(x, XselectProperty_booles), b));
}

function ________metaSelectProperty(src, nm, rstp, functional) {
    var src;
    var nm;
    var rstp;
    var functional;
    var rs;
    var xb;
    rs = __iNew(XselectProperty);
    xb = rs;
    ______obset(rs, Xob1_type, rstp);
    ______obset(rs, XselectProperty_selector, nm);
    ______obset(rs, XselectProperty_source, src);
    ________bitset(rs, XselectProperty_booles, XselectProperty_isFunctional, functional);
    return xb;
}

function ______metaSelectProperty(src, nm, rstp) {
    var src;
    var nm;
    var rstp;
    return ________metaSelectProperty(src, nm, rstp, fabl_true);
}

function ____metaSelectBitField(src, btf) {
    var src;
    var btf;
    var rs;
    var xb;
    var rst;
    var tp;
    var rstp;
    rs = __iNew("fabl:XselectProperty");
    xb = rs;
    ______obset(rs, XselectProperty_source, src);
    if (__isBoolean(btf)) rstp = fabl_boolean; else rstp = fabl_int;
    ________bitset(rs, XselectProperty_booles, XselectProperty_isBitField, 1);
    ____set_lowbit(rs, ____intsel(btf, BitField_lowbit));
    ____set_highbit(rs, ____intsel(btf, BitField_highbit));
    ______obset(rs, XselectProperty_selector, ____obsel(btf, BitField_ofProperty));
    ______obset(rs, Xob1_type, rstp);
    return xb;
}

function ____metaSelectIndexn(src, sl) {
    var src;
    var sl;
    var ssrt;
    var rt;
    var rs;
    var xb;
    var cn;
    ssrt = __type(src);
    if (ssrt === Seq || ssrt === Bag || ssrt === Alt) rt = ob; else if (ssrt === fabl_string || ssrt === hexBinary) rt = fabl_int; else {
        cn = ____obsel(ssrt, Sort_constructor);
        if (!(cn === "SeqOf") && !(cn === "BagOf")) return null;
        rt = ____obsel(ssrt, Sort_param);
    }
    rs = __iNew(XselectIndex);
    xb = rs;
    ______obset(rs, XselectIndex_source, src);
    ______obset(rs, XselectIndex_selector, sl);
    ______obset(rs, Xob1_type, rt);
    if (__Xobish(sl)) ____setParent(sl, xb);
    return xb;
}

function ______metaSelectIndex(src, sl, rstp) {
    var src;
    var sl;
    var rstp;
    var rs;
    var xb;
    rs = __iNew(XselectIndex);
    xb = rs;
    ______obset(rs, XselectIndex_source, src);
    ______obset(rs, XselectIndex_selector, sl);
    ______obset(rs, Xob1_type, rstp);
    if (__Xobish(sl)) ____setParent(sl, xb);
    return xb;
}

var mkStringBuf_function = ______getVariant(home, "mkStringBuf", [ fabl_id ]);

var coerceToSuperClasses = fabl_true;

var coerceToOb = fabl_true;

var coerceToLiteral = fabl_true;

var literalToString_fun = ______getVariant(home, "toString", [ Literal ]);

function ____metaCoerce(x, dst) {
    var x;
    var dst;
    var srt;
    var st;
    srt = __type(x);
    if (srt === dst) return x;
    if (srt === fabl_int && dst === fabl_double) return ____metaApplyn(float_fun, x);
    if (srt === fabl_id && dst === fabl_string) return ____metaApplyn(__homeFimpFun("mkStringBuf_function"), x);
    if (coerceToOb && dst === ob) {
        st = __storage(srt);
        if (st === storage_ob) return x;
        if (st === storage_int) return ____metaApplyn(__homeFimpFun("intToOb_fun"), x);
        if (st === storage_double) return ____metaApplyn(__homeFimpFun("doubleToOb_fun"), x);
    }
    if (coerceToLiteral && dst === Literal) {
        if (srt === fabl_int || srt === fabl_double || srt === fabl_boolean || srt === fabl_string) return ____metaCast1(____metaCast(x, ob), Literal);
    }
    if (coerceToSuperClasses && !(dst === ob) && ____isSubClassOf(srt, dst)) return x;
    return null;
}

function ________metaAssignn(dst, src, addvalue, chk) {
    var dst;
    var src;
    var addvalue;
    var chk;
    var rs;
    var xb;
    var crc;
    var ds;
    ds = __type(dst);
    if (chk) {
        crc = ____metaCoerce(src, ds);
        if (!crc) return null;
    } else crc = src;
    rs = __iNew(Xassign);
    xb = rs;
    ______obset(rs, Xob1_type, fabl_void);
    ______obset(rs, Xassign_dest, dst);
    ______obset(rs, Xassign_source, crc);
    if (__Xobish(src)) ____setParent(src, xb);
    if (__Xobish(crc)) ____setParent(crc, xb);
    ________bitset(rs, Xassign_booles, Xassign_addValue, __toInt(addvalue));
    return xb;
}

function ______metaAssignn(dst, src, addValue) {
    var dst;
    var src;
    var addValue;
    var rs;
    rs = ________metaAssignn(dst, src, addValue, fabl_false);
    return rs;
}

function ____metaAssignn(dst, src) {
    var dst;
    var src;
    var rs;
    rs = ________metaAssignn(dst, src, fabl_false, fabl_false);
    return rs;
}

function ______metaAssignnCheck(dst, src, addValue) {
    var dst;
    var src;
    var addValue;
    return ________metaAssignn(dst, src, addValue, fabl_true);
}

function ____metaAssignnCheck(dst, src) {
    var dst;
    var src;
    return ________metaAssignn(dst, src, fabl_false, fabl_true);
}

function ________metaFor(init, test, incr, body) {
    var init;
    var test;
    var incr;
    var body;
    var rs;
    var xb;
    rs = __iNew(Xfor);
    xb = rs;
    ______obset(rs, Xfor_init, init);
    ______obset(rs, Xfor_test, test);
    ______obset(rs, Xfor_incr, incr);
    ______obset(rs, Xfor_body, body);
    ______obset(rs, Xob1_type, fabl_void);
    if (__Xobish(init)) ____setParent(init, xb);
    if (__Xobish(test)) ____setParent(test, xb);
    if (__Xobish(incr)) ____setParent(incr, xb);
    if (__Xobish(body)) ____setParent(body, xb);
    return xb;
}

function ____metaWhile(test, body) {
    var test;
    var body;
    var rs;
    var xb;
    rs = __iNew(Xwhile);
    xb = rs;
    ______obset(rs, Xwhile_test, test);
    ______obset(rs, Xwhile_body, body);
    ______obset(rs, Xob1_type, fabl_void);
    if (__Xobish(test)) ____setParent(test, xb);
    if (__Xobish(body)) ____setParent(body, xb);
    return xb;
}

function __metaReturn(vl) {
    var vl;
    var rs;
    var xb;
    var vs;
    vs = __type(vl);
    rs = __iNew(Xreturn);
    xb = rs;
    ______obset(rs, Xreturn_value, vl);
    ______obset(rs, Xob1_type, fabl_void);
    if (__Xobish(vl)) ____setParent(vl, xb);
    return xb;
}

function metaReturnVoid() {
    var rs;
    var xb;
    rs = __iNew(Xreturn);
    xb = rs;
    ______obset(rs, Xob1_type, fabl_void);
    return xb;
}

function ____metaBlockReturn(vl, trg) {
    var vl;
    var trg;
    var rs;
    var xb;
    var vs;
    vs = __type(vl);
    if (!(vs === blockReturnType)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Mismatch: returning ");
        ____times(uwriteBuffer, vs);
        ____times(uwriteBuffer, ";expected ");
        ____times(uwriteBuffer, blockReturnType);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    rs = __iNew("fabl:Xreturn");
    xb = rs;
    ______obset(rs, Xreturn_value, vl);
    ______obset(rs, Xreturn_target, trg);
    ________bitset(rs, Xreturn_booles, Xreturn_blockReturn, 1);
    ______obset(rs, Xob1_type, fabl_void);
    ____setParent(vl, xb);
    return xb;
}

function __metaVoidBlockReturn(trg) {
    var trg;
    var rs;
    var xb;
    rs = __iNew("fabl:Xreturn");
    xb = rs;
    ______obset(rs, Xreturn_target, trg);
    ________bitset(rs, Xreturn_booles, Xreturn_blockReturn, 1);
    ______obset(rs, Xob1_type, fabl_void);
    return xb;
}

var xblockLocalsP = ____selectUri(Xblock, "locals");

var typesXblock = [ Xblock ];

function ____mkXblock(e, st) {
    var e;
    var st;
    var rs;
    var xb;
    var cx;
    var i;
    var ln;
    rs = __iNew(Xblock);
    xb = rs;
    ______obset(rs, Xblock_locals, e);
    ______obset(rs, Xblock_statements, st);
    ______obset(rs, Xob1_type, fabl_void);
    ln = __seqLength(st);
    for (i = 0; i < ln; i++) {
        cx = st[i];
        ____setParent(cx, xb);
    }
    return xb;
}

function __mkXblock(st) {
    var st;
    return ____mkXblock(null, st);
}

function ______mkValueReturningXblock(s, e, st) {
    var s;
    var e;
    var st;
    var rs;
    var xb;
    var cx;
    var i;
    var ln;
    rs = __iNew(Xblock);
    xb = rs;
    ______obset(rs, Xblock_locals, e);
    ______obset(rs, Xblock_statements, st);
    ______obset(rs, Xblock_returnType, s);
    ______obset(rs, Xob1_type, s);
    ln = __seqLength(st);
    for (i = 0; i < ln; i++) {
        cx = st[i];
        ____setParent(cx, xb);
    }
    return xb;
}

function ______mkXgo(cnd, lb, giff) {
    var cnd;
    var lb;
    var giff;
    var rs;
    var xb;
    rs = __iNew(Xgo);
    xb = rs;
    ______obset(rs, Xgo_condition, cnd);
    ______obset(rs, Xgo_toLabel, lb);
    ______obset(rs, Xob1_type, fabl_void);
    ____setParent(cnd, xb);
    ________bitset(xb, Xgo_booles, Xgo_goIfFalse, giff);
    return xb;
}

function ____mkXgo(cnd, lb) {
    var cnd;
    var lb;
    return ______mkXgo(cnd, lb, fabl_false);
}

function __mkXgo(lb) {
    var lb;
    return ____mkXgo(null, lb);
}

function ____mkXgoIfFalse(cnd, lb) {
    var cnd;
    var lb;
    return ______mkXgo(cnd, lb, fabl_true);
}

function ______mkXif(cnd, ift, iff) {
    var cnd;
    var ift;
    var iff;
    var rs;
    var xb;
    rs = __iNew(Xif);
    xb = rs;
    ______obset(rs, Xif_condition, cnd);
    ______obset(rs, Xif_ifTrue, ift);
    ______obset(rs, Xif_ifFalse, iff);
    ______obset(rs, Xob1_type, fabl_void);
    ____setParent(cnd, xb);
    ____setParent(ift, xb);
    ____setParent(iff, xb);
    return xb;
}

function ____mkXif(cnd, ift) {
    var cnd;
    var ift;
    return ______mkXif(cnd, ift, null);
}

function __unNot(x) {
    var x;
    var xap;
    var args;
    if (__Xobish(x)) {
        xap = x;
        if (____um_eq(____obsel(xap, Xapply_functionOf), not_fun)) {
            args = ____obsel(xap, Xapply_arguments);
            return args[0];
        }
    }
    return null;
}

function __metaNot(x) {
    var x;
    var un;
    un = __unNot(x);
    if (un) return un;
    if (!(__type(x) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "meta_not only applies to boolean valued expressions");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____metaApplyn(__homeFimpFun("not_fun"), x);
}

function __toBoolean(x) {
    var x;
    var xo;
    var xs;
    var xi;
    xo = x;
    if (__isString(xo)) {
        xs = xo;
        if (xs === "true" || xs === "1") return fabl_true;
        return fabl_false;
    }
    if (__obkind(xo) === int_kind) {
        xi = __ob_to_integer(xo);
        if (xi === 0) return fabl_false;
        return fabl_true;
    }
    return fabl_false;
}

var literalToInt_fun = ______getVariant(home, "toInt", [ Literal ]);

var literalToDouble_fun = ______getVariant(home, "toDouble", [ Literal ]);

var literalToBoolean_fun = ______getVariant(home, "toBoolean", [ Literal ]);

function ____metaCast(x, s) {
    var x;
    var s;
    var xs;
    var xst;
    var sst;
    xs = __type(x);
    if (xs === s) return x;
    xst = __storage(xs);
    if (s === ob) {
        if (xst === storage_int) return ____metaCast1(____metaApplyn(__homeFimpFun("intToOb_fun"), x), s);
        if (xst === storage_double) return ____metaCast1(____metaApplyn(__homeFimpFun("doubleToOb_fun"), x), s);
        return ____metaCast1(x, s);
    }
    if (xs === Literal) {
        if (s === fabl_int) return ____metaApplyn(__homeFimpFun("literalToInt_fun"), x);
        if (s === fabl_double) return ____metaApplyn(__homeFimpFun("literalToDouble_fun"), x);
        if (s === fabl_boolean) return ____metaApplyn(__homeFimpFun("literalToBoolean_fun"), x);
        if (s === fabl_string) return ____metaApplyn(__homeFimpFun("literalToString_fun"), x);
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Illegal attempted cast from ");
            ____times(uwriteBuffer, xs);
            ____times(uwriteBuffer, " to ");
            ____times(uwriteBuffer, s);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    if (s === Literal) {
        if (xst === storage_int) return ____metaCast1(____metaApplyn(__homeFimpFun("intToOb_fun"), x), s);
        if (xst === storage_double) return ____metaCast1(____metaApplyn(__homeFimpFun("doubleToOb_fun"), x), s);
        if (xs === fabl_string || xs === ob) return ____metaCast1(x, s);
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Illegal attempted cast from ");
            ____times(uwriteBuffer, xs);
            ____times(uwriteBuffer, " to ");
            ____times(uwriteBuffer, s);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    sst = __storage(s);
    if (xs === ob) {
        if (sst === storage_int) return ____metaCast1(____metaApplyn(__homeFimpFun("obToInt_fun"), x), s);
        if (sst === storage_double) return ____metaCast1(____metaApplyn(__homeFimpFun("obToDouble_fun"), x), s);
        return ____metaCast1(x, s);
    }
    if (xs === fabl_id || s === fabl_id) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Illegal attempted cast from ");
        ____times(uwriteBuffer, xs);
        ____times(uwriteBuffer, " to ");
        ____times(uwriteBuffer, s);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (sst === xst) return ____metaCast1(x, s);
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Illegal attempted cast from ");
        ____times(uwriteBuffer, xs);
        ____times(uwriteBuffer, " to ");
        ____times(uwriteBuffer, s);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____arrayRef(s, n) {
    var s;
    var n;
    return ____select(s, n);
}

function ____arrayRef(s, n) {
    var s;
    var n;
    return ____select(s, n);
}

var ascii_space = 32;

var ascii_plus = 43;

var ascii_minus = 45;

var ascii_star = 42;

var ascii_rparen = 41;

var ascii_lparen = 40;

var ascii_rbracket = 93;

var ascii_lbracket = 91;

var ascii_dot = 46;

var ascii_rcurly = 125;

var ascii_lcurly = 123;

var ascii_equal = 61;

var ascii_twiddle = 126;

var ascii_lessp = 60;

var ascii_greaterp = 62;

var ascii_comma = 44;

var ascii_minus = 45;

var ascii_slash = 47;

var ascii_vbar = 124;

var ascii_lf = 10;

var ascii_ampersand = 38;

var ascii_percent = 37;

var ascii_semicolon = 59;

var ascii_squote = 39;

var ascii_dquote = 34;

var ascii_colon = 58;

var ascii_underbar = 95;

var ascii_backslash = 92;

var ascii_bang = 33;

var ascii_e = 101;

var ascii_E = 69;

var ascii_n = 110;

var ascii_r = 114;

var ascii_t = 116;

var ascii_u = 117;

var ascii_x = 120;

var ascii_T = 84;

function ____equal(a, b) {
    var a;
    var b;
    return a === b;
}

function ____find(s, c) {
    var s;
    var c;
    var ln;
    var i;
    ln = __length(s);
    for (i = 0; i < ln; i++) {
        if (____select(s, i) === c) return i;
    }
    return -1;
}

function ______find(s, c, sp) {
    var s;
    var c;
    var sp;
    var ln;
    var i;
    ln = __length(s);
    for (i = sp; i < ln; i++) {
        if (____select(s, i) === c) return i;
    }
    return -1;
}

function ____findFromEnd(s, c) {
    var s;
    var c;
    var ci;
    var ln;
    var i;
    ln = __length(s);
    ci = c;
    for (i = ln - 1; i >= 0; i--) {
        if (____select(s, i) === ci) return i;
    }
    return -1;
}

function ______findFromEnd(s, c, startat) {
    var s;
    var c;
    var startat;
    var i;
    var ci;
    ci = c;
    for (i = startat; i >= 0; i--) {
        if (____select(s, i) === ci) return i;
    }
    return -1;
}

var temp_stringbuf = "";

function ______substr(s, ilb, iln) {
    var s;
    var ilb;
    var iln;
    var lb;
    var ub;
    var ln;
    var rs;
    if (ilb < 0) lb = 0; else lb = ilb;
    ln = __length(s);
    ub = lb + iln;
    if (ub > ln) ub = ln;
    rs = ub - lb;
    ________select(rs, s, lb, ub - 1);
    return rs;
}

function ____substr(s, ilb) {
    var s;
    var ilb;
    return ______substr(s, ilb, __length(s));
}

function ______slice(s, ilb, iub) {
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    var ln;
    var rln;
    var rs;
    if (ilb < 0) lb = 0; else lb = ilb;
    ln = __length(s);
    if (iub > ln) ub = ln; else ub = iub;
    if (ub <= lb) return "";
    rln = ub - lb;
    rs = rln;
    ________select(rs, s, lb, ub - 1);
    return rs;
}

function ________slice(rs, s, ilb, iub) {
    var rs;
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    var ln;
    var rln;
    if (ilb < 0) lb = 0; else lb = ilb;
    ln = __length(s);
    if (iub > ln) ub = ln; else ub = iub;
    if (ub <= lb) {
        ____times(rs, s);
        return;
    }
    rln = ub - lb;
    ________select(rs, s, lb, ub - 1);
}

function ______substring(s, ilb, iub) {
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    if (ilb > iub) {
        lb = iub;
        ub = ilb;
    } else {
        lb = ilb;
        ub = iub;
    }
    return ______slice(s, lb, ub);
}

function ______select(s, lb, ub) {
    var s;
    var lb;
    var ub;
    var rs;
    rs = 1 + ub - lb;
    ________select(rs, s, lb, ub);
    return rs;
}

function ______substringS(s, ilb, iub) {
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    if (ilb > iub) {
        lb = iub;
        ub = ilb;
    } else {
        lb = ilb;
        ub = iub;
    }
    __reset(temp_stringbuf);
    ________select(temp_stringbuf, s, lb, ub - 1);
    return __toString(temp_stringbuf);
}

function ____afterLast(s, c) {
    var s;
    var c;
    var fs;
    fs = ____findFromEnd(s, c);
    if (fs < 0) return s; else return ______substring(s, fs + 1, __length(s));
}

function ____afterLastS(s, c) {
    var s;
    var c;
    var fs;
    fs = ____findFromEnd(s, c);
    if (fs < 0) return __toString(s); else return ______substringS(s, fs + 1, __length(s));
}

function __afterLastDotS(s) {
    var s;
    return ____afterLastS(s, ascii_dot);
}

function ______find(cnx, cny, sp) {
    var cnx;
    var cny;
    var sp;
    var lnx;
    var lny;
    var mp;
    var mi;
    var dn;
    var fnd;
    lny = __length(cny);
    if (lny === 1) return ______find(cnx, cny[0], sp);
    lnx = __length(cnx);
    mp = sp;
    mi = -1;
    fnd = fabl_false;
    dn = fabl_false;
    while (!dn) {
        if (mi === lny - 1) {
            fnd = fabl_true;
            dn = fabl_true;
        } else if (mp + mi === lnx - 1) {
            fnd = fabl_false;
            dn = fabl_true;
        } else {
            mi = mi + 1;
            if (!(____select(cnx, mp + mi) === ____select(cny, mi))) {
                mp = mp + 1;
                mi = -1;
            }
        }
    }
    if (fnd) return mp; else return -1;
}

function ____find(cnx, cny) {
    var cnx;
    var cny;
    return ______find(cnx, cny, 0);
}

function ________findFromEnd(cnx, cny, sp, nosp) {
    var cnx;
    var cny;
    var sp;
    var nosp;
    var lnx;
    var lny;
    var lnxmlny;
    var mp;
    var mi;
    var dn;
    var fnd;
    lny = __length(cny);
    if (lny === 1) return ______findFromEnd(cnx, cny[0], sp);
    lnx = __length(cnx);
    lnxmlny = lnx - lny;
    if (nosp) mp = lnxmlny; else if (lnxmlny < sp) mp = lnxmlny; else mp = sp;
    mi = -1;
    fnd = fabl_false;
    dn = fabl_false;
    while (!dn) {
        if (mi === lny - 1) {
            fnd = fabl_true;
            dn = fabl_true;
        } else if (mp < 0) {
            fnd = fabl_false;
            dn = fabl_true;
        } else {
            mi = mi + 1;
            if (!(____select(cnx, mp + mi) === ____select(cny, mi))) {
                mp = mp - 1;
                mi = -1;
            }
        }
    }
    if (fnd) return mp; else return -1;
}

function ______findFromEnd(cnx, cny, sp) {
    var cnx;
    var cny;
    var sp;
    return ________findFromEnd(cnx, cny, sp, fabl_false);
}

function ____findFromEnd(cnx, cny) {
    var cnx;
    var cny;
    return ________findFromEnd(cnx, cny, 0, fabl_true);
}

function ____indexOf(cnx, cny) {
    var cnx;
    var cny;
    return ______find(cnx, cny, 0);
}

function ____indexOf(cnx, cny) {
    var cnx;
    var cny;
    return ______find(cnx, cny, 0);
}

function ______indexOf(cnx, cny, n) {
    var cnx;
    var cny;
    var n;
    return ______find(cnx, cny, n);
}

function ______indexOf(cnx, cny, n) {
    var cnx;
    var cny;
    var n;
    return ______find(cnx, cny, n);
}

function ______lastIndexOf(cnx, cny, sp) {
    var cnx;
    var cny;
    var sp;
    return ________findFromEnd(cnx, cny, sp, fabl_false);
}

function ____lastIndexOf(cnx, cny) {
    var cnx;
    var cny;
    return ________findFromEnd(cnx, cny, 0, fabl_true);
}

function ____lastIndexOf(cnx, cny) {
    var cnx;
    var cny;
    return ____findFromEnd(cnx, cny);
}

function ____startsWith(cnx, cny) {
    var cnx;
    var cny;
    var lnx;
    var lny;
    var i;
    var oksf;
    lnx = __length(cnx);
    lny = __length(cny);
    if (lny > lnx) return fabl_false;
    oksf = fabl_true;
    for (i = 0; i < lny; i++) {
        if (!(____select(cnx, i) === ____select(cny, i))) return fabl_false;
    }
    return fabl_true;
}

function ____endsIn(cnx, cny) {
    var cnx;
    var cny;
    var lnx;
    var lny;
    var i;
    var sp;
    var oksf;
    lnx = __length(cnx);
    lny = __length(cny);
    if (lny > lnx) return fabl_false;
    oksf = fabl_true;
    sp = lnx - lny;
    for (i = sp; i < lnx; i++) {
        if (!(____select(cnx, i) === ____select(cny, i - sp))) return fabl_false;
    }
    return fabl_true;
}

function ____plus(a, b) {
    var a;
    var b;
    var rs;
    rs = a;
    ____times(rs, b);
    return __toString(rs);
}

function ____split(s, delim) {
    var s;
    var delim;
    var ln;
    var i;
    var c;
    var cbf;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(s);
    cbf = "";
    for (i = 0; i < ln; i++) {
        c = s[i];
        if (c === delim) {
            ____seqobAdd(rs, cbf);
            cbf = "";
        } else ____addChar(cbf, c);
    }
    ____seqobAdd(rs, cbf);
    return rs;
}

function ______matchesAt(buf, p, s) {
    var buf;
    var p;
    var s;
    var cc;
    var i;
    var ln;
    i = 0;
    ln = __length(s);
    if (p + ln > __length(buf)) return fabl_false;
    while (i < ln) {
        cc = buf[p + i];
        if (cc === s[i]) i++; else return fabl_false;
    }
    return fabl_true;
}

function ____split(s, dl) {
    var s;
    var dl;
    var ln;
    var lnd;
    var dl0;
    var i;
    var c;
    var cbf;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    lnd = __length(dl);
    if (lnd === 0) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "attempt to split on an empty delimiter");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    dl0 = dl[0];
    if (lnd === 1) return ____split(s, dl0);
    ln = __length(s);
    cbf = "";
    while (i < ln) {
        c = s[i];
        if (c === dl0 && ______matchesAt(s, i, dl)) {
            ____seqobAdd(rs, cbf);
            i = i + lnd;
            cbf = "";
        } else {
            ____addChar(cbf, c);
            i = i + 1;
        }
    }
    if (__length(cbf) > 0) ____seqobAdd(rs, cbf);
    return rs;
}

function ____implode(glue, pieces) {
    var glue;
    var pieces;
    var ln;
    var i;
    var lnm1;
    var rs;
    ln = __seqLength(pieces);
    lnm1 = ln - 1;
    rs = "";
    for (i = 0; i < ln; i++) {
        ____times(rs, pieces[i]);
        if (i < lnm1) ____times(rs, glue);
    }
    return rs;
}

function ____________replaceChar(rs, s, fc, tc, lb, ub) {
    var rs;
    var s;
    var fc;
    var tc;
    var lb;
    var ub;
    var ln;
    var i;
    var cc;
    ln = __length(s);
    if (lb < 0 || lb > ub || ub > ln) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bad inputs to replaceChar");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ________select(rs, s, 0, lb - 1);
    for (i = lb; i < ub; i++) {
        cc = s[i];
        if (cc === fc) ____addChar(rs, tc); else ____addChar(rs, cc);
    }
    ________select(rs, s, ub, ln - 1);
}

function __________replaceChar(s, fc, tc, lb, ub) {
    var s;
    var fc;
    var tc;
    var lb;
    var ub;
    var rs;
    rs = __length(s);
    ____________replaceChar(rs, s, fc, tc, lb, ub);
    return rs;
}

function ____________replaceChar(rs, s, fc, ts, lb, ub) {
    var rs;
    var s;
    var fc;
    var ts;
    var lb;
    var ub;
    var ln;
    var i;
    var cc;
    ln = __length(s);
    if (lb < 0 || lb > ub || ub > ln) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bad inputs to replaceChar");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ________select(rs, s, 0, lb - 1);
    for (i = lb; i < ub; i++) {
        cc = s[i];
        if (cc === fc) ____times(rs, ts); else ____addChar(rs, cc);
    }
    ________select(rs, s, ub, ln - 1);
}

function __________replaceChar(s, fc, ts, lb, ub) {
    var s;
    var fc;
    var ts;
    var lb;
    var ub;
    var rs;
    if (__length(ts) < 2) rs = __length(s); else rs = "";
    ____________replaceChar(rs, s, fc, ts, lb, ub);
    return rs;
}

function __fileExtension(fln) {
    var fln;
    var ld;
    ld = ____lastIndexOf(fln, ascii_dot);
    if (ld < 0) return null;
    return ______slice(fln, ld + 1, __length(fln));
}

function __copy(s) {
    var s;
    var rs;
    rs = __mkString(__length(s));
    ____times(rs, s);
    return rs;
}

function ______isInt(x, sp, ep) {
    var x;
    var sp;
    var ep;
    var p;
    var cc;
    var i;
    p = sp;
    if (x[sp] === ascii_minus) p++;
    for (i = p; i < ep; i++) {
        cc = x[i];
        if (cc < 48 || cc > 57) return fabl_false;
    }
    return fabl_true;
}

function ____trim(rs, x) {
    var rs;
    var x;
    var lb;
    var ub;
    var ln;
    var nfnd;
    lb = 0;
    ln = __length(x);
    nfnd = fabl_true;
    while (nfnd && lb < ln) {
        if (x[lb] === ascii_space) lb++; else nfnd = fabl_false;
    }
    if (lb === ln) return;
    ub = ln - 1;
    nfnd = fabl_true;
    while (nfnd && ub >= 0) {
        if (x[ub] === ascii_space) ub--; else nfnd = fabl_false;
    }
    ________slice(rs, x, lb, ub + 1);
}

function __trim(x) {
    var x;
    var rs;
    rs = "";
    ____trim(rs, x);
    return rs;
}

var trimBuf = "";

function __isInt(x) {
    var x;
    if (__length(x) === 0) return fabl_false;
    __reset(trimBuf);
    ____trim(trimBuf, x);
    return ______isInt(trimBuf, 0, __length(trimBuf));
}

function __isDouble1(x) {
    var x;
    var ln;
    var dcm;
    var ep;
    ln = __length(x);
    if (ln === 0) return fabl_false;
    dcm = ____indexOf(x, ascii_dot);
    if (dcm < 0) return ______isInt(x, 0, ln);
    if (!______isInt(x, 0, dcm)) return fabl_false;
    ep = ____indexOf(x, ascii_e);
    if (ep < 0) ep = ____indexOf(x, ascii_E);
    if (ep < 0) {
        if (ln === dcm + 1) return fabl_true;
        return ______isInt(x, dcm + 1, ln);
    }
    if (ep + 1 === ln) return fabl_false;
    return ______isInt(x, ep + 1, ln);
}

function __isDouble(x) {
    var x;
    if (__length(x) === 0) return fabl_false;
    __reset(trimBuf);
    ____trim(trimBuf, x);
    return __isDouble1(trimBuf);
}

function __isInt(x) {
    var x;
    var xo;
    var k;
    xo = x;
    k = __obkind(xo);
    if (k === int_kind) return fabl_true;
    if (__isString(xo)) return __isInt(xo);
    return fabl_false;
}

function __isDouble(x) {
    var x;
    var xo;
    var k;
    xo = x;
    k = __obkind(xo);
    if (k === int_kind || k === double_kind) return fabl_true;
    if (__isString(xo)) return __isDouble(xo);
    return fabl_false;
}

function __isBoolean(x) {
    var x;
    var xo;
    var k;
    var xi;
    xo = x;
    k = __obkind(xo);
    if (k === int_kind) {
        xi = __toInt(x);
        return xi === 0 || xi === 1;
    }
    if (__isString(xo)) return __isInt(xo);
    return fabl_false;
}

function __toUpperCase(ci) {
    var ci;
    if (ci <= 122 && ci >= 97) return ci - 32;
    return ci;
}

function __toUpperCaseD(bf) {
    var bf;
    var ln;
    var i;
    ln = __length(bf);
    for (i = 0; i < ln; i++) bf[i] = __toUpperCase(bf[i]);
    return bf;
}

function __toUpperCase(bf) {
    var bf;
    return __toUpperCaseD(__copy(bf));
}

function __toLowerCase(ci) {
    var ci;
    if (ci <= 90 && ci >= 65) return ci + 32;
    return ci;
}

function __toLowerCaseD(bf) {
    var bf;
    var ln;
    var i;
    ln = __length(bf);
    for (i = 0; i < ln; i++) bf[i] = __toLowerCase(bf[i]);
    return bf;
}

function __toLowerCase(bf) {
    var bf;
    return __toLowerCaseD(__copy(bf));
}

var daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

var dayLetters = [ "S", "M", "T", "W", "T", "F", "S" ];

var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function __isLeapYear(yr) {
    var yr;
    if (!(yr % 4 === 0)) return fabl_false; else {
        if (!(yr % 100 === 0)) return fabl_true; else if (yr % 400 === 0) return fabl_true; else return fabl_false;
    }
}

function __daysInYear(yr) {
    var yr;
    if (__isLeapYear(yr)) return 366; else return 365;
}

function ____daysInMonth(mn, leapyear) {
    var mn;
    var leapyear;
    if (mn === 1) {
        if (leapyear) return 29; else return 28;
    } else return daysInMonth[mn];
}

function ____extractYMD(rs, d) {
    var rs;
    var d;
    var dy;
    var yr;
    var nyd;
    var yl;
    var diy;
    var mn;
    var first;
    var ml;
    var dim;
    var ly;
    dy = __toInt(d);
    nyd = 0;
    if (dy >= 0) {
        yr = 2e3;
        yl = __daysInYear(yr);
        while (dy - nyd >= yl) {
            yr++;
            nyd = nyd + yl;
            yl = __daysInYear(yr);
        }
    } else {
        yr = 1999;
        yl = __daysInYear(yr);
        while (dy - nyd < 0) {
            yr--;
            nyd = nyd - yl;
            yl = __daysInYear(yr);
        }
        yr++;
    }
    diy = dy - nyd;
    mn = 0;
    ly = __isLeapYear(yr);
    first = 0;
    ml = ____daysInMonth(mn, ly);
    while (diy - first >= ml) {
        mn++;
        first = first + ml;
        ml = ____daysInMonth(mn, ly);
    }
    dim = diy - first;
    __seqReset(rs);
    ____seqintAdd(rs, yr);
    ____seqintAdd(rs, mn + 1);
    ____seqintAdd(rs, dim + 1);
}

var dateBuf = __iNew("<unprintable>");

function ____times(rs, d) {
    var rs;
    var d;
    var mn;
    var dy;
    ____extractYMD(dateBuf, d);
    ____times(rs, dateBuf[0]);
    ____times(rs, "-");
    mn = dateBuf[1];
    if (mn < 10) ____times(rs, "0");
    ____times(rs, mn);
    ____times(rs, "-");
    dy = dateBuf[2];
    if (dy < 10) ____times(rs, "0");
    ____times(rs, dy);
}

function ______mkDate(yr, mn, dy) {
    var yr;
    var mn;
    var dy;
    var dys;
    var i;
    var ly;
    dys = 0;
    if (yr >= 2e3) {
        for (i = 2e3; i < yr; i++) dys = dys + __daysInYear(i);
    } else {
        for (i = 1999; yr <= i; i--) dys = dys - __daysInYear(i);
    }
    ly = __isLeapYear(yr);
    for (i = 0; i < mn - 1; i++) dys = dys + ____daysInMonth(i, ly);
    dys = dys + (dy - 1);
    return __toDate(dys);
}

function __dayOfWeek(d) {
    var d;
    var dy;
    var md;
    dy = __toInt(d);
    md = (dy - 1) % 7;
    if (md < 0) return 7 + md;
    return md;
}

function __dayOfWeekName(d) {
    var d;
    var dy;
    dy = __dayOfWeek(d);
    return daysOfWeek[dy];
}

function ____lessp(x, y) {
    var x;
    var y;
    return __toInt(x) < __toInt(y);
}

function ____greaterp(x, y) {
    var x;
    var y;
    return __toInt(x) < __toInt(y);
}

function ____leq(x, y) {
    var x;
    var y;
    return __toInt(x) <= __toInt(y);
}

function ____geq(x, y) {
    var x;
    var y;
    return __toInt(x) >= __toInt(y);
}

function ____equal(x, y) {
    var x;
    var y;
    return __toInt(x) === __toInt(y);
}

function ____plus(d, i) {
    var d;
    var i;
    return __toDate(__toInt(d) + i);
}

function ____difference(d, i) {
    var d;
    var i;
    return __toDate(__toInt(d) - i);
}

function __parseXsdDate(s) {
    var s;
    var sp;
    var spt;
    var ys;
    var ms;
    var ds;
    var dim;
    var yy;
    var mm;
    var dd;
    spt = ____split(s, ascii_T);
    sp = ____split(spt[0], ascii_minus);
    if (!(__seqLength(sp) === 3)) return null;
    ys = sp[0];
    if (!__isInt(ys)) return null;
    yy = __toInt(ys);
    ms = sp[1];
    if (!__isInt(ms)) return null;
    mm = __toInt(ms);
    if (mm < 1 || 12 < mm) return null;
    ds = sp[2];
    if (!__isInt(ds)) return null;
    dd = __toInt(ds);
    if (dd < 1 || 31 < dd) return null;
    if (mm === 2) {
        if (dd > 29) return null;
        if (dd === 29 && !__isLeapYear(yy)) return null;
    } else {
        dim = daysInMonth[mm - 1];
        if (dd > dim) return null;
    }
    return ______mkDate(yy, mm, dd);
}

function __nextMonth(d) {
    var d;
    var m;
    var y;
    ____extractYMD(dateBuf, d);
    m = dateBuf[1];
    y = dateBuf[0];
    if (m === 12) {
        y++;
        m = 1;
    } else m++;
    return ______mkDate(y, m, 1);
}

function __firstOfMonth(d) {
    var d;
    var m;
    var y;
    ____extractYMD(dateBuf, d);
    m = dateBuf[1];
    y = dateBuf[0];
    return ______mkDate(y, m, 1);
}

function __reset(h) {
    var h;
    __reset(h);
}

var safeChars;

function __urldecode(ix) {
    var ix;
    var idx;
    var ln;
    var hxv;
    var lb;
    var x;
    var hx;
    var rs;
    x = __________replaceChar(ix, ascii_plus, ascii_space, 0, __length(ix));
    idx = ____indexOf(x, ascii_percent);
    if (idx < 0) return x;
    ln = __length(x);
    rs = ______slice(x, 0, idx);
    hx = "  ";
    while (0 <= idx && idx + 3 <= ln) {
        __reset(hx);
        ____addChar(hx, x[idx + 1]);
        ____addChar(hx, x[idx + 2]);
        hxv = __hex(hx);
        ____addChar(rs, hxv);
        lb = idx + 3;
        idx = ______indexOf(x, ascii_percent, lb);
        if (idx < 0) ____times(rs, ______slice(x, lb, ln)); else ____times(rs, ______slice(x, lb, idx));
    }
    return rs;
}

function __safeChar1(c) {
    var c;
    if (48 <= c && c <= 57) return fabl_true;
    if (65 <= c && c <= 90) return fabl_true;
    if (97 <= c && c <= 122) return fabl_true;
    if (c === ascii_minus || c === ascii_underbar || c === ascii_dot || c === ascii_bang || c === ascii_twiddle || c === ascii_star || c === ascii_squote || c === ascii_lparen || c === ascii_rparen) return fabl_true;
    return fabl_false;
}

function initSafeChars() {
    var i;
    safeChars = __iNew("<unprintable>");
    ____seqintExpand(safeChars, 123);
    for (i = 0; i < 122; i++) safeChars[i] = __safeChar1(i);
}

initSafeChars();

function __urlencodeIsSafeChar(i) {
    var i;
    if (i > 122) return fabl_false;
    return safeChars[i];
}

function ____appendTwoCharHex(rs, x) {
    var rs;
    var x;
    var c;
    var fc;
    var sc;
    c = ____lshift(____land(x, 240), -4);
    if (c < 10) fc = 48 + c; else fc = 87 + c;
    c = ____land(x, 15);
    if (c < 10) sc = 48 + c; else sc = 87 + c;
    ____addChar(rs, fc);
    ____addChar(rs, sc);
}

function __urlencode(x) {
    var x;
    var rs;
    var i;
    var ln;
    var c;
    ln = __length(x);
    rs = "";
    for (i = 0; i < ln; i++) {
        c = x[i];
        if (c === ascii_space) ____addChar(rs, ascii_plus); else if (__urlencodeIsSafeChar(c)) ____addChar(rs, c); else {
            ____addChar(rs, ascii_percent);
            ____appendTwoCharHex(rs, c);
        }
    }
    return rs;
}

function __javascriptEscape(x) {
    var x;
    var rs;
    var i;
    var ln;
    var c;
    ln = __length(x);
    rs = "";
    for (i = 0; i < ln; i++) {
        c = x[i];
        if (c === ascii_plus) ____addChar(rs, ascii_plus); else if (__urlencodeIsSafeChar(c)) ____addChar(rs, c); else {
            ____addChar(rs, ascii_percent);
            ____appendTwoCharHex(rs, c);
        }
    }
    return rs;
}

function __getenv(ev) {
    var ev;
    var rs;
    rs = "";
    if (____getenv(rs, ev) < 0) return null;
    return rs;
}

var crlf = "";

____addChar(crlf, 13);

____addChar(crlf, 10);

var crcrlf = "";

____addChar(crcrlf, 13);

____addChar(crcrlf, 13);

____addChar(crcrlf, 10);

var cgiMode;

fabl_false;

var headerEmitted;

fabl_false;

function ____httpHeader(tp, ln) {
    var tp;
    var ln;
    if (!headerEmitted) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "HTTP 200");
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Server: fabl/2.0");
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        if (ln > 0) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Content-Length: ");
            ____times(uwriteBuffer, ln);
            __tprint(uwriteBuffer);
        }
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Content-Type: ");
            ____times(uwriteBuffer, tp);
            ____times(uwriteBuffer, crlf);
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        headerEmitted = fabl_true;
    }
}

function __htmlHeader(ln) {
    var ln;
    __silent(fabl_false);
    __emitHtmlHeader(ln);
}

function htmlHeader() {
    __htmlHeader(-1);
}

function plainTextHeader() {
    if (setHttpHeaderEmitted()) {
        __silent(fabl_false);
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Server: fabl/2.0");
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Content-Type: text/plain");
            ____times(uwriteBuffer, crlf);
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
    }
}

var writeServedPageTo;

null;

function __serveHtml(bf) {
    var bf;
    if (writeServedPageTo) ____fwrite(writeServedPageTo, bf);
    htmlHeader();
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, bf);
        __tprint(uwriteBuffer);
    }
    quit();
}

function preError() {
    if (cgiMode) htmlHeader();
}

function __parseHttpVars(s) {
    var s;
    var rs;
    var spl;
    var ln;
    var i;
    var idx;
    var vr;
    var vl;
    var cv;
    var urlencoded;
    rs = __iNew("rdfs:Resource");
    if (____find(s, crlf) < 0) {
        urlencoded = fabl_true;
        spl = ____split(s, [ 0 ]);
    } else {
        spl = ____split(s, crlf);
        urlencoded = fabl_false;
    }
    ln = __seqLength(spl);
    for (i = 0; i < ln; i++) {
        cv = spl[i];
        idx = ____indexOf(cv, ascii_equal);
        if (idx > 0) {
            vr = ______slice(cv, 0, idx);
            vl = ______slice(cv, idx + 1, __length(cv));
            if (urlencoded) vl = __urldecode(vl);
            ______set(rs, __regarding(__toId(vr)), vl);
        }
    }
    return rs;
}

function __parseApplication(s) {
    var s;
    var idx;
    var eidx;
    var ln;
    var rs;
    var args;
    var argst;
    idx = ____indexOf(s, ascii_lparen);
    if (idx < 0) return null;
    eidx = ____lastIndexOf(s, ascii_rparen);
    if (eidx < 0) return null;
    rs = [ ______slice(s, 0, idx) ];
    ln = __length(s);
    argst = ______slice(s, idx + 1, eidx);
    args = ____split(argst, ascii_comma);
    ____seqobAppend(rs, args);
    return rs;
}

var httpContentLengthString = "";

var httpContentLength;

0;

var httpContentType = "";

var httpContent = "";

var httpRequestMethod = "";

var httpQueryString = "";

var httpGet;

"";

var httpPost;

"";

var httpVars;

"";

function __setCgiVars(parse) {
    var parse;
    if (__length(httpRequestMethod) === 0) {
        httpGet = null;
        httpPost = null;
        ____getenv(httpRequestMethod, "REQUEST_METHOD");
        if (httpRequestMethod === "GET") {
            ____getenv(httpQueryString, "QUERY_STRING");
            httpContent = httpQueryString;
            if (parse) {
                httpGet = __parseHttpVars(httpQueryString);
                httpVars = httpGet;
            }
            return;
        }
        if (httpRequestMethod === "POST") {
            ____getenv(httpContentLengthString, "CONTENT_LENGTH");
            httpContentLength = __toInt(httpContentLengthString);
            __reset(httpContent);
            ____readFromStdin(httpContent, httpContentLength);
            if (parse) {
                httpPost = __parseHttpVars(httpContent);
                httpVars = httpPost;
            }
            return;
        }
    }
}

function setCgiVars() {
    __setCgiVars(fabl_true);
}

function parseCgi() {
    __setCgiVars(fabl_true);
}

function __extractUploadPart0(x) {
    var x;
    var bndi;
    var ebnd;
    var bnd;
    bndi = ____indexOf(x, crlf);
    if (bndi < 0) return null;
    bnd = ______slice(x, 0, bndi);
    ebnd = ______indexOf(x, bnd, bndi);
    if (ebnd < 0) return null;
    return ______slice(x, bndi + 1, ebnd);
}

var crlfcrlf = "{crlf}{crlf}";

function __extractUploadContent(x) {
    var x;
    var bndi;
    var prt0;
    prt0 = __extractUploadPart0(x);
    if (!prt0) return prt0;
    bndi = ____indexOf(prt0, crlfcrlf);
    if (bndi < 0) return null;
    return ______slice(prt0, bndi + 4, __length(x));
}

function __aLabelOf(x) {
    var x;
    var lbs;
    var olbs;
    var lk;
    if (!__Xobish(x)) return null;
    olbs = ____obsel(x, Xob1_labels);
    if (!olbs) return null;
    lk = __obkind(olbs);
    if (lk === nstring_kind || lk === wstring_kind) return olbs;
    lbs = olbs;
    if (__seqLength(lbs) > 0) return lbs[0];
    return null;
}

function __labelsOf(x) {
    var x;
    if (!__Xobish(x)) return null;
    return ____obsel(x, Xob1_labels);
}

function ____isLabeled(x, nm) {
    var x;
    var nm;
    var lbs;
    if (!__Xobish(x)) return fabl_false;
    lbs = ____obsel(x, Xob1_labels);
    if (!lbs) return fabl_false;
    if (__obkind(lbs) === seq_kind) return ____seqobContains(lbs, nm);
    return ____um_eq(nm, lbs);
}

function ____addLabel(x, nm) {
    var x;
    var nm;
    var lbs;
    var olbs;
    var lk;
    if (!__Xobish(x)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot add label an atomic Xob ");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    olbs = ____obsel(x, Xob1_labels);
    if (!olbs) ______obset(x, Xob1_labels, nm); else {
        lk = __obkind(olbs);
        if (lk === nstring_kind || lk === wstring_kind) {
            lbs = [ olbs, nm ];
            ______obset(x, Xob1_labels, lbs);
        } else {
            lbs = olbs;
            if (!____seqobContains(lbs, nm)) ____seqobAdd(lbs, nm);
        }
    }
}

function ____addLabels(x, s) {
    var x;
    var s;
    var lbs;
    var olbs;
    var ln;
    if (!__Xobish(x)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot add label to an atomic Xob");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ln = __seqLength(s);
    if (ln === 0) return;
    if (ln === 1) {
        ____addLabel(x, s[0]);
        return;
    }
    olbs = ____obsel(x, Xob1_labels);
    if (!olbs) {
        ______obset(x, Xob1_labels, __seqCopy(s));
        return;
    } else {
        if (__obkind(olbs) === seq_kind) {
            lbs = olbs;
            ____seqobAppend(lbs, s);
        } else {
            lbs = [ olbs ];
            ____seqobAppend(lbs, s);
            ______obset(x, Xob1_labels, lbs);
        }
    }
}

function ____copyLabels(dst, src) {
    var dst;
    var src;
    var slbs;
    var olbs;
    var lk;
    if (!__Xobish(src)) return;
    olbs = ____obsel(src, Xob1_labels);
    if (!olbs) return;
    lk = __obkind(olbs);
    if (lk === seq_kind) {
        slbs = olbs;
        ____addLabels(dst, slbs);
    } else ____addLabel(dst, olbs);
}

function __hasLabel(x) {
    var x;
    return __Xobish(x) && ____obsel(x, Xob1_labels);
}

function __subClassDepth(c) {
    var c;
    var sbs;
    var cd;
    var ln;
    var i;
    var mxd;
    var csb;
    if (c === Resource) return -1;
    sbs = c["rdfs:subClassOf"];
    if (__seqLength(sbs) === 0) return 0;
    ln = __seqLength(sbs);
    mxd = 0;
    for (i = 0; i < ln; i++) {
        csb = sbs[i];
        if (!(__type0(csb) === Restriction)) {
            cd = __subClassDepth(sbs[i]);
            if (cd > mxd) mxd = cd;
        }
    }
    return mxd + 1;
}

var classSpecificityBuf = __mk_emptysequence("<unprintable>");

function __mostSpecific(cls) {
    var cls;
    var ln;
    var i;
    var c;
    var cd;
    var mxd;
    var cc;
    var mxdc;
    ln = __seqLength(cls);
    if (ln === 0) return ob;
    if (ln === 1) return cls[0];
    mxdc = cls[0];
    mxd = __subClassDepth(mxdc);
    for (i = 1; i < ln; i++) {
        cc = cls[i];
        cd = __subClassDepth(cc);
        if (cd > mxd) {
            mxd = cd;
            mxdc = cc;
        }
    }
    return mxdc;
}

function __partitionRestrictions(rst) {
    var rst;
    var rs;
    var ln;
    var i;
    var crs;
    var prp;
    var rprp;
    var cv;
    rs = mkResource();
    ln = __seqLength(rst);
    for (i = 0; i < ln; i++) {
        crs = rst[i];
        prp = ____obsel(crs, owlOnProperty);
        rprp = __regarding(prp);
        cv = ____fget(rs, rprp);
        if (!cv) {
            cv = [ crs ];
            ______assert(rs, rprp, cv);
        } else ____seqobAdd(cv, crs);
    }
    return rs;
}

function ____consolidateRestrictions(p, rst) {
    var p;
    var rst;
    var alvf;
    var ln;
    var crd;
    var mxc;
    var cmxc;
    var i;
    var ccrd;
    var crdr;
    var hsvr;
    var mxr;
    var alv;
    var ms;
    var cr;
    var hsv;
    alvf = __mk_emptysequence("<unprintable>");
    ln = __seqLength(rst);
    crd = -1;
    mxc = -1;
    ln = __seqLength(rst);
    for (i = 0; i < ln; i++) {
        cr = rst[i];
        alv = ____obsel(cr, owlAllValuesFrom);
        if (!hsv) {
            hsv = ____obsel(cr, "owl:hasValue");
            hsvr = cr;
        }
        ccrd = ____intsel(cr, owlCardinality);
        cmxc = ____intsel(cr, "owl:maxCardinality");
        if (ccrd === 1) {
            crd = 1;
            crdr = cr;
        }
        if (cmxc === 1) {
            mxc = 1;
            mxr = cr;
        }
        if (alv) ____seqobAdd(alvf, alv);
    }
    __seqReset(rst);
    if (hsv) ____seqobAdd(rst, hsvr);
    if (alvf) {
        ms = __mostSpecific(alvf);
        ____seqobAdd(rst, ____mkAllValuesFromRestriction(p, ms));
    }
    if (crd === 1) ____seqobAdd(rst, crdr); else if (mxc === 1) ____seqobAdd(rst, mxr);
}

function ____collectRestrictions(rs, cl) {
    var rs;
    var cl;
    var sbc;
    var ln;
    var i;
    var csb;
    sbc = ____mget(cl, "rdfs:subClassOf");
    if (sbc) {
        ln = __seqLength(sbc);
        for (i = 0; i < ln; i++) {
            csb = sbc[i];
            if (__type0(csb) === Restriction) ____seqobAdd(rs, csb); else ____collectRestrictions(rs, csb);
        }
    }
}

function __initialize(s) {
    var s;
    var sbc;
    var ln;
    var i;
    var rst;
    var r;
    var rtable;
    var bnd;
    var ky;
    var p;
    var cb;
    sbc = ____mget(s, "rdfs:subClassOf");
    if (!sbc) return;
    ln = __seqLength(sbc);
    rst = __mk_emptysequence("<unprintable>");
    ____collectRestrictions(rst, s);
    rtable = __partitionRestrictions(rst);
    bnd = __bindings(rtable);
    ln = __seqLength(bnd);
    for (i = 0; i < ln; i++) {
        cb = bnd[i];
        ky = ____obsel(cb, Binding_key);
        p = ____obsel(ky, Regarding_value);
        r = ____obsel(cb, Binding_value);
        ____consolidateRestrictions(p, r);
    }
    ______set(s, fablRestrictions, rtable);
}

function ____restrictionsOn(s, p) {
    var s;
    var p;
    var rtable;
    rtable = ____get(s, fablRestrictions);
    if (!rtable) return null;
    return ____get(rtable, __regarding(p));
}

function __class1(s) {
    var s;
    var q;
    var ns;
    var pr;
    var lc;
    var cv;
    var rs;
    var sbc;
    q = __parseQname(s);
    pr = __cadr(q);
    ns = __namespace(pr);
    lc = __caddr(q);
    cv = ____selectUri(ns, lc);
    if (!cv) {
        rs = __iNew(Sort);
        classBeingDefined = rs;
        ______bindUri(ns, lc, rs);
        return rs;
    } else {
        if (!(__type0(cv) === Class)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Attempt to redefine ");
            ____times(uwriteBuffer, s);
            ____times(uwriteBuffer, " as a Class");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rs = cv;
        sbc = ____mget(rs, "rdfs:subClassOf");
        if (sbc) __seqReset(sbc);
        classBeingDefined = rs;
        return rs;
    }
}

function __class(s) {
    var s;
    __class1(s);
}

function ____class(s, subclasses) {
    var s;
    var subclasses;
    var ln;
    var i;
    var rs;
    rs = __class1(s);
    ln = __seqLength(subclasses);
    for (i = 0; i < ln; i++) {
        ______assert(rs, "rdfs:subClassOf", subclasses[i]);
    }
}

function ____________addPropertyRestriction(tp, prp, valueType, value, crd, maxc) {
    var tp;
    var prp;
    var valueType;
    var value;
    var crd;
    var maxc;
    var crst;
    if (value) {
        crst = ____mkHasValueRestriction(prp, value);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
    if (valueType) {
        crst = ____mkAllValuesFromRestriction(prp, valueType);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
    if (crd === 1) {
        crst = ____mkCardinalityRestriction(prp, 1);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
    if (maxc === 1) {
        crst = ____mkMaxCardinalityRestriction(prp, 1);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
}

function ______addPropertyRestriction(tp, prp, valueType) {
    var tp;
    var prp;
    var valueType;
    ____________addPropertyRestriction(tp, prp, valueType, null, 0, 1);
}

function __________addPropertyRestriction(prp, valueType, value, crd, maxc) {
    var prp;
    var valueType;
    var value;
    var crd;
    var maxc;
    if (!classBeingDefined) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No class being defined");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ____________addPropertyRestriction(classBeingDefined, prp, valueType, value, crd, maxc);
}

function ____addPropertyRestriction(prp, valueType) {
    var prp;
    var valueType;
    __________addPropertyRestriction(prp, valueType, null, 0, 1);
}

function ______addField(tp, nm, vtp) {
    var tp;
    var nm;
    var vtp;
    var prp;
    var cv;
    cv = ____selectUri(tp, nm);
    if (cv) {
        if (!____hasType(cv, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Cannot redefine ");
            ____times(uwriteBuffer, nm);
            ____times(uwriteBuffer, " as a field");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = cv;
    } else {
        prp = __iNew(Property);
        ______bindUri(tp, nm, prp);
    }
    ____________addPropertyRestriction(tp, prp, vtp, null, 1, 0);
}

function endClass() {
    __initialize(classBeingDefined);
    classBeingDefined = null;
}

function ____propertyValueConstraints(tp, p) {
    var tp;
    var p;
    var btfs;
    var prst;
    var avf;
    var rsts;
    var rst;
    var rstsq;
    var crst;
    var vrst;
    var ct;
    var pt;
    var vt;
    var cf;
    var pf;
    var vf;
    var ln;
    var i;
    var rp;
    rp = __regarding(p);
    btfs = ____get(tp, bitFields);
    if (btfs) {
        if (____get(btfs, rp)) return ____cons(fabl_boolean, "functional");
    }
    prst = ____get(tp, fablRestrictions);
    if (prst) {
        rsts = ____get(prst, rp);
        if (rsts) {
            if (!(__obkind(rsts) === seq_kind)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "internal");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            rstsq = rsts;
            cf = fabl_false;
            ln = __seqLength(rstsq);
            for (i = 0; i < ln; i++) {
                crst = rstsq[i];
                avf = ____obsel(crst, "owl:allValuesFrom");
                if (avf) ct = avf;
                if (____intsel(crst, "owl:cardinality") === 1 || ____intsel(crst, "owl:maxCardinality") === 1) cf = fabl_true;
            }
        }
    }
    pt = __range(p);
    if (!pt) {
        if (!ct) vt = ob; else vt = ct;
    } else {
        if (!ct) vt = pt; else vt = __mostSpecific([ pt, ct ]);
    }
    pf = fabl_false;
    if (____hasType(p, FunctionalProperty)) pf = fabl_true;
    if (pf || cf) vf = "functional"; else vf = "unconstrained";
    return ____cons(vt, vf);
}

function ____propertyValueType(tp, p) {
    var tp;
    var p;
    var vc;
    vc = ____propertyValueConstraints(tp, p);
    return __car(vc);
}

function ____propertyBitField(tp, p) {
    var tp;
    var p;
    var rs;
    var btfs;
    btfs = ____fget(tp, bitFields);
    if (btfs) rs = ____get(btfs, __regarding(p));
    if (!rs) rs = ____fget(p, bitField);
    return rs;
}

function ______assert(x, p, y) {
    var x;
    var p;
    var y;
    ______assert(x, p, y);
}

function __nameOrQnamePrint(x) {
    var x;
    var rs;
    if (__isId(x)) return __toString(x);
    if (__isList(x)) {
        if (____um_eq(__car(x), "_colon_")) {
            rs = "";
            {
                ____times(rs, __cadr(x));
                ____times(rs, ":");
                ____times(rs, __caddr(x));
            }
            return rs;
        }
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected name or qualified name: ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __isOne(x) {
    var x;
    return __obkind(x) === int_kind && __ob_to_integer(x) === 1;
}

var lastRestrict;

null;

function __analyzeRestrict(x) {
    var x;
    var cx;
    var ccx;
    var cl;
    var clv;
    var prpx;
    var aclv;
    var prp;
    var avfr;
    var hasval;
    var crd;
    var mxc;
    var clk;
    cx = __cdr(x);
    ccx = __car(cx);
    prpx = __evalQnameN(__car(cx));
    if (!prpx) {
        prp = __iNew("rdf:Property");
        ______bindUri(__namespace(__cadr(ccx)), __caddr(ccx), prp);
    } else {
        if (!____hasType(prpx, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected a property: ");
            ____times(uwriteBuffer, __nameOrQnamePrint(__car(cx)));
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = prpx;
    }
    cx = __cdr(cx);
    crd = 0;
    mxc = 0;
    hasval = null;
    avfr = null;
    while (__isList(cx)) {
        cl = __car(cx);
        clk = __car(cl);
        if (clk === "maxCardinality") {
            clv = __cadr(cl);
            if (!__isOne(clv)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "maxCardinality must have value 1");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            mxc = 1;
        } else if (clk === "cardinality") {
            clv = __cadr(cl);
            if (!__isOne(clv)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "cardinality must have value 1");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            crd = 1;
        } else if (clk === "allValuesFrom") {
            clv = __cadr(cl);
            avfr = __analyzeTypen(clv);
            if (!avfr) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "allValuesFrom must be a Class");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        } else if (clk === "hasValue") {
            clv = __cadr(cl);
            aclv = __analyze(clv);
            hasval = __evaluate(aclv);
        } else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "internal: unexpected clause: ");
            ____times(uwriteBuffer, clk);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        cx = __cdr(cx);
    }
    ____________addPropertyRestriction(classBeingDefined, prp, avfr, hasval, crd, mxc);
    return __integer_to_ob(1);
}

function ________defineBitField(cls, btp, prp, bt) {
    var cls;
    var btp;
    var prp;
    var bt;
    var btf;
    var bfs;
    btf = __iNew("fabl:BitField");
    ______obset(btf, BitField_ofProperty, prp);
    ______intset(btf, BitField_lowbit, bt);
    ______intset(btf, BitField_highbit, bt);
    bfs = ____fget(cls, bitFields);
    if (!bfs) {
        bfs = __iNew("rdfs:Resource");
        ______set(cls, bitFields, bfs);
    }
    ______set(bfs, __regarding(btp), btf);
}

function __restrict_tf(x) {
    var x;
    lastRestrict = x;
    __analyzeRestrict(x);
    return "restrict";
}

var analyzeVerbose;

fabl_false;

var analysisTempCount;

0;

var analyzerActive = fabl_true;

var macroInputs = [ fabl_id, SeqOfXob ];

var constructorInputs = [ Any ];

var classBeingDefined;

[ Any ];

var inClassContext;

[ Any ];

var thisXob;

[ Any ];

function __________associateFunction(fr, bnm, nm, fnm, inputs) {
    var fr;
    var bnm;
    var nm;
    var fnm;
    var inputs;
    var fn;
    var vrs;
    var vrsq;
    fn = ______getVariant(fr, fnm, inputs);
    if (!fn) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No function of the right type named ");
        ____times(uwriteBuffer, fnm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    vrs = ____get(fr, bnm);
    if (!vrs) {
        vrs = mkObject();
        ________set(fr, bnm, vrs, Any);
    }
    vrsq = ____get(vrs, __regarding(nm));
    if (!vrsq) {
        vrsq = [ fn ];
        ________set(vrs, __regarding(nm), vrsq, SeqOfFunction);
    } else ____seqobAdd(vrsq, fn);
}

var macrosP = ____selectUri(fabl, "macros");

function ______macro(fr, nm, fnm) {
    var fr;
    var nm;
    var fnm;
    __________associateFunction(fr, macrosP, nm, fnm, macroInputs);
}

var constructorsP = ____selectUri(fabl, "constructors");

function ______constructor(fr, nm, fnm) {
    var fr;
    var nm;
    var fnm;
    __________associateFunction(fr, constructorsP, nm, fnm, constructorInputs);
}

function ____lookupBinding(env, nm) {
    var env;
    var nm;
    var ln;
    var i;
    var cf;
    var bn;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        cf = env[i];
        bn = ____selectGlobalBinding(cf, nm);
        if (bn) return bn;
    }
    return null;
}

function ____lookup(env, nm) {
    var env;
    var nm;
    var b;
    b = ____lookupBinding(env, nm);
    if (!b) return null;
    return ____obsel(b, Binding_value);
}

function ______lkupAssociatedFunctions(env, bnm, nm) {
    var env;
    var bnm;
    var nm;
    var ln;
    var i;
    var cf;
    var sbn;
    var bn;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        cf = env[i];
        bn = ____get(cf, bnm);
        if (bn) {
            sbn = ____get(bn, __regarding(nm));
            if (sbn) return sbn;
        }
    }
    return null;
}

function __lkupConstructors(nm) {
    var nm;
    return ______lkupAssociatedFunctions(homePath(), constructorsP, nm);
}

function __lkupMacros(nm) {
    var nm;
    return ______lkupAssociatedFunctions(homePath(), macrosP, nm);
}

function __analyze(nm) {
    var nm;
    var b;
    var rs;
    if (!nm) return nulXob;
    if (nm === "home") return ____selectGlobalBinding(fabl, "home");
    if (nm === "nil") return nulXob;
    b = ____lookupBinding(cPath, nm);
    if (!b) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unknown symbol: ");
        ____times(uwriteBuffer, nm);
        ____times(uwriteBuffer, " in a PATH of length ");
        ____times(uwriteBuffer, __seqLength(cPath));
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return b;
}

function __analyzeList(x) {
    var x;
    var dt;
    var cx;
    dt = __mk_emptysequence("<unprintable>");
    cx = x;
    while (__isList(cx)) {
        ____seqobAdd(dt, __analyze(__car(cx)));
        cx = __cdr(cx);
    }
    return dt;
}

function ____coercesTo(src, dest) {
    var src;
    var dest;
    if (____um_eq(src, dest)) return fabl_true;
    if (dest === ob) return coerceToOb;
    if (coerceToLiteral && dest === Literal) return src === fabl_int || src === fabl_double || src === fabl_boolean || src === fabl_string;
    if (coerceToSuperClasses && ____isSubClassOf(src, dest)) return fabl_true;
    return ____um_eq(src, fabl_int) && ____um_eq(dest, fabl_double) || ____um_eq(src, fabl_id) && ____um_eq(dest, fabl_string);
}

function ____matchInputs(fntp, inputs) {
    var fntp;
    var inputs;
    var dtf;
    var ln;
    var i;
    var rs;
    rs = 0;
    dtf = __inputTypes(fntp);
    ln = __seqLength(inputs);
    if (!(__seqLength(dtf) === ln)) return -1;
    for (i = 0; i < ln; i++) {
        if (!____um_eq(inputs[i], dtf[i])) {
            if (____coercesTo(inputs[i], dtf[i])) rs++; else return -1;
        }
    }
    return rs;
}

var inputTypesBuf = __mk_emptysequence("<unprintable>");

function ______findVariant0(vrs, nm, inputs) {
    var vrs;
    var nm;
    var inputs;
    var dt;
    var ln;
    var i;
    var cost;
    var mincost;
    var cf;
    var rs;
    var fsrt;
    ln = __seqLength(vrs);
    rs = null;
    for (i = 0; i < ln; i++) {
        cf = vrs[i];
        fsrt = ____obsel(cf, Function_type);
        cost = ____matchInputs(fsrt, inputs);
        if (cost >= 0) {
            if (!rs || cost < mincost) {
                rs = cf;
                mincost = cost;
            }
        }
    }
    return rs;
}

function ______findVariant(fr, nm, inputs) {
    var fr;
    var nm;
    var inputs;
    var vrs;
    var vr;
    vr = ______getVariant(fr, nm, inputs);
    if (vr) return vr;
    vrs = ____variants(fr, nm);
    if (analyzeVerbose) {
        if (!vrs) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Nul vrs");
            __tprint(uwriteBuffer);
            terpri();
        } else {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "NNul vrs");
            __tprint(uwriteBuffer);
            terpri();
        }
    }
    if (!vrs) return null; else return ______findVariant0(vrs, nm, inputs);
}

function ______findVariant(env, nm, inputs) {
    var env;
    var nm;
    var inputs;
    var ln;
    var i;
    var rs;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        rs = ______findVariant(env[i], nm, inputs);
        if (rs) return rs;
    }
}

function ______getVariant(env, nm, inputs) {
    var env;
    var nm;
    var inputs;
    var ln;
    var i;
    var rs;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        rs = ______getVariant(env[i], nm, inputs);
        if (rs) return rs;
    }
}

function ____metaCoerce(x, s) {
    var x;
    var s;
    var rsq;
    var dtx;
    var ln;
    var i;
    var mt;
    rsq = __mk_emptysequence("<unprintable>");
    ln = __seqLength(s);
    for (i = 0; i < ln; i++) {
        mt = ____metaCoerce(x[i], s[i]);
        if (!mt) return null;
        ____seqobAdd(rsq, mt);
    }
    return rsq;
}

var select_buffer = 0;

function ______selectString(s, lb, ub) {
    var s;
    var lb;
    var ub;
    __reset(select_buffer);
    ________select(select_buffer, s, lb, ub);
    return __toString(select_buffer);
}

function __stripSet(s) {
    var s;
    var ln;
    ln = __length(s);
    if (ln < 5) return null;
    if (____select(s, 0) === 115 && ____select(s, 1) === 101 && ____select(s, 2) === 116 && ____select(s, 3) === 95) return ______selectString(s, 4, ln - 1);
}

var methodArgsBuf = __mk_emptysequence("<unprintable>");

function consoleStackDepth() {
    return 0;
}

function __analyzeVerboseReturn(x) {
    var x;
    if (analyzeVerbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, consoleStackDepth() - 1);
        ____times(uwriteBuffer, " Analysis returned ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
    }
    return x;
}

function ____metaApplynNonPrim(fn, xbs) {
    var fn;
    var xbs;
    var brt;
    var ftp;
    var rstp;
    var sq;
    var e;
    var rsx;
    ftp = __type(fn);
    e = mkObject();
    rsx = ______bindLocal(e, "_nonPrimFun_", ftp);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, fn));
    brt = blockReturnType;
    rstp = __resultType(ftp);
    blockReturnType = rstp;
    ____seqobAdd(sq, ____metaBlockReturn(____metaApplyn(rsx, xbs), null));
    blockReturnType = brt;
    return ______mkValueReturningXblock(rstp, e, sq);
}

function ____analyzen(x, try_strip_set) {
    var x;
    var try_strip_set;
    var op;
    var setop;
    var cns;
    var xmacs;
    var args;
    var itps;
    var ln;
    var i;
    var k;
    var fn;
    var ccn;
    var xmac;
    var fnb;
    var prp;
    var ns;
    var qv;
    var splitop;
    var env;
    var cdx;
    var rs;
    var a0;
    var crxa;
    var fntp;
    var rng;
    var s0;
    var crx;
    var opisqn;
    var opiss;
    var isp;
    var qop;
    var gb;
    var e1;
    var e2;
    k = __obkind(x);
    if (analyzeVerbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, consoleStackDepth());
        ____times(uwriteBuffer, " Analyzing ");
        ____times(uwriteBuffer, x);
        ____times(uwriteBuffer, " of obkind ");
        ____times(uwriteBuffer, k);
        __tprint(uwriteBuffer);
        terpri();
    }
    if (!x) return nulXob; else if (k === int_kind) return __meta(__ob_to_integer(x));
    if (k === double_kind) return __meta(__toDouble(x));
    if (k === string_kind) return __analyzeVerboseReturn(__analyze(x));
    if (__isList(x)) {
        crx = __car(x);
        if (____um_eq(crx, "_colon_")) {
            e1 = __cadr(x);
            e2 = __caddr(x);
            if (!__isId(e1) || !__isId(e2)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Bad form for qualified name: ");
                ____times(uwriteBuffer, x);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            ns = __namespace(e1);
            if (!ns) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "No such namespace: ");
                ____times(uwriteBuffer, ns);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            qv = ____selectUri(ns, e2);
            if (qv) {
                if (____hasType(qv, Sort)) return ____meta(qv, Sort);
                if (____hasType(qv, Property)) return ____meta(qv, Property);
                return ____meta(qv, ob);
            }
            gb = ____selectBinding(ns, e2);
            if (!gb) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, e1);
                ____times(uwriteBuffer, ":");
                ____times(uwriteBuffer, e2);
                ____times(uwriteBuffer, " undefined");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            return gb;
        }
        isp = __isList(crx);
        op = crx;
        opiss = !isp;
        if (opiss && ____um_eq(op, "_quote_")) {
            cdx = __cadr(x);
            if (__obkind(cdx) === seq_kind) rs = __analyzeStringBufConst(cdx); else rs = cdx;
            return __analyzeVerboseReturn(rs);
        }
        cns = __lkupConstructors(op);
        if (cns) {
            ln = __seqLength(cns);
            for (i = 0; i < ln; i++) {
                ccn = cns[i];
                rs = ____applynOb(ccn, x);
                if (rs) return __analyzeVerboseReturn(rs);
            }
        }
        args = __analyzeList(__cdr(x));
        ln = __seqLength(args);
        __seqReset(inputTypesBuf);
        for (i = 0; i < ln; i++) ____seqobAdd(inputTypesBuf, __type(args[i]));
        if (opiss) fnb = ____lookupBinding(cPath, op); else fnb = null;
        if (fnb) {
            fntp = __type(fnb);
            if (____um_eq(____obsel(fntp, Sort_constructor), "Function") && ____matchInputs(fntp, inputTypesBuf) >= 0) return __analyzeVerboseReturn(____metaApplyn(fnb, ____metaCoerce(args, __inputTypes(fntp))));
        }
        if (opiss) {
            fn = ______findVariant(homePath(), op, inputTypesBuf);
            if (analyzeVerbose) {
                if (fn) {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Found fn");
                    __tprint(uwriteBuffer);
                    terpri();
                } else {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Did not find fn");
                    __tprint(uwriteBuffer);
                    terpri();
                }
            }
        } else {
            if (__isQname(crx)) {
                ns = __namespace(__cadr(crx));
                fn = ______findVariant(ns, __caddr(crx), inputTypesBuf);
            } else {
                itps = __seqCopy(inputTypesBuf);
                crxa = __analyze(crx);
                fntp = __type(crxa);
                if (!____um_eq(____obsel(fntp, Sort_constructor), "Function")) {
                    beforeError();
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Non functional expression in applicatation: ");
                    ____times(uwriteBuffer, x);
                    __tprint(uwriteBuffer);
                    terpri();
                    afterError();
                }
                if (____matchInputs(fntp, itps) >= 0) return __analyzeVerboseReturn(____metaApplynNonPrim(crxa, ____metaCoerce(args, __inputTypes(fntp))));
                {
                    beforeError();
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Type mismatch in application of ");
                    ____times(uwriteBuffer, crx);
                    __tprint(uwriteBuffer);
                    terpri();
                    afterError();
                }
            }
        }
        if (fn) {
            fntp = ____obsel(fn, Function_type);
            return __analyzeVerboseReturn(____metaApplyn(fn, ____metaCoerce(args, __inputTypes(fntp))));
        }
        if (opiss) xmacs = __lkupMacros(op); else xmacs = null;
        if (xmacs) {
            ln = __seqLength(xmacs);
            for (i = 0; i < ln; i++) {
                xmac = xmacs[i];
                rs = ______applynOb(xmac, op, args);
                if (rs) return __analyzeVerboseReturn(rs);
            }
        }
        return __analyzeVerboseReturn(null);
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "internal2");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __analyzen(x) {
    var x;
    return ____analyzen(x, fabl_true);
}

function __analyze(x) {
    var x;
    var rs;
    var msg;
    rs = __analyzen(x);
    if (!rs) {
        if (__isList(x)) msg = __car(x); else msg = x;
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Failure to analyze application:");
            ____times(uwriteBuffer, msg);
            ____times(uwriteBuffer, " in ");
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    return rs;
}

function ____copyInto(dst, src) {
    var dst;
    var src;
    var ln;
    var i;
    __seqReset(dst);
    ln = __seqLength(src);
    for (i = 0; i < ln; i++) ____seqobAdd(dst, src[i]);
}

function __analyzeToplevel(x) {
    var x;
    ____copyInto(cPath, homePath());
    return __analyze(x);
}

var mk_emptyseq1_fun;

var copyStringConst_fun = ______getVariant(home, "copyStringConst", [ fabl_string ]);

var unprintable_fun = ______getVariant(home, "unprintable", [ fabl_string ]);

var map_void_ob_ob = ____mkFunctionType(fabl_void, [ ob, ob ]);

var map_void_ob_int = ____mkFunctionType(fabl_void, [ ob, fabl_int ]);

var map_void_ob_double = ____mkFunctionType(fabl_void, [ ob, fabl_double ]);

var propNS;

____mkFunctionType(fabl_void, [ ob, fabl_double ]);

var genName_buf = "";

function __stripStringCopy(x) {
    var x;
    var fn;
    var args;
    if (____hasType(x, Xapply)) {
        fn = ____obsel(x, Xapply_functionOf);
        if (____um_eq(fn, copyStringConst_fun)) {
            args = ____obsel(x, Xapply_arguments);
            return args[0];
        }
    }
    return x;
}

function __analyzeTypen(x) {
    var x;
    var srt;
    var b;
    var rs;
    var ssrt;
    var resulttype;
    var cx;
    var k;
    var ln;
    var sbs;
    var cs;
    var a0s;
    var a1s;
    var vl;
    var rm;
    var xs;
    var qv;
    k = __obkind(x);
    if (k === string_kind) {
        xs = x;
        srt = ____lookupBinding(homePath(), xs);
        if (!srt || !____um_eq(____obsel(srt, Binding_type), Sort)) return null;
        return __bindingValue(srt);
    }
    if (__isList(x)) {
        ln = __listLength(x);
        if (ln === 2) {
            if (____um_eq(__car(x), "SeqOf")) {
                ssrt = __analyzeTypen(__cadr(x));
                if (!ssrt) return null;
                return __SeqOf(ssrt);
            }
            if (____um_eq(__car(x), "BagOf")) {
                ssrt = __analyzeTypen(__cadr(x));
                if (!ssrt) return null;
                return __BagOf(ssrt);
            }
            if (____um_eq(__car(x), "AltOf")) {
                ssrt = __analyzeTypen(__cadr(x));
                if (!ssrt) return null;
                return __AltOf(ssrt);
            }
        }
        if (ln >= 2 && ____um_eq(__car(x), "_colon_")) {
            qv = __evalQname(x);
            if (____hasType(qv, Sort)) return qv;
            return null;
        }
        if (ln >= 2 && ____um_eq(__car(x), "Function")) {
            sbs = __mk_emptysequence("<unprintable>");
            cx = __cdr(x);
            resulttype = __analyzeTypen(__car(cx));
            cx = __cdr(cx);
            while (__isList(cx)) {
                cs = __analyzeTypen(__car(cx));
                if (!cs) return null;
                ____seqobAdd(sbs, cs);
                cx = __cdr(cx);
            }
            return ____mkFunctionType(resulttype, sbs);
        }
    }
    return null;
}

function __analyzeType(x) {
    var x;
    var rs;
    rs = __analyzeTypen(x);
    if (!rs) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Non-type: ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return rs;
}

function ______bindPif(cn, nm, s) {
    var cn;
    var nm;
    var s;
    if (__inputTypes(s)) return ______internFunction(cn, nm, s); else return ______bindGlobal(cn, nm, s);
}

function __typeOfBindingOrFunction(x) {
    var x;
    if (__isBinding(x)) return ____obsel(x, Binding_type); else return ____obsel(x, Function_type);
}

function ______analyzeTypedVar(fr, x, local) {
    var fr;
    var x;
    var local;
    var nm;
    var nms;
    var prp;
    var iss;
    var srt;
    nm = __caddr(x);
    iss = __isId(nm);
    if (iss) nms = nm;
    srt = __analyzeType(__cadr(x));
    if (local) {
        if (!iss) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected id: ");
            ____times(uwriteBuffer, nm);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        ______bindLocal(fr, nms, srt);
        return srt;
    }
    if (!classBeingDefined) {
        if (!iss) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "NOT YET");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return __typeOfBindingOrFunction(______bindPif(fr, nms, srt));
    }
    if (iss) {
        ______addField(classBeingDefined, nms, srt);
        return srt;
    }
    if (__isQname(nm)) {
        prp = __toProperty(nm);
        ______addPropertyRestriction(classBeingDefined, prp, srt);
        return srt;
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Incorrect form for variable in var statement: ");
        ____times(uwriteBuffer, nm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______analyzeTypedVars(nwe, x, local) {
    var nwe;
    var x;
    var local;
    var cx;
    var ce;
    var lsts;
    cx = x;
    lsts = null;
    while (__isList(cx)) {
        ce = __car(cx);
        if (__obkind(ce) === string_kind) {
            if (!lsts) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Sort needed for variable ");
                ____times(uwriteBuffer, ce);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            if (local) ______bindLocal(nwe, ce, lsts); else ______bindPif(nwe, ce, lsts);
        } else lsts = ______analyzeTypedVar(nwe, ce, local);
        cx = __cdr(cx);
    }
}

function ____analyzeLocalVars(nwe, x) {
    var nwe;
    var x;
    ______analyzeTypedVars(nwe, x, fabl_true);
}

function ____analyzeTypedVars(nwe, x) {
    var nwe;
    var x;
    ______analyzeTypedVars(nwe, x, fabl_false);
}

function ____times(s, fn) {
    var s;
    var fn;
    var nm;
    var tp;
    var itps;
    var rtp;
    var ln;
    var lnm1;
    var i;
    nm = ____obsel(fn, Function_name);
    tp = ____obsel(fn, Function_type);
    rtp = __resultType(tp);
    itps = __inputTypes(tp);
    {
        ____times(s, nm);
        ____times(s, "(");
    }
    ln = __seqLength(itps);
    lnm1 = ln - 1;
    for (i = 0; i < ln; i++) {
        ____times(s, itps[i]);
        if (i < lnm1) ____times(s, ",");
    }
    {
        ____times(s, ") => ");
        ____times(s, rtp);
    }
}

function ____times(s, fn) {
    var s;
    var fn;
    var ky;
    var tp0;
    var tp;
    var rg;
    ____times(s, "[");
    ky = ____obsel(fn, Binding_key);
    if (__obkind(ky) === string_kind) ____times(s, ky); else {
        tp0 = __type0(ky);
        if (tp0 === Regarding) {
            rg = ____obsel(ky, Regarding_value);
            if (__obkind(rg) === string_kind) ____times(s, rg); else ____times(s, "<unprintable>");
        } else ____times(s, __name(ky));
    }
    ____times(s, " of type ");
    tp = __type(fn);
    if (!tp) ____times(s, "Resource"); else ____times(s, __type(fn));
    ____times(s, "]");
}

function __help1(x) {
    var x;
    var i;
    var ln;
    var j;
    var iln;
    var ce;
    var b;
    var vrs;
    var pfx;
    var pth;
    pth = homePath();
    ln = __seqLength(pth);
    for (i = ln - 1; i >= 0; i--) {
        ce = pth[i];
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, i);
            ____times(uwriteBuffer, " ");
            __tprint(uwriteBuffer);
            terpri();
        }
        b = ____selectGlobalBinding(ce, x);
        if (b) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "  ");
            ____times(uwriteBuffer, b);
            __tprint(uwriteBuffer);
            terpri();
        }
        vrs = ____variants(ce, x);
        if (vrs) {
            iln = __seqLength(vrs);
            for (j = 0; j < iln; j++) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "  ");
                ____times(uwriteBuffer, vrs[j]);
                __tprint(uwriteBuffer);
                terpri();
            }
        }
    }
}

var help1_fun = ______getVariant(home, "help1", [ fabl_id ]);

function __help_tf(x) {
    var x;
    var cx;
    if (__listLength(x) === 2) {
        cx = __cadr(x);
        if (__obkind(cx) === string_kind) return ____metaApplyn(help1_fun, __meta(cx));
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Format: help(name)");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __Xblock_tf(x) {
    var x;
    var st;
    var cs;
    var cel;
    var rs;
    var e;
    var isvr;
    e = null;
    st = __cadr(x);
    cel = __seqLength(cPath);
    rs = __mk_emptysequence("<unprintable>");
    while (__isList(st)) {
        cs = __car(st);
        if (__isList(cs)) isvr = ____um_eq(__car(cs), "var"); else isvr = fabl_false;
        if (isvr) {
            if (____um_eq(__car(cs), "var")) {
                if (!e) {
                    e = mkResource();
                    ____seqobAdd(cPath, e);
                }
                ____analyzeLocalVars(e, __cdr(cs));
            }
        } else ____seqobAdd(rs, __analyze(cs));
        st = __cdr(st);
    }
    ____seqSetLength(cPath, cel);
    return ____mkXblock(e, rs);
}

function ____Xsequence_tf(x, ck) {
    var x;
    var ck;
    var st;
    var csrt;
    var esrt;
    var args;
    var cs;
    st = __cdr(x);
    if (!st) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "collections introduced with bag(...) or seq(...) must have at least one element");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    args = __mk_emptysequence("<unprintable>");
    esrt = null;
    while (__isList(st)) {
        cs = __analyze(__car(st));
        csrt = __type(cs);
        if (!esrt) esrt = csrt; else {
            if (!(esrt === csrt)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Elements in sequence must have the same type");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
        ____seqobAdd(args, cs);
        st = __cdr(st);
    }
    return ________metaSequencen(null, esrt, args, ck);
}

function __Xsequence_tf(x) {
    var x;
    return ____Xsequence_tf(x, "seq");
}

function __Xbag_tf(x) {
    var x;
    return ____Xsequence_tf(x, "bag");
}

function __Xalt_tf(x) {
    var x;
    return ____Xsequence_tf(x, "alt");
}

function __Function_tf(x) {
    var x;
    var rs;
    rs = __analyzeTypen(x);
    if (!rs) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Argument to Function is not a sort");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return __meta(rs);
}

function ____Xemptyseq_tf(x, ck) {
    var x;
    var ck;
    var st;
    var srt;
    var ssrt;
    var ln;
    var cp;
    st = __cdr(x);
    ln = __listLength(st);
    if (ln === 0 || ln > 2) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Format: emptysequence(sort) or emptysequence(sort,capacity)");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    srt = __analyzeType(__car(st));
    if (ck === "seq") ssrt = __SeqOf(srt); else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unknown collection kind: ");
        ____times(uwriteBuffer, ck);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (ln === 2) {
        cp = __analyze(__cadr(st));
        if (!(__type(cp) === fabl_int)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "int expected for capacity in emptyseq(type,capacity)");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return ____metaCast1(______metaApplyn(__homeFimpFun("mk_emptyseq1_fun"), __meta(ssrt), cp), ssrt);
    }
    return ____metaCast1(____metaApplyn(__homeFimpFun("mk_emptyseq_fun"), __meta(ssrt)), ssrt);
}

function __Xemptybag_tf(x) {
    var x;
    return ____Xemptyseq_tf(x, "bag");
}

function __Xemptyseq_tf(x) {
    var x;
    return ____Xemptyseq_tf(x, "seq");
}

var stringbufReset_fun = ______getVariant(home, "reset", [ fabl_string ]);

var setBit_fun = ______getVariant(home, "setBit", [ fabl_int, fabl_int, fabl_boolean ]);

var getBit_fun = ______getVariant(home, "getBit", [ fabl_int, fabl_int ]);

var SeqOfInt = __SeqOf(fabl_int);

var SeqOfByte = __SeqOf(fabl_byte);

var SeqOfDouble = __SeqOf(fabl_double);

var SeqOfBoolean = __SeqOf(fabl_boolean);

function __collectionKind(s) {
    var s;
    var cn;
    cn = ____obsel(s, Sort_constructor);
    if (!cn) return null;
    if (cn === "SeqOf" || cn === "BagOf" || cn === "AltOf") return cn;
    return null;
}

function __collectionSubtype(s) {
    var s;
    if (s === Seq || s === Bag || s === Alt) return ob;
    return ____obsel(s, Sort_param);
}

function __isCollectionType(s) {
    var s;
    return s === Seq || s === Bag || s === Alt || ____obsel(s, Sort_param);
}

function ____seq_elt_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var rs;
    var el;
    var elc;
    var fn;
    var sqs;
    var sqsi;
    var sqss;
    var args;
    var r;
    var st;
    if (!(__seqLength(a) === 2)) return null;
    sq = a[0];
    el = a[1];
    sqsi = __type(sq);
    if (sqsi === Seq) {
        sqs = SeqOfOb;
        sqss = ob;
    } else if (sqsi === Bag) {
        sqs = BagOfOb;
        sqss = ob;
    } else if (sqsi === Alt) {
        sqs = AltOfOb;
        sqss = ob;
    } else {
        sqs = sqsi;
        sqss = ____obsel(sqs, Sort_param);
    }
    if (!sqss) return null;
    st = __storage(sqss);
    elc = ____metaCoerce(el, sqss);
    if (!elc) return null;
    args = [ sq, elc ];
    if (nm === "push") {
        if (sqs === SeqOfByte) fn = __homeFimpFun("seqbyteAdd_fun"); else if (st === storage_int) fn = __homeFimpFun("seqintAdd_fun"); else if (st === storage_double) fn = __homeFimpFun("seqdoubleAdd_fun"); else fn = __homeFimpFun("seqobAdd_fun");
    } else if (nm === "contains") {
        if (sqs === SeqOfByte) fn = __homeFimpFun("seqbyteContains_fun"); else if (st === storage_int) fn = __homeFimpFun("seqintContains_fun"); else if (st === storage_double) fn = __homeFimpFun("seqdoubleContains_fun"); else fn = __homeFimpFun("seqobContains_fun");
    }
    rs = ____metaApplyn(fn, args);
    if (nm === "push") return ____metaCast1(rs, sqsi);
    return rs;
}

function ____seqobConcat(x, y) {
    var x;
    var y;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqobAppend(rs, x);
    ____seqobAppend(rs, y);
    return rs;
}

var seqobConcat_fun = ______getVariant(home, "seqobConcat", [ ob, ob ]);

function ____seqintConcat(x, y) {
    var x;
    var y;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqintAppend(rs, x);
    ____seqintAppend(rs, y);
    return rs;
}

var seqintConcat_fun = ______getVariant(home, "seqintConcat", [ ob, ob ]);

function ____seqdoubleConcat(x, y) {
    var x;
    var y;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqdoubleAppend(rs, x);
    ____seqdoubleAppend(rs, y);
    return rs;
}

var seqdoubleConcat_fun = ______getVariant(home, "seqdoubleConcat", [ ob, ob ]);

function ____seq_seq_tf(nm, a) {
    var nm;
    var a;
    var sq0;
    var sq1;
    var fn;
    var sq0s;
    var sq1s;
    var sq0si;
    var sq1si;
    if (!(__seqLength(a) === 2)) return null;
    sq0 = a[0];
    sq1 = a[1];
    sq0si = __type(sq0);
    sq1si = __type(sq1);
    if (sq0si === Seq) sq0s = SeqOfOb; else if (sq0si === Bag) sq0s = BagOfOb; else if (sq0si === Alt) sq0s = AltOfOb; else sq0s = sq0si;
    if (sq1si === Seq) sq1s = SeqOfOb; else if (sq1si === Bag) sq1s = BagOfOb; else if (sq1si === Alt) sq1s = AltOfOb; else sq1s = sq1si;
    if (!(sq0s === sq1s)) return null;
    if (!__isCollectionType(sq0s)) return null;
    if (nm === "times") {
        if (sq0s === SeqOfInt || sq0s === SeqOfBoolean || sq0s === BagOfInt || sq0s === AltOfInt) fn = __homeFimpFun("seqintAppend_fun"); else if (sq0s === SeqOfByte) fn = __homeFimpFun("seqbyteAppend_fun"); else if (sq0s === SeqOfDouble || sq0s === BagOfDouble || sq0s === AltOfDouble) fn = __homeFimpFun("seqdoubleAppend_fun"); else fn = __homeFimpFun("seqobAppend_fun");
    }
    if (nm === "plus") {
        if (sq0s === SeqOfInt || sq0s === SeqOfBoolean || sq0s === BagOfInt || sq0s === AltOfInt) fn = __homeFimpFun("seqintConcat_fun"); else if (sq0s === SeqOfDouble || sq0s === BagOfDouble || sq0s === AltOfDouble) fn = __homeFimpFun("seqdoubleConcat_fun"); else fn = __homeFimpFun("seqobConcat_fun");
    }
    return ____metaCast1(____metaApplyn(fn, a), sq0si);
}

function ____seq_int_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var el;
    var fn;
    var sqsi;
    var sqs;
    if (!(__seqLength(a) === 2)) return null;
    sq = a[0];
    el = a[1];
    if (!(__type(el) === fabl_int)) return null;
    sqsi = __type(sq);
    if (sqsi === Seq) sqs = SeqOfOb; else if (sqsi === Bag) sqs = BagOfOb; else if (sqsi === Alt) sqs = AltOfOb; else sqs = sqsi;
    if (!__isCollectionType(sqs)) return null;
    if (nm === "set_length") fn = __homeFimpFun("seqSetLength_fun");
    return ____metaApplyn(fn, a);
}

function ____seq_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var el;
    var fn;
    var sqs;
    if (!(__seqLength(a) === 1)) return null;
    sq = a[0];
    sqs = __type(sq);
    if (!__isCollectionType(sqs)) return null;
    if (nm === "length") fn = __homeFimpFun("seqLength_fun"); else if (nm === "reset") fn = __homeFimpFun("seqReset_fun");
    return ____metaApplyn(fn, a);
}

function ____seq_to_seq_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var el;
    var fn;
    var sqs;
    var sqsi;
    var r;
    if (!(__seqLength(a) === 1)) return null;
    sq = a[0];
    sqsi = __type(sq);
    if (sqsi === Seq) sqs = SeqOfOb; else if (sqsi === Bag) sqs = BagOfOb; else if (sqsi === Alt) sqs = AltOfOb; else sqs = sqsi;
    if (!__isCollectionType(sqs)) return null;
    if (nm === "copy") fn = __homeFimpFun("seqCopy_fun"); else return null;
    return ____metaCast1(____metaApplyn(fn, a), sqsi);
}

function ____eq_tf(nm, a) {
    var nm;
    var a;
    var a0;
    var a1;
    var sa0;
    var sa1;
    if (!(__seqLength(a) === 2)) return null;
    a0 = a[0];
    sa0 = __type(a0);
    a1 = a[1];
    sa1 = __type(a1);
    if (__storage(sa0) === storage_ob && __storage(sa1) === storage_ob) return ____metaApplyn(__homeFimpFun("obEq_fun"), a);
    return null;
}

var intIntEqual_fun = ______getVariant(home, "equal", [ fabl_int, fabl_int ]);

function ____intIntEqual_tf(nm, a) {
    var nm;
    var a;
    var a0;
    var a1;
    var sa0;
    var sa1;
    if (!(__seqLength(a) === 2)) return null;
    a0 = a[0];
    sa0 = __type(a0);
    a1 = a[1];
    sa1 = __type(a1);
    if (sa0 === fabl_byte) {
        if (sa1 === fabl_byte) return ______metaApplyn(__homeFimpFun("intIntEqual_fun"), ____metaCast(a0, fabl_int), ____metaCast(a1, fabl_int));
        if (sa1 === fabl_int) return ______metaApplyn(__homeFimpFun("intIntEqual_fun"), ____metaCast(a0, fabl_int), a1);
        return null;
    }
    if (sa1 === fabl_byte) {
        if (sa0 === fabl_int) return ______metaApplyn(__homeFimpFun("intIntEqual_fun"), a0, ____metaCast(a1, fabl_int));
        return null;
    }
    return null;
}

function __nameToString(x) {
    var x;
    var k;
    var pr;
    var lc;
    k = __obkind(x);
    if (k === nstring_kind || k === wstring_kind) return __mkString(x); else if (__isQname(x)) {
        pr = __cadr(x);
        lc = __caddr(x);
        return "{pr~id}:{lc~id}";
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __functionname_tf(x) {
    var x;
    var ln;
    var i;
    var nmok;
    var nmo;
    var ns;
    var nmisid;
    var fnm;
    var pr;
    var itps;
    var vr;
    ln = __listLength(x);
    nmo = __cadr(x);
    nmok = __obkind(nmo);
    if (nmok === nstring_kind || nmok === wstring_kind) {
        nmisid = fabl_true;
        ns = home;
        fnm = nmo;
    } else if (__isQname(nmo)) {
        nmisid = fabl_false;
        pr = __cadr(nmo);
        fnm = __caddr(nmo);
        ns = __namespace(pr);
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Function name must be an id or qualified name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    itps = __mk_emptysequence("<unprintable>");
    for (i = 2; i < ln; i++) ____seqobAdd(itps, __analyzeType(____listSelect(x, i)));
    if (nmisid) vr = ______getVariant(homePath(), fnm, itps); else vr = ______getVariant(ns, fnm, itps);
    if (!vr) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No such function: ");
        ____times(uwriteBuffer, fnm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____meta(vr, vr["[unnamed Property]"]);
}

function __dotMethod_tf(x) {
    var x;
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____idSelect(x, nm) {
    var x;
    var nm;
    return ____fget(x, __regarding(nm));
}

var idSelect_fun = ______getVariant(home, "idSelect", [ ob, fabl_id ]);

function __arrayRef_tf(x) {
    var x;
    var ar;
    var sl;
    var ars;
    var arss;
    var ln;
    var cn;
    var cd;
    var a0;
    var a1;
    var vr;
    ln = __listLength(x);
    if (!(ln === 3)) {
        if (__isList(__cadr(x))) return __dotMethod_tf(x); else return __functionname_tf(x);
    }
    cd = __cdr(x);
    a0 = __car(cd);
    cd = __cdr(cd);
    a1 = __car(cd);
    sl = __analyze(a1);
    if (__type(sl) === fabl_id) return ______metaApplyn(__homeFimpFun("idSelect_fun"), ____metaCast(__analyze(a0), ob), sl);
    if (!(__type(sl) === fabl_int)) {
        return __functionname_tf(x);
    }
    ar = __analyze(a0);
    ars = __type(ar);
    if (__isCollectionType(ars) || ars === fabl_string || ars === hexBinary) return ____metaSelectIndexn(ar, sl);
    vr = ______getVariant(homePath(), "select", [ ars, fabl_int ]);
    if (!vr) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No variant of selection X[Y] found");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ______metaApplyn(vr, ar, sl);
}

function __call_tf(x) {
    var x;
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "call_tf not needed");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return __analyze(____cons(__cadr(x), __caddr(x)));
}

function __getMember_tf(x) {
    var x;
    return __analyze(____cons(__caddr(x), ____cons(__cadr(x), "rdf:nil")));
}

function ____return_tf(nm, x) {
    var nm;
    var x;
    var dt;
    var ln;
    var rv;
    var rc;
    var srt;
    ln = __seqLength(x);
    if (ln === 1) {
        rv = x[0];
        srt = __type(rv);
        if (funReturnType === fabl_void) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No value should be returned from a function of sort void");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rc = ____metaCoerce(rv, funReturnType);
        if (!rc) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Wrong sort for returned value; expected ");
            ____times(uwriteBuffer, funReturnType);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return __metaReturn(rc);
    } else if (ln === 0) {
        if (!(funReturnType === fabl_void)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No return value");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return metaReturnVoid();
    }
}

function __unprintable(s) {
    var s;
    ____times(s, "<unprintable>");
}

function ______gAppend_seq(s, x, elsort) {
    var s;
    var x;
    var elsort;
    var ln;
    var i;
    ____times(s, "[");
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        ______gAppend(s, x[i], elsort);
        if (i < ln - 1) ____times(s, ",");
    }
    ____times(s, "]");
}

function ______gAppend_seq(s, x, elsort) {
    var s;
    var x;
    var elsort;
    var ln;
    var i;
    ____times(s, "[");
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        ____times(s, x[i]);
        if (i < ln - 1) ____times(s, ",");
    }
    ____times(s, "]");
}

function ______gAppend_seq(s, x, elsort) {
    var s;
    var x;
    var elsort;
    var ln;
    var i;
    ____times(s, "[");
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        ____times(s, x[i]);
        if (i < ln - 1) ____times(s, ",");
    }
    ____times(s, "]");
}

function __isFunctionType(x) {
    var x;
    var scn;
    scn = ____get(x, Sort_constructor);
    return scn === "Function";
}

var gAppend_fun = ______getVariant(home, "gAppend", [ fabl_string, ob, Sort ]);

function ____listPrint(s, x) {
    var s;
    var x;
    var cx;
    var carx;
    var cdrx;
    var done;
    if (!x) {
        ____times(s, "nil");
        return;
    }
    ____times(s, "(");
    cx = x;
    done = fabl_false;
    while (!done) {
        carx = __car(cx);
        cdrx = __cdr(cx);
        ____times(s, carx);
        if (__isList(cdrx)) {
            ____times(s, ",");
            cx = cdrx;
        } else {
            done = fabl_true;
            if (!cdrx || ____um_eq(cdrx, "rdf:nil")) ____times(s, ")"); else {
                ____times(s, " . ");
                ____times(s, cdrx);
                ____times(s, ")");
            }
        }
    }
}

function ____times0(s, x) {
    var s;
    var x;
    var k;
    var ui;
    if (!x) {
        ____times(s, "nil");
        return fabl_true;
    }
    k = __obkind(x);
    if (k === string_kind) ____times(s, x); else if (k === int_kind) ____times(s, __ob_to_integer(x)); else if (k === double_kind) ____times(s, __toDouble(x)); else if (k === seq_kind && __seqDataKind(x) === seqDataByte_kind) ____times(s, x); else if (__isList(x)) ____listPrint(s, x); else if (____qualifiedName(s, x)) return fabl_true; else {
        ui = __uri(x);
        if (!ui) return fabl_false;
        ____times(s, "<");
        ____times(s, ui);
        ____times(s, ">");
    }
    return fabl_true;
}

function ____times(s, x) {
    var s;
    var x;
    if (!____times0(s, x)) ____times(s, "<unprintable>");
}

function __uwrite(x) {
    var x;
    __reset(uwriteBuffer);
    ____times(uwriteBuffer, x);
    __tprint(uwriteBuffer);
}

function ____uwrite(x, sx) {
    var x;
    var sx;
    __reset(uwriteBuffer);
    ______gAppend(uwriteBuffer, x, sx);
    __tprint(uwriteBuffer);
}

function ____uwriteln(x, sx) {
    var x;
    var sx;
    ____uwrite(x, sx);
    terpri();
}

function __uwriteln(x) {
    var x;
    __uwrite(x);
    terpri();
}

function beforeError() {
    if (cgiMode) {
        __silent(fabl_false);
        htmlHeader();
    }
}

var uwriteBufferBinding = ____selectGlobalBinding(home, "uwriteBuffer");

function ____write_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var i;
    var cx;
    var px;
    var vr;
    var sq;
    if (buildingFimp) uwriteBufferBinding = ____selectGlobalBinding(home, "uwriteBuffer"); else uwriteBufferBinding = ____selectGlobalBinding(fimp, "uwriteBuffer");
    ln = __seqLength(x);
    sq = __mk_emptysequence("<unprintable>");
    if (nm === "error") ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("beforeError_fun"), __mk_emptysequence("<unprintable>")));
    ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("stringbufReset_fun"), uwriteBufferBinding));
    for (i = 0; i < ln; i++) {
        cx = x[i];
        cx = __stripStringCopy(cx);
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), uwriteBufferBinding, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, uwriteBufferBinding, cx);
        ____seqobAdd(sq, px);
    }
    ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("stringBuf_tprint_fun"), uwriteBufferBinding));
    if (nm === "write") return __mkXblock(sq); else if (nm === "writeln") {
        ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("terpri_fun"), __mk_emptysequence("<unprintable>")));
        return __mkXblock(sq);
    } else if (nm === "error") {
        ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("terpri_fun"), __mk_emptysequence("<unprintable>")));
        ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("afterError_fun"), __mk_emptysequence("<unprintable>")));
        return __mkXblock(sq);
    }
    return null;
}

var lf = 10;

function ____writeToBuffer_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var i;
    var cx;
    var px;
    var a0;
    var vr;
    var sq;
    ln = __seqLength(x);
    if (ln < 2) return null;
    a0 = x[0];
    if (!(__type(a0) === fabl_string)) return null;
    sq = __mk_emptysequence("<unprintable>");
    for (i = 1; i < ln; i++) {
        cx = x[i];
        cx = __stripStringCopy(cx);
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), a0, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, a0, cx);
        ____seqobAdd(sq, px);
    }
    return __mkXblock(sq);
}

function ____toStringBuf_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var i;
    var cx;
    var px;
    var rsx;
    var vr;
    var sq;
    var e;
    e = mkObject();
    rsx = ______bindLocal(e, "toStringResult", fabl_string);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, ____metaApplyn(__homeFimpFun("mkStringBuf_function"), __meta(""))));
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        cx = x[i];
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), rsx, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, rsx, cx);
        ____seqobAdd(sq, px);
    }
    blockReturnType = fabl_string;
    ____seqobAdd(sq, ____metaBlockReturn(rsx, null));
    blockReturnType = null;
    return ______mkValueReturningXblock(fabl_string, e, sq);
}

function ____nul_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a;
    var srt;
    var fn;
    ln = __seqLength(x);
    if (ln === 1) {
        a = x[0];
        srt = __type(a);
        if (__storage(srt) === storage_ob) return ____metaApplyn(__homeFimpFun("nul_fun"), x);
    }
    return null;
}

function ____nnul_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a;
    var srt;
    var fn;
    ln = __seqLength(x);
    if (ln === 1) {
        a = x[0];
        srt = __type(a);
        if (__storage(srt) === storage_ob) return ____metaApplyn(__homeFimpFun("nnul_fun"), x);
    }
    return null;
}

function __isClass(s) {
    var s;
    if (s === fabl_id) return fabl_false;
    if (__storage(s) === storage_ob) return fabl_true;
    return fabl_false;
}

var splice_fun = ______getVariant(home, "splice1", [ ob, ob ]);

function ____splice_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a0;
    var a1;
    var srt0;
    var srt1;
    var k0;
    var k1;
    ln = __seqLength(x);
    if (ln === 2) {
        a0 = x[0];
        srt0 = __type(a0);
        a1 = x[1];
        srt1 = __type(a1);
        if (__isClass(srt0) && __isClass(srt1)) {
            return ____metaApplyn(__homeFimpFun("splice_fun"), x);
        }
    }
    return null;
}

var get_fun = ______getVariant(home, "get", [ ob, Property ]);

var fget_fun = ______getVariant(home, "fget", [ ob, Property ]);

var mget_fun = ______getVariant(home, "mget", [ ob, Property ]);

function ______restrictionsOn(rs, tp, prp) {
    var rs;
    var tp;
    var prp;
}

var restrictionsBuf = __mk_emptysequence("<unprintable>");

function __cardinalityIsOne(rs) {
    var rs;
    var ln;
    var i;
    var c;
    ln = __seqLength(rs);
    for (i = 0; i < ln; i++) {
        c = ____intsel(rs[i], "owl:cardinality");
        if (c === 1) return fabl_true;
    }
    return fabl_false;
}

function ____allValuesFroms(rs, rst) {
    var rs;
    var rst;
    var ln;
    var i;
    var c;
    var cls;
    ln = __seqLength(rst);
    for (i = 0; i < ln; i++) {
        cls = ____obsel(rst[i], "owl:allValuesFrom");
        if (cls) ____seqobAdd(rs, cls);
    }
}

function __not_equal_tf(x) {
    var x;
    return __analyze(____cons("not", ____cons(____cons("equal", __cdr(x)), null)));
}

function __findPropertyInPath(p) {
    var p;
    var ln;
    var i;
    var cp;
    var pv;
    var pth;
    pth = homePath();
    ln = __seqLength(pth);
    for (i = 0; i < ln; i++) {
        cp = pth[i];
        pv = ____selectUri(cp, p);
        if (pv && ____hasType(pv, Property)) return pv;
    }
    return null;
}

function ___dot_tf(x) {
    var x;
    var sl;
    var qn;
    var a0;
    var srt0;
    var srt1;
    var rst;
    var prp;
    var btf;
    var fnc;
    var pvc;
    var fld;
    var ln;
    a0 = __analyze(__cadr(x));
    sl = __caddr(x);
    srt0 = __type(a0);
    if (__isQname(sl)) {
        qn = __evalQname(sl);
        if (!____hasType(qn, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected property: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = qn;
    } else if (__obkind(sl) === string_kind) {
        fld = ____selectUri(srt0, sl);
        if (fld && ____hasType(fld, Property)) prp = fld; else prp = __findPropertyInPath(sl);
        if (!prp) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No such field: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected id or qualified name in ");
        ____times(uwriteBuffer, sl);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    pvc = ____propertyValueConstraints(srt0, prp);
    rst = __car(pvc);
    btf = ____propertyBitField(srt0, prp);
    if (!btf) return ________metaSelectProperty(a0, prp, rst, fabl_true); else return ____metaSelectBitField(a0, btf);
}

function ___dotdot_tf(x) {
    var x;
    var sl;
    var qn;
    var a0;
    var srt0;
    var srt1;
    var rst;
    var prp;
    var btf;
    var fnc;
    var pvc;
    var fld;
    var ln;
    a0 = __analyze(__cadr(x));
    sl = __caddr(x);
    srt0 = __type(a0);
    if (__isQname(sl)) {
        qn = __evalQname(sl);
        if (!____hasType(qn, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected property: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = qn;
    } else if (__obkind(sl) === string_kind) {
        fld = ____selectUri(srt0, sl);
        if (fld && ____hasType(fld, Property)) prp = fld; else prp = __findPropertyInPath(sl);
        if (!prp) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No such field: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected id or qualified name in ");
        ____times(uwriteBuffer, sl);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    pvc = ____propertyValueConstraints(srt0, prp);
    rst = __SeqOf(__car(pvc));
    btf = ____propertyBitField(srt0, prp);
    if (btf) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bitfields do not have multiple values");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ________metaSelectProperty(a0, prp, rst, fabl_false);
}

var set_fun = ______getVariant(home, "set", [ ob, Property, ob ]);

function ____plus_StringBuf_sequence_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a0;
    var a1;
    var srt1;
    var ssb;
    ln = __seqLength(x);
    if (ln === 2) {
        a0 = x[0];
        if (!(__type(a0) === fabl_string)) return null;
        a1 = x[1];
        srt1 = __type(a1);
        ssb = __collectionSubtype(srt1);
        if (ssb) return ________metaApplyn(__homeFimpFun("gAppend_fun"), a0, a1, __meta(srt1));
    }
    return null;
}

function __if_tf(x) {
    var x;
    var cnd;
    var ift;
    cnd = __analyze(__cadr(x));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in IF must return a boolean");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ift = __analyze(__caddr(x));
    return ____mkXif(cnd, ift);
}

function __ifElse_tf(x) {
    var x;
    var cnd;
    var ift;
    var iff;
    cnd = __analyze(__cadr(x));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in IF must return a boolean");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ift = __analyze(__caddr(x));
    iff = __analyze(__cadddr(x));
    return ______mkXif(cnd, ift, iff);
}

function __for_tf(x) {
    var x;
    var init;
    var cnd;
    var xo;
    xo = x;
    init = __analyze(__cadr(xo));
    cnd = __analyze(__caddr(xo));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in FOR must return a boolean");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ________metaFor(init, cnd, __analyze(____listSelect(xo, 3)), __analyze(____listSelect(xo, 4)));
}

function __twiddle_tf(x) {
    var x;
    var a;
    var s;
    a = __analyze(__cadr(x));
    s = __analyzeType(__caddr(x));
    return ____metaCast(a, s);
}

function newSeq() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    rs["rdf:type"] = Seq;
    return rs;
}

var newSeq_fun = ______getVariant(home, "newSeq", __mk_emptysequence("<unprintable>"));

function newBag() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    rs["rdf:type"] = Bag;
    return rs;
}

var newBag_fun = ______getVariant(home, "newBag", __mk_emptysequence("<unprintable>"));

function newAlt() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    rs["rdf:type"] = Alt;
    return rs;
}

var newAlt_fun = ______getVariant(home, "newAlt", __mk_emptysequence("<unprintable>"));

function __new_tf(x) {
    var x;
    var s;
    if (!(__listLength(x) === 2)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "format new(<sort>)");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    s = __analyzeType(__cadr(x));
    if (s === Seq) return ____metaApplyn(__homeFimpFun("newSeq_fun"), __mk_emptysequence("<unprintable>"));
    if (s === Bag) return ____metaApplyn(__homeFimpFun("newBag_fun"), __mk_emptysequence("<unprintable>"));
    if (s === Alt) return ____metaApplyn(__homeFimpFun("newAlt_fun"), __mk_emptysequence("<unprintable>"));
    return ____metaCast(____metaApplyn(__homeFimpFun("new_fun"), __meta(s)), s);
}

var install_fun;

null;

function ____install_tf(nm, ins) {
    var nm;
    var ins;
    var s;
    var a;
    if (__seqLength(ins) === 2) {
        a = ins[0];
        s = ins[1];
        if (__type(s) === Sort) return ______metaApplyn(__homeFimpFun("install_fun"), ____metaCast(a, ob), s);
    }
    return null;
}

function __while_tf(x) {
    var x;
    var cnd;
    var xo;
    xo = x;
    cnd = __analyze(__cadr(xo));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in WHILE must return an int");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____metaWhile(cnd, __analyze(__caddr(xo)));
}

function __mkAlreadyAnalyzed(x) {
    var x;
    return ____cons("alreadyAnalyzed", ____cons(x, null));
}

function __alreadyAnalyzed_tf(x) {
    var x;
    var rs;
    rs = __cadr(x);
    return rs;
}

function __________metaAssignn(dst, prp, src, addValue, try_set) {
    var dst;
    var prp;
    var src;
    var addValue;
    var try_set;
    var rng;
    var dtp;
    var csrc;
    var xsel;
    var btf;
    dtp = ____propertyValueType(__type(dst), prp);
    if (!(dtp === ob)) {
        csrc = ____metaCoerce(src, dtp);
        if (!csrc) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Could not coerce ");
            ____times(uwriteBuffer, src);
            ____times(uwriteBuffer, " to ");
            ____times(uwriteBuffer, dtp);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    } else csrc = ____metaCast(src, ob);
    btf = ____propertyBitField(__type(dst), prp);
    if (!btf) xsel = ______metaSelectProperty(dst, prp, dtp); else xsel = ____metaSelectBitField(dst, btf);
    return ________metaAssignn(xsel, csrc, addValue, fabl_false);
}

function ____set_tf(nm, x) {
    var nm;
    var x;
    var src;
    var dstcn;
    var aprp;
    var prp;
    dstcn = x[0];
    aprp = x[1];
    src = x[2];
    if (!(__type(aprp) === Property)) return null;
    if (__isConstant(aprp)) {
        prp = __constantValue(aprp);
        return __________metaAssignn(dstcn, prp, src, fabl_false, fabl_true);
    }
    return ________metaApplyn(__homeFimpFun("set_fun"), ____metaCast(dstcn, ob), aprp, ____metaCast(src, ob));
}

function __assign_tf(ix) {
    var ix;
    var dst;
    var sl;
    var fld;
    var qn;
    var src;
    var dstcn;
    var aprp;
    var rs;
    var prp;
    var addValue;
    dst = __cadr(ix);
    src = __analyze(__caddr(ix));
    if (__isList(dst) && (____um_eq(__car(dst), "_dot_") || ____um_eq(__car(dst), "_dotdot_"))) {
        addValue = ____um_eq(__car(dst), "_dotdot_");
        dstcn = __analyze(__cadr(dst));
        sl = __caddr(dst);
        if (__isQname(sl)) {
            qn = __evalQname(sl);
            if (!____hasType(qn, Property)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Expected property: ");
                ____times(uwriteBuffer, sl);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            prp = qn;
        } else if (__obkind(sl) === string_kind) {
            fld = ____selectUri(__type(dstcn), sl);
            if (fld && ____hasType(fld, Property)) prp = fld; else prp = __findPropertyInPath(sl);
            if (!prp) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "No such field: ");
                ____times(uwriteBuffer, sl);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        } else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected id or qualified name in ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return __________metaAssignn(dstcn, prp, src, addValue, fabl_true);
    }
    return ____metaAssignnCheck(__analyze(dst), src);
}

function ____genName(seed, count) {
    var seed;
    var count;
    __reset(genName_buf);
    ____times(genName_buf, seed);
    ____times(genName_buf, count);
    return __toString(genName_buf);
}

function allocAnalysisTemp() {
    analysisTempCount++;
    return ____genName("analysistemp_", analysisTempCount);
}

function ____plus_tf(nm, x) {
    var nm;
    var x;
    var rsx;
    var a0;
    var a1;
    var vr0;
    var vr1;
    var e;
    var sq;
    var ln;
    var tp0;
    ln = __seqLength(x);
    if (!(ln === 2)) return null;
    a0 = x[0];
    a1 = x[1];
    tp0 = __type(a0);
    if (tp0 === fabl_int || tp0 === fabl_double) return null;
    vr0 = ______getVariant(homePath(), "times", [ fabl_string, __type(a0) ]);
    if (!vr0) return null;
    vr1 = ______getVariant(homePath(), "times", [ fabl_string, __type(a1) ]);
    if (!vr1) return null;
    e = mkObject();
    rsx = ______bindLocal(e, allocAnalysisTemp(), fabl_string);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, ____metaApplyn(__homeFimpFun("mkStringBuf_function"), __meta(""))));
    ____seqobAdd(sq, ______metaApplyn(vr0, rsx, a0));
    ____seqobAdd(sq, ______metaApplyn(vr1, rsx, a1));
    blockReturnType = fabl_string;
    ____seqobAdd(sq, ____metaBlockReturn(rsx, null));
    blockReturnType = null;
    return ______mkValueReturningXblock(fabl_string, e, sq);
}

function ____universalize0_ob_tf(nm, x) {
    var nm;
    var x;
    var a0;
    var tp0;
    var vr;
    var hm;
    if (__seqLength(x) === 1) {
        a0 = x[0];
        tp0 = __type(a0);
        if (tp0 === ob) return null;
        if (buildingFimp && analyzingFunction) hm = home; else hm = fimp;
        vr = ______getVariant(hm, nm, [ ob ]);
        if (vr) return ____metaApplyn(vr, ____metaCast(a0, ob));
    }
    return null;
}

function ____supplyObArgument(f, v) {
    var f;
    var v;
    var k;
    k = __obkind(f);
    if (k === seq_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet: iterated supplyArgument");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return [ f, null, v ];
}

var supplyObArgument_fun = ______getVariant(home, "supplyObArgument", [ Function, ob ]);

function ____supplyIntArgument(f, v) {
    var f;
    var v;
    var k;
    k = __obkind(f);
    if (k === seq_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet: iterated supplyArgument");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return [ f, null, __integer_to_ob(v) ];
}

var supplyIntArgument_fun = ______getVariant(home, "supplyIntArgument", [ Function, fabl_int ]);

function ____supplyDoubleArgument(f, v) {
    var f;
    var v;
    var k;
    k = __obkind(f);
    if (k === seq_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet: iterated supplyArgument");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return [ f, null, __toOb(v) ];
}

var supplyDoubleArgument_fun = ______getVariant(home, "supplyDoubleArgument", [ Function, fabl_double ]);

function ____supplyArgument_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var lni;
    var i;
    var st;
    var a0;
    var a1;
    var t0;
    var t1;
    var sat;
    var rst;
    var itps;
    var nitps;
    ln = __seqLength(x);
    if (ln === 2) {
        a0 = x[0];
        t0 = __type(a0);
        a1 = x[1];
        t1 = __type(a1);
        itps = __inputTypes(t0);
        if (!itps) return null;
        if (!(itps[0] === t1)) return null;
        nitps = __iNew("<unprintable>");
        ln = __seqLength(itps);
        for (i = 1; i < ln; i++) ____seqobAdd(nitps, itps[i]);
        rst = __resultType(t0);
        sat = ____mkFunctionType(rst, nitps);
        st = __storage(t1);
        if (st === storage_ob) return ____metaCast1(______metaApplyn(__homeFimpFun("supplyObArgument_fun"), a0, a1), sat);
        if (st === storage_int) return ____metaCast1(______metaApplyn(__homeFimpFun("supplyIntArgument_fun"), a0, a1), sat);
        if (st === storage_double) return ____metaCast1(______metaApplyn(__homeFimpFun("supplyDoubleArgument_fun"), a0, a1), sat);
    }
}

function initMacros() {
    ______constructor(home, "help", "help_tf");
    ______constructor(home, "block", "Xblock_tf");
    ______constructor(home, "if", "if_tf");
    ______constructor(home, "seq", "Xsequence_tf");
    ______constructor(home, "sequence", "Xsequence_tf");
    ______constructor(home, "bag", "Xbag_tf");
    ______constructor(home, "alt", "Xalt_tf");
    ______constructor(home, "Function", "Function_tf");
    ______constructor(home, "emptysequence", "Xemptyseq_tf");
    ______constructor(home, "emptybag", "Xemptybag_tf");
    ______constructor(home, "if_else", "ifElse_tf");
    ______constructor(home, "call", "call_tf");
    ______constructor(home, "not_equal", "not_equal_tf");
    ______constructor(home, "get_member", "getMember_tf");
    ______constructor(home, "assign", "assign_tf");
    ______constructor(home, "for", "for_tf");
    ______constructor(home, "while", "while_tf");
    ______constructor(home, "twiddle", "twiddle_tf");
    ______constructor(home, "new", "new_tf");
    ______constructor(home, "already_analyzed", "alreadyAnalyzed_tf");
    ______constructor(home, "array_ref", "arrayRef_tf");
    ______constructor(home, "_dot_", "_dot_tf");
    ______constructor(home, "_dotdot_", "_dotdot_tf");
    ______constructor(home, "restrict", "restrict_tf");
    ______macro(home, "freturn", "return_tf");
    ______macro(home, "nul", "nul_tf");
    ______macro(home, "nnul", "nnul_tf");
    ______macro(home, "plus", "seq_seq_tf");
    ______macro(home, "plus", "plus_tf");
    ______macro(home, "push", "seq_elt_tf");
    ______macro(home, "times", "seq_seq_tf");
    ______macro(home, "contains", "seq_elt_tf");
    ______macro(home, "length", "seq_tf");
    ______macro(home, "set_length", "seq_int_tf");
    ______macro(home, "reset", "seq_tf");
    ______macro(home, "copy", "seq_to_seq_tf");
    ______macro(home, "eq", "eq_tf");
    ______macro(home, "write", "write_tf");
    ______macro(home, "writeln", "write_tf");
    ______macro(home, "error", "write_tf");
    ______macro(home, "write_to_buffer", "writeToBuffer_tf");
    ______macro(home, "writeTo", "writeToBuffer_tf");
    ______macro(home, "toStringBuf", "toStringBuf_tf");
    ______macro(home, "SB", "toStringBuf_tf");
    ______macro(home, "splice", "splice_tf");
    ______macro(home, "times", "plus_StringBuf_sequence_tf");
    ______macro(home, "equal", "intIntEqual_tf");
    ______macro(home, "uri", "universalize0_ob_tf");
    ______macro(home, "set", "set_tf");
    ______macro(home, "supplyArgument", "supplyArgument_tf");
}

function ____getShort(cd, x) {
    var cd;
    var x;
    return ____lor(____selectByte(cd, x), ____lshift(____selectByte(cd, x + 1), 8));
}

function ______disasmArg(cd, db, n) {
    var cd;
    var db;
    var n;
    var knd;
    var md;
    var vstr;
    var dstr;
    var ln;
    var fs;
    var ss;
    var ssidb;
    knd = ____selectByte(cd, n);
    md = ______selectBits(knd, 5, 7);
    vstr = ______selectBits(knd, 0, 4);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "[");
        __tprint(uwriteBuffer);
    }
    dstr = storage_ob;
    ssidb = fabl_false;
    if (md === pam_local) {
        ln = 3;
        dstr = vstr;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "local ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_binding_value) {
        ln = 3;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "binding_value ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_local_field_select) {
        ln = 5;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "local_field_select ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_binding_field_select) {
        ln = 5;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "binding_field_select ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_local_sequence_select) {
        ln = 5;
        ssidb = fabl_true;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "local_sequence_select ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_binding_sequence_select) {
        ln = 5;
        ssidb = fabl_true;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "binding_sequence_select ");
            __tprint(uwriteBuffer);
        }
    }
    __tprint_storage(vstr);
    fs = ____getShort(cd, n + 1);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, " dblock[");
        ____times(uwriteBuffer, fs);
        ____times(uwriteBuffer, "]=");
        __tprint(uwriteBuffer);
    }
    if (dstr === storage_ob) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, ____selectOb(db, fs));
        __tprint(uwriteBuffer);
    } else if (dstr === storage_int) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, ____selectInt(db, fs));
        __tprint(uwriteBuffer);
    }
    if (ln === 5) {
        ss = ____getShort(cd, n + 3);
        if (ssidb) {
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, " dblock[");
                ____times(uwriteBuffer, ss);
                ____times(uwriteBuffer, "]=");
                __tprint(uwriteBuffer);
            }
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, ____selectInt(db, ss));
                __tprint(uwriteBuffer);
            }
        } else {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "[[");
            ____times(uwriteBuffer, ____selectOb(db, ss));
            ____times(uwriteBuffer, "]]");
            __tprint(uwriteBuffer);
        }
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "]");
        __tprint(uwriteBuffer);
    }
    return n + ln;
}

function ________opDisasm(cd, db, pc, numargs) {
    var cd;
    var db;
    var pc;
    var numargs;
    var op;
    var cp;
    var i;
    op = ____selectByte(cd, pc);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, opNames[op]);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    cp = pc + 1;
    for (i = 0; i < numargs; i++) cp = ______disasmArg(cd, db, cp);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "");
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp;
}

function ________callDisasm(cd, db, pc, asr) {
    var cd;
    var db;
    var pc;
    var asr;
    var cp;
    var numargs;
    var acnt;
    var i;
    if (asr) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "assign_call ");
        __tprint(uwriteBuffer);
    } else {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "call ");
        __tprint(uwriteBuffer);
    }
    numargs = ____selectByte(cd, pc + 1);
    if (asr) acnt = numargs + 2; else acnt = numargs + 1;
    cp = pc + 2;
    for (i = 0; i < acnt; i++) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "    ");
            ____times(uwriteBuffer, cp);
            ____times(uwriteBuffer, "  ");
            __tprint(uwriteBuffer);
        }
        cp = ______disasmArg(cd, db, cp);
        terpri();
    }
    return cp;
}

function ______sequenceDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var cp;
    var numargs;
    var i;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "sequence ");
        __tprint(uwriteBuffer);
        terpri();
    }
    numargs = ____getShort(cd, pc + 1) + 1;
    cp = pc + 3;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "   ");
        __tprint(uwriteBuffer);
    }
    cp = ______disasmArg(cd, db, cp);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "");
        __tprint(uwriteBuffer);
        terpri();
    }
    for (i = 0; i < numargs; i++) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "   ");
            __tprint(uwriteBuffer);
        }
        cp = ______disasmArg(cd, db, cp);
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "");
            __tprint(uwriteBuffer);
            terpri();
        }
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "end_sequence");
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp;
}

function ______jump_sDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "jump_s ");
        ____times(uwriteBuffer, ____getShort(cd, pc + 1) + pc + 1);
        __tprint(uwriteBuffer);
        terpri();
    }
    return pc + 3;
}

function ______iftrue_sDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var cp;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "iftrue_s ");
        __tprint(uwriteBuffer);
    }
    cp = ______disasmArg(cd, db, pc + 1);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, " ");
        ____times(uwriteBuffer, ____getShort(cd, cp) + cp);
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp + 2;
}

function ______iffalse_sDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var cp;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "iffalse_s ");
        __tprint(uwriteBuffer);
    }
    cp = ______disasmArg(cd, db, pc + 1);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, " ");
        ____times(uwriteBuffer, ____getShort(cd, cp) + cp);
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp + 2;
}

function ______disasmStep(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var knd;
    var op;
    op = ____selectByte(cd, pc);
    knd = opKinds[op];
    if (op === assign_op || knd === opKind_int_int) return ________opDisasm(cd, db, pc, 2);
    if (knd === opKind_int_int_int) return ________opDisasm(cd, db, pc, 3);
    if (knd === opKind_call) {
        if (op === call_op) return ________callDisasm(cd, db, pc, fabl_false); else return ________callDisasm(cd, db, pc, fabl_true);
    }
    if (op === integer_float_op) return ________opDisasm(cd, db, pc, 2);
    if (op === double_plus_op) return ________opDisasm(cd, db, pc, 3);
    if (op === return_op) return ________opDisasm(cd, db, pc, 1);
    if (op === ob_nul_op || op === ob_nnul_op) return ________opDisasm(cd, db, pc, 2);
    if (op === ob_eq_op) return ________opDisasm(cd, db, pc, 3);
    if (op === return_void_op) return ________opDisasm(cd, db, pc, 0);
    if (op === jump_s_op) return ______jump_sDisasm(cd, db, pc);
    if (op === iftrue_s_op) return ______iftrue_sDisasm(cd, db, pc);
    if (op === iffalse_s_op) return ______iffalse_sDisasm(cd, db, pc);
    if (op === sequence_op) return ______sequenceDisasm(cd, db, pc);
    if (op === noreturn_increment_op || op === noreturn_decrement_op) return ________opDisasm(cd, db, pc, 1);
    if (op === integer_increment_op || op === integer_decrement_op) return ________opDisasm(cd, db, pc, 2);
    if (op === seqbyte_get_op || op === seqob_get_op || op === seqint_get_op) return ________opDisasm(cd, db, pc, 3);
    if (op === seqbyte_put_op || op === seqob_put_op || op === seqint_put_op) return ________opDisasm(cd, db, pc, 4);
    if (op === arraychar_get_op || op === arrayob_get_op || op === arrayint_get_op) return ________opDisasm(cd, db, pc, 3);
    if (op === arraychar_put_op || op === arrayob_put_op || op === arrayint_put_op) return ________opDisasm(cd, db, pc, 4);
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "not yet: ");
        ____times(uwriteBuffer, op);
        ____times(uwriteBuffer, "=");
        ____times(uwriteBuffer, opNames[op]);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____rawDisasm(cd, db) {
    var cd;
    var db;
    var ln;
    var i;
    ln = __seqLength(cd);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "*** Pcode ***");
        __tprint(uwriteBuffer);
        terpri();
    }
    for (i = 0; i < ln; i++) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, i);
        ____times(uwriteBuffer, " ");
        ____times(uwriteBuffer, ____selectByte(cd, i));
        __tprint(uwriteBuffer);
        terpri();
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "** End Pcode ***");
        __tprint(uwriteBuffer);
        terpri();
    }
}

var disasm_raw;

fabl_false;

disasm_raw = fabl_false;

function ____disasm(cd, db) {
    var cd;
    var db;
    var ln;
    var cp;
    if (disasm_raw) ____rawDisasm(cd, db);
    ln = __seqLength(cd);
    cp = 0;
    while (cp < ln) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, cp);
            ____times(uwriteBuffer, ": ");
            __tprint(uwriteBuffer);
        }
        cp = ______disasmStep(cd, db, cp);
        terpri();
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "***");
        __tprint(uwriteBuffer);
        terpri();
    }
}

function ______mkToken(dt, ps, bl) {
    var dt;
    var ps;
    var bl;
    var tk;
    tk = __iNew(Token);
    ______obset(tk, Token_datum, dt);
    ______intset(tk, Token_position, ps);
    ______intset(tk, Token_booles, bl);
    return tk;
}

function ___position(x) {
    var x;
    return ____intsel(x, Token_position);
}

function ___datum(x) {
    var x;
    return ____obsel(x, Token_datum);
}

function ___booles(x) {
    var x;
    return ____intsel(x, Token_booles);
}

function _____set_booles(x, b) {
    var x;
    var b;
    ______intset(x, Token_booles, b);
}

function ___isAtom(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isAtom);
}

function _____set_isAtom(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isAtom, b);
}

function ___isId(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isId);
}

function _____set_isId(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isId, b);
}

function ___isPrefix(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isPrefix);
}

function ___isKeyword(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isKeyword);
}

function ___isInfix(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isInfix);
}

function ___isPostfix(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isPostfix);
}

function ___isTerminator(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isTerminator);
}

function ___isString(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isString);
}

function _____set_isString(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isString, b);
}

function ___isNumber(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isNumber);
}

function _____set_isNumber(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isNumber, b);
}

function ___datum(x) {
    var x;
    return ____obsel(x, Token_datum);
}

function __left_bp(x) {
    var x;
    return __byte2(___booles(x));
}

function ____set_left_bp(x, n) {
    var x;
    var n;
    var b;
    b = ___booles(x);
    _____set_booles(x, ____setByte2(b, n));
}

function __right_bp(x) {
    var x;
    return __byte3(___booles(x));
}

function ____set_right_bp(x, n) {
    var x;
    var n;
    var b;
    b = ___booles(x);
    _____set_booles(x, ____setByte3(b, n));
}

var token_table;

{
    b = ___booles(x);
    _____set_booles(x, ____setByte3(b, n));
}

var t_plus;

var t_times;

var t_semi;

var t_lparen;

var t_rparen;

var t_var;

var t_constant;

var t_function;

var t_lcurly;

var t_rcurly;

var t_rbracket;

var t_lbracket;

var t_dot;

var t_dotdot;

var t_return;

var t_equal;

var t_not_equal;

var t_dequal;

var t_minus;

var t_comma;

var t_if;

var t_else;

var t_assign;

var t_twiddle;

var t_for;

var t_while;

var t_lessp;

var t_greaterp;

var t_leq;

var t_geq;

var t_plus_plus;

var t_minus_minus;

var t_difference;

var t_minus;

var t_and;

var t_or;

var t_nil;

var t_quotient;

var t_colon;

var t_backslash;

var t_not;

var t_by;

var t_restrict;

{
    b = ___booles(x);
    _____set_booles(x, ____setByte3(b, n));
}

var scan_linenumber;

0;

function ____mkToken(s, put_in_table) {
    var s;
    var put_in_table;
    var rs;
    rs = ______mkToken(s, 0, 0);
    if (put_in_table) ________set(token_table, __regarding(s), rs, ob);
    return rs;
}

function __mkToken(s) {
    var s;
    return ____mkToken(s, fabl_false);
}

function ____instantiate(x, ps) {
    var x;
    var ps;
    return ______mkToken(___datum(x), ps, ___booles(x));
}

function ______mkInfixToken(nm, lbp, rbp) {
    var nm;
    var lbp;
    var rbp;
    var rs;
    rs = __mkToken(nm);
    ____set_left_bp(rs, lbp);
    ____set_right_bp(rs, rbp);
    ________bitset(rs, Token_booles, Token_isInfix, 1);
    ________bitset(rs, Token_booles, Token_isOperator, 1);
    return rs;
}

function ____mkPrefixToken(nm, rbp) {
    var nm;
    var rbp;
    var rs;
    rs = __mkToken(nm);
    ____set_right_bp(rs, rbp);
    ________bitset(rs, Token_booles, Token_isPrefix, 1);
    ________bitset(rs, Token_booles, Token_isOperator, 1);
    return rs;
}

function ____mkPostfixToken(nm, lbp) {
    var nm;
    var lbp;
    var rs;
    rs = __mkToken(nm);
    ____set_left_bp(rs, lbp);
    ________bitset(rs, Token_booles, Token_isPostfix, 1);
    ________bitset(rs, Token_booles, Token_isOperator, 1);
    return rs;
}

function __mkKeywordToken(nm) {
    var nm;
    var rs;
    rs = ____mkToken(nm, fabl_true);
    ________bitset(rs, Token_booles, Token_isKeyword, 1);
    return rs;
}

function __mkTerminatorToken(nm) {
    var nm;
    var rs;
    rs = ____mkToken(nm, fabl_true);
    ________bitset(rs, Token_booles, Token_isTerminator, 1);
    return rs;
}

function ____equal(x, y) {
    var x;
    var y;
    return x === y;
}

function ____same(x, y) {
    var x;
    var y;
    if (x && y) return ____um_eq(___datum(x), ___datum(y)) && ___isAtom(x) === ___isAtom(y);
    return fabl_false;
}

var no_new_token;

null;

var eof_token;

null;

function buildTokenTable0() {
    token_table = mkObject();
    t_equal = ______mkInfixToken("equal", 1, 1);
    t_not_equal = ______mkInfixToken("not_equal", 1, 1);
    t_lessp = ______mkInfixToken("lessp", 9, 9);
    t_greaterp = ______mkInfixToken("greaterp", 9, 9);
    t_leq = ______mkInfixToken("leq", 9, 9);
    t_geq = ______mkInfixToken("geq", 9, 9);
    t_twiddle = ______mkInfixToken("twiddle", 13, 13);
    t_plus = ______mkInfixToken("plus", 11, 11);
    t_difference = ______mkInfixToken("difference", 11, 11);
    t_minus = ____mkPrefixToken("unary_minus", 13);
    t_not = ____mkPrefixToken("not", 13);
    t_times = ______mkInfixToken("times", 12, 12);
    t_quotient = ______mkInfixToken("quotient", 12, 12);
    t_dot = ______mkInfixToken("_dot_", 14, 14);
    t_dotdot = ______mkInfixToken("_dotdot_", 14, 14);
    t_plus_plus = ____mkPostfixToken("plus_plus", 13);
    t_minus_minus = ____mkPostfixToken("minus_minus", 13);
    t_and = ______mkInfixToken("and", 4, 4);
    t_or = ______mkInfixToken("or", 3, 3);
    t_colon = ______mkInfixToken("_colon_", 15, 15);
    t_backslash = ______mkInfixToken("_backslash_", 16, 16);
    t_nil = ______mkToken(null, 0, 0);
    _____set_isAtom(t_nil, fabl_true);
    _____set_isId(t_nil, fabl_true);
}

function buildTokenTable() {
    buildTokenTable0();
    t_semi = __mkTerminatorToken(";");
    no_new_token = ______mkToken("_no_new_token_", 0, 0);
    eof_token = ______mkToken("_eof_", 0, 0);
    t_lparen = __mkToken("(");
    ____set_left_bp(t_lparen, 14);
    t_rparen = __mkTerminatorToken(")");
    t_lbracket = __mkToken("[");
    ____set_left_bp(t_lbracket, 14);
    t_rbracket = __mkTerminatorToken("]");
    t_assign = __mkTerminatorToken("assign");
    t_lcurly = __mkTerminatorToken("{");
    t_rcurly = __mkTerminatorToken("}");
    t_comma = __mkTerminatorToken(",");
    t_if = __mkKeywordToken("if");
    t_else = __mkKeywordToken("else");
    t_var = __mkKeywordToken("var");
    t_constant = __mkKeywordToken("constant");
    t_function = __mkKeywordToken("function");
    t_return = __mkKeywordToken("return");
    t_for = __mkKeywordToken("for");
    t_while = __mkKeywordToken("while");
    t_by = __mkKeywordToken("by");
    t_restrict = __mkKeywordToken("restrict");
}

function ____times(s, x) {
    var s;
    var x;
    ____times(s, "[Token:");
    ____times(s, ___datum(x));
    ____times(s, "]");
}

var scanTable;

{
    ____times(s, "[Token:");
    ____times(s, ___datum(x));
    ____times(s, "]");
}

var oneCharTokens;

{
    ____times(s, "[Token:");
    ____times(s, ___datum(x));
    ____times(s, "]");
}

var white_space_id = 1;

var delimiter_id = 2;

var numeral_id = 3;

var letter_id = 4;

function setupScanTable() {
    var h;
    var i;
    scanTable = __mk_emptysequence("<unprintable>");
    ____seqintExpand(scanTable, 256);
    oneCharTokens = __mk_emptysequence("<unprintable>");
    ____seqobExpand(oneCharTokens, 130);
    h = scanTable;
    h[0] = white_space_id;
    for (i = 1; i <= 8; i++) h[i] = delimiter_id;
    h[9] = white_space_id;
    h[10] = white_space_id;
    h[11] = delimiter_id;
    h[12] = white_space_id;
    h[13] = white_space_id;
    for (i = 14; i <= 31; i++) h[i] = delimiter_id;
    h[32] = white_space_id;
    h[33] = delimiter_id;
    h[34] = delimiter_id;
    h[35] = delimiter_id;
    for (i = 36; i <= 38; i++) h[i] = letter_id;
    for (i = 39; i <= 47; i++) h[i] = delimiter_id;
    for (i = 48; i <= 57; i++) h[i] = numeral_id;
    for (i = 58; i <= 63; i++) h[i] = delimiter_id;
    for (i = 64; i <= 90; i++) h[i] = letter_id;
    for (i = 91; i <= 94; i++) h[i] = delimiter_id;
    h[95] = letter_id;
    h[96] = delimiter_id;
    for (i = 97; i <= 122; i++) h[i] = letter_id;
    for (i = 123; i <= 255; i++) h[i] = delimiter_id;
    oneCharTokens[ascii_semicolon] = t_semi;
    oneCharTokens[ascii_plus] = t_plus;
    oneCharTokens[ascii_star] = t_times;
    oneCharTokens[ascii_slash] = t_quotient;
    oneCharTokens[ascii_rparen] = t_rparen;
    oneCharTokens[ascii_lparen] = t_lparen;
    oneCharTokens[ascii_rbracket] = t_rbracket;
    oneCharTokens[ascii_lbracket] = t_lbracket;
    oneCharTokens[ascii_dot] = t_dot;
    oneCharTokens[ascii_rcurly] = t_rcurly;
    oneCharTokens[ascii_lcurly] = t_lcurly;
    oneCharTokens[ascii_equal] = t_assign;
    oneCharTokens[ascii_twiddle] = t_twiddle;
    oneCharTokens[ascii_lessp] = t_lessp;
    oneCharTokens[ascii_greaterp] = t_greaterp;
    oneCharTokens[ascii_comma] = t_comma;
    oneCharTokens[ascii_minus] = t_difference;
    oneCharTokens[ascii_colon] = t_colon;
    oneCharTokens[ascii_backslash] = t_backslash;
    oneCharTokens[ascii_bang] = t_not;
}

var scanning_number_state = 1;

var scanning_id_state = 2;

var scanning_string_state = 3;

var scanning_squote_string;

fabl_false;

scanning_squote_string = fabl_false;

var scanning_new_token_state = 4;

var scanning_comment_state = 5;

var scanning_line_comment_state = 6;

var scanning_string_state = 7;

var scanning_decimal_state = 8;

var c_token_buf = "";

var scan_inbuf = "";

var unscan_buf = "";

var scan_inbuf_length;

0;

var c_scan_p;

0;

function __fill_unscan_buf(ni) {
    var ni;
    var n;
    var i;
    if (scan_inbuf_length < ni) n = __length(scan_inbuf); else n = ni;
    __reset(unscan_buf);
    ____times(unscan_buf, 10);
    for (i = 0; i < ni; i++) ____addChar(unscan_buf, scan_inbuf[scan_inbuf_length - i - 1]);
}

var num_sleep = 50;

var fablPrompt = "fabl>";

var poll_for_input;

fabl_false;

poll_for_input = fabl_false;

var backgroundInterval;

poll_for_input = fabl_false;

var lastBackgroundexec;

poll_for_input = fabl_false;

var noerrDepth = 8;

function grabNextLine() {
    var dn;
    var pc0;
    var ctm;
    var cnd;
    dn = fabl_false;
    __fill_unscan_buf(3);
    cnd = consoleStackDepth();
    if (cnd > noerrDepth) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, cnd);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, fablPrompt);
        __tprint(uwriteBuffer);
    }
    while (!dn) {
        if (!poll_for_input || charAvail() > 0) {
            __readLine(scan_inbuf);
            scan_inbuf_length = __length(scan_inbuf);
            c_scan_p = 0;
            dn = fabl_true;
        } else {
            if (backgroundInterval > 0) {
                ctm = timeMsec();
                if (ctm - lastBackgroundexec > backgroundInterval) {
                    backgroundFun();
                    lastBackgroundexec = ctm;
                }
            }
            __sleepMsec(num_sleep);
        }
    }
}

var scanning_console = fabl_true;

var scanNextChar_verbose;

fabl_false;

function scanNextChar() {
    var rs;
    var isc;
    isc = c_scan_p;
    if (c_scan_p < 0) {
        c_scan_p = c_scan_p + 1;
        if (c_scan_p === 0) return 10; else rs = unscan_buf[-(c_scan_p + 1)];
        if (scanNextChar_verbose) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "1 c_scan_p = ");
            ____times(uwriteBuffer, isc);
            ____times(uwriteBuffer, " nc = ");
            ____times(uwriteBuffer, rs);
            __tprint(uwriteBuffer);
            terpri();
        }
        if (rs === 10) scan_linenumber++;
        return rs;
    }
    if (c_scan_p >= scan_inbuf_length) {
        if (scanning_console) {
            grabNextLine();
            if (scanNextChar_verbose) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "2 c_scan_p = ");
                ____times(uwriteBuffer, isc);
                ____times(uwriteBuffer, " nc = ");
                ____times(uwriteBuffer, 10);
                __tprint(uwriteBuffer);
                terpri();
            }
            scan_linenumber++;
            return 10;
        } else {
            c_scan_p = c_scan_p + 1;
            if (scanNextChar_verbose) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "3 c_scan_p = ");
                ____times(uwriteBuffer, isc);
                ____times(uwriteBuffer, " nc = ");
                ____times(uwriteBuffer, -1);
                __tprint(uwriteBuffer);
                terpri();
            }
            return -1;
        }
    }
    rs = ____land(scan_inbuf[c_scan_p], 255);
    if (scanNextChar_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "4 c_scan_p = ");
        ____times(uwriteBuffer, isc);
        ____times(uwriteBuffer, " nc = ");
        ____times(uwriteBuffer, rs);
        __tprint(uwriteBuffer);
        terpri();
    }
    c_scan_p = c_scan_p + 1;
    if (rs === 10) scan_linenumber++;
    return rs;
}

function unscanChar() {
    c_scan_p = c_scan_p - 1;
    if (c_scan_p < 0 && -c_scan_p > __length(unscan_buf)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "no character to unscan");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (c_scan_p >= 0 && c_scan_p < scan_inbuf_length) {
        if (scan_inbuf[c_scan_p] === 10) scan_linenumber--;
    }
}

function ______matches(buf, p, s) {
    var buf;
    var p;
    var s;
    var cc;
    var i;
    var ln;
    i = 0;
    ln = __length(s);
    if (p + ln > __length(buf)) return fabl_false;
    while (i < ln) {
        cc = buf[p + i];
        if (cc === ____select(s, i)) i++; else return fabl_false;
    }
    return fabl_true;
}

var c_scan_state = scanning_new_token_state;

function ____toToken(s, ps) {
    var s;
    var ps;
    var ln;
    var c;
    var tk;
    var rs;
    var nm;
    ln = __length(s);
    if (ln === 1) {
        c = s[0];
        if (c < 130) {
            tk = oneCharTokens[c];
            if (tk) {
                __reset(s);
                return ____instantiate(tk, ps - ln);
            }
        }
    }
    nm = __toString(s);
    __reset(s);
    if (!nm) return ____instantiate(t_nil, ps - 3);
    tk = ____get(token_table, __regarding(nm));
    if (tk) return ____instantiate(tk, ps - ln);
    rs = ______mkToken(nm, ps - ln, 0);
    _____set_isAtom(rs, fabl_true);
    _____set_isId(rs, fabl_true);
    return rs;
}

function ______toStringToken(s, ps, isSquote) {
    var s;
    var ps;
    var isSquote;
    var ln;
    var rs;
    var sb;
    ln = __length(s);
    if (isSquote) rs = ______mkToken(__toString(s), ps - ln - 1, 0); else {
        sb = "";
        ____times(sb, s);
        rs = ______mkToken(sb, ps - ln - 1, 0);
    }
    __reset(s);
    _____set_isAtom(rs, fabl_true);
    _____set_isString(rs, fabl_true);
    return rs;
}

function ____intToToken(s, ps) {
    var s;
    var ps;
    var nm;
    var rs;
    nm = __integer_to_ob(__toInt(s));
    __reset(s);
    rs = ______mkToken(nm, ps - __length(s), 0);
    _____set_isAtom(rs, fabl_true);
    _____set_isNumber(rs, fabl_true);
    return rs;
}

function ____double_toToken(s, ps) {
    var s;
    var ps;
    var nm;
    var rs;
    nm = __toOb(__toDouble(s));
    __reset(s);
    rs = ______mkToken(nm, ps - __length(s), 0);
    ________bitset(rs, Token_booles, Token_isAtom, 1);
    ________bitset(rs, Token_booles, Token_isNumber, 1);
    return rs;
}

function scanBeginComment() {
    var nc;
    var c2;
    nc = scanNextChar();
    if (nc === ascii_slash) {
        c2 = scanNextChar();
        if (c2 === ascii_star) {
            c_scan_state = scanning_comment_state;
            return fabl_true;
        } else if (c2 === ascii_slash) {
            c_scan_state = scanning_line_comment_state;
            return fabl_true;
        }
        unscanChar();
    }
    unscanChar();
    return fabl_false;
}

function unscanTwoChars() {
    unscanChar();
    unscanChar();
}

function __scanBinaryToken(ps) {
    var ps;
    var sc0;
    var sc1;
    var us2;
    sc0 = scanNextChar();
    us2 = fabl_false;
    if (sc0 === ascii_equal) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_equal, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_bang) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_not_equal, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_plus) {
        sc1 = scanNextChar();
        if (sc1 === ascii_plus) return ____instantiate(t_plus_plus, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_minus) {
        sc1 = scanNextChar();
        if (sc1 === ascii_minus) return ____instantiate(t_minus_minus, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_ampersand) {
        sc1 = scanNextChar();
        if (sc1 === ascii_ampersand) return ____instantiate(t_and, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_vbar) {
        sc1 = scanNextChar();
        if (sc1 === ascii_vbar) return ____instantiate(t_or, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_lessp) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_leq, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_greaterp) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_geq, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_dot) {
        sc1 = scanNextChar();
        if (sc1 === ascii_dot) return ____instantiate(t_dotdot, ps);
        us2 = fabl_true;
    }
    unscanChar();
    if (us2) unscanChar();
    return null;
}

var scanEscape = -1;

var scanHexBuf = "";

function scanTokenStep() {
    var nc;
    var nnc;
    var k;
    var rs;
    if (c_scan_state === scanning_new_token_state) {
        if (scanBeginComment()) return no_new_token;
        rs = __scanBinaryToken(c_scan_p);
        if (rs) return rs;
        nc = scanNextChar();
        if (nc === ascii_squote) {
            c_scan_state = scanning_string_state;
            scanning_squote_string = fabl_true;
            return no_new_token;
        }
        if (nc === ascii_dquote) {
            c_scan_state = scanning_string_state;
            scanning_squote_string = fabl_false;
            return no_new_token;
        }
        if (nc < 0) return eof_token;
        k = scanTable[nc];
        if (k === delimiter_id) {
            ____addChar(c_token_buf, nc);
            return ____toToken(c_token_buf, c_scan_p);
        }
        if (k === white_space_id) return no_new_token;
        if (k === letter_id) {
            ____addChar(c_token_buf, nc);
            c_scan_state = scanning_id_state;
            return no_new_token;
        }
        if (k === numeral_id) {
            ____addChar(c_token_buf, nc);
            c_scan_state = scanning_number_state;
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_id_state) {
        nc = scanNextChar();
        if (nc < 0) {
            c_scan_state = scanning_new_token_state;
            return ____toToken(c_token_buf, c_scan_p);
        }
        k = scanTable[nc];
        if (k === delimiter_id || k === white_space_id) {
            rs = ____toToken(c_token_buf, c_scan_p);
            c_scan_state = scanning_new_token_state;
            unscanChar();
            return rs;
        }
        if (k === letter_id || k === numeral_id) {
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_number_state) {
        nc = scanNextChar();
        if (nc < 0) {
            c_scan_state = scanning_new_token_state;
            return ____intToToken(c_token_buf, c_scan_p);
        }
        if (nc === ascii_dot) {
            c_scan_state = scanning_decimal_state;
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
        k = scanTable[nc];
        if (k === delimiter_id || k === white_space_id || k === letter_id) {
            rs = ____intToToken(c_token_buf, c_scan_p);
            c_scan_state = scanning_new_token_state;
            unscanChar();
            return rs;
        }
        if (k === numeral_id) {
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_decimal_state) {
        nc = scanNextChar();
        if (nc < 0) {
            c_scan_state = scanning_new_token_state;
            return ____double_toToken(c_token_buf, c_scan_p);
        }
        k = scanTable[nc];
        if (k === delimiter_id || k === white_space_id || k === letter_id) {
            rs = ____double_toToken(c_token_buf, c_scan_p);
            c_scan_state = scanning_new_token_state;
            unscanChar();
            return rs;
        }
        if (k === numeral_id) {
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_comment_state) {
        nc = scanNextChar();
        if (nc < 0) return eof_token;
        if (nc === ascii_star) {
            nc = scanNextChar();
            if (nc === ascii_slash) c_scan_state = scanning_new_token_state; else if (nc === ascii_star) unscanChar();
        }
        return no_new_token;
    }
    if (c_scan_state === scanning_line_comment_state) {
        nc = scanNextChar();
        if (nc < 0) return eof_token;
        if (nc === ascii_lf) c_scan_state = scanning_new_token_state;
        return no_new_token;
    }
    if (c_scan_state === scanning_string_state) {
        nc = scanNextChar();
        if (nc < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "String not terminated before eof");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        if (nc === ascii_backslash && !scanning_squote_string) {
            nnc = scanNextChar();
            if (nnc < 0) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "String not terminated before eof");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            if (nnc === ascii_lcurly) {
                ____addChar(c_token_buf, 1);
                nc = nnc;
            } else if (nnc === ascii_n) nc = 10; else if (nnc === ascii_r) nc = 13; else if (nnc === ascii_t) nc = 9; else if (nnc === ascii_x) {
                __reset(scanHexBuf);
                ____addChar(scanHexBuf, scanNextChar());
                ____addChar(scanHexBuf, scanNextChar());
                nc = __hex(scanHexBuf);
            } else if (nnc === ascii_u) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Unicode escape sequence: not yet");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            } else nc = nnc;
        } else if (nc === ascii_squote && scanning_squote_string || nc === ascii_dquote && !scanning_squote_string) {
            c_scan_state = scanning_new_token_state;
            return ______toStringToken(c_token_buf, c_scan_p, scanning_squote_string);
        }
        ____addChar(c_token_buf, nc);
        if (nc === 1 && !scanning_squote_string) ____addChar(c_token_buf, nc);
        return no_new_token;
    }
}

var unscanned_token;

null;

var last_token;

null;

function scan_reset0() {
    scan_inbuf_length = __length(scan_inbuf);
    c_scan_p = 0;
    c_scan_state = scanning_new_token_state;
    __reset(c_token_buf);
    __reset(unscan_buf);
    unscanned_token = null;
    last_token = null;
}

var echoMode;

fabl_false;

var echoBegin;

0;

function __scan_init(s) {
    var s;
    __reset(scan_inbuf);
    ____times(scan_inbuf, s);
    scan_reset0();
    scanning_console = fabl_false;
    scan_linenumber = 0;
    echoBegin = 0;
}

function scan_reset() {
    __reset(scan_inbuf);
    scan_reset0();
}

function init_scan() {
    c_token_buf = "";
    scan_inbuf = "";
    unscan_buf = "   ";
    buildTokenTable();
    setupScanTable();
    __scan_init("");
    fablPrompt = "fabl>>";
}

var scan_verbose;

fabl_false;

scan_verbose = fabl_false;

function unscanToken() {
    if (!last_token) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No token to unscan");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    unscanned_token = last_token;
    last_token = null;
}

function scanToken() {
    var rs;
    if (unscanned_token) {
        last_token = unscanned_token;
        unscanned_token = null;
        rs = last_token;
        return rs;
    }
    rs = no_new_token;
    while (____um_eq(rs, no_new_token)) rs = scanTokenStep();
    last_token = rs;
    return rs;
}

function __isId(tk) {
    var tk;
    return ___isAtom(tk) && !___isNumber(tk);
}

function resetForNewToken() {
    __reset(unscan_buf);
    __reset(c_token_buf);
    c_scan_state = scanning_new_token_state;
}

function extractScannerState() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqobAdd(rs, scan_inbuf);
    ____seqobAdd(rs, __integer_to_ob(c_scan_p));
    ____seqobAdd(rs, __integer_to_ob(scan_linenumber));
    ____seqobAdd(rs, last_token);
    ____seqobAdd(rs, __integer_to_ob(scanning_console));
    ____seqobAdd(rs, __integer_to_ob(echoBegin));
    return rs;
}

function __restoreScannerState(st) {
    var st;
    scan_inbuf = st[0];
    c_scan_p = __ob_to_integer(st[1]);
    scan_linenumber = __ob_to_integer(st[2]);
    last_token = st[3];
    scanning_console = __ob_to_integer(st[4]);
    echoBegin = __ob_to_integer(st[5]);
    resetForNewToken();
    scan_inbuf_length = __length(scan_inbuf);
}

var flushBuf = "";

function flushConsole() {
    __reset(flushBuf);
    while (charAvail() > 0) __readLine(flushBuf);
}

var parse_verbose;

fabl_false;

parse_verbose = fabl_false;

var eof_parse;

parse_verbose = fabl_false;

var parsing_rdf;

fabl_false;

parsing_rdf = fabl_false;

function atline() {
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "At ");
        ____times(uwriteBuffer, scan_linenumber);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
}

function __parse2error(s) {
    var s;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "At ");
        ____times(uwriteBuffer, scan_linenumber);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, s);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____mkApplication(op, a0) {
    var op;
    var a0;
    return ____cons(op, ____cons(a0, "rdf:nil"));
}

function ______mkApplication(op, a0, a1) {
    var op;
    var a0;
    var a1;
    return ____cons(op, ____cons(a0, ____cons(a1, "rdf:nil")));
}

function ____mkApplication(op, a) {
    var op;
    var a;
    return ____cons(op, __toList(a));
}

function ____mkArrayRef(op, a) {
    var op;
    var a;
    return ____cons("array_ref", ____cons(op, __toList(a)));
}

function __detokenify(x) {
    var x;
    var dt;
    var tk;
    if (__isList(x)) return ____cons(__detokenify(__car(x)), __detokenify(__cdr(x)));
    if (____hasType(x, Token)) {
        tk = x;
        dt = ___datum(tk);
        if (___isString(tk)) return ____list2("_quote_", dt); else return ___datum(x);
    }
    return x;
}

function ____consolidateStep(s, bp) {
    var s;
    var bp;
    var ln;
    var rbp;
    var lastop;
    var ne;
    ln = __seqLength(s);
    if (ln > 1) {
        lastop = s[ln - 2];
        rbp = __right_bp(lastop);
        if (rbp >= bp) {
            if (___isPrefix(lastop)) {
                ne = ____mkApplication(lastop, s[ln - 1]);
                ____pop(s, 2);
                ____seqobAdd(s, ne);
                return fabl_true;
            } else {
                ne = ______mkApplication(lastop, s[ln - 3], s[ln - 1]);
                ____pop(s, 3);
                ____seqobAdd(s, ne);
                return fabl_true;
            }
        }
    }
    return fabl_false;
}

function ____consolidate(s, bp) {
    var s;
    var bp;
    while (____consolidateStep(s, bp)) fabl_true;
}

var term_token;

{
    while (____consolidateStep(s, bp)) fabl_true;
}

function __mkSequence(a) {
    var a;
    return ____cons("sequence", __toList(a));
}

function parseUnit() {
    var tk;
    var a;
    tk = scanToken();
    if (___isAtom(tk)) return tk;
    if (____same(tk, t_lparen)) return __parseExpression(t_rparen);
    if (____same(tk, t_lbracket)) {
        a = __parseCommafied(t_rbracket);
        return __mkSequence(a);
    }
    atline();
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Did not expect ");
        ____times(uwriteBuffer, tk);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __parseCommafied(trm) {
    var trm;
    var tk;
    var rs;
    var cp;
    tk = scanToken();
    if (____same(tk, trm)) return null;
    rs = __mk_emptysequence("<unprintable>");
    unscanToken();
    cp = ____parseExpression(trm, t_comma);
    ____seqobAdd(rs, cp);
    while (!____same(last_token, trm)) {
        cp = ____parseExpression(trm, t_comma);
        ____seqobAdd(rs, cp);
    }
    return rs;
}

var parsedId;

null;

function __parseAppOrId(allowAtom) {
    var allowAtom;
    var tk;
    var tk2;
    var tk3;
    var sq;
    tk = scanToken();
    if (!___isId(tk)) {
        parsedId = tk;
        if (allowAtom) return tk;
        __parse2error("expected id or application here");
    }
    tk2 = scanToken();
    if (____same(tk2, t_lparen)) {
        sq = __parseCommafied(t_rparen);
        return ____mkApplication(tk, sq);
    } else if (____same(tk2, t_colon)) {
        tk3 = scanToken();
        if (!___isId(tk3)) __parse2error("expected id after :");
        return ______list3(t_colon, tk, tk3);
    } else {
        unscanToken();
        return tk;
    }
}

function parseAppOrId() {
    return __parseAppOrId(fabl_false);
}

function parseAtomAppOrId() {
    return __parseAppOrId(fabl_true);
}

function ________parseExpressionStep(s, trm1, trm2, trm3) {
    var s;
    var trm1;
    var trm2;
    var trm3;
    var tk;
    var tk2;
    var pfx;
    var rval;
    var islp;
    var smd;
    var a;
    var op;
    var ap;
    var ln;
    tk = scanToken();
    if (___isTerminator(tk)) {
        if (____same(tk, trm1) || ____same(tk, trm2) || ____same(tk, trm3)) {
            ____consolidate(s, -1);
            return tk;
        } else {
            atline();
            {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Expected ");
                ____times(uwriteBuffer, trm1);
                ____times(uwriteBuffer, " or ");
                ____times(uwriteBuffer, trm2);
                ____times(uwriteBuffer, " not ");
                ____times(uwriteBuffer, tk);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
    }
    if (____same(tk, t_lparen)) {
        ____consolidate(s, __left_bp(t_lparen));
        a = __parseCommafied(t_rparen);
        ln = __seqLength(s);
        op = s[ln - 1];
        ap = ____mkApplication(op, a);
        s[ln - 1] = ap;
        return null;
    }
    if (____same(tk, t_lbracket)) {
        ____consolidate(s, __left_bp(t_lbracket));
        a = __parseCommafied(t_rbracket);
        ln = __seqLength(s);
        op = s[ln - 1];
        ap = ____mkArrayRef(op, a);
        s[ln - 1] = ap;
        return null;
    }
    if (!(___isInfix(tk) || ___isPostfix(tk))) __parse2error("Infix or postfix operator expected here");
    ____consolidate(s, __left_bp(tk));
    if (___isPostfix(tk)) {
        ln = __seqLength(s);
        s[ln - 1] = ____list2(tk, s[ln - 1]);
        return null;
    }
    tk2 = scanToken();
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseExpressionStep: tk2 = ");
        ____times(uwriteBuffer, tk2);
        __tprint(uwriteBuffer);
        terpri();
    }
    smd = ____same(tk2, t_difference);
    pfx = null;
    if (smd || ___isPrefix(tk2)) {
        if (smd) pfx = ____instantiate(t_minus, ___position(tk2)); else pfx = tk2;
        tk2 = scanToken();
    }
    islp = ____same(tk2, t_lparen);
    if (islp || ___isAtom(tk2)) {
        if (islp) {
            unscanToken();
            rval = parseUnit();
        } else rval = tk2;
        ____seqobAdd(s, tk);
        if (pfx) ____seqobAdd(s, pfx);
        ____seqobAdd(s, rval);
    } else if (____same(tk2, t_lbracket)) {
        unscanToken();
        rval = parseUnit();
        ____seqobAdd(s, tk);
        if (pfx) ____seqobAdd(s, pfx);
        ____seqobAdd(s, rval);
    } else {
        atline();
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Did not expect ");
            ____times(uwriteBuffer, tk2);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    return null;
}

function ________parseExpression(s, trm1, trm2, trm3) {
    var s;
    var trm1;
    var trm2;
    var trm3;
    var ct;
    var tk;
    if (__seqLength(s) === 0) {
        tk = scanToken();
        if (____same(tk, trm1) || ____same(tk, trm2) || ____same(tk, trm3)) return null;
        if (____same(tk, t_difference)) ____seqobAdd(s, ____instantiate(t_minus, ___position(tk))); else if (___isPrefix(tk)) ____seqobAdd(s, tk); else unscanToken();
        ____seqobAdd(s, parseUnit());
    }
    ct = ________parseExpressionStep(s, trm1, trm2, trm3);
    while (!ct) ct = ________parseExpressionStep(s, trm1, trm2, trm3);
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseExpression = ");
        ____times(uwriteBuffer, __detokenify(s[0]));
        __tprint(uwriteBuffer);
        terpri();
    }
    return s[0];
}

function ______parseExpression(trm1, trm2, trm3) {
    var trm1;
    var trm2;
    var trm3;
    return ________parseExpression(__mk_emptysequence("<unprintable>"), trm1, trm2, trm3);
}

function ____parseExpression(trm1, trm2) {
    var trm1;
    var trm2;
    return ______parseExpression(trm1, trm2, null);
}

function __parseExpression(trm1) {
    var trm1;
    return ______parseExpression(trm1, null, null);
}

function ____parseSimpleStatement(trm0, trm1) {
    var trm0;
    var trm1;
    var rs;
    var rhs;
    rs = ______parseExpression(t_assign, trm0, trm1);
    if (____same(last_token, t_assign)) {
        rhs = ____parseExpression(trm0, trm1);
        rs = ______mkApplication(t_assign, rs, rhs);
    }
    return rs;
}

function __parseSimpleStatement(trm0) {
    var trm0;
    return ____parseSimpleStatement(trm0, null);
}

function __isBlockParse(x) {
    var x;
    return __isList(x) && ____um_eq(__car(x), "block");
}

function parseBlock() {
    var rs;
    var ap;
    rs = __mk_emptysequence("<unprintable>");
    ____seqobAdd(rs, parseStatement());
    while (!____same(term_token, t_rcurly)) ____seqobAdd(rs, parseStatement());
    scanToken();
    term_token = t_semi;
    ap = ____list2("block", __toList(rs));
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseBlock = ");
        ____times(uwriteBuffer, __detokenify(ap));
        __tprint(uwriteBuffer);
        terpri();
    }
    return ap;
}

function parseIf() {
    var tk;
    var etk;
    var cnd;
    var tr;
    var fls;
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("Expected (condition) after if");
    unscanToken();
    cnd = parseUnit();
    tr = parseStatement();
    if (____same(term_token, t_semi)) {
        etk = scanToken();
        if (____same(etk, t_else)) {
            fls = parseStatement();
            return ________list4("if_else", cnd, tr, fls);
        }
        unscanToken();
    }
    return ______list3("if", cnd, tr);
}

function parseFor() {
    var tk;
    var finit;
    var fcnd;
    var fiter;
    var fact;
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("Expected (init;condition;iter) after for");
    finit = __parseSimpleStatement(t_semi);
    fcnd = __parseExpression(t_semi);
    fiter = __parseSimpleStatement(t_rparen);
    fact = parseStatement();
    return __________list5("for", finit, fcnd, fiter, fact);
}

function parseWhile() {
    var tk;
    var wcnd;
    var wact;
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("Expected (condition) after while");
    wcnd = __parseExpression(t_rparen);
    wact = parseStatement();
    return ______list3("while", wcnd, wact);
}

function parseReturn() {
    var vl;
    vl = ____parseExpression(t_semi, t_rcurly);
    if (____same(last_token, t_rcurly)) {
        unscanToken();
        term_token = t_rcurly;
    }
    if (!vl) return __list1("freturn"); else return ____list2("freturn", vl);
}

function parseId() {
    var tk;
    var tk2;
    var tk3;
    tk = scanToken();
    if (!___isId(tk)) __parse2error("expected id here");
    tk2 = scanToken();
    if (____same(tk2, t_colon)) {
        tk3 = scanToken();
        if (!___isId(tk3)) __parse2error("expected id after :");
        return ______list3(t_colon, tk, tk3);
    }
    unscanToken();
    return tk;
}

function parseRestrictClause() {
    var tk;
    var etk;
    var dt;
    var rst;
    var ex;
    tk = scanToken();
    if (____same(tk, t_rcurly)) return null;
    dt = ___datum(tk);
    if (____um_eq(dt, "maxCardinality") || ____um_eq(dt, "cardinality") || ____um_eq(dt, "allValuesFrom") || ____um_eq(dt, "hasValue") || ____um_eq(dt, "defaultValue")) {
        ex = ____parseExpression(t_semi, t_rcurly);
        rst = ____cons(tk, ____cons(ex, "rdf:nil"));
        return rst;
    }
    __parse2error("Bad clause in restrict statement");
}

function parseRestrict() {
    var rs;
    var pr;
    var prp;
    var ctk;
    var done;
    rs = __mk_emptysequence("<unprintable>");
    prp = parseId();
    ctk = scanToken();
    if (!____same(ctk, t_lcurly)) __parse2error('Expected "{" in restrict statement');
    done = fabl_false;
    rs = __iNew("<unprintable>");
    ____seqobAdd(rs, "restrict");
    ____seqobAdd(rs, prp);
    while (!done) {
        pr = parseRestrictClause();
        if (pr) ____seqobAdd(rs, pr);
        done = ____same(last_token, t_rcurly);
    }
    return __toList(rs);
}

function __parseVars(ispl) {
    var ispl;
    var rs;
    var srt;
    var vr;
    var rhs;
    var tk;
    var cldn;
    rs = __mk_emptysequence("<unprintable>");
    if (ispl) {
        tk = scanToken();
        if (____same(tk, t_rparen)) return rs;
        unscanToken();
    }
    srt = parseAppOrId();
    cldn = fabl_false;
    if (!ispl) {
        tk = scanToken();
        if (____same(tk, t_assign)) {
            rhs = ____parseExpression(t_comma, t_semi);
            ____seqobAdd(rs, ______list3(tk, srt, rhs));
            tk = last_token;
            cldn = fabl_true;
        } else unscanToken();
    }
    if (!cldn) {
        vr = parseId();
        ____seqobAdd(rs, ____cons("type", ____cons(srt, ____cons(vr, "rdf:nil"))));
        tk = scanToken();
    }
    while (____same(tk, t_comma)) {
        srt = parseAppOrId();
        cldn = fabl_false;
        if (!ispl) {
            tk = scanToken();
            if (____same(tk, t_assign)) {
                rhs = ____parseExpression(t_comma, t_semi);
                ____seqobAdd(rs, ______list3(tk, srt, rhs));
                tk = last_token;
                cldn = fabl_true;
            } else unscanToken();
        }
        if (!cldn) {
            tk = scanToken();
            if (____same(tk, t_comma) || ____same(tk, t_semi) || ____same(tk, t_rparen)) ____seqobAdd(rs, srt); else {
                if (!___isId(tk)) __parse2error("Expected id");
                vr = tk;
                ____seqobAdd(rs, ____cons("type", ____cons(srt, ____cons(vr, "rdf:nil"))));
                tk = scanToken();
            }
        }
    }
    return rs;
}

function ______collectVars(vrs, nvrs, x) {
    var vrs;
    var nvrs;
    var x;
    var cx;
    var crx;
    var cdx;
    cx = x;
    while (__isList(cx)) {
        crx = __car(cx);
        if (____um_eq(__car(crx), "var")) {
            cdx = __cdr(crx);
            while (__isList(cdx)) {
                ____seqobAdd(vrs, __car(cdx));
                cdx = __cdr(cdx);
            }
        } else ____seqobAdd(nvrs, crx);
        cx = __cdr(cx);
    }
}

function __parseFunction(rsrt) {
    var rsrt;
    var tk;
    var nm;
    var bd;
    var vrs;
    var blk;
    var lvrs;
    var nvrs;
    nm = parseId();
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("( expected");
    vrs = __toList(__parseVars(fabl_true));
    if (!____same(last_token, t_rparen)) __parse2error("Expected )");
    tk = scanToken();
    if (!____same(tk, t_lcurly)) __parse2error("Expected left curly bracket");
    blk = parseBlock();
    lvrs = [ "var" ];
    nvrs = __mk_emptysequence("<unprintable>");
    ______collectVars(lvrs, nvrs, __cdr(blk));
    if (__seqLength(lvrs) > 1) bd = ____cons("block", ____list2(__toList(lvrs), __toList(nvrs))); else bd = ____cons("block", __toList(nvrs));
    return ______list3(nm, vrs, bd);
}

function __fablParseExp(s) {
    var s;
    __scan_init(s);
    return __detokenify(__parseExpression(t_semi));
}

function __fablParseSt(s) {
    var s;
    __scan_init(s);
    return __detokenify(parseStatement());
}

function parseVarStatement() {
    var vrs;
    vrs = __parseVars(fabl_false);
    if (!____same(last_token, t_semi)) __parse2error("Expected semicolon");
    return ____mkApplication("var", vrs);
}

function parseConstantStatement() {
    var vrs;
    vrs = __parseVars(fabl_false);
    if (!____same(last_token, t_semi)) __parse2error("Expected semicolon");
    return ____mkApplication("constant", vrs);
}

function parseToplevel() {
    var tk;
    var prs;
    var fprs;
    tk = scanToken();
    if (____same(tk, eof_token)) return eof_parse;
    if (___isKeyword(tk) || ___isPrefix(tk) || ____same(tk, t_difference) || ____same(tk, t_lbracket)) {
        unscanToken();
        return parseStatement();
    }
    if (____same(tk, t_lcurly)) return parseBlock();
    unscanToken();
    prs = parseAtomAppOrId();
    tk = scanToken();
    if (____same(tk, t_function)) {
        fprs = __parseFunction(prs);
        return ____cons("function", ____cons(prs, fprs));
    }
    unscanToken();
    return __parseStatement([ prs ]);
}

function __parse0(s) {
    var s;
    __scan_init(s);
    return parseToplevel();
}

function parseStatement() {
    var tk;
    var rs;
    var vrs;
    tk = scanToken();
    term_token = t_semi;
    if (____same(tk, t_lcurly)) rs = parseBlock(); else if (____same(tk, t_rcurly)) {
        unscanToken();
        term_token = t_rcurly;
    } else if (____same(tk, t_semi)) rs = null; else if (____same(tk, t_var)) rs = parseVarStatement(); else if (____same(tk, t_constant)) rs = parseConstantStatement(); else if (____same(tk, t_if)) rs = parseIf(); else if (____same(tk, t_return)) rs = parseReturn(); else if (____same(tk, t_for)) rs = parseFor(); else if (____same(tk, t_while)) rs = parseWhile(); else if (classBeingDefined && ____same(tk, t_restrict)) rs = parseRestrict(); else {
        unscanToken();
        rs = ____parseSimpleStatement(t_semi, t_rcurly);
        if (____same(last_token, t_rcurly)) {
            term_token = t_rcurly;
            unscanToken();
        }
    }
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseStatement = ");
        ____times(uwriteBuffer, __detokenify(rs));
        __tprint(uwriteBuffer);
        terpri();
    }
    return rs;
}

function __parseStatement(s) {
    var s;
    var tk;
    var rs;
    var rhs;
    var vrs;
    rs = ________parseExpression(s, t_semi, t_rcurly, t_assign);
    if (____same(last_token, t_assign)) {
        rhs = ____parseExpression(t_semi, t_rcurly);
        rs = ______mkApplication(t_assign, rs, rhs);
    }
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseStatement = ");
        ____times(uwriteBuffer, __detokenify(rs));
        __tprint(uwriteBuffer);
        terpri();
    }
    return rs;
}

function initParse() {
    init_scan();
    eof_parse = __list1("_eof_");
}

function __parse1(s) {
    var s;
    return __detokenify(__parse0(s));
}

function __parse(s) {
    var s;
    var rs;
    ____seqobAdd(scanStack, extractScannerState());
    scan_inbuf = "";
    rs = __detokenify(__parse0(s));
    __restoreScannerState(__pop(scanStack));
    return rs;
}

function ____unescapedLcurly(bf, sf) {
    var bf;
    var sf;
    var cnd;
    var pc;
    cnd = ______find(bf, ascii_lcurly, sf);
    if (cnd === sf) return sf;
    while (cnd >= 0) {
        pc = bf[cnd - 1];
        if (!(pc === 1)) return cnd;
        cnd = ______find(bf, ascii_lcurly, cnd + 1);
    }
    return cnd;
}

var removeEscapesBuf = "";

function ____removeEscapes(bf, esc) {
    var bf;
    var esc;
    var rs;
    var cnd;
    var cc;
    rs = removeEscapesBuf;
    __reset(rs);
    cnd = ______find(bf, esc, 0);
    if (cnd < 0) return;
    cc = 0;
    while (cnd >= 0) {
        ________select(rs, bf, cc, cnd - 1);
        cc = cnd + 1;
        if (bf[cc] === esc) {
            ____addChar(rs, esc);
            cc = cc + 1;
        }
        cnd = ______find(bf, esc, cc);
    }
    ________select(rs, bf, cc, __length(bf) - 1);
    __reset(bf);
    ____times(bf, rs);
}

function ____removeEscapes(bfs, esc) {
    var bfs;
    var esc;
    var i;
    var ln;
    ln = __seqLength(bfs);
    for (i = 0; i < ln; i++) ____removeEscapes(bfs[i], esc);
}

function __bracketExtract(bf) {
    var bf;
    var rs;
    var ln;
    var cc;
    var opb;
    var clb;
    var i;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(bf);
    cc = 0;
    while (cc < ln) {
        opb = ____unescapedLcurly(bf, cc);
        if (opb < 0) {
            ____seqobAdd(rs, ______select(bf, cc, ln - 1));
            ____removeEscapes(rs, 1);
            return rs;
        }
        ____seqobAdd(rs, ______select(bf, cc, opb - 1));
        clb = ______find(bf, ascii_rcurly, opb);
        if (clb < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Missing closing bracket } in string constant");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        ____seqobAdd(rs, ______select(bf, opb + 1, clb - 1));
        cc = clb + 1;
    }
    ____removeEscapes(rs, 1);
    return rs;
}

function __semify(bf) {
    var bf;
    var ln;
    ln = __length(bf);
    if (bf[ln - 1] === ascii_semicolon) return;
    ____times(bf, ";");
}

var stringBuf_append_fun = ______getVariant(home, "times", [ fabl_string, fabl_string ]);

function emptyString() {
    return;
}

function __stringBufConstXob(bfs) {
    var bfs;
    var e;
    var cpr;
    var i;
    var ln;
    var sq;
    var cbf;
    var vr;
    var px;
    var rsx;
    var cx;
    var brt;
    e = mkObject();
    rsx = ______bindLocal(e, "stringConstantResult", fabl_string);
    ln = __seqLength(bfs);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, ____metaApplyn(__homeFimpFun("mkStringBuf_function"), __meta(""))));
    ____seqobAdd(sq, ______metaApplyn(__homeFimpFun("stringStringTimes_fun"), rsx, ____meta(bfs[0], fabl_string)));
    i = 1;
    while (i < ln) {
        cbf = bfs[i];
        __semify(cbf);
        cpr = __parse(cbf);
        cx = __analyze(cpr);
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), rsx, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, rsx, cx);
        ____seqobAdd(sq, px);
        i = i + 1;
        if (i < ln) ____seqobAdd(sq, ______metaApplyn(__homeFimpFun("stringBuf_append_fun"), rsx, ____meta(bfs[i], fabl_string)));
        i = i + 1;
    }
    brt = blockReturnType;
    blockReturnType = fabl_string;
    ____seqobAdd(sq, ____metaBlockReturn(rsx, null));
    blockReturnType = brt;
    return ______mkValueReturningXblock(fabl_string, e, sq);
}

function __analyzeStringBufConst(bf) {
    var bf;
    if (____find(bf, ascii_lcurly) < 0 && ____find(bf, 1) < 0) return ____metaApplyn(__homeFimpFun("copyStringConst_fun"), ____meta(bf, fabl_string));
    return __stringBufConstXob(__bracketExtract(bf));
}

var dbObs = __mk_emptysequence("<unprintable>");

var dbInts = __mk_emptysequence("<unprintable>");

var dbDoubles = __mk_emptysequence("<unprintable>");

function __extractDb(n) {
    var n;
    __seqReset(dbObs);
    __reset(dbInts);
    ________consoleStackExtract(n, dbObs, dbInts, dbDoubles);
}

function __db(n) {
    var n;
    __extractDb(n);
}

function xsd_string__xsd_boolean__times(x, v) {
    var x;
    var v;
    if (v) xsd_string__fabl_id__times(x, "true"); else xsd_string__fabl_id__times(x, "false");
}

function xsd_string__rdf_Property__times(x, p) {
    var x;
    var p;
    if (!xsd_string__rdfs_Resource__qualifiedName(x, p)) xsd_string__fabl_id__times(x, "[unnamed Property]");
}

function xsd_string__rdfs_Literal__times(x, v) {
    var x;
    var v;
    var vo;
    var k;
    vo = v;
    k = rdfs_Resource__obkind(vo);
    if (k === int_kind) xsd_string__xsd_int__times(x, rdfs_Resource__ob_to_integer(vo)); else if (k === double_kind) xsd_string__xsd_double__times(x, rdfs_Resource__toDouble(vo)); else if (rdfs_Resource__isString(x)) xsd_string__xsd_string__times(x, vo); else xsd_string__fabl_id__times(x, "<unprintable of type rdfs:Literal>");
}

function xsd_string__fabl_Xassign__times(s, x) {
    var s;
    var x;
    var src;
    var dst;
    src = rdfs_Resource__rdf_Property__obsel(x, Xassign_source);
    dst = rdfs_Resource__rdf_Property__obsel(x, Xassign_dest);
    xsd_string__fabl_Xob__times(s, dst);
    xsd_string__fabl_id__times(s, "=");
    xsd_string__fabl_Xob__times(s, src);
}

function xsd_string__fabl_XselectProperty__times(s, x) {
    var s;
    var x;
    var src;
    var prp;
    src = rdfs_Resource__rdf_Property__obsel(x, XselectProperty_source);
    prp = rdfs_Resource__rdf_Property__obsel(x, XselectProperty_selector);
    xsd_string__fabl_Xob__times(s, src);
    xsd_string__fabl_id__times(s, ".");
    xsd_string__rdf_Property__times(s, prp);
}

function xsd_string__fabl_Xcast__times(s, x) {
    var s;
    var x;
    xsd_string__fabl_Xob__times(s, rdfs_Resource__rdf_Property__obsel(x, Xcast_castee));
    xsd_string__fabl_id__times(s, "~");
    xsd_string__rdfs_Class__times(s, fabl_Xob__type(x));
}

function xsd_string__fabl_Xif__times(s, x) {
    var s;
    var x;
    var iff;
    iff = rdfs_Resource__rdf_Property__obsel(x, Xif_ifFalse);
    xsd_string__fabl_id__times(s, "if (");
    xsd_string__fabl_Xob__times(s, rdfs_Resource__rdf_Property__obsel(x, Xif_condition));
    xsd_string__fabl_Xob__times(s, rdfs_Resource__rdf_Property__obsel(x, Xif_ifTrue));
    if (iff) {
        xsd_string__fabl_id__times(s, "; else ");
        xsd_string__fabl_Xob__times(s, iff);
    }
}

function xsd_string__fabl_Xapply__times(s, x) {
    var s;
    var x;
    var fn;
    var dst;
    var dt;
    var ln;
    var i;
    fn = rdfs_Resource__rdf_Property__obsel(x, Xapply_functionOf);
    dst = rdfs_Resource__rdf_Property__obsel(x, Xapply_dest);
    if (dst) {
        xsd_string__fabl_Xob__times(s, dst);
        xsd_string__fabl_id__times(s, " = ");
    }
    xsd_string__fabl_Xob__times(s, fn);
    xsd_string__fabl_id__times(s, "(");
    dt = rdfs_Resource__rdf_Property__obsel(x, Xapply_arguments);
    ln = rdfs_Resource__seqLength(dt);
    if (dt && ln > 0) {
        for (i = 0; i < ln - 1; i++) {
            xsd_string__fabl_Xob__times(s, dt[i]);
            xsd_string__fabl_id__times(s, ",");
        }
        xsd_string__fabl_Xob__times(s, dt[ln - 1]);
    }
    xsd_string__fabl_id__times(s, ")");
}

function xsd_string__fabl_Xblock__times(s, x) {
    var s;
    var x;
    var dt;
    var ln;
    var i;
    xsd_string__fabl_id__times(s, "  {");
    xsd_string__xsd_byte__times(s, 10);
    dt = rdfs_Resource__rdf_Property__obsel(x, Xblock_statements);
    if (dt) {
        ln = rdfs_Resource__seqLength(dt);
        for (i = 0; i < ln; i++) {
            xsd_string__fabl_id__times(s, "   ");
            xsd_string__fabl_Xob__times(s, dt[i]);
            xsd_string__fabl_id__times(s, ";");
            xsd_string__xsd_byte__times(s, 10);
        }
    }
    xsd_string__fabl_id__times(s, "   }");
    xsd_string__xsd_byte__times(s, 10);
}

function xsd_string__fabl_Xreturn__times(s, x) {
    var s;
    var x;
    var vl;
    vl = rdfs_Resource__rdf_Property__obsel(x, Xreturn_value);
    if (!vl) xsd_string__fabl_id__times(s, "return"); else {
        xsd_string__fabl_id__times(s, "return ");
        xsd_string__fabl_Xob__times(s, vl);
    }
}

function xsd_string__fabl_Xgo__times(s, x) {
    var s;
    var x;
    var vl;
    vl = rdfs_Resource__rdf_Property__obsel(x, Xgo_condition);
    xsd_string__fabl_id__times(s, "Go ");
    if (vl) {
        if (rdfs_Resource__rdf_Property__xsd_int__bitsel(x, Xgo_booles, Xgo_goIfFalse)) xsd_string__fabl_id__times(s, "(iffalse:");
        xsd_string__fabl_Xob__times(s, vl);
        xsd_string__fabl_id__times(s, ") ");
    }
    xsd_string__fabl_id__times(s, " ");
    xsd_string__fabl_id__times(s, rdfs_Resource__rdf_Property__obsel(x, Xgo_toLabel));
}

function xsd_string__fabl_Xob__times(s, x) {
    var s;
    var x;
    var xs;
    var xap;
    var xbl;
    var xas;
    var xif;
    var xo;
    var k;
    var xrt;
    var lb;
    var lbs;
    var xg;
    var xfr;
    var xsq;
    var xcst;
    var ky;
    xo = x;
    k = rdfs_Resource__obkind(xo);
    if (k === string_kind) {
        xsd_string__fabl_id__times(s, x);
        return;
    }
    if (k === string_kind) {
        xsd_string__fabl_id__times(s, x);
        return;
    }
    if (k === int_kind) {
        xsd_string__xsd_int__times(s, rdfs_Resource__ob_to_integer(xo));
        return;
    }
    if (k === double_kind) {
        xsd_string__xsd_double__times(s, rdfs_Resource__toDouble(xo));
        return;
    }
    if (rdfs_Resource__isFunction(xo)) {
        xsd_string__fabl_Function__times(s, x);
        return;
    }
    if (rdfs_Resource__isBinding(xo)) {
        xsd_string__fabl_Binding__times(s, xo);
    } else {
        if (!x) {
            xsd_string__fabl_id__times(s, "nul");
            return;
        }
        if (!fabl_Xob__Xobish(x)) {
            beforeError();
            xsd_string__reset(uwriteBuffer);
            xsd_string__fabl_id__times(uwriteBuffer, "internal:");
            xsd_string__rdfs_Class__times(uwriteBuffer, xs);
            xsd_string__tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        lb = fabl_Xob__aLabelOf(x);
        lbs = "";
        if (lb) {
            xsd_string__fabl_id__times(lbs, lb);
            xsd_string__fabl_id__times(lbs, ":");
        }
        if (rdfs_Resource__rdf_Property__xsd_int__bitsel(x, Xob1_booles, Xob1_isNoop)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_id__times(s, "NOOP");
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xapply)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xapply__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, XselectProperty)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_XselectProperty__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xblock)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xblock__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xreturn)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xreturn__times(s, x);
            return;
        }
        xg = x;
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xgo)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xgo__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xassign)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xassign__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xif)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xif__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xcast)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xcast__times(s, x);
            return;
        }
        xsd_string__fabl_id__times(s, "<unprintable Xob>");
    }
}

var stdPath = __mk_emptysequence("<unprintable>");

function resetPath() {
    if (!path) path = __mk_emptysequence("<unprintable>"); else __seqReset(path);
    if (!cPath) cPath = __mk_emptysequence("<unprintable>"); else __seqReset(cPath);
    ____seqobAdd(path, fabl);
    ____seqobAdd(path, fimp);
    ____seqobAppend(path, stdPath);
    ____copyInto(cPath, path);
}

function initPath() {
    if (!path) path = __mk_emptysequence("<unprintable>"); else __seqReset(path);
    if (!cPath) cPath = __mk_emptysequence("<unprintable>"); else __seqReset(cPath);
    ____seqobAdd(path, fabl);
    ____seqobAdd(path, fimp);
    ____copyInto(cPath, path);
}

function __initHome(x) {
    var x;
    if (!____get(x, regardingPath)) ________set(x, regardingPath, [ fabl, fimp, x ], SeqOfOb);
}

var theLastHome;

{
    if (!____get(x, regardingPath)) ________set(x, regardingPath, [ fabl, fimp, x ], SeqOfOb);
}

function __setHome(x) {
    var x;
    theLastHome = home;
    __initHome(x);
    home = x;
    __collectSubject(x);
}

function lastHome() {
    if (theLastHome) {
        home = theLastHome;
        theLastHome = null;
    }
}

function __global(x) {
    var x;
    return __regarding(x);
}

function ____selectUri(x, pth) {
    var x;
    var pth;
    var ln;
    var i;
    var cx;
    ln = __seqLength(pth);
    cx = x;
    for (i = 0; i < ln; i++) {
        cx = ____selectUri(cx, pth[i]);
        if (!cx) return cx;
    }
    return cx;
}

var fablInitialized;

fabl_false;

function initFabl() {
    if (!fablInitialized) {
        initPrimops();
        initParse();
        init_flat();
        asmInit();
        fablInitialized = fabl_true;
    }
}

var uriTable;

var uriDels = [ ";", "/", "?", ":", "@", "&", "=", "+", "$", ",", "#", "." ];

function setupUriTable() {
    var ln;
    var i;
    var s;
    ln = __seqLength(uriDels);
    uriTable = __mk_emptysequence("<unprintable>");
    ____seqobExpand(uriTable, 256);
    for (i = 0; i < ln; i++) {
        s = uriDels[i];
        uriTable[____select(s, 0)] = s;
    }
}

setupUriTable();

var splitBuf = "";

function ____splitToIds(bf, dl) {
    var bf;
    var dl;
    var rs;
    var ln;
    var i;
    var c;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(bf);
    __reset(splitBuf);
    for (i = 0; i < ln; i++) {
        c = bf[i];
        if (c === dl) {
            ____seqobAdd(rs, __toString(splitBuf));
            __reset(splitBuf);
        } else ____addChar(splitBuf, c);
    }
    if (__length(splitBuf) > 0) ____seqobAdd(rs, __toString(splitBuf));
    return rs;
}

var ascii_sharp = 35;

function __parseUri1(bf) {
    var bf;
    var rs;
    var ln;
    var i;
    var c;
    var nfnd;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(bf);
    __reset(splitBuf);
    nfnd = fabl_true;
    while (i < ln && nfnd) {
        c = bf[i];
        if (c === ascii_colon || c === ascii_slash) {
            ____seqobAdd(rs, __toString(splitBuf));
            nfnd = fabl_false;
            if (c === ascii_colon) {
                if (__length(splitBuf) === 0) {
                    beforeError();
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "nul scheme in uri: ");
                    ____times(uwriteBuffer, bf);
                    __tprint(uwriteBuffer);
                    terpri();
                    afterError();
                }
                ____seqobAdd(rs, ":");
                if (i + 3 > ln && bf[i + 1] === ascii_slash && bf[i + 2] === ascii_slash) i = i + 2;
            }
            __reset(splitBuf);
        } else ____addChar(splitBuf, c);
        i = i + 1;
    }
    nfnd = fabl_true;
    while (i < ln) {
        c = bf[i];
        if (c === ascii_sharp || c === ascii_slash) {
            ____seqobAdd(rs, __toString(splitBuf));
            __reset(splitBuf);
            if (c === ascii_sharp) ____seqobAdd(rs, "#");
        } else ____addChar(splitBuf, c);
        i = i + 1;
    }
    if (__length(splitBuf) > 0) ____seqobAdd(rs, __toString(splitBuf));
    return rs;
}

function __removeNullStringsEx1(s) {
    var s;
    var ln;
    var i;
    var rs;
    var cs;
    rs = __mk_emptysequence("<unprintable>");
    ln = __seqLength(s);
    if (ln === 0) return s;
    ____seqobAdd(rs, s[0]);
    for (i = 1; i < ln; i++) {
        cs = s[i];
        if (__length(cs) > 0 || i === 4 && s[0] === "file" && s[1] === ":" && s[2] === "" && s[3] === "") ____seqobAdd(rs, cs);
    }
    return rs;
}

function __parseUri(bf) {
    var bf;
    return __removeNullStringsEx1(__parseUri1(bf));
}

function __untyped(x) {
    var x;
    var tp;
    var tpk;
    var lnt;
    var tpsq;
    tp = __iType(x);
    tpk = __obkind(tp);
    if (tpk === values_kind) {
        tpsq = tp;
        lnt = __seqLength(tpsq);
        if (lnt === 0) return fabl_true;
        if (lnt === 1) return ____um_eq(tpsq[0], Resource);
        return fabl_false;
    }
    return !tp || ____um_eq(tp, Resource);
}

function ____installType(x, srt) {
    var x;
    var srt;
    ______iInstall(ob, srt, fabl_false);
}

var equivalents = __iNew("rdfs:Resource");

function ____addEquivalent(x, rep) {
    var x;
    var rep;
    ______set(equivalents, __regarding(x), rep);
}

var internToEquivalents = fabl_true;

function __getEquivalent(x) {
    var x;
    var rs;
    if (!internToEquivalents) return x;
    rs = ____get(equivalents, __regarding(x));
    if (!rs) return x;
    return rs;
}

function stdEquivalents() {
    var rdfProperty;
    rdfProperty = ____evalQname("rdf", "Property");
    ____addEquivalent(____evalQname("owl", "Class"), ____evalQname("rdfs", "Class"));
    ____addEquivalent(____evalQname("owl", "DatatypeProperty"), rdfProperty);
    ____addEquivalent(____evalQname("owl", "ObjectProperty"), rdfProperty);
    ____addEquivalent(____evalQname("owl", "Thing"), ____evalQname("rdfs", "Resource"));
    ____addEquivalent(__resource(), ____evalQname("xsd", "string"));
}

function ________uriToResource(rt, bf, alloc, srt) {
    var rt;
    var bf;
    var alloc;
    var srt;
    var prs;
    var cprs;
    var ln;
    var i;
    var cv;
    var nv;
    prs = __parseUri(bf);
    ln = __seqLength(prs);
    cv = rt;
    for (i = 0; i < ln; i++) {
        cprs = prs[i];
        nv = ____selectUri(cv, cprs);
        if (!nv) {
            if (!alloc) return null;
            if (i === ln - 1) nv = __iNew(srt); else nv = mkObject();
            ______bindUri(cv, cprs, nv);
        }
        cv = nv;
    }
    cv = __getEquivalent(cv);
    if (!____hasType(cv, srt)) {
        if (__untyped(cv)) ____setType(cv, srt); else ____installType(cv, srt);
    }
    return cv;
}

function ______uriToResource(rt, bf, alloc) {
    var rt;
    var bf;
    var alloc;
    return ________uriToResource(rt, bf, alloc, ob);
}

function ____uriToResource(bf, alloc) {
    var bf;
    var alloc;
    return ______uriToResource(root, bf, alloc);
}

function __uriToResource(bf) {
    var bf;
    return ____uriToResource(bf, fabl_true);
}

function __resource(bf) {
    var bf;
    return ____uriToResource(bf, fabl_true);
}

function __reversip(sq) {
    var sq;
    var ln;
    var hln;
    var ln1;
    var i;
    var hi;
    var v;
    ln = __seqLength(sq);
    hln = ____quotient(ln, 2);
    ln1 = ln - 1;
    for (i = 0; i < hln; i++) {
        hi = ln1 - i;
        v = sq[i];
        sq[i] = sq[hi];
        sq[hi] = v;
    }
}

function __uriPath(x) {
    var x;
    var rs;
    var cx;
    var pr;
    rs = __mk_emptysequence("<unprintable>");
    cx = x;
    while (fabl_true) {
        if (____um_eq(cx, root)) {
            __reversip(rs);
            return rs;
        }
        pr = __parent(cx);
        if (!pr) return null;
        ____seqobAdd(rs, __name(cx));
        cx = pr;
    }
}

function __uriPathToUri(pth) {
    var pth;
    var rs;
    var ln;
    var i;
    var cp;
    var hasfrag;
    hasfrag = fabl_false;
    rs = "";
    ln = __seqLength(pth);
    if (__seqLength(pth) < 3 || !(pth[1] === ":")) return;
    ____times(rs, pth[0]);
    ____times(rs, "://");
    for (i = 2; i < ln; i++) {
        cp = pth[i];
        if (cp === "#") {
            ____seqSetLength(rs, __length(rs) - 1);
            ____times(rs, "#");
            if (i < ln - 1) hasfrag = fabl_true;
        } else {
            ____times(rs, cp);
            if (i < ln - 1) ____times(rs, "/");
        }
    }
    return rs;
}

function __uri(x) {
    var x;
    var pth;
    pth = __uriPath(x);
    if (!pth) return null;
    return __uriPathToUri(pth);
}

function ____namespace(nm, uri) {
    var nm;
    var uri;
    var nms;
    var nmv;
    var inv;
    nmv = __uriToResource(uri);
    ________bindConstant(home, nm, nmv, ob);
    inv = ____globalValue(home, "inverseNamespaces");
    if (!inv) {
        inv = mkResource();
        ________bindGlobal(home, "inverseNamespaces", inv, ob);
    }
    ________set(inv, __regarding(nmv), nm, ob);
}

function __namespacePrefix(x) {
    var x;
    var inv;
    inv = ____globalValue(home, "inverseNamespaces");
    if (!inv) return null;
    return ____get(inv, __regarding(x));
}

function ____namespace(nm, uri) {
    var nm;
    var uri;
    ____namespace(__toId(nm), uri);
}

function __aboutNamespace(nm) {
    var nm;
    var ns;
    var dfb;
    var ln;
    var i;
    ns = __namespace(nm);
    if (!ns) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Namespace {nm} is undefined");
            __tprint(uwriteBuffer);
            terpri();
        }
        return;
    }
    dfb = ____mget(ns, isDefinedByP);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Namespace {nm} : {uri(ns)}");
        __tprint(uwriteBuffer);
        terpri();
    }
    if (!dfb) {
        terpri();
        return;
    }
    ln = __seqLength(dfb);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "  isDefinedBy: ");
        __tprint(uwriteBuffer);
    }
    for (i = 0; i < ln; i++) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, __uri(dfb[i]));
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    terpri();
}

function ____qualifiedName(rs, x) {
    var rs;
    var x;
    var pr;
    var pfx;
    pr = __parent(x);
    if (!pr) return fabl_false;
    pfx = __namespacePrefix(pr);
    if (!pfx) return fabl_false;
    ____times(rs, pfx);
    ____times(rs, ":");
    ____times(rs, __name(x));
    return fabl_true;
}

var qualifiedNameBuf = "";

function __qualifiedName(x) {
    var x;
    __reset(qualifiedNameBuf);
    if (____qualifiedName(qualifiedNameBuf, x)) return __copy(qualifiedNameBuf);
    return null;
}

var rdfns = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";

var rdfsns = "http://www.w3.org/2000/01/rdf-schema#";

var xsdns = "http://www.w3.org/2000/10/XMLSchema#";

var owlns = "http://www.w3.org/2002/07/owl#";

var fablns = "http://nurl.org/0/fabl/";

var fimpns = "http://nurl.org/0/fimp/";

rangeProperty = __uriToResource(rdfsns + "range");

function __range(p) {
    var p;
    var r;
    r = ____get(p, rangeProperty);
    if (__obkind(r) === values_kind) return __mostSpecific(r);
    return r;
}

function __namespace(pr) {
    var pr;
    var b;
    var vl;
    var vlk;
    if (pr === "home") return home;
    b = ____selectBinding(homePath(), pr);
    if (!b) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No such namespace: ");
        ____times(uwriteBuffer, pr);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (!__isConstant(b)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not a namespace: ");
        ____times(uwriteBuffer, pr);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    vl = __bindingValue(b);
    vlk = __obkind(vl);
    if (!(vlk === hashtable_kind || vlk === smallob_kind)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not a namespace: ");
        ____times(uwriteBuffer, pr);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return vl;
}

function __namespace(pr) {
    var pr;
    return __namespace(__toId(pr));
}

function ____evalQname(pr, lc) {
    var pr;
    var lc;
    var ns;
    var rs;
    ns = __namespace(pr);
    rs = ____selectUri(ns, lc);
    if (!rs) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, lc);
        ____times(uwriteBuffer, " not found in namespace ");
        ____times(uwriteBuffer, ns);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return __getEquivalent(rs);
}

function __evalQname(x) {
    var x;
    var e1;
    var e2;
    e1 = __cadr(x);
    e2 = __caddr(x);
    if (!__isId(e1) || !__isId(e2)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bad form for qualified name: ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____evalQname(e1, e2);
}

function ____evalQnameN(pr, lc) {
    var pr;
    var lc;
    var ns;
    var rs;
    var cb;
    var k;
    ns = __namespace(pr);
    rs = ____selectUri(ns, lc);
    if (!rs) return null;
    return __getEquivalent(rs);
}

function __evalQnameN(x) {
    var x;
    var e1;
    var e2;
    e1 = __cadr(x);
    e2 = __caddr(x);
    if (!__isId(e1) || !__isId(e2)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bad form for qualified name: ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____evalQnameN(e1, e2);
}

function __toProperty(pr) {
    var pr;
    var cb;
    cb = ____selectBinding(homePath(), pr);
    if (!cb) return null;
    if (!__isConstant(cb)) return null;
    if (!____um_eq(____obsel(cb, Binding_type), Property)) return null;
    return __bindingValue(cb);
}

function __isQname(x) {
    var x;
    var lc;
    var pr;
    if (!__isList(x)) return fabl_false;
    if (____um_eq(__car(x), "_colon_")) {
        pr = __cadr(x);
        lc = __caddr(x);
        return __isId(pr) && __isId(lc);
    }
    return fabl_false;
}

function __toProperty(x) {
    var x;
    return __evalQname(x);
}

function __parseQname(s) {
    var s;
    var clp;
    clp = ____find(s, ascii_colon);
    if (clp < 0) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, s);
        ____times(uwriteBuffer, " does not have the right form (prefix:localpart) for a qualified name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (____find(s, ascii_slash) > 0) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, s);
        ____times(uwriteBuffer, " does not have the right form (prefix:localpart) for a qualified name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____cons("_colon_", ____cons(__toString(______substring(s, 0, clp)), ____cons(__toString(______substring(s, clp + 1, __length(s))), null)));
}

function __toUri(s) {
    var s;
    var prs;
    var pr;
    var lc;
    var nm;
    var u;
    var ln;
    var lstc;
    prs = __parseQname(s);
    pr = __cadr(prs);
    lc = __caddr(prs);
    nm = __namespace(pr);
    u = __uri(nm);
    ln = __length(u);
    lstc = u[ln - 1];
    if (lstc === ascii_sharp) {
        ____times(u, lc);
        return u;
    } else {
        ____times(u, "/");
        ____times(u, lc);
        return u;
    }
}

function __newResource(s) {
    var s;
    var q;
    var ns;
    var rs;
    var pr;
    var lc;
    q = __parseQname(s);
    pr = __cadr(q);
    ns = __namespace(pr);
    lc = __caddr(q);
    if (__length(lc) === 0) return ns;
    rs = ____selectUri(ns, lc);
    if (rs) return __getEquivalent(rs);
    rs = mkResource();
    ______bindUri(ns, lc, rs);
    return rs;
}

function ____allocate(s, tp) {
    var s;
    var tp;
    var q;
    var ns;
    var rs;
    var pr;
    var lc;
    var cv;
    q = __parseQname(s);
    pr = __cadr(q);
    ns = __namespace(pr);
    lc = __caddr(q);
    if (__length(lc) === 0) return ns;
    cv = ____selectUri(ns, lc);
    if (!cv) {
        rs = __iNew(tp);
        ______bindUri(ns, lc, rs);
        return rs;
    } else {
        cv = __getEquivalent(cv);
        if (!____hasType(cv, tp)) {
            if (__untyped(cv)) {
                if (tp === FunctionalProperty) ____setType(cv, [ Property, FunctionalProperty ]); else ____setType(cv, tp);
            } else {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Attempt to allocate a resource where one of a different type already exists: ");
                ____times(uwriteBuffer, s);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
        return cv;
    }
}

function __allocate(s) {
    var s;
    return ____allocate(s, ob);
}

function __allocateProperty(s) {
    var s;
    return ____allocate(s, Property);
}

function ____getChild(x, s) {
    var x;
    var s;
    return ____selectUri(x, s);
}

function ____uriAllocate(s, tp) {
    var s;
    var tp;
    return ________uriToResource(root, s, fabl_true, tp);
}

function __uriAllocate(s) {
    var s;
    return ____uriAllocate(s, ob);
}

function ____isDefinedBy(u0, u1) {
    var u0;
    var u1;
    __resource(u0)["rdfs:isDefinedBy"] = __resource(u1);
}

function ____namespaceDefinedBy(ns, u0) {
    var ns;
    var u0;
    __namespace(u0)["rdfs:isDefinedBy"] = __resource(u0);
}

var stdlibPrefix = "http://fabl.net/lib/";

function stdNamespaces() {
    var rp;
    ____namespace("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    ____namespace("rdfs", "http://www.w3.org/2000/01/rdf-schema#");
    ____namespace("xsd", "http://www.w3.org/2000/10/XMLSchema#");
    ____namespace("owl", "http://www.w3.org/2002/07/owl#");
    ____namespace("fabl", "http://nurl.org/0/fabl/");
    ____namespace("fimp", "http://nurl.org/0/fimp/");
    ____namespace("discovery", "http://fabl.net/vocabularies/discovery");
}

function fixPage0() {
    rangeProperty = ____uriAllocate("http://www.w3.org/2000/01/rdf-schema#subClassOf", Property);
    subClassOf = ____uriAllocate("http://www.w3.org/2000/01/rdf-schema#subClassOf", Property);
    FunctionalProperty = ____uriAllocate("http://www.w3.org/2002/07/owl#FunctionalProperty", Class);
    ____assertUriChildAsProperty(Xob1, "isNoop");
    ____assertUriChildAsProperty(Xob1, "isConstant");
    ____assertUriChildAsProperty(XselectProperty, "isBitField");
    ____assertUriChildAsProperty(Xreturn, "blockReturn");
    ____assertUriChildAsProperty(Xreturn, "loopBreak");
    ____assertUriChildAsProperty(Xreturn, "loopContinue");
    ____assertUriChildAsProperty(Xgo, "goIfFalse");
    ____assertUriChildAsProperty(Xblock, "isFunctionBody");
    ____assertUriChildAsProperty(Token, "isInfix");
    ____assertUriChildAsProperty(Token, "isPrefix");
    ____assertUriChildAsProperty(Token, "isPostfix");
    ____assertUriChildAsProperty(Token, "isTerminator");
    ____assertUriChildAsProperty(Token, "isOperator");
    ____assertUriChildAsProperty(Token, "isAtom");
    ____assertUriChildAsProperty(Token, "isKeyword");
    ____assertUriChildAsProperty(Token, "isNumber");
    ____assertUriChildAsProperty(Token, "isString");
    ____assertUriChildAsProperty(Token, "isId");
    rangeProperty = ____uriAllocate("http://www.w3.org/2000/01/rdf-schema#range", Property);
}

var toSerialize = __mk_emptysequence("<unprintable>");

var unSerialized = __mk_emptysequence("<unprintable>");

var serializedBindings = __mk_emptysequence("<unprintable>");

var bindingObKind;

0;

var bindingIntKind = 1;

var bindingDoubleKind = 2;

var bindingUriKind = 3;

var bindingMultiKind = 4;

var serializeCollectInC;

fabl_false;

var preambleObCount;

fabl_false;

var forDebug;

fabl_false;

var serializeStack;

fabl_false;

var serializeDebugStack;

fabl_false;

var debugStacks;

fabl_false;

function ______amongFirstN(s, n, v) {
    var s;
    var n;
    var v;
    var i;
    for (i = 0; i < n; i++) {
        if (____um_eq(v, s[i])) return fabl_true;
    }
    return fabl_false;
}

function ____serializeCollect0(x, pg) {
    var x;
    var pg;
    var k;
    var bk;
    var ln;
    var dk;
    var i;
    var xp;
    var nmo;
    var bns;
    var cb;
    var btp;
    var cv;
    var ext;
    var tp;
    var bky;
    var pr;
    var onpage;
    var prps;
    var sq;
    var db;
    var dbv;
    var itrn;
    var isprototypefield;
    var istp;
    var sdp;
    if (serializeCollectInC) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unexpected: should be collecting in C");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (!x) return;
    if (____um_eq(x, toSerialize)) return;
    if (__tempbit(x)) return;
    k = __obkind(x);
    sdp = __seqLength(serializeStack);
    ____seqobAdd(serializeStack, x);
    if (____um_eq(x, forDebug)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Found forDebug at ");
            ____times(uwriteBuffer, __seqLength(toSerialize));
            __tprint(uwriteBuffer);
            terpri();
        }
        serializeDebugStack = __seqCopy(serializeStack);
        ____seqobAdd(debugStacks, serializeDebugStack);
    }
    if (k === hashtable_kind) {
        if (__isHashSeq(x)) {
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Omitting a  HashSeq");
                __tprint(uwriteBuffer);
                terpri();
            }
            __pop(serializeStack);
            return;
        }
        xp = __page(x);
        onpage = xp === pg || xp < 0;
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        itrn = __interned(x);
        pr = __parent(x);
        if (pr) {
            ____seqobAdd(serializeStack, "_parent_");
            ____serializeCollect0(pr, pg);
            __pop(serializeStack);
            ____seqobAdd(serializeStack, "_name_");
            ____serializeCollect0(__name(x), pg);
            __pop(serializeStack);
        }
        tp = __iType(x);
        if (tp) {
            ____seqobAdd(serializeStack, "_type_");
            ____serializeCollect0(tp, pg);
            __pop(serializeStack);
        }
        if (!onpage && !itrn) {
            ____seqSetLength(serializeStack, sdp);
            return;
        }
        bns = __bindings(x);
        ln = __seqLength(bns);
        for (i = 0; i < ln; i++) {
            cb = bns[i];
            if (itrn || __page(cb) === pg) {
                ____seqobAdd(serializedBindings, cb);
                ____seqobAdd(serializeStack, "_binding_");
                ____seqobAdd(serializeStack, cb);
                bky = ____obsel(cb, Binding_key);
                bk = __kind(cb);
                btp = ____obsel(cb, Binding_type);
                ____seqobAdd(serializeStack, "_binding_type_");
                ____serializeCollect0(btp, pg);
                __pop(serializeStack);
                if (__obkind(bky) === string_kind) {
                    if (____um_eq(bky, "lowbit")) {
                        __reset(uwriteBuffer);
                        ____times(uwriteBuffer, bky);
                        __tprint(uwriteBuffer);
                        terpri();
                    }
                }
                ____seqobAdd(serializeStack, "_binding_key_");
                ____serializeCollect0(bky, pg);
                __pop(serializeStack);
                if (!(bk === bindingIntKind || bk === bindingDoubleKind)) {
                    ____seqobAdd(serializeStack, "_binding_value_");
                    ____serializeCollect0(__bindingValue(cb), pg);
                    __pop(serializeStack);
                }
                __pop(serializeStack);
                __pop(serializeStack);
            }
        }
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === compact_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "OBSOLETE: compactob");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (k === smallob_kind) {
        xp = __page(x);
        itrn = __interned(x);
        onpage = xp === pg;
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        pr = __parent(x);
        if (pr) {
            ____seqobAdd(serializeStack, "_parent_");
            ____serializeCollect0(pr, pg);
            __pop(serializeStack);
            ____seqobAdd(serializeStack, "_name_");
            ____serializeCollect0(__name(x), pg);
            __pop(serializeStack);
        }
        tp = __iType(x);
        if (____um_eq(tp, BitField)) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "BitField at ");
            ____times(uwriteBuffer, __seqLength(toSerialize));
            __tprint(uwriteBuffer);
            terpri();
        }
        istp = ____um_eq(tp, Sort);
        if (tp) {
            ____seqobAdd(serializeStack, "_type_");
            ____serializeCollect0(tp, pg);
            __pop(serializeStack);
        }
        if (!onpage && !itrn) {
            ____seqSetLength(serializeStack, sdp);
            return;
        }
        ln = __compactobNumFields(x);
        for (i = 0; i < ln; i++) {
            cv = ____selectNthOb(x, i);
            isprototypefield = istp && i === 6;
            if (cv && !isprototypefield) ____serializeCollect0(cv, pg);
        }
        prps = __compactobProperties(x);
        if (!prps) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "MISSING PROPERTIES");
            __tprint(uwriteBuffer);
            terpri();
        }
        ln = __seqLength(prps);
        for (i = 0; i < ln; i++) ____serializeCollect0(prps[i], pg);
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === string_kind) {
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === seq_kind || k === values_kind) {
        itrn = __interned(x);
        xp = __page(x);
        onpage = xp === pg || xp < 0;
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        pr = __parent(x);
        if (pr) ____serializeCollect0(pr, pg);
        tp = __iType(x);
        if (tp) ____serializeCollect0(tp, pg);
        if (k === seq_kind && !onpage && !itrn) {
            ____seqSetLength(serializeStack, sdp);
            return;
        }
        dk = __seqDataKind(x);
        if (dk === seqDataOb_kind) {
            sq = x;
            ln = __seqLength(sq);
            for (i = 0; i < ln; i++) {
                ____seqobAdd(serializeStack, "_element_");
                ____seqobAdd(serializeStack, __integer_to_ob(i));
                ____serializeCollect0(sq[i], pg);
                __pop(serializeStack);
                __pop(serializeStack);
            }
        }
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === dblock_kind) {
        ____seqobAdd(toSerialize, x);
        ____set_tempbit(x, fabl_true);
        db = x;
        nmo = __numobs(db);
        for (i = 0; i < nmo; i++) {
            dbv = ____selectOb(db, i);
            if (dbv) {
                ____serializeCollect0(dbv, pg);
            }
        }
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === binding_kind) {
        ____seqobAdd(toSerialize, x);
        ____set_tempbit(x, fabl_true);
        ____serializeCollect0(__parent(x), pg);
        ____serializeCollect0(__bindingKey(x), pg);
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet serializing: ");
        ____times(uwriteBuffer, k);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______setPageOfGlobals(cn, names, pg) {
    var cn;
    var names;
    var pg;
    var ln;
    var i;
    var gl;
    ln = __seqLength(names);
    for (i = 0; i < ln; i++) {
        gl = ____selectGlobalBinding(cn, names[i]);
        if (gl) ____set_page(gl, pg);
    }
}

var fimpExiles = [ "path", "fimp" ];

var restoreTheTempBits = fabl_true;

function restoreTempBits() {
    var i;
    var ln;
    var cs;
    if (restoreTheTempBits) {
        ln = __seqLength(toSerialize);
        for (i = 0; i < ln; i++) {
            cs = toSerialize[i];
            ____set_tempbit(cs, fabl_false);
        }
        ln = __seqLength(serializedBindings);
        for (i = 0; i < ln; i++) {
            cs = serializedBindings[i];
            ____set_tempbit2(cs, fabl_false);
        }
    }
}

function __addSerializeOb(x) {
    var x;
    if (serializeCollectInC) __addObToSerialize(x); else ____seqobAdd(toSerialize, x);
}

function ____serializeCollectOb(x, pg) {
    var x;
    var pg;
    if (serializeCollectInC) ____cserializeCollect0(x, pg); else ____serializeCollect0(x, pg);
}

function ________serializeCollect(xs, y, pg, forFimp) {
    var xs;
    var y;
    var pg;
    var forFimp;
    var ln;
    var i;
    var lno;
    var lnxs;
    var cs;
    var uro;
    var rgp;
    var urObs;
    var cb;
    var x;
    var tb;
    serializeStack = __mk_emptysequence("<unprintable>");
    debugStacks = __mk_emptysequence("<unprintable>");
    if (forFimp) {
        x = xs[0];
        ______set(x, __regarding("fimp"), null);
        ______set(x, __regarding("path"), null);
    }
    if (serializeCollectInC) resetToSerialize(); else __seqReset(toSerialize);
    urObs = [ root, typeP, Sort, Regarding, Function, Pcode, Restriction, BitField ];
    lno = __seqLength(urObs);
    for (i = 0; i < lno; i++) __addSerializeOb(urObs[i]);
    if (y) __addSerializeOb(y);
    if (serializeCollectInC) setPreambleObCount(); else preambleObCount = __seqLength(toSerialize);
    lnxs = __seqLength(xs);
    tb = null;
    if (!forFimp && ____fget(thisFileR, topicP)) {
        tb = ____selectBinding(thisFileR, topicP);
        ____set_page(tb, pg);
        ____set_page(thisFileR, pg);
    }
    for (i = 0; i < lnxs; i++) ____serializeCollectOb(xs[i], pg);
    if (tb) ____serializeCollectOb(thisFileR, pg);
    for (i = 0; i < lno; i++) {
        uro = urObs[i];
        if (!__tempbit(uro)) ____serializeCollectOb(uro, pg);
    }
    if (serializeCollectInC) setSerializedBindingBits(); else {
        ln = __seqLength(serializedBindings);
        for (i = 0; i < ln; i++) {
            cb = serializedBindings[i];
            ____set_tempbit2(cb, fabl_true);
        }
    }
}

function ______serializeCollect(xs, y, pg) {
    var xs;
    var y;
    var pg;
    ________serializeCollect(xs, y, pg, fabl_false);
}

function ________serializeCollect(x, y, pg, forFimp) {
    var x;
    var y;
    var pg;
    var forFimp;
    ________serializeCollect([ x ], y, pg, forFimp);
}

function ______serializeCollect(x, y, pg) {
    var x;
    var y;
    var pg;
    ________serializeCollect(x, y, pg, fabl_false);
}

function ____serializeCollect(x, pg) {
    var x;
    var pg;
    ________serializeCollect(x, x, pg, fabl_false);
}

function ____fimpCollect(x, pg) {
    var x;
    var pg;
    ________serializeCollect(x, null, pg, fabl_true);
}

function __bindingName(b) {
    var b;
    var k;
    var kk;
    k = ____obsel(b, Binding_key);
    kk = __obkind(k);
    if (kk === string_kind) return k;
    return null;
}

function ____traverse(x, dp) {
    var x;
    var dp;
    var k;
    var cb;
    var ln;
    var i;
    var j;
    var b;
    var cbn;
    k = __obkind(x);
    if (k === hashtable_kind) {
        b = __bindings(x);
        ln = __seqLength(b);
        for (i = 0; i < ln; i++) {
            cb = b[i];
            cbn = __bindingName(cb);
            if (cbn) {
                for (j = 0; j < dp; j++) {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "  ");
                    __tprint(uwriteBuffer);
                }
                {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, cbn);
                    __tprint(uwriteBuffer);
                    terpri();
                }
                ____traverse(__bindingValue(cb), dp + 1);
            }
        }
    }
}

function __vwrite(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === 3) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (k === 1) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, __ob_to_integer(x));
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (__isFunction(x)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (__isBinding(x)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (____hasType(x, Sort)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "[Any]");
        __tprint(uwriteBuffer);
    }
}

function __vwrite(s) {
    var s;
    var i;
    var ln;
    ln = __seqLength(s);
    for (i = 0; i < ln; i++) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, i);
            ____times(uwriteBuffer, " ");
            __tprint(uwriteBuffer);
        }
        __vwrite(s[i]);
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, lf);
            __tprint(uwriteBuffer);
        }
    }
}

function restoreTheTempBits() {
    if (serializeCollectInC) crestoreTempBits(); else restoreTempBits();
}

function ______serializeToFile(fln, v, pg) {
    var fln;
    var v;
    var pg;
    ____serializeCollect(v, pg);
    serializeReset();
    if (serializeCollectInC) ______serializeToFile(fln, null, pg); else ______serializeToFile(fln, toSerialize, pg);
    restoreTheTempBits();
}

function ______serializeSeqToFile(fln, v, pg) {
    var fln;
    var v;
    var pg;
    ______serializeCollect(v, null, pg);
    serializeReset();
    if (serializeCollectInC) ______serializeToFile(fln, null, pg); else ______serializeToFile(fln, toSerialize, pg);
    restoreTheTempBits();
}

function ______serializeToBuffer(bf, v, pg) {
    var bf;
    var v;
    var pg;
    ____serializeCollect(v, pg);
    serializeReset();
    if (serializeCollectInC) ______serializeToBuffer(bf, null, pg); else ______serializeToBuffer(bf, toSerialize, pg);
    restoreTheTempBits();
}

function __printUris(s) {
    var s;
    var ln;
    var i;
    var u;
    ln = __seqLength(s);
    for (i = 0; i < ln; i++) {
        if (__parent(s[i])) {
            u = __uri(s[i]);
            if (u) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, i);
                ____times(uwriteBuffer, " ");
                ____times(uwriteBuffer, u);
                __tprint(uwriteBuffer);
                terpri();
            }
        }
    }
}

var blankNodeTable;

var beenWrittenTable;

var xmlNamespaces;

var xmlSizeLimit = 1e4;

function __qualifiedNameCollectNamespace(x) {
    var x;
    var qn;
    var clp;
    var ns;
    qn = __qualifiedName(x);
    if (!qn) return qn;
    clp = ____indexOf(qn, ascii_colon);
    ns = __toId(______substring(qn, 0, clp));
    if (!____seqobContains(xmlNamespaces, ns)) ____seqobAdd(xmlNamespaces, ns);
    return qn;
}

var blankIdSeed = "n_";

var blankIdCount;

0;

function __blankNodeName(r) {
    var r;
    var rr;
    var nm;
    rr = __regarding(r);
    nm = ____get(blankNodeTable, rr);
    if (!nm) {
        nm = ____genName(blankIdSeed, blankIdCount++);
        ______set(blankNodeTable, rr, nm);
    }
    return nm;
}

function ____xmlWriteResourceTag(bf, r) {
    var bf;
    var r;
    var u;
    var tp;
    var tpk;
    var ln;
    var tps;
    var mtp;
    var tpnm;
    var rr;
    rr = __regarding(r);
    u = __uri(r);
    tp = ____get(r, "rdf:type");
    tpk = __obkind(tp);
    if (tpk === seq_kind) {
        tps = tp;
        ln = __seqLength(tps);
        if (ln > 0) mtp = tps[ln - 1];
    } else mtp = tp;
    if (mtp) tpnm = __qualifiedNameCollectNamespace(mtp);
    if (!tpnm) {
        ____times(bf, "<rdf:Description ");
    } else {
        ____times(bf, "<");
        ____times(bf, tpnm);
    }
    if (!u) {
        ____times(bf, ' rdf:nodeID="');
        ____times(bf, __blankNodeName(r));
        ____times(bf, '"');
    } else {
        ____times(bf, ' rdf:about="');
        ____times(bf, u);
        ____times(bf, '"');
    }
    {
        ____times(bf, ">\n");
    }
    ______set(beenWrittenTable, rr, "yes");
}

function ____xmlWriteResourceEndTag(bf, r) {
    var bf;
    var r;
    var mtp;
    var tpnm;
    mtp = ____fget(r, "rdf:type");
    if (mtp) tpnm = __qualifiedNameCollectNamespace(mtp);
    if (!tpnm) {
        ____times(bf, "</rdf:Description>");
    } else {
        ____times(bf, "</");
        ____times(bf, tpnm);
        ____times(bf, ">\n");
    }
}

var intUri = "http://www.w3.org/2001/XMLSchema#int";

var doubleUri = "http://www.w3.org/2001/XMLSchema#double";

var stringUri = "http://www.w3.org/2001/XMLSchema#string";

var booleanUri = "http://www.w3.org/2001/XMLSchema#boolean";

var idUri = "http://nurl.org/0/fabl/id";

function ________xmlWriteDatatypeProperty(bf, pnm, v, tp) {
    var bf;
    var pnm;
    var v;
    var tp;
    var tpuri;
    {
        ____times(bf, "<");
        ____times(bf, pnm);
    }
    if (!(tp === ob)) {
        if (tp === fabl_int) tpuri = intUri; else if (tp === fabl_double) tpuri = doubleUri; else if (tp === fabl_string) tpuri = stringUri; else if (tp === fabl_id) tpuri = idUri; else if (tp === fabl_boolean) tpuri = booleanUri; else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Internal: unexpected type: ");
            ____times(uwriteBuffer, tp);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        {
            ____times(bf, ' rdf:datatype="');
            ____times(bf, tpuri);
            ____times(bf, '"');
        }
    }
    {
        ____times(bf, ">");
        ____times(bf, v);
        ____times(bf, "</");
        ____times(bf, pnm);
        ____times(bf, ">");
    }
    if (__length(bf) > xmlSizeLimit) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "exceeded RDF/XML size limit");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______xmlWriteProperty(bf, pnm, r) {
    var bf;
    var pnm;
    var r;
    var u;
    {
        ____times(bf, "<");
        ____times(bf, pnm);
    }
    if (!____fget(beenWrittenTable, __regarding(r))) {
        {
            ____times(bf, ">\n");
        }
        ____xmlSerialize(bf, r);
        {
            ____times(bf, "</");
            ____times(bf, pnm);
            ____times(bf, ">\n");
        }
    } else {
        u = __uri(r);
        if (!u) {
            ____times(bf, ' rdf:nodeID="');
            ____times(bf, __blankNodeName(r));
            ____times(bf, '"/>\n');
        } else {
            ____times(bf, ' rdf:resource="');
            ____times(bf, u);
            ____times(bf, '">/>\n');
        }
    }
    if (__length(bf) > xmlSizeLimit) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "exceeded RDF/XML size limit");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____xmlSerialize(bf, b) {
    var bf;
    var b;
    var k;
    var kq;
    var p;
    var v;
    var btp;
    var vtp0;
    var ptp;
    var vtp;
    var vk;
    var isdtp;
    var pnm;
    k = __bindingKey(b);
    kq = __qualifiedNameCollectNamespace(k);
    if (!kq) return fabl_false;
    p = k;
    v = __bindingValue(b);
    btp = ____obsel(b, Binding_type);
    if (!btp || btp === ob) {
        ptp = __range(p);
        if (ptp) vtp = ptp;
    } else vtp = btp;
    if (!vtp) vtp = ob;
    vtp0 = __type0(v);
    if (!(vtp0 === ob)) {
        if (vtp === ob) vtp = vtp0; else vtp = __mostSpecific([ vtp0, vtp ]);
    }
    vk = __obkind(v);
    if (vk === double_kind) vtp = fabl_double;
    isdtp = __isString(v) || __isId(v) || vk === int_kind || vk === double_kind;
    pnm = __qualifiedNameCollectNamespace(p);
    if (!pnm) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot write out a property without a qualified name: ");
        ____times(uwriteBuffer, __uri(p));
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (isdtp) ________xmlWriteDatatypeProperty(bf, pnm, v, vtp); else ______xmlWriteProperty(bf, pnm, v);
    return fabl_true;
}

var xmlSerializePage;

0;

function ____xmlSerialize(bf, r) {
    var bf;
    var r;
    var k;
    var bn;
    var vk;
    var dk;
    var bfln;
    var bcnt;
    var ln;
    var i;
    var b;
    var v;
    var vtp;
    var sqo;
    var isdtp;
    if (__length(bf) > xmlSizeLimit) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "exceeded RDF/XML size limit");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    k = __obkind(r);
    if (k === hashtable_kind) {
        bn = __bindings(r);
        bfln = __length(bf);
        ____xmlWriteResourceTag(bf, r);
        ln = __seqLength(bn);
        bcnt = 0;
        for (i = 0; i < ln; i++) {
            b = bn[i];
            if (xmlSerializePage < 0 || __page(b) === xmlSerializePage) {
                if (____xmlSerialize(bf, b)) bcnt++;
            }
        }
        ____xmlWriteResourceEndTag(bf, r);
    }
    if (k === seq_kind) {
        ____times(bf, "<rdf:Seq>");
        dk = __seqDataKind(r);
        if (dk === seqDataOb_kind) {
            sqo = r;
            ln = __seqLength(sqo);
            for (i = 0; i < ln; i++) {
                v = sqo[i];
                vtp = __type0(v);
                vk = __obkind(v);
                if (vk === double_kind) vtp = fabl_double;
                isdtp = __isString(v) || __isId(v) || vk === int_kind || vk === double_kind;
                if (isdtp) ________xmlWriteDatatypeProperty(bf, "rdf:li", v, vtp); else ______xmlWriteProperty(bf, "rdf:li", v);
            }
        } else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "this kind of sequence not supported yet");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        ____times(bf, "</rdf:Seq>");
    }
}

var xmlBoilerPlate = '<?xml version="1.0" encoding="iso-8859-1" ?><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"';

function ____addXmlNamespace(bf, ns) {
    var bf;
    var ns;
    var nsuri;
    nsuri = __uri(__namespace(ns));
    ____times(bf, "xmlns:");
    ____times(bf, ns);
    ____times(bf, '="');
    ____times(bf, nsuri);
    ____times(bf, '"');
}

function ____addXmlNamespaces(bf, ns) {
    var bf;
    var ns;
    var ln;
    var i;
    ln = __seqLength(ns);
    for (i = 0; i < ln; i++) ____addXmlNamespace(bf, ns[i]);
    ____times(bf, ">");
}

function ______xmlSerialize(bf, v, pg) {
    var bf;
    var v;
    var pg;
    var i;
    var ln;
    var cv;
    var rbf;
    xmlSerializePage = pg;
    blankNodeTable = __iNew("rdfs:Resource");
    beenWrittenTable = __iNew("rdfs:Resource");
    xmlNamespaces = __iNew("<unprintable>");
    blankIdCount = 0;
    ln = __seqLength(v);
    rbf = "";
    for (i = 0; i < ln; i++) {
        cv = v[i];
        if (xmlSerializePage < 0 || __page(cv) === xmlSerializePage) ____xmlSerialize(rbf, cv);
    }
    ____times(bf, xmlBoilerPlate);
    ____addXmlNamespaces(bf, xmlNamespaces);
    ____times(bf, rbf);
    ____times(bf, "</rdf:RDF>");
}

function ______xmlSerializeToFile(fl, v, pg) {
    var fl;
    var v;
    var pg;
    var bf;
    bf = "";
    ______xmlSerialize(bf, v, pg);
    ____fwrite(fl, bf);
}

function ____xmlSerializeToFile(fl, v) {
    var fl;
    var v;
    ______xmlSerializeToFile(fl, v, -1);
}

var jsg;

var jsLastLocalVars;

var translateJS;

var outputTypesToJS;

var closeStatementAfterNextXob;

var skipNextXob;

{
    jsg = "";
    jsLastLocalVars = "";
}

function __storeJS(fln) {
    var fln;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Storing JS to file ");
        ____times(uwriteBuffer, fln);
        __tprint(uwriteBuffer);
        terpri();
    }
    ____writeToFile(fln, jsg);
}

function __translateId(x) {
    var x;
    var js;
    var xs;
    xs = "";
    ____times(xs, x);
    if (xs === "id" || xs === "void" || xs === "int" || xs === "string" || xs === "double" || xs === "boolean" || xs === "false" || xs === "true" || xs === "byte" || xs === "date") {
        js = "fabl_";
        ____times(js, xs);
    } else {
        js = xs;
    }
    return js;
}

function __translateBinding(binding) {
    var binding;
    var js;
    var k;
    var vk;
    var isdtp;
    var p;
    var btp;
    var vtp0;
    var ptp;
    var vtp;
    var tp0;
    var rg;
    var v;
    js = "";
    k = __bindingKey(binding);
    if (__obkind(k) === string_kind) ____times(js, k); else {
        tp0 = __type0(k);
        if (tp0 === Regarding) {
            rg = ____obsel(k, Regarding_value);
            if (__obkind(rg) === string_kind) ____times(js, __translateId(rg)); else {
                ____times(js, "<unprintable>");
                ____times(js, __obkind(rg));
            }
        } else if (tp0 === FunctionalProperty) {
            p = k;
            v = __bindingValue(binding);
            btp = ____obsel(binding, Binding_type);
            if (!btp || btp === ob) {
                ptp = __range(p);
                if (ptp) vtp = ptp;
            } else vtp = btp;
            if (!vtp) vtp = ob;
            vtp0 = __type0(v);
            if (!(vtp0 === ob)) {
                if (vtp === ob) vtp = vtp0; else vtp = __mostSpecific([ vtp0, vtp ]);
            }
            vk = __obkind(v);
            if (vk === double_kind) vtp = fabl_double;
            isdtp = __isString(v) || __isId(v) || vk === int_kind || vk === double_kind;
            ____addChar(js, ascii_squote);
            ____times(js, v);
            ____addChar(js, ascii_squote);
        } else {
            ____addChar(js, ascii_squote);
            ____times(js, "<unknown binding type>");
            ____times(js, __obkind(k));
            ____times(js, tp0);
            ____addChar(js, ascii_squote);
        }
    }
    return js;
}

function __translateThirdBinding(x) {
    var x;
    var js;
    var bn;
    var i;
    var ln;
    bn = __bindings(x);
    ln = __seqLength(bn);
    js = "";
    if (ln >= 3) {
        ____times(js, __translateBinding(bn[2]));
    } else {
        ____times(js, "only ");
        ____times(js, ln);
        ____times(js, " bindings");
        for (i = 0; i < ln; i++) {
            ____times(js, __translateBinding(bn[i]));
        }
    }
    return js;
}

function __translateConstant(xconstant) {
    var xconstant;
    var js;
    var bn;
    var b;
    var ck;
    var i;
    var ln;
    var dk;
    js = "";
    ck = __obkind(xconstant);
    if (!xconstant) {
        ____times(js, "null");
    } else if (ck === hashtable_kind) {
        ____times(js, __translateThirdBinding(xconstant));
    } else if (ck === binding_kind) {
        ____times(js, __translateBinding(xconstant));
    } else if (ck === double_kind) {
        ____times(js, xconstant);
    } else if (ck === int_kind) {
        ____times(js, xconstant);
    } else if (ck === string_kind) {
        ____addChar(js, ascii_squote);
        ____times(js, xconstant);
        ____addChar(js, ascii_squote);
    } else if (ck === seq_kind) {
        dk = __seqDataKind(xconstant);
        if (dk === seqDataOb_kind) {
            ____times(js, "seqDataOb_kind");
        } else if (dk === seqDataByte_kind) {
            ____addChar(js, ascii_squote);
            ____times(js, xconstant);
            ____addChar(js, ascii_squote);
        } else if (dk === seqDataShort_kind) {
            ____times(js, "seqDataShort_kind");
        } else if (dk === seqDataInt_kind) {
            ____times(js, "seqDataInt_kind");
        } else if (dk === seqDataDouble_kind) {
            ____times(js, "seqDataDouble_kind");
        } else {
            ____times(js, "<unknown seq kind>");
        }
    } else {
        ____times(js, "<Unhandled constant kind>: ");
        ____times(js, ck);
    }
    return js;
}

function __translateDeclarations(x) {
    var x;
    var js;
    var bt;
    var pid;
    var ptp;
    var ln;
    var i;
    var bb;
    var p0;
    js = "";
    bb = __bindings(x);
    if (bb) {
        ln = __seqLength(bb);
        for (i = 0; i < ln; i++) {
            p0 = bb[i];
            bt = ____obsel(p0, Binding_type);
            if (p0 && bt) {
                pid = __regardingValue(__bindingKey(p0));
                ptp = ____obsel(p0, Binding_type);
                if (outputTypesToJS) {
                    ____times(js, "/* ");
                    ____times(js, ptp);
                    ____times(js, "*/ ");
                }
                ____times(js, pid);
                if (i < ln - 1) ____times(js, ",");
            }
        }
    }
    return js;
}

function __translateLocalVariablesDeclaration(x) {
    var x;
    var js;
    var dcl;
    js = "";
    dcl = __translateDeclarations(x);
    if (__length(dcl) > 0) {
        ____times(js, "var ");
        ____times(js, dcl);
        ____times(js, ";");
    }
    return js;
}

function __decorateFunctionName(xfunction) {
    var xfunction;
    var nm;
    var pnm;
    var dnm;
    var tp;
    var itps;
    var ln;
    var i;
    nm = ____obsel(xfunction, Function_name);
    tp = ____obsel(xfunction, Function_type);
    itps = __inputTypes(tp);
    ln = __seqLength(itps);
    dnm = "";
    for (i = 0; i < ln; i++) {
        pnm = "";
        ____times(pnm, itps[i]);
        pnm = __________replaceChar(pnm, ascii_colon, ascii_underbar, 0, __length(pnm));
        pnm = __________replaceChar(pnm, ascii_lparen, ascii_underbar, 0, __length(pnm));
        pnm = __________replaceChar(pnm, ascii_rparen, ascii_underbar, 0, __length(pnm));
        ____times(dnm, pnm);
        ____times(dnm, "__");
    }
    ____times(dnm, nm);
    return dnm;
}

function __translateFunction(xfunction) {
    var xfunction;
    var js;
    var nm;
    var pid;
    var tp;
    var rtp;
    var ptp;
    var bb;
    var p0;
    tp = ____obsel(xfunction, Function_type);
    js = "";
    ____times(js, "function ");
    if (outputTypesToJS) {
        rtp = __resultType(tp);
        ____times(js, "/*");
        ____times(js, rtp);
        ____times(js, "*/ ");
    }
    ____times(js, __decorateFunctionName(xfunction));
    ____times(js, "(");
    ____times(js, __translateDeclarations(c_params));
    ____times(js, ")");
    return js;
}

function __translateReturn(xreturn) {
    var xreturn;
    var js;
    var vl;
    js = "return";
    vl = ____obsel(xreturn, Xreturn_value);
    if (vl) {
        ____times(js, " ");
        ____times(js, __translateXob(vl));
    }
    return js;
}

function __translateAssign(xassign) {
    var xassign;
    var js;
    var source;
    var dest;
    dest = ____obsel(xassign, Xassign_dest);
    source = ____obsel(xassign, Xassign_source);
    js = "";
    ____times(js, __translateXob(dest));
    ____times(js, "=");
    ____times(js, __translateXob(source));
    return js;
}

function __translateBlock(xblock) {
    var xblock;
    var js;
    var ls;
    var st;
    var i;
    var ln;
    var lv;
    js = "";
    ____times(js, "{");
    ____times(js, jsLastLocalVars);
    jsLastLocalVars = "";
    ls = ____obsel(xblock, Xblock_locals);
    if (ls) {
        ____times(js, __translateXob(ls));
    }
    st = ____obsel(xblock, Xblock_statements);
    ln = __seqLength(st);
    if (st && ln > 0) {
        for (i = 0; i < ln; i++) {
            if (!__isNulXob(st[i])) {
                closeStatementAfterNextXob = fabl_true;
                ____times(js, __translateXob(st[i]));
            }
        }
    }
    ____times(js, "}");
    return js;
}

function __funcname(xapply) {
    var xapply;
    var fns;
    var fnn;
    var fn;
    fns = "";
    if (xapply) {
        fn = ____obsel(xapply, Xapply_functionOf);
        if (fn && !__isBinding(fn)) {
            fnn = ____obsel(fn, Function_name);
            ____times(fns, fnn);
        }
    }
    return fns;
}

function ______translateUnaryOp(xapply, op, postfix) {
    var xapply;
    var op;
    var postfix;
    var js;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    dst = ____obsel(xapply, Xapply_dest);
    if (dst) {
        ____times(js, __translateXob(dst));
        ____times(js, " = ");
    }
    dt = ____obsel(xapply, Xapply_arguments);
    ln = __seqLength(dt);
    if (dt && ln === 1) {
        if (!postfix) ____times(js, op);
        ____times(js, __translateXob(dt[0]));
        if (postfix) ____times(js, op);
    }
    return js;
}

function ____translateUnaryOp(xapply, op) {
    var xapply;
    var op;
    return ______translateUnaryOp(xapply, op, fabl_false);
}

function ______translateBinaryOp(xapply, op, enclosed) {
    var xapply;
    var op;
    var enclosed;
    var js;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    dst = ____obsel(xapply, Xapply_dest);
    if (dst) {
        ____times(js, __translateXob(dst));
        ____times(js, " = ");
    }
    dt = ____obsel(xapply, Xapply_arguments);
    ln = __seqLength(dt);
    if (dt && ln === 2) {
        if (enclosed) ____times(js, "(");
        ____times(js, __translateXob(dt[0]));
        ____times(js, op);
        ____times(js, __translateXob(dt[1]));
        if (enclosed) ____times(js, ")");
    }
    return js;
}

function ____translateBinaryOp(xapply, op) {
    var xapply;
    var op;
    return ______translateBinaryOp(xapply, op, fabl_true);
}

function __translateMkStringBuf(xapply) {
    var xapply;
    var js;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    dt = ____obsel(xapply, Xapply_arguments);
    ln = __seqLength(dt);
    if (dt && ln === 1) {
        ____times(js, __translateXob(dt[0]));
    }
    return js;
}

function __translateApply(xapply) {
    var xapply;
    var js;
    var fnn;
    var fn;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    fn = ____obsel(xapply, Xapply_functionOf);
    fnn = __funcname(xapply);
    if (fnn && __length(fnn) > 0) {
        if (fnn === "equal") return ____translateBinaryOp(xapply, "===");
        if (fnn === "not") return ____translateUnaryOp(xapply, "!");
        if (fnn === "and") return ____translateBinaryOp(xapply, "&&");
        if (fnn === "or") return ____translateBinaryOp(xapply, "||");
        if (fnn === "greaterp") return ____translateBinaryOp(xapply, ">");
        if (fnn === "geq") return ____translateBinaryOp(xapply, ">=");
        if (fnn === "lessp") return ____translateBinaryOp(xapply, "<");
        if (fnn === "leq") return ____translateBinaryOp(xapply, "<=");
        if (fnn === "mod") return ____translateBinaryOp(xapply, "%");
        if (fnn === "plus") return ____translateBinaryOp(xapply, "+");
        if (fnn === "difference") return ____translateBinaryOp(xapply, "-");
        if (fnn === "plus_plus") return ______translateUnaryOp(xapply, "++", fabl_true);
        if (fnn === "minus_minus") return ______translateUnaryOp(xapply, "--", fabl_true);
        if (fnn === "unary_minus") return ____translateUnaryOp(xapply, "-");
        if (fnn === "nnul") return ____translateUnaryOp(xapply, "");
        if (fnn === "nul") return ____translateUnaryOp(xapply, "!");
        if (fnn === "mkStringBuf") return __translateMkStringBuf(xapply);
        if (fnn === "copyStringConst") return "";
        dst = ____obsel(xapply, Xapply_dest);
        if (dst) {
            ____times(js, __translateXob(dst));
            ____times(js, " = ");
        }
        ____times(js, __decorateFunctionName(fn));
        ____times(js, "(");
        dt = ____obsel(xapply, Xapply_arguments);
        ln = __seqLength(dt);
        if (dt && ln > 0) {
            for (i = 0; i < ln - 1; i++) {
                ____times(js, __translateXob(dt[i]));
                ____times(js, ",");
            }
            ____times(js, __translateXob(dt[ln - 1]));
        }
        ____times(js, ")");
    }
    return js;
}

function __translateFor(xfor) {
    var xfor;
    var js;
    var init;
    var test;
    var incr;
    var body;
    init = ____obsel(xfor, Xfor_init);
    test = ____obsel(xfor, Xfor_test);
    incr = ____obsel(xfor, Xfor_incr);
    body = ____obsel(xfor, Xfor_body);
    js = "for(";
    ____times(js, __translateXob(init));
    ____times(js, ";");
    ____times(js, __translateXob(test));
    ____times(js, ";");
    ____times(js, __translateXob(incr));
    ____times(js, ") ");
    closeStatementAfterNextXob = fabl_true;
    ____times(js, __translateXob(body));
    return js;
}

function __translateWhile(xwhile) {
    var xwhile;
    var js;
    var test;
    var body;
    test = ____obsel(xwhile, Xwhile_test);
    body = ____obsel(xwhile, Xwhile_body);
    js = "while(";
    ____times(js, __translateXob(test));
    ____times(js, ") ");
    closeStatementAfterNextXob = fabl_true;
    ____times(js, __translateXob(body));
    return js;
}

function __translateIf(xif) {
    var xif;
    var js;
    var iff;
    js = "";
    ____times(js, "if(");
    ____times(js, __translateXob(____obsel(xif, Xif_condition)));
    ____times(js, ") ");
    closeStatementAfterNextXob = fabl_true;
    ____times(js, __translateXob(____obsel(xif, Xif_ifTrue)));
    iff = ____obsel(xif, Xif_ifFalse);
    if (iff) {
        ____times(js, " else ");
        closeStatementAfterNextXob = fabl_true;
        ____times(js, __translateXob(iff));
    }
    return js;
}

function __translateSequence(xsequence) {
    var xsequence;
    var js;
    var args;
    var i;
    var ln;
    args = ____obsel(xsequence, Xsequence_arguments);
    js = "";
    ln = __seqLength(args);
    ____times(js, "[");
    for (i = 0; i < ln; i++) {
        ____times(js, __translateXob(args[i]));
        if (i < ln - 1) ____times(js, ",");
    }
    ____times(js, "]");
    return js;
}

function __translateSelectIndex(xselectindex) {
    var xselectindex;
    var js;
    var args;
    var i;
    var ln;
    var src;
    var sl;
    src = ____obsel(xselectindex, XselectIndex_source);
    sl = ____obsel(xselectindex, XselectIndex_selector);
    js = __translateXob(src);
    ____times(js, "[");
    ____times(js, __translateXob(sl));
    ____times(js, "]");
    return js;
}

function __translateSelectProperty(xselectproperty) {
    var xselectproperty;
    var js;
    var src;
    var prp;
    src = ____obsel(xselectproperty, XselectProperty_source);
    prp = ____obsel(xselectproperty, XselectProperty_selector);
    js = __translateXob(src);
    ____times(js, "[");
    ____addChar(js, ascii_squote);
    ____times(js, prp);
    ____addChar(js, ascii_squote);
    ____times(js, "]");
    return js;
}

function __translateCast(xcast) {
    var xcast;
    var js;
    var cv;
    cv = ____obsel(xcast, Xcast_castee);
    js = __translateXob(cv);
    return js;
}

function __translateXob(x) {
    var x;
    var js;
    var lv;
    var closeStatement;
    if (skipNextXob === fabl_true) {
        skipNextXob = fabl_false;
        return "";
    }
    closeStatement = fabl_false;
    if (closeStatementAfterNextXob) {
        closeStatementAfterNextXob = fabl_false;
        closeStatement = fabl_true;
    }
    js = "";
    if (__isNulXob(x)) ____times(js, "null"); else if (__isConstant(x)) ____times(js, __translateConstant(x)); else if (__isFunction(x)) ____times(js, __translateFunction(x)); else if (__isBinding(x)) ____times(js, __translateBinding(x)); else if (____hasType(x, Xreturn)) ____times(js, __translateReturn(x)); else if (____hasType(x, Xassign)) ____times(js, __translateAssign(x)); else if (____hasType(x, Xblock)) ____times(js, __translateBlock(x)); else if (____hasType(x, Xapply)) ____times(js, __translateApply(x)); else if (____hasType(x, Xfor)) ____times(js, __translateFor(x)); else if (____hasType(x, Xwhile)) ____times(js, __translateWhile(x)); else if (____hasType(x, Xif)) ____times(js, __translateIf(x)); else if (____hasType(x, Xsequence)) ____times(js, __translateSequence(x)); else if (____hasType(x, XselectIndex)) ____times(js, __translateSelectIndex(x)); else if (____hasType(x, XselectProperty)) ____times(js, __translateSelectProperty(x)); else if (____hasType(x, Xcast)) ____times(js, __translateCast(x)); else if (____um_eq(____obsel(x, "rdf:type"), "rdfs:Resource")) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "rdfs:Resource found => not translated to JS");
        __tprint(uwriteBuffer);
        terpri();
    } else {
        js = "<unknown Xob type>: ";
        ____times(js, ____obsel(x, "rdf:type"));
        ____times(js, ";");
    }
    if (closeStatement) {
        if (__isFunction(x) || ____hasType(x, Xblock) || ____hasType(x, Xif)) {} else {
            ____times(js, ";");
        }
    }
    return js;
}

function __translateToJS(x) {
    var x;
    var js;
    if (!jsg) {
        return "";
    }
    if (____hasType(x, Xapply) && __funcname(x) === "translateToJS") {
        return "";
    }
    closeStatementAfterNextXob = fabl_true;
    js = __translateXob(x);
    ____times(jsg, js);
    return js;
}

function __________translateToJS(x, nm, vl, s, local) {
    var x;
    var nm;
    var vl;
    var s;
    var local;
    var js;
    var sid;
    sid = __translateId(nm);
    if (____startsWith(sid, "anytemp_")) return "";
    if (s && __isFunctionType(s)) {
        skipNextXob = fabl_true;
        return "";
    }
    js = "var ";
    if (s && outputTypesToJS) {
        ____times(js, "/*");
        ____times(js, __obkind(s));
        ____times(js, "*/ ");
    }
    ____times(js, sid);
    if (vl && (!(__obkind(vl) === int_kind) || !(__ob_to_integer(vl) === 0)) && (!(__obkind(vl) === double_kind) || !(__toDouble(vl) === 0))) {
        ____times(js, "=");
        closeStatementAfterNextXob = fabl_true;
    } else {
        ____times(js, ";");
    }
    if (local) ____times(jsLastLocalVars, js); else ____times(jsg, js);
    return js;
}

function ____translateToJS(fln, storeToJS) {
    var fln;
    var storeToJS;
    var fnc;
    var fle;
    var fnn;
    var out;
    var x;
    var tp;
    var hp;
    var i;
    var n;
    var lastSlash;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Translating ");
        ____times(uwriteBuffer, fln);
        __tprint(uwriteBuffer);
        terpri();
    }
    translateJS = fabl_true;
    __load(fln);
    translateJS = fabl_false;
    if (storeToJS) {
        lastSlash = ____findFromEnd(fln, ascii_slash);
        fle = __fileExtension(fln);
        fnn = ______substr(fln, lastSlash + 1, __length(fln) - __length(fle) - (lastSlash + 1) - 1);
        out = "../out/";
        ____times(out, fnn);
        ____times(out, ".js");
        __storeJS(out);
        resetJS();
    }
    return jsg;
}

function __translateToJS(fln) {
    var fln;
    return ____translateToJS(fln, fabl_true);
}

var lastParsedType;

var printResult;

fabl_false;

function echoInput() {
    var ln;
    if (!scanning_console) {
        ln = xsd_string__length(scan_inbuf);
        if (echoBegin < ln && c_scan_p < ln) {
            xsd_string__reset(uwriteBuffer);
            xsd_string__xsd_string__times(uwriteBuffer, xsd_string__xsd_int__xsd_int__slice(scan_inbuf, echoBegin, c_scan_p));
            xsd_string__tprint(uwriteBuffer);
            terpri();
        }
        echoBegin = c_scan_p;
    }
}

function fabl_Binding___type(b) {
    var b;
    return rdfs_Resource__rdf_Property__obsel(b, Binding_type);
}

function rdfs_Class__rdfs_Resource__toFunctionType(rtp, params) {
    var rtp;
    var params;
    var gds;
    var ln;
    var i;
    var itps;
    var cb;
    gds = rdfs_Resource__bindings(params);
    ln = rdfs_Resource__seqLength(gds);
    itps = rdfs_Class__mk_emptysequence("<unprintable>");
    for (i = 0; i < ln; i++) {
        cb = gds[i];
        if (cb) rdfs_Resource__rdfs_Resource__seqobAdd(itps, fabl_Binding___type(cb));
    }
    return rdfs_Class__SeqOf_rdfs_Class___mkFunctionType(rtp, itps);
}

var enableAsm = fabl_true;

var disasmFunctions;

fabl_false;

function rdfs_Resource__addParameters(m) {
    var m;
    var gd;
    var ln;
    var i;
    var b;
    gd = rdfs_Resource__bindings(m);
    ln = rdfs_Resource__seqLength(gd);
    for (i = 0; i < ln; i++) {
        b = gd[i];
        if (b) fabl_Binding__addParameter(b);
    }
}

var lastXob;

var lastFlatXob;

{
    gd = rdfs_Resource__bindings(m);
    ln = rdfs_Resource__seqLength(gd);
    for (i = 0; i < ln; i++) {
        b = gd[i];
        if (b) fabl_Binding__addParameter(b);
    }
}

var xobHistory = rdfs_Class__mk_emptysequence("<unprintable>");

var flatXobHistory = rdfs_Class__mk_emptysequence("<unprintable>");

var collecting_xobHistory;

fabl_false;

var analyzeFunctionVerbose;

fabl_false;

collecting_xobHistory = fabl_false;

analyzeFunctionVerbose = fabl_false;

var c_params;

null;

var lastFunParse;

null;

var lastFX;

null;

var lastFF;

null;

function rdfs_Class__rdfs_Resource__analyzeFunction(rts, x) {
    var rts;
    var x;
    var fnm;
    var pr;
    var bd;
    var bdf;
    var fnsort;
    var pcd;
    var fn;
    var bdbl;
    var ismeth;
    var fnmo;
    var ns;
    var cls;
    cls = collectingSubjects();
    xsd_boolean__set_collectingSubjects(fabl_false);
    lastFunParse = x;
    funReturnType = rts;
    analysisTempCount = 0;
    fnmo = rdfs_Resource__cadr(x);
    if (rdfs_Resource__obkind(fnmo) === string_kind) {
        fnm = fnmo;
        ns = home;
        if (printResult) {
            if (echoMode && !scanning_console) echoInput();
            {
                xsd_string__reset(uwriteBuffer);
                xsd_string__xsd_byte__times(uwriteBuffer, lf);
                xsd_string__fabl_id__times(uwriteBuffer, "******FUNCTION******* ");
                xsd_string__fabl_id__times(uwriteBuffer, fnm);
                xsd_string__xsd_byte__times(uwriteBuffer, lf);
                xsd_string__tprint(uwriteBuffer);
                terpri();
            }
        }
    } else {
        if (rdfs_Resource__isQname(fnmo)) {
            pr = rdfs_Resource__cadr(fnmo);
            fnm = rdfs_Resource__caddr(fnmo);
            ns = fabl_id__namespace(pr);
        } else {
            beforeError();
            xsd_string__reset(uwriteBuffer);
            xsd_string__fabl_id__times(uwriteBuffer, "Function name must be an id or qualified name");
            xsd_string__tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    SeqOf_rdfs_Resource___SeqOf_rdfs_Resource___copyInto(cPath, homePath());
    c_params = mkResource();
    rdfs_Resource__rdfs_Resource__analyzeLocalVars(c_params, rdfs_Resource__caddr(x));
    rdfs_Resource__rdfs_Resource__seqobAdd(cPath, c_params);
    analyzingFunction = fabl_true;
    bd = rdfs_Resource__analyze(rdfs_Resource__cadddr(x));
    analyzingFunction = fabl_false;
    if (!rdfs_Resource__rdfs_Class__hasType(bd, Xblock)) {
        beforeError();
        xsd_string__reset(uwriteBuffer);
        xsd_string__fabl_id__times(uwriteBuffer, "internal");
        xsd_string__tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    bdbl = bd;
    rdfs_Resource__rdf_Property__xsd_int__xsd_int__bitset(bdbl, Xblock_booles, Xblock_isFunctionBody, 1);
    rdfs_Resource__rdf_Property__rdfs_Resource__obset(bdbl, Xblock_returnType, funReturnType);
    rdfs_Resource__rdf_Property__rdfs_Resource__obset(bd, Xob1_type, funReturnType);
    if (collecting_xobHistory) rdfs_Resource__rdfs_Resource__seqobAdd(xobHistory, bd);
    lastXob = bd;
    if (analyzeFunctionVerbose) {
        xsd_string__reset(uwriteBuffer);
        xsd_string__fabl_id__times(uwriteBuffer, "Xob: ");
        xsd_string__fabl_Xob__times(uwriteBuffer, bd);
        xsd_string__tprint(uwriteBuffer);
        terpri();
    }
    bdf = fabl_Xob__flatten_top(bd);
    if (analyzeFunctionVerbose) {
        xsd_string__reset(uwriteBuffer);
        xsd_string__fabl_id__times(uwriteBuffer, "Flat Xob: ");
        xsd_string__fabl_Xob__times(uwriteBuffer, bdf);
        xsd_string__tprint(uwriteBuffer);
        terpri();
    }
    lastFlatXob = bdf;
    lastFX = bd;
    lastFF = bdf;
    if (collecting_xobHistory) rdfs_Resource__rdfs_Resource__seqobAdd(flatXobHistory, bdf);
    fnsort = rdfs_Class__rdfs_Resource__toFunctionType(funReturnType, c_params);
    if (enableAsm) {
        asmReset();
        rdfs_Resource__addParameters(c_params);
        fabl_Xob__assemble(bdf);
        asmWrapup();
        if (disasmFunctions) {
            {
                xsd_string__reset(uwriteBuffer);
                xsd_string__fabl_id__times(uwriteBuffer, "Disassembly of ");
                xsd_string__fabl_id__times(uwriteBuffer, fnm);
                xsd_string__tprint(uwriteBuffer);
                terpri();
            }
            SeqOf_xsd_byte___fabl_Dblock__disasm(asmBuf, asmDblock);
            {
                xsd_string__reset(uwriteBuffer);
                xsd_string__fabl_id__times(uwriteBuffer, "**end disassembly**");
                xsd_string__tprint(uwriteBuffer);
                terpri();
            }
            {
                xsd_string__reset(uwriteBuffer);
                xsd_string__tprint(uwriteBuffer);
                terpri();
            }
        }
        pcd = rdfs_Class__iNew(Pcode);
        rdfs_Resource__rdf_Property__rdfs_Resource__obset(pcd, Pcode_code, rdfs_Resource__seqCopy(asmBuf));
        rdfs_Resource__rdf_Property__rdfs_Resource__obset(pcd, Pcode_dblock, asmDblock);
        xsd_boolean__set_collectingSubjects(cls);
        fn = rdfs_Resource__fabl_id__rdfs_Class__rdfs_Resource__internFunction(ns, fnm, fnsort, pcd);
        fabl_Dblock__fabl_Function__setFunctionOf(asmDblock, fn);
        if (translateJS) fabl_Xob__translateToJS(fn);
    }
    thisXob = null;
}

var enableEval;

fabl_false;

var analyzeTopVerbose;

fabl_false;

var disasmTop;

fabl_false;

function fabl_Xob__evaluate(x) {
    var x;
    var cls;
    cls = collectingSubjects();
    xsd_boolean__set_collectingSubjects(fabl_false);
    asmReset();
    fabl_Xob__assemble(x);
    asmWrapup();
    if (disasmTop) SeqOf_xsd_byte___fabl_Dblock__disasm(asmBuf, asmDblock);
    xsd_boolean__set_collectingSubjects(cls);
    return fabl_Dblock__SeqOf_xsd_byte___pmEvaluate(asmDblock, rdfs_Resource__seqCopy(asmBuf));
}

var printXob;

fabl_false;

function rdfs_Resource__evaluate_(xa) {
    var xa;
    var bd;
    var bdf;
    var rsrt;
    var rs;
    var x;
    var cls;
    cls = collectingSubjects();
    xsd_boolean__set_collectingSubjects(fabl_false);
    bd = rdfs_Resource__analyzeToplevel(xa);
    if (printXob) {
        xsd_string__reset(uwriteBuffer);
        xsd_string__fabl_id__times(uwriteBuffer, "Xob: ");
        xsd_string__fabl_Xob__times(uwriteBuffer, bd);
        xsd_string__tprint(uwriteBuffer);
        terpri();
    }
    rsrt = fabl_Xob__type(bd);
    funReturnType = rsrt;
    lastXob = bd;
    bdf = fabl_Xob__flatten_top(bd);
    lastFlatXob = bdf;
    if (analyzeTopVerbose) {
        xsd_string__reset(uwriteBuffer);
        xsd_string__fabl_id__times(uwriteBuffer, "Non function ");
        xsd_string__fabl_Xob__times(uwriteBuffer, bdf);
        xsd_string__tprint(uwriteBuffer);
        terpri();
    }
    if (enableAsm) {
        xsd_boolean__set_collectingSubjects(cls);
        rs = fabl_Xob__evaluate(bdf);
        lastXob = bd;
        lastFlatXob = bdf;
        return rs;
    }
    xsd_boolean__set_collectingSubjects(cls);
}

function xsd_string__evaluate(s) {
    var s;
    return rdfs_Resource__evaluate_(xsd_string__parse1(s));
}

function rdfs_Resource__evaluateAndPrint(xa) {
    var xa;
    var rs;
    if (printResult) {
        if (echoMode && !scanning_console) echoInput();
        rs = rdfs_Resource__evaluate_(xa);
        if (echoMode && !scanning_console) {
            xsd_string__reset(uwriteBuffer);
            xsd_string__xsd_string__times(uwriteBuffer, "-->");
            xsd_string__tprint(uwriteBuffer);
        }
        rdfs_Resource__rdfs_Class__uwriteln(rs, fabl_Xob__type(lastXob));
    } else rs = rdfs_Resource__evaluate_(xa);
    return rs;
}

function rdfs_Resource__xsd_boolean__analyzeTopVars(x, isConstant) {
    var x;
    var isConstant;
    var cx;
    var ce;
    var lsts;
    var srt;
    var vl;
    var nmo;
    var nm;
    var bnd;
    SeqOf_rdfs_Resource___SeqOf_rdfs_Resource___copyInto(cPath, homePath());
    cx = x;
    lsts = null;
    while (rdfs_Resource__isList(cx)) {
        ce = rdfs_Resource__car(cx);
        if (rdfs_Resource__obkind(ce) === string_kind) {
            if (!lsts) {
                beforeError();
                xsd_string__reset(uwriteBuffer);
                xsd_string__fabl_id__times(uwriteBuffer, "Class needed for variable ");
                xsd_string__rdfs_Resource__times(uwriteBuffer, ce);
                xsd_string__tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            if (!classBeingDefined) {
                if (isConstant) {
                    beforeError();
                    xsd_string__reset(uwriteBuffer);
                    xsd_string__fabl_id__times(uwriteBuffer, "A value needs to be supplied for the constant ");
                    xsd_string__fabl_id__times(uwriteBuffer, ce);
                    xsd_string__tprint(uwriteBuffer);
                    terpri();
                    afterError();
                } else {
                    rdfs_Resource__fabl_id__rdfs_Class__bindGlobal(home, ce, lsts);
                }
            } else {
                rdfs_Class__fabl_id__rdfs_Class__addField(classBeingDefined, ce, lsts);
            }
        } else if (rdfs_Resource__isList(ce)) {
            if (rdfs_Resource__rdfs_Resource__um_eq(rdfs_Resource__car(ce), "assign")) {
                vl = rdfs_Resource__evaluate_(rdfs_Resource__caddr(ce));
                nmo = rdfs_Resource__cadr(ce);
                {
                    nm = rdfs_Resource__cadr(ce);
                    srt = fabl_Xob__type(lastXob);
                    if (!classBeingDefined) {
                        if (isConstant) {
                            rdfs_Resource__fabl_id__rdfs_Resource__rdfs_Class__bindConstant(home, nm, vl, srt);
                        } else {
                            rdfs_Resource__fabl_id__rdfs_Resource__rdfs_Class__bindGlobal(home, nm, vl, srt);
                        }
                    } else {
                        beforeError();
                        xsd_string__reset(uwriteBuffer);
                        xsd_string__fabl_id__times(uwriteBuffer, "Cannot assign default values in a sort definition yet");
                        xsd_string__tprint(uwriteBuffer);
                        terpri();
                        afterError();
                    }
                }
            } else {
                lsts = rdfs_Resource__rdfs_Resource__xsd_boolean__analyzeTypedVar(home, ce, fabl_false);
            }
        }
        cx = rdfs_Resource__cdr(cx);
    }
    if (echoMode && !scanning_console) echoInput();
}

var lastValue;

null;

var lastParse;

null;

function rdfs_Resource__analyzeTop(ce) {
    var ce;
    var prce;
    lastParse = ce;
    prce = rdfs_Resource__isList(ce);
    if (prce) {
        if (rdfs_Resource__rdfs_Resource__um_eq(rdfs_Resource__car(ce), "function")) {
            rdfs_Class__rdfs_Resource__analyzeFunction(rdfs_Resource__analyzeTypen(rdfs_Resource__cadr(ce)), rdfs_Resource__rdfs_Resource__cons("function", rdfs_Resource__cdr(rdfs_Resource__cdr(ce))));
        } else if (rdfs_Resource__rdfs_Resource__um_eq(rdfs_Resource__car(ce), "var")) {
            rdfs_Resource__xsd_boolean__analyzeTopVars(rdfs_Resource__cdr(ce), fabl_false);
        } else if (rdfs_Resource__rdfs_Resource__um_eq(rdfs_Resource__car(ce), "constant")) {
            rdfs_Resource__xsd_boolean__analyzeTopVars(rdfs_Resource__cdr(ce), fabl_true);
        } else {
            lastValue = rdfs_Resource__evaluateAndPrint(ce);
            lastParsedType = fabl_void;
        }
    } else {
        lastValue = rdfs_Resource__evaluateAndPrint(ce);
        lastParsedType = fabl_void;
    }
}

var fablDoneId = "exit";

var fablEval = fabl_true;

var lastFablParse;

fabl_true;

var printParseResults;

fabl_false;

printParseResults = fabl_false;

var fablLoopDepth;

0;

var fablLoopPop;

fabl_false;

function xsd_boolean__fablLoop(cn) {
    var cn;
    var cv;
    var dtv;
    var um_is_done;
    var cls;
    um_is_done = fabl_false;
    fablLoopDepth++;
    while (!um_is_done) {
        scanning_console = cn;
        cls = collectingSubjects();
        xsd_boolean__set_collectingSubjects(fabl_false);
        cv = parseToplevel();
        xsd_boolean__set_collectingSubjects(cls);
        if (parse_verbose) {
            xsd_string__reset(uwriteBuffer);
            xsd_string__fabl_id__times(uwriteBuffer, "Parse toplevel = ");
            xsd_string__rdfs_Resource__times(uwriteBuffer, cv);
            xsd_string__tprint(uwriteBuffer);
            terpri();
        }
        if (rdfs_Resource__rdfs_Resource__um_eq(cv, eof_parse)) um_is_done = fabl_true; else {
            xsd_boolean__set_collectingSubjects(fabl_false);
            dtv = rdfs_Resource__detokenify(cv);
            xsd_boolean__set_collectingSubjects(cls);
            if (rdfs_Resource__rdfs_Resource__um_eq(dtv, fablDoneId)) {
                um_is_done = fabl_true;
                {
                    xsd_string__reset(uwriteBuffer);
                    xsd_string__fabl_id__times(uwriteBuffer, "EXIT break");
                    xsd_string__tprint(uwriteBuffer);
                    terpri();
                }
            } else {
                lastFablParse = dtv;
                if (printParseResults) {
                    xsd_string__reset(uwriteBuffer);
                    xsd_string__rdfs_Resource__times(uwriteBuffer, dtv);
                    xsd_string__tprint(uwriteBuffer);
                    terpri();
                }
                if (fablEval) rdfs_Resource__analyzeTop(dtv);
                if (translateJS) fabl_Xob__translateToJS(lastXob);
            }
        }
        if (fablLoopPop) {
            fablLoopPop = fabl_false;
            um_is_done = fabl_true;
        }
    }
    fablLoopDepth--;
}

function fablConsole() {
    {
        xsd_string__reset(uwriteBuffer);
        xsd_string__fabl_id__times(uwriteBuffer, "fablConsole 2");
        xsd_string__tprint(uwriteBuffer);
        terpri();
    }
    scanning_console = fabl_true;
    scan_reset();
    flushConsole();
    xsd_boolean__fablLoop(fabl_true);
}

function rdfs_Resource__fabl_id__SeqOf_fabl_id___installFunction(cn, fnm, itps) {
    var cn;
    var fnm;
    var itps;
    var srts;
    var ln;
    var i;
    var fn;
    var rt;
    srts = rdfs_Class__mk_emptysequence("<unprintable>");
    ln = rdfs_Resource__seqLength(itps);
    rt = rdfs_Resource__analyzeTypen(itps[0]);
    for (i = 1; i < ln; i++) rdfs_Resource__rdfs_Resource__seqobAdd(srts, rdfs_Resource__analyzeTypen(itps[i]));
    fn = rdfs_Resource__fabl_id__rdfs_Class__internFunction(cn, fnm, rdfs_Class__SeqOf_rdfs_Class___mkFunctionType(rt, srts));
    return fn;
}