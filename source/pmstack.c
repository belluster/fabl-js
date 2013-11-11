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

#define Pm_stack_overflow_buffer_size 2000 
// if pmret is true, the code executed in this frame
// should return to the pm state held on the top of the stack
// ow, it(ie the pm_evaluate loop executing the code) should return to its C caller 
Pm_state2 Pm_stack_push(Pm_stack2 st,Dblock db,int pmret)
{
	Pm_state2 cf,nfr;
	Dblock nfdb;
	char *nf;
	int fsz,nmo,nmi,nmd,dbdsz,nfsz,stsz,numfr;
	nmo = db -> numobs;
	nmi = db -> numints;
	nmd = db -> numdoubles;
	dbdsz = 4 * (nmo+nmi) + 8 * nmd;
    nfsz = sizeof(Pm_state_struct) + dbdsz;
	cf = st -> c_frame;
	numfr = st->num_frames;
    if (numfr)
		nf = ((char*)cf) + (cf->size);
	else
		nf = cf;
    stsz =  nfsz + ((char*)cf)-((char*)st);
	if (stsz > ((st->size)-Pm_stack_overflow_buffer_size)) 
	{
		printf("DBLOCK STACK OVERFLOW\n");
		tb();
		reset_console_stack();
//		um_reset();
	}

    nfr = (Pm_state2)nf;
	nfr -> prev_frame1 = (void*)cf;
	nfr -> return_to_C = !pmret;
	nfr -> size = nfsz;
	nfr -> stack = (void*)st;
	nfr -> pc = 0;
	nfdb = &(nfr->dblock);
	memcpy((char*)nfdb,(char*)db,dbdsz + sizeof(Dblock_struct));
	nfdb -> in_stack = 1;
    st -> c_frame = nfr;
	st -> num_frames = numfr+1;
	return nfr;
}

Pm_state2 Pm_stack_pop(Pm_stack2 st)
{
	int numfr;Pm_state2 cf,pf;
	numfr = st -> num_frames;
	if (!numfr) UM_ERROR("Attempt to pop empty dblock stack");
	cf = st -> c_frame;
    pf = (Pm_state2)(cf -> prev_frame1);
	st -> c_frame = pf;
	st -> num_frames = numfr - 1;
	if (numfr>1) return pf; else return nul;
}




#define Pm_stack_pool_size 100
Pm_stack2 Pm_stack_pool[Pm_stack_pool_size];
int num_pm_stacks = 0;

Pm_stack2 mk_Pm_stack(int sz) // sz in bytes
{
	Pm_stack2 st;int sv;
	if (num_pm_stacks == Pm_stack_pool_size) UM_ERROR("Out of Dblock stacks");
	sv = gc_test;
	gc_test = 0;
	st = (Pm_stack2)t_heap_alloc(sz);
	gc_test = sv;
	st -> size = sz;
	st -> obkind = pm_stack_kind;
	st -> c_frame = (Pm_state2)(((char*)st)+sizeof(Pm_stack_struct));
    Pm_stack_pool[num_pm_stacks++] = st;
	return st;
}

void Pm_stack_reset(Pm_stack2 st)
{
	st -> c_frame = (Pm_state2)(((char*)st)+sizeof(Pm_stack_struct));
	st -> num_frames = 0;
}

Pm_stack2 alloc_Pm_stack(int sz) // keep it simple for now; just search 
{
	Pm_stack2 cs;int i;
	for (i = 0;i<num_pm_stacks;i++)
	{
		cs = Pm_stack_pool[i];
		if (((cs->num_frames)==0)&&((cs->size)>=sz)) return cs;
	}
	return mk_Pm_stack(sz);
}

#define UPDATE_PM_STATE_OB_SLOT(srcp) { \
	    src = *srcp; \
		if (src&&in_regular(src)) \
{ \
			if (src->forwarded) \
				nwv = forwarded_value(src); \
			else \
				nwv = (ob)gccopy(src); \
			*srcp = (aword)nwv; \
} \
}



void Pm_state_gccopy(Pm_state2 sf)
{
	Dblock_struct db;int nmo,i;ob *dbd,*r;ob src,nwv;
	db = sf->dblock;
	nmo = db.numobs;
	r = &(sf->code);
	UPDATE_PM_STATE_OB_SLOT(r);
	dbd = (ob*)( ((char*)sf) + sizeof(Pm_state_struct))-1; //-1 so as to copy the function field
	for (i = 0;i<=nmo;i++)
	{
        r = dbd+i;
		UPDATE_PM_STATE_OB_SLOT(r);
	}
}

void Pm_stack_gccopy(Pm_stack2 st)
{
	Pm_state2 cf;
	int numfr,i;
	numfr = st -> num_frames;
	cf = st->c_frame;
    for (i = 0;i<numfr;i++)
	{
		Pm_state_gccopy(cf);
		cf = (Pm_state2)(cf -> prev_frame1);
	}
}

void gccopy_pm_stacks()
{
	int i;
	for (i = 0;i<num_pm_stacks;i++)
		Pm_stack_gccopy(Pm_stack_pool[i]);
}






void Pm_state_sweep(Pm_state2 sf)
{
	Dblock_struct db;int nmo,i;ob *dbd,*r;
	db = sf->dblock;
	nmo = db.numobs;
	dbd = (ob*)( ((char*)sf) + sizeof(Pm_state_struct)) -1; //-1 so as to check the code field
	for (i = 0;i<=nmo;i++)
	{
        r = dbd+i;
		Pm_stack_check_ob(sf,r);
	}
}

ob Pm_stack_sweep(Pm_stack2 st)
{
	Pm_state2 cf;
	int numfr,i;
	numfr = st -> num_frames;
	cf = st->c_frame;
    for (i = 0;i<numfr;i++)
	{
		Pm_state_sweep(cf);
		cf = (Pm_state2)(cf -> prev_frame1);
	}
	return (ob) (((char*)st) + (st->size));
}

int in_Pm_stack(Pm_stack2 st,ob v)
{
	char *cbs,*ctp,*cv;
	cbs = st;
	ctp = cbs +  (st->size);
	cv = (char*)v;
	return ((cv >= cbs) && (cv < ctp));
}

int in_Pm_stacks(ob v)
{
				
	int i;
	for (i = 0;i<num_pm_stacks;i++)
	{
		if (in_Pm_stack(Pm_stack_pool[i],v)) return 1;
	}
	return 0;
}
/*  see pmstate
Pm_stack2 console_stack = (Pm_stack2)0;

void reset_console_stack()
{
	if (console_stack) Pm_stack_reset(console_stack);
}
*/