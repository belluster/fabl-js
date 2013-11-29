var lastParsedType = var printResult = false;
function echoInput() {
	 < unknown Xob type >  : rdfs : Resourceif(not(scanning_console)) {
		ln = length(scan_inbuf);
		if (and(lessp(echoBegin, ln), lessp(c_scan_p, ln))) {
			reset(uwriteBuffer);
			times(uwriteBuffer, slice(scan_inbuf, echoBegin, c_scan_p));
			tprint(uwriteBuffer);
			terpri();
		}
		echoBegin = c_scan_p; ;
	};
}
function _type(b) {
	return obsel(b, Binding_type); ; ;
}
function toFunctionType(rtp, params) {
	 < unknown Xob type >  : rdfs : Resourcegds = bindings(params);
	ln = seqLength(gds);
	itps = mk_emptysequence();
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		cb = gds[i];
		if (nnul(cb))
			seqobAdd(itps, _type(cb)); ;
	};
	return mkFunctionType(rtp, itps); ; ;
}
var enableAsm = true;
var disasmFunctions = false;
function addParameters(m) {
	 < unknown Xob type >  : rdfs : Resourcegd = bindings(m);
	ln = seqLength(gd);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		b = gd[i];
		if (nnul(b))
			addParameter(b); ;
	}; ;
}
var lastXob = var lastFlatXob = null;
var xobHistory = seqDataOb_kind;
mk_emptysequence();
var flatXobHistory = seqDataOb_kind;
mk_emptysequence();
var collecting_xobHistory = false;
var analyzeFunctionVerbose = false;
collecting_xobHistory = false;
analyzeFunctionVerbose = false;
var c_params = ;
var lastFunParse = ;
var lastFX = ;
var lastFF = ;
function analyzeFunction(rts, x) {
	 < unknown Xob type >  : rdfs : Resourcecls = collectingSubjects();
	set_collectingSubjects(false);
	lastFunParse = x;
	funReturnType = rts;
	analysisTempCount = 0;
	fnmo = cadr(x);
	if (obkind(fnmo) === string_kind) {
		fnm = fnmo;
		ns = home;
		if (printResult) {
			if (and(echoMode, not(scanning_console)))
				echoInput(); {
				reset(uwriteBuffer);
				times(uwriteBuffer, lf);
				times(uwriteBuffer, '******FUNCTION******* ');
				times(uwriteBuffer, fnm);
				times(uwriteBuffer, lf);
				tprint(uwriteBuffer);
				terpri();
			};
		};
	} else {
		if (isQname(fnmo)) {
			pr = cadr(fnmo);
			fnm = caddr(fnmo);
			ns = namespace(pr); ;
		} else {
			beforeError();
			reset(uwriteBuffer);
			times(uwriteBuffer, 'Function name must be an id or qualified name');
			tprint(uwriteBuffer);
			terpri();
			afterError();
		};
	}
	copyInto(cPath, homePath());
	c_params = mkResource();
	analyzeLocalVars(c_params, caddr(x));
	seqobAdd(cPath, c_params);
	analyzingFunction = true;
	bd = analyze(cadddr(x));
	analyzingFunction = false;
	if (not(hasType(bd, Xblock))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'internal');
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	bdbl = bd;
	bitset(bdbl, Xblock_booles, Xblock_isFunctionBody, 1);
	obset(bdbl, Xblock_returnType, funReturnType);
	obset(bd, Xob1_type, funReturnType);
	if (collecting_xobHistory)
		seqobAdd(xobHistory, bd);
	lastXob = bd;
	if (analyzeFunctionVerbose) {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Xob: ');
		times(uwriteBuffer, bd);
		tprint(uwriteBuffer);
		terpri();
	}
	bdf = flatten_top(bd);
	if (analyzeFunctionVerbose) {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Flat Xob: ');
		times(uwriteBuffer, bdf);
		tprint(uwriteBuffer);
		terpri();
	}
	lastFlatXob = bdf;
	lastFX = bd;
	lastFF = bdf;
	if (collecting_xobHistory)
		seqobAdd(flatXobHistory, bdf);
	fnsort = toFunctionType(funReturnType, c_params);
	if (enableAsm) {
		asmReset();
		addParameters(c_params);
		assemble(bdf);
		asmWrapup();
		if (disasmFunctions) { {
				reset(uwriteBuffer);
				times(uwriteBuffer, 'Disassembly of ');
				times(uwriteBuffer, fnm);
				tprint(uwriteBuffer);
				terpri();
			}
			disasm(asmBuf, asmDblock); {
				reset(uwriteBuffer);
				times(uwriteBuffer, '**end disassembly**');
				tprint(uwriteBuffer);
				terpri();
			} {
				reset(uwriteBuffer);
				tprint(uwriteBuffer);
				terpri();
			};
		}
		pcd = iNew(Pcode);
		obset(pcd, Pcode_code, seqCopy(asmBuf));
		obset(pcd, Pcode_dblock, asmDblock);
		set_collectingSubjects(cls);
		fn = internFunction(ns, fnm, fnsort, pcd);
		setFunctionOf(asmDblock, fn);
		if (translateJS)
			translateToJS(fn); ;
	}
	thisXob = ; ;
}
var enableEval = false;
var analyzeTopVerbose = false;
var disasmTop = false;
function evaluate(x) {
	 < unknown Xob type >  : rdfs : Resourcecls = collectingSubjects();
	set_collectingSubjects(false);
	asmReset();
	assemble(x);
	asmWrapup();
	if (disasmTop)
		disasm(asmBuf, asmDblock);
	set_collectingSubjects(cls);
	return pmEvaluate(asmDblock, seqCopy(asmBuf)); ; ;
}
var printXob = false;
function evaluate_(xa) {
	 < unknown Xob type >  : rdfs : Resourcecls = collectingSubjects();
	set_collectingSubjects(false);
	bd = analyzeToplevel(xa);
	if (printXob) {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Xob: ');
		times(uwriteBuffer, bd);
		tprint(uwriteBuffer);
		terpri();
	}
	rsrt = type(bd);
	funReturnType = rsrt;
	lastXob = bd;
	bdf = flatten_top(bd);
	lastFlatXob = bdf;
	if (analyzeTopVerbose) {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Non function ');
		times(uwriteBuffer, bdf);
		tprint(uwriteBuffer);
		terpri();
	}
	if (enableAsm) {
		set_collectingSubjects(cls);
		rs = evaluate(bdf);
		lastXob = bd;
		lastFlatXob = bdf;
		return rs; ; ;
	}
	set_collectingSubjects(cls); ;
}
function evaluate(s) {
	return evaluate_(parse1(s)); ; ;
}
function evaluateAndPrint(xa) {
	 < unknown Xob type >  : rdfs : Resourceif(printResult) {
		if (and(echoMode, not(scanning_console)))
			echoInput();
		rs = evaluate_(xa);
		if (and(echoMode, not(scanning_console))) {
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			tprint(uwriteBuffer);
		}
		uwriteln(rs, type(lastXob)); ;
	}
	else
		rs = evaluate_(xa);
	return rs; ; ;
}
function analyzeTopVars(x, isConstant) {
	 < unknown Xob type >  : rdfs : ResourcecopyInto(cPath, homePath());
	cx = x;
	lsts = ;
	 < unknown Xob type >  : fabl : Xwhile;
	if (and(echoMode, not(scanning_console)))
		echoInput(); ;
}
var lastValue = ;
var lastParse = ;
function analyzeTop(ce) {
	 < unknown Xob type >  : rdfs : ResourcelastParse = ce;
	prce = isList(ce);
	if (prce) {
		if (um_eq(car(ce), 'function'))
			analyzeFunction(analyzeTypen(cadr(ce)), cons('function', cdr(cdr(ce))));
		else if (um_eq(car(ce), 'var'))
			analyzeTopVars(cdr(ce), false);
		else if (um_eq(car(ce), 'constant'))
			analyzeTopVars(cdr(ce), true);
		else {
			lastValue = evaluateAndPrint(ce);
			lastParsedType = fabl_void; ;
		};
	} else {
		lastValue = evaluateAndPrint(ce);
		lastParsedType = fabl_void; ;
	};
}
var fablDoneId = 'exit';
var fablEval = true;
var lastFablParse = true;
var printParseResults = false;
printParseResults = false;
var fablLoopDepth = 0;
var fablLoopPop = false;
function fablLoop(cn) {
	 < unknown Xob type >  : rdfs : Resourceum_is_done = false;
	plus_plus(fablLoopDepth);
	 < unknown Xob type >  : fabl : Xwhile;
	minus_minus(fablLoopDepth); ;
}
function fablConsole() { {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'fablConsole 2');
		tprint(uwriteBuffer);
		terpri();
	}
	scanning_console = true;
	scan_reset();
	flushConsole();
	fablLoop(true); ;
}
function installFunction(cn, fnm, itps) {
	 < unknown Xob type >  : rdfs : Resourcesrts = mk_emptysequence();
	ln = seqLength(itps);
	rt = analyzeTypen(itps[0]);
	for (i = 1; lessp(i, ln); plus_plus(i))
		seqobAdd(srts, analyzeTypen(itps[i])); ;
	fn = internFunction(cn, fnm, mkFunctionType(rt, srts));
	return fn; ; ;
}
