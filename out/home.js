var stdPath = seqDataOb_kind;
mk_emptysequence();
function resetPath() {
	if (nul(path))
		path = mk_emptysequence();
	else
		seqReset(path);
	if (nul(cPath))
		cPath = mk_emptysequence();
	else
		seqReset(cPath);
	seqobAdd(path, fabl);
	seqobAdd(path, fimp);
	seqobAppend(path, stdPath);
	copyInto(cPath, path); ;
}
function initPath() {
	if (nul(path))
		path = mk_emptysequence();
	else
		seqReset(path);
	if (nul(cPath))
		cPath = mk_emptysequence();
	else
		seqReset(cPath);
	seqobAdd(path, fabl);
	seqobAdd(path, fimp);
	copyInto(cPath, path); ;
}
function initHome(x) {
	if (nul(get(x, regardingPath)))
		set(x, regardingPath, [fabl, fimp, x], SeqOfOb); ;
}
var theLastHome = {
	if (nul(get(x, regardingPath)))
		set(x, regardingPath, [fabl, fimp, x], SeqOfOb); ;
}
function setHome(x) {
	theLastHome = home;
	initHome(x);
	home = x;
	collectSubject(x); ;
}
function lastHome() {
	if (nnul(theLastHome)) {
		home = theLastHome;
		theLastHome = ; ;
	};
}
function global(x) {
	return regarding(x); ; ;
}
function selectUri(x, pth) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(pth);
	cx = x;
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		cx = selectUri(cx, pth[i]);
		if (nul(cx))
			return cx; ; ;
	};
	return cx; ; ;
}
var fablInitialized = false;
function initFabl() {
	if (not(fablInitialized)) {
		initPrimops();
		initParse();
		init_flat();
		asmInit();
		fablInitialized = true; ;
	};
}
