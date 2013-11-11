/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

#include "includes.h"


int opKinds[70];
char* opNames[70];


void init_opKinds()
  {
  int i;
  opKinds[integer_minus_op] = op_kind_int_int;

  opKinds[integer_not_op] = op_kind_int_int;
  opKinds[boole_not_op] = op_kind_int_int;
  for (i = 35;i<=41;i++)
      opKinds[i] = op_kind_int_int_int;
  for (i = 43;i<=45;i++)
      opKinds[i] = op_kind_int_int_int;
  for (i = 48;i<=49;i++)
      opKinds[i] = op_kind_int_int_int;
  opKinds[call_op] = op_kind_call;
  opKinds[assign_call_op] = op_kind_call;
  opKinds[ob_nul_op] = op_kind_int_ob;
  opKinds[ob_nnul_op] = op_kind_int_ob;
  }



void init_opNames()
  {
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
//bitwise fellows
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
   opNames[sequence_op] = "sequence";

  opNames[seqob_get_op] = "seqob_get";
  opNames[seqint_get_op] = "seqint_get";
  opNames[seqbyte_get_op] = "seqbyte_get";
  opNames[seqint_put_op] = "seqint_put";
  opNames[seqob_put_op] = "seqob_put";
  opNames[seqbyte_put_op] = "seqbyte_put";

  opNames[noreturn_increment_op] = "increment_noreturn";
  opNames[noreturn_decrement_op] = "decrement_noreturn";
  }

void initPm()
{
	init_opKinds();
	init_opNames();
}

