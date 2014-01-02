function ______mkToken(dt, ps, bl) {
    var dt;
    var ps;
    var bl;
    var tk;
    tk = __iNew(Token);
    ______obset(tk, Token_datum, dt);
    ______intset(tk, Token_position, ps);
    ______intset(tk, Token_booles, bl);
    return tk;
}

function ___position(x) {
    var x;
    return ____intsel(x, Token_position);
}

function ___datum(x) {
    var x;
    return ____obsel(x, Token_datum);
}

function ___booles(x) {
    var x;
    return ____intsel(x, Token_booles);
}

function _____set_booles(x, b) {
    var x;
    var b;
    ______intset(x, Token_booles, b);
}

function ___isAtom(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isAtom);
}

function _____set_isAtom(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isAtom, b);
}

function ___isId(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isId);
}

function _____set_isId(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isId, b);
}

function ___isPrefix(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isPrefix);
}

function ___isKeyword(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isKeyword);
}

function ___isInfix(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isInfix);
}

function ___isPostfix(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isPostfix);
}

function ___isTerminator(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isTerminator);
}

function ___isString(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isString);
}

function _____set_isString(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isString, b);
}

function ___isNumber(x) {
    var x;
    return ______bitsel(x, Token_booles, Token_isNumber);
}

function _____set_isNumber(x, b) {
    var x;
    var b;
    ________bitset(x, Token_booles, Token_isNumber, b);
}

function ___datum(x) {
    var x;
    return ____obsel(x, Token_datum);
}

function __left_bp(x) {
    var x;
    return __byte2(___booles(x));
}

function ____set_left_bp(x, n) {
    var x;
    var n;
    var b;
    b = ___booles(x);
    _____set_booles(x, ____setByte2(b, n));
}

function __right_bp(x) {
    var x;
    return __byte3(___booles(x));
}

function ____set_right_bp(x, n) {
    var x;
    var n;
    var b;
    b = ___booles(x);
    _____set_booles(x, ____setByte3(b, n));
}

var token_table;

{
    b = ___booles(x);
    _____set_booles(x, ____setByte3(b, n));
}

var t_plus;

var t_times;

var t_semi;

var t_lparen;

var t_rparen;

var t_var;

var t_constant;

var t_function;

var t_lcurly;

var t_rcurly;

var t_rbracket;

var t_lbracket;

var t_dot;

var t_dotdot;

var t_return;

var t_equal;

var t_not_equal;

var t_dequal;

var t_minus;

var t_comma;

var t_if;

var t_else;

var t_assign;

var t_twiddle;

var t_for;

var t_while;

var t_lessp;

var t_greaterp;

var t_leq;

var t_geq;

var t_plus_plus;

var t_minus_minus;

var t_difference;

var t_minus;

var t_and;

var t_or;

var t_nil;

var t_quotient;

var t_colon;

var t_backslash;

var t_not;

var t_by;

var t_restrict;

{
    b = ___booles(x);
    _____set_booles(x, ____setByte3(b, n));
}

var scan_linenumber;

0;

function ____mkToken(s, put_in_table) {
    var s;
    var put_in_table;
    var rs;
    rs = ______mkToken(s, 0, 0);
    if (put_in_table) ________set(token_table, __regarding(s), rs, ob);
    return rs;
}

function __mkToken(s) {
    var s;
    return ____mkToken(s, fabl_false);
}

function ____instantiate(x, ps) {
    var x;
    var ps;
    return ______mkToken(___datum(x), ps, ___booles(x));
}

function ______mkInfixToken(nm, lbp, rbp) {
    var nm;
    var lbp;
    var rbp;
    var rs;
    rs = __mkToken(nm);
    ____set_left_bp(rs, lbp);
    ____set_right_bp(rs, rbp);
    ________bitset(rs, Token_booles, Token_isInfix, 1);
    ________bitset(rs, Token_booles, Token_isOperator, 1);
    return rs;
}

