var daysOfWeek = seqDataOb_kind;
['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames = seqDataOb_kind;
['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var dayLetters = seqDataOb_kind;
['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var daysInMonth = seqDataInt_kind;
[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYear(yr) {
	if (not(mod(yr, 4) === 0))
		return false; ;
	else {
		if (not(mod(yr, 100) === 0))
			return true; ;
		else if (mod(yr, 400) === 0)
			return true; ;
		else
			return false; ; ;
	};
}
function daysInYear(yr) {
	if (isLeapYear(yr))
		return 366; ;
	else
		return 365; ; ;
}
function daysInMonth(mn, leapyear) {
	if (mn === 1) {
		if (leapyear)
			return 29; ;
		else
			return 28; ; ;
	} else
		return daysInMonth[mn]; ; ;
}
function extractYMD(rs, d) {
	 < unknown Xob type >  : rdfs : Resourcedy = toInt(d);
	nyd = 0;
	if (geq(dy, 0)) {
		yr = 2000;
		yl = daysInYear(yr);
		 < unknown Xob type >  : fabl : Xwhile; ;
	} else {
		yr = 1999;
		yl = daysInYear(yr);
		 < unknown Xob type >  : fabl : Xwhile;
		plus_plus(yr); ;
	}
	diy = difference(dy, nyd);
	mn = 0;
	ly = isLeapYear(yr);
	first = 0;
	ml = daysInMonth(mn, ly);
	 < unknown Xob type >  : fabl : Xwhile;
	dim = difference(diy, first);
	seqReset(rs);
	seqintAdd(rs, yr);
	seqintAdd(rs, plus(mn, 1));
	seqintAdd(rs, plus(dim, 1)); ;
}
var dateBuf = seqDataInt_kind;
iNew();
function times(rs, d) {
	 < unknown Xob type >  : rdfs : ResourceextractYMD(dateBuf, d);
	times(rs, dateBuf[0]);
	times(rs, '-');
	mn = dateBuf[1];
	if (lessp(mn, 10))
		times(rs, '0');
	times(rs, mn);
	times(rs, '-');
	dy = dateBuf[2];
	if (lessp(dy, 10))
		times(rs, '0');
	times(rs, dy); ;
}
function mkDate(yr, mn, dy) {
	 < unknown Xob type >  : rdfs : Resourcedys = 0;
	if (geq(yr, 2000)) {
		for (i = 2000; lessp(i, yr); plus_plus(i))
			dys = plus(dys, daysInYear(i)); ; ;
	} else {
		for (i = 1999; leq(yr, i); minus_minus(i))
			dys = difference(dys, daysInYear(i)); ; ;
	}
	ly = isLeapYear(yr);
	for (i = 0; lessp(i, difference(mn, 1)); plus_plus(i))
		dys = plus(dys, daysInMonth(i, ly)); ;
	dys = plus(dys, difference(dy, 1));
	return toDate(dys); ; ;
}
function dayOfWeek(d) {
	 < unknown Xob type >  : rdfs : Resourcedy = toInt(d);
	md = mod(difference(dy, 1), 7);
	if (lessp(md, 0))
		return plus(7, md); ;
	return md; ; ;
}
function dayOfWeekName(d) {
	 < unknown Xob type >  : rdfs : Resourcedy = dayOfWeek(d);
	return daysOfWeek[dy]; ; ;
}
function lessp(x, y) {
	return lessp(toInt(x), toInt(y)); ; ;
}
function greaterp(x, y) {
	return lessp(toInt(x), toInt(y)); ; ;
}
function leq(x, y) {
	return leq(toInt(x), toInt(y)); ; ;
}
function geq(x, y) {
	return geq(toInt(x), toInt(y)); ; ;
}
function equal(x, y) {
	return toInt(x) === toInt(y); ; ;
}
function plus(d, i) {
	return toDate(plus(toInt(d), i)); ; ;
}
function difference(d, i) {
	return toDate(difference(toInt(d), i)); ; ;
}
function parseXsdDate(s) {
	 < unknown Xob type >  : rdfs : Resourcespt = split(s, ascii_T);
	sp = split(spt[0], ascii_minus);
	if (not(seqLength(sp) === 3))
		return; ;
	ys = sp[0];
	if (not(isInt(ys)))
		return; ;
	yy = toInt(ys);
	ms = sp[1];
	if (not(isInt(ms)))
		return; ;
	mm = toInt(ms);
	if (or(lessp(mm, 1), lessp(12, mm)))
		return; ;
	ds = sp[2];
	if (not(isInt(ds)))
		return; ;
	dd = toInt(ds);
	if (or(lessp(dd, 1), lessp(31, dd)))
		return; ;
	if (mm === 2) {
		if (greaterp(dd, 29))
			return; ;
		if (and(dd === 29, not(isLeapYear(yy))))
			return; ; ;
	} else {
		dim = daysInMonth[difference(mm, 1)];
		if (greaterp(dd, dim))
			return; ; ;
	}
	return mkDate(yy, mm, dd); ; ;
}
function nextMonth(d) {
	 < unknown Xob type >  : rdfs : ResourceextractYMD(dateBuf, d);
	m = dateBuf[1];
	y = dateBuf[0];
	if (m === 12) {
		plus_plus(y);
		m = 1; ;
	} else
		plus_plus(m);
	return mkDate(y, m, 1); ; ;
}
function firstOfMonth(d) {
	 < unknown Xob type >  : rdfs : ResourceextractYMD(dateBuf, d);
	m = dateBuf[1];
	y = dateBuf[0];
	return mkDate(y, m, 1); ; ;
}
