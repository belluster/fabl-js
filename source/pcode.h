/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

#define pam_local 0
#define pam_binding_value 2
#define pam_local_field_select 4
#define pam_local_sequence_select 5
#define pam_binding_field_select 6
#define pam_binding_sequence_select 7

/*
These storage types are not yet in use
*/

#define storage_bit 3
#define storage_byte 4
#define storage_short 5

/*

Opcodes:
0 jump_b  [byte:target offset]
1 jump_s  [short:target offset]
2 jump_w  [word:target offset]
3 iftrue_b [arg] [byte:target offset]
4 iftrue_s [arg] [short:target offset]
5 iftrue_w [arg] [word:target offset]
6 iffalse_b [arg] [byte:target offset]
7 iffalse_s [arg] [short:target offset]
8 iffalse_w [arg] [word:target offset]
9 switch_b [short:numcases][byte:case0][byte:case1] .. [byte:casen]
10 switch_s [short:numcases][short:case0][short:case1] .. [short:casen]
11 switch_w [short:numcases][word:case0][word:case1] .. [word:casen]
12 call [byte:numargs] [arg function] [arg0] ...[argn]
13 assign_call [byte numargs]  [arg function] [arg0] .. [argn] [arg dest]

variants of assign
14 assign [arg:source][arg:dest]
15 copyto [arg:source][arg:dest]
16 return [arg:source]

Then, there are opcodes for atomic functions (see below)
for each atomic function, the format is:
opcode src1 {src2} dst


*/



#define jump_s_op 1
#define iftrue_s_op 4
#define iffalse_s_op 7
#define switch_s_op 10
#define call_op 12
#define assign_call_op 13
#define assign_op 14
#define copyto_op 15
#define return_op 16
#define return_void_op 17
#define noop_op 18

#define integer_minus_op 32
//versions which return a value:
#define integer_increment_op 33
#define integer_decrement_op 34
#define integer_plus_op 35
#define integer_difference_op 36
#define integer_quotient_op 37
#define integer_times_op 38
#define integer_equal_op 39
#define integer_lessp_op 40
#define integer_leq_op 41  
//bitwise fellows
#define integer_not_op 42
#define integer_and_op 43
#define integer_or_op 44
#define integer_lshift_op 45
#define integer_float_op 46

#define boole_not_op 47
#define boole_and_op 48
#define boole_or_op 49
#define ob_nul_op 50
#define ob_nnul_op 51
#define sequence_op 52

#define seqob_get_op 53
#define seqint_get_op 54
#define seqbyte_get_op 55

#define seqob_put_op 56
#define seqint_put_op 57
#define seqbyte_put_op 58

//versions which return no value
#define noreturn_increment_op 59
#define noreturn_decrement_op 60

#define ob_eq_op 61


#define double_minus_op 64
#define double_increment_op 65
#define double_decrement_op 66
#define double_plus_op 67
#define double_difference_op 68
#define double_quotient_op 69
#define double_times_op 70
#define double_equal_op 71
#define double_lessp_op 72
#define double_leq_op 73  

#define seqdouble_get_op 74
#define seqdouble_put_op 75


#define arrayob_get_op 76
#define arrayint_get_op 77
#define arraydouble_get_op 78
#define arraybyte_get_op 79

#define arrayob_put_op 80
#define arrayint_put_op 81
#define arraydouble_put_op 82
#define arraybyte_put_op 83

// property selections that return ob,int, double respectively
#define ob_selectproperty_op 84
#define integer_selectproperty_op 85
#define double_selectproperty_op 86

//property set operators whose second args are ob,int, double respectively
#define ob_setproperty_op 87
#define integer_setproperty_op 88
#define double_setproperty_op 89


#define bit_selectproperty_op 90
#define bit_setproperty_op 91

#define ob_mselectproperty_op 94

// the next serveral are pseudo-ops; they are replaced in assembly
// by lessp and le with opposite argument order

#define double_greaterp_op 254
#define double_geq_op 255

#define integer_greaterp_op 256
#define integer_geq_op 257




#define op_kind_int_int 1
#define op_kind_int_int_int 2
#define op_kind_call 3
#define op_kind_int_ob 4



// for double word alignment, it is required that the number of words
// in pm_state_struct preceding the dblock_struct be an even number

typedef struct {
 void *prev_frame1;
 void* stack;
 int size; // size of this frame in bytes
 int pc;
 unsigned return_value_expected:1;
 unsigned return_to_C:1; // this was called from C,not Um
 unsigned unused3:30;
 Arraybyte code;
 Dblock_struct dblock;
} Pm_state_struct,*Pm_state,*Pm_state2;// Pm_state2 for debugging

typedef struct {
 OBJECT_PREAMBLE()
 int size;  // in bytes
 int num_frames;
 Pm_state c_frame; // active frame
 int reserved_for_bits;
}
Pm_stack_struct,*Pm_stack,*Pm_stack2;//Pm_stack2 for debugging



typedef struct {
 ARRAY_PREAMBLE()
 unsigned ann0:8;
 unsigned ann1:8;
 unsigned ann2:8;
 unsigned ann3:8;
 Seqbyte code;
 Dblock dblock;
 int booles;
}
PcodeHetarray_struct,*PcodeHetarray;

/*
// 
typedef struct {
 TINY_PREAMBLE()
 Seqbyte code;
 Dblock dblock;
 int unused3;
} 
Pcode_struct,*Pcode;
*/

#define Pcode_numfields 3


#define pcodeCode(x) ((PcodeHetarray)(((Smallob)x)->values))->code
#define pcodeDblock(x) ((PcodeHetarray)(((Smallob)x)->values))->dblock

// int intoffset; not included in dblocklayout
// ob unused2; // discarded


/*
typedef struct {
 TINY_PREAMBLE()
 unsigned ann4:8; \
 unsigned ann5:8; \
 unsigned ann6:8; \
 unsigned ann7:8;
 int numobs;
 int numints;
 int doubleoffset;
 int numdoubles;
 int wsize; //number of words in dblock
} Dblock_layout_struct,*Dblock_layout;
*/

typedef struct {
 ARRAY_PREAMBLE()
 unsigned ann0:8;
 unsigned ann1:8;
 unsigned ann2:8;
 unsigned ann3:8;
 unsigned ann4:8; \
 unsigned ann5:8; \
 unsigned ann6:8; \
 unsigned ann7:8;
 int numobs;
 int numints;
 int doubleoffset;
 int numdoubles;
 int wsize; //number of words in dblock
} DblockLayoutHetarray_struct,*DblockLayoutHetarray;



extern int opKinds[];
extern int pm_verbose;
extern int pm_trace;
extern char* opNames[];
#define initial_pm_stack_size 100000
extern Pm_stack console_stack2;
extern Smallob pm_new_value_fun;


