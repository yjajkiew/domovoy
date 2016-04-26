var fs = require('fs');

var modules = {}
modules.load = function(type) {
	var modules_array = [];

	var path = './' + type;

	fs.readdirSync(path).forEach(function(file) {
	  if (file.match(/\.js$/) !== null) {
	  	var fileName = file.replace('.js', '');
	  	modules_array[fileName] = require('../' + type + '/' + fileName);
	  }
	});
	return modules_array;
}

module.exports = modules;