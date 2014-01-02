var null_pcode_arg = -1;

var pam_local;

0;

var pam_local_eob_select = 1;

var pam_binding_value = 2;

var pam_binding_eob_select = 3;

var pam_local_field_select = 4;

var pam_local_sequence_select = 5;

var pam_binding_field_select = 6;

var pam_binding_sequence_select = 7;

var storage_bit = 3;

var storage_byte = 4;

var storage_short = 5;

var jump_s_op = 1;

var iftrue_s_op = 4;

var iffalse_s_op = 7;

var switch_s_op = 10;

var call_op = 12;

var assign_call_op = 13;

var assign_op = 14;

var copyto_op = 15;

var return_op = 16;

var return_void_op = 17;

var noop_op = 18;

var integer_minus_op = 32;

var integer_increment_op = 33;

var integer_decrement_op = 34;

var integer_plus_op = 35;

var integer_difference_op = 36;

var integer_quotient_op = 37;

var integer_times_op = 38;

var integer_equal_op = 39;

var integer_lessp_op = 40;

var integer_leq_op = 41;

var integer_not_op = 42;

var integer_and_op = 43;

var integer_or_op = 44;

var integer_lshift_op = 45;

var integer_float_op = 46;

var boole_not_op = 47;

var boole_and_op = 48;

var boole_or_op = 49;

var ob_nul_op = 50;

var ob_nnul_op = 51;

var sequence_op = 52;

var seqob_get_op = 53;

var seqint_get_op = 54;

var seqbyte_get_op = 55;

var seqob_put_op = 56;

var seqint_put_op = 57;

var seqbyte_put_op = 58;

var noreturn_increment_op = 59;

var noreturn_decrement_op = 60;

var ob_eq_op = 61;

var double_minus_op = 64;

var double_increment_op = 65;

var double_decrement_op = 66;

var double_plus_op = 67;

var double_difference_op = 68;

var double_quotient_op = 69;

var double_times_op = 70;

var double_equal_op = 71;

var double_lessp_op = 72;

var double_leq_op = 73;

var seqdouble_get_op = 74;

var seqdouble_put_op = 75;

var arrayob_get_op = 76;

var arrayint_get_op = 77;

var arraydouble_get_op = 78;

var arraychar_get_op = 79;

var arrayob_put_op = 80;

var arrayint_put_op = 81;

var arraydouble_put_op = 82;

var arraychar_put_op = 83;

var ob_selectproperty_op = 84;

var integer_selectproperty_op = 85;

var double_selectproperty_op = 86;

var ob_setproperty_op = 87;

var integer_setproperty_op = 88;

var double_setproperty_op = 89;

var bit_selectproperty_op = 90;

var bit_setproperty_op = 91;

var stringbuf_get_op = 92;

var stringbuf_put_op = 93;

var ob_mselectproperty_op = 94;

var double_greaterp_op = 254;

var double_geq_op = 255;

var integer_greaterp_op = 256;

var integer_geq_op = 257;

var opKinds = __mk_emptysequence("<unprintable>");

var opNames = __mk_emptysequence("<unprintable>");

var opKind_int_int = 1;

var opKind_int_int_int = 2;

var opKind_call = 3;

var opKind_int_ob = 4;

function initOpKinds() {
    var i;
    ____seqintExpand(opKinds, 100);
    opKinds[integer_minus_op] = opKind_int_int;
    opKinds[integer_not_op] = opKind_int_int;
    opKinds[boole_not_op] = opKind_int_int;
    for (i = 35; i <= 41; i++) opKinds[i] = opKind_int_int_int;
    for (i = 43; i <= 45; i++) opKinds[i] = opKind_int_int_int;
    for (i = 48; i <= 49; i++) opKinds[i] = opKind_int_int_int;
    opKinds[call_op] = opKind_call;
    opKinds[assign_call_op] = opKind_call;
    opKinds[ob_nul_op] = opKind_int_ob;
    opKinds[ob_nnul_op] = opKind_int_ob;
}

initOpKinds();

function initOpNames() {
    ____seqobExpand(opNames, 100);
    opNames[jump_s_op] = "jump_s";
    opNames[iftrue_s_op] = "iftrue_s";
    opNames[iffalse_s_op] = "iffalse_s";
    opNames[switch_s_op] = "switch_s";
    opNames[call_op] = "call";
    opNames[assign_call_op] = "assign_call";
    opNames[assign_op] = "assign";
    opNames[copyto_op] = "copyto";
    opNames[return_op] = "return";
    opNames[return_void_op] = "return_void";
    opNames[noop_op] = "noop";
    opNames[integer_minus_op] = "minus";
    opNames[integer_increment_op] = "increment";
    opNames[integer_decrement_op] = "decrement";
    opNames[integer_plus_op] = "plus";
    opNames[integer_difference_op] = "difference";
    opNames[integer_quotient_op] = "quotient";
    opNames[integer_times_op] = "times";
    opNames[integer_equal_op] = "equal";
    opNames[integer_lessp_op] = "lessp";
    opNames[integer_leq_op] = "leq";
    opNames[integer_not_op] = "lnot";
    opNames[integer_and_op] = "land";
    opNames[integer_or_op] = "lor";
    opNames[integer_lshift_op] = "lshift";
    opNames[integer_float_op] = "float";
    opNames[boole_not_op] = "not";
    opNames[boole_and_op] = "and";
    opNames[boole_or_op] = "or";
    opNames[ob_nul_op] = "nul";
    opNames[ob_nnul_op] = "nnul";
    opNames[ob_eq_op] = "eq";
    opNames[sequence_op] = "sequence";
    opNames[seqob_get_op] = "seqob_get";
    opNames[seqint_get_op] = "seqint_get";
    opNames[seqbyte_get_op] = "seqbyte_get";
    opNames[seqint_put_op] = "seqint_put";
    opNames[seqob_put_op] = "seqob_put";
    opNames[seqbyte_put_op] = "seqbyte_put";
    opNames[arrayob_get_op] = "arrayob_get";
    opNames[arrayint_get_op] = "arrayint_get";
    opNames[arraychar_get_op] = "arraychar_get";
    opNames[arrayint_put_op] = "arrayint_put";
    opNames[arrayob_put_op] = "arrayob_put";
    opNames[arraychar_put_op] = "arraychar_put";
    opNames[double_plus_op] = "double_plus";
    opNames[double_difference_op] = "double_difference";
    opNames[double_quotient_op] = "double_quotient";
    opNames[double_times_op] = "double_times";
    opNames[double_equal_op] = "double_equal";
    opNames[double_lessp_op] = "double_lessp";
    opNames[double_leq_op] = "double_leq";
    opNames[noreturn_increment_op] = "increment_noreturn";
    opNames[noreturn_decrement_op] = "decrement_noreturn";
    opNames[ob_selectproperty_op] = "ob_selectproperty_op";
    opNames[integer_selectproperty_op] = "integer_selectproperty_op";
    opNames[double_selectproperty_op] = "double_selectproperty_op";
    opNames[ob_setproperty_op] = "ob_setproperty_op";
    opNames[integer_setproperty_op] = "integer_setproperty_op";
    opNames[double_setproperty_op] = "double_setproperty_op";
}

initOpNames();