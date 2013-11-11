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
/* importable socket ops */
// reuse the filenameBuf from io for temp char* storage
#ifndef LINUX
int connectToSocket(Seqbyte hnam,int snum)
{
	Seqbyte_copyto_filenameBuf(hnam);
    return connect_to_socket(filenameBuf,snum);
}

int connectToSocketByAddr(Seqbyte hnam,int snum)
{
	Seqbyte_copyto_filenameBuf(hnam);
    return connect_to_socket_byaddr(filenameBuf,snum);
}


// appends onto buf; accepts only as many bytes as are available 
int socketRead(int s,Seqbyte buf)
{
	int ln,cp,rs;Arraybyte adt;char* dt;
	adt = buf->data;
	ln = adt->length;
	cp = adt -> capacity;
	dt = Arraybyte_contents(adt);
	rs = socket_read(s,dt,cp-ln);
	if (rs > 0) adt->length = ln+rs;
	return rs;
}
// variant with a request as to how much to read
int socketRead2(int s,Seqbyte buf,int nmb)
{
	int ln,nln,cp,rs;Arraybyte adt;char* dt;
	adt = buf->data;
	ln = adt->length;
	nln = ln + nmb;
	ob_push(buf);
    Seqbyte_ensure_capacity(buf,nln);
	adt = buf->data;
	dt = Arraybyte_contents(adt);
	rs = socket_read(s,dt+ln,nmb);
	if (rs > 0) adt->length = nln;
	ob_pop();
	return rs;
}




int socketWrite(int s,Seqbyte buf)
{
	int ln;char* dt;Arraybyte adt;
	adt = buf->data;
	ln = adt->length;
	dt = Arraybyte_contents(adt);
	return socket_write(s,dt,ln);
}
#endif

