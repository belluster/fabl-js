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
void* stackBottom;
char  startupFile[52] = "";

// arguments whichHeapSize startupFile 
// each is optional

int main(int argc,char** argv)
  {
	int tm,cnsl,hsz;char *fa;
	if (argc > 1) 
	{
		sscanf(argv[1],"%d",&whichHeapSize);
        if (argc > 2)
		{
			fa = argv[2];
			if (strlen(fa)>50) {printf("%s\n","Startup file too long");exit(0);}
			strcpy(startupFile,fa);
		}
//		printf("%s\n",startupFile);
	}
	signalSetup();
	tm = time_msec();
    cnsl = !getenv("PATH_TRANSLATED");
	cgiMode = !cnsl;
	stackBottom = &tm;
	initFabl(cnsl); //cnsl  = console version
 }



