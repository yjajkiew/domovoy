var os = require('os');
var util = require('util');

var status = {};
status.name = 'status';
status.commands = {
	'en': ['STATUS'],
	'fr': ['STATUS']
};
status.handle = handle;

function handle(stt, tts, user) {

	var text = {
		'en': 'I am currently running on %s %s. Free memory is %s of %s. The uptime is %s.',
		'fr': 'Je suis actuellement sous %s %s. la mémoire libre est de %s sur %s. Le temps de fonctionnement est de %s.'
	};
	var response = util.format(text[user.language], os.platform(), os.release(), os.freemem(), os.totalmem(), os.uptime());

	tts.speak(response).on('done', function() {
		stt.release();
	});
};

module.exports = status;
