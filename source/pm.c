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

Smallob pm_new_value_fun;

Pm_state2 top_pm_state; 
Pm_state2 c_pm_state;
int pm_verbose = 0;//remove
int pm_returned = 0;
int pm_return_storage = 0;
int pm_disasm = 0; // disassembles while running
int pm_trace = 0;

int int_call_array[32];
ob* ob_call_array = (ob*)int_call_array;
double double_call_array[16];
ob ob_call_return_value;
int int_call_return_value;
double double_call_return_value;
int pm_return_storage;
int pm_step_count = 0;

ob pm_apply();



int  get_short(Arraybyte s,int x)
{
	int b0,b1,rs;
	b0 = ((char*)s)[x+Array_preamble_size] & 255;
	b1 = ((char*)s)[x+Array_preamble_size+1];
	rs = b0 | (b1<<8);
	return rs;
}


#define byte1_mask 65280
void put_short(string s,int n,int x)
   {
	char* sb;
	sb = Arraybyte_contents(s);
   sb[n] = x & 255;
   sb[n+1] = (x & byte1_mask) >> 8;
   }




double double_um_c_apply();
double selectDouble();





void dispatch_call(Smallob fn,int strg,int numints,int numdoubles)
  {
  int_fcnptr cfn;int obstack_before;FunctionHetarray fnh;
   obstack_before = ob_stack_ptr;
 fnh = (FunctionHetarray)(fn->values);//debug

  cfn = functionCimp(fn);
  if (cfn == 0) UM_ERROR("no C function pointer");
  if ((strg == storage_int))
     int_call_return_value = int_um_c_apply(cfn,numints,numdoubles,int_call_array,double_call_array);
  else
  if ((strg == storage_ob))
     ob_call_return_value = 
	    (ob)int_um_c_apply(cfn,numints,numdoubles,int_call_array,double_call_array);
  else
  if ((strg == storage_double))
     double_call_return_value = 
	    double_um_c_apply(cfn,numints,numdoubles,int_call_array,double_call_array);
  else
      void_um_c_apply(cfn,numints,numdoubles,int_call_array,double_call_array);
  if (obstack_before != ob_stack_ptr)
  {
	  Function_print(fn);
	  printf("\n***stack pointer before,after  %d %d\n",obstack_before,ob_stack_ptr);
	  UM_ERROR("INTERNAL ERROR: OBSTACK MISMATCH");
  }
  }

int enable_apply_pcode = 1;


ob Function_applyn_ob(Smallob fn)
   {
   int_fcnptr cfn;Seqob sq;ob rs;
   if (enable_apply_pcode && (functionImplementation(fn)))
      {
	   ob_push(fn);
	  sq = mk_Seqob(0);
	  rs = pm_apply(fn,sq);
	  ob_pop();
	  return rs;
	  }
   cfn = functionCimp(fn);

   if (cfn == 0) UM_ERROR("no C function pointer");
   return int_to_ob(int_um_c_apply(cfn,0,0,int_call_array,double_call_array));
   }

ob Function_ob_applyn_ob(Smallob fn,ob a0)
   {
   int_fcnptr cfn;Seqob sq;ob rs;
   if (enable_apply_pcode && (functionImplementation(fn)))
      {
	   ob_push2(fn,a0);
	  sq = mk_Seqob(1);
	  Seqob_add(sq,a0);
	  rs = pm_apply(fn,sq);
	  ob_popn(2);
	  return rs;
	  }
   cfn = functionCimp(fn);

   if (cfn == 0) UM_ERROR("no C function pointer");
   int_call_array[0] = (int)a0;
   return int_to_ob(int_um_c_apply(cfn,1,0,int_call_array,double_call_array));
   }



ob Function_ob_ob_applyn_ob(Smallob fn,ob a0,ob a1)
   {
   int_fcnptr cfn;Seqob sq;ob rs;
   if (enable_apply_pcode && (functionImplementation(fn)))
      {
	   ob_push3(fn,a0,a1);
	  sq = mk_Seqob(2);
	  ob_push(sq);
	  Seqob_add(sq,a0);
	  Seqob_add(sq,a1);
	  rs = pm_apply(fn,sq);
	  ob_popn(4);
	  return rs;
	  }
   cfn = functionCimp(fn);

   if (cfn == 0) UM_ERROR("no C function pointer"); 
   int_call_array[0] = (int)a0;
   int_call_array[1] = (int)a1;
   return int_to_ob(int_um_c_apply(cfn,2,0,int_call_array,double_call_array));
   }



ob Function_ob_ob_ob_applyn_ob(Smallob fn,ob a0,ob a1,ob a2)
   {
   int_fcnptr cfn;Seqob sq;ob rs;
   if (enable_apply_pcode && (functionImplementation(fn)))
      {
	   ob_push2(fn,a0);
	   ob_push2(a1,a2);
	  sq = mk_Seqob(3);
	  ob_push(sq);
	  Seqob_add(sq,a0);
	  Seqob_add(sq,a1);
	  Seqob_add(sq,a2);
	  rs = pm_apply(fn,sq);
	  ob_popn(5);
	  return rs;
	  }
   cfn = functionCimp(fn);

   if (cfn == 0) UM_ERROR("no C function pointer");
   int_call_array[0] = (int)a0;
   int_call_array[1] = (int)a1;
   int_call_array[2] = (int)a2;
   return int_to_ob(int_um_c_apply(cfn,2,0,int_call_array,double_call_array));
   }



void Pm_state_tb(Pm_state2 s)
  {
  Pm_state2 cfr;Pm_stack2 st;int nmf,i;Smallob fn;char* br;
  st = (Pm_stack2)(s->stack);
  nmf = st->num_frames;
  if (cgiMode) br = "<br/>"; else br = "";
  printf("%sTrace back:%s\n",br,br);
  cfr = st->c_frame;
  for (i = 0;i<nmf;i++)
  {
	  printf("%d ",nmf-i-1);
	  fn = (Smallob)(cfr -> dblock . function_of);
	  if (fn) 
	    Function_print((Smallob)(cfr -> dblock . function_of));
	  else printf("TOPLEVEL");
	  printf("%s\n",br);
	  cfr = (Pm_state2)(cfr->prev_frame1);
  }
  printf("End trace back%s\n",br);
}

