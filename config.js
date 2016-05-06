var config = {};

	// port
    config.port = process.env.PORT || 1337;

    // mp3 configuration
    config.mp3 = {
    	reader: 'mpg123', // examples : mpg123 on raspberry pi, afplay on mac
    	file: '/tmp/domovoy-tts.mp3'
    }

    // ivona config
    config.ivona = {
    	accessKey: 'GDNAJHNTVFIKADRM44MQ',
    	secretKey : 'X2dssA65c1nA70sYw79FDwGonNBjLXMnwsNCXl9E'
    };

module.exports = config;
