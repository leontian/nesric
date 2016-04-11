var connection = require('../../config/db_connection').connection;
/**
 * Created by leon on 4/8/16.
 */

exports.showResort = function(req, res, next) {
    if(req.query.id) {
        connection.query("SELECT * FROM SkiResorts s where s.id = ?", [req.query.id], function (err, rows) {
            if (err)return next(err);
            res.json(rows);
            next();
        });
    } else if(req.query.s) {
        var searchTerms = req.query.s.split(' ');
        var r = searchTerms[0];
        for (var w in searchTerms) {
            if (searchTerms[w].length > 0) {
                r = r + "|" + searchTerms[w];
            }
        }
        console.log(r);
        connection.query("SELECT * FROM SkiResorts s where s.name rlike ? or s.address rlike ?", [r, r], function (err, rows) {
            if (err)return next(err);
            res.json(rows);
            next();
        });
    } else {
        connection.query("SELECT * FROM SkiResorts s", function (err, rows) {
            if (err)return next(err);
            res.json(rows);
            next();
        });
    }
};

exports.renderRegisterItem = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else if(req.user.group <= 1) {
        res.render('profile', {user:req.user, list:'', message: "You cannot register items!"});
    } else {
        res.render('registerItem', {user:req.user, list:'', message: ''});
    }
};

exports.registerItem = function(req, res, next) {
    if(!req.isAuthenticated() || req.user.group <= 1) {
        res.render('profile', {user:req.user, list:'', message: "You don't have access to it"});
    } else {
        res.render('registerItem', {user:req.user, list:'', message: ''});
    }
};

exports.renderModifyItem = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else if(req.user.group <= 1) {
        res.render('profile', {user:req.user, list:'', message: "You cannot modify items!"});
    } else {
        res.render('modifyItem', {user:req.user, list:'', message: ''});
    }
};

exports.modifyItem = function(req, res, next) {
    if(!req.isAuthenticated() || req.user.group <= 1) {
        res.render('profile', {user:req.user, list:'', message: "You cannot modify items!"});
    } else {
        res.render('registerItem', {user:req.user, list:'', message: ''});
    }
};
