var dbObs = seqDataOb_kind;
mk_emptysequence();
var dbInts = seqDataInt_kind;
mk_emptysequence();
var dbDoubles = seqDataDouble_kind;
mk_emptysequence();
function extractDb(n) {
	seqReset(dbObs);
	reset(dbInts);
	consoleStackExtract(n, dbObs, dbInts, dbDoubles); ;
}
function db(n) {
	extractDb(n); ;
}
