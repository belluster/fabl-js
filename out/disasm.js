function ____getShort(cd, x) {
    var cd;
    var x;
    return ____lor(____selectByte(cd, x), ____lshift(____selectByte(cd, x + 1), 8));
}

function ______disasmArg(cd, db, n) {
    var cd;
    var db;
    var n;
    var knd;
    var md;
    var vstr;
    var dstr;
    var ln;
    var fs;
    var ss;
    var ssidb;
    knd = ____selectByte(cd, n);
    md = ______selectBits(knd, 5, 7);
    vstr = ______selectBits(knd, 0, 4);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "[");
        __tprint(uwriteBuffer);
    }
    dstr = storage_ob;
    ssidb = fabl_false;
    if (md === pam_local) {
        ln = 3;
        dstr = vstr;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "local ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_binding_value) {
        ln = 3;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "binding_value ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_local_field_select) {
        ln = 5;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "local_field_select ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_binding_field_select) {
        ln = 5;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "binding_field_select ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_local_sequence_select) {
        ln = 5;
        ssidb = fabl_true;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "local_sequence_select ");
            __tprint(uwriteBuffer);
        }
    } else if (md === pam_binding_sequence_select) {
        ln = 5;
        ssidb = fabl_true;
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "binding_sequence_select ");
            __tprint(uwriteBuffer);
        }
    }
    __tprint_storage(vstr);
    fs = ____getShort(cd, n + 1);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, " dblock[");
        ____times(uwriteBuffer, fs);
        ____times(uwriteBuffer, "]=");
        __tprint(uwriteBuffer);
    }
    if (dstr === storage_ob) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, ____selectOb(db, fs));
        __tprint(uwriteBuffer);
    } else if (dstr === storage_int) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, ____selectInt(db, fs));
        __tprint(uwriteBuffer);
    }
    if (ln === 5) {
        ss = ____getShort(cd, n + 3);
        if (ssidb) {
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, " dblock[");
                ____times(uwriteBuffer, ss);
                ____times(uwriteBuffer, "]=");
                __tprint(uwriteBuffer);
            }
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, ____selectInt(db, ss));
                __tprint(uwriteBuffer);
            }
        } else {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "[[");
            ____times(uwriteBuffer, ____selectOb(db, ss));
            ____times(uwriteBuffer, "]]");
            __tprint(uwriteBuffer);
        }
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "]");
        __tprint(uwriteBuffer);
    }
    return n + ln;
}

function ________opDisasm(cd, db, pc, numargs) {
    var cd;
    var db;
    var pc;
    var numargs;
    var op;
    var cp;
    var i;
    op = ____selectByte(cd, pc);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, opNames[op]);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    cp = pc + 1;
    for (i = 0; i < numargs; i++) cp = ______disasmArg(cd, db, cp);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "");
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp;
}

function ________callDisasm(cd, db, pc, asr) {
    var cd;
    var db;
    var pc;
    var asr;
    var cp;
    var numargs;
    var acnt;
    var i;
    if (asr) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "assign_call ");
        __tprint(uwriteBuffer);
    } else {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "call ");
        __tprint(uwriteBuffer);
    }
    numargs = ____selectByte(cd, pc + 1);
    if (asr) acnt = numargs + 2; else acnt = numargs + 1;
    cp = pc + 2;
    for (i = 0; i < acnt; i++) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "    ");
            ____times(uwriteBuffer, cp);
            ____times(uwriteBuffer, "  ");
            __tprint(uwriteBuffer);
        }
        cp = ______disasmArg(cd, db, cp);
        terpri();
    }
    return cp;
}

function ______sequenceDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var cp;
    var numargs;
    var i;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "sequence ");
        __tprint(uwriteBuffer);
        terpri();
    }
    numargs = ____getShort(cd, pc + 1) + 1;
    cp = pc + 3;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "   ");
        __tprint(uwriteBuffer);
    }
    cp = ______disasmArg(cd, db, cp);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "");
        __tprint(uwriteBuffer);
        terpri();
    }
    for (i = 0; i < numargs; i++) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "   ");
            __tprint(uwriteBuffer);
        }
        cp = ______disasmArg(cd, db, cp);
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "");
            __tprint(uwriteBuffer);
            terpri();
        }
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "end_sequence");
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp;
}

