var users = require('../../app/controllers/users.server.controller');


module.exports = function(app, passport) {
    app.route('/signin').get(users.signIn).post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    }));
    app.route('/signup').get(users.signUp).post(passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.route('/profile').get(users.displayProfile);

    app.route('/logout').get(function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
