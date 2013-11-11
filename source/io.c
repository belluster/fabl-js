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
#ifdef LINUX
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <dirent.h>
#else
#include <windows.h>
#endif
#include <stdio.h>
#include <fcntl.h>

int charAvail()
  {
#ifdef LINUX
  return 0; //for now
#else
  return _kbhit();
#endif
  }

void sleepMsec(int n)
{
#ifndef LINUX
	Sleep(n);
#endif
}


int Seqbyte_readLine(Seqbyte s)
{
	Arraybyte dt;char* rs;
	dt = s -> data;
	dt->length = 0;
	ob_push(s);
	Seqbyte_ensure_capacity(s,500);
 	dt = s -> data;//maybe dt moved
    rs = fgets(Arraybyte_contents(dt),500,stdin);
    dt->length = strlen(rs);
    ob_pop();
	return dt->length;
}

#define filenameBuf_length 200

char filenameBuf[filenameBuf_length];

char userDir[userDirBuf_length];


void Seqbyte_copyto_filenameBuf(Seqbyte f)
{
	Seqbyte_copyto(filenameBuf,filenameBuf_length,f);
}


int Seqbyte_Seqbyte_readFromFile(Seqbyte dst,Seqbyte fln)
{
   FILE *stream;int sz,cln,nln;Arraybyte dt;char* dtp;
   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   Seqbyte_copyto_filenameBuf(fln);
   if( (stream = fopen(filenameBuf, "rb" )) == NULL ) return 0;
   {
	      ob_push(dst);
          fseek (stream , 0 , SEEK_END);
		  sz = ftell (stream);
		  rewind (stream);
		  cln = dst->data->length;
		  nln = cln + sz;
		  Seqbyte_ensure_capacity(dst,nln);
		  dt = dst->data;
		  dt -> length = nln;
		  dtp = Arraybyte_contents(dt) + cln;
          fread(dtp,1,sz,stream);
		  fclose( stream );
		  ob_pop();
		  return 1;
   }
}



int Seqbyte_fileExists(Seqbyte fln)
{
   FILE *stream;
   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   Seqbyte_copyto_filenameBuf(fln);
   if( (stream = fopen(filenameBuf, "rb" )) == NULL ) return 0;
   fclose(stream);
   return 1;
}



// the startCount is the fabl invocation index; each time
// fabl starts up,  this is bumped. Supports unique naming.

// NEEDS A LOCK SOMEDAY

char startCountBuf[16];

void bumpStartCount()
{
   FILE *stream;int cnt,rs;
   if( (stream = fopen("startcount.txt", "rb" )) == NULL ) UM_ERROR("Failure to access startcount.txt");
   cnt = fread(startCountBuf,1,50,stream);
   fclose( stream );
   startCountBuf[cnt] = 0;
   sscanf(startCountBuf,"%d",&startCount);
   startCount++;
   sprintf(startCountBuf,"%d",startCount);
   if( (stream = fopen("startcount.txt", "wb" )) == NULL ) UM_ERROR("Failure to access startcount.txt");
   {
      fwrite(startCountBuf,1,strlen(startCountBuf),stream);
      fclose( stream );
   }
   return rs;
}

int getStartCount(){ return startCount;}

int tempFileIndex =0;
int pubFileIndex = 0;
char tempFilenameBuf[100];


void writeToTempFile(Seqbyte bf,Seqbyte ext,Seqbyte s)
{
   FILE *stream;int ln,rs,fln;
//   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   ln = s ->data->length;
   if (ln > maxTempFileSize) UM_ERROR("Exceeded maxTempfileSize limit");
   ob_push(bf);
   Seq_reset(bf);
   strcpy(filenameBuf,tempDir);
   strcat(filenameBuf,"t_");
   sprintf(filenameBuf+strlen(filenameBuf),"%d",startCount);
   strcat(filenameBuf,"_");
   sprintf(filenameBuf+strlen(filenameBuf),"%d",tempFileIndex++);
   fln = strlen(filenameBuf);
   Seqbyte_copyto(filenameBuf+fln,filenameBuf_length-fln,ext);
   // don't include tempdir in the return value 
   Seqbyte_charp_append(bf,filenameBuf + strlen(tempDir));
   ob_pop();
   if( (stream = fopen(filenameBuf, "wb" )) == NULL ) UM_ERROR("Unable to write tempfile");
   {
	   ln = s ->data->length;
       rs =  fwrite(Arraybyte_contents(s->data),sizeof(char),ln,stream);
      fclose( stream );
   }
}

