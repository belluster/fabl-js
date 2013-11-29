function urldecode(ix) {
	 < unknown Xob type >  : rdfs : Resourcex = replaceChar(ix, ascii_plus, ascii_space, 0, length(ix));
	idx = indexOf(x, ascii_percent);
	if (lessp(idx, 0))
		return x; ;
	ln = length(x);
	rs = slice(x, 0, idx);
	hx = ;
	 < unknown Xob type >  : fabl : Xwhile;
	return rs; ; ;
}
function safeChar1(c) {
	if (and(leq(48, c), leq(c, 57)))
		return true; ;
	if (and(leq(65, c), leq(c, 90)))
		return true; ;
	if (and(leq(97, c), leq(c, 122)))
		return true; ;
	if (or(or(or(or(or(or(or(or(c === ascii_minus, c === ascii_underbar), c === ascii_dot), c === ascii_bang), c === ascii_twiddle), c === ascii_star), c === ascii_squote), c === ascii_lparen), c === ascii_rparen))
		return true; ;
	return false; ; ;
}
var safeChars = {
	if (and(leq(48, c), leq(c, 57)))
		return true; ;
	if (and(leq(65, c), leq(c, 90)))
		return true; ;
	if (and(leq(97, c), leq(c, 122)))
		return true; ;
	if (or(or(or(or(or(or(or(or(c === ascii_minus, c === ascii_underbar), c === ascii_dot), c === ascii_bang), c === ascii_twiddle), c === ascii_star), c === ascii_squote), c === ascii_lparen), c === ascii_rparen))
		return true; ;
	return false; ; ;
}
function initSafeChars() {
	 < unknown Xob type >  : rdfs : ResourcesafeChars = iNew();
	seqintExpand(safeChars, 123);
	for (i = 0; lessp(i, 122); plus_plus(i))
		safeChars[i] = safeChar1(i); ; ;
}
initSafeChars();
function urlencodeIsSafeChar(i) {
	if (greaterp(i, 122))
		return false; ;
	return safeChars[i]; ; ;
}
function appendTwoCharHex(rs, x) {
	 < unknown Xob type >  : rdfs : Resourcec = lshift(land(x, 240), unary_minus(4));
	if (lessp(c, 10))
		fc = plus(48, c);
	else
		fc = plus(87, c);
	c = land(x, 15);
	if (lessp(c, 10))
		sc = plus(48, c);
	else
		sc = plus(87, c);
	addChar(rs, fc);
	addChar(rs, sc); ;
}
function urlencode(x) {
	 < unknown Xob type >  : rdfs : Resourceln = length(x);
	rs = ;
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		c = x[i];
		if (c === ascii_space)
			addChar(rs, ascii_plus);
		else if (urlencodeIsSafeChar(c))
			addChar(rs, c);
		else {
			addChar(rs, ascii_percent);
			appendTwoCharHex(rs, c); ;
		};
	};
	return rs; ; ;
}
function javascriptEscape(x) {
	 < unknown Xob type >  : rdfs : Resourceln = length(x);
	rs = ;
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		c = x[i];
		if (c === ascii_plus)
			addChar(rs, ascii_plus);
		else if (urlencodeIsSafeChar(c))
			addChar(rs, c);
		else {
			addChar(rs, ascii_percent);
			appendTwoCharHex(rs, c); ;
		};
	};
	return rs; ; ;
}
function getenv(ev) {
	 < unknown Xob type >  : rdfs : Resourcers = ;
	if (lessp(getenv(rs, ev), 0))
		return; ;
	return rs; ; ;
}
var crlf = ''; {
	 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
	times(toStringResult, '');
	return toStringResult; ;
}
addChar(crlf, 13);
addChar(crlf, 10);
var crcrlf = ''; {
	 < unknown Xob type >  : rdfs : ResourcetoStringResult = '' '';
	times(toStringResult, '');
	return toStringResult; ;
}
addChar(crcrlf, 13);
addChar(crcrlf, 13);
addChar(crcrlf, 10);
var cgiMode = false;
var headerEmitted = false;
function httpHeader(tp, ln) {
	if (not(headerEmitted)) { {
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, crlf);
			tprint(uwriteBuffer);
		} {
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, crlf);
			tprint(uwriteBuffer);
		}
		if (greaterp(ln, 0)) {
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, ln);
			tprint(uwriteBuffer);
		} {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'Content-Type: ');
			times(uwriteBuffer, tp);
			times(uwriteBuffer, crlf);
			times(uwriteBuffer, crlf);
			tprint(uwriteBuffer);
		}
		headerEmitted = true; ;
	};
}
function htmlHeader(ln) {
	silent(false);
	emitHtmlHeader(ln); ;
}
function htmlHeader() {
	htmlHeader(unary_minus(1)); ;
}
function plainTextHeader() {
	if (setHttpHeaderEmitted()) {
		silent(false); {
			reset(uwriteBuffer);
			times(uwriteBuffer, );
			times(uwriteBuffer, crlf);
			tprint(uwriteBuffer);
		} {
			reset(uwriteBuffer);
			times(uwriteBuffer, 'Content-Type: text/plain');
			times(uwriteBuffer, crlf);
			times(uwriteBuffer, crlf);
			tprint(uwriteBuffer);
		};
	};
}
var writeServedPageTo = ; ;
function serveHtml(bf) {
	if (nnul(writeServedPageTo))
		fwrite(writeServedPageTo, bf);
	htmlHeader(); {
		reset(uwriteBuffer);
		times(uwriteBuffer, bf);
		tprint(uwriteBuffer);
	}
	quit(); ;
}
function preError() {
	if (cgiMode)
		htmlHeader(); ;
}
function parseHttpVars(s) {
	 < unknown Xob type >  : rdfs : Resourcers = iNew();
	if (lessp(find(s, crlf), 0)) {
		urlencoded = true;
		spl = split(s, [0]); ;
	} else {
		spl = split(s, crlf);
		urlencoded = false; ;
	}
	ln = seqLength(spl);
	for (i = 0; lessp(i, ln); plus_plus(i)) {
		cv = spl[i];
		idx = indexOf(cv, ascii_equal);
		if (greaterp(idx, 0)) {
			vr = slice(cv, 0, idx);
			vl = slice(cv, plus(idx, 1), length(cv));
			if (urlencoded)
				vl = urldecode(vl);
			set(rs, regarding(toId(vr)), vl); ;
		};
	};
	return rs; ; ;
}
function parseApplication(s) {
	 < unknown Xob type >  : rdfs : Resourceidx = indexOf(s, ascii_lparen);
	if (lessp(idx, 0))
		return; ;
	eidx = lastIndexOf(s, ascii_rparen);
	if (lessp(eidx, 0))
		return; ;
	rs = [slice(s, 0, idx)];
	ln = length(s);
	argst = slice(s, plus(idx, 1), eidx);
	args = split(argst, ascii_comma);
	seqobAppend(rs, args);
	return rs; ; ;
}
var httpContentLengthString = ''; ;
var httpContentLength = 0;
var httpContentType = ''; ;
var httpContent = ''; ;
var httpRequestMethod = ''; ;
var httpQueryString = ''; ;
var httpGet = ;
var httpPost = ;
var httpVars = ;
function setCgiVars(parse) {
	if (length(httpRequestMethod) === 0) {
		httpGet = ;
		httpPost = ;
		getenv(httpRequestMethod, 'REQUEST_METHOD');
		if (httpRequestMethod === ) {
			getenv(httpQueryString, 'QUERY_STRING');
			httpContent = httpQueryString;
			if (parse) {
				httpGet = parseHttpVars(httpQueryString);
				httpVars = httpGet; ;
			}
			return; ; ;
		}
		if (httpRequestMethod === ) {
			getenv(httpContentLengthString, 'CONTENT_LENGTH');
			httpContentLength = toInt(httpContentLengthString);
			reset(httpContent);
			readFromStdin(httpContent, httpContentLength);
			if (parse) {
				httpPost = parseHttpVars(httpContent);
				httpVars = httpPost; ;
			}
			return; ; ;
		};
	};
}
function setCgiVars() {
	setCgiVars(true); ;
}
function parseCgi() {
	setCgiVars(true); ;
}
function extractUploadPart0(x) {
	 < unknown Xob type >  : rdfs : Resourcebndi = indexOf(x, crlf);
	if (lessp(bndi, 0))
		return; ;
	bnd = slice(x, 0, bndi);
	ebnd = indexOf(x, bnd, bndi);
	if (lessp(ebnd, 0))
		return; ;
	return slice(x, plus(bndi, 1), ebnd); ; ;
}
var crlfcrlf = '

	'; {
	 < unknown Xob type >  : rdfs : ResourcestringConstantResult = '' '';
	times(stringConstantResult, );
	times(stringConstantResult, crlf);
	times(stringConstantResult, );
	times(stringConstantResult, crlf);
	return stringConstantResult; ;
}
function extractUploadContent(x) {
	 < unknown Xob type >  : rdfs : Resourceprt0 = extractUploadPart0(x);
	if (nul(prt0))
		return prt0; ;
	bndi = indexOf(prt0, crlfcrlf);
	if (lessp(bndi, 0))
		return; ;
	return slice(prt0, plus(bndi, 4), length(x)); ; ;
}
