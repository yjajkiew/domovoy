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
	stt.listenForWords('joke', []);
	tts.speak(joke);
};

module.exports = joke;