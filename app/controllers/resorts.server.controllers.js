/**
 * Created by leon on 4/8/16.
 */
var mysql = require('mysql');
var dbconfig = require('./db');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
exports.showResortByID = function(id) {
    connection.query("SELECT * FROM SkiResorts WHERE id = ?",[id], function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            return rows;
        }
    }
}
