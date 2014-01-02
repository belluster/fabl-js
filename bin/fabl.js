#!/usr/bin/env node

var fs = require('fs');
var async = require('async');
var UglifyJS = require("uglify-js");

var fimp = [
	'globals','props','fglobals','pcode','xob','utils','arith',
	'hex','fun','literal','meta','strutils','date','hexbinary',
	'cgi','label','class','analyze','macros','disasm','scan','parse',
	'stringbufconst','debug','printers','xobprint',
	'home','uri','namespace','serialize','writerdfxml','translateJS','toplevel'
];

var fimp_js = fimp.map(function(p) {return 'out/' + p + '.js';});

var argv = require('optimist')
    .usage('Usage: ssoup command options')
    .argv;

var cmd = argv._[0];

if (!cmd) { 
	int tm;ob initFun;
	/*tm = time_msec();
	 pm_new_value_fun = (Smallob)0;
	//	gc_verbose = 1;
	//	gc_announce = 1;

	silentMode = !cnsl;	
	  bumpStartCount();

	init_heap();
	check_stack();//for debugging; can be removed
	ob_stack_ptr = 0;//flush the ob_stack
	ob_push(ob_call_return_value);//permanent resident on the ob_stack
	//  ob_pushMac(ob_call_return_value);//permanent resident on the ob_stack
	init_root();
	serializeMalloc(serializeNodes,1024 * serializeBufferSize);
	//For mapping work
	//  serializeMalloc(4000000,100000000);

	rdfInit();
	#ifdef LINUX
	bindGlobal(boot_fimp,"operatingSystem",charp_mk_StringBuf("Linux"),StringBufT);
	#else
	bindGlobal(boot_fimp,"operatingSystem",charp_mk_StringBuf("Windows"),StringBufT);
	#endif
	emptyValues = mk_Values(0);*/

	deserializeFromFile(charp_mk_StringBuf("fimp.fb"),1);
	fixFablns();
	initFun = getVariant(boot_fimp,"initFabl",0,importTypes);
	initPm();
	cImports();
	collectedSubjects = mk_Seqob(100); // may as well start with at least a little capacity
	alloc_statically(0); // turn on the garbage collector
	startupFileSB = charp_mk_StringBuf(startupFile);
	Function_applyn_ob(initFun);
	initFun = getVariant(boot_fimp,"initPath",0,importTypes);
	Function_applyn_ob(initFun);
	initFun = getVariant(boot_fimp,"initMacros",0,importTypes);
	Function_applyn_ob(initFun);
	if (cnsl) 
	 initFun = getVariant(boot_fimp,"loadInit",0,importTypes);
	else
	 initFun = getVariant(boot_fimp,"loadCgi",0,importTypes); // this normally does not return
	Function_applyn_ob(initFun); // should not return in the case of cgi
	initFun = getVariant(boot_fimp,"fablConsole",0,importTypes);
	printf("Fabl loaded in %d milliseconds\n",time_msec()-tm);
	fablCatch(initFun);
}

var options = process.argv;
options.splice(0, 3);
var options = options.join(' ');

if (cmd == 'beautify') {
	UglifyJS.minify(fimp_js, {});
    /*async.each(fimp_js, function(fn, callback) {
		fs.readFile(fn, 'utf8', function (err, data) {
			if (err) {
				throw err;
			}
			var bdata = beautify(data, { indent_size: 2 });
			fs.writeFile(fn, bdata, function(err) {
				if (err) console.error('Error writing file', fn, err);
				else console.log('File', fn, 'beautified');
			});
		});
    });*/
} else if (cmd == 'build') {
	var result = UglifyJS.minify(fimp_js, {output: 'bin/fimp.js'});
}
