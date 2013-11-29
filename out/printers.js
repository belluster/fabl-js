function times(x, v) {
	if (v)
		times(x, 'true');
	else
		times(x, 'false'); ;
}
function times(x, p) {
	if (not(qualifiedName(x, p)))
		times(x, '[unnamed Property]'); ;
}
function times(x, v) {
	 < unknown Xob type >  : rdfs : Resourcevo = v;
	k = obkind(vo);
	if (k === int_kind)
		times(x, ob_to_integer(vo));
	else if (k === double_kind)
		times(x, toDouble(vo));
	else if (isString(x))
		times(x, vo);
	else
		times(x, ); ;
}
