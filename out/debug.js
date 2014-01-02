var dbObs = __mk_emptysequence("<unprintable>");

var dbInts = __mk_emptysequence("<unprintable>");

var dbDoubles = __mk_emptysequence("<unprintable>");

function __extractDb(n) {
    var n;
    __seqReset(dbObs);
    __reset(dbInts);
    ________consoleStackExtract(n, dbObs, dbInts, dbDoubles);
}

function __db(n) {
    var n;
    __extractDb(n);
}