void tb()
  {
  Pm_state_tb(console_stack2->c_frame);
  }

int console_stack_depth() { return console_stack2->num_frames;}

int tb_min = 10000;



void Pm_print_depth(Pm_state2 s,int pfn)
{
	int n,i;
	n = ((Pm_stack2)(s->stack))->num_frames;
	for (i = 0;i<n;i++)
		printf(" ");

	printf("%d %d ",s->pc,pm_step_count);

	if (n > tb_min) Pm_state_tb(s);
}





#define byte1_mask 65280



#define bit_is_set(w,b) (w&(1<<b))


//ob operation which "eats" a piece of pcode should set pc to 
// point at the first byte beyond it

int int_arg(Pm_state2 s)
   {
   Arraybyte code;Dblock db;
       int knd,pc,md,idx,selidx,seqidx;ob src;
	   int tws,fsbnd,seqsel;Seqint srcs;
	   char* codeb;ObBinding b;IntBinding ib;ob prp;
   code = s->code;
   codeb = Arraybyte_contents(code);
   db = &(s -> dblock);
   pc = s -> pc;
   knd = codeb[pc];
   md = get_bits(knd,5,7);
   idx = get_short(code,pc+1); //dblock index
   if (md == pam_local) // get this case out of the way first
      {
	  s -> pc = pc + 3;
	  return Dblock_select_int(db,idx);
	  }
   tws = (md > 2) || (md == 1); //two stage select
   fsbnd = bit_is_set(md,1); //first stage is binding
   if (tws) 
      {
	  selidx = get_short(code,pc+3);
	  s -> pc  = pc + 5;
	  }
   else
      s -> pc  = pc + 3;
   if (fsbnd)
   {
	   if (tws)
	   {
		   b = (ObBinding)Dblock_select_ob(db,idx);
		   src = b->value;
		   prp = Dblock_select_ob(db,selidx);// the property being selected
		   return selectInt(src,prp);
	   }
	   else
	   {
		   ib = (IntBinding)Dblock_select_ob(db,idx);
		   return ib->value;
	   }
   }
   src = Dblock_select_ob(db,idx);
   if (tws)
   {

	   prp = Dblock_select_ob(db,selidx);// the property being selected
	  return selectInt(src,prp);
   }
    else UM_ERROR("UNEXPECTED CASE");

    }



double double_arg(Pm_state2 s)
   {
   Arraybyte code;Dblock db;
       int knd,pc,md,idx,selidx,seqidx;ob src,prp;
	   int tws,fsbnd,seqsel;Seqint srcs;
	   char* codeb;ObBinding b;DoubleBinding dbn;double rs;
   code = s->code;
   codeb = Arraybyte_contents(code);
   db = &(s -> dblock);//optimize
   pc = s -> pc;
   knd = codeb[pc];
   md = get_bits(knd,5,7);
   idx = get_short(code,pc+1); //dblock index
   if (md == pam_local) // get this case out of the way first
      {
	  s -> pc = pc + 3;
	  return Dblock_select_double(db,idx);
	  }
   tws = (md > 2) || (md == 1); //two stage select
   fsbnd = bit_is_set(md,1); //first stage is binding
   if (tws) 
      {
	  selidx = get_short(code,pc+3);
	  s -> pc  = pc + 5;
	  }
   else
      s -> pc  = pc + 3;
 
   if (fsbnd)
   {
	   if (tws)
	   {
		   b = (ObBinding)Dblock_select_ob(db,idx);
		   src = b->value;
		   prp = Dblock_select_ob(db,selidx);// the property being selected
		   return selectDouble(src,prp);
	   }
	   else
	   {
		   dbn = (DoubleBinding)Dblock_select_ob(db,idx);
		   return dbn->value;
	   }
   }
   src = Dblock_select_ob(db,idx);
   if (tws)
   {

	   prp = Dblock_select_ob(db,selidx);// the property being selected
	  return selectDouble(src,prp);
   }
    else UM_ERROR("UNEXPECTED CASE");
}

   
   


Pm_state2 call_pm_new_value_fun();



Pm_state2 set_int_arg(Pm_state2 s,int vl)
   {
   Arraybyte code;char* codeb;Dblock db;ObBinding bnd;IntBinding ibnd;ob prp;
       int wst,knd,pc,md,idx,selidx,seqidx,ordn;int* ords;
	   ob src;int tws,fsbnd,seqsel;boxedint srcbx;
	   char* ano;char anc;

   code = s->code;
   codeb = Arraybyte_contents(code);
   db = &(s -> dblock);//optimize
   pc = s -> pc;
   knd = codeb[pc];
   md = get_bits(knd,5,7);
   idx = get_short(code,pc+1); //dblock index
   if (md == pam_local) // get this case out of the way first
      {
	  s -> pc = pc + 3;
	  Dblock_set_int(db,idx,vl);
	  return s;
	  }
   tws = (md > 2) || (md == 1); //two stage select
   fsbnd = bit_is_set(md,1); //first stage is binding
   if (tws) 
      {
	  selidx = get_short(code,pc+3);
	  s -> pc  = pc + 5;
	  }
   else
      s -> pc  = pc + 3;
   if (fsbnd)
   {
	  if (tws)
	  {
		  bnd = (ObBinding)Dblock_select_ob(db,idx);
		  src = bnd->value;
	      prp = Dblock_select_ob(db,selidx);// the property being set
	      setInt(src,prp,vl);
	  }
	  else
	  {
		  ibnd = (IntBinding)Dblock_select_ob(db,idx);
		  setBindingValueInt(ibnd,vl,cardinality_unconstrained);
	  }
   return s;

   }	 
   src = Dblock_select_ob(db,idx);
   if (tws)
   {

	   prp = Dblock_select_ob(db,selidx);// the property being set
	   setInt(src,prp,vl);

   }
    else // only case left is pam_binding_value
	UM_ERROR("UNEXPECTED CASE");

    }



