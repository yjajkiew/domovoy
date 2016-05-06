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
	tts.speak(joke);
	tts.speak('Would you like another joke ?');
	stt.listenForConfirmation('joke').on('end', function(confirm) {
		if (confirm) {
			handle(stt, tts, user);
		}
		else {
			stt.listen();
		}
	});
};

module.exports = joke;