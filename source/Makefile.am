bin_PROGRAMS = fabl
fabl_SOURCES = time.c globals.c heap.c \
seqint.c seqbyte.c seqdouble.c seqob.c values.c string.c hashtable.c \
smallob.c obops.c bootstrap.c stringbuf.c append.c pmstate.c \
pmstack.c dblock.c pcode.c pm.c io.c imports.c list.c serialize.c \
serializecollect.c hetarray.c rdfinit.c init.c main.c top.c hash.c callc.c raptor.c stubs.c

#fabl_LDADD = /usr/local/src/raptor-1.0.0/.libs/libraptor.a /usr/local/lib/libxml2.so.2.5.4
fabl_LDADD = @FABL_LIBS@
AM_CFLAGS=@CFLAGS@ -w -O0 -DLINUX
bindir="../bin"