Pm_state2 set_double_arg(Pm_state2 s,double vl)
   {
   Arraybyte code;char* codeb;Dblock db;ObBinding bnd;DoubleBinding dbnd;
   int pc,md,idx,tws,selidx,fsbnd,knd;ob src,prp;



   code = s->code;
   codeb = Arraybyte_contents(code);
   db = &(s -> dblock);//optimize
   pc = s -> pc;
   knd = codeb[pc];
   md = get_bits(knd,5,7);
   idx = get_short(code,pc+1); //dblock index
   if (md == pam_local) // get this case out of the way first
      {
	  s -> pc = pc + 3;
	  Dblock_set_double(db,idx,vl);
	  return s;
	  }
   tws = (md > 2) || (md == 1); //two stage select
   fsbnd = bit_is_set(md,1); //first stage is binding
   if (tws) 
      {
	  selidx = get_short(code,pc+3);
	  s -> pc  = pc + 5;
	  }
   else
      s -> pc  = pc + 3;
   if (fsbnd)
   {
	  if (tws)
	  {
		  bnd = (ObBinding)Dblock_select_ob(db,idx);
		  src = bnd->value;
	      prp = Dblock_select_ob(db,selidx);// the property being set
	      setDouble(src,prp,vl);
	  }
	  else
	  {
		  dbnd = (DoubleBinding)Dblock_select_ob(db,idx);
		  dbnd -> value = vl;
	  }
   return s;

   }	 
   src = Dblock_select_ob(db,idx);
   if (tws)
   {
	   prp = Dblock_select_ob(db,selidx);// the property being set
	   setDouble(src,prp,vl);
   }
   else UM_ERROR("Unexpected case");
}
 
   
   


ob ob_arg(Pm_state2 s)
   {
   Arraybyte code;char* codeb;
   Dblock db;
   int knd,pc,md,idx,selidx,seqidx;
   ob src;int tws,fsbnd;
   ObBinding b;ob prp;

   
   code = s->code;
   codeb = Arraybyte_contents(code);
   db = &(s -> dblock);
   pc = s -> pc;
   knd = codeb[pc];
   md = get_bits(knd,5,7);
   idx = get_short(code,pc+1); //dblock index
   if (md == pam_local) // get this case out of the way first
      {
	  s -> pc = pc + 3;
	  return Dblock_select_ob(db,idx);
	  }
   tws = (md > 2) || (md == 1); //two stage select
   fsbnd = bit_is_set(md,1); //first stage is binding
   if (tws) 
      {
	  selidx = get_short(code,pc+3);//selection index
	  s -> pc  = pc + 5;
	  }
   else
      s -> pc  = pc + 3;
   if (fsbnd)
   {
	   b = (ObBinding)Dblock_select_ob(db,idx);

	   if (tws)
	   {
		   UM_ERROR("Obsolete1");
		   src = b->value;
 		   prp = Dblock_select_ob(db,selidx);// the property being selected
		   return selectOb(src,prp);
	   }
	   else
		   return bindingValue(b);
  }
  src = Dblock_select_ob(db,idx);
  if (tws)
   {
	   if (src)
	   {

		   UM_ERROR("Obsolete2");
		   prp = Dblock_select_ob(db,selidx);// the property being selected
		   return selectOb(src,prp);
	   }
	   else UM_ERROR("Attempt to select field of nul value");
   }
    else 
	   UM_ERROR("UNEXPECTED CASE");
    }





Pm_state2 set_ob_arg(Pm_state2 s,ob vl)
   {
   Arraybyte code;char* codeb;
   Dblock db;ObBinding bnd;
   int ordn,wst,knd,pc,md,idx,selidx,seqidx;
   ob src;int tws,fsbnd;int* ords;
   char* ano;char anc;ob prp;
   code = s->code;
   codeb = Arraybyte_contents(code);
   db = &(s -> dblock);
   pc = s -> pc;
   knd = codeb[pc];
   md = get_bits(knd,5,7);
    idx = get_short(code,pc+1); //dblock index
   if (md == pam_local) // get this case out of the way first
      {
	  s -> pc = pc + 3;
	  Pm_stack_Dblock_set_ob(db,idx,vl);
	  return s;
	  }
   tws = (md > 2) || (md == 1); //two stage select
   fsbnd = bit_is_set(md,1); //first stage is binding
   if (tws) 
      {
	  selidx = get_short(code,pc+3); //selection index
	  s -> pc  = pc + 5;
	  }
   else
      s -> pc  = pc + 3;
   if (fsbnd)
	  bnd = (ObBinding)Dblock_select_ob(db,idx);
   else
      src = Dblock_select_ob(db,idx);
   if (tws)
      {
	  if (fsbnd) src = bnd->value;

	  {
	      prp = Dblock_select_ob(db,selidx);// the property being set
	      setOb(src,prp,vl);


	  }
	  }
    else // only case left is pam_binding_value
	   {
	   setBindingValueOb(bnd,vl,cardinality_unconstrained);

	   }
	return s;
    }



int apply_int_int(int op,int a)
  {
  int rs;
  if (op == integer_minus_op) rs = -a;else
  if (op == integer_not_op) rs = ~a;
  if (op == boole_not_op) 
     {
	 if (a==0) rs = 1; else rs = 0;
	 }
  return rs;
  }



int apply_int_int_int(int op,int a0,int a1)
  {
  int rs;
  switch (op)
  {
  case integer_plus_op:rs = a0 + a1;break;
  case integer_difference_op:rs = a0 - a1;break;
  case integer_quotient_op:rs = a0/a1;break;
  case integer_times_op:rs = a0 * a1;break;
  case integer_equal_op:rs = (a0 == a1);break;
  case integer_lessp_op:rs = (a0 < a1);break;
  case integer_leq_op:rs = (a0 <= a1);break;
  case integer_and_op: rs = a0&a1;break;
  case boole_and_op: rs = a0&&a1;break;
  case integer_or_op: rs = a0|a1;break;
  case boole_or_op: rs = a0||a1;break;

 case integer_lshift_op: if (a1 >= 0) rs = a0 << a1;else rs = a0 >> (-a1);break;
  default:UM_ERROR("bad op ");//opNames[op]);
  }
  return rs;
  }



Pm_state2 exec_double_plus_op(Pm_state2 s)
{
return set_double_arg(s,double_arg(s)+double_arg(s));
}



Pm_state2 exec_double_difference_op(Pm_state2 s)
{
return set_double_arg(s,double_arg(s)-double_arg(s));
}



Pm_state2 exec_double_times_op(Pm_state2 s)
{
return set_double_arg(s,double_arg(s)*double_arg(s));
}



Pm_state2 exec_double_quotient_op(Pm_state2 s)
{
return set_double_arg(s,double_arg(s)/double_arg(s));
}



