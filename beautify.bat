fimp=(
	'globals' 'props' 'fglobals' 'pcode' 'xob' 'utils' 'arith' 
	'hex' 'fun' 'literal' 'meta' 'strutils' 'date' 'hexbinary' 
	'cgi' 'label' 'class' 'analyze' 'macros' 'disasm' 'scan' 'parse' 
	'stringbufconst' 'debug' 'printers' 'xobprint' 
	'home' 'uri' 'namespace' 'serialize' 'writerdfxml' 'translateJS' 'toplevel'
)

for f in "${fimp[@]}"
do
 echo "Processing out\\$f.js"
 uglifyjs out\\$f.js --beautify --output out\\$f.js
done
