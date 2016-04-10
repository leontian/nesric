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
    }
    if(req.query.s) {
        var searchTerms = req.query.s.split(' ');
        var r = searchTerms[0];
        for (var w in searchTerms) {
            if (w.length > 0) {
                r = r + "|" + w;
            }
        }

        connection.query("SELECT * FROM SkiResorts s where s.name rlike ? or s.address rlike ?", [r, r], function (err, rows) {
            if (err)return next(err);
            res.json(rows);
            next();
        });
    }

    connection.query("SELECT * FROM SkiResorts s", function(err, rows) {
        if (err)return next(err);
        res.json(rows);
        next();
    });
};