function ____mkPrefixToken(nm, rbp) {
    var nm;
    var rbp;
    var rs;
    rs = __mkToken(nm);
    ____set_right_bp(rs, rbp);
    ________bitset(rs, Token_booles, Token_isPrefix, 1);
    ________bitset(rs, Token_booles, Token_isOperator, 1);
    return rs;
}

function ____mkPostfixToken(nm, lbp) {
    var nm;
    var lbp;
    var rs;
    rs = __mkToken(nm);
    ____set_left_bp(rs, lbp);
    ________bitset(rs, Token_booles, Token_isPostfix, 1);
    ________bitset(rs, Token_booles, Token_isOperator, 1);
    return rs;
}

function __mkKeywordToken(nm) {
    var nm;
    var rs;
    rs = ____mkToken(nm, fabl_true);
    ________bitset(rs, Token_booles, Token_isKeyword, 1);
    return rs;
}

function __mkTerminatorToken(nm) {
    var nm;
    var rs;
    rs = ____mkToken(nm, fabl_true);
    ________bitset(rs, Token_booles, Token_isTerminator, 1);
    return rs;
}

function ____equal(x, y) {
    var x;
    var y;
    return x === y;
}

function ____same(x, y) {
    var x;
    var y;
    if (x && y) return ____um_eq(___datum(x), ___datum(y)) && ___isAtom(x) === ___isAtom(y);
    return fabl_false;
}

var no_new_token;

null;

var eof_token;

null;

function buildTokenTable0() {
    token_table = mkObject();
    t_equal = ______mkInfixToken("equal", 1, 1);
    t_not_equal = ______mkInfixToken("not_equal", 1, 1);
    t_lessp = ______mkInfixToken("lessp", 9, 9);
    t_greaterp = ______mkInfixToken("greaterp", 9, 9);
    t_leq = ______mkInfixToken("leq", 9, 9);
    t_geq = ______mkInfixToken("geq", 9, 9);
    t_twiddle = ______mkInfixToken("twiddle", 13, 13);
    t_plus = ______mkInfixToken("plus", 11, 11);
    t_difference = ______mkInfixToken("difference", 11, 11);
    t_minus = ____mkPrefixToken("unary_minus", 13);
    t_not = ____mkPrefixToken("not", 13);
    t_times = ______mkInfixToken("times", 12, 12);
    t_quotient = ______mkInfixToken("quotient", 12, 12);
    t_dot = ______mkInfixToken("_dot_", 14, 14);
    t_dotdot = ______mkInfixToken("_dotdot_", 14, 14);
    t_plus_plus = ____mkPostfixToken("plus_plus", 13);
    t_minus_minus = ____mkPostfixToken("minus_minus", 13);
    t_and = ______mkInfixToken("and", 4, 4);
    t_or = ______mkInfixToken("or", 3, 3);
    t_colon = ______mkInfixToken("_colon_", 15, 15);
    t_backslash = ______mkInfixToken("_backslash_", 16, 16);
    t_nil = ______mkToken(null, 0, 0);
    _____set_isAtom(t_nil, fabl_true);
    _____set_isId(t_nil, fabl_true);
}

function buildTokenTable() {
    buildTokenTable0();
    t_semi = __mkTerminatorToken(";");
    no_new_token = ______mkToken("_no_new_token_", 0, 0);
    eof_token = ______mkToken("_eof_", 0, 0);
    t_lparen = __mkToken("(");
    ____set_left_bp(t_lparen, 14);
    t_rparen = __mkTerminatorToken(")");
    t_lbracket = __mkToken("[");
    ____set_left_bp(t_lbracket, 14);
    t_rbracket = __mkTerminatorToken("]");
    t_assign = __mkTerminatorToken("assign");
    t_lcurly = __mkTerminatorToken("{");
    t_rcurly = __mkTerminatorToken("}");
    t_comma = __mkTerminatorToken(",");
    t_if = __mkKeywordToken("if");
    t_else = __mkKeywordToken("else");
    t_var = __mkKeywordToken("var");
    t_constant = __mkKeywordToken("constant");
    t_function = __mkKeywordToken("function");
    t_return = __mkKeywordToken("return");
    t_for = __mkKeywordToken("for");
    t_while = __mkKeywordToken("while");
    t_by = __mkKeywordToken("by");
    t_restrict = __mkKeywordToken("restrict");
}

