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


console.log(core.joke.handle(1,2,3));

var app = express();

app.listen(config.port);
