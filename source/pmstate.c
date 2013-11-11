/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

// for evaluation of top level commands
#include "includes.h"




Pm_state2 alloc_Pm_state(Pm_stack2 stk,Dblock db,Seqbyte code)
  {
  Pm_state2 nst;
  ob_push2(db,code);
  nst = Pm_stack_push(stk,db,0);
  nst -> code = code->data;
  nst -> pc = 0;
  ob_popn(2);
  return nst;
}



Pm_state2 top_alloc_Pm_state(Dblock db,Seqbyte code)
  {
  Pm_stack2 stk;
  if (!console_stack2) 
  {
	  console_stack2 = alloc_Pm_stack(initial_pm_stack_size);
	  stk = console_stack2;
  }
  else
      stk = alloc_Pm_stack(initial_pm_stack_size);//remember: allocs in tenured heap
  return alloc_Pm_state(stk,db,code);
}




Pm_stack2 console_stack2 = (Pm_stack2)0;

void reset_console_stack()
{
	if (console_stack2) Pm_stack_reset(console_stack2);
}


Pm_state2 console_alloc_Pm_state(Dblock db,Seqbyte code)
  {
  Pm_stack2 stk;
  if (!console_stack2) console_stack2 = alloc_Pm_stack(initial_pm_stack_size);
  return alloc_Pm_state(console_stack2,db,code);
}


Pm_state2 top_mk_Pm_state(Dblock db,Seqbyte code)
  {
	return console_alloc_Pm_state(db,code);
}

