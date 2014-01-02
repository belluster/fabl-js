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