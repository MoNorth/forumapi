var db = require("./db.js");

exports.addLoginInfo = function(userinfo, callback){
	var sql = "insert into login (login_email,login_name,login_password) values (?,?,?)";
	var params = [userinfo.email, userinfo.name, userinfo.password];
	db.query(sql, params, callback);
}

exports.addUserInfoFrist = function(login_id, callback){
	var sql = "insert into userinfo (login_id) values (?)";
	db.query(sql, [login_id], callback);
}

exports.addProject = function(login_id, project, callback){
	var sql = "insert into project (login_id, project_title, project_context, project_date, project_label) values (?,?,?,?,?)";
	var date = new Date().toString();
	db.query(sql, [login_id, project.project_title, project.project_context, date, project.project_label], callback);
}


exports.addComment = function(login_id, project_id, comment, callback){
	var sql = "insert into comment (login_id, project_id, comment_context, comment_date, comment_comment) values (?,?,?,?,?)";
	var date = new Date().toString();
	db.query(sql, [login_id, project_id, comment.comment_context, date, comment.comment_comment], callback);
}


exports.updateMsg = function(login_id, msg, callback){
	var sql = "update userinfo set info_msg=? where login_id=?";
	db.query(sql, [msg, login_id], callback);
}

exports.updateImg = function(login_id, img, callback){
	var sql = "update userinfo set info_img=? where login_id=?";
	db.query(sql, [img, login_id], callback);
}