// this auto allocates a file in pubDir
void writeToPubFile(Seqbyte bf,Seqbyte seed,Seqbyte ext,Seqbyte s)
{
   FILE *stream;int ln,rs,fln,spr;
//   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   ln = s ->data->length;
   if (ln > maxTempFileSize) UM_ERROR("Exceeded maxTempfileSize limit");
   ob_push(bf);
   Seq_reset(bf);
   Seqbyte_copyto_filenameBuf(seed);
   spr = strspn(filenameBuf,"abcdefghijklmnopqrstuvwxyz0123456789_");
   if (spr<strlen(filenameBuf)) 
	   UM_ERROR("Illegal seed");
   Seqbyte_copyto_filenameBuf(ext);
   if (strspn(filenameBuf,"abcdefghijklmnopqrstuvwxyz0123456789_.")<strlen(filenameBuf)) 
	   UM_ERROR("Illegal extension");
   strcpy(filenameBuf,pubDir);
   strcat(filenameBuf,"t_");
   sprintf(filenameBuf+strlen(filenameBuf),"%d",startCount);
   strcat(filenameBuf,"_");
   sprintf(filenameBuf+strlen(filenameBuf),"%d",pubFileIndex++);
   fln = strlen(filenameBuf);
   Seqbyte_copyto(filenameBuf+fln,filenameBuf_length-fln,ext);
   // don't include pubdir in the return value 
   Seqbyte_charp_append(bf,filenameBuf + strlen(pubDir));
   ob_pop();
   if( (stream = fopen(filenameBuf, "wb" )) == NULL ) UM_ERROR("Unable to write tempfile");
   {
	   ln = s ->data->length;
       rs =  fwrite(Arraybyte_contents(s->data),sizeof(char),ln,stream);
      fclose( stream );
   }
}


// idea: users can own directories at the server, and have file access therein

void writeToUserDir(Seqbyte fln,Seqbyte s)
{
   FILE *stream;int ln,rs,spr;
   if (strlen(userDir) == 0) UM_ERROR("No user directory available");
//   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   ln = s ->data->length;
   if (ln > maxTempFileSize) UM_ERROR("Exceeded maxTempfileSize limit");
   Seqbyte_copyto_filenameBuf(fln);
   spr = strspn(filenameBuf,"abcdefghijklmnopqrstuvwxyz0123456789_/.");
   if (spr<strlen(filenameBuf)) 
	   UM_ERROR("Illegal filename");
   if (!strncmp(filenameBuf,"/",1)) error2("Illegal filename:",filenameBuf);
   if (strstr(filenameBuf,"..")) error2("Illegal filename",filenameBuf);
   if (strstr(filenameBuf,"//")) error2("Illegal filename",filenameBuf);
   strcpy(filenameBuf,userDir);
   ln = strlen(filenameBuf);
   Seqbyte_copyto(filenameBuf+ln,filenameBuf_length-ln,fln);
   if( (stream = fopen(filenameBuf, "wb" )) == NULL ) error2("Unable to write user file:",filenameBuf);
   {
	   ln = s ->data->length;
       rs =  fwrite(Arraybyte_contents(s->data),sizeof(char),ln,stream);
      fclose( stream );
   }
}

void setUserDir(Seqbyte fln)
{
   if (safeMode) UM_ERROR("Cannot set the user directory while in safeMode");
   Seqbyte_copyto(userDir,userDirBuf_length,fln);
}



int Seqbyte_readFromStdin(Seqbyte dst,int ln)
{
   int aln,cln,nln;Arraybyte dt;char* dtp;
   	      ob_push(dst);
		  cln = dst->data->length;
		  nln = cln + ln;
		  Seqbyte_ensure_capacity(dst,nln);
		  dt = dst->data;
		  dtp = Arraybyte_contents(dt) + cln;
          aln = fread(dtp,1,ln,stdin);
		  dt -> length = cln + aln;
		  ob_pop();
		  return aln == ln;
}


int Seqbyte_Seqbyte_writeToFile(Seqbyte fln,Seqbyte s)
{
   FILE *stream;int ln,rs;
   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   Seqbyte_copyto_filenameBuf(fln);
   if( (stream = fopen(filenameBuf, "wb" )) == NULL ) return 0;
   {
	   ln = s ->data->length;
       rs =  fwrite(Arraybyte_contents(s->data),sizeof(char),ln,stream);
      fclose( stream );
	  return 1;
   }
}


