var connection = require('../../config/db_connection').connection;
/**
 * Created by leon on 4/8/16.
 */

exports.showResort = function(req, res, next) {
    if(req.query.id) {
        connection.query("SELECT * FROM ski_resorts s where s.id = ?", [req.query.id], function (err, rows) {
            if (err) return next(err);
            console.log(rows);
            res.json(rows);
            return next(err);
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
        connection.query("SELECT * FROM ski_resorts s WHERE s.name RLIKE ? or s.address RLIKE ? ORDER BY s.name", [r, r], function (err, rows) {
            if (err)return next(err);
            res.json(rows);
            return next(err);
        });
    } else {
        connection.query("SELECT * FROM ski_resorts s ORDER BY s.name", function (err, rows) {
            if (err)return next(err);
            res.json(rows);
            return next(err);
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
        var newItem = {
            name: req.body.name,
            address: req.body.address,
            acre: req.body.acre,
            date: req.body.date,
            openStatus: req.body.openStatus,
            trails: req.body.trails
        };

        var insertQuery =
            "INSERT INTO ski_resorts ( name, address, acre, date, openStatus, trails, version) values (?,?,?,CURDATE(),?,?, 1)";

        connection.query(insertQuery,
            [newItem.name, newItem.address, newItem.acre, newItem.openStatus, newItem.trails],
            function(err, rows) {
                newItem.id = rows.insertId;
                newItem.version = 1;
                connection.query( "INSERT INTO register ( registeredBy, registers, date ) values (?,?, CURDATE())", [req.user.username, rows.insertId],
                    function(err2, rows2) {
                        return next(err2);
                    }

                );
                //console.log(rows);
                res.render("registerItem", {message:"Item Registered. Version number:" + newItem.version , user:req.user});
                return next(err);
        });

        // var getVersionQuery = "SELECT s.version FROM ski_resorts s where s.id = ?";//TODO: why we cannot do this outside of this callback?
        // connection.query(getVersionQuery, [newItem.id],
        //     function(err, rows) {
        //         newItem.version = rows[0].version;
        //         //console.log(newItem.id);
        //         console.log(rows[0].version);
        //         res.render("registerItem", {message:"Item Registered. Version number:" + newItem.version , user:req.user});
        //         return next(err);
        //     });


    }

    //console.log(newItem.version);

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
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        //console.log(req.body);
        var updatedItem = req.body;
        var versionQuery = "INSERT INTO ski_resorts_history (name, date, openStatus, acre, trails, address, version)\
        SELECT name, date, openStatus, acre, trails, address, version FROM ski_resorts WHERE id=?;";
        var updateQuery = "UPDATE ski_resorts SET name=?, address=?, acre=?, date=CURDATE(), openStatus=?, trails=?, version = ? WHERE id=?;";
        updatedItem.version = parseInt(updatedItem.version) + 1;

        connection.query(versionQuery,
            [updatedItem.id],
            function(err, rows) {
                return next(err);
            });
        connection.query(updateQuery,
            [updatedItem.name, updatedItem.address, updatedItem.acre, updatedItem.openStatus, updatedItem.trails, updatedItem.version, updatedItem.id],
            function(err, rows) {
                connection.query( "INSERT INTO `update` ( updatedBy, updates, date ) values (?,?, CURDATE())", [req.user.username, updatedItem.id],
                    function(err2, rows2) {
                        return next(err2);
                    }

                );
            return next(err);
        });
    }

    res.render("modifyItem", {message:"Item Modified. Version number: "+ updatedItem.version, user:req.user});
};
