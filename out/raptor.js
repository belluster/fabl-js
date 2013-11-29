class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
class('' home : RaptorStatement '');
endClass();
var RaptorStatement = ;
var ritUnknown = 0;
var ritResource = 1;
var ritAnonymous = 2;
var ritPredicate = 3;
var ritOrdinal = 4;
var ritLiteral = 5;
var ritXmlLiteral = 6;
var rdf_li = 6;
function complete(rs) {
	return and(and(nnul( < unknown Xob type >  : fabl : XselectProperty), or(nnul( < unknown Xob type >  : fabl : XselectProperty),  < unknown Xob type >  : fabl : XselectProperty === ritOrdinal)), or(nnul( < unknown Xob type >  : fabl : XselectProperty), nnul( < unknown Xob type >  : fabl : XselectProperty))); ; ;
}
function raptorTriplePrintResource(rs, s, tp) {
	if (or(tp === ritResource, tp === ritPredicate)) {
		times(rs, '<');
		times(rs, s);
		times(rs, '>');
	} else if (tp === ritAnonymous) {
		times(rs, '_:');
		times(rs, s);
	} else {
		times(rs, '<UNKNOWNTYPE>');
	};
}
function times(bf, rs) {
	 < unknown Xob type >  : rdfs : Resourceif(not(complete(rs))) {
		times(bf, '<incomplete>');
		return; ;
	}
	raptorTriplePrintResource(bf,  < unknown Xob type >  : fabl : XselectProperty,  < unknown Xob type >  : fabl : XselectProperty);
	times(bf, ' ');
	if ( < unknown Xob type >  : fabl : XselectProperty === ritOrdinal) {
		times(bf, '<http://www.w3.org/1999/02/22-rdf-syntax-ns#_');
		times(bf,  < unknown Xob type >  : fabl : XselectProperty);
		times(bf, '>');
	} else
		raptorTriplePrintResource(bf,  < unknown Xob type >  : fabl : XselectProperty,  < unknown Xob type >  : fabl : XselectProperty);
	times(bf, ' ');
	ol =  < unknown Xob type >  : fabl : XselectProperty;
	ov =  < unknown Xob type >  : fabl : XselectProperty;
	if (and(nnul(ol), greaterp(length(ol), 0))) { {
			times(bf, ' "');
			times(bf, ol);
			times(bf, '"');
		}
		dtp =  < unknown Xob type >  : fabl : XselectProperty;
		if (nnul(dtp)) {
			times(bf, ':"');
			times(bf, dtp);
			times(bf, '"');
		};
	} else
		raptorTriplePrintResource(bf,  < unknown Xob type >  : fabl : XselectProperty,  < unknown Xob type >  : fabl : XselectProperty); {
		times(bf, ' .');
		times(bf, lf);
	};
}
var raptorResources = {
	 < unknown Xob type >  : rdfs : Resourceif(not(complete(rs))) {
		times(bf, '<incomplete>');
		return; ;
	}
	raptorTriplePrintResource(bf,  < unknown Xob type >  : fabl : XselectProperty,  < unknown Xob type >  : fabl : XselectProperty);
	times(bf, ' ');
	if ( < unknown Xob type >  : fabl : XselectProperty === ritOrdinal) {
		times(bf, '<http://www.w3.org/1999/02/22-rdf-syntax-ns#_');
		times(bf,  < unknown Xob type >  : fabl : XselectProperty);
		times(bf, '>');
	} else
		raptorTriplePrintResource(bf,  < unknown Xob type >  : fabl : XselectProperty,  < unknown Xob type >  : fabl : XselectProperty);
	times(bf, ' ');
	ol =  < unknown Xob type >  : fabl : XselectProperty;
	ov =  < unknown Xob type >  : fabl : XselectProperty;
	if (and(nnul(ol), greaterp(length(ol), 0))) { {
			times(bf, ' "');
			times(bf, ol);
			times(bf, '"');
		}
		dtp =  < unknown Xob type >  : fabl : XselectProperty;
		if (nnul(dtp)) {
			times(bf, ':"');
			times(bf, dtp);
			times(bf, '"');
		};
	} else
		raptorTriplePrintResource(bf,  < unknown Xob type >  : fabl : XselectProperty,  < unknown Xob type >  : fabl : XselectProperty); {
		times(bf, ' .');
		times(bf, lf);
	};
}
var raptorSubjects = seqDataOb_kind;
mk_emptysequence();
var raptorSubjectDictionary = mk_emptysequence();
function insertRaptorResource(s, tp, kind, cl) {
	 < unknown Xob type >  : rdfs : Resourcer = regarding(s);
	rs = get(raptorResources, r);
	if (nul(rs)) {
		if (or(tp === ritResource, tp === ritPredicate))
			rs = uriAllocate('s', cl);
		else if (tp === ritAnonymous) {
			rs = iNew(cl); ;
		} else {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'could not insert ');
			times(uwriteBuffer, s);
			times(uwriteBuffer, ' of type ');
			times(uwriteBuffer, tp);
			tprint(uwriteBuffer);
			terpri();
		}
		set(raptorResources, r, rs); ;
	}
	if (kind === 'subject') {
		sb = get(raptorSubjectDictionary, r);
		if (nul(sb)) {
			set(raptorSubjectDictionary, r, rs);
			seqobAdd(raptorSubjects, rs); ;
		};
	}
	return rs; ; ;
}
function raptorAnon(s) {
	return insertRaptorResource(s, ritAnonymous, 'object', ob); ; ;
}
function raptorUri(s) {
	return insertRaptorResource(s, ritResource, 'object', ob); ; ;
}
function assertSeqValue(x, n, v) {
	 < unknown Xob type >  : rdfs : Resourcek = obkind(x);
	if (not(k === seq_kind))
		return; ;
	dk = seqDataKind(x);
	if (lessp(n, 1)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		times(uwriteBuffer, n);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	if (dk === seqDataOb_kind) {
		seqobExpand(x, n);
		xs = x;
		xs[difference(n, 1)] = v; ;
	} else {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
}
function addSeqValue(x, v) {
	 < unknown Xob type >  : rdfs : Resourcek = obkind(x);
	if (not(k === seq_kind))
		return; ;
	dk = seqDataKind(x);
	if (dk === seqDataOb_kind)
		seqobAdd(x, v);
	else {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
}
function assert(rs) {
	 < unknown Xob type >  : rdfs : Resourcesb =  < unknown Xob type >  : fabl : XselectProperty;
	sbt =  < unknown Xob type >  : fabl : XselectProperty;
	pr =  < unknown Xob type >  : fabl : XselectProperty;
	prt =  < unknown Xob type >  : fabl : XselectProperty;
	otp =  < unknown Xob type >  : fabl : XselectProperty;
	ov =  < unknown Xob type >  : fabl : XselectProperty;
	ol =  < unknown Xob type >  : fabl : XselectProperty;
	isord = prt === ritOrdinal;
	if (nul(sb))
		return; ;
	if (and(not(isord), nul(pr)))
		return; ;
	if (not(isord)) {
		prr = insertRaptorResource(pr, prt, 'predicate', Property);
		if (nul(prr))
			return; ; ;
	}
	if (and(nnul(ov), greaterp(length(ov), 0))) {
		if (um_eq(prr, ))
			cl = Class;
		else
			cl = ob;
		ovr = insertRaptorResource(ov, otp, 'object', cl);
		if (nul(ovr))
			return; ;
		if (um_eq(prr, ))
			sbr = insertRaptorResource(sb, sbt, 'subject', ovr);
		else
			sbr = insertRaptorResource(sb, sbt, 'subject', ob);
		if (nul(sbr))
			return; ;
		if (isord)
			assertSeqValue(sbr,  < unknown Xob type >  : fabl : XselectProperty, ovr);
		else if (um_eq(prr, rdf_li))
			addSeqValue(sbr, ovr);
		else
			assert(sbr, prr, ovr); ;
	} else if (nnul(ol)) {
		dtpid =  < unknown Xob type >  : fabl : XselectProperty;
		if (nnul(dtpid))
			dtp = insertRaptorResource(dtpid, ritResource, 'type', Class);
		else
			dtp = Literal;
		if (um_eq(dtp, fabl_int)) {
			olv = integer_to_ob(toInt(ol)); ;
		} else
			olv = ol;
		sbr = insertRaptorResource(sb, sbt, 'subject', ob);
		if (nul(sbr))
			return; ;
		if (isord)
			assertSeqValue(sbr,  < unknown Xob type >  : fabl : XselectProperty, olv);
		else if (um_eq(prr, rdf_li))
			addSeqValue(sbr, ovr);
		else
			assert(sbr, prr, olv); ;
	} else {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
}
var raptorParseBuf = seqDataOb_kind;
mk_emptysequence();
var raptorFilenameBuf = ''; {
	 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
	times(toStringResult, '');
	return toStringResult; ;
}
function printRaptorStatements() {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(raptorParseBuf);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		reset(uwriteBuffer);
		times(uwriteBuffer, i);
		times(uwriteBuffer, ' ');
		times(uwriteBuffer, raptorParseBuf[i]);
		tprint(uwriteBuffer);
		terpri();
	}; ;
}
function prs() {
	printRaptorStatements(); ;
}
function raptorReset() {
	seqReset(raptorParseBuf);
	seqReset(raptorSubjects);
	raptorResources = mkObject();
	raptorSubjectDictionary = mkObject(); ;
}
function raptorLoadFile(fln, stx) {
	 < unknown Xob type >  : rdfs : Resourcereset(raptorFilenameBuf);
	times(raptorFilenameBuf, 'file');
	times(raptorFilenameBuf, '://');
	times(raptorFilenameBuf, fln);
	seqReset(raptorParseBuf);
	raptorParseFile(raptorParseBuf, raptorFilenameBuf, stx);
	ln = seqLength(raptorParseBuf);
	for (i = 0; lessp(i, ln); plus_plus(i))
		assert(raptorParseBuf[i]); ; ;
}
var raptorInitialized = false;
var raptorInstalled = true;
var wwwInitialized = false;
function initRaptor() {
	if (nul(rdf_li))
		rdf_li = resource();
	if (not(raptorInstalled)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	if (not(raptorInitialized)) {
		raptorInit();
		raptorInitialized = true; ;
	};
}
function initWWW() {
	initRaptor();
	if (not(wwwInitialized)) {
		init_www();
		wwwInitialized = true; ;
	};
}
function loadRaptor(url, stx) {
	 < unknown Xob type >  : rdfs : Resourceisfl = startsWith(url, );
	als = allocStatically(true);
	initRaptor();
	if (not(isfl))
		initWWW();
	raptorReset();
	seqReset(raptorParseBuf);
	if (isfl)
		raptorParseFile(raptorParseBuf, url, stx);
	else
		raptorParseUri(raptorParseBuf, url, stx);
	ln = seqLength(raptorParseBuf);
	for (i = 0; lessp(i, ln); plus_plus(i))
		assert(raptorParseBuf[i]); ;
	allocStatically(als);
	return; ; ;
}
function loadRaptor(subjects, url, stx) {
	loadRaptor(url, stx);
	seqobAppend(subjects, raptorSubjects);
	return; ; ;
}