function ____times(s, x) {
    var s;
    var x;
    ____times(s, "[Token:");
    ____times(s, ___datum(x));
    ____times(s, "]");
}

var scanTable;

{
    ____times(s, "[Token:");
    ____times(s, ___datum(x));
    ____times(s, "]");
}

var oneCharTokens;

{
    ____times(s, "[Token:");
    ____times(s, ___datum(x));
    ____times(s, "]");
}

var white_space_id = 1;

var delimiter_id = 2;

var numeral_id = 3;

var letter_id = 4;

function setupScanTable() {
    var h;
    var i;
    scanTable = __mk_emptysequence("<unprintable>");
    ____seqintExpand(scanTable, 256);
    oneCharTokens = __mk_emptysequence("<unprintable>");
    ____seqobExpand(oneCharTokens, 130);
    h = scanTable;
    h[0] = white_space_id;
    for (i = 1; i <= 8; i++) h[i] = delimiter_id;
    h[9] = white_space_id;
    h[10] = white_space_id;
    h[11] = delimiter_id;
    h[12] = white_space_id;
    h[13] = white_space_id;
    for (i = 14; i <= 31; i++) h[i] = delimiter_id;
    h[32] = white_space_id;
    h[33] = delimiter_id;
    h[34] = delimiter_id;
    h[35] = delimiter_id;
    for (i = 36; i <= 38; i++) h[i] = letter_id;
    for (i = 39; i <= 47; i++) h[i] = delimiter_id;
    for (i = 48; i <= 57; i++) h[i] = numeral_id;
    for (i = 58; i <= 63; i++) h[i] = delimiter_id;
    for (i = 64; i <= 90; i++) h[i] = letter_id;
    for (i = 91; i <= 94; i++) h[i] = delimiter_id;
    h[95] = letter_id;
    h[96] = delimiter_id;
    for (i = 97; i <= 122; i++) h[i] = letter_id;
    for (i = 123; i <= 255; i++) h[i] = delimiter_id;
    oneCharTokens[ascii_semicolon] = t_semi;
    oneCharTokens[ascii_plus] = t_plus;
    oneCharTokens[ascii_star] = t_times;
    oneCharTokens[ascii_slash] = t_quotient;
    oneCharTokens[ascii_rparen] = t_rparen;
    oneCharTokens[ascii_lparen] = t_lparen;
    oneCharTokens[ascii_rbracket] = t_rbracket;
    oneCharTokens[ascii_lbracket] = t_lbracket;
    oneCharTokens[ascii_dot] = t_dot;
    oneCharTokens[ascii_rcurly] = t_rcurly;
    oneCharTokens[ascii_lcurly] = t_lcurly;
    oneCharTokens[ascii_equal] = t_assign;
    oneCharTokens[ascii_twiddle] = t_twiddle;
    oneCharTokens[ascii_lessp] = t_lessp;
    oneCharTokens[ascii_greaterp] = t_greaterp;
    oneCharTokens[ascii_comma] = t_comma;
    oneCharTokens[ascii_minus] = t_difference;
    oneCharTokens[ascii_colon] = t_colon;
    oneCharTokens[ascii_backslash] = t_backslash;
    oneCharTokens[ascii_bang] = t_not;
}

var scanning_number_state = 1;

var scanning_id_state = 2;

var scanning_string_state = 3;

var scanning_squote_string;

fabl_false;

scanning_squote_string = fabl_false;

var scanning_new_token_state = 4;

var scanning_comment_state = 5;

var scanning_line_comment_state = 6;

var scanning_string_state = 7;