#ifndef LINUX
void cgiInit()
{
	_setmode( _fileno( stdin ), _O_BINARY );
	_setmode( _fileno( stdout ), _O_BINARY );
}
#else
// returns -1 if the file does not exist

int Seqbyte_filesize(Seqbyte fln)
{
   struct stat stbuf;int rs;
   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   Seqbyte_copyto_filenameBuf(fln);
   rs = stat(filenameBuf,&stbuf);
   if (rs != 0) return -1; // file is missing
   return (int)(stbuf.st_size);

}

int Seqob_Seqbyte_directoryEntries(Seqob rs,Seqbyte dnm)
{
   struct dirent *dent;char* nm;int ln;Seqbyte ns;
   FILE *stream;
   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
   Seqbyte_copyto_filenameBuf(dnm);
   if( (stream = opendir(filenameBuf)) == NULL ) return 0;
   dent = readdir(stream);
   ob_push(rs);
   while (dent != NULL)
   {	   
	   nm = dent -> d_name;
	   ln = strlen(nm);
	   ns = mk_Seqbyte(ln);
	   Seqbyte_charp_int_append(ns,nm,ln);
	   Seqob_add1(rs,ns);
	   dent = readdir(stream);
   }
   ob_pop();
   return 1;
}

#endif

int Seqbyte_string_getenv(Seqbyte rs,string v)
{
	char* ev;int ln;Arraybyte dt;
	ob_push(rs);
    string_copyto(string_print_buf,STRING_PRINT_BUF_LENGTH,v);
    ev = getenv(string_print_buf);
	if (!ev) 
	{
		rs -> data -> length = 0;
		ob_pop();
		return -1;
	}
	ln = strlen(ev);
	Seqbyte_ensure_capacity(rs,ln);
	dt = rs -> data;
	dt -> length = ln;
	memcpy(Arraybyte_contents(dt),ev,ln);
	ob_pop();
	return ln;
}

// used in raptor
char fileSchemeBuf[5];

int hasFileScheme(StringBuf fln)
{
	int i,c;
	Seqbyte_copyto(fileSchemeBuf,5,fln);
	if (strlen(fileSchemeBuf) < 4) return 0;
	   // lower case
	for (i=0;i<4;i++)
	{
		c = fileSchemeBuf[i];
		if (c < 97) fileSchemeBuf[i] = c + 32;
	}
	return (!strncmp("file",fileSchemeBuf,4));
}


void fablQuit()
{
	exit(0);
}

// resource limits


int getSafeMode(){return safeMode;}
// one way only!!
void setSafeMode(int v)
{
	if (!v) UM_ERROR("Cannot clear  safeMode!");
	safeMode = 1;
}

int getMaxMemory(){return maxMemory;}

int setMaxMemoryCalled = 0;

void setMaxMemory(int v)
{
	if (setMaxMemoryCalled)  
	{
		if (v > maxMemory) UM_ERROR("Cannot increase the maxMemory limit");
	}
	if (memoryAllocated > v) UM_ERROR("Too late: that much memory is already allocated");
	maxMemory = v;
	setMaxMemoryCalled = 1;
}

int getMemoryAllocated(){return memoryAllocated;}

int getMaxPmSteps(){return maxPmSteps;}

int setMaxPmStepsCalled = 0;

void setMaxPmSteps(int v)
{
	if (setMaxPmStepsCalled)  
	{
		if (v > maxPmSteps) UM_ERROR("Cannot increase the  maxPmSteps limit");
	}
	maxPmSteps = v;
	setMaxPmStepsCalled = 1;
}


int getMaxTempFileSize(){return maxTempFileSize;}

int setMaxTempFileSizeCalled = 0;

void setMaxTempFileSize(int v)
{
	if (setMaxTempFileSizeCalled)  UM_ERROR("Cannot set maxTempFileSize twice");	
	maxTempFileSize = v;
	setMaxTempFileSizeCalled = 1;
}

int httpHeaderEmitted = 0;

int setHttpHeaderEmitted()
{
	if (httpHeaderEmitted) return 0;
	httpHeaderEmitted = 1;
	return 1;
}



void emitHtmlHeaderWithLength(int ln)
{
	if (!httpHeaderEmitted)
	{
//	 printf("HTTP/1.0 200 OK\015\012");
	 printf("Server: fabl/2.0\015\012");
	 if (ln >= 0) printf("Content-Length: %d\015\012",ln);
	 printf("Content-Type: text/html\015\012\015\012");
    httpHeaderEmitted = 1;
	}
}

void emitHtmlHeader()
{
	emitHtmlHeaderWithLength(-1);
}




