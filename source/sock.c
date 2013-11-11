/*
* Copyright (C) 2004 Map Bureau - http://www.mapbureau.com
*
* This package is Free Software released under the BSD license.
*
* See license.html at the top of this package for the full license terms.
*
*/

// Most code comments temporarily excised, pending review

/* csock.c -- socket support stuff */
#ifndef LINUX
#  include <winsock.h>
#  define ERRNO WSAGetLastError()
#  define ERRNO_STR socket_error2str(ERRNO)


#ifndef INVALID_SOCKET
#  define INVALID_SOCKET (-1)
#endif

#ifndef SOCKET_ERROR
#  define SOCKET_ERROR (-1)
#endif
//#define SOCKET_VERBOSE
static int use_send = 0;
static int use_recv = 0;

#ifdef WNT

/* SOCKET INIT */
#define IS_VERBOSE 0

void socket_init()
{	static int first_time = 1;
	WORD ver;
	WSADATA info;
	int err;
	if(first_time) {
	  first_time = 0;
	  ver = MAKEWORD(1, 1);
	  err = WSAStartup(ver, &info);
	  if(err || IS_VERBOSE)
	    printf("csock: WSAStartup() returned %d\n", err);
	} 
}

char* socket_error2str(n)
  int n;
{
	switch(n) {
	  case WSAEINTR: return "EINTR";
	  case WSAEBADF: return "EBADF";
	  case WSAEACCES: return "EACCES";
	  case WSAEFAULT: return "EFAULT";
	  case WSAEINVAL: return "EINVAL";
	  case WSAEMFILE: return "EMFILE";
	  case WSAEWOULDBLOCK: return "EWOULDBLOCK";
	  case WSAEINPROGRESS: return "EINPROGRESS";
	  case WSAEALREADY: return "EALREADY";
	  case WSAENOTSOCK: return "ENOTSOCK";
	  case WSAEDESTADDRREQ: return "EDESTADDRREQ";
	  case WSAEMSGSIZE: return "EMSGSIZE";
	  case WSAEPROTOTYPE: return "EPROTOTYPE";
	  case WSAENOPROTOOPT: return "ENOPROTOOPT";
	  case WSAEPROTONOSUPPORT: return "EPROTONOSUPPORT";
	  case WSAESOCKTNOSUPPORT: return "ESOCKTNOSUPPORT";
	  case WSAEOPNOTSUPP: return "EOPNOTSUPP";
	  case WSAEPFNOSUPPORT: return "EPFNOSUPPORT";
	  case WSAEAFNOSUPPORT: return "EAFNOSUPPORT";
	  case WSAEADDRINUSE: return "EADDRINUSE";
	  case WSAEADDRNOTAVAIL: return "EADDRNOTAVAIL";
	  case WSAENETDOWN: return "ENETDOWN";
	  case WSAENETUNREACH: return "ENETUNREACH";
	  case WSAENETRESET: return "ENETRESET";
	  case WSAECONNABORTED: return "ECONNABORTED";
	  case WSAECONNRESET: return "ECONNRESET";
	  case WSAENOBUFS: return "ENOBUFS";
	  case WSAEISCONN: return "EISCONN";
	  case WSAENOTCONN: return "ENOTCONN";
	  case WSAESHUTDOWN: return "ESHUTDOWN";
	  case WSAETOOMANYREFS: return "ETOOMANYREFS";
	  case WSAETIMEDOUT: return "ETIMEDOUT";
	  case WSAECONNREFUSED: return "ECONNREFUSED";
	  case WSAELOOP: return "ELOOP";
	  case WSAENAMETOOLONG: return "ENAMETOOLONG";
	  case WSAEHOSTDOWN: return "EHOSTDOWN";
	  case WSAEHOSTUNREACH: return "EHOSTUNREACH";
	  case WSAENOTEMPTY: return "ENOTEMPTY";
	  case WSAEPROCLIM: return "EPROCLIM";
	  case WSAEUSERS: return "EUSERS";
	  case WSAEDQUOT: return "EDQUOT";
	  case WSAESTALE: return "ESTALE";
	  case WSAEREMOTE: return "EREMOTE";
	  case WSAEDISCON: return "EDISCON";
	  case WSASYSNOTREADY: return "SYSNOTREADY";
	  case WSAVERNOTSUPPORTED: return "VERNOTSUPPORTED";
	  case WSANOTINITIALISED: return "NOTINITIALISED";
	  case WSAHOST_NOT_FOUND: return "HOST_NOT_FOUND";
	  case WSATRY_AGAIN: return "TRY_AGAIN";
	  case WSANO_RECOVERY: return "NO_RECOVERY";
	  case WSANO_DATA: return "NO_DATA";
	  default:
	    return "???";
	}
}

