var users = require('../../app/controllers/users.server.controller');


module.exports = function(app, passport) {
    app.route('/signin').get(users.signIn).post(passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));
    app.route('/signup').get(users.signUp).post(passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.route('/profile').get(users.displayProfile).post(users.updateProfile);

    app.route('/logout').get(function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.route('/manageusers').get(users.displayManageUser);
    app.route('/users').get(users.listUsers).post(users.postUsers);
};
