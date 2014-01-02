function __aLabelOf(x) {
    var x;
    var lbs;
    var olbs;
    var lk;
    if (!__Xobish(x)) return null;
    olbs = ____obsel(x, Xob1_labels);
    if (!olbs) return null;
    lk = __obkind(olbs);
    if (lk === nstring_kind || lk === wstring_kind) return olbs;
    lbs = olbs;
    if (__seqLength(lbs) > 0) return lbs[0];
    return null;
}

function __labelsOf(x) {
    var x;
    if (!__Xobish(x)) return null;
    return ____obsel(x, Xob1_labels);
}

function ____isLabeled(x, nm) {
    var x;
    var nm;
    var lbs;
    if (!__Xobish(x)) return fabl_false;
    lbs = ____obsel(x, Xob1_labels);
    if (!lbs) return fabl_false;
    if (__obkind(lbs) === seq_kind) return ____seqobContains(lbs, nm);
    return ____um_eq(nm, lbs);
}

function ____addLabel(x, nm) {
    var x;
    var nm;
    var lbs;
    var olbs;
    var lk;
    if (!__Xobish(x)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot add label an atomic Xob ");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    olbs = ____obsel(x, Xob1_labels);
    if (!olbs) ______obset(x, Xob1_labels, nm); else {
        lk = __obkind(olbs);
        if (lk === nstring_kind || lk === wstring_kind) {
            lbs = [ olbs, nm ];
            ______obset(x, Xob1_labels, lbs);
        } else {
            lbs = olbs;
            if (!____seqobContains(lbs, nm)) ____seqobAdd(lbs, nm);
        }
    }
}

function ____addLabels(x, s) {
    var x;
    var s;
    var lbs;
    var olbs;
    var ln;
    if (!__Xobish(x)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot add label to an atomic Xob");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ln = __seqLength(s);
    if (ln === 0) return;
    if (ln === 1) {
        ____addLabel(x, s[0]);
        return;
    }
    olbs = ____obsel(x, Xob1_labels);
    if (!olbs) {
        ______obset(x, Xob1_labels, __seqCopy(s));
        return;
    } else {
        if (__obkind(olbs) === seq_kind) {
            lbs = olbs;
            ____seqobAppend(lbs, s);
        } else {
            lbs = [ olbs ];
            ____seqobAppend(lbs, s);
            ______obset(x, Xob1_labels, lbs);
        }
    }
}

function ____copyLabels(dst, src) {
    var dst;
    var src;
    var slbs;
    var olbs;
    var lk;
    if (!__Xobish(src)) return;
    olbs = ____obsel(src, Xob1_labels);
    if (!olbs) return;
    lk = __obkind(olbs);
    if (lk === seq_kind) {
        slbs = olbs;
        ____addLabels(dst, slbs);
    } else ____addLabel(dst, olbs);
}

function __hasLabel(x) {
    var x;
    return __Xobish(x) && ____obsel(x, Xob1_labels);
}