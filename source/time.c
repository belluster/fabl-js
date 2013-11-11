/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

#ifdef LINUX

#include <sys/time.h>

double current_time()
{
    struct timeval tm;int sc,usc;
    gettimeofday(&tm,0);
	sc = (int)(tm.tv_sec);
	usc = (int)(tm.tv_usec);
	return sc + 0.000001 * usc;
}

// since start up 
int time_msec()
{
    struct timeval tm;int sc,usc;
	static int startsc = 0;
	static int startusc;
	gettimeofday(&tm,0);
	sc = (int)(tm.tv_sec);
	usc = (int)(tm.tv_usec);
	if(!startsc)
	{
		startsc = sc;
		startusc = usc;
	}
    return ((sc - startsc) * 1000) + ((usc - startusc)/1000); 
}


#else

#include <stdio.h>
#include <sys/timeb.h>
#include <time.h>

double current_time()
{
    struct timeb t;
    ftime(&t);
	return (t.time) + 0.001 * t.millitm;
}

int time_msec()
{
    struct timeb t;
	static int start;
	ftime(&t);
	if(!start)
	  start = t.time;
    return ((t.time - start) * 1000) + t.millitm; 
}

#endif


