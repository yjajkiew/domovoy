'use strict';

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
				//console.log(this.commands[key]);
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
				return false;
			}
			else {
				this.rl.prompt();
			}
		});
	}

};

module.exports = stt;