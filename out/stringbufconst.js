function unescapedLcurly(bf, sf) {
	 < unknown Xob type >  : rdfs : Resourcecnd = find(bf, ascii_lcurly, sf);
	if (cnd === sf)
		return sf; ;
	 < unknown Xob type >  : fabl : Xwhile;
	return cnd; ; ;
}
var removeEscapesBuf = ''; ;
function removeEscapes(bf, esc) {
	 < unknown Xob type >  : rdfs : Resourcers = removeEscapesBuf;
	reset(rs);
	cnd = find(bf, esc, 0);
	if (lessp(cnd, 0))
		return; ;
	cc = 0;
	 < unknown Xob type >  : fabl : Xwhile;
	select(rs, bf, cc, difference(length(bf), 1));
	reset(bf);
	times(bf, rs); ;
}
function removeEscapes(bfs, esc) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(bfs);
	for (i = 0; lessp(i, ln); plus_plus(i))
		removeEscapes(bfs[i], esc); ; ;
}
function bracketExtract(bf) {
	 < unknown Xob type >  : rdfs : Resourcers = mk_emptysequence();
	ln = length(bf);
	cc = 0;
	 < unknown Xob type >  : fabl : Xwhile;
	removeEscapes(rs, 1);
	return rs; ; ;
}
function semify(bf) {
	 < unknown Xob type >  : rdfs : Resourceln = length(bf);
	if (bf[difference(ln, 1)] === ascii_semicolon)
		return; ;
	times(bf, ';'); ;
}
var stringBuf_append_fun = getVariant(home, 'times', [fabl_string, fabl_string]);
function emptyString() {
	return; ; ;
}
function stringBufConstXob(bfs) {
	 < unknown Xob type >  : rdfs : Resourcee = mkObject();
	rsx = bindLocal(e, 'stringConstantResult', fabl_string);
	ln = seqLength(bfs);
	sq = mk_emptysequence();
	seqobAdd(sq, metaAssignn(rsx, metaApplyn(homeFimpFun('mkStringBuf_function'), meta(''))));
	seqobAdd(sq, metaApplyn(homeFimpFun('stringStringTimes_fun'), rsx, meta(bfs[0], fabl_string)));
	i = 1;
	 < unknown Xob type >  : fabl : Xwhile;
	brt = blockReturnType;
	blockReturnType = fabl_string;
	seqobAdd(sq, metaBlockReturn(rsx, ));
	blockReturnType = brt;
	return mkValueReturningXblock(fabl_string, e, sq); ; ;
}
function analyzeStringBufConst(bf) {
	if (and(lessp(find(bf, ascii_lcurly), 0), lessp(find(bf, 1), 0)))
		return metaApplyn(homeFimpFun('copyStringConst_fun'), meta(bf, fabl_string)); ;
	return stringBufConstXob(bracketExtract(bf)); ; ;
}
