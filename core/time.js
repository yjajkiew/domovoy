var time = {};
time.name = 'time';
time.commands = {
	'en': ['TIME'],
	'fr': ['HEURE']
};
time.handle = handle;

function getRandomJoke(user) {
	var date = new Date();
	var result = {
		'en': 'It\'s ' + date.getHours() + ':' + date.getMinutes(), 
		'fr': 'Il est ' + date.getHours() + ' heures ' + date.getMinutes()
	}
	return result[user.language];
}

function handle(stt, tts, user) {
	var time = getTime(user);
	tts.speak(time).on('done', function() {
		stt.release();
	});
};

module.exports = time;
