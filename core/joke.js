var joke = {};
joke.name = 'joke';
joke.commands = {
	'en': ['JOKE', 'KNOCK KNOCK'],
	'fr': ['BLAGUE', 'RIRE']
};
joke.handle = handle;

function getRandomJoke() {
	return 'HELLO YOU';
}

function handle(stt, tts, user) {
	var joke = getRandomJoke();
	tts.speak(joke).on('done', function() { getAnother(stt, tts, user); });
};

function getAnother(stt, tts, user) {
	tts.speak('Would you like another joke ?');
	stt.listenForConfirmation('joke')
	.on('done', function(confirm) {
		if (confirm) {
			handle(stt, tts, user);
		}
		else {
			stt.listen();
		}
	})
	.on('end', function(data) {
		stt.listen();
	});
}

module.exports = joke;