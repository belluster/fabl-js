function getShort(cd, x) {
	return lor(selectByte(cd, x), lshift(selectByte(cd, plus(x, 1)), 8)); ; ;
}
function disasmArg(cd, db, n) {
	 < unknown Xob type >  : rdfs : Resourceknd = selectByte(cd, n);
	md = selectBits(knd, 5, 7);
	vstr = selectBits(knd, 0, 4); {
		reset(uwriteBuffer);
		times(uwriteBuffer, '[');
		tprint(uwriteBuffer);
	}
	dstr = storage_ob;
	ssidb = false;
	if (md === pam_local) {
		ln = 3;
		dstr = vstr; {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'local ');
			tprint(uwriteBuffer);
		};
	} else if (md === pam_binding_value) {
		ln = 3; {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'binding_value ');
			tprint(uwriteBuffer);
		};
	} else if (md === pam_local_field_select) {
		ln = 5; {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'local_field_select ');
			tprint(uwriteBuffer);
		};
	} else if (md === pam_binding_field_select) {
		ln = 5; {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'binding_field_select ');
			tprint(uwriteBuffer);
		};
	} else if (md === pam_local_sequence_select) {
		ln = 5;
		ssidb = true; {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'local_sequence_select ');
			tprint(uwriteBuffer);
		};
	} else if (md === pam_binding_sequence_select) {
		ln = 5;
		ssidb = true; {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'binding_sequence_select ');
			tprint(uwriteBuffer);
		};
	}
	tprint_storage(vstr);
	fs = getShort(cd, plus(n, 1)); {
		reset(uwriteBuffer);
		times(uwriteBuffer, ' dblock[');
		times(uwriteBuffer, fs);
		times(uwriteBuffer, ']=');
		tprint(uwriteBuffer);
	}
	if (dstr === storage_ob) {
		reset(uwriteBuffer);
		times(uwriteBuffer, selectOb(db, fs));
		tprint(uwriteBuffer);
	} else if (dstr === storage_int) {
		reset(uwriteBuffer);
		times(uwriteBuffer, selectInt(db, fs));
		tprint(uwriteBuffer);
	}
	if (ln === 5) {
		ss = getShort(cd, plus(n, 3));
		if (ssidb) { {
				reset(uwriteBuffer);
				times(uwriteBuffer, ' dblock[');
				times(uwriteBuffer, ss);
				times(uwriteBuffer, ']=');
				tprint(uwriteBuffer);
			} {
				reset(uwriteBuffer);
				times(uwriteBuffer, selectInt(db, ss));
				tprint(uwriteBuffer);
			};
		} else {
			reset(uwriteBuffer);
			times(uwriteBuffer, '[[');
			times(uwriteBuffer, selectOb(db, ss));
			times(uwriteBuffer, ']]');
			tprint(uwriteBuffer);
		};
	} {
		reset(uwriteBuffer);
		times(uwriteBuffer, ']');
		tprint(uwriteBuffer);
	}
	return plus(n, ln); ; ;
}
function opDisasm(cd, db, pc, numargs) {
	 < unknown Xob type >  : rdfs : Resourceop = selectByte(cd, pc); {
		reset(uwriteBuffer);
		times(uwriteBuffer, opNames[op]);
		times(uwriteBuffer, ' ');
		tprint(uwriteBuffer);
	}
	cp = plus(pc, 1);
	for (i = 0; lessp(i, numargs); plus_plus(i))
		cp = disasmArg(cd, db, cp); ; {
		reset(uwriteBuffer);
		times(uwriteBuffer, '');
		tprint(uwriteBuffer);
		terpri();
	}
	return cp; ; ;
}
function callDisasm(cd, db, pc, asr) {
	 < unknown Xob type >  : rdfs : Resourceif(asr) {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'assign_call ');
		tprint(uwriteBuffer);
	}
	else {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'call ');
		tprint(uwriteBuffer);
	}
	numargs = selectByte(cd, plus(pc, 1));
	if (asr)
		acnt = plus(numargs, 2);
	else
		acnt = plus(numargs, 1);
	cp = plus(pc, 2);
	for (i = 0; lessp(i, acnt); plus_plus(i)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, '    ');
			times(uwriteBuffer, cp);
			times(uwriteBuffer, '  ');
			tprint(uwriteBuffer);
		}
		cp = disasmArg(cd, db, cp);
		terpri(); ;
	};
	return cp; ; ;
}
function sequenceDisasm(cd, db, pc) {
	 < unknown Xob type >  : rdfs : Resource {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'sequence ');
		tprint(uwriteBuffer);
		terpri();
	}
	numargs = plus(getShort(cd, plus(pc, 1)), 1);
	cp = plus(pc, 3); {
		reset(uwriteBuffer);
		times(uwriteBuffer, '   ');
		tprint(uwriteBuffer);
	}
	cp = disasmArg(cd, db, cp); {
		reset(uwriteBuffer);
		times(uwriteBuffer, '');
		tprint(uwriteBuffer);
		terpri();
	}
	for (i = 0; lessp(i, numargs); plus_plus(i)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, '   ');
			tprint(uwriteBuffer);
		}
		cp = disasmArg(cd, db, cp); {
			reset(uwriteBuffer);
			times(uwriteBuffer, '');
			tprint(uwriteBuffer);
			terpri();
		};
	}; {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'end_sequence');
		tprint(uwriteBuffer);
		terpri();
	}
	return cp; ; ;
}
function jump_sDisasm(cd, db, pc) { {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'jump_s ');
		times(uwriteBuffer, plus(plus(getShort(cd, plus(pc, 1)), pc), 1));
		tprint(uwriteBuffer);
		terpri();
	}
	return plus(pc, 3); ; ;
}
function iftrue_sDisasm(cd, db, pc) {
	 < unknown Xob type >  : rdfs : Resource {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'iftrue_s ');
		tprint(uwriteBuffer);
	}
	cp = disasmArg(cd, db, plus(pc, 1)); {
		reset(uwriteBuffer);
		times(uwriteBuffer, ' ');
		times(uwriteBuffer, plus(getShort(cd, cp), cp));
		tprint(uwriteBuffer);
		terpri();
	}
	return plus(cp, 2); ; ;
}
function iffalse_sDisasm(cd, db, pc) {
	 < unknown Xob type >  : rdfs : Resource {
		reset(uwriteBuffer);
		times(uwriteBuffer, 'iffalse_s ');
		tprint(uwriteBuffer);
	}
	cp = disasmArg(cd, db, plus(pc, 1)); {
		reset(uwriteBuffer);
		times(uwriteBuffer, ' ');
		times(uwriteBuffer, plus(getShort(cd, cp), cp));
		tprint(uwriteBuffer);
		terpri();
	}
	return plus(cp, 2); ; ;
}
function disasmStep(cd, db, pc) {
	 < unknown Xob type >  : rdfs : Resourceop = selectByte(cd, pc);
	knd = opKinds[op];
	if (or(op === assign_op, knd === opKind_int_int))
		return opDisasm(cd, db, pc, 2); ;
	if (knd === opKind_int_int_int)
		return opDisasm(cd, db, pc, 3); ;
	if (knd === opKind_call) {
		if (op === call_op)
			return callDisasm(cd, db, pc, false); ;
		else
			return callDisasm(cd, db, pc, true); ; ;
	}
	if (op === integer_float_op)
		return opDisasm(cd, db, pc, 2); ;
	if (op === double_plus_op)
		return opDisasm(cd, db, pc, 3); ;
	if (op === return_op)
		return opDisasm(cd, db, pc, 1); ;
	if (or(op === ob_nul_op, op === ob_nnul_op))
		return opDisasm(cd, db, pc, 2); ;
	if (op === ob_eq_op)
		return opDisasm(cd, db, pc, 3); ;
	if (op === return_void_op)
		return opDisasm(cd, db, pc, 0); ;
	if (op === jump_s_op)
		return jump_sDisasm(cd, db, pc); ;
	if (op === iftrue_s_op)
		return iftrue_sDisasm(cd, db, pc); ;
	if (op === iffalse_s_op)
		return iffalse_sDisasm(cd, db, pc); ;
	if (op === sequence_op)
		return sequenceDisasm(cd, db, pc); ;
	if (or(op === noreturn_increment_op, op === noreturn_decrement_op))
		return opDisasm(cd, db, pc, 1); ;
	if (or(op === integer_increment_op, op === integer_decrement_op))
		return opDisasm(cd, db, pc, 2); ;
	if (or(or(op === seqbyte_get_op, op === seqob_get_op), op === seqint_get_op))
		return opDisasm(cd, db, pc, 3); ;
	if (or(or(op === seqbyte_put_op, op === seqob_put_op), op === seqint_put_op))
		return opDisasm(cd, db, pc, 4); ;
	if (or(or(op === arraychar_get_op, op === arrayob_get_op), op === arrayint_get_op))
		return opDisasm(cd, db, pc, 3); ;
	if (or(or(op === arraychar_put_op, op === arrayob_put_op), op === arrayint_put_op))
		return opDisasm(cd, db, pc, 4); ; {
		beforeError();
		reset(uwriteBuffer);
		times(uwriteBuffer, 'not yet: ');
		times(uwriteBuffer, op);
		times(uwriteBuffer, '=');
		times(uwriteBuffer, opNames[op]);
		tprint(uwriteBuffer);
		terpri();
		afterError();
	};
}
function rawDisasm(cd, db) {
	 < unknown Xob type >  : rdfs : Resourceln = seqLength(cd); {
		reset(uwriteBuffer);
		times(uwriteBuffer, '*** Pcode ***');
		tprint(uwriteBuffer);
		terpri();
	}
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		reset(uwriteBuffer);
		times(uwriteBuffer, i);
		times(uwriteBuffer, ' ');
		times(uwriteBuffer, selectByte(cd, i));
		tprint(uwriteBuffer);
		terpri();
	}; {
		reset(uwriteBuffer);
		times(uwriteBuffer, '** End Pcode ***');
		tprint(uwriteBuffer);
		terpri();
	};
}
var disasm_raw = false;
disasm_raw = false;
function disasm(cd, db) {
	 < unknown Xob type >  : rdfs : Resourceif(disasm_raw)rawDisasm(cd, db);
	ln = seqLength(cd);
	cp = 0;
	 < unknown Xob type >  : fabl : Xwhile; {
		reset(uwriteBuffer);
		times(uwriteBuffer, '***');
		tprint(uwriteBuffer);
		terpri();
	};
}
