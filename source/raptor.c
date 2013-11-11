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
#include <stdio.h>
#include <string.h>
#include <stdarg.h>
#ifdef HAVE_STDLIB_H
#include <stdlib.h>
#endif
#include <unistd.h>
#include "raptor.h"


static int statementCount = 0;
static Hashtable fimpRaptorStatement;
static ob fimpRSsubjectType;
static ob fimpRSsubject;
static ob fimpRSpredicateType;
static ob fimpRSpredicate;
static ob fimpRSordinal;
static ob fimpRSobjectType;
static ob fimpRSobject;
static ob fimpRSliteralObject;
static ob fimpRSliteralDatatype;
static raptor_uri *exBase; // a dummy base


int raptorVerbose = 0;

static Seqob statements;
static void raptorStatementHandler(void *data,const raptor_statement *stm)
{
  raptor_identifier_type stp,ptp,otp;ob fimpS;int orv;
  raptor_uri* uri;char* uris,*dtp;
  statementCount++;
  fimpS = ob_iNew(fimpRaptorStatement);
  Seqob_add(statements,fimpS);


  stp = stm->subject_type;
  if (raptorVerbose) printf("statement subject_type =  %d\n",stp);
  if ((stp == RAPTOR_IDENTIFIER_TYPE_RESOURCE)||(stp == RAPTOR_IDENTIFIER_TYPE_ANONYMOUS))
  {
   setInt(fimpS,fimpRSsubjectType,stp);
   uris = (char*)(stm->subject);
   if (raptorVerbose) printf("  subject=%s\n",uris);
   setOb(fimpS,fimpRSsubject,charp_intern_string(uris));

  }

  ptp = stm->predicate_type;
  if (raptorVerbose) printf("statement predicate_type =  %d\n",ptp);
  if ((ptp == RAPTOR_IDENTIFIER_TYPE_PREDICATE)||(ptp == RAPTOR_IDENTIFIER_TYPE_ANONYMOUS))
  {
    setInt(fimpS,fimpRSpredicateType,ptp);
    uris = (char*)(stm->predicate);
    if (raptorVerbose) printf("  predicate=%s\n",uris);
    setOb(fimpS,fimpRSpredicate,charp_intern_string(uris));
  }
 if (ptp == RAPTOR_IDENTIFIER_TYPE_ORDINAL)
 {
    setInt(fimpS,fimpRSpredicateType,ptp);
   orv = *((int*)(stm->predicate));
 //   uris = (char*)(stm->predicate);
    if (raptorVerbose) printf("  predicate ordinal=%d\n",orv);
    setInt(fimpS,fimpRSordinal,orv);
}

   otp = stm->object_type;
  if (raptorVerbose) printf("statement object_type =  %d\n",otp);
  if ((otp == RAPTOR_IDENTIFIER_TYPE_RESOURCE)||(otp == RAPTOR_IDENTIFIER_TYPE_ANONYMOUS)||(otp == RAPTOR_IDENTIFIER_TYPE_LITERAL) ||
  (otp == RAPTOR_IDENTIFIER_TYPE_XML_LITERAL))
  {
    setInt(fimpS,fimpRSobjectType,otp);
     uris = (char*)(stm->object);
     dtp = (char*)(stm->object_literal_datatype);
     if (raptorVerbose) printf("  object=%s\n",uris);
     if ((otp == RAPTOR_IDENTIFIER_TYPE_LITERAL) ||
         (otp == RAPTOR_IDENTIFIER_TYPE_XML_LITERAL))
       {
       setOb(fimpS,fimpRSliteralObject,charp_mk_Literal(uris));
       if (dtp)
          {
	  setOb(fimpS,fimpRSliteralDatatype,charp_intern_string(dtp));
	  if (raptorVerbose) printf(" datatype=%s\n",dtp);
	  }
       }
     else
       setOb(fimpS,fimpRSobject,charp_intern_string(uris));
   }

}

static void raptorMessageHandler(void *data,raptor_locator* locator,const char *message)
{
if (!silentMode) printf("%s at line %d column %d\n",message,locator->line,locator->column);
}



static void raptorErrorHandler(void *data,raptor_locator* locator,const char *message)
{
if (cgiMode) emitHtmlHeader();
printf("RDF Parser failed due to XML syntax error; service may be unavailable: %s at line %d column %d\n",message,locator->line,locator->column);
if (cgiMode) fablQuit();
}



static raptor_parser* theParser;
int raptorInitialized = 0;

void raptorNewParser(string prs)
{
  string_copyto(Seqbyte_print_buf,Seqbyte_print_buf_length,prs);
  theParser = raptor_new_parser(Seqbyte_print_buf);
//  raptor_set_feature(theParser,RAPTOR_FEATURE_SCANNING,1);
  raptor_set_fatal_error_handler(theParser,NULL,raptorErrorHandler);
  raptor_set_error_handler(theParser,NULL,raptorMessageHandler); 
  raptor_set_warning_handler(theParser,NULL,raptorMessageHandler); 
  raptor_set_statement_handler(theParser,NULL,raptorStatementHandler);
 }

void raptorInit()
{
if (!raptorInitialized)
  {
  fimpRaptorStatement = selectCharp(boot_fimp,"RaptorStatement");
  fimpRSsubjectType = selectCharp(fimpRaptorStatement,"subjectType");
  fimpRSsubject = selectCharp(fimpRaptorStatement,"subject");
  fimpRSpredicateType = selectCharp(fimpRaptorStatement,"predicateType");
  fimpRSpredicate = selectCharp(fimpRaptorStatement,"predicate");
  fimpRSordinal = selectCharp(fimpRaptorStatement,"ordinal");
    fimpRSobjectType = selectCharp(fimpRaptorStatement,"objectType");
  fimpRSobject = selectCharp(fimpRaptorStatement,"object");
  fimpRSliteralObject = selectCharp(fimpRaptorStatement,"literalObject");
 fimpRSliteralDatatype = selectCharp(fimpRaptorStatement,"literalDatatype");

  raptor_init();

 exBase = raptor_new_uri("http://examples.org/");
  if (raptorVerbose) printf("RAPTOR IS NOW AVAILABLE");
  raptorInitialized = 1;
  }
}


raptor_uri* raptorNewUri(StringBuf uri)
{
   Seqbyte_copyto(Seqbyte_print_buf,Seqbyte_print_buf_length,uri);
   return raptor_new_uri(Seqbyte_print_buf);
}

int raptorParseFile(Seqob rs,StringBuf fln,string stx)
{
    int pr;raptor_uri *flnu;char *flns,*tfln,*fluri;
   if (safeMode) UM_ERROR("File access is prohibited in safeMode");
    statements = rs;
    ob_push(statements);
    flnu = raptorNewUri(fln);

//    pr = raptor_parse_uri(theParser,flnu,raptor_new_uri("http://examples.org/"));
  raptorNewParser(stx);
    pr = raptor_parse_file(theParser,flnu,exBase);
   raptor_free_parser(theParser);
       ob_pop();
    return pr;
}





int raptorParseUri(Seqob rs,StringBuf fln,string stx)
{
    int pr;raptor_uri *flnu;char *flns,*tfln,*fluri;
   if (safeMode && hasFileScheme(fln)) UM_ERROR("File access is prohibited in safeMode");
    statements = rs;
    ob_push(statements);
    flnu = raptorNewUri(fln);
     
//    pr = raptor_parse_uri(theParser,flnu,raptor_new_uri("http://examples.org/"));
  raptorNewParser(stx);
    pr = raptor_parse_uri(theParser,flnu,exBase);
   raptor_free_parser(theParser);
       ob_pop();
    return pr;
}


// As far as I can figure, a new parser has to be allocated every time
// Thiis what grapper does, btw

int raptorParseBuf(Seqob rs,Seqbyte bf,string stx)
{
    int pr;raptor_uri *flnu;char *flns,*tfln,*fluri;
    Arraybyte s;int ln;
    statements = rs;
    ob_push(statements);
    s = bf->data;
    ln = s->length;
    raptorNewParser(stx);
    raptor_start_parse(theParser,exBase);
    pr = raptor_parse_chunk(theParser,Arraybyte_contents(s),ln,1);
    raptor_free_parser(theParser);
    ob_pop();
    return pr;
}





Seqbyte www_buf = NULL;


void www_add_bytes(void* ptr,int numbytes)
{
	Arraybyte dt;int ln,nln,nmb,cp,sva;char* dtp;
	sva = allocating_statically;
	allocating_statically = 1;
	if (!www_buf)
	{
		if (numbytes > 1000) nmb = numbytes + 1000;
		else nmb = 1000;
		www_buf = mk_Seqbyte(nmb);
	}
	dt = www_buf -> data;
	ln = dt->length;
	nln = ln + numbytes;
	cp = dt->capacity;
	if (nln > cp) 
	{
		Seqbyte_ensure_capacity(www_buf,nln*2);
		dt = www_buf->data;
	}

	dtp = Arraybyte_contents(dt);
	memcpy((char*)(dtp + ln),(char*)ptr,numbytes);
	dt->length = nln;
	allocating_statically = sva;
}



void fabl_raptor_www_write_bytes(raptor_www *www,void* userdata,const void* ptr,size_t size, size_t nmemb)
{
	int numbytes;
	numbytes = size * nmemb;
	www_add_bytes(ptr,numbytes);
}



raptor_www  *fabl_raptor_www;

void init_www()
{
	raptor_www_init();
	fabl_raptor_www = raptor_www_new();
	raptor_www_set_user_agent(fabl_raptor_www,"Fabl");
    raptor_www_set_write_bytes_handler(fabl_raptor_www,fabl_raptor_www_write_bytes,NULL);
	raptor_www_set_error_handler(fabl_raptor_www,raptorMessageHandler,NULL);
}

StringBuf www_fetch(StringBuf uri)
{
	raptor_uri* furi;Seqbyte rs;
    if (safeMode && hasFileScheme(uri)) UM_ERROR("File access is prohibited in safeMode");
	furi = raptorNewUri(uri);
	if (www_buf) Seq_reset(www_buf);
	rs = raptor_www_fetch(fabl_raptor_www,furi);
	if (!rs) return www_buf;
	return (StringBuf) nul;
}

#else


void raptorInit(){}
int raptorParseFile(Seqob rs,StringBuf fln)
{
	UM_ERROR("RDF XML syntax is not supported in the windows version");
	return 0;
}

int raptorParseBuf(Seqob rs,Seqbyte bf)
{
	UM_ERROR("RDF XML syntax is not supported in the windows version");
	return 0;
}

void init_www(){}


StringBuf www_fetch(StringBuf uri)
{
	UM_ERROR("Fetching from the web is not supported in the windows version");
	return 0;
}
    
#endif