#endif

/* CONNECT TO SOCKET
   takes the name of the host, and the name of the socket, and returns the
   socket , or error codes: -1 if socket creation fails, -2 if host not found,
   -3 if socket connection failed, -4 if socket_noblock() fails
*/

int connect_to_socket(hnam, snum)
  char *hnam;
  int snum;
{
	int sock;
	struct sockaddr_in server;
	struct hostent *hp;
#ifndef WNT
	struct hostent *gethostbyname();
#endif

#ifdef WNT
	socket_init();
#endif
	sock = socket(AF_INET, SOCK_STREAM, 0);
	if(sock == INVALID_SOCKET) {
	  printf("csock: socket failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
	server.sin_family = AF_INET;
	hp = gethostbyname(hnam);
	if(hp == 0)
	  return -2;
	memcpy((char *) &server.sin_addr, (char *) hp->h_addr, hp->h_length);
	server.sin_port = htons((short)snum);
	if(connect(sock, (struct sockaddr *) & server, sizeof server) == SOCKET_ERROR) {
#ifdef SOCKET_VERBOSE
		printf("csock: connect failed: error %d %s\n", ERRNO, ERRNO_STR);
#endif
	  return -3;
	}
	if(socket_noblock(sock))
	  return -4;
	return sock;
}

/* CONNECT_TO_SOCKET_BYADDR
   is like connect_to_socket, but takes the ip address of the host instead of its name
   */

int connect_to_socket_byaddr(hnam, snum)
  char *hnam;
  int snum;
{
	int sock;
	int ipaddr;
	struct sockaddr_in server;
	struct hostent *hp;
#ifndef WNT
	struct hostent *gethostbyname();
#endif

#ifdef WNT
	socket_init();
#endif
	sock = socket(AF_INET, SOCK_STREAM, 0);
	if(sock == INVALID_SOCKET) {
	  dprintf("csock: socket failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
	server.sin_family = AF_INET;
	ipaddr = inet_addr(hnam);
	hp = gethostbyaddr((char*)(&ipaddr),4,PF_INET);

	if(hp == 0)
	  return -2;
	memcpy((char *) &server.sin_addr, (char *) hp->h_addr, hp->h_length);
	server.sin_port = htons((short)snum);
	if(connect(sock, (struct sockaddr *) & server, sizeof server) == SOCKET_ERROR) {
	  dprintf("csock: connect failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -3;
	}
	if(socket_noblock(sock))
	  return -4;
	return sock;
}



/* CREATE A SOCKET -- also listens */

int create_a_socket(port)
  int port;
{	int sock, msgsock;
	struct sockaddr_in server;

#ifdef WNT
	socket_init();
#endif
	sock = socket(AF_INET, SOCK_STREAM, 0);
	if(sock == INVALID_SOCKET) {
	  printf("csock: socket failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
	server.sin_family = AF_INET;
	server.sin_addr.s_addr = INADDR_ANY;
	server.sin_port = htons((short)port);
	if(bind(sock, (struct sockaddr *) & server, sizeof server) == SOCKET_ERROR) {
	  printf("csock: bind failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -3;
	}
	if(listen(sock, 5) == SOCKET_ERROR) {
	  printf("csock: listen failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -3;
	}
	msgsock = accept(sock, (struct sockaddr *) 0, (int *) 0);
	if(msgsock == INVALID_SOCKET) {
	  printf("csock: listen failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -4;
	}
	if(socket_noblock(msgsock))
	  return -2;
	return msgsock;
}

/* SOCKET REUSE ADDR */

socket_reuseaddr(s)
  int s;
{	int one = 1;

	if(setsockopt(s, SOL_SOCKET, SO_REUSEADDR, (char *) &one, sizeof(one)) == SOCKET_ERROR) {
	  printf("csock: setsockopt failed: error %d %s\n", ERRNO, ERRNO_STR);
	}
}

/* SOCKET SETUP */

int socket_setup(port)
  int port;
{
	int sock, msgsock;
	struct sockaddr_in server;

#ifdef WNT
	socket_init();
#endif
	sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if(sock == INVALID_SOCKET) {
	  printf("csock: socket failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
	socket_reuseaddr(sock);
	server.sin_family = AF_INET;
	server.sin_addr.s_addr = INADDR_ANY;
	server.sin_port = htons((short)port);
	if(bind(sock, (struct sockaddr *) & server, sizeof server) == SOCKET_ERROR) {
	  printf("csock: bind failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -3;
	}
	return sock;
}

/* SOCKET ACCEPT When polling, the accept fails, 
but we don't necessarily want hear about it every time */
// #define AcceptFailVerbose
int socket_accept(s)
  int s;
{	int sock;

	sock = accept(s, (struct sockaddr *) 0, (int *) 0);
	if(sock == INVALID_SOCKET) {
#ifdef AcceptFailVerbose 
		printf("csock: accept failed: error %d %s\n", ERRNO, ERRNO_STR);
#endif
	  return -1;
	}
	return sock;
}

/* SOCKET NOBLOCK == return 0 if success else -1 */

int socket_noblock(sock)
  int sock;
{
#ifdef WNT
	unsigned long val = 1;
	if(ioctlsocket(sock, FIONBIO, &val) == SOCKET_ERROR) {
	  printf("csock: ioctlsocket failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
#else
	int val;

	val = fcntl(sock, F_GETFL);
	val |= FNDELAY;
	if(fcntl(sock, F_SETFL, val) < 0) {
	  printf("csock: socket_noblock failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
#endif
	return 0;
}

/* SOCKET BLOCK == return 0 if success else -1 */

int socket_block(sock)
  int sock;
{
#ifdef WNT
	unsigned long val = 0;
	if(ioctlsocket(sock, FIONBIO, &val) == SOCKET_ERROR) {
	  printf("csock: socket_block failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
#else
	int val;

	val = fcntl(sock, F_GETFL);
	val &= ~FNDELAY;
	if(fcntl(sock, F_SETFL, val) < 0) {
	  printf("csock: socket_block failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
	/* was
	if(fcntl(sock, F_SETFL, FNDELAY, 0) < 0) {
	  printf("csock: socket_block failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
	*/
#endif
	return 0;
}

/* SOCKET LISTEN */

int socket_listen(s, b)
  int s, b;
{
	if(listen(s, b) == SOCKET_ERROR) {
	  printf("csock: socket_listen failed: error %d %s\n", ERRNO, ERRNO_STR);
	  return -1;
	}
	return 0;
}

/* SOCKET WRITE */

int socket_write(s, x, n)
  int s, n;
  char *x;
{	int rv;
/* cg removed vprintf to remove dependency on lisp.h (now c.h)*/
	/*vprintf("socket_write(%d, %d, %d)\n", s, x, n); */
#ifdef WNT
	rv = send(s, x, n, 0);
#else
	if(use_send)
	  rv = send(s, x, n, 0);
	else
	  rv = write(s, x, n);
#endif
	if(rv == SOCKET_ERROR) {
	  printf("csock: socket_write failed: error %d %s\n", ERRNO, ERRNO_STR);
	}
	return rv;
}

/* SOCKET READ */

int socket_read(s, x, n)
  int s;
  char *x;
  int n;
{	int rv;

/* cg removed vprintf to remove dependency on lisp.h (now c.h)*/
	/*vprintf("socket_read(%d, %d, %d)\n", s, x, n); */
#ifdef WNT
	rv = recv(s, x, n, 0);
#else
	errno = 0;
	if(use_recv)
	  rv = recv(s, x, n, 0);
	else
	  rv = read(s, x, n);
#endif
	if(!rv) {
#ifdef SOCKET_VERBOSE
	  printf("csock: socket_read failed (zero length): error %d %s\n", ERRNO, ERRNO_STR);
#endif
	}
	if(rv == SOCKET_ERROR) {
#ifdef SOCKET_VERBOSE
	  printf("csock: socket_read failed: error %d %s\n", ERRNO, ERRNO_STR);
#endif
	  rv = -ERRNO;
	}
	return rv;
}

/* SOCKET CLOSE */

void socket_close(s)
  int s;
{
#ifdef WNT
	closesocket(s);
#else
	close(s);
#endif
}

/* SOCKET NOLINGER */

void socket_nolinger(s)
  int s;
{	struct linger   l;

	l.l_onoff = 1;
	l.l_linger = 0;
	if(setsockopt(s, SOL_SOCKET, SO_LINGER, (char *)&l, sizeof(struct linger)) == SOCKET_ERROR) {
	  printf("csock: socket_nolinger failed: error %d %s\n", ERRNO, ERRNO_STR);
	}
}

/* SOCKET KEEPALIVE */

void socket_keepalive(s, v)
  int s, v;
{
	if(setsockopt(s, SOL_SOCKET, SO_KEEPALIVE, (char *) &v, sizeof(v)) == SOCKET_ERROR) {
	  printf("csock: socket_keepalive failed: error %d %s\n", ERRNO, ERRNO_STR);
	}
}

/* SOCKET SHUTDOWN */

void socket_shutdown(s, h)
  int s, h;
{
	if(shutdown(s, h) == SOCKET_ERROR) {
	  printf("csock: shutdown failed: error %d %s\n", ERRNO, ERRNO_STR);
	}
}
#endif