var scanning_decimal_state = 8;

var c_token_buf = "";

var scan_inbuf = "";

var unscan_buf = "";

var scan_inbuf_length;

0;

var c_scan_p;

0;

function __fill_unscan_buf(ni) {
    var ni;
    var n;
    var i;
    if (scan_inbuf_length < ni) n = __length(scan_inbuf); else n = ni;
    __reset(unscan_buf);
    ____times(unscan_buf, 10);
    for (i = 0; i < ni; i++) ____addChar(unscan_buf, scan_inbuf[scan_inbuf_length - i - 1]);
}

var num_sleep = 50;

var fablPrompt = "fabl>";

var poll_for_input;

fabl_false;

poll_for_input = fabl_false;

var backgroundInterval;

poll_for_input = fabl_false;

var lastBackgroundexec;

poll_for_input = fabl_false;

var noerrDepth = 8;

function grabNextLine() {
    var dn;
    var pc0;
    var ctm;
    var cnd;
    dn = fabl_false;
    __fill_unscan_buf(3);
    cnd = consoleStackDepth();
    if (cnd > noerrDepth) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, cnd);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, fablPrompt);
        __tprint(uwriteBuffer);
    }
    while (!dn) {
        if (!poll_for_input || charAvail() > 0) {
            __readLine(scan_inbuf);
            scan_inbuf_length = __length(scan_inbuf);
            c_scan_p = 0;
            dn = fabl_true;
        } else {
            if (backgroundInterval > 0) {
                ctm = timeMsec();
                if (ctm - lastBackgroundexec > backgroundInterval) {
                    backgroundFun();
                    lastBackgroundexec = ctm;
                }
            }
            __sleepMsec(num_sleep);
        }
    }
}

var scanning_console = fabl_true;

var scanNextChar_verbose;

fabl_false;

function scanNextChar() {
    var rs;
    var isc;
    isc = c_scan_p;
    if (c_scan_p < 0) {
        c_scan_p = c_scan_p + 1;
        if (c_scan_p === 0) return 10; else rs = unscan_buf[-(c_scan_p + 1)];
        if (scanNextChar_verbose) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "1 c_scan_p = ");
            ____times(uwriteBuffer, isc);
            ____times(uwriteBuffer, " nc = ");
            ____times(uwriteBuffer, rs);
            __tprint(uwriteBuffer);
            terpri();
        }
        if (rs === 10) scan_linenumber++;
        return rs;
    }
    if (c_scan_p >= scan_inbuf_length) {
        if (scanning_console) {
            grabNextLine();
            if (scanNextChar_verbose) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "2 c_scan_p = ");
                ____times(uwriteBuffer, isc);
                ____times(uwriteBuffer, " nc = ");
                ____times(uwriteBuffer, 10);
                __tprint(uwriteBuffer);
                terpri();
            }
            scan_linenumber++;
            return 10;
        } else {
            c_scan_p = c_scan_p + 1;
            if (scanNextChar_verbose) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "3 c_scan_p = ");
                ____times(uwriteBuffer, isc);
                ____times(uwriteBuffer, " nc = ");
                ____times(uwriteBuffer, -1);
                __tprint(uwriteBuffer);
                terpri();
            }
            return -1;
        }
    }
    rs = ____land(scan_inbuf[c_scan_p], 255);
    if (scanNextChar_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "4 c_scan_p = ");
        ____times(uwriteBuffer, isc);
        ____times(uwriteBuffer, " nc = ");
        ____times(uwriteBuffer, rs);
        __tprint(uwriteBuffer);
        terpri();
    }
    c_scan_p = c_scan_p + 1;
    if (rs === 10) scan_linenumber++;
    return rs;
}

function unscanChar() {
    c_scan_p = c_scan_p - 1;
    if (c_scan_p < 0 && -c_scan_p > __length(unscan_buf)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "no character to unscan");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (c_scan_p >= 0 && c_scan_p < scan_inbuf_length) {
        if (scan_inbuf[c_scan_p] === 10) scan_linenumber--;
    }
}