Pm_state2 exec_double_equal_op(Pm_state2 s)
{
return set_int_arg(s,double_arg(s)==double_arg(s));
}



Pm_state2 exec_double_lessp_op(Pm_state2 s)
{
return set_int_arg(s,double_arg(s)<double_arg(s));
}




Pm_state2 exec_double_leq_op(Pm_state2 s)
{
return set_int_arg(s,double_arg(s)<=double_arg(s));
}


// the pc points at the first arg
//convention: a_b_c_op means returns value of type a from args of types b and c


Pm_state2 int_int_op(Pm_state2 s,int op)
  {
  int a,rs;
  a = int_arg(s);
  rs = apply_int_int(op,a);
  return set_int_arg(s,rs);
  }


Pm_state2 exec_assign_op(Pm_state2 s)
  {
  int pc,st;Arraybyte code;char* codeb;double vl;
  pc = s ->pc;
  code  = s->code;
  codeb = Arraybyte_contents(code);
  st = land(codeb[pc],15); //storage
  if (st == storage_int)
	 return set_int_arg(s,int_arg(s)); else
  if (st == storage_ob)
     return set_ob_arg(s,ob_arg(s)); else
	 {
	  vl = double_arg(s);
      return set_double_arg(s,vl);
  }
  }




 //note Pm_states don't need to be ob_pushed because they always
//live in the tenured heap 
Pm_state2 exec_sequence_op(Pm_state2 s)
  {
  int pc,st,ln,i;Pm_state2 rs;
  Arraybyte code;char* codeb;Type srt;
  Seqob rso;Seqint rsi;Seqdouble rsd;
  pc = s ->pc;
  code  = s->code;
  codeb = Arraybyte_contents(code);
  ln = get_short(code,pc);
  s->pc = pc + 2; 
  srt = (Type)ob_arg(s);  //sort of the sequence
  pc = s->pc;
  st = land(codeb[pc],15); //storage
  if (st == storage_int)
     {
     rsi = mk_Seqint(ln); 
	 ob_push(rsi);
	 for (i=0;i<ln;i++) Seqint_add(rsi,int_arg(s));
	 rs = (Pm_state2)set_ob_arg(s,(ob)rsi);
	 ob_pop();
	 return rs;
	 }
  else
  if (st == storage_ob)
     {
     rso = mk_Seqob(ln); 
	 ob_push(rso);
	 for (i=0;i<ln;i++) Seqob_add(rso,ob_arg(s));
	 rs = set_ob_arg(s,(ob)rso);
	 ob_pop();
	 return rs;
	 }
  else
  if (st == storage_double)
     {
     rsd = mk_Seqdouble(ln);
	 ob_push(rsd);
	 for (i=0;i<ln;i++) Seqdouble_add(rsd,double_arg(s));
	 rs = set_ob_arg(s,(ob)rsd);
	 ob_pop();
	 return rs;
	 }
  }


Pm_state2 exec_nul_op(Pm_state2 s)
  {
  int rs;
  if (ob_arg(s)) rs = 0;else rs = 1;
  return set_int_arg(s,rs);
  }


Pm_state2 exec_nnul_op(Pm_state2 s)
  {
  int rs;
  if (ob_arg(s)) rs = 1; else rs = 0;
  return set_int_arg(s,rs);
  }



Pm_state2 exec_ob_eq_op(Pm_state2 s)
  {
  ob a0,a1;int rs;
  a0 = ob_arg(s);
  ob_push(a0);
  a1 = ob_arg(s);
  rs = a0 == a1;
  ob_pop();
  return set_int_arg(s,rs);
  }

Pm_state2 exec_seqob_get_op(Pm_state2 s)
  {
  Seqob a;int sl;ob v; 
  a = (Seqob)ob_arg(s);
  sl = int_arg(s);
  v = Seqob_select(a,sl);
  return set_ob_arg(s,v);
  }


Pm_state2 exec_seqint_get_op(Pm_state2 s)
  {
  Seqint a;int sl;
  a = (Seqint)ob_arg(s);
  sl = int_arg(s);
  return set_int_arg(s,Seqint_select(a,sl));
  }


Pm_state2 exec_seqbyte_get_op(Pm_state2 s)
  {
  Seqbyte a;int sl;
  a = (Seqbyte)ob_arg(s);
  sl = int_arg(s);
  return set_int_arg(s,Seqbyte_select(a,sl));
  }

double Seqdouble_select();


Pm_state2 exec_seqdouble_get_op(Pm_state2 s)
  {
  Seqdouble a;int sl;
  a = (Seqdouble)ob_arg(s);
  sl = int_arg(s);
  return set_double_arg(s,Seqdouble_select(a,sl));
  }





Pm_state2 exec_seqob_put_op(Pm_state2 s)
  {
  Seqob a;int sl,wst;ob vl,src;
  src = ob_arg(s);
  a = (Seqob)src;
  sl = int_arg(s);
  vl = ob_arg(s);
  Seqob_set(a,sl,vl);

  return s;
  }



Pm_state2 exec_seqint_put_op(Pm_state2 s)
  {
  Seqint a;int sl;int vl,wst;ob src;
  src = ob_arg(s);
  a = (Seqint)src;
  sl = int_arg(s);
  vl = int_arg(s);
  Seqint_set(a,sl,vl);

  return s;
  }


Pm_state2 exec_seqdouble_put_op(Pm_state2 s)
  {
  Seqdouble a;int sl,wst;double vl;ob src;
  src = ob_arg(s);
  a = (Seqdouble)src;
  sl = int_arg(s);
  vl = double_arg(s);
  Seqdouble_set(a,sl,vl);

  return s;
  }




Pm_state2 exec_seqbyte_put_op(Pm_state2 s)
  {
  Seqbyte a;int sl,wst;int vl;ob src;
  src = ob_arg(s);
  a = (Seqbyte)src;
  sl = int_arg(s);
  vl = int_arg(s);
  Seqbyte_set(a,sl,vl);

  return s;
  }




Pm_state2 exec_int_selectproperty_op(Pm_state2 s)
{
  ob a,p;
  a = ob_arg(s);
  p = ob_arg(s);
  return set_int_arg(s,selectInt(a,p));
}




