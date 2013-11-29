function namespace(nm, uri) {
	 < unknown Xob type >  : rdfs : Resourcenmv = uriToResource(uri);
	bindConstant(home, nm, nmv, ob);
	inv = globalValue(home, 'inverseNamespaces');
	if (nul(inv)) {
		inv = mkResource();
		bindGlobal(home, 'inverseNamespaces', inv, ob); ;
	}
	set(inv, regarding(nmv), nm, ob); ;
}
function namespacePrefix(x) {
	 < unknown Xob type >  : rdfs : Resourceinv = globalValue(home, 'inverseNamespaces');
	if (nul(inv))
		return; ;
	return get(inv, regarding(x)); ; ;
}
function namespace(nm, uri) {
	namespace(toId(nm), uri); ;
}
function aboutNamespace(nm) {
	 < unknown Xob type >  : rdfs : Resourcens = namespace(nm);
	if (nul(ns)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, {
				 < unknown Xob type >  : rdfs : ResourcestringConstantResult = '' '';
				times(stringConstantResult, );
				times(stringConstantResult, nm);
				times(stringConstantResult, );
				return stringConstantResult; ;
			});
			tprint(uwriteBuffer);
			terpri();
		}
		return; ;
	}
	dfb = mget(ns, isDefinedByP); {
		reset(uwriteBuffer);
		times(uwriteBuffer, {
			 < unknown Xob type >  : rdfs : ResourcestringConstantResult = '' '';
			times(stringConstantResult, );
			times(stringConstantResult, nm);
			times(stringConstantResult, );
			times(stringConstantResult, uri(ns));
			return stringConstantResult; ;
		});
		tprint(uwriteBuffer);
		terpri();
	}
	if (nul(dfb)) {
		terpri();
		return; ;
	}
	ln = seqLength(dfb); {
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
	}
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		reset(uwriteBuffer);
		times(uwriteBuffer, uri(dfb[i]));
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
	};
	terpri(); ;
}
function qualifiedName(rs, x) {
	 < unknown Xob type >  : rdfs : Resourcepr = parent(x);
	if (nul(pr))
		return false; ;
	pfx = namespacePrefix(pr);
	if (nul(pfx))
		return false; ;
	times(rs, pfx);
	times(rs, ':');
	times(rs, name(x));
	return true; ; ;
}
var qualifiedNameBuf = ''; ;
function qualifiedName(x) {
	reset(qualifiedNameBuf);
	if (qualifiedName(qualifiedNameBuf, x))
		return copy(qualifiedNameBuf); ;
	return; ; ;
}
var rdfns = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var rdfsns = 'http://www.w3.org/2000/01/rdf-schema#';
var xsdns = 'http://www.w3.org/2000/10/XMLSchema#';
var owlns = 'http://www.w3.org/2002/07/owl#';
var fablns = 'http://nurl.org/0/fabl/';
var fimpns = 'http://nurl.org/0/fimp/';
rangeProperty = uriToResource('plus(rdfsns,' range ')');
function range(p) {
	 < unknown Xob type >  : rdfs : Resourcer = get(p, rangeProperty);
	if (obkind(r) === values_kind)
		return mostSpecific(r); ;
	return r; ; ;
}
function namespace(pr) {
	 < unknown Xob type >  : rdfs : Resourceif(pr === 'home')return home; ;
	b = selectBinding(homePath(), pr);
	if (nul(b)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'No such namespace: ');
		times(uwriteBuffer, pr);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	if (not(isConstant(b))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Not a namespace: ');
		times(uwriteBuffer, pr);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	vl = bindingValue(b);
	vlk = obkind(vl);
	if (not(or(vlk === hashtable_kind, vlk === smallob_kind))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Not a namespace: ');
		times(uwriteBuffer, pr);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	return vl; ; ;
}
function namespace(pr) {
	return namespace(toId(pr)); ; ;
}
function evalQname(pr, lc) {
	 < unknown Xob type >  : rdfs : Resourcens = namespace(pr);
	rs = selectUri(ns, lc);
	if (nul(rs)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, lc);
		times(uwriteBuffer, ' not found in namespace ');
		times(uwriteBuffer, ns);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	return getEquivalent(rs); ; ;
}
function evalQname(x) {
	 < unknown Xob type >  : rdfs : Resourcee1 = cadr(x);
	e2 = caddr(x);
	if (or(not(isId(e1)), not(isId(e2)))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		times(uwriteBuffer, x);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	return evalQname(e1, e2); ; ;
}
function evalQnameN(pr, lc) {
	 < unknown Xob type >  : rdfs : Resourcens = namespace(pr);
	rs = selectUri(ns, lc);
	if (nul(rs))
		return; ;
	return getEquivalent(rs); ; ;
}
function evalQnameN(x) {
	 < unknown Xob type >  : rdfs : Resourcee1 = cadr(x);
	e2 = caddr(x);
	if (or(not(isId(e1)), not(isId(e2)))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		times(uwriteBuffer, x);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	return evalQnameN(e1, e2); ; ;
}
function toProperty(pr) {
	 < unknown Xob type >  : rdfs : Resourcecb = selectBinding(homePath(), pr);
	if (nul(cb))
		return; ;
	if (not(isConstant(cb)))
		return; ;
	if (not(um_eq(obsel(cb, Binding_type), Property)))
		return; ;
	return bindingValue(cb); ; ;
}
function isQname(x) {
	 < unknown Xob type >  : rdfs : Resourceif(not(isList(x)))return false; ;
	if (um_eq(car(x), '_colon_')) {
		pr = cadr(x);
		lc = caddr(x);
		return and(isId(pr), isId(lc)); ; ;
	}
	return false; ; ;
}
function toProperty(x) {
	return evalQname(x); ; ;
}
function parseQname(s) {
	 < unknown Xob type >  : rdfs : Resourceclp = find(s, ascii_colon);
	if (lessp(clp, 0)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, s);
		times(uwriteBuffer, ' does not have the right form (prefix:localpart) for a qualified name');
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	if (greaterp(find(s, ascii_slash), 0)) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, s);
		times(uwriteBuffer, ' does not have the right form (prefix:localpart) for a qualified name');
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	return cons('_colon_', cons(toString(substring(s, 0, clp)), cons(toString(substring(s, plus(clp, 1), length(s))), ))); ; ;
}
function toUri(s) {
	 < unknown Xob type >  : rdfs : Resourceprs = parseQname(s);
	pr = cadr(prs);
	lc = caddr(prs);
	nm = namespace(pr);
	u = uri(nm);
	ln = length(u);
	lstc = u[difference(ln, 1)];
	if (lstc === ascii_sharp)
		return {
			 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
			times(toStringResult, u);
			times(toStringResult, lc);
			return toStringResult; ;
		}; ;
	else
		return {
			 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
			times(toStringResult, u);
			times(toStringResult, '/');
			times(toStringResult, lc);
			return toStringResult; ;
		}; ; ;
}
function newResource(s) {
	 < unknown Xob type >  : rdfs : Resourceq = parseQname(s);
	pr = cadr(q);
	ns = namespace(pr);
	lc = caddr(q);
	if (length(lc) === 0)
		return ns; ;
	rs = selectUri(ns, lc);
	if (nnul(rs))
		return getEquivalent(rs); ;
	rs = mkResource();
	bindUri(ns, lc, rs);
	return rs; ; ;
}
function allocate(s, tp) {
	 < unknown Xob type >  : rdfs : Resourceq = parseQname(s);
	pr = cadr(q);
	ns = namespace(pr);
	lc = caddr(q);
	if (length(lc) === 0)
		return ns; ;
	cv = selectUri(ns, lc);
	if (nul(cv)) {
		rs = iNew(tp);
		bindUri(ns, lc, rs);
		return rs; ; ;
	} else {
		cv = getEquivalent(cv);
		if (not(hasType(cv, tp))) {
			if (untyped(cv)) {
				if (tp === FunctionalProperty)
					setType(cv, [Property, FunctionalProperty]);
				else
					setType(cv, tp); ;
			} else {
				beforeError();
				reset(uwriteBuffer);
				times(uwriteBuffer, 'Attempt to allocate a resource where one of a different type already exists: ');
				times(uwriteBuffer, s);
				tprint(uwriteBuffer);
				terpri();
				afterError();
			};
		}
		return cv; ; ;
	};
}
function allocate(s) {
	return allocate(s, ob); ; ;
}
function allocateProperty(s) {
	return allocate(s, Property); ; ;
}
function getChild(x, s) {
	return selectUri(x, s); ; ;
}
function uriAllocate(s, tp) {
	return uriToResource(root, s, true, tp); ; ;
}
function uriAllocate(s) {
	return uriAllocate(s, ob); ; ;
}
function isDefinedBy(u0, u1) {
	 < unknown Xob type >  : fabl : XselectProperty = resource(u1); ;
}
function namespaceDefinedBy(ns, u0) {
	 < unknown Xob type >  : fabl : XselectProperty = resource(u0); ;
}
var stdlibPrefix = 'http://fabl.net/lib/'; ;
function stdNamespaces() {
	< unknown Xob type >  : rdfs : Resourcenamespace('rdf', '' http : //www.w3.org/1999/02/22-rdf-syntax-ns#'');namespace('rdfs',''http://www.w3.org/2000/01/rdf-schema#'');namespace('xsd',''http://www.w3.org/2000/10/XMLSchema#'');namespace('owl',''http://www.w3.org/2002/07/owl#'');namespace('fabl',''http://nurl.org/0/fabl/'');namespace('fimp',''http://nurl.org/0/fimp/'');namespace(,);;}function fixPage0(){rangeProperty=uriAllocate(''http://www.w3.org/2000/01/rdf-schema#subClassOf'',Property);subClassOf=uriAllocate(''http://www.w3.org/2000/01/rdf-schema#subClassOf'',Property);FunctionalProperty=uriAllocate({<unknown Xob type>: rdfs:ResourcestringConstantResult='''';times(stringConstantResult,);times(stringConstantResult,owlns);times(stringConstantResult,);return stringConstantResult;;},Class);assertUriChildAsProperty(Xob1,'isNoop');assertUriChildAsProperty(Xob1,'isConstant');assertUriChildAsProperty(XselectProperty,'isBitField');assertUriChildAsProperty(Xreturn,'blockReturn');assertUriChildAsProperty(Xreturn,'loopBreak');assertUriChildAsProperty(Xreturn,'loopContinue');assertUriChildAsProperty(Xgo,'goIfFalse');assertUriChildAsProperty(Xblock,'isFunctionBody');assertUriChildAsProperty(Token,'isInfix');assertUriChildAsProperty(Token,'isPrefix');assertUriChildAsProperty(Token,'isPostfix');assertUriChildAsProperty(Token,'isTerminator');assertUriChildAsProperty(Token,'isOperator');assertUriChildAsProperty(Token,'isAtom');assertUriChildAsProperty(Token,'isKeyword');assertUriChildAsProperty(Token,'isNumber');assertUriChildAsProperty(Token,'isString');assertUriChildAsProperty(Token,'isId');rangeProperty=uriAllocate(''http://www.w3.org/2000/01/rdf-schema#range'',Property);;}
