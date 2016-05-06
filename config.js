var config = {};

	// port
    config.port = process.env.PORT || 1337;

    // temporary mp3 file
    config.mp3 = '/tmp/domovoy-stt.mp3';

    // ivona config
    config.ivona = {
    	accessKey: '',
    	secretKey : ''
    };

module.exports = config;
