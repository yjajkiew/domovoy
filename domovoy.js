// dependencies
var express = require('express');

// configuration
var config = {};
    config.port = process.env.POR || 1337;
    config.voiceSettings = { voice: 'male', language: 'en' };

var app = express();



app.listen(config.port);
