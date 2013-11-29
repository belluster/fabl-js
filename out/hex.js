function byte_to_hex(cn) {
	 < unknown Xob type >  : rdfs : Resourcen = cn;
	if (lessp(n, 48))
		return unary_minus(1); ;
	if (leq(n, 57))
		return difference(n, 48); ;
	if (lessp(n, 65))
		return unary_minus(1); ;
	if (leq(n, 70))
		return difference(plus(10, n), 65); ;
	if (lessp(n, 97))
		return unary_minus(1); ;
	if (leq(n, 102))
		return difference(plus(10, n), 97); ;
	return unary_minus(1); ; ;
}
function hex(x) {
	 < unknown Xob type >  : rdfs : Resourceln = length(x);
	n = 0;
	rs = 0;
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		cv = byte_to_hex(select(x, i));
		if (lessp(cv, 0)) {
			beforeError();
			reset(uwriteBuffer);
			times(uwriteBuffer, 'not a lower-case hex number: ');
			times(uwriteBuffer, x);
			tprint(uwriteBuffer);
			terpri();
			afterError();
		}
		rs = plus(times(rs, 16), cv); ;
	};
	return rs; ; ;
}
function hex(x) {
	 < unknown Xob type >  : rdfs : Resourceln = length(x);
	n = 0;
	rs = 0;
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		cv = byte_to_hex(select(x, i));
		if (lessp(cv, 0)) {
			beforeError();
			reset(uwriteBuffer);
			times(uwriteBuffer, 'not a lower-case hex number: ');
			times(uwriteBuffer, x);
			tprint(uwriteBuffer);
			terpri();
			afterError();
		}
		rs = plus(times(rs, 16), cv); ;
	};
	return rs; ; ;
}
function int2str(x) {
	 < unknown Xob type >  : rdfs : Resourcesb = '1';
	times(sb, x);
	return toString(sb); ; ;
}
