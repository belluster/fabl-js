var toSerialize = seqDataOb_kind;
mk_emptysequence();
var unSerialized = seqDataOb_kind;
mk_emptysequence();
var serializedBindings = seqDataOb_kind;
mk_emptysequence();
mk_emptysequence();
var bindingObKind = 0;
var bindingIntKind = 1;
var bindingDoubleKind = 2;
var bindingUriKind = 3;
var bindingMultiKind = 4;
var serializeCollectInC = false;
function amongFirstN(s, n, v) {
	 < unknown Xob type >  : rdfs : Resourcefor(i = 0; lessp(i, n); plus_plus(i)) {
		if (um_eq(v, s[i]))
			return true; ; ;
	};
	return false; ; ;
}
var preambleObCount = {
	 < unknown Xob type >  : rdfs : Resourcefor(i = 0; lessp(i, n); plus_plus(i)) {
		if (um_eq(v, s[i]))
			return true; ; ;
	};
	return false; ; ;
}
var forDebug = {
	 < unknown Xob type >  : rdfs : Resourcefor(i = 0; lessp(i, n); plus_plus(i)) {
		if (um_eq(v, s[i]))
			return true; ; ;
	};
	return false; ; ;
}
var serializeStack = {
	 < unknown Xob type >  : rdfs : Resourcefor(i = 0; lessp(i, n); plus_plus(i)) {
		if (um_eq(v, s[i]))
			return true; ; ;
	};
	return false; ; ;
}
var serializeDebugStack = {
	 < unknown Xob type >  : rdfs : Resourcefor(i = 0; lessp(i, n); plus_plus(i)) {
		if (um_eq(v, s[i]))
			return true; ; ;
	};
	return false; ; ;
}
var debugStacks = {
	 < unknown Xob type >  : rdfs : Resourcefor(i = 0; lessp(i, n); plus_plus(i)) {
		if (um_eq(v, s[i]))
			return true; ; ;
	};
	return false; ; ;
}
function serializeCollect0(x, pg) {
	 < unknown Xob type >  : rdfs : Resourceif(serializeCollectInC) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	if (nul(x))
		return; ;
	if (um_eq(x, toSerialize))
		return; ;
	if (tempbit(x))
		return; ;
	k = obkind(x);
	sdp = seqLength(serializeStack);
	seqobAdd(serializeStack, x);
	if (um_eq(x, forDebug)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, seqLength(toSerialize));
			tprint(uwriteBuffer);
			terpri();
		}
		serializeDebugStack = seqCopy(serializeStack);
		seqobAdd(debugStacks, serializeDebugStack); ;
	}
	if (k === hashtable_kind) {
		if (isHashSeq(x)) { {
				reset(uwriteBuffer);
				times(uwriteBuffer, 'Omitting a  HashSeq');
				tprint(uwriteBuffer);
				terpri();
			}
			pop(serializeStack);
			return; ; ;
		}
		xp = page(x);
		onpage = or(xp === pg, lessp(xp, 0));
		set_tempbit(x, true);
		if (not(amongFirstN(toSerialize, preambleObCount, x)))
			seqobAdd(toSerialize, x);
		itrn = interned(x);
		pr = parent(x);
		if (nnul(pr)) {
			seqobAdd(serializeStack, '_parent_');
			serializeCollect0(pr, pg);
			pop(serializeStack);
			seqobAdd(serializeStack, '_name_');
			serializeCollect0(name(x), pg);
			pop(serializeStack); ;
		}
		tp = iType(x);
		if (nnul(tp)) {
			seqobAdd(serializeStack, '_type_');
			serializeCollect0(tp, pg);
			pop(serializeStack);
		};
		if (and(not(onpage), not(itrn))) {
			seqSetLength(serializeStack, sdp);
			return; ; ;
		}
		bns = bindings(x);
		ln = seqLength(bns);
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			cb = bns[i];
			if (or(itrn, page(cb) === pg)) {
				seqobAdd(serializedBindings, cb);
				seqobAdd(serializeStack, '_binding_');
				seqobAdd(serializeStack, cb);
				bky = obsel(cb, Binding_key);
				bk = kind(cb);
				btp = obsel(cb, Binding_type);
				seqobAdd(serializeStack, '_binding_type_');
				serializeCollect0(btp, pg);
				pop(serializeStack);
				if (obkind(bky) === string_kind) {
					if (um_eq(bky, 'lowbit')) {
						reset(uwriteBuffer);
						times(uwriteBuffer, bky);
						tprint(uwriteBuffer);
						terpri();
					};
				}
				seqobAdd(serializeStack, '_binding_key_');
				serializeCollect0(bky, pg);
				pop(serializeStack);
				if (not(or(bk === bindingIntKind, bk === bindingDoubleKind))) {
					seqobAdd(serializeStack, '_binding_value_');
					serializeCollect0(bindingValue(cb), pg);
					pop(serializeStack); ;
				}
				pop(serializeStack);
				pop(serializeStack); ;
			};
		};
		seqSetLength(serializeStack, sdp);
		return; ; ;
	}
	if (k === compact_kind) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, );
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	if (k === smallob_kind) {
		xp = page(x);
		itrn = interned(x);
		onpage = xp === pg;
		set_tempbit(x, true);
		if (not(amongFirstN(toSerialize, preambleObCount, x)))
			seqobAdd(toSerialize, x);
		pr = parent(x);
		if (nnul(pr)) {
			seqobAdd(serializeStack, '_parent_');
			serializeCollect0(pr, pg);
			pop(serializeStack);
			seqobAdd(serializeStack, '_name_');
			serializeCollect0(name(x), pg);
			pop(serializeStack); ;
		}
		tp = iType(x);
		if (um_eq(tp, BitField)) {
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, seqLength(toSerialize));
			tprint(uwriteBuffer);
			terpri();
		}
		istp = um_eq(tp, Sort);
		if (nnul(tp)) {
			seqobAdd(serializeStack, '_type_');
			serializeCollect0(tp, pg);
			pop(serializeStack); ;
		}
		if (and(not(onpage), not(itrn))) {
			seqSetLength(serializeStack, sdp);
			return; ; ;
		};
		ln = compactobNumFields(x);
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			cv = selectNthOb(x, i);
			isprototypefield = and(istp, i === 6);
			if (and(nnul(cv), not(isprototypefield)))
				serializeCollect0(cv, pg); ;
		};
		prps = compactobProperties(x);
		if (nul(prps)) {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'MISSING PROPERTIES');
			tprint(uwriteBuffer);
			terpri();
		}
		ln = seqLength(prps);
		for (i = 0; lessp(i, ln); plus_plus(i))
			serializeCollect0(prps[i], pg); ;
		seqSetLength(serializeStack, sdp);
		return; ; ;
	}
	if (k === string_kind) {
		set_tempbit(x, true);
		if (not(amongFirstN(toSerialize, preambleObCount, x)))
			seqobAdd(toSerialize, x);
		seqSetLength(serializeStack, sdp);
		return; ; ;
	}
	if (or(k === seq_kind, k === values_kind)) {
		itrn = interned(x);
		xp = page(x);
		onpage = or(xp === pg, lessp(xp, 0));
		set_tempbit(x, true);
		if (not(amongFirstN(toSerialize, preambleObCount, x)))
			seqobAdd(toSerialize, x);
		pr = parent(x);
		if (nnul(pr))
			serializeCollect0(pr, pg);
		tp = iType(x);
		if (nnul(tp))
			serializeCollect0(tp, pg);
		if (and(and(k === seq_kind, not(onpage)), not(itrn))) {
			seqSetLength(serializeStack, sdp);
			return; ; ;
		}
		dk = seqDataKind(x);
		if (dk === seqDataOb_kind) {
			sq = x;
			ln = seqLength(sq);
			for (i = 0; lessp(i, ln); plus_plus(i)) {
				seqobAdd(serializeStack, '_element_');
				seqobAdd(serializeStack, integer_to_ob(i));
				serializeCollect0(sq[i], pg);
				pop(serializeStack);
				pop(serializeStack); ;
			}; ;
		}
		seqSetLength(serializeStack, sdp);
		return; ; ;
	}
	if (k === dblock_kind) {
		seqobAdd(toSerialize, x);
		set_tempbit(x, true);
		db = x;
		nmo = numobs(db);
		for (i = 0; lessp(i, nmo); plus_plus(i)) {
			dbv = selectOb(db, i);
			if (nnul(dbv)) {
				serializeCollect0(dbv, pg); ;
			};
		};
		seqSetLength(serializeStack, sdp);
		return; ; ;
	}
	if (k === binding_kind) {
		seqobAdd(toSerialize, x);
		set_tempbit(x, true);
		serializeCollect0(parent(x), pg);
		serializeCollect0(bindingKey(x), pg);
		seqSetLength(serializeStack, sdp);
		return; ; ;
	} {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Not yet serializing: ');
		times(uwriteBuffer, k);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
}
function setPageOfGlobals(cn, names, pg) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(names);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		gl = selectGlobalBinding(cn, names[i]);
		if (nnul(gl))
			set_page(gl, pg); ;
	}; ;
}
var fimpExiles = seqDataOb_kind;
['path', 'fimp'];
var restoreTheTempBits = true;
function restoreTempBits() {
	 < unknown Xob type >  : rdfs : Resourceif(restoreTheTempBits) {
		ln = seqLength(toSerialize);
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			cs = toSerialize[i];
			set_tempbit(cs, false); ;
		};
		ln = seqLength(serializedBindings);
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			cs = serializedBindings[i];
			set_tempbit2(cs, false); ;
		}; ;
	};
}
function addSerializeOb(x) {
	if (serializeCollectInC)
		addObToSerialize(x);
	else
		seqobAdd(toSerialize, x); ;
}
function serializeCollectOb(x, pg) {
	if (serializeCollectInC)
		cserializeCollect0(x, pg);
	else
		serializeCollect0(x, pg); ;
}
function serializeCollect(xs, y, pg, forFimp) {
	 < unknown Xob type >  : rdfs : ResourceserializeStack = mk_emptysequence();
	debugStacks = mk_emptysequence();
	if (forFimp) {
		x = xs[0];
		set(x, regarding('fimp'), );
		set(x, regarding('path'), ); ;
	}
	if (serializeCollectInC)
		resetToSerialize();
	else
		seqReset(toSerialize);
	urObs = [root, typeP, Sort, Regarding, Function, Pcode, Restriction, BitField];
	lno = seqLength(urObs);
	for (i = 0; lessp(i, lno); plus_plus(i))
		addSerializeOb(urObs[i]); ;
	if (nnul(y))
		addSerializeOb(y);
	if (serializeCollectInC)
		setPreambleObCount();
	else
		preambleObCount = seqLength(toSerialize);
	lnxs = seqLength(xs);
	tb = ;
	if (and(not(forFimp), nnul(fget(thisFileR, topicP)))) {
		tb = selectBinding(thisFileR, topicP);
		set_page(tb, pg);
		set_page(thisFileR, pg); ;
	}
	for (i = 0; lessp(i, lnxs); plus_plus(i))
		serializeCollectOb(xs[i], pg); ;
	if (nnul(tb))
		serializeCollectOb(thisFileR, pg);
	for (i = 0; lessp(i, lno); plus_plus(i)) {
		uro = urObs[i];
		if (not(tempbit(uro)))
			serializeCollectOb(uro, pg); ;
	};
	if (serializeCollectInC)
		setSerializedBindingBits();
	else {
		ln = seqLength(serializedBindings);
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			cb = serializedBindings[i];
			set_tempbit2(cb, true); ;
		}; ;
	};
}
function serializeCollect(xs, y, pg) {
	serializeCollect(xs, y, pg, false); ;
}
function serializeCollect(x, y, pg, forFimp) {
	serializeCollect([x], y, pg, forFimp); ;
}
function serializeCollect(x, y, pg) {
	serializeCollect(x, y, pg, false); ;
}
function serializeCollect(x, pg) {
	serializeCollect(x, x, pg, false); ;
}
function fimpCollect(x, pg) {
	serializeCollect(x, , pg, true); ;
}
function bindingName(b) {
	 < unknown Xob type >  : rdfs : Resourcek = obsel(b, Binding_key);
	kk = obkind(k);
	if (kk === string_kind)
		return k; ;
	return; ; ;
} {
	 < unknown Xob type >  : rdfs : Resourcek = obsel(b, Binding_key);
	kk = obkind(k);
	if (kk === string_kind)
		return k; ;
	return; ; ;
}
function traverse(x, dp) {
	 < unknown Xob type >  : rdfs : Resourcek = obkind(x);
	if (k === hashtable_kind) {
		b = bindings(x);
		ln = seqLength(b);
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			cb = b[i];
			cbn = bindingName(cb);
			if (nnul(cbn)) {
				for (j = 0; lessp(j, dp); plus_plus(j)) {
					reset(uwriteBuffer);
					times(uwriteBuffer, '  ');
					tprint(uwriteBuffer);
				}; {
					reset(uwriteBuffer);
					times(uwriteBuffer, cbn);
					tprint(uwriteBuffer);
					terpri();
				}
				traverse(bindingValue(cb), plus(dp, 1)); ;
			};
		}; ;
	};
}
function vwrite(x) {
	 < unknown Xob type >  : rdfs : Resourcek = obkind(x);
	if (k === 3) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, x);
			tprint(uwriteBuffer);
		}
		return; ;
	}
	if (k === 1) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, ob_to_integer(x));
			tprint(uwriteBuffer);
		}
		return; ;
	}
	if (isFunction(x)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, x);
			tprint(uwriteBuffer);
		}
		return; ;
	}
	if (isBinding(x)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, x);
			tprint(uwriteBuffer);
		}
		return; ;
	}
	if (hasType(x, Sort)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, x);
			tprint(uwriteBuffer);
		}
		return; ;
	} {
		reset(uwriteBuffer);
		times(uwriteBuffer, '[Any]');
		tprint(uwriteBuffer);
	};
}
function vwrite(s) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(s);
	for (i = 0; lessp(i, ln); plus_plus(i)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, i);
			times(uwriteBuffer, ' ');
			tprint(uwriteBuffer);
		}
		vwrite(s[i]); {
			reset(uwriteBuffer);
			times(uwriteBuffer, lf);
			tprint(uwriteBuffer);
		}
	}; ;
}
function restoreTheTempBits() {
	if (serializeCollectInC)
		crestoreTempBits();
	else
		restoreTempBits(); ;
}
function serializeToFile(fln, v, pg) {
	serializeCollect(v, pg);
	serializeReset();
	if (serializeCollectInC)
		serializeToFile(fln, , pg);
	else
		serializeToFile(fln, toSerialize, pg);
	restoreTheTempBits(); ;
}
function serializeSeqToFile(fln, v, pg) {
	serializeCollect(v, , pg);
	serializeReset();
	if (serializeCollectInC)
		serializeToFile(fln, , pg);
	else
		serializeToFile(fln, toSerialize, pg);
	restoreTheTempBits(); ;
}
function serializeToBuffer(bf, v, pg) {
	serializeCollect(v, pg);
	serializeReset();
	if (serializeCollectInC)
		serializeToBuffer(bf, , pg);
	else
		serializeToBuffer(bf, toSerialize, pg);
	restoreTheTempBits(); ;
}
function printUris(s) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(s);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		if (nnul(parent(s[i]))) {
			u = uri(s[i]);
			if (nnul(u)) {
				reset(uwriteBuffer);
				times(uwriteBuffer, i);
				times(uwriteBuffer, ' ');
				times(uwriteBuffer, u);
				tprint(uwriteBuffer);
				terpri();
			};
		};
	}; ;
}
