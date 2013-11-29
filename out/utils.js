var lhwm = 65535;
var hhwm = unary_minus(65536);
var byte0_mask = 255;
var byte1_mask = 65280;
var byte2_mask = 16711680;
var byte3_mask = unary_minus(16777216);
function highHalf(x) {
	return lshift(x, unary_minus(16)); ; ;
}
function low_half(x) {
	return land(x, lhwm); ; ;
}
function setLowHalf(x, y) {
	return lor(land(x, hhwm), land(y, lhwm)); ; ;
}
function setHighHalf(x, y) {
	return lor(lshift(y, 16), land(x, lhwm)); ; ;
}
function byte0(x) {
	return land(x, byte0_mask); ; ;
}
function byte1(x) {
	return land(lshift(x, unary_minus(8)), byte0_mask); ; ;
}
function byte2(x) {
	return land(lshift(x, unary_minus(16)), byte0_mask); ; ;
}
function byte3(x) {
	return land(lshift(x, unary_minus(24)), byte0_mask); ; ;
}
function setByte0(x, y) {
	return lor(land(x, lnot(byte0_mask)), land(y, byte0_mask)); ; ;
}
function setByte0(x, y) {
	return lor(land(x, lnot(byte0_mask)), y); ; ;
}
function setByte1(x, y) {
	return lor(land(x, lnot(byte1_mask)), lshift(land(y, byte0_mask), 8)); ; ;
}
function setByte1(x, y) {
	return lor(land(x, lnot(byte1_mask)), lshift(y, 8)); ; ;
}
function setByte2(x, y) {
	return lor(land(x, lnot(byte2_mask)), lshift(land(y, byte0_mask), 16)); ; ;
}
function setByte2(x, y) {
	return lor(land(x, lnot(byte2_mask)), lshift(y, 16)); ; ;
}
function setByte3(x, y) {
	return lor(land(x, lnot(byte3_mask)), lshift(land(y, byte0_mask), 24)); ; ;
}
function setByte3(x, y) {
	return lor(land(x, lnot(byte3_mask)), lshift(y, 24)); ; ;
}
function toHex(x) {
	 < unknown Xob type >  : rdfs : Resources = '' '';
	cx = x;
	for (i = 0; lessp(i, 8); plus_plus(i)) {
		ln = land(cx, 15);
		if (lessp(ln, 10))
			set(s, difference(7, i), plus(48, ln));
		else
			set(s, difference(7, i), plus(87, ln));
		cx = lshift(cx, unary_minus(4)); ;
	};
	return s; ; ;
}
function to_hex(rs, x, numdigits) {
	 < unknown Xob type >  : rdfs : Resourcefor(i = 0; lessp(i, numdigits); plus_plus(i))times(rs, '0'); ;
	lnr = difference(length(rs), 1);
	cx = x;
	for (i = 0; lessp(i, numdigits); plus_plus(i)) {
		ln = land(cx, 15);
		if (lessp(ln, 10))
			set(rs, difference(lnr, i), plus(48, ln));
		else
			set(rs, difference(lnr, i), plus(87, ln));
		cx = lshift(cx, unary_minus(4)); ;
	}; ;
}
function toInt(x) {
	if (x)
		return 1; ;
	return 0; ; ;
}
function equal(a, b) {
	return um_eq(a, b); ; ;
}
var regardingNamespaces = regarding('namespaces');
function homeNamespaces() {
	 < unknown Xob type >  : rdfs : Resourcenms = get(home, regardingNamespaces);
	if (nul(nms)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Home is missing namespaces property');
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	return nms; ; ;
}
function car(x) {
	return listSelect(x, 0); ; ;
}
function cdr(x) {
	if (not(isList(x))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'cdr of non-list');
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	return obsel(x, List_rest); ; ;
}
function cadr(x) {
	return listSelect(x, 1); ; ;
}
function caddr(x) {
	return listSelect(x, 2); ; ;
}
function cadddr(x) {
	return listSelect(x, 3); ; ;
}
function garbageCollection(v) {
	allocStatically(not(v)); ;
}
function list1(x) {
	return cons(x, ); ; ;
}
function list2(x, y) {
	return cons(x, cons(y, )); ; ;
}
function list3(x, y, z) {
	return cons(x, cons(y, cons(z, ))); ; ;
}
function list4(x, y, z, z2) {
	return cons(x, cons(y, cons(z, cons(z2, )))); ; ;
}
function list5(x, y, z, z2, z3) {
	return cons(x, cons(y, cons(z, cons(z2, cons(z3, ))))); ; ;
}
function toList(a) {
	 < unknown Xob type >  : rdfs : Resourceif(nul(a))return; ;
	ln = seqLength(a);
	rs = ;
	for (i = difference(ln, 1); geq(i, 0); minus_minus(i))
		rs = cons(a[i], rs); ;
	return rs; ; ;
}
function listNul(x) {
	return or(nul(x), um_eq(x, )); ; ;
}
