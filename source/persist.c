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

int persistMode = 0;
#define maxPersistentObjects 100000
int persistCount = 0;
void** persistentObjects;
// returns 1 if something was done
ob declarePersistent(ob ix)
{
	int pk;Object x;
    if (!ix) return ix;
	if ((ix->obkind)<16) return ix;
	x = (Object)ix;
	pk = x->persistKind;
	if (pk < 2)
	{
		if (!persistCount) 
			persistentObjects = (void**)malloc(maxPersistentObjects*aword_size);
		x->persistKind = dPersistent;
		x->pagenumber = persistCount + 1000;
		persistentObjects[persistCount++] = x;
		if (persistCount == maxPersistentObjects) UM_ERROR("Too many persistent objects");
	}
	return ix;
}

int setPersistMode(int v)
{
	int pv;
	pv = persistMode;
	if (v) persistMode = 1; 
	else persistMode = 0;
	return pv;
}

int persistKindOf(ob v)
{
	if (!v) return 0;
	if ((v->obkind) < 16) return 0;
	return ((Object)v)->persistKind;
}

int persistIndex(ob v)
{
	Object vo;int pk;
	if (!v) return -1;
	if ((v->obkind) < 16) return -1;
	vo = (Object)v;
	pk = vo->persistKind;
	if (pk > 1)  return (vo->pagenumber)-1000;
	return -1;
}




