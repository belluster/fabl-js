function aLabelOf(x) {
	 < unknown Xob type >  : rdfs : Resourceif(not(Xobish(x)))return; ;
	olbs = obsel(x, Xob1_labels);
	if (nul(olbs))
		return; ;
	lk = obkind(olbs);
	if (or(lk === nstring_kind, lk === wstring_kind))
		return olbs; ;
	lbs = olbs;
	if (greaterp(seqLength(lbs), 0))
		return lbs[0]; ;
	return; ; ;
}
function labelsOf(x) {
	if (not(Xobish(x)))
		return; ;
	return obsel(x, Xob1_labels); ; ;
}
function isLabeled(x, nm) {
	 < unknown Xob type >  : rdfs : Resourceif(not(Xobish(x)))return false; ;
	lbs = obsel(x, Xob1_labels);
	if (nul(lbs))
		return false; ;
	if (obkind(lbs) === seq_kind)
		return seqobContains(lbs, nm); ;
	return um_eq(nm, lbs); ; ;
}
function addLabel(x, nm) {
	 < unknown Xob type >  : rdfs : Resourceif(not(Xobish(x))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Cannot add label an atomic Xob ');
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	olbs = obsel(x, Xob1_labels);
	if (nul(olbs))
		obset(x, Xob1_labels, nm);
	else {
		lk = obkind(olbs);
		if (or(lk === nstring_kind, lk === wstring_kind)) {
			lbs = [olbs, nm];
			obset(x, Xob1_labels, lbs); ;
		} else {
			lbs = olbs;
			if (not(seqobContains(lbs, nm)))
				seqobAdd(lbs, nm); ;
		};
	};
}
function addLabels(x, s) {
	 < unknown Xob type >  : rdfs : Resourceif(not(Xobish(x))) {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'Cannot add label to an atomic Xob');
		tprint(uwriteBuffer);
		terpri();
		afterError();
	}
	ln = seqLength(s);
	if (ln === 0)
		return; ;
	if (ln === 1) {
		addLabel(x, s[0]);
		return; ; ;
	}
	olbs = obsel(x, Xob1_labels);
	if (nul(olbs)) {
		obset(x, Xob1_labels, seqCopy(s));
		return; ; ;
	} else {
		if (obkind(olbs) === seq_kind) {
			lbs = olbs;
			seqobAppend(lbs, s); ;
		} else {
			lbs = [olbs];
			seqobAppend(lbs, s);
			obset(x, Xob1_labels, lbs); ;
		};
	};
}
function copyLabels(dst, src) {
	 < unknown Xob type >  : rdfs : Resourceif(not(Xobish(src)))return; ;
	olbs = obsel(src, Xob1_labels);
	if (nul(olbs))
		return; ;
	lk = obkind(olbs);
	if (lk === seq_kind) {
		slbs = olbs;
		addLabels(dst, slbs); ;
	} else
		addLabel(dst, olbs); ;
}
function hasLabel(x) {
	return and(Xobish(x), nnul(obsel(x, Xob1_labels))); ; ;
}
