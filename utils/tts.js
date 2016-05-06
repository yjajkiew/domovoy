'use strict';
var Ivona = require('ivona-node');
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var spawn = require('child_process').spawn;
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
		this.removeAllListeners('done');
		var self = this;
		this.ivona.createVoice(text, {
	        body: {
	            voice: this.voice
	        }
    	})
    	.on('end', function() {
    		var mp3reader = spawn(self.mp3.reader, [self.mp3.file]).on('exit', function(code) {
    			self.emit('done');
    		});
    	})
    	.pipe(
    		fs.createWriteStream(this.mp3.file)
    	);
    	return this;
	}

};


util.inherits(tts, EventEmitter);
module.exports = tts;