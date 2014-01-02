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