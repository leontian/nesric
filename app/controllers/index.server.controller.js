//var mysql = require("mysql");
//
//// First you need to create a connection to the db
//var pool = mysql.createPool({
//  host: "localhost",
//  user: "root",
//  password: "root",
//  database: "NESRIC"
//});
//
//var rows1;
//pool.getConnection(function(err, con){
//con.query('SELECT * FROM Users',function(err,rows){
//  if(err) throw err;
//
//  console.log('Data received from Db:\n');
//  rows1 = rows;
//  console.log(rows);
//  con.destroy();
//});
//});

exports.render = function(req, res) {
	if(req.isAuthenticated()) {
		res.redirect('/profile');
	}
	else {}
		res.render('index', {
			message: ''
	});
};
