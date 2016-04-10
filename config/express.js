var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');

module.exports = function(app) {
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret: 'youdontknowmysecret',
        resave: true,
        saveUninitialized: true
    } )); // session secret
    app.use(flash()); // use connect-flash for flash messages stored in session

    app.use(function(req,res,next){
        var _send = res.send;
        var sent = false;
        res.send = function(data){
            if(sent) return;
            _send.bind(res)(data);
            sent = true;
        };
        next();
    });
    return app;
};
