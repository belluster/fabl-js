function xsd_string__fabl_Xassign__times(s, x) {
    var s;
    var x;
    var src;
    var dst;
    src = rdfs_Resource__rdf_Property__obsel(x, Xassign_source);
    dst = rdfs_Resource__rdf_Property__obsel(x, Xassign_dest);
    xsd_string__fabl_Xob__times(s, dst);
    xsd_string__fabl_id__times(s, "=");
    xsd_string__fabl_Xob__times(s, src);
}

function xsd_string__fabl_XselectProperty__times(s, x) {
    var s;
    var x;
    var src;
    var prp;
    src = rdfs_Resource__rdf_Property__obsel(x, XselectProperty_source);
    prp = rdfs_Resource__rdf_Property__obsel(x, XselectProperty_selector);
    xsd_string__fabl_Xob__times(s, src);
    xsd_string__fabl_id__times(s, ".");
    xsd_string__rdf_Property__times(s, prp);
}

function xsd_string__fabl_Xcast__times(s, x) {
    var s;
    var x;
    xsd_string__fabl_Xob__times(s, rdfs_Resource__rdf_Property__obsel(x, Xcast_castee));
    xsd_string__fabl_id__times(s, "~");
    xsd_string__rdfs_Class__times(s, fabl_Xob__type(x));
}

function xsd_string__fabl_Xif__times(s, x) {
    var s;
    var x;
    var iff;
    iff = rdfs_Resource__rdf_Property__obsel(x, Xif_ifFalse);
    xsd_string__fabl_id__times(s, "if (");
    xsd_string__fabl_Xob__times(s, rdfs_Resource__rdf_Property__obsel(x, Xif_condition));
    xsd_string__fabl_Xob__times(s, rdfs_Resource__rdf_Property__obsel(x, Xif_ifTrue));
    if (iff) {
        xsd_string__fabl_id__times(s, "; else ");
        xsd_string__fabl_Xob__times(s, iff);
    }
}

function xsd_string__fabl_Xapply__times(s, x) {
    var s;
    var x;
    var fn;
    var dst;
    var dt;
    var ln;
    var i;
    fn = rdfs_Resource__rdf_Property__obsel(x, Xapply_functionOf);
    dst = rdfs_Resource__rdf_Property__obsel(x, Xapply_dest);
    if (dst) {
        xsd_string__fabl_Xob__times(s, dst);
        xsd_string__fabl_id__times(s, " = ");
    }
    xsd_string__fabl_Xob__times(s, fn);
    xsd_string__fabl_id__times(s, "(");
    dt = rdfs_Resource__rdf_Property__obsel(x, Xapply_arguments);
    ln = rdfs_Resource__seqLength(dt);
    if (dt && ln > 0) {
        for (i = 0; i < ln - 1; i++) {
            xsd_string__fabl_Xob__times(s, dt[i]);
            xsd_string__fabl_id__times(s, ",");
        }
        xsd_string__fabl_Xob__times(s, dt[ln - 1]);
    }
    xsd_string__fabl_id__times(s, ")");
}

function xsd_string__fabl_Xblock__times(s, x) {
    var s;
    var x;
    var dt;
    var ln;
    var i;
    xsd_string__fabl_id__times(s, "  {");
    xsd_string__xsd_byte__times(s, 10);
    dt = rdfs_Resource__rdf_Property__obsel(x, Xblock_statements);
    if (dt) {
        ln = rdfs_Resource__seqLength(dt);
        for (i = 0; i < ln; i++) {
            xsd_string__fabl_id__times(s, "   ");
            xsd_string__fabl_Xob__times(s, dt[i]);
            xsd_string__fabl_id__times(s, ";");
            xsd_string__xsd_byte__times(s, 10);
        }
    }
    xsd_string__fabl_id__times(s, "   }");
    xsd_string__xsd_byte__times(s, 10);
}

function xsd_string__fabl_Xreturn__times(s, x) {
    var s;
    var x;
    var vl;
    vl = rdfs_Resource__rdf_Property__obsel(x, Xreturn_value);
    if (!vl) xsd_string__fabl_id__times(s, "return"); else {
        xsd_string__fabl_id__times(s, "return ");
        xsd_string__fabl_Xob__times(s, vl);
    }
}

function xsd_string__fabl_Xgo__times(s, x) {
    var s;
    var x;
    var vl;
    vl = rdfs_Resource__rdf_Property__obsel(x, Xgo_condition);
    xsd_string__fabl_id__times(s, "Go ");
    if (vl) {
        if (rdfs_Resource__rdf_Property__xsd_int__bitsel(x, Xgo_booles, Xgo_goIfFalse)) xsd_string__fabl_id__times(s, "(iffalse:");
        xsd_string__fabl_Xob__times(s, vl);
        xsd_string__fabl_id__times(s, ") ");
    }
    xsd_string__fabl_id__times(s, " ");
    xsd_string__fabl_id__times(s, rdfs_Resource__rdf_Property__obsel(x, Xgo_toLabel));
}

function xsd_string__fabl_Xob__times(s, x) {
    var s;
    var x;
    var xs;
    var xap;
    var xbl;
    var xas;
    var xif;
    var xo;
    var k;
    var xrt;
    var lb;
    var lbs;
    var xg;
    var xfr;
    var xsq;
    var xcst;
    var ky;
    xo = x;
    k = rdfs_Resource__obkind(xo);
    if (k === string_kind) {
        xsd_string__fabl_id__times(s, x);
        return;
    }
    if (k === string_kind) {
        xsd_string__fabl_id__times(s, x);
        return;
    }
    if (k === int_kind) {
        xsd_string__xsd_int__times(s, rdfs_Resource__ob_to_integer(xo));
        return;
    }
    if (k === double_kind) {
        xsd_string__xsd_double__times(s, rdfs_Resource__toDouble(xo));
        return;
    }
    if (rdfs_Resource__isFunction(xo)) {
        xsd_string__fabl_Function__times(s, x);
        return;
    }
    if (rdfs_Resource__isBinding(xo)) {
        xsd_string__fabl_Binding__times(s, xo);
    } else {
        if (!x) {
            xsd_string__fabl_id__times(s, "nul");
            return;
        }
        if (!fabl_Xob__Xobish(x)) {
            beforeError();
            xsd_string__reset(uwriteBuffer);
            xsd_string__fabl_id__times(uwriteBuffer, "internal:");
            xsd_string__rdfs_Class__times(uwriteBuffer, xs);
            xsd_string__tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        lb = fabl_Xob__aLabelOf(x);
        lbs = "";
        if (lb) {
            xsd_string__fabl_id__times(lbs, lb);
            xsd_string__fabl_id__times(lbs, ":");
        }
        if (rdfs_Resource__rdf_Property__xsd_int__bitsel(x, Xob1_booles, Xob1_isNoop)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_id__times(s, "NOOP");
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xapply)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xapply__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, XselectProperty)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_XselectProperty__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xblock)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xblock__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xreturn)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xreturn__times(s, x);
            return;
        }
        xg = x;
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xgo)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xgo__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xassign)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xassign__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xif)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xif__times(s, x);
            return;
        }
        if (rdfs_Resource__rdfs_Class__hasType(xo, Xcast)) {
            xsd_string__xsd_string__times(s, lbs);
            xsd_string__fabl_Xcast__times(s, x);
            return;
        }
        xsd_string__fabl_id__times(s, "<unprintable Xob>");
    }
}