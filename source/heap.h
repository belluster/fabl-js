/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

extern void*** ob_stack;
extern int ob_stack_ptr;
#define dword_align

//  x is the local variable being pushed

#define ob_pushMac(x) ob_stack[ob_stack_ptr++] = (void*)(&x)

#define DEBUG_OBSTACK
#ifdef DEBUG_OBSTACK

#define ob_push(x) {obPush(&x);ob_stack[ob_stack_ptr++] = (void*)(&x);}
//  x is a pointer to the location to be pushed
#define ob_pushp(x) {obPush(x);ob_stack[ob_stack_ptr++] = ((void*)x);}


#define ob_push2(a0,a1) {obPush(&a0);obPush(&a1);ob_stack[ob_stack_ptr++] = ((void*)(&(a0)));ob_stack[ob_stack_ptr++] = ((void*)(&(a1)));}
#define ob_push3(a0,a1,a2) {obPush(&a0);obPush(&a1);obPush(&a2);ob_stack[ob_stack_ptr++] = ((void*)(&(a0)));ob_stack[ob_stack_ptr++] = ((void*)(&(a1)));ob_stack[ob_stack_ptr++] = ((void*)(&(a2)));}


#else

#define ob_push(x) ob_stack[ob_stack_ptr++] = (void*)(&x)
//  x is a pointer to the location to be pushed
#define ob_pushp(x) ob_stack[ob_stack_ptr++] = ((void*)x)


#define ob_push2(a0,a1) ob_stack[ob_stack_ptr++] = ((void*)(&(a0)));ob_stack[ob_stack_ptr++] = ((void*)(&(a1)))
#define ob_push3(a0,a1,a2) ob_stack[ob_stack_ptr++] = (&(a0));ob_stack[ob_stack_ptr++] = (&(a1));ob_stack[ob_stack_ptr++] = (&(a2))



#define ob_pop() if ((--ob_stack_ptr) < 0) UM_ERROR("ob_stack underflow")

#define ob_popn(n) ob_stack_ptr = ob_stack_ptr - n;if (ob_stack_ptr < 0) UM_ERROR("ob_stack underflow");

#define ob_pop_to(n) ob_stack_ptr = n

#endif

#define WORD_ALIGN(n) (((n+3)/4)*4)
//  x is the left side of the assigment 
//#define set_ob(x,y) set_ob_(&((ob)x),(ob)y)
#define set_ob(x,y) set_ob_(&(x),(ob)y)
// and here it is a pointer to the value being assigned
#define set_obp(x,y) set_ob_(((ob*)x),(ob)y)




typedef  struct {
  int* base;
  int* top; // points to first word past the heap
  int* next;
  char* bitmap;
  char* modmap; // modifications (for deltas)
  char* obmap;  // tells which locations are obs
  int* rrefs;   // references into a regular heap
  } T_heap_struct,*T_heap;




typedef  struct {
  int* base;
  int* middle;
  int* top;
  int* next;
  unsigned low:1; // low: is the low half active?
  } R_heap_struct,*R_heap;

extern int allocating_statically;
extern int tenuring_enabled;
extern int sweep_verbose;
extern int sweep_extra_verbose;
extern int gc_verbose;
extern int gc_announce;
extern int alloc_verbose;
extern int gc_test; 
extern int gc_test_alloc;
extern int gc_test_pm_step;

extern int gc_sweep;  // always sweep just after each gc
extern int sweep_test; // runs sweep_heaps at intervals determined by the various gc_test_ flags
extern int sweep_test_alloc;
extern int sweep_test_gc;
extern int sweep_test_pm_step;
extern int gc_verbose_mod;
extern int gc_test_alloc_mod;
extern int alloc_disabled;
extern int regular_alloc_disabled;
extern int *r_limit,*r_base,*t_limit,*t_base,*r_next,*t_next,*r_dest_base,*r_dest_limit;
extern string empty_string;
extern Sarray c_rrefs;

#define in_regular(x) ((r_base <= (int*)x) && ((int*)x < r_limit))
#define in_dest_regular(x) ((r_dest_base <= (int*)x) && ((int*)x < r_dest_limit))
#define forwarded_value(x) (((Forward)x)->value)
#define set_forwarded_value(x,y) (((Forward)x)->value=((ob)y))
#define whichHeap(x) ((multi_t_heaps)?whichHeapf(x):0)
#define declareModified(x) if (deltaEnabled && !in_regular(x)) declareModifiedf(x,whichHeap(x))
// this macro asssumes src points at the ob  to be copied,
// and dstp at the corresponding slot in the dest where the pointer to the
// copy should be stuffed. 
#define GCCOPY_OB_SLOT(dstp,src) { \
		if (src) \
{ \
			if (src->forwarded) \
				nwv = forwarded_value(src); \
			else \
				nwv = (ob)gccopy(src); \
			if (tenure) set_obp(dstp,nwv); else *dstp = (ob)nwv; \
} \
		else \
*dstp = nul;}