function ______jump_sDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "jump_s ");
        ____times(uwriteBuffer, ____getShort(cd, pc + 1) + pc + 1);
        __tprint(uwriteBuffer);
        terpri();
    }
    return pc + 3;
}

function ______iftrue_sDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var cp;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "iftrue_s ");
        __tprint(uwriteBuffer);
    }
    cp = ______disasmArg(cd, db, pc + 1);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, " ");
        ____times(uwriteBuffer, ____getShort(cd, cp) + cp);
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp + 2;
}

function ______iffalse_sDisasm(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var cp;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "iffalse_s ");
        __tprint(uwriteBuffer);
    }
    cp = ______disasmArg(cd, db, pc + 1);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, " ");
        ____times(uwriteBuffer, ____getShort(cd, cp) + cp);
        __tprint(uwriteBuffer);
        terpri();
    }
    return cp + 2;
}

function ______disasmStep(cd, db, pc) {
    var cd;
    var db;
    var pc;
    var knd;
    var op;
    op = ____selectByte(cd, pc);
    knd = opKinds[op];
    if (op === assign_op || knd === opKind_int_int) return ________opDisasm(cd, db, pc, 2);
    if (knd === opKind_int_int_int) return ________opDisasm(cd, db, pc, 3);
    if (knd === opKind_call) {
        if (op === call_op) return ________callDisasm(cd, db, pc, fabl_false); else return ________callDisasm(cd, db, pc, fabl_true);
    }
    if (op === integer_float_op) return ________opDisasm(cd, db, pc, 2);
    if (op === double_plus_op) return ________opDisasm(cd, db, pc, 3);
    if (op === return_op) return ________opDisasm(cd, db, pc, 1);
    if (op === ob_nul_op || op === ob_nnul_op) return ________opDisasm(cd, db, pc, 2);
    if (op === ob_eq_op) return ________opDisasm(cd, db, pc, 3);
    if (op === return_void_op) return ________opDisasm(cd, db, pc, 0);
    if (op === jump_s_op) return ______jump_sDisasm(cd, db, pc);
    if (op === iftrue_s_op) return ______iftrue_sDisasm(cd, db, pc);
    if (op === iffalse_s_op) return ______iffalse_sDisasm(cd, db, pc);
    if (op === sequence_op) return ______sequenceDisasm(cd, db, pc);
    if (op === noreturn_increment_op || op === noreturn_decrement_op) return ________opDisasm(cd, db, pc, 1);
    if (op === integer_increment_op || op === integer_decrement_op) return ________opDisasm(cd, db, pc, 2);
    if (op === seqbyte_get_op || op === seqob_get_op || op === seqint_get_op) return ________opDisasm(cd, db, pc, 3);
    if (op === seqbyte_put_op || op === seqob_put_op || op === seqint_put_op) return ________opDisasm(cd, db, pc, 4);
    if (op === arraychar_get_op || op === arrayob_get_op || op === arrayint_get_op) return ________opDisasm(cd, db, pc, 3);
    if (op === arraychar_put_op || op === arrayob_put_op || op === arrayint_put_op) return ________opDisasm(cd, db, pc, 4);
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "not yet: ");
        ____times(uwriteBuffer, op);
        ____times(uwriteBuffer, "=");
        ____times(uwriteBuffer, opNames[op]);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____rawDisasm(cd, db) {
    var cd;
    var db;
    var ln;
    var i;
    ln = __seqLength(cd);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "*** Pcode ***");
        __tprint(uwriteBuffer);
        terpri();
    }
    for (i = 0; i < ln; i++) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, i);
        ____times(uwriteBuffer, " ");
        ____times(uwriteBuffer, ____selectByte(cd, i));
        __tprint(uwriteBuffer);
        terpri();
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "** End Pcode ***");
        __tprint(uwriteBuffer);
        terpri();
    }
}

var disasm_raw;

fabl_false;

disasm_raw = fabl_false;

function ____disasm(cd, db) {
    var cd;
    var db;
    var ln;
    var cp;
    if (disasm_raw) ____rawDisasm(cd, db);
    ln = __seqLength(cd);
    cp = 0;
    while (cp < ln) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, cp);
            ____times(uwriteBuffer, ": ");
            __tprint(uwriteBuffer);
        }
        cp = ______disasmStep(cd, db, cp);
        terpri();
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "***");
        __tprint(uwriteBuffer);
        terpri();
    }
}