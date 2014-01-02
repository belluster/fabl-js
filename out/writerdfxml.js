var blankNodeTable;

var beenWrittenTable;

var xmlNamespaces;

var xmlSizeLimit = 1e4;

function __qualifiedNameCollectNamespace(x) {
    var x;
    var qn;
    var clp;
    var ns;
    qn = __qualifiedName(x);
    if (!qn) return qn;
    clp = ____indexOf(qn, ascii_colon);
    ns = __toId(______substring(qn, 0, clp));
    if (!____seqobContains(xmlNamespaces, ns)) ____seqobAdd(xmlNamespaces, ns);
    return qn;
}

var blankIdSeed = "n_";

var blankIdCount;

0;

function __blankNodeName(r) {
    var r;
    var rr;
    var nm;
    rr = __regarding(r);
    nm = ____get(blankNodeTable, rr);
    if (!nm) {
        nm = ____genName(blankIdSeed, blankIdCount++);
        ______set(blankNodeTable, rr, nm);
    }
    return nm;
}

function ____xmlWriteResourceTag(bf, r) {
    var bf;
    var r;
    var u;
    var tp;
    var tpk;
    var ln;
    var tps;
    var mtp;
    var tpnm;
    var rr;
    rr = __regarding(r);
    u = __uri(r);
    tp = ____get(r, "rdf:type");
    tpk = __obkind(tp);
    if (tpk === seq_kind) {
        tps = tp;
        ln = __seqLength(tps);
        if (ln > 0) mtp = tps[ln - 1];
    } else mtp = tp;
    if (mtp) tpnm = __qualifiedNameCollectNamespace(mtp);
    if (!tpnm) {
        ____times(bf, "<rdf:Description ");
    } else {
        ____times(bf, "<");
        ____times(bf, tpnm);
    }
    if (!u) {
        ____times(bf, ' rdf:nodeID="');
        ____times(bf, __blankNodeName(r));
        ____times(bf, '"');
    } else {
        ____times(bf, ' rdf:about="');
        ____times(bf, u);
        ____times(bf, '"');
    }
    {
        ____times(bf, ">\n");
    }
    ______set(beenWrittenTable, rr, "yes");
}

function ____xmlWriteResourceEndTag(bf, r) {
    var bf;
    var r;
    var mtp;
    var tpnm;
    mtp = ____fget(r, "rdf:type");
    if (mtp) tpnm = __qualifiedNameCollectNamespace(mtp);
    if (!tpnm) {
        ____times(bf, "</rdf:Description>");
    } else {
        ____times(bf, "</");
        ____times(bf, tpnm);
        ____times(bf, ">\n");
    }
}

var intUri = "http://www.w3.org/2001/XMLSchema#int";

var doubleUri = "http://www.w3.org/2001/XMLSchema#double";

var stringUri = "http://www.w3.org/2001/XMLSchema#string";

var booleanUri = "http://www.w3.org/2001/XMLSchema#boolean";

var idUri = "http://nurl.org/0/fabl/id";

function ________xmlWriteDatatypeProperty(bf, pnm, v, tp) {
    var bf;
    var pnm;
    var v;
    var tp;
    var tpuri;
    {
        ____times(bf, "<");
        ____times(bf, pnm);
    }
    if (!(tp === ob)) {
        if (tp === fabl_int) tpuri = intUri; else if (tp === fabl_double) tpuri = doubleUri; else if (tp === fabl_string) tpuri = stringUri; else if (tp === fabl_id) tpuri = idUri; else if (tp === fabl_boolean) tpuri = booleanUri; else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Internal: unexpected type: ");
            ____times(uwriteBuffer, tp);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        {
            ____times(bf, ' rdf:datatype="');
            ____times(bf, tpuri);
            ____times(bf, '"');
        }
    }
    {
        ____times(bf, ">");
        ____times(bf, v);
        ____times(bf, "</");
        ____times(bf, pnm);
        ____times(bf, ">");
    }
    if (__length(bf) > xmlSizeLimit) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "exceeded RDF/XML size limit");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______xmlWriteProperty(bf, pnm, r) {
    var bf;
    var pnm;
    var r;
    var u;
    {
        ____times(bf, "<");
        ____times(bf, pnm);
    }
    if (!____fget(beenWrittenTable, __regarding(r))) {
        {
            ____times(bf, ">\n");
        }
        ____xmlSerialize(bf, r);
        {
            ____times(bf, "</");
            ____times(bf, pnm);
            ____times(bf, ">\n");
        }
    } else {
        u = __uri(r);
        if (!u) {
            ____times(bf, ' rdf:nodeID="');
            ____times(bf, __blankNodeName(r));
            ____times(bf, '"/>\n');
        } else {
            ____times(bf, ' rdf:resource="');
            ____times(bf, u);
            ____times(bf, '">/>\n');
        }
    }
    if (__length(bf) > xmlSizeLimit) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "exceeded RDF/XML size limit");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____xmlSerialize(bf, b) {
    var bf;
    var b;
    var k;
    var kq;
    var p;
    var v;
    var btp;
    var vtp0;
    var ptp;
    var vtp;
    var vk;
    var isdtp;
    var pnm;
    k = __bindingKey(b);
    kq = __qualifiedNameCollectNamespace(k);
    if (!kq) return fabl_false;
    p = k;
    v = __bindingValue(b);
    btp = ____obsel(b, Binding_type);
    if (!btp || btp === ob) {
        ptp = __range(p);
        if (ptp) vtp = ptp;
    } else vtp = btp;
    if (!vtp) vtp = ob;
    vtp0 = __type0(v);
    if (!(vtp0 === ob)) {
        if (vtp === ob) vtp = vtp0; else vtp = __mostSpecific([ vtp0, vtp ]);
    }
    vk = __obkind(v);
    if (vk === double_kind) vtp = fabl_double;
    isdtp = __isString(v) || __isId(v) || vk === int_kind || vk === double_kind;
    pnm = __qualifiedNameCollectNamespace(p);
    if (!pnm) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot write out a property without a qualified name: ");
        ____times(uwriteBuffer, __uri(p));
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (isdtp) ________xmlWriteDatatypeProperty(bf, pnm, v, vtp); else ______xmlWriteProperty(bf, pnm, v);
    return fabl_true;
}