function ______matches(buf, p, s) {
    var buf;
    var p;
    var s;
    var cc;
    var i;
    var ln;
    i = 0;
    ln = __length(s);
    if (p + ln > __length(buf)) return fabl_false;
    while (i < ln) {
        cc = buf[p + i];
        if (cc === ____select(s, i)) i++; else return fabl_false;
    }
    return fabl_true;
}

var c_scan_state = scanning_new_token_state;

function ____toToken(s, ps) {
    var s;
    var ps;
    var ln;
    var c;
    var tk;
    var rs;
    var nm;
    ln = __length(s);
    if (ln === 1) {
        c = s[0];
        if (c < 130) {
            tk = oneCharTokens[c];
            if (tk) {
                __reset(s);
                return ____instantiate(tk, ps - ln);
            }
        }
    }
    nm = __toString(s);
    __reset(s);
    if (!nm) return ____instantiate(t_nil, ps - 3);
    tk = ____get(token_table, __regarding(nm));
    if (tk) return ____instantiate(tk, ps - ln);
    rs = ______mkToken(nm, ps - ln, 0);
    _____set_isAtom(rs, fabl_true);
    _____set_isId(rs, fabl_true);
    return rs;
}

function ______toStringToken(s, ps, isSquote) {
    var s;
    var ps;
    var isSquote;
    var ln;
    var rs;
    var sb;
    ln = __length(s);
    if (isSquote) rs = ______mkToken(__toString(s), ps - ln - 1, 0); else {
        sb = "";
        ____times(sb, s);
        rs = ______mkToken(sb, ps - ln - 1, 0);
    }
    __reset(s);
    _____set_isAtom(rs, fabl_true);
    _____set_isString(rs, fabl_true);
    return rs;
}

function ____intToToken(s, ps) {
    var s;
    var ps;
    var nm;
    var rs;
    nm = __integer_to_ob(__toInt(s));
    __reset(s);
    rs = ______mkToken(nm, ps - __length(s), 0);
    _____set_isAtom(rs, fabl_true);
    _____set_isNumber(rs, fabl_true);
    return rs;
}

function ____double_toToken(s, ps) {
    var s;
    var ps;
    var nm;
    var rs;
    nm = __toOb(__toDouble(s));
    __reset(s);
    rs = ______mkToken(nm, ps - __length(s), 0);
    ________bitset(rs, Token_booles, Token_isAtom, 1);
    ________bitset(rs, Token_booles, Token_isNumber, 1);
    return rs;
}

function scanBeginComment() {
    var nc;
    var c2;
    nc = scanNextChar();
    if (nc === ascii_slash) {
        c2 = scanNextChar();
        if (c2 === ascii_star) {
            c_scan_state = scanning_comment_state;
            return fabl_true;
        } else if (c2 === ascii_slash) {
            c_scan_state = scanning_line_comment_state;
            return fabl_true;
        }
        unscanChar();
    }
    unscanChar();
    return fabl_false;
}

function unscanTwoChars() {
    unscanChar();
    unscanChar();
}

