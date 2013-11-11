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


//A double value is stored either as a boxed double (storage = boxeddouble in the storage word)
// or as a pair of words, first with storage_double, value kind onevalue, or undefined and the second
// with value kind second word, storage = storage_double 


#define INITIAL_SEQUENCE_SIZE 4

// These operations work on Values as well.
// annotations are initialized to contain undefineds
Hetarray mk_Hetarray(int capacity)
{
	Hetarray rs;int nmaw,i;Annotation ann;char *anns;
    nmaw = 1+ ((capacity-1)/4); // num annotation words
	rs = (Hetarray)heap_alloc(sizeof(Hetarray_struct)+4*(nmaw +capacity));
	rs -> length = 0;
	rs -> capacity = capacity;
	rs -> obkind = hetarray_kind;
    anns = Hetarray_annotations(rs);
	for (i=0;i<capacity;i++)
	{
		ann = (Annotation)(anns + i);
		ann -> value_kind = value_kind_undefined;
	}

	if (alloc_verbose) printf("Allocated hetarray with capacity %d\n",capacity);
	return rs;
}

// gets an ob or values array
// 1 = fget mode 2 = mget mode
// allocob means return ints,doubles as obs
ob Hetarray_fgetOb(Hetarray s,int n,int allocob)
{
	ob vl;int ln,nmaw,ast;Annotation ann;char *anns;int avk,cp;Arrayob dt;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ast = ann->storage;
	avk  = ann->value_kind;
    nmaw = 1+ ((cp-1)/4); // num annotation words
	if (avk == value_kind_undefined) 
		return nul;
	if (avk == value_kind_onevalue) 
	{
	    if (ast == storage_int) 
		{
			if (allocob) return int_to_ob(Hetarray_intSelectn(s,nmaw,n)); 
			else return nul;
		}
		if (ast == storage_double) 
		{
			if (allocob) return double_to_ob(Hetarray_doubleSelectn(s,nmaw,n));
			else return nul;
		}
	    if ((ast == storage_ob)||(ast == storage_boxeddouble)) return Hetarray_obSelectn(s,nmaw,n);
		UM_ERROR("UNEXPECTED");
	}
	if (avk == value_kind_multivalued) 
	{
		vl = Hetarray_obSelectn(s,nmaw,n);
		dt = ((Values)vl)->data;
		ln = dt->length;
		if (ln > 0) return Arrayob_selectn(dt,ln-1);
    }			
    return nul;

}

// assumes the nth fellow is a single, defined ob

ob Hetarray_fastGetOb(Hetarray s,int n)
{
	int cp,nmaw;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	return Hetarray_obSelectn(s,nmaw,n);
}

int Hetarray_fastGetInt(Hetarray s,int n)
{
	int cp,nmaw;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	return Hetarray_intSelectn(s,nmaw,n);
}

void Hetarray_setOb(Hetarray s,int n,ob v)
{
	int cp,nmaw;Annotation ann;char *anns;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ann -> storage = storage_ob;
	ann -> value_kind = value_kind_onevalue;
	Hetarray_obSetn(s,nmaw,n,v);
}


void Hetarray_setUndefined(Hetarray s,int n)
{
	int cp,nmaw;Annotation ann;char *anns;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ann -> storage = storage_ob;
	ann -> value_kind = value_kind_undefined;
	Hetarray_obSetn(s,nmaw,n,nul);
}

// two words better have been allocated
void Hetarray_setDoubleUndefined(Hetarray s,int n)
{
	int cp,nmaw;Annotation ann;char *anns;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ann -> storage = storage_double;
	ann -> value_kind = value_kind_undefined;
	Hetarray_intSetn(s,nmaw,n,0);
    ann = (Annotation)(anns + n + 1);
	ann -> storage = storage_double;
	ann -> value_kind = value_kind_secondword;
	Hetarray_intSetn(s,nmaw,n+1,0);
}