var xmlSerializePage;

0;

function ____xmlSerialize(bf, r) {
    var bf;
    var r;
    var k;
    var bn;
    var vk;
    var dk;
    var bfln;
    var bcnt;
    var ln;
    var i;
    var b;
    var v;
    var vtp;
    var sqo;
    var isdtp;
    if (__length(bf) > xmlSizeLimit) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "exceeded RDF/XML size limit");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    k = __obkind(r);
    if (k === hashtable_kind) {
        bn = __bindings(r);
        bfln = __length(bf);
        ____xmlWriteResourceTag(bf, r);
        ln = __seqLength(bn);
        bcnt = 0;
        for (i = 0; i < ln; i++) {
            b = bn[i];
            if (xmlSerializePage < 0 || __page(b) === xmlSerializePage) {
                if (____xmlSerialize(bf, b)) bcnt++;
            }
        }
        ____xmlWriteResourceEndTag(bf, r);
    }
    if (k === seq_kind) {
        ____times(bf, "<rdf:Seq>");
        dk = __seqDataKind(r);
        if (dk === seqDataOb_kind) {
            sqo = r;
            ln = __seqLength(sqo);
            for (i = 0; i < ln; i++) {
                v = sqo[i];
                vtp = __type0(v);
                vk = __obkind(v);
                if (vk === double_kind) vtp = fabl_double;
                isdtp = __isString(v) || __isId(v) || vk === int_kind || vk === double_kind;
                if (isdtp) ________xmlWriteDatatypeProperty(bf, "rdf:li", v, vtp); else ______xmlWriteProperty(bf, "rdf:li", v);
            }
        } else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "this kind of sequence not supported yet");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        ____times(bf, "</rdf:Seq>");
    }
}

var xmlBoilerPlate = '<?xml version="1.0" encoding="iso-8859-1" ?><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"';

function ____addXmlNamespace(bf, ns) {
    var bf;
    var ns;
    var nsuri;
    nsuri = __uri(__namespace(ns));
    ____times(bf, "xmlns:");
    ____times(bf, ns);
    ____times(bf, '="');
    ____times(bf, nsuri);
    ____times(bf, '"');
}

function ____addXmlNamespaces(bf, ns) {
    var bf;
    var ns;
    var ln;
    var i;
    ln = __seqLength(ns);
    for (i = 0; i < ln; i++) ____addXmlNamespace(bf, ns[i]);
    ____times(bf, ">");
}

function ______xmlSerialize(bf, v, pg) {
    var bf;
    var v;
    var pg;
    var i;
    var ln;
    var cv;
    var rbf;
    xmlSerializePage = pg;
    blankNodeTable = __iNew("rdfs:Resource");
    beenWrittenTable = __iNew("rdfs:Resource");
    xmlNamespaces = __iNew("<unprintable>");
    blankIdCount = 0;
    ln = __seqLength(v);
    rbf = "";
    for (i = 0; i < ln; i++) {
        cv = v[i];
        if (xmlSerializePage < 0 || __page(cv) === xmlSerializePage) ____xmlSerialize(rbf, cv);
    }
    ____times(bf, xmlBoilerPlate);
    ____addXmlNamespaces(bf, xmlNamespaces);
    ____times(bf, rbf);
    ____times(bf, "</rdf:RDF>");
}

function ______xmlSerializeToFile(fl, v, pg) {
    var fl;
    var v;
    var pg;
    var bf;
    bf = "";
    ______xmlSerialize(bf, v, pg);
    ____fwrite(fl, bf);
}

function ____xmlSerializeToFile(fl, v) {
    var fl;
    var v;
    ______xmlSerializeToFile(fl, v, -1);
}