Pm_state2 exec_double_selectproperty_op(Pm_state2 s)
{
  ob a,p;
  a = ob_arg(s);
  p = ob_arg(s);
  return set_double_arg(s,selectDouble(a,p));
}



Pm_state2 exec_bit_selectproperty_op(Pm_state2 s)
{
  ob a,p;int b;
  a = ob_arg(s);
  p = ob_arg(s);
  b = int_arg(s);
  return set_int_arg(s,selectBit(a,p,b));
}




Pm_state2 exec_ob_selectproperty_op(Pm_state2 s)
{
  ob a,p;
  a = ob_arg(s);
  p = ob_arg(s);
  return set_ob_arg(s,fgetOb(a,p));
}


Pm_state2 exec_ob_mselectproperty_op(Pm_state2 s)
{
  ob a,p;
  a = ob_arg(s);
  p = ob_arg(s);
  return set_ob_arg(s,mgetOb(a,p));
}




Pm_state2 exec_ob_setproperty_op(Pm_state2 s)
  {
  ob a,p,v;
  a = ob_arg(s);
  p = ob_arg(s);
  v = ob_arg(s);
  setOb(a,p,v);
  return s;
}




Pm_state2 exec_int_setproperty_op(Pm_state2 s)
  {
  ob a,p;int v;
  a = ob_arg(s);
  p = ob_arg(s);
  v = int_arg(s);
  setInt(a,p,v);
  return s;
}




Pm_state2 exec_double_setproperty_op(Pm_state2 s)
  {
  ob a,p;double v;
  a = ob_arg(s);
  p = ob_arg(s);
  v = double_arg(s);
  setDouble(a,p,v);
  return s;
}



Pm_state2 exec_bit_setproperty_op(Pm_state2 s)
  {
  ob a,p;int v,b;
  a = ob_arg(s);
  p = ob_arg(s);
  b = int_arg(s);
  v = int_arg(s);
  setBit(a,p,b,v);
  return s;
}








Pm_state2 int_int_int_op(Pm_state2 s,int op)
  {
  int a0,a1,rs;
  a0 = int_arg(s);
  a1 = int_arg(s);
  rs = apply_int_int_int(op,a0,a1);
  return set_int_arg(s,rs);
  }





Pm_state2 exec_increment_op(Pm_state2 s)
  {
  int a0,rs,svpc;
  svpc = s->pc;
  a0 = int_arg(s);
  rs = a0+1;
  s -> pc = svpc;
  set_int_arg(s,rs);
  return set_int_arg(s,a0);
  }

Pm_state2 exec_decrement_op(Pm_state2 s)
  {
  int a0,rs,svpc;
  svpc = s->pc;
  a0 = int_arg(s);
  rs = a0-1;
  s -> pc = svpc;
  set_int_arg(s,rs); 
  return set_int_arg(s,a0);
  }

// no dest for this op
Pm_state2 exec_noreturn_increment_op(Pm_state2 s)
  {
  int a0,rs,svpc;
  svpc = s->pc;
  a0 = int_arg(s);
  rs = a0+1;
  s -> pc = svpc;
  return set_int_arg(s,rs);
  }



Pm_state2 exec_noreturn_decrement_op(Pm_state2 s)
  {
  int a0,rs,svpc;
  svpc = s->pc;
  a0 = int_arg(s);
  rs = a0-1;
  s -> pc = svpc;
  return set_int_arg(s,rs);
  }



// This is a call from somewhere other than Pcode
Pm_state2 top_pm_call_op(Smallob fn,Seqob args)
  {
  Smallob pcd;Dblock db,ndb;Pm_state2 nst;
      int bl,i,j,nmi,nmo,nmr,oap,iap,rap;ob* argsa;
  ob_push2(fn,args);
  pcd = (Smallob)(functionImplementation(fn));
  db = pcodeDblock(pcd);
  nst = console_alloc_Pm_state(db,pcodeCode(pcd));
  ndb = &(nst->dblock); 
  nst -> pc = 0;


   nmo = functionNumobs(fn);
   nmi = functionNumints(fn);
   nmr = functionNumdoubles(fn);
   j = 0; 
   iap = ndb->numobs; //int arg pointer into dblock
   rap = iap + (ndb->numints);
   argsa = Arrayob_contents(args->data);
   for (i = 0;i<nmo;i++)
       {
	   Pm_stack_Dblock_set_ob(ndb,j,argsa[j]);
	   j++;
	   }
   for (i = 0;i<nmi;i++)
       {

	   Dblock_set_int(ndb,iap,((boxedint)argsa[j])->value);
	   j++;
	   iap++;
	   }
 for (i = 0;i<nmr;i++)
       {
	   Dblock_set_double(ndb,rap,((boxeddouble)argsa[j])->value);
	   j++;
	   rap=rap+2;
	   }
	ob_popn(2);
	return nst;
	}


void set_top_Pm_state(Pm_state2 s)
{
	top_pm_state = s;
}

void set_c_Pm_state(Pm_state2 s)
{
	c_pm_state = s;
}



