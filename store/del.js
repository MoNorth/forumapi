var db = require("./db.js");
exports.delLoginInfo = function(login_id, callback){
	var sql = "delete from login where login_id=?";
	db.query(sql, [login_id], callback);
}

exports.delProject = function(login_id, project_id, callback){
	var sql = "delete from project where login_id=? and project_id=?";
	db.query(sql, [login_id, project_id], callback);
}