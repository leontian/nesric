var connection = require('../../config/db_connection').connection;
// sign in
// GET
exports.signIn = function(req, res, next) {
   if(req.isAuthenticated()) 
       res.redirect('/profile');
  res.render('signin', {message: ''});
};


// sign up
// GET
exports.signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
       res.redirect('/profile');
   } else {
        res.render('signup', {message: ''});
   }
};

exports.displayProfile = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        res.render('profile', {user:req.user, message: ''});
    }
};

exports.updateProfile = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        console.log(req.body);
        var updatedUserMysql = {
            username: req.body.username,
            name: req.body.firstname,
            surname: req.body.lastname,
            email: req.body.email
        };
        var versionQuery = "INSERT INTO users_history\
        (username, name, surname, email, password, `group`) \
        SELECT u.username, u.name, u.surname, u.email, u.password, u.`group`\
        FROM users u WHERE u.username=?";

        var updateQuery = "UPDATE users SET name=?, surname=?, email=? WHERE username=?;";

        connection.query(versionQuery,[updatedUserMysql.username],
            function(err, rows) {
                return next(err);
            });

        connection.query(updateQuery,[updatedUserMysql.name, updatedUserMysql.surname, updatedUserMysql.email, updatedUserMysql.username],
            function(err, rows) {
                return next(err);
        });
    }

    res.render('profile', {message: "Contact Updated", user: req.user});
};

exports.displayManageUser = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        if(req.user.group == 3) {
            res.render('manageUser', {user:req.user, message: ''});
        }
        else {
            res.render('profile', {user:req.user, message: 'You cannot manage users'});
        }

    }
};

exports.listUsers = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        if(req.user.group == 3) {
            connection.query("SELECT u.id, u.username, u.group from users u where u.group < 3",
                function(err, rows) {
                    res.json(rows);
                    return next(err);
                });
        }
        else {
            res.render('profile', {user:req.user, message: 'You cannot manage users'});
        }

    }
};

exports.postUsers = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        if(req.user.group == 3) {
            var updatedUserMysql = {
                username: req.body.username,
                id: req.body.id,
                group: parseInt(req.body.group)
            };
            if (updatedUserMysql.group == 1 ||updatedUserMysql.group == 2) {
                var versionQuery = "INSERT INTO users_history\
        (username, name, surname, email, password, `group`) \
        SELECT u.username, u.name, u.surname, u.email, u.password, u.`group`\
        FROM users u WHERE u.username=?";

                var updateQuery = "UPDATE users SET `group`=? WHERE username=?;";

                connection.query(versionQuery, [updatedUserMysql.username],
                    function (err, rows) {
                        return next(err);
                    });

                connection.query(updateQuery, [updatedUserMysql.group, updatedUserMysql.username],
                    function (err, rows) {
                        return next(err);
                    });
                res.render('manageUser', {
                    user: req.user,
                    message: 'User ' + updatedUserMysql.username + ' updated, new group is ' + updatedUserMysql.group
                });
            }
            else {
                res.render('manageUser', {user: req.user, message: 'invalid group'});
            }
        }
        else {
            res.render('profile', {user:req.user, message: 'You cannot manage users'});
        }

    }
};