function __scanBinaryToken(ps) {
    var ps;
    var sc0;
    var sc1;
    var us2;
    sc0 = scanNextChar();
    us2 = fabl_false;
    if (sc0 === ascii_equal) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_equal, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_bang) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_not_equal, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_plus) {
        sc1 = scanNextChar();
        if (sc1 === ascii_plus) return ____instantiate(t_plus_plus, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_minus) {
        sc1 = scanNextChar();
        if (sc1 === ascii_minus) return ____instantiate(t_minus_minus, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_ampersand) {
        sc1 = scanNextChar();
        if (sc1 === ascii_ampersand) return ____instantiate(t_and, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_vbar) {
        sc1 = scanNextChar();
        if (sc1 === ascii_vbar) return ____instantiate(t_or, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_lessp) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_leq, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_greaterp) {
        sc1 = scanNextChar();
        if (sc1 === ascii_equal) return ____instantiate(t_geq, ps);
        us2 = fabl_true;
    } else if (sc0 === ascii_dot) {
        sc1 = scanNextChar();
        if (sc1 === ascii_dot) return ____instantiate(t_dotdot, ps);
        us2 = fabl_true;
    }
    unscanChar();
    if (us2) unscanChar();
    return null;
}

var scanEscape = -1;

var scanHexBuf = "";

function scanTokenStep() {
    var nc;
    var nnc;
    var k;
    var rs;
    if (c_scan_state === scanning_new_token_state) {
        if (scanBeginComment()) return no_new_token;
        rs = __scanBinaryToken(c_scan_p);
        if (rs) return rs;
        nc = scanNextChar();
        if (nc === ascii_squote) {
            c_scan_state = scanning_string_state;
            scanning_squote_string = fabl_true;
            return no_new_token;
        }
        if (nc === ascii_dquote) {
            c_scan_state = scanning_string_state;
            scanning_squote_string = fabl_false;
            return no_new_token;
        }
        if (nc < 0) return eof_token;
        k = scanTable[nc];
        if (k === delimiter_id) {
            ____addChar(c_token_buf, nc);
            return ____toToken(c_token_buf, c_scan_p);
        }
        if (k === white_space_id) return no_new_token;
        if (k === letter_id) {
            ____addChar(c_token_buf, nc);
            c_scan_state = scanning_id_state;
            return no_new_token;
        }
        if (k === numeral_id) {
            ____addChar(c_token_buf, nc);
            c_scan_state = scanning_number_state;
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_id_state) {
        nc = scanNextChar();
        if (nc < 0) {
            c_scan_state = scanning_new_token_state;
            return ____toToken(c_token_buf, c_scan_p);
        }
        k = scanTable[nc];
        if (k === delimiter_id || k === white_space_id) {
            rs = ____toToken(c_token_buf, c_scan_p);
            c_scan_state = scanning_new_token_state;
            unscanChar();
            return rs;
        }
        if (k === letter_id || k === numeral_id) {
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_number_state) {
        nc = scanNextChar();
        if (nc < 0) {
            c_scan_state = scanning_new_token_state;
            return ____intToToken(c_token_buf, c_scan_p);
        }
        if (nc === ascii_dot) {
            c_scan_state = scanning_decimal_state;
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
        k = scanTable[nc];
        if (k === delimiter_id || k === white_space_id || k === letter_id) {
            rs = ____intToToken(c_token_buf, c_scan_p);
            c_scan_state = scanning_new_token_state;
            unscanChar();
            return rs;
        }
        if (k === numeral_id) {
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_decimal_state) {
        nc = scanNextChar();
        if (nc < 0) {
            c_scan_state = scanning_new_token_state;
            return ____double_toToken(c_token_buf, c_scan_p);
        }
        k = scanTable[nc];
        if (k === delimiter_id || k === white_space_id || k === letter_id) {
            rs = ____double_toToken(c_token_buf, c_scan_p);
            c_scan_state = scanning_new_token_state;
            unscanChar();
            return rs;
        }
        if (k === numeral_id) {
            ____addChar(c_token_buf, nc);
            return no_new_token;
        }
    }
    if (c_scan_state === scanning_comment_state) {
        nc = scanNextChar();
        if (nc < 0) return eof_token;
        if (nc === ascii_star) {
            nc = scanNextChar();
            if (nc === ascii_slash) c_scan_state = scanning_new_token_state; else if (nc === ascii_star) unscanChar();
        }
        return no_new_token;
    }
    if (c_scan_state === scanning_line_comment_state) {
        nc = scanNextChar();
        if (nc < 0) return eof_token;
        if (nc === ascii_lf) c_scan_state = scanning_new_token_state;
        return no_new_token;
    }
    if (c_scan_state === scanning_string_state) {
        nc = scanNextChar();
        if (nc < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "String not terminated before eof");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        if (nc === ascii_backslash && !scanning_squote_string) {
            nnc = scanNextChar();
            if (nnc < 0) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "String not terminated before eof");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            if (nnc === ascii_lcurly) {
                ____addChar(c_token_buf, 1);
                nc = nnc;
            } else if (nnc === ascii_n) nc = 10; else if (nnc === ascii_r) nc = 13; else if (nnc === ascii_t) nc = 9; else if (nnc === ascii_x) {
                __reset(scanHexBuf);
                ____addChar(scanHexBuf, scanNextChar());
                ____addChar(scanHexBuf, scanNextChar());
                nc = __hex(scanHexBuf);
            } else if (nnc === ascii_u) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Unicode escape sequence: not yet");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            } else nc = nnc;
        } else if (nc === ascii_squote && scanning_squote_string || nc === ascii_dquote && !scanning_squote_string) {
            c_scan_state = scanning_new_token_state;
            return ______toStringToken(c_token_buf, c_scan_p, scanning_squote_string);
        }
        ____addChar(c_token_buf, nc);
        if (nc === 1 && !scanning_squote_string) ____addChar(c_token_buf, nc);
        return no_new_token;
    }
}

var unscanned_token;

null;

var last_token;

null;

function scan_reset0() {
    scan_inbuf_length = __length(scan_inbuf);
    c_scan_p = 0;
    c_scan_state = scanning_new_token_state;
    __reset(c_token_buf);
    __reset(unscan_buf);
    unscanned_token = null;
    last_token = null;
}

var echoMode;

fabl_false;

var echoBegin;

0;

function __scan_init(s) {
    var s;
    __reset(scan_inbuf);
    ____times(scan_inbuf, s);
    scan_reset0();
    scanning_console = fabl_false;
    scan_linenumber = 0;
    echoBegin = 0;
}

function scan_reset() {
    __reset(scan_inbuf);
    scan_reset0();
}

function init_scan() {
    c_token_buf = "";
    scan_inbuf = "";
    unscan_buf = "   ";
    buildTokenTable();
    setupScanTable();
    __scan_init("");
    fablPrompt = "fabl>>";
}

var scan_verbose;

fabl_false;

scan_verbose = fabl_false;

function unscanToken() {
    if (!last_token) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No token to unscan");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    unscanned_token = last_token;
    last_token = null;
}

function scanToken() {
    var rs;
    if (unscanned_token) {
        last_token = unscanned_token;
        unscanned_token = null;
        rs = last_token;
        return rs;
    }
    rs = no_new_token;
    while (____um_eq(rs, no_new_token)) rs = scanTokenStep();
    last_token = rs;
    return rs;
}

function __isId(tk) {
    var tk;
    return ___isAtom(tk) && !___isNumber(tk);
}

function resetForNewToken() {
    __reset(unscan_buf);
    __reset(c_token_buf);
    c_scan_state = scanning_new_token_state;
}

function extractScannerState() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqobAdd(rs, scan_inbuf);
    ____seqobAdd(rs, __integer_to_ob(c_scan_p));
    ____seqobAdd(rs, __integer_to_ob(scan_linenumber));
    ____seqobAdd(rs, last_token);
    ____seqobAdd(rs, __integer_to_ob(scanning_console));
    ____seqobAdd(rs, __integer_to_ob(echoBegin));
    return rs;
}

function __restoreScannerState(st) {
    var st;
    scan_inbuf = st[0];
    c_scan_p = __ob_to_integer(st[1]);
    scan_linenumber = __ob_to_integer(st[2]);
    last_token = st[3];
    scanning_console = __ob_to_integer(st[4]);
    echoBegin = __ob_to_integer(st[5]);
    resetForNewToken();
    scan_inbuf_length = __length(scan_inbuf);
}

var flushBuf = "";

function flushConsole() {
    __reset(flushBuf);
    while (charAvail() > 0) __readLine(flushBuf);
}