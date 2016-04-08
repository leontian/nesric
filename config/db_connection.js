var mysql = require('mysql');
var dbconfig = require('./db');
var connection = mysql.createConnection(dbconfig.connection);

exports.connection = connection;
