var blankNodeTable = var beenWrittenTable = var xmlNamespaces = var xmlSizeLimit = 10000;
function qualifiedNameCollectNamespace(x) {
	 < unknown Xob type >  : rdfs : Resourceqn = qualifiedName(x);
	if (nul(qn))
		return qn; ;
	clp = indexOf(qn, ascii_colon);
	ns = toId(substring(qn, 0, clp));
	if (not(seqobContains(xmlNamespaces, ns)))
		seqobAdd(xmlNamespaces, ns);
	return qn; ; ;
}
var blankIdSeed = 'n_';
var blankIdCount = 0;
function blankNodeName(r) {
	 < unknown Xob type >  : rdfs : Resourcerr = regarding(r);
	nm = get(blankNodeTable, rr);
	if (nul(nm)) {
		nm = genName(blankIdSeed, plus_plus(blankIdCount));
		set(blankNodeTable, rr, nm); ;
	}
	return nm; ; ;
}
function xmlWriteResourceTag(bf, r) {
	 < unknown Xob type >  : rdfs : Resourcerr = regarding(r);
	u = uri(r);
	tp = get(r, );
	tpk = obkind(tp);
	if (tpk === seq_kind) {
		tps = tp;
		ln = seqLength(tps);
		if (greaterp(ln, 0))
			mtp = tps[difference(ln, 1)]; ;
	} else
		mtp = tp;
	if (nnul(mtp))
		tpnm = qualifiedNameCollectNamespace(mtp);
	if (nul(tpnm)) {
		times(bf, );
	} else {
		times(bf, );
		times(bf, tpnm);
	}
	if (nul(u)) {
		times(bf, );
		times(bf, blankNodeName(r));
		times(bf, );
	} else {
		times(bf, );
		times(bf, u);
		times(bf, );
	} {
		times(bf, );
	}
	set(beenWrittenTable, rr, 'yes'); ;
}
function xmlWriteResourceEndTag(bf, r) {
	 < unknown Xob type >  : rdfs : Resourcemtp = fget(r, );
	if (nnul(mtp))
		tpnm = qualifiedNameCollectNamespace(mtp);
	if (nul(tpnm)) {
		times(bf, );
	} else {
		times(bf, );
		times(bf, tpnm);
		times(bf, );
	};
}
var intUri = 'http://www.w3.org/2001/XMLSchema#int'; ;
var doubleUri = 'http://www.w3.org/2001/XMLSchema#double'; ;
var stringUri = 'http://www.w3.org/2001/XMLSchema#string'; ;
var booleanUri = 'http://www.w3.org/2001/XMLSchema#boolean'; ;
var idUri = 'http://nurl.org/0/fabl/id'; ;
function xmlWriteDatatypeProperty(bf, pnm, v, tp) {
	 < unknown Xob type >  : rdfs : Resource {
		times(bf, );
		times(bf, pnm);
	}
	if (not(tp === ob)) {
		if (tp === fabl_int)
			tpuri = intUri;
		else if (tp === fabl_double)
			tpuri = doubleUri;
		else if (tp === fabl_string)
			tpuri = stringUri;
		else if (tp === fabl_id)
			tpuri = idUri;
		else if (tp === fabl_boolean)
			tpuri = booleanUri;
		else {
			beforeError();
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, tp);
			tprint(uwriteBuffer);
			terpri();
			afterError();
		} {
			times(bf, );
			times(bf, tpuri);
			times(bf, );
		};
	} {
		times(bf, );
		times(bf, v);
		times(bf, );
		times(bf, pnm);
		times(bf, );
	}
	if (greaterp(length(bf), xmlSizeLimit)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
} {
	 < unknown Xob type >  : rdfs : Resource {
		times(bf, );
		times(bf, pnm);
	}
	if (not(tp === ob)) {
		if (tp === fabl_int)
			tpuri = intUri;
		else if (tp === fabl_double)
			tpuri = doubleUri;
		else if (tp === fabl_string)
			tpuri = stringUri;
		else if (tp === fabl_id)
			tpuri = idUri;
		else if (tp === fabl_boolean)
			tpuri = booleanUri;
		else {
			beforeError();
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, tp);
			tprint(uwriteBuffer);
			terpri();
			afterError();
		} {
			times(bf, );
			times(bf, tpuri);
			times(bf, );
		};
	} {
		times(bf, );
		times(bf, v);
		times(bf, );
		times(bf, pnm);
		times(bf, );
	}
	if (greaterp(length(bf), xmlSizeLimit)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
}
function xmlWriteProperty(bf, pnm, r) {
	 < unknown Xob type >  : rdfs : Resource {
		times(bf, );
		times(bf, pnm);
	}
	if (nul(fget(beenWrittenTable, regarding(r)))) { {
			times(bf, );
		}
		xmlSerialize(bf, r); {
			times(bf, );
			times(bf, pnm);
			times(bf, );
		};
	} else {
		u = uri(r);
		if (nul(u)) {
			times(bf, );
			times(bf, blankNodeName(r));
			times(bf, );
		} else {
			times(bf, );
			times(bf, u);
			times(bf, );
		};
	}
	if (greaterp(length(bf), xmlSizeLimit)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
}
function xmlSerialize(bf, b) {
	 < unknown Xob type >  : rdfs : Resourcek = bindingKey(b);
	kq = qualifiedNameCollectNamespace(k);
	if (nul(kq))
		return false; ;
	p = k;
	v = bindingValue(b);
	btp = obsel(b, Binding_type);
	if (or(nul(btp), btp === ob)) {
		ptp = range(p);
		if (nnul(ptp))
			vtp = ptp; ;
	} else
		vtp = btp;
	if (nul(vtp))
		vtp = ob;
	vtp0 = type0(v);
	if (not(vtp0 === ob)) {
		if (vtp === ob)
			vtp = vtp0;
		else
			vtp = mostSpecific([vtp0, vtp]); ;
	}
	vk = obkind(v);
	if (vk === double_kind)
		vtp = fabl_double;
	isdtp = or(or(or(isString(v), isId(v)), vk === int_kind), vk === double_kind);
	pnm = qualifiedNameCollectNamespace(p);
	if (nul(pnm)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		times(uwriteBuffer, uri(p));
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	if (isdtp)
		xmlWriteDatatypeProperty(bf, pnm, v, vtp);
	else
		xmlWriteProperty(bf, pnm, v);
	return true; ; ;
}
var xmlSerializePage = 0;
function xmlSerialize(bf, r) {
	 < unknown Xob type >  : rdfs : Resourceif(greaterp(length(bf), xmlSizeLimit)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	k = obkind(r);
	if (k === hashtable_kind) {
		bn = bindings(r);
		bfln = length(bf);
		xmlWriteResourceTag(bf, r);
		ln = seqLength(bn);
		bcnt = 0;
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			b = bn[i];
			if (or(lessp(xmlSerializePage, 0), page(b) === xmlSerializePage)) {
				if (xmlSerialize(bf, b))
					plus_plus(bcnt); ;
			};
		};
		xmlWriteResourceEndTag(bf, r); ;
	}
	if (k === seq_kind) {
		times(bf, );
		dk = seqDataKind(r);
		if (dk === seqDataOb_kind) {
			sqo = r;
			ln = seqLength(sqo);
			for (i = 0; lessp(i, ln); plus_plus(i)) {
				v = sqo[i];
				vtp = type0(v);
				vk = obkind(v);
				if (vk === double_kind)
					vtp = fabl_double;
				isdtp = or(or(or(isString(v), isId(v)), vk === int_kind), vk === double_kind);
				if (isdtp)
					xmlWriteDatatypeProperty(bf, , v, vtp);
				else
					xmlWriteProperty(bf, , v); ;
			}; ;
		} else {
			beforeError();
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			tprint(uwriteBuffer);
			terpri();
			afterError();
		}
		times(bf, ); ;
	};
}
var xmlBoilerPlate = '<?xml version="1.0" encoding="iso-8859-1" ?>
	<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	'; ;
function addXmlNamespace(bf, ns) {
	 < unknown Xob type >  : rdfs : Resourcensuri = uri(namespace(ns));
	times(bf, {
		 < unknown Xob type >  : rdfs : ResourcestringConstantResult = '' '';
		times(stringConstantResult, );
		times(stringConstantResult, ns);
		times(stringConstantResult, );
		times(stringConstantResult, nsuri);
		times(stringConstantResult, );
		return stringConstantResult; ;
	}); ;
}
function addXmlNamespaces(bf, ns) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(ns);
	for (i = 0; lessp(i, ln); plus_plus(i))
		addXmlNamespace(bf, ns[i]); ;
	times(bf, ); ;
}
function xmlSerialize(bf, v, pg) {
	 < unknown Xob type >  : rdfs : ResourcexmlSerializePage = pg;
	blankNodeTable = iNew();
	beenWrittenTable = iNew();
	xmlNamespaces = iNew();
	blankIdCount = 0;
	ln = seqLength(v);
	rbf = ;
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		cv = v[i];
		if (or(lessp(xmlSerializePage, 0), page(cv) === xmlSerializePage))
			xmlSerialize(rbf, cv); ;
	};
	times(bf, xmlBoilerPlate);
	addXmlNamespaces(bf, xmlNamespaces);
	times(bf, rbf);
	times(bf, ); ;
}
function xmlSerializeToFile(fl, v, pg) {
	 < unknown Xob type >  : rdfs : Resourcebf = ;
	xmlSerialize(bf, v, pg);
	fwrite(fl, bf); ;
}
function xmlSerializeToFile(fl, v) {
	xmlSerializeToFile(fl, v, unary_minus(1)); ;
}
