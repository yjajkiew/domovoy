// node modules dependencies
var express = require('express');

// load configuration
var config = require('./config');

// load profile
var user = require('./profiles/default.json');

// load core modules
var core = require('./utils/modules').load('core');

// load custom modules
var modules = require('./utils/modules').load('modules');

// load TTS
var TTS = require('./utils/tts.js');
var tts = new TTS(config.ivona, user);

// load mic
var STT = require('./utils/stt.js');
var mic = new STT(core, modules, user, tts);

tts.speak('Hi there, my name is Domovoy. Initialisation completed with success !');

mic.listen();

//tts.getVoices();

//core.joke.handle(mic, tts, user);

//var app = express();
//app.listen(config.port);
