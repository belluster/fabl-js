/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review


typedef int (*int_fcnptr)();
typedef double (*double_fcnptr)();

Seqob mk_Seqob();
ob int_to_ob();
ob double_to_ob();
ob selectOb();
ob bindingValue();
Seqint mk_Seqint();
Seqdouble mk_Seqdouble();
ob Seqob_select();
ob fgetOb();
ob mgetOb();

Pm_state2 console_alloc_Pm_state();
Pm_state2 Pm_stack_push();
Pm_state2 pm_call_op();
Pm_state2 Pm_stack_pop();
Hashtable mk_StringSet();

double literalToDouble();
double StringBuf_to_double();
double Seqbyte_to_double();

double Smallob_fgetDouble();
double Hetarray_fgetDouble();