Values Hetarray_mgetOb(Hetarray s,int n)
{

	int nmaw,ast;Annotation ann;char *anns;int iv,avk,cp;ob v;Values vls;double dv;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ast = ann->storage;
	avk  = ann->value_kind;
    nmaw = 1+ ((cp-1)/4); // num annotation words
	if (avk == value_kind_undefined) return emptyValues;
	if (avk == value_kind_onevalue) 
	{
		ob_push(s);
	    if (ast == storage_int) 
		{
			iv =  Hetarray_intSelectn(s,nmaw,n);
			v = int_to_ob(iv);
		}
		if ((ast == storage_ob)||(ast == storage_boxeddouble))
			iv = Hetarray_obSelectn(s,nmaw,n);
		else
		if (ast == storage_double)
		{
			dv = Hetarray_doubleSelectn(s,nmaw,n);
			v = double_to_ob(dv);
		}
		UM_ERROR("UNEXPECTED");
		vls = toValues(v);
		// in case of gc
		Hetarray_obSetn(s,nmaw,n,vls);
	    anns = Hetarray_annotations(s);
        ann = (Annotation)(anns + n);
		ann->value_kind = value_kind_multivalued;
		ob_pop();
		return vls;
	}
	if (avk == value_kind_multivalued) return Hetarray_obSelectn(s,nmaw,n);
	UM_ERROR("UNEXPECTED");
}
	





int Hetarray_fgetInt(Hetarray s,int n)
{
	int nmaw,ast;Annotation ann;char *anns;int avk,ln,cp;ob v;Arrayob dt;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ast = ann->storage;
	avk  = ann->value_kind;
    nmaw = 1+ ((cp-1)/4); // num annotation words
	if (avk == value_kind_undefined) return 0;
	if (avk == value_kind_onevalue) 
	{
	    if (ast == storage_int) return Hetarray_intSelectn(s,nmaw,n);
		return 0;
        UM_ERROR("EXPECTED INT");
	}
	if (avk == value_kind_multivalued) 
	{
		v = Hetarray_obSelectn(s,nmaw,n);
		dt = ((Values)v)->data;
		ln = dt->length;
		if (ln > 0) return literalToInt(Arrayob_selectn(dt,ln-1));
		return 0;
    }
	return 0;

}





void Hetarray_setInt(Hetarray s,int n,int v)
{
	ob* dt;int cp,nmaw;Annotation ann;char *anns;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ann -> storage = storage_int;
	ann -> value_kind = value_kind_onevalue;
	Hetarray_intSetn(s,nmaw,n,v);
}




double Hetarray_fgetDouble(Hetarray s,int n)
{
	int nmaw,ln,ast;Annotation ann;char *anns;int avk,cp;boxeddouble dob;ob v;Arrayob dt;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	ast = ann->storage;
	avk  = ann->value_kind;
    nmaw = 1+ ((cp-1)/4); // num annotation words
	if (avk == value_kind_onevalue) 
	{
	    if (ast == storage_double) return Hetarray_doubleSelectn(s,nmaw,n);
		if (ast == storage_boxeddouble) 
		{
			dob = (boxeddouble)Hetarray_obSelectn(s,nmaw,n);
			return dob->value;
		}
	}
	if (avk == value_kind_multivalued) 
	{
		v = Hetarray_obSelectn(s,nmaw,n);
		dt = ((Values)v)->data;
		ln = dt->length;
		if (ln > 0) return literalToDouble(Arrayob_selectn(dt,ln-1));
		return 0;
    }
    return 0.0;
}


void Hetarray_setDouble(Hetarray s,int n,double v)
{
	ob* dt;int cp,avk,nmaw,st;Annotation ann;char *anns;boxeddouble dv;ob dvo;
	cp = s->capacity;
	nmaw = 1+ ((cp-1)/4);
	if ((n+1) > (s->length)) UM_ERROR("out of bounds array access");
	anns = Hetarray_annotations(s);
    ann = (Annotation)(anns + n);
	st = ann->storage;
	avk = ann->value_kind;
	if (avk == value_kind_onevalue)
	{
		if (st == storage_double) // a pair of words has been allocated
		{
			Hetarray_doubleSetn(s,nmaw,n,v);
			return;
		}
		else
		if (st == storage_boxeddouble)
		{
			dv = (boxeddouble)Hetarray_obSelectn(s,nmaw,n);
			dv -> value = v;
			return;
		}
	}
	ob_push(s);
	dvo = double_to_ob(v);
	Hetarray_obSetn(s,nmaw,n,dvo);
	ann -> storage = storage_boxeddouble;
	ann -> value_kind = value_kind_onevalue;
	ob_pop();
}






/*
// dst must have larger capacity than the length of src */

void copyintoHetarray(Hetarray dst,Hetarray src)
{
	int gccnt,dcp,daw,saw,scp,i,sln,st;char cann,*san,*dan;int *srcp,*dstp;boxeddouble dv;ob cdv;
    dcp = dst -> capacity;
	daw = 1+ ((dcp-1)/4);
	scp = src -> capacity;
	saw = 1+ ((scp-1)/4);

	sln = src -> length;
	if (sln > dcp) UM_ERROR("Destination too small in copyinto_Hetarray");
	dst -> length = sln;
	// copy annotation words
	dan = Hetarray_annotations(dst);
	san = Hetarray_annotations(src);
    memcpy(dan,san,sln);

	dstp = (int*)(Hetarray_contents(dst,daw));
	srcp = (int*)(Hetarray_contents(src,saw));

	for (i=0;i<sln;i++)
	{
		cann = san[i];
		st = cann & 3; // storage
		if (st == storage_ob)
			set_obp(dstp,*((ob*)srcp));
		else
		if (st == storage_boxeddouble) // need to copy the cell!
		{

			dv = (boxeddouble)(*((ob*)srcp));
			gccnt = gc_count;

			cdv = double_to_ob(dv->value);
			if (gc_count > gccnt) //there was a gc
			{
				san = Hetarray_annotations(src);
				dstp = (int*)(Hetarray_contents(dst,daw));
				srcp = (int*)(Hetarray_contents(dst,saw));
			}
			set_obp(dstp,cdv);
			// in case there was a gc
		
		}
		else
		*dstp = *srcp;
		srcp++;
		dstp++;
	}
}

Hetarray copyHetarray(Hetarray src)
{
	int cp;Hetarray dst;
	ob_push(src);
	cp = src -> capacity;
	dst = mk_Hetarray(cp);
	copyintoHetarray(dst,src);
	ob_pop();
	return dst;
}

Hetarray Hetarray_addEntry(Hetarray src)
{
	int ln,cp;Hetarray nh;
	ln = src->length;
	cp = src->capacity;
	if (cp > ln)
	{
		src->length = ln+1;
		Hetarray_setUndefined(src,ln);
		return src;
	}
	else
	{
		ob_push(src);
		nh = mk_Hetarray((cp+1)*2);
		copyintoHetarray(nh,src);
		nh -> length = ln + 1;
		Hetarray_setUndefined(nh,ln);
		ob_pop();
		return nh;
	}
}

Hetarray Hetarray_addDoubleEntry(Hetarray src)
{
	int ln,cp;Hetarray nh;
	ln = src->length;
	cp = src->capacity;
	if (cp > (ln+1))
	{
		src->length = ln+2;
		Hetarray_setDoubleUndefined(src,ln);
		return src;
	}
	else
	{
		ob_push(src);
		nh = mk_Hetarray((cp+1)*2);
		copyintoHetarray(nh,src);
		nh -> length = ln + 2;
		Hetarray_setDoubleUndefined(nh,ln);
		ob_pop();
		return nh;
	}
}


/*
	ann -> storage = storage_double;
	ann -> value_kind = value_kind_onevalue;
    ann = (Annotation)(anns + n +1);
	ann -> storage = storage_double;
	ann -> value_kind = value_kind_undefined;
*/

