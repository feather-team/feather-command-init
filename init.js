'use strict';

exports.name = 'init';
exports.usage = '[options] <path>'
exports.desc = 'auto create your project';
exports.register = function(commander){
	commander
		.option('-n, --ns [name]', 'project namespace', String, '')
		.option('-m, --modulename [name]', 'project modulename', String, '')
		.option('-c, --charset [value]', 'project charset', String, 'utf-8')
		.action(function(){
			var args = Array.prototype.slice.call(arguments);
			var path = args.shift();

			if(typeof path != 'string'){
				feather.log.error('invalid path');
				return;
			}

			var _path = process.cwd() + '/' + path + '/';

		    if(feather.util.exists(_path)){
		    	feather.log.error(path + ' is exists!');
		    	return;
		    }
		    
		    feather.util.mkdir(_path);
		    
		    var options = arguments[arguments.length - 1];
		    var conf = feather.util.read(__dirname + '/vendor/feather_conf.js');

		    ['ns', 'modulename', 'charset'].forEach(function(name){
		    	conf = conf.replace('${' + name + '}', options[name]);
		    });

		    feather.util.write(_path + 'feather_conf.js', conf);
		    feather.util.write(_path + 'page/index.html', 'welcome to feather');
		    feather.util.mkdir(_path + 'test');
		    feather.util.mkdir(_path + 'static/js');
		    feather.util.mkdir(_path + 'static/css');
		    feather.util.mkdir(_path + 'static/image');
		    feather.util.mkdir(_path + 'component');
		});
};