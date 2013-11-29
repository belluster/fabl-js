function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourcesrc = obsel(x, Xassign_source);
	dst = obsel(x, Xassign_dest);
	times(s, dst);
	times(s, '=');
	times(s, src); ;
}
function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourcesrc = obsel(x, XselectProperty_source);
	prp = obsel(x, XselectProperty_selector);
	times(s, src);
	times(s, '.');
	times(s, prp); ;
}
function times(s, x) {
	times(s, obsel(x, Xcast_castee));
	times(s, '~');
	times(s, type(x)); ;
}
function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourceiff = obsel(x, Xif_ifFalse);
	times(s, 'if (');
	times(s, obsel(x, Xif_condition));
	times(s, obsel(x, Xif_ifTrue));
	if (nnul(iff)) {
		times(s, '; else ');
		times(s, iff); ;
	};
}
function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourcefn = obsel(x, Xapply_functionOf);
	dst = obsel(x, Xapply_dest);
	if (nnul(dst)) {
		times(s, dst);
		times(s, ' = '); ;
	}
	times(s, fn);
	times(s, '(');
	dt = obsel(x, Xapply_arguments);
	ln = seqLength(dt);
	if (and(nnul(dt), greaterp(ln, 0))) {
		for (i = 0; lessp(i, difference(ln, 1)); plus_plus(i)) {
			times(s, dt[i]);
			times(s, ','); ;
		};
		times(s, dt[difference(ln, 1)]); ;
	}
	times(s, ')'); ;
}
function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourcetimes(s, '  {');
	times(s, 10);
	dt = obsel(x, Xblock_statements);
	if (nnul(dt)) {
		ln = seqLength(dt);
		for (i = 0; lessp(i, ln); plus_plus(i)) {
			times(s, '   ');
			times(s, dt[i]);
			times(s, ';');
			times(s, 10); ;
		}; ;
	}
	times(s, '   }');
	times(s, 10); ;
}
function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourcevl = obsel(x, Xreturn_value);
	if (nul(vl))
		times(s, 'return');
	else {
		times(s, 'return ');
		times(s, vl); ;
	};
}
function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourcevl = obsel(x, Xgo_condition);
	times(s, 'Go ');
	if (nnul(vl)) {
		if (bitsel(x, Xgo_booles, Xgo_goIfFalse))
			times(s, '(iffalse:');
		times(s, vl);
		times(s, ') '); ;
	}
	times(s, ' ');
	times(s, obsel(x, Xgo_toLabel)); ;
}
function times(s, x) {
	 < unknown Xob type >  : rdfs : Resourcexo = x;
	k = obkind(xo);
	if (k === string_kind) {
		times(s, x);
		return; ; ;
	}
	if (k === string_kind) {
		times(s, x);
		return; ; ;
	}
	if (k === int_kind) {
		times(s, ob_to_integer(xo));
		return; ; ;
	}
	if (k === double_kind) {
		times(s, toDouble(xo));
		return; ; ;
	}
	if (isFunction(xo)) {
		times(s, x);
		return; ; ;
	}
	if (isBinding(xo)) {
		times(s, xo); ;
	} else {
		if (nul(x)) {
			times(s, 'nul');
			return; ;
		}
		if (not(Xobish(x))) {
			beforeError();
			reset(uwriteBuffer);
			times(uwriteBuffer, 'internal:');
			times(uwriteBuffer, xs);
			tprint(uwriteBuffer);
			terpri();
			afterError();
		}
		lb = aLabelOf(x);
		lbs = '' '';
		if (nnul(lb)) {
			times(lbs, lb);
			times(lbs, ':'); ;
		}
		if (bitsel(x, Xob1_booles, Xob1_isNoop)) {
			times(s, lbs);
			times(s, 'NOOP');
			return; ;
		}
		if (hasType(xo, Xapply)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		if (hasType(xo, XselectProperty)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		if (hasType(xo, Xblock)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		if (hasType(xo, Xreturn)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		xg = x;
		if (hasType(xo, Xgo)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		if (hasType(xo, Xassign)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		if (hasType(xo, Xif)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		if (hasType(xo, Xcast)) {
			times(s, lbs);
			times(s, x);
			return; ;
		}
		times(s, '<unprintable Xob>'); ;
	};
}
