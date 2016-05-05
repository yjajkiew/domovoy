'use strict';
var Ivona = require('ivona-node');
var fs = require('fs');
var exec = require('child_process').exec;

function tts(config, user) {
	this.ivona = new Ivona({
		accessKey: config.accessKey,
        secretKey: config.secretKey
	});
	this.voice = {
		name: user.voice.ivona.name,
		language: user.language,
		gender: user.voice.ivona.gender
	};
}

tts.prototype = {

	getVoices: function() {
		this.ivona.listVoices().on('complete', function(voices) {
        	console.log(voices);
		});
	},

	speak: function(text) {
		this.ivona.createVoice(text, {
	        body: {
	            voice: this.voice
	        }
    	})
    	.on('end', function() { 
    		var child = exec('mpg123 /tmp/domovoy-tts.mp3', function (error, stdout, stderr) {
  				//sys.print('stdout: ' + stdout);
  				//sys.print('stderr: ' + stderr);
				//if (error !== null) {
				//	console.log('exec error: ' + error);
				//}
			});
    	})
    	.pipe(
    		fs.createWriteStream('/tmp/domovoy-tts.mp3')
    	);
	}

};

module.exports = tts;