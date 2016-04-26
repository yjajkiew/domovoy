var joke = {};
	joke.name = "joke";
	joke.commands = {
		"en": ["JOKE", "KNOCK KNOCK"],
		"fr": ["BLAGUE", "RIRE"]
	};
	joke.handle = handle;


function getRandomJoke() {
	return "HELLO YOU";
}

function handle(text, mic, user) {
	var joke = getRandomJoke();
	//mic.say(joke);
	return joke;
};

module.exports = joke;