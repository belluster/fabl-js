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
#include <setjmp.h>
#include <signal.h>

jmp_buf env;


void fablReset()
{
	reset_console_stack();
	printf("RESET\n");
	longjmp(env,1);
//	throw "RESET";
}




void after_error()
{
//    pm_verbose = 0;
//    charp_set_C_flag("pm_verbose",0);
//	throw "fablError";
	if (cgiMode) fablQuit();
	longjmp(env,1);
}


void error2(char* err,char* err2)
{
	tb();
	if (cgiMode) 
	{
		emitHtmlHeader();
		printf("<head><title>ERROR</title></head><body>");
	}
	
	printf("ERROR: %s",err);
	if (err2) printf("%s\n",err2);
//    charp_set_C_flag("pm_verbose",0);
//	no_such_function();
	if (cgiMode) {tb();printf("</body>");fablQuit();}
 	longjmp(env,1);
//   throw err;
}


void error1(char* err)
{
	error2(err,(char*)0);
}

void fpeHandler(int sg)
{
	if (cgiMode) emitHtmlHeader();
 	printf("\nSIGNAL %d\n", sg);
   lastSignal	= sg;
	longjmp(env,1);
}

/* from signal.h
#define SIGINT          2       // interrupt (^c)
#define SIGILL          4       // illegal instruction - invalid function image 
#define SIGFPE          8       // floating point exception 
#define SIGSEGV         11      // segment violation 
#define SIGTERM         15      // Software termination signal from kill 
#define SIGBREAK        21      // Ctrl-Break sequence 
#define SIGABRT         22      // abnormal termination triggered by abort call 

*/

void signalSetup()
{
#ifdef LINUX
	struct sigaction act;
	bzero(&act,sizeof(act));
	act.sa_handler = fpeHandler;
//	sigaction(SIGINT,&act,0);
//	sigaction(SIGBREAK,&act,0);
	sigaction(SIGILL,&act,0);
	sigaction(SIGFPE,&act,0);
	sigaction(SIGSEGV,&act,0);
#endif
}



void fablCatch(Smallob fn)
{ 
	while (1)
	{
		if (setjmp(env) == 0) 
			Function_applyn_ob(fn);
		else
			Function_applyn_ob(fn);
	}
}
