/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review


// A value of type stringbuffer is either a Seqbyte or Seqshort
// As of 9/15/03  seqshorts aren't ready, so just dispatch to seqbyte

#include "includes.h"


void set_silentMode(int v)
{
	silentMode = v;
}


int get_silentMode()
{
	return silentMode;
}

void terpri()
{
	if (!silentMode) printf("\n");
}


StringBuf  mk_StringBuf(int capacity){ return mk_Seqbyte(capacity);}

StringBuf  mk_empty_StringBuf(){ return mk_empty_Seqbyte();}

StringBuf string_mk_StringBuf(string s)
{
	return string_mk_Seqbyte(s);
}


StringBuf charp_mk_StringBuf(char* s)
{
	return string_mk_Seqbyte(charp_mk_string(s));
}

ob charp_mk_Literal(char *s)
{
	Object rs;
	rs = string_mk_Seqbyte(charp_mk_string(s));
	set_ob(rs->types,LiteralT);
	return rs;
}

StringBuf StringBuf_add(StringBuf bx,int n) {return Seqbyte_add(bx,n);}


int StringBuf_equal(StringBuf x,StringBuf y) {return Seqbyte_equal(x,y);}

StringBuf StringBuf_append(StringBuf x,StringBuf y) {Seqbyte_append(x,y);return x;}

StringBuf StringBuf_concat(StringBuf x,StringBuf y)
{
	int lnx,lny;Seqbyte rs;
	lnx = ((Seqbyte)x)->data->length;
	lny = ((Seqbyte)y)->data->length;
	ob_push2(x,y);
	rs = mk_Seqbyte(lnx+lny);
	Seqbyte_append(rs,x);
	Seqbyte_append(rs,y);
    ob_popn(2);
	return (StringBuf) rs;
}

StringBuf StringBuf_string_append(StringBuf x,string y) {Seqbyte_string_append(x,y);return x;}


StringBuf StringBuf_int_append(StringBuf x,int y) {Seqbyte_int_append(x,y);return x;}


StringBuf int_to_string(int y) 
{
	StringBuf rs;
	rs = mk_StringBuf(1);// later maybe psych out how many digits are needed
    ob_push(rs);
	Seqbyte_int_append(rs,y);
	ob_pop();
	return rs;
}



StringBuf StringBuf_double_append(StringBuf x,double y) {Seqbyte_double_append(x,y);return x;}



StringBuf double_to_string(double y) 
{
	StringBuf rs;
	rs = mk_StringBuf(1);// later maybe psych out how many digits are needed
    ob_push(rs);
	Seqbyte_double_append(rs,y);
	ob_pop();
	return rs;
}

double StringBuf_to_double(StringBuf x){return Seqbyte_to_double(x);}

//double Literal_to_double(ob x){return Seqbyte_to_double(x);}

StringBuf StringBuf_copy(StringBuf bx) {return Seqbyte_copy(bx);}

int StringBuf_select(StringBuf x,int n){return Seqbyte_select(x,n);}

void StringBuf_set(StringBuf x,int n,int v){Seqbyte_set(x,n,v);}

void StringBuf_print(StringBuf x)
{
	if (!silentMode) Seqbyte_print(x);
}

string StringBuf_to_string(StringBuf x){Seqbyte_to_string(x);}

void StringBuf_int_int_select(StringBuf rs,StringBuf x,int lb,int ub)
{
	Seqbyte_int_int_select(rs,x,lb,ub);
}

int StringBuf_to_int(StringBuf s)
{  
	return Seqbyte_to_int(s);
}


//int Literal_to_int(ob s)
//{  
//	return Seqbyte_to_int(s);
//}