Pm_state2 pm_call_op(ob ifn,Pm_state2 s,int inuma,int asr)
  {
  Smallob pcd;Dblock db,ndb;Pm_state2 nst;Pm_stack2 stk;FunctionHetarray fnh;
      int numa,pc,oap,k,iap,rap,knd,nsc,st,i,fno,fni,fnd,sacnt,ln;
	  Arrayob fna;ob* fnc;Smallob fn;ob sg;Arraybyte code;char* codeb;
   code = s -> code;
   codeb = Arraybyte_contents(code);
  pc = s -> pc;
  s -> return_value_expected = asr;
  k = ifn->obkind;
  if (k == seq_kind) 
  {

	  fna = (Arrayob)(((Seq)ifn)->data);
	  fnc = Arrayob_contents(fna);
	  fn = (Smallob)(fnc[0]);
	  fno = functionNumobs(fn);
	  fni = functionNumints(fn);
	  fnd = functionNumdoubles(fn);
	  sg = fnc[1];
	  if (sg) UM_ERROR("Non nul supplied-argument signature: NOT YET");
      ln = fna->length;
	  numa = inuma + (ln-2);
  }
  else 
  {
	  ln = 0;	  
	  fn = (Smallob)ifn;
	  numa = inuma;
	 
  }
  fnh = (FunctionHetarray)(fn->values);//debug
  pcd = (Smallob)(functionImplementation(fn));
  if (!pcd) {Function_print(fn);UM_ERROR("Unimplemented function");}
  db = pcodeDblock(pcd);

  stk = (Pm_stack2)(s->stack);
  nst = Pm_stack_push(stk,db,1);
  nst -> code =  (pcodeCode(pcd))->data;
  ndb = &(nst->dblock);//optimize
  oap = 0; //ob arg pointer into dblock 
  iap = ndb->numobs; //int arg pointer into dblock
  rap = iap + (ndb -> numints);
  nsc = 2; //points to the next supplied arg to consume
  for (i = 0;i<numa;i++)
       {
	   if (nsc < ln) 
	   {
		   sacnt = nsc-2;
		   if (sacnt < fno) 
			   Pm_stack_Dblock_set_ob(ndb,oap++,fnc[nsc++]);
		   else
		   if (sacnt < (fno+fni))
			   Dblock_set_int(ndb,iap++,ob_to_int(fnc[nsc++]));
           else
		   {
               Dblock_set_double(ndb,rap,ob_to_double(fnc[nsc++]));
			   rap = rap+2;
		   }
	   }
	   else
	   {
		   pc = s->pc;
	       knd = codeb[pc];
	       st = land(knd,15);
	       if (st == storage_ob)
		      Pm_stack_Dblock_set_ob(ndb,oap++,ob_arg(s));
	       else
	       if (st == storage_int)
		      Dblock_set_int(ndb,iap++,int_arg(s));
	       else
           {
		      Dblock_set_double(ndb,rap,double_arg(s));
		      rap = rap+2;
		   }
	   }
	   }
  if (pm_verbose||pm_trace) {Pm_print_depth(s,0);printf("calling ");Function_print(fn);printf("\n");}
	return nst;
	}


// specialized version of pm_call_op just for calling pm_new_value_fun
Smallob pm_new_value_fun;

Pm_state2 call_pm_new_value_fun(Pm_state2 s,ob vl,int fi)
  {
  Smallob pcd;Dblock db,ndb;Pm_state2 nst;Pm_stack2 stk;
      int numa,iap;Smallob fn;ob sg;
 //  return s;
   if (!pm_new_value_fun) return s;
   fn = pm_new_value_fun;
  s -> return_value_expected = 0;
  pcd = (Smallob)(functionImplementation(fn));
  if (!pcd) {Function_print(fn);UM_ERROR("Unimplemented function");}
  db = pcodeDblock(pcd);

  stk = (Pm_stack2)(s->stack);
  nst = Pm_stack_push(stk,db,1);
  nst -> code =  (pcodeCode(pcd))->data;
  ndb = &(nst->dblock);//optimize
  iap = ndb->numobs; //int arg pointer into dblock
  Pm_stack_Dblock_set_ob(ndb,0,vl);
  Dblock_set_int(ndb,iap,fi);
  if (pm_verbose||pm_trace) {Pm_print_depth(s,0);printf("calling ");Function_print(fn);printf("\n");}
	return nst;
	}

// version which calls pm_new_value_fun from C

void pm_run();

void call_pm_new_value_fun_from_C(ob vl,int fi)
  {
  Smallob pcd;Dblock db,ndb;Pm_state2 nst;
      int numa,iap;Smallob fn;ob sg;
 //  return s;
   if (!pm_new_value_fun) return;
   fn = pm_new_value_fun;
  pcd = (Smallob)(functionImplementation(fn));
  if (!pcd) {Function_print(fn);UM_ERROR("Unimplemented function");}
  db = pcodeDblock(pcd);

  nst = Pm_stack_push(console_stack2,db,0);
  nst -> code =  (pcodeCode(pcd))->data;
  ndb = &(nst->dblock);//optimize
  iap = ndb->numobs; //int arg pointer into dblock
  Pm_stack_Dblock_set_ob(ndb,0,vl);
  Dblock_set_int(ndb,iap,fi);
  if (pm_verbose||pm_trace) {printf("calling ");Function_print(fn);printf(" from C\n");}
  pm_return_storage = -1;
  pm_run(nst);
}



//note: this requires that there be no gcs until the call is launched
// (since it involves  populating the int_call_array with obs)
// asr = "assign result"

Pm_state2 exec_call_op(Pm_state2 s,int asr)
   {
   Arraybyte code;Dblock db;int knd,numa,i,svr,st,pc,icc,rcc;
             Smallob fn;ob fno;char* codeb;ob rs;
   code = s -> code;
   codeb = Arraybyte_contents(code);
   pc = s -> pc;
   numa = codeb[pc];
   s -> pc = pc + 1;
   fno = ob_arg(s);
   if ((fno->obkind) == seq_kind) return pm_call_op(fno,s,numa,asr);
   fn = (Smallob)fno;

  if (!(functionCimp(fn))) return pm_call_op(fno,s,numa,asr);
   db = &(s -> dblock); //optimize
   pc = s -> pc;
   icc = 0; //count of ints
   rcc = 0; //count of doubles
  if (r_bytes_left() < 1000) // LATER maybe make a more careful estimate
  {
	  ob_push2(fno,code);
      gc();
	  // in case something moved
	  ob_popn(2);
	  fn=fno;
      codeb = Arraybyte_contents(code);
  }
   svr = gc_disabled;
   gc_disabled = 1;
   for (i = 0;i<numa;i++)
       {
	   pc = s->pc;
	   knd = codeb[pc];
	   st = land(knd,15);
	   if (st == storage_ob)
		  int_call_array[icc++] = (int)ob_arg(s);
	   else
	   if (st == storage_int)
		  int_call_array[icc++] = int_arg(s);
       else
          {
		  double_call_array[rcc] = double_arg(s);
		  rcc++;
		  }
	   }
   if (pm_verbose) {Pm_print_depth(s,0);printf("dispatching to ");Function_print(fn);printf("\n");}
    if (asr) // assign return value
	   {
	   pc = s->pc;
	   knd = codeb[pc];
	   st = land(knd,15);
	   gc_disabled = svr;

	   dispatch_call(fn,st,icc,rcc);
	   if (st == storage_ob) 
	   {
		   rs = ob_call_return_value;
		   ob_call_return_value = (ob)0;
		   return set_ob_arg(s,rs); 
	   }
	   else
	   if (st == storage_int) return set_int_arg(s,int_call_return_value);
	   else
	   return set_double_arg(s,double_call_return_value);
	   }
    else
	{
	   gc_disabled = svr;	
	   dispatch_call(fn,-1,icc,rcc);
	}
	return s;
	}
	      
   

