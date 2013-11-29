function arrayRef(s, n) {
	return select(s, n); ; ;
}
function arrayRef(s, n) {
	return select(s, n); ; ;
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
function equal(a, b) {
	return a === b; ; ;
}
function find(s, c) {
	 < unknown Xob type >  : rdfs : Resourceln = length(s);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		if (select(s, i) === c)
			return i; ; ;
	};
	return unary_minus(1); ; ;
}
function find(s, c, sp) {
	 < unknown Xob type >  : rdfs : Resourceln = length(s);
	for (i = sp; lessp(i, ln); plus_plus(i)) {
		if (select(s, i) === c)
			return i; ; ;
	};
	return unary_minus(1); ; ;
}
function findFromEnd(s, c) {
	 < unknown Xob type >  : rdfs : Resourceln = length(s);
	ci = c;
	for (i = difference(ln, 1); geq(i, 0); minus_minus(i)) {
		if (select(s, i) === ci)
			return i; ; ;
	};
	return unary_minus(1); ; ;
}
function findFromEnd(s, c, startat) {
	 < unknown Xob type >  : rdfs : Resourceci = c;
	for (i = startat; geq(i, 0); minus_minus(i)) {
		if (select(s, i) === ci)
			return i; ; ;
	};
	return unary_minus(1); ; ;
}
var temp_stringbuf = ''; ;
function substr(s, ilb, iln) {
	 < unknown Xob type >  : rdfs : Resourceif(lessp(ilb, 0))lb = 0;
	else
		lb = ilb;
	ln = length(s);
	ub = plus(lb, iln);
	if (greaterp(ub, ln))
		ub = ln;
	rs = 'difference(ub,lb)';
	select(rs, s, lb, difference(ub, 1));
	return rs; ; ;
}
function substr(s, ilb) {
	return substr(s, ilb, length(s)); ; ;
}
function slice(s, ilb, iub) {
	 < unknown Xob type >  : rdfs : Resourceif(lessp(ilb, 0))lb = 0;
	else
		lb = ilb;
	ln = length(s);
	if (greaterp(iub, ln))
		ub = ln;
	else
		ub = iub;
	if (leq(ub, lb))
		return; ;
	rln = difference(ub, lb);
	rs = 'rln';
	select(rs, s, lb, difference(ub, 1));
	return rs; ; ;
}
function slice(rs, s, ilb, iub) {
	 < unknown Xob type >  : rdfs : Resourceif(lessp(ilb, 0))lb = 0;
	else
		lb = ilb;
	ln = length(s);
	if (greaterp(iub, ln))
		ub = ln;
	else
		ub = iub;
	if (leq(ub, lb)) {
		times(rs, s);
		return; ; ;
	}
	rln = difference(ub, lb);
	select(rs, s, lb, difference(ub, 1)); ;
}
function substring(s, ilb, iub) {
	 < unknown Xob type >  : rdfs : Resourceif(greaterp(ilb, iub)) {
		lb = iub;
		ub = ilb; ;
	}
	else {
		lb = ilb;
		ub = iub; ;
	}
	return slice(s, lb, ub); ; ;
}
function select(s, lb, ub) {
	 < unknown Xob type >  : rdfs : Resourcers = 'difference(plus(1,ub),lb)';
	select(rs, s, lb, ub);
	return rs; ; ;
}
function substringS(s, ilb, iub) {
	 < unknown Xob type >  : rdfs : Resourceif(greaterp(ilb, iub)) {
		lb = iub;
		ub = ilb; ;
	}
	else {
		lb = ilb;
		ub = iub; ;
	}
	reset(temp_stringbuf);
	select(temp_stringbuf, s, lb, difference(ub, 1));
	return toString(temp_stringbuf); ; ;
}
function afterLast(s, c) {
	 < unknown Xob type >  : rdfs : Resourcefs = findFromEnd(s, c);
	if (lessp(fs, 0))
		return s; ;
	else
		return substring(s, plus(fs, 1), length(s)); ; ;
}
function afterLastS(s, c) {
	 < unknown Xob type >  : rdfs : Resourcefs = findFromEnd(s, c);
	if (lessp(fs, 0))
		return toString(s); ;
	else
		return substringS(s, plus(fs, 1), length(s)); ; ;
}
function afterLastDotS(s) {
	return afterLastS(s, ascii_dot); ; ;
}
function find(cnx, cny, sp) {
	 < unknown Xob type >  : rdfs : Resourcelny = length(cny);
	if (lny === 1)
		return find(cnx, cny[0], sp); ;
	lnx = length(cnx);
	mp = sp;
	mi = unary_minus(1);
	fnd = false;
	dn = false;
	 < unknown Xob type >  : fabl : Xwhile;
	if (fnd)
		return mp; ;
	else
		return unary_minus(1); ; ;
}
function find(cnx, cny) {
	return find(cnx, cny, 0); ; ;
}
function findFromEnd(cnx, cny, sp, nosp) {
	 < unknown Xob type >  : rdfs : Resourcelny = length(cny);
	if (lny === 1)
		return findFromEnd(cnx, cny[0], sp); ;
	lnx = length(cnx);
	lnxmlny = difference(lnx, lny);
	if (nosp)
		mp = lnxmlny;
	else if (lessp(lnxmlny, sp))
		mp = lnxmlny;
	else
		mp = sp;
	mi = unary_minus(1);
	fnd = false;
	dn = false;
	 < unknown Xob type >  : fabl : Xwhile;
	if (fnd)
		return mp; ;
	else
		return unary_minus(1); ; ;
}
function findFromEnd(cnx, cny, sp) {
	return findFromEnd(cnx, cny, sp, false); ; ;
}
function findFromEnd(cnx, cny) {
	return findFromEnd(cnx, cny, 0, true); ; ;
}
function indexOf(cnx, cny) {
	return find(cnx, cny, 0); ; ;
}
function indexOf(cnx, cny) {
	return find(cnx, cny, 0); ; ;
}
function indexOf(cnx, cny, n) {
	return find(cnx, cny, n); ; ;
}
function indexOf(cnx, cny, n) {
	return find(cnx, cny, n); ; ;
}
function lastIndexOf(cnx, cny, sp) {
	return findFromEnd(cnx, cny, sp, false); ; ;
}
function lastIndexOf(cnx, cny) {
	return findFromEnd(cnx, cny, 0, true); ; ;
}
function lastIndexOf(cnx, cny) {
	return findFromEnd(cnx, cny); ; ;
}
function startsWith(cnx, cny) {
	 < unknown Xob type >  : rdfs : Resourcelnx = length(cnx);
	lny = length(cny);
	if (greaterp(lny, lnx))
		return false; ;
	oksf = true;
	for (i = 0; lessp(i, lny); plus_plus(i)) {
		if (not(select(cnx, i) === select(cny, i)))
			return false; ; ;
	};
	return true; ; ;
}
function endsIn(cnx, cny) {
	 < unknown Xob type >  : rdfs : Resourcelnx = length(cnx);
	lny = length(cny);
	if (greaterp(lny, lnx))
		return false; ;
	oksf = true;
	sp = difference(lnx, lny);
	for (i = sp; lessp(i, lnx); plus_plus(i)) {
		if (not(select(cnx, i) === select(cny, difference(i, sp))))
			return false; ; ;
	};
	return true; ; ;
}
function plus(a, b) {
	 < unknown Xob type >  : rdfs : Resourcers = 'a';
	times(rs, b);
	return toString(rs); ; ;
}
function split(s, delim) {
	 < unknown Xob type >  : rdfs : Resourcers = mk_emptysequence();
	ln = length(s);
	cbf = {
		 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
		return toStringResult; ;
	};
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		c = s[i];
		if (c === delim) {
			seqobAdd(rs, cbf);
			cbf = {
				 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
				return toStringResult; ;
			}; ;
		} else
			addChar(cbf, c); ;
	};
	seqobAdd(rs, cbf);
	return rs; ; ;
}
function matchesAt(buf, p, s) {
	 < unknown Xob type >  : rdfs : Resourcei = 0;
	ln = length(s);
	if (greaterp(plus(p, ln), length(buf)))
		return false; ;
	 < unknown Xob type >  : fabl : Xwhile;
	return true; ; ;
}
function split(s, dl) {
	 < unknown Xob type >  : rdfs : Resourcers = mk_emptysequence();
	lnd = length(dl);
	if (lnd === 0) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	dl0 = dl[0];
	if (lnd === 1)
		return split(s, dl0); ;
	ln = length(s);
	cbf = {
		 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
		return toStringResult; ;
	};
	 < unknown Xob type >  : fabl : Xwhile;
	if (greaterp(length(cbf), 0))
		seqobAdd(rs, cbf);
	return rs; ; ;
}
function implode(glue, pieces) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(pieces);
	lnm1 = difference(ln, 1);
	rs = {
		 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
		times(toStringResult, '');
		return toStringResult; ;
	};
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		times(rs, pieces[i]);
		if (lessp(i, lnm1))
			times(rs, glue); ;
	};
	return rs; ; ;
}
function replaceChar(rs, s, fc, tc, lb, ub) {
	 < unknown Xob type >  : rdfs : Resourceln = length(s);
	if (or(or(lessp(lb, 0), greaterp(lb, ub)), greaterp(ub, ln))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	select(rs, s, 0, difference(lb, 1));
	for (i = lb; lessp(i, ub); plus_plus(i)) {
		cc = s[i];
		if (cc === fc)
			addChar(rs, tc);
		else
			addChar(rs, cc); ;
	};
	select(rs, s, ub, difference(ln, 1)); ;
}
function replaceChar(s, fc, tc, lb, ub) {
	 < unknown Xob type >  : rdfs : Resourcers = 'length(s)';
	replaceChar(rs, s, fc, tc, lb, ub);
	return rs; ; ;
}
function replaceChar(rs, s, fc, ts, lb, ub) {
	 < unknown Xob type >  : rdfs : Resourceln = length(s);
	if (or(or(lessp(lb, 0), greaterp(lb, ub)), greaterp(ub, ln))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	select(rs, s, 0, difference(lb, 1));
	for (i = lb; lessp(i, ub); plus_plus(i)) {
		cc = s[i];
		if (cc === fc)
			times(rs, ts);
		else
			addChar(rs, cc); ;
	};
	select(rs, s, ub, difference(ln, 1)); ;
}
function replaceChar(s, fc, ts, lb, ub) {
	 < unknown Xob type >  : rdfs : Resourceif(lessp(length(ts), 2))rs = 'length(s)';
	else
		rs = ;
	replaceChar(rs, s, fc, ts, lb, ub);
	return rs; ; ;
}
function fileExtension(fln) {
	 < unknown Xob type >  : rdfs : Resourceld = lastIndexOf(fln, ascii_dot);
	if (lessp(ld, 0))
		return; ;
	return slice(fln, plus(ld, 1), length(fln)); ; ;
}
function copy(s) {
	 < unknown Xob type >  : rdfs : Resourcers = mkString(length(s));
	times(rs, s);
	return rs; ; ;
}
function isInt(x, sp, ep) {
	 < unknown Xob type >  : rdfs : Resourcep = sp;
	if (x[sp] === ascii_minus)
		plus_plus(p);
	for (i = p; lessp(i, ep); plus_plus(i)) {
		cc = x[i];
		if (or(lessp(cc, 48), greaterp(cc, 57)))
			return false; ; ;
	};
	return true; ; ;
}
function trim(rs, x) {
	 < unknown Xob type >  : rdfs : Resourcelb = 0;
	ln = length(x);
	nfnd = true;
	 < unknown Xob type >  : fabl : Xwhile;
	if (lb === ln)
		return; ;
	ub = difference(ln, 1);
	nfnd = true;
	 < unknown Xob type >  : fabl : Xwhile;
	slice(rs, x, lb, plus(ub, 1)); ;
}
function trim(x) {
	 < unknown Xob type >  : rdfs : Resourcers = ;
	trim(rs, x);
	return rs; ; ;
}
var trimBuf = ''; ;
function isInt(x) {
	if (length(x) === 0)
		return false; ;
	reset(trimBuf);
	trim(trimBuf, x);
	return isInt(trimBuf, 0, length(trimBuf)); ; ;
}
function isDouble1(x) {
	 < unknown Xob type >  : rdfs : Resourceln = length(x);
	if (ln === 0)
		return false; ;
	dcm = indexOf(x, ascii_dot);
	if (lessp(dcm, 0))
		return isInt(x, 0, ln); ;
	if (not(isInt(x, 0, dcm)))
		return false; ;
	ep = indexOf(x, ascii_e);
	if (lessp(ep, 0))
		ep = indexOf(x, ascii_E);
	if (lessp(ep, 0)) {
		if (ln === plus(dcm, 1))
			return true; ;
		return isInt(x, plus(dcm, 1), ln); ; ;
	}
	if (plus(ep, 1) === ln)
		return false; ;
	return isInt(x, plus(ep, 1), ln); ; ;
}
function isDouble(x) {
	if (length(x) === 0)
		return false; ;
	reset(trimBuf);
	trim(trimBuf, x);
	return isDouble1(trimBuf); ; ;
}
function isInt(x) {
	 < unknown Xob type >  : rdfs : Resourcexo = x;
	k = obkind(xo);
	if (k === int_kind)
		return true; ;
	if (isString(xo))
		return isInt(xo); ;
	return false; ; ;
}
function isDouble(x) {
	 < unknown Xob type >  : rdfs : Resourcexo = x;
	k = obkind(xo);
	if (or(k === int_kind, k === double_kind))
		return true; ;
	if (isString(xo))
		return isDouble(xo); ;
	return false; ; ;
}
function isBoolean(x) {
	 < unknown Xob type >  : rdfs : Resourcexo = x;
	k = obkind(xo);
	if (k === int_kind) {
		xi = toInt(x);
		return or(xi === 0, xi === 1); ; ;
	}
	if (isString(xo))
		return isInt(xo); ;
	return false; ; ;
}
function toUpperCase(ci) {
	if (and(leq(ci, 122), geq(ci, 97)))
		return difference(ci, 32); ;
	return ci; ; ;
}
function toUpperCaseD(bf) {
	 < unknown Xob type >  : rdfs : Resourceln = length(bf);
	for (i = 0; lessp(i, ln); plus_plus(i))
		bf[i] = toUpperCase(bf[i]); ;
	return bf; ; ;
}
function toUpperCase(bf) {
	return toUpperCaseD(copy(bf)); ; ;
}
function toLowerCase(ci) {
	if (and(leq(ci, 90), geq(ci, 65)))
		return plus(ci, 32); ;
	return ci; ; ;
}
function toLowerCaseD(bf) {
	 < unknown Xob type >  : rdfs : Resourceln = length(bf);
	for (i = 0; lessp(i, ln); plus_plus(i))
		bf[i] = toLowerCase(bf[i]); ;
	return bf; ; ;
}
function toLowerCase(bf) {
	return toLowerCaseD(copy(bf)); ; ;
}
