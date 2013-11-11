/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

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

#include <windows.h>
#include <stdio.h>

HANDLE hcom;
DCB dcb;

char commPortBuf[10];

int overlap = 0;

COMMTIMEOUTS tmouts;


int openPort(string nm,int drt,int bits,int parity,int stopbits)
{
	BOOL fSuccess;
string_copyto(commPortBuf,10,nm);
//hcom = CreateFile(commPortBuf,GENERIC_READ|GENERIC_WRITE,0,NULL,
if (overlap) hcom = CreateFile(commPortBuf,GENERIC_READ,0,NULL,
        OPEN_EXISTING,FILE_FLAG_OVERLAPPED,NULL);
else
hcom = CreateFile(commPortBuf,GENERIC_READ,0,NULL,
        OPEN_EXISTING,NULL,NULL);
if (!GetCommState(hcom, &dcb)) return 1;

// the following timeout params are equivalent to non-blocking
//fSuccess = GetCommTimeouts(hcom,&tmouts);
tmouts.ReadIntervalTimeout = MAXDWORD;
tmouts.ReadTotalTimeoutMultiplier = 0;
tmouts.ReadTotalTimeoutConstant = 0;
if (!SetCommTimeouts(hcom,&tmouts)) return 2;
if (drt == 4800) 
dcb.BaudRate = CBR_4800;     // set the baud rate
else
if (drt == 9600)
dcb.BaudRate = CBR_9600;     // set the baud rate

   dcb.ByteSize = 8;             // data size, xmit, and rcv
   dcb.Parity = NOPARITY;        // no parity bit
   dcb.StopBits = ONESTOPBIT;    // one stop bit

   if (!SetCommState(hcom, &dcb)) return 3;
return 0;
}

OVERLAPPED gOverlapped;


// verify that sizeof(inBuffer <= nBytestoRead)
 
// attempt an asynchronous read operation

char commIbuf[1000];
int nBytesRead;
int firstCall = 1;
int readPort(Seqbyte rs,int bytesToRead)
{
BOOL rrs;
// set up overlapped structure fields
if (firstCall && overlap) 
{
	gOverlapped.Offset     = 0; 
	gOverlapped.OffsetHigh = 0; 
	firstCall = 0;
}
//gOverlapped.hEvent     = hEvent; 
if (overlap)
rrs = ReadFile(hcom, commIbuf, bytesToRead, &nBytesRead, 
//    NULL) ; 
    &gOverlapped) ; 
else
rrs = ReadFile(hcom, commIbuf, bytesToRead, &nBytesRead,  NULL) ; 

Seqbyte_charp_int_append(rs,commIbuf,nBytesRead);
return nBytesRead;
}


/*
//openPort('COM4');
var prs = "";

void function echoPort(id com,int dtr)
{
  openPort(com,dtr,8,false,1);
  while (true)
     {
	 sleepMsec(50);
	 reset(prs);readPort(prs,100);
	 if (length(prs)>0) writeln(prs); else writeln("ZERO");
	 }
}

  echoPort('COM4',4800);


void function clearHighBit(string prs)
{
   var int ln,i;
   ln = length(prs);
   for (i = 0;i<ln;i++)
	   prs[i] = land(prs[i],127);
}

*/
