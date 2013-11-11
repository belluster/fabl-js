/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

// treatment of calling C

// the C function int_um_c_apply(int_fcnp fn,int numints,int numdoubles,int* intargs,double* doubleargs)
// dispatches to the function f with the given args of each kind
// rule: all functions take ints and obs (mixed) followed by doubles
// Here, intargs includes boths obs and ints, and numints counts both kinds
#include "includes.h"



int int_um_c_apply(int_fcnptr fn,int numints,int numdoubles,int* intargs,double* doubleargs)
   {
   switch (numints)
   {
   case 0:
	   switch (numdoubles) 
	   {
	   case 0: return fn();
	   case 1: return fn(doubleargs[0]);
	   case 2: return fn(doubleargs[0],doubleargs[1]);
	   case 3: return fn(doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 1:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0]);
	   case 1: return fn(intargs[0],doubleargs[0]);
	   case 2: return fn(intargs[0],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 2:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1]);
	   case 1: return fn(intargs[0],intargs[1],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 3:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1],intargs[2]);
	   case 1: return fn(intargs[0],intargs[1],intargs[2],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],intargs[2],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],intargs[2],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 4:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1],intargs[2],intargs[3]);
	   case 1: return fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
    case 5:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4]);
	   case 1: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
}
   }




double double_um_c_apply(double_fcnptr fn,int numints,int numdoubles,int* intargs,double* doubleargs)
   {
   switch (numints)
   {
   case 0:
	   switch (numdoubles) 
	   {
	   case 0: return fn();
	   case 1: return fn(doubleargs[0]);
	   case 2: return fn(doubleargs[0],doubleargs[1]);
	   case 3: return fn(doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 1:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0]);
	   case 1: return fn(intargs[0],doubleargs[0]);
	   case 2: return fn(intargs[0],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 2:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1]);
	   case 1: return fn(intargs[0],intargs[1],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 3:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1],intargs[2]);
	   case 1: return fn(intargs[0],intargs[1],intargs[2],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],intargs[2],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],intargs[2],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 4:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1],intargs[2],intargs[3]);
	   case 1: return fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 5:
	   switch (numdoubles) 
	   {
	   case 0: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4]);
	   case 1: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0]);
	   case 2: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0],doubleargs[1]);
	   case 3: return fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0],doubleargs[1],doubleargs[2]);
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
   }
   }




void void_um_c_apply(double_fcnptr fn,int numints,int numdoubles,int* intargs,double* doubleargs)
   {
   switch (numints)
   {
   case 0:
	   switch (numdoubles) 
	   {
	   case 0: fn();return;
	   case 1: fn(doubleargs[0]);return;
	   case 2: fn(doubleargs[0],doubleargs[1]);return;
	   case 3: fn(doubleargs[0],doubleargs[1],doubleargs[2]);return;
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 1:
	   switch (numdoubles) 
	   {
	   case 0:fn(intargs[0]);return;
	   case 1:fn(intargs[0],doubleargs[0]);return;
	   case 2:fn(intargs[0],doubleargs[0],doubleargs[1]);return;
	   case 3:fn(intargs[0],doubleargs[0],doubleargs[1],doubleargs[2]);return;
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 2:
	   switch (numdoubles) 
	   {
	   case 0:fn(intargs[0],intargs[1]);return;
	   case 1:fn(intargs[0],intargs[1],doubleargs[0]);return;
	   case 2:fn(intargs[0],intargs[1],doubleargs[0],doubleargs[1]);return;
	   case 3:fn(intargs[0],intargs[1],doubleargs[0],doubleargs[1],doubleargs[2]);return;
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 3:
	   switch (numdoubles) 
	   {
	   case 0:fn(intargs[0],intargs[1],intargs[2]);return;
	   case 1:fn(intargs[0],intargs[1],intargs[2],doubleargs[0]);return;
	   case 2:fn(intargs[0],intargs[1],intargs[2],doubleargs[0],doubleargs[1]);return;
	   case 3:fn(intargs[0],intargs[1],intargs[2],doubleargs[0],doubleargs[1],doubleargs[2]);return;
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
   case 4:
	   switch (numdoubles) 
	   {
	   case 0:fn(intargs[0],intargs[1],intargs[2],intargs[3]);return;
	   case 1:fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0]);return;
	   case 2:fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0],doubleargs[1]);return;
	   case 3:fn(intargs[0],intargs[1],intargs[2],intargs[3],doubleargs[0],doubleargs[1],doubleargs[2]);return;
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
    case 5:
	   switch (numdoubles) 
	   {
	   case 0:fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4]);return;
	   case 1:fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0]);return;
	   case 2:fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0],doubleargs[1]);return;
	   case 3:fn(intargs[0],intargs[1],intargs[2],intargs[3],intargs[4],doubleargs[0],doubleargs[1],doubleargs[2]);return;
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
	   }
	   default:UM_ERROR("TOO MANY ARGS IN DISPATCH");
  }
   }

		   
		   
   
   
