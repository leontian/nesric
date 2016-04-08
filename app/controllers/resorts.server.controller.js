var connection = require('../../config/db_connection').connection;
/**
 * Created by leon on 4/8/16.
 */

exports.showResort = function(req, res, next) {
    connection.query("SELECT * FROM SkiResorts", function(err, rows) {
        if (err)return next(err);
        //console.log(rows);
        res.render('profile', {
            message: '',
            list: rows,
            user: 'guest'
        })
    });
};

