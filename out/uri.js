var uriTable = var uriDels = seqDataOb_kind;
[';', '/', '?', ':', '@', '&', '=', '+', '$', ',', '#', '.'];
function setupUriTable() {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(uriDels);
	uriTable = mk_emptysequence();
	seqobExpand(uriTable, 256);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		s = uriDels[i];
		uriTable[select(s, 0)] = s; ;
	}; ;
}
setupUriTable();
var splitBuf = ''; {
	 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
	times(toStringResult, '');
	return toStringResult; ;
}
function splitToIds(bf, dl) {
	 < unknown Xob type >  : rdfs : Resourcers = mk_emptysequence();
	ln = length(bf);
	reset(splitBuf);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		c = bf[i];
		if (c === dl) {
			seqobAdd(rs, toString(splitBuf));
			reset(splitBuf); ;
		} else
			addChar(splitBuf, c); ;
	};
	if (greaterp(length(splitBuf), 0))
		seqobAdd(rs, toString(splitBuf));
	return rs; ; ;
}
var ascii_sharp = 35;
function parseUri1(bf) {
	 < unknown Xob type >  : rdfs : Resourcers = mk_emptysequence();
	ln = length(bf);
	reset(splitBuf);
	nfnd = true;
	 < unknown Xob type >  : fabl : Xwhile;
	nfnd = true;
	 < unknown Xob type >  : fabl : Xwhile;
	if (greaterp(length(splitBuf), 0))
		seqobAdd(rs, toString(splitBuf));
	return rs; ; ;
}
function removeNullStringsEx1(s) {
	 < unknown Xob type >  : rdfs : Resourcers = mk_emptysequence();
	ln = seqLength(s);
	if (ln === 0)
		return s; ;
	seqobAdd(rs, s[0]);
	for (i = 1; lessp(i, ln); plus_plus(i)) {
		cs = s[i];
		if (or(greaterp(length(cs), 0), and(and(and(and(i === 4, 's[0]' === ), 's[1]' === ), 's[2]' === ), 's[3]' === )))
			seqobAdd(rs, cs); ;
	};
	return rs; ; ;
}
function parseUri(bf) {
	return removeNullStringsEx1(parseUri1(bf)); ; ;
}
function untyped(x) {
	 < unknown Xob type >  : rdfs : Resourcetp = iType(x);
	tpk = obkind(tp);
	if (tpk === values_kind) {
		tpsq = tp;
		lnt = seqLength(tpsq);
		if (lnt === 0)
			return true; ;
		if (lnt === 1)
			return um_eq(tpsq[0], Resource); ;
		return false; ; ;
	}
	return or(nul(tp), um_eq(tp, Resource)); ; ;
}
function installType(x, srt) {
	iInstall(ob, srt, false); ;
}
var equivalents = iNew();
function addEquivalent(x, rep) {
	set(equivalents, regarding(x), rep); ;
}
var internToEquivalents = true;
function getEquivalent(x) {
	 < unknown Xob type >  : rdfs : Resourceif(not(internToEquivalents))return x; ;
	rs = get(equivalents, regarding(x));
	if (nul(rs))
		return x; ;
	return rs; ; ;
} {
	 < unknown Xob type >  : rdfs : Resourceif(not(internToEquivalents))return x; ;
	rs = get(equivalents, regarding(x));
	if (nul(rs))
		return x; ;
	return rs; ; ;
} {
	 < unknown Xob type >  : rdfs : Resourceif(not(internToEquivalents))return x; ;
	rs = get(equivalents, regarding(x));
	if (nul(rs))
		return x; ;
	return rs; ; ;
}
function stdEquivalents() {
	 < unknown Xob type >  : rdfs : ResourcerdfProperty = evalQname('rdf', 'Property');
	addEquivalent(evalQname('owl', 'Class'), evalQname('rdfs', 'Class'));
	addEquivalent(evalQname('owl', 'DatatypeProperty'), rdfProperty);
	addEquivalent(evalQname('owl', 'ObjectProperty'), rdfProperty);
	addEquivalent(evalQname('owl', 'Thing'), evalQname('rdfs', 'Resource'));
	addEquivalent(resource(), evalQname('xsd', 'string')); ;
}
function uriToResource(rt, bf, alloc, srt) {
	 < unknown Xob type >  : rdfs : Resourceprs = parseUri(bf);
	ln = seqLength(prs);
	cv = rt;
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		cprs = prs[i];
		nv = selectUri(cv, cprs);
		if (nul(nv)) {
			if (not(alloc))
				return; ;
			if (i === difference(ln, 1))
				nv = iNew(srt);
			else
				nv = mkObject();
			bindUri(cv, cprs, nv); ;
		}
		cv = nv; ;
	};
	cv = getEquivalent(cv);
	if (not(hasType(cv, srt))) {
		if (untyped(cv))
			setType(cv, srt);
		else
			installType(cv, srt); ;
	}
	return cv; ; ;
}
function uriToResource(rt, bf, alloc) {
	return uriToResource(rt, bf, alloc, ob); ; ;
}
function uriToResource(bf, alloc) {
	return uriToResource(root, bf, alloc); ; ;
}
function uriToResource(bf) {
	return uriToResource(bf, true); ; ;
}
function resource(bf) {
	return uriToResource(bf, true); ; ;
}
function reversip(sq) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(sq);
	hln = quotient(ln, 2);
	ln1 = difference(ln, 1);
	for (i = 0; lessp(i, hln); plus_plus(i)) {
		hi = difference(ln1, i);
		v = sq[i];
		sq[i] = sq[hi];
		sq[hi] = v; ;
	}; ;
}
function uriPath(x) {
	 < unknown Xob type >  : rdfs : Resourcers = mk_emptysequence();
	cx = x;
	 < unknown Xob type >  : fabl : Xwhile; ;
}
function uriPathToUri(pth) {
	 < unknown Xob type >  : rdfs : Resourcehasfrag = false;
	rs = '' '';
	ln = seqLength(pth);
	if (or(lessp(seqLength(pth), 3), not(pth[1] === ':')))
		return; ;
	times(rs, pth[0]);
	times(rs, '://');
	for (i = 2; lessp(i, ln); plus_plus(i)) {
		cp = pth[i];
		if (cp === '#') {
			seqSetLength(rs, difference(length(rs), 1));
			times(rs, '#');
			if (lessp(i, difference(ln, 1)))
				hasfrag = true; ;
		} else {
			times(rs, cp);
			if (lessp(i, difference(ln, 1)))
				times(rs, '/'); ;
		};
	};
	return rs; ; ;
}
function uri(x) {
	 < unknown Xob type >  : rdfs : Resourcepth = uriPath(x);
	if (nul(pth))
		return; ;
	return uriPathToUri(pth); ; ;
}
