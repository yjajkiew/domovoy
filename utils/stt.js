'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;
const readline = require('readline');

function stt(core, modules, user, tts) {

	this.tts = tts;
	this.user = user;
	this.language = user.language.substring(0, 2); // returns something like 'fr' or 'en'

	this.commands = {};
	this.allModules = Object.assign(core, modules); // concat core and modules
	for(var key in this.allModules) {
		// get all commands for user language and sort them by module
		this.commands[key] = this.allModules[key].commands[this.language];
	}

	this.rl = readline.createInterface(process.stdin, process.stdout);
}

stt.prototype = {

	listen: function() {
		//console.log(this.modules);
		this.rl.setPrompt('Domovoy> ');
		this.rl.prompt();

		this.rl.on('line', (line) => {
			if (line.trim().toUpperCase() === 'OK DOMOVOY') {
				console.log('listen carefully');
				this.rl.pause();
				this.listenCommand();
			}
			else {
				this.rl.prompt();
			}
		});
	},

	listenCommand: function() {
		this.rl.setPrompt('Domovoy command> ');
		this.rl.prompt();

		this.rl.on('line', (line) => {
			for(var key in this.commands) {
				if (this.commands[key].indexOf(line.trim().toUpperCase()) !== -1) {
					this.rl.pause();
					this.allModules[key].handle(this, this.tts, this.user);
					break;
				}
			}
			if (line.trim().toUpperCase() === 'CANCEL') {
				this.rl.pause();
				this.listen();
			}
			else {
				this.rl.prompt();
			}
		});
	},

	listenForWords: function(prompt, words) {
		this.rl.setPrompt('Domovoy ' + prompt + '> ');
		this.rl.prompt();
		this.rl.on('line', (line) => {
			if (words.indexOf(line.trim().toUpperCase()) !== -1) {
				this.rl.pause();
				return true;
			}
			else if (line.trim().toUpperCase() === 'CANCEL') {
				this.rl.pause();
				this.listen();
				return false;
			}
			else {
				this.rl.prompt();
			}
		});
	},

	listenForConfirmation: function(prompt) {
		this.rl.setPrompt('Domovoy ' + prompt + '> ');
		this.rl.prompt();
		var positive = ['YES', 'YEAH', 'POSITIVE'];
		var negative = ['NO', 'NEH', 'NEGATIVE'];
		this.rl.on('line', (line) => {
			if (positive.indexOf(line.trim().toUpperCase()) !== -1) {
				this.emit('done', true);
			}
			else if (negative.indexOf(line.trim().toUpperCase()) !== -1) {
				this.emit('done', false);
			}
			else if (line.trim().toUpperCase() === 'CANCEL') {
				this.rl.pause();
				this.emit('end', false);
			}
			else {
				this.rl.prompt();
			}
		});
		return this;
	}

};

util.inherits(stt, EventEmitter);
module.exports = stt;