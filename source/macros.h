/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

//selectn and setn are non-checking versions
#define Seqob_contents(x) ((ob*)( (ob)x  + Seq_preamble_wsize))
#define Seqob_selectn(x,n) (*(((ob*)x) + Seq_preamble_wsize + n))
#define Seqob_setn(x,n,v) set_obp(((ob*)((ob)x + Seq_preamble_wsize + n)),v)

// convention: fellows that operate on the sequence itself (unboxed) have names that end in "0"
#define Arrayint_contents(x) ((int*)x + Array_preamble_wsize)
#define Arrayint_selectn(x,n) (*((int*)x + Array_preamble_wsize+n))
#define Arrayint_setn(x,n,v) (*((int*)x + Array_preamble_wsize+n)=v)
#define Arrayword_declareModified(x,n,hpi) declareModifiedf((ob*)x + Array_preamble_wsize+n,hpi)


#define Arraybyte_contents(x) ((char*)x + Array_preamble_size)
#define Arraybyte_selectn(x,n) (*((char*)x + Array_preamble_size+n))
#define Arraybyte_setn(x,n,v) (*((char*)x + Array_preamble_size+n)=v)
#define Arraybyte_declareModified(x,n,hpi) declareModifiedf((ob*)x + Array_preamble_wsize+(n/4),hpi)

#define Arrayob_contents(x) ((ob*)((ob)x + Array_preamble_wsize))
#define Arrayob_selectn(x,n) (*(((ob*)x) + Array_preamble_wsize + n))
#define Arrayob_setn(x,n,v) set_obp(((ob*)((ob)x + Array_preamble_wsize + n)),v)

#define Arraydouble_contents(x) ((double*)x + Arraydouble_preamble_dwsize)
#define Arraydouble_selectn(x,n) (*((double*)x + Arraydouble_preamble_dwsize+n))
#define Arraydouble_setn(x,n,v) (*((double*)x + Arraydouble_preamble_dwsize+n)=v)
#define Arraydword_declareModified(x,n,hpi) declareModifiedf((double*)x + Arraydouble_preamble_dwsize+n,hpi)

#define Hetarray_annotations(x) ((char*)x + Array_preamble_size)
#define Hetarray_contents(x,nmaw) ((ob*)((ob)x + Array_preamble_wsize + nmaw))
#define Hetarray_obSelectn(x,nmaw,n) (*(((ob*)x) + Array_preamble_wsize + nmaw + n))
#define Hetarray_obSetn(x,nmaw,n,v) set_obp(((ob*)((ob)x + Array_preamble_wsize + nmaw + n)),v)
#define Hetarray_intSelectn(x,nmaw,n) (*((int*)x + Array_preamble_wsize + nmaw + n))
#define Hetarray_intSetn(x,nmaw,n,v) (*((int*)x + Array_preamble_wsize + nmaw + n)=v)
#define Hetarray_doubleSelectn(x,nmaw,n) (* ((double*)((int*)x + Array_preamble_wsize + nmaw + n)) )
#define Hetarray_doubleSetn(x,nmaw,n,v) (* ((double*)((int*)x + Array_preamble_wsize + nmaw + n)) = v)



#define Hetarray_intSetn(x,nmaw,n,v) (*((int*)x + Array_preamble_wsize + nmaw + n)=v)


#define Compactob_annotations(x) ((char*)x + Compactob_annotation_offset)




#define NSTRINGBODY(n) ((char*)n+8)
#define nstring_contents(n) ((char*)n+8)
#define nstring_selectn(x,n) (*(((char*)x)+n+8))

#define WSTRINGBODY(n) ((short*)n+4)
#define wstring_contents(n) ((short*)n+4)
#define wstring_selectn(x,n) (*(((short*)x)+n+4))

#define Dblock_select_int(x,n) (*((int*)x + Dblock_preamble_wsize+n))
#define Dblock_set_int(x,n,v) (*((int*)x + Dblock_preamble_wsize+n)=v)
#define Dblock_select_double(x,n) (* ((double*)((int*)x + Dblock_preamble_wsize+n)) )
#define Dblock_set_double(x,n,v) (* ((double*)((int*)x + Dblock_preamble_wsize+n)) =v)
#define Dblock_select_ob(x,n) (*((ob*)x + Dblock_preamble_wsize+n))
#define Pm_stack_Dblock_set_ob(x,n,v) (*(((ob*)x) + Dblock_preamble_wsize+n)=v)
//use this for Dblocks except those on a Pm_stack
#define Dblock_set_ob(x,n,v) set_obp(((ob*)x) + Dblock_preamble_wsize+n,v)


#define land(x,y) (x&y)
#define lor(x,y) (x|y)
#define lshift(x,y) (x<<y)

#define is_string(x) ((x->obkind) == string_kind)
#define UM_ERROR error1





#define is_Object(x) ((x->obkind) > 15)
#define Hashtable_kind_allowed(k) ((k>=16) || (k == int_kind) || (k == nstring_kind) || (k == wstring_kind) || (k == double_kind) || (k == dblock_kind))

#define bad_kind(k) ((k==0)||(k==15)||((k>19)&&(k<23))||(k>25))
#define ob_to_intn(x) (((boxedint)x)->value)
#define ob_to_doublen(x) (((boxeddouble)x)->value)

#define car(x) getOb((Object)x,0)
#define cdr(x) getOb((Object)x,1)
#define setcar(x,y) setOb((Object)x,0,y)
#define setcdr(x,y) setOb((Object)x,1,y)

#define seq_data(x) (((Seq)x)->data)





