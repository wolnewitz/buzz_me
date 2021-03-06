var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');
var db = require('../database/schemas.js');
var timer = require('timers');
var app = express();
var port = process.env.PORT || 3021;

if(!process.env.PORT) {
  var morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

require('./config/routes.js')(app, express, db);
var sendMessages = require('./messages.js');

//send messages once every minute using node's timers module
timer.setInterval(sendMessages, 60000, app, db);


app.listen(port, function() {
  console.log('Listening on ' + port);
});

module.exports = {
  app: app,
};