Pm_state2 exec_return_op(Pm_state2 s)
   {
	Pm_stack2 pst;
   int idx,pc,knd,st;Pm_state2 ps,svps;ob ors;int irs;double drs;
    int prt;Arraybyte code;char* codeb;int cret;
   cret = s->return_to_C;
   pst = (Pm_stack2)(s->stack);
   ps = Pm_stack_pop(pst);
   svps = ps;
   prt = (!cret) && ps && (ps->return_value_expected);//pcode-style return
   code = s->code;
   codeb = Arraybyte_contents(code);
   pc = s->pc;
   knd = codeb[pc];
   st = land(knd,15);
   if (st == storage_ob) 
     {
	  ors = ob_arg(s);
	 if (prt) ps = set_ob_arg(ps,ors); else
	    {
		ob_call_return_value = ors;
	    pm_return_storage = storage_ob;
		}
	 }
   else
   if (st == storage_int) 
      {
	  irs = int_arg(s);
	  if (prt) ps = set_int_arg(ps,irs); else
	     {
		 int_call_return_value = irs;
		 pm_return_storage = storage_int;
		 }
	  }
   else
      {
	   drs = double_arg(s);
	  if (prt) ps = set_double_arg(ps,drs); else
	     {
		 double_call_return_value = drs;
		 pm_return_storage = storage_double;
		 }
	  }
   if (pm_verbose || pm_trace) 
   {
	   Pm_print_depth(s,1);
	   printf("Return ");
	   if (st == storage_ob) 
	   {
		   if (!ors) printf("nul");
	   }
	   else
	   if (st == storage_int) printf("%d",irs);
	   else printf("%f",drs);
	   printf(" to ");
	   if (svps) Function_print((Smallob)(svps -> dblock . function_of));
	   printf("\n");
   }
	if (cret) return (Pm_state2)(nul); else return ps;
	}
	      

Pm_state2 exec_return_void_op(Pm_state2 s)
{
	Pm_stack2 pst;Pm_state2 ps;
	if (pm_verbose) {Pm_print_depth(s,1);printf("Return void\n");printf("\n");}
	pst = s->stack;
	ps = Pm_stack_pop(pst);
	if (s->return_to_C) return (Pm_state2)nul; else return ps;
}





void exec_jump_s_op(Pm_state2 s)
   {
   int pc,dst;Arraybyte code;
   pc = s->pc;
   code = s->code;
   dst = get_short(code,pc)+pc;
   s -> pc = dst;
   }

void exec_iftrue_s_op(Pm_state2 s)
   {
   int pc,dst,c;Arraybyte code;
   c = int_arg(s);
   pc = s->pc;
   if (c)
      {
      code = s->code;
      dst = get_short(code,pc)+pc;
      if (pm_verbose) {Pm_print_depth(s,0);printf("jump_if_true(true) to %d\n",dst);}
      s -> pc = dst;
          }
   else 
   {
	   s->pc = pc + 2;
      if (pm_verbose) {Pm_print_depth(s,0);printf("jump_if_true(false) to %d\n",pc + 2);}	  
   }
   }



void exec_iffalse_s_op(Pm_state2 s)
   {
   int pc,dst,c;Arraybyte code;
   c = int_arg(s);
   pc = s->pc;
   if (c)
   {
	   s->pc = pc + 2;
       if (pm_verbose) {Pm_print_depth(s,0);printf("jump_if_false(true) to %d\n",pc + 2);}
   }
  else
      {
      code = s->code;
      dst = get_short(code,pc)+pc;
      if (pm_verbose) {Pm_print_depth(s,0);printf("jump_if_false(false) to %d\n",dst);}
      s -> pc = dst;
          }
   }


// Note pc is bumped before call to the individual op

int gc_test_pm_step = 0;
int sweep_test_pm_step = 0;
int pm_break_step = 0;  // used in debugging; set in main
int pm_gc_mod = 100;  

int pmSteps()
{
	return pm_step_count;
}

