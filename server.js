
var port = 1337;
var express = require('./config/express');
var app = express();
var passport = require('passport');

var morgan = require('morgan');
var session = require('express-session');



require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console

app.use(session({
	secret: 'youdontknowmysecret',
	resave: true,
	saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session());

app.listen(port);
module.exports = app;
