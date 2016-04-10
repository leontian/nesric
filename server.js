
var port = 1337;
var passport = require('passport');
var express = require('express');
var morgan = require('morgan');
var path=require('path');

require('./config/passport')(passport);

var app = express();
require('./config/express')(app, passport);
app.use(morgan('dev')); // log every request to the console

app.use(passport.initialize());
app.use(passport.session());

require('./app/routes/index.server.routes.js')(app);
require('./app/routes/resorts.server.routes.js')(app);
require('./app/routes/users.server.routes.js')(app, passport);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
module.exports = app;