Pm_state2 interpret_step(Pm_state2 s)
  {
  int pc,knd,op;Arraybyte code;Pm_state2 ns;char* codeb;int i0,i1;ob o0,o1;double d0;
  int bugr,bugrk;
  pm_step_count++;
  if ((maxPmSteps > 0) && (pm_step_count > maxPmSteps))
  {
	     if (cgiMode) emitHtmlHeader();
		 printf("EXCEEDED CPU ALLOCATION\n");
		 fablQuit();
  }
  if (pm_break_step && (pm_step_count >= pm_break_step)  && ((pm_step_count%pm_gc_mod)==0))
  {
	  printf("Reached step %d\n",pm_step_count);
//      gc_test = 1;
	  sweep_heaps();
	  test_gc();
	  sweep_heaps();
  }
  c_pm_state = s;
  ns = s;
  pc = s -> pc;
  code = s->code;
  if (pc >= (code->length)) UM_ERROR("ran past end of pcode");
  codeb = Arraybyte_contents(code);
  op = codeb[pc];
  s -> pc = pc + 1;
  knd =  opKinds[op];
  if (pm_step_count > 11029708) 
  {
	  pm_verbose = pm_verbose;
  }
  if (pm_verbose)	{Pm_print_depth(s,0);printf("Executing op %d = %s\n",op,opNames[op]);}
 
  

  

  if (knd == op_kind_int_int) ns = int_int_op(s,op); else
  if (knd == op_kind_int_int_int) ns = int_int_int_op(s,op); else
  switch (op)
  {
  case call_op:ns = exec_call_op(s,0);break;
  case assign_call_op:ns = exec_call_op(s,1);break;
  case assign_op:ns = exec_assign_op(s);break;
  case return_op:ns = exec_return_op(s);break;
  case return_void_op:ns = exec_return_void_op(s);break;
  case integer_increment_op:ns = exec_increment_op(s);break;
  case integer_decrement_op:ns = exec_decrement_op(s);break;
  case noreturn_increment_op:ns = exec_noreturn_increment_op(s);break;
  case noreturn_decrement_op:ns = exec_noreturn_decrement_op(s);break;
  case jump_s_op:exec_jump_s_op(s);break;
  case iftrue_s_op:exec_iftrue_s_op(s);break;
  case iffalse_s_op:exec_iffalse_s_op(s);break;
  case ob_nul_op:ns = exec_nul_op(s);break;
  case ob_nnul_op:ns = exec_nnul_op(s);break;
  case ob_eq_op:ns = exec_ob_eq_op(s);break;
  case sequence_op:ns = exec_sequence_op(s);break;
  case seqob_get_op:ns = exec_seqob_get_op(s);break;

  case seqint_get_op:ns = exec_seqint_get_op(s);break;
  case seqdouble_get_op:ns = exec_seqdouble_get_op(s);break;
  case seqbyte_get_op:ns = exec_seqbyte_get_op(s);break;
  case seqob_put_op:ns = exec_seqob_put_op(s);break;
  case seqint_put_op:ns = exec_seqint_put_op(s);break;
  case seqdouble_put_op:ns = exec_seqdouble_put_op(s);break;
  case seqbyte_put_op:ns = exec_seqbyte_put_op(s);break;

  case ob_selectproperty_op:ns = exec_ob_selectproperty_op(s);break;
  case ob_mselectproperty_op:ns = exec_ob_mselectproperty_op(s);break;
  case integer_selectproperty_op:ns = exec_int_selectproperty_op(s);break;
  case double_selectproperty_op:ns = exec_double_selectproperty_op(s);break;
  case bit_selectproperty_op:ns = exec_bit_selectproperty_op(s);break;
  case ob_setproperty_op:ns = exec_ob_setproperty_op(s);break;
  case integer_setproperty_op:ns = exec_int_setproperty_op(s);break;
  case double_setproperty_op:ns = exec_double_setproperty_op(s);break;
  case bit_setproperty_op:ns = exec_bit_setproperty_op(s);break;


  case double_minus_op:ns = set_double_arg(s,-double_arg(s));break;
  case double_plus_op:ns = set_double_arg(s,double_arg(s)+double_arg(s));break;
  case double_difference_op:ns = set_double_arg(s,double_arg(s)-double_arg(s));break;
  case double_times_op:ns = set_double_arg(s,double_arg(s)*double_arg(s));break;
  case double_quotient_op:ns = set_double_arg(s,double_arg(s)/double_arg(s));break;
  case double_equal_op:ns = set_int_arg(s,double_arg(s)==double_arg(s));break;
  case double_lessp_op:ns = set_int_arg(s,double_arg(s)<double_arg(s));break;
  case double_leq_op:ns = set_int_arg(s,double_arg(s)<=double_arg(s));break;
  case integer_float_op:ns = set_double_arg(s,(double)int_arg(s));break;

  case noop_op:break;
  default: UM_ERROR("UNKNOWN PM OP");
  }
  if (gc_test && gc_test_pm_step) test_gc();
  if (sweep_test && sweep_test_pm_step) sweep_heaps();
  return ns;
  }

Pm_state2 top_interpret_step()
  {
  return interpret_step(top_pm_state);
  }

void pm_step()
  {
  if (!c_pm_state) c_pm_state = top_pm_state;
  c_pm_state = interpret_step(c_pm_state);
  }


void pm_run(Pm_state2 s)
  {
  Pm_state2 cs;
  s->pc = 0;
  cs = s;
  while (cs) cs = interpret_step(cs);
  }

void pm_top_init()
  {
  c_pm_state = top_pm_state;
  c_pm_state->pc = 0;
  }


ob pm_return_value()
  {
	ob rs;
  if (pm_return_storage == storage_ob) 
  {
	  rs = ob_call_return_value;
	  ob_call_return_value = (ob)0;
	  return rs;
  }
  if (pm_return_storage == storage_int) return int_to_ob(int_call_return_value); 
  if (pm_return_storage == storage_double) return double_to_ob(double_call_return_value);
  return nul;
  }

ob pm_evaluate(Pm_state2 s)
  {
  pm_return_storage = -1;
  pm_run(s);
  return pm_return_value();
  }

ob Dblock_Seqbyte_pm_evaluate(Dblock db,Seqbyte code)
{
	Pm_state2 s;
	s = console_alloc_Pm_state(db,code);
	return pm_evaluate(s);
}

ob top_pm_evaluate()
  {
  return pm_evaluate(top_pm_state);
  }


ob pm_apply(Smallob fn,Seqob args)
  {
  Pm_state2 s;FunctionHetarray fnh;
  fnh = (FunctionHetarray)(fn->values);
  s = top_pm_call_op(fn,args);
  return pm_evaluate(s);
  }

  


void dblock_extract(Dblock db,Seqob obs,Seqint ints,Seqdouble doubs)
  {
      int i,nmi,nmo,nmr,iap,rap;
   ob_push3(obs,ints,doubs);
   nmo = db->numobs;
   nmi = db->numints;
   nmr = db->numdoubles;
   iap = db->numobs; //int arg pointer into dblock
   rap = iap + (db->numints);
   for (i = 0;i<nmo;i++)
	   Seqob_add(obs,Dblock_select_ob(db,i));
   for (i = 0;i<nmi;i++)
	   Seqint_add(ints,Dblock_select_int(db,i+iap));
   for (i = 0;i<nmr;i++)
	   Seqdouble_add(doubs,Dblock_select_double(db,i*2+rap));
	ob_popn(3);
	}



Pm_state2 nth_frame(Pm_stack2 st,int n)
  {
  Pm_state2 cfr;int nmf,i,trg;
  nmf = st->num_frames;
  if (n >= nmf) UM_ERROR("Not that many frames in the stack");
  cfr = st->c_frame;
  trg = nmf-n-1;
  for (i = 0;i<nmf;i++)
  {
	  if (trg == i) return cfr;
	  cfr = (Pm_state2)(cfr->prev_frame1);
  }
}

void pm_stack_extract(Pm_stack2 st,int n,Seqob obs,Seqint ints,Seqdouble doubs)
{
	Dblock db;
	db = &(nth_frame(console_stack2,n)->dblock);
    dblock_extract(db,obs,ints,doubs);
}


void console_stack_extract(int n,Seqob obs,Seqint ints,Seqdouble doubs)
{
	pm_stack_extract(console_stack2,n,obs,ints,doubs);
}
