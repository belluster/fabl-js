var stringbufReset_fun = getVariant(home, 'reset', [fabl_string]);
var stringBuf_tprint_fun = getVariant(home, 'tprint', [fabl_string]);
var stringStringPlus_fun = getVariant(home, 'plus', [fabl_string, fabl_string]);
var stringStringTimes_fun = getVariant(home, 'times', [fabl_string, fabl_string]);
var terpri_fun = getVariant(home, 'terpri', mk_emptysequence());
function afterError() { ;
}
function beforeError() { ;
}
var afterError_fun = getVariant(home, 'afterError', mk_emptysequence());
var beforeError_fun = getVariant(home, 'beforeError', mk_emptysequence());
var new_fun = getVariant(home, 'iNew', [Sort]);
var mk_emptyseq_fun = getVariant(home, 'mk_emptysequence', [Sort]);
var seqLength_fun = getVariant(home, 'seqLength', [ob]);
var seqobAdd_fun = getVariant(home, 'seqobAdd', [ob, ob]);
var seqReset_fun = getVariant(home, 'seqReset', [ob]);
var seqCopy_fun = getVariant(home, 'seqCopy', [ob]);
var seqobCopy_fun = getVariant(home, 'seqCopy', [ob]);
var seqSetLength_fun = getVariant(home, 'seqSetLength', [ob, fabl_int]);
var seqintAdd_fun = getVariant(home, 'seqintAdd', [ob, fabl_int]);
var seqbyteAdd_fun = getVariant(home, 'seqbyteAdd', [ob, fabl_byte]);
var seqdoubleAdd_fun = getVariant(home, 'seqdoubleAdd', [ob, fabl_double]);
var seqobAppend_fun = getVariant(home, 'seqobAppend', [ob, ob]);
var seqintAppend_fun = getVariant(home, 'seqintAppend', [ob, ob]);
var seqbyteAppend_fun = getVariant(home, 'seqbyteAppend', [ob, ob]);
var seqdoubleAppend_fun = getVariant(home, 'seqdoubleAppend', [ob, ob]);
var seqLength_fun = getVariant(home, 'seqLength', [ob]);
var seqobContains_fun = getVariant(home, 'seqobContains', [ob, ob]);
var seqintContains_fun = getVariant(home, 'seqintContains', [ob, fabl_int]);
var seqbyteContains_fun = getVariant(home, 'seqbyteContains', [ob, fabl_byte]);
var seqdoubleContains_fun = getVariant(home, 'seqdoubleContains', [ob, fabl_double]);
var obassert_fun = getVariant(home, 'assert', [ob, Property, ob]);
var intassert_fun = getVariant(home, 'assert', [ob, Property, fabl_int]);
var doubleassert_fun = getVariant(home, 'assert', [ob, Property, fabl_double]);
function times(s, tp) { ;
}
