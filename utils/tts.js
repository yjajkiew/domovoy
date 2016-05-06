'use strict';
var Ivona = require('ivona-node');
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function tts(config, user) {
	this.mp3 = config.mp3;
	this.ivona = new Ivona({
		accessKey: config.ivona.accessKey,
        secretKey: config.ivona.secretKey
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
		var self = this;
		this.ivona.createVoice(text, {
	        body: {
	            voice: this.voice
	        }
    	})
    	.on('end', function() { 
    		console.log(self.mp3);
    		var child = exec('mpg123 ' + self.mp3, function (error, stdout, stderr) {
  				//sys.print('stdout: ' + stdout);
  				//sys.print('stderr: ' + stderr);
				//if (error !== null) {
				//	console.log('exec error: ' + error);
				//}
			});
    		this.emit('done');
    	})
    	.pipe(
    		fs.createWriteStream(this.mp3)
    	);
    	return this;
	}

};


util.inherits(tts, EventEmitter);
module.exports = tts;