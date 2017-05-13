var mysql = require('mysql');
var config = require('../config/db.js');

var pool = mysql.createPool(config);

function query(sql, params, callback) {
    // pool.getConnection(function (err, connection) {
    // 	console.log("k1")
    //     connection.query(sql, params, function (err, rows) {
    // 		console.log("k2")

    //         connection.destroy();

    //         callback(err, rows);
    // 		console.log("k3")

    //     });
    // });

	pool.query(sql, params, function(err, rows){
		callback(err, rows);
	})
}




exports.query = query;

