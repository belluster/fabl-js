function xsd_string__xsd_boolean__times(x, v) {
    var x;
    var v;
    if (v) xsd_string__fabl_id__times(x, "true"); else xsd_string__fabl_id__times(x, "false");
}

function xsd_string__rdf_Property__times(x, p) {
    var x;
    var p;
    if (!xsd_string__rdfs_Resource__qualifiedName(x, p)) xsd_string__fabl_id__times(x, "[unnamed Property]");
}

function xsd_string__rdfs_Literal__times(x, v) {
    var x;
    var v;
    var vo;
    var k;
    vo = v;
    k = rdfs_Resource__obkind(vo);
    if (k === int_kind) xsd_string__xsd_int__times(x, rdfs_Resource__ob_to_integer(vo)); else if (k === double_kind) xsd_string__xsd_double__times(x, rdfs_Resource__toDouble(vo)); else if (rdfs_Resource__isString(x)) xsd_string__xsd_string__times(x, vo); else xsd_string__fabl_id__times(x, "<unprintable of type rdfs:Literal>");
}