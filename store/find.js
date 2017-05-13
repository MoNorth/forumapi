var db = require("./db.js");

exports.existByEmail = function(email, callback){
	var sql = "select login_id from login where login_email='" + email + "'";
	db.query(sql, [], function(err, data){
		if(err)
			callback(err);
		else
			callback(false, !data.length);
	}) 
}
exports.existByEmailOrName = function(email, name, callback){
	var sql = "select login_id from login where login_email='" + email + "' or login_name='" + name + "'";
	db.query(sql, [], function(err, data){
		if(err)
			callback(err);
		else
			callback(false, !data.length);
	}) 
}

exports.existByName = function(name, callback){
	var sql = "select login_id from login where login_name='" + name + "'";
	db.query(sql, [], function(err, data){
		if(err)
			callback(err);
		else
			callback(false, !data.length);
	}) 
}

exports.testUser = function(email, callback){
	var sql = "select * from login where login_email=?";
	db.query(sql, [email], function(err, data){
		if(err)
			callback(err);
		else
			callback(false, data);
	}) 
}

function getUserName(login_id, callback){
	var sql = "select login_name from login where login_id=?";
	db.query(sql, [login_id], callback);
}
exports.getUserName = getUserName;

exports.getUserInfo = function(login_id, callback){
	var sql = "select * from userinfo where login_id=?";
	db.query(sql, [login_id], callback);
}

exports.getUserInfoAndName = function(login_id, callback){
	var sql = "select userinfo.info_img,userinfo.info_msg,login.login_id,login.login_name from userinfo left join login on (userinfo.login_id=login.login_id) where userinfo.login_id=?";
	db.query(sql, [login_id], callback);
}

exports.getUserProject = function(login_id, callback){
	var sql1 = "select project.project_id,project.project_title,project.project_label,project.project_date,count(comment.project_id) as count from project left join comment on (project.project_id=comment.project_id) where project.login_id=? group by project.project_id order by project.project_id desc";
	var sql2 = "select project.project_id,project.project_title,project.project_label,project.project_date,project.login_id,login.login_name,count(comment.project_id) as count from project left join login on (project.login_id=login.login_id) left join comment on (project.project_id=comment.project_id) group by project.project_id order by project.project_id desc"
	if(login_id == 0)
	{
		console.log("123");
		return db.query(sql2, callback);
	}
	else
		return db.query(sql1, [login_id], callback);
	
}


exports.getProjectById = function(project_id, callback){
	var sql = "select * from project where project_id=?";
	db.query(sql, [project_id], function(err, result){
		if(err)
			return callback(err, []);
		if(result.length != 1)
			return callback(404, "未找到");
		var login_id = result[0].login_id;
		getUserName(login_id, function(errs, results){
			if(errs)
				return callback(err, []);
			if(results.length != 1)
				return callback(404, "未找到");
			console.log(results)
			result[0].login_name = results[0].login_name;
			callback(false, result[0]);
		})
	});
}

exports.getProjectComment = function(project_id, callback){
	var sql = "select comment.comment_id,comment.comment_context,comment.comment_comment,comment.comment_date,comment.project_id,comment.login_id,login.login_name from comment left join login on (comment.login_id=login.login_id) where comment.project_id=? order by comment.comment_id desc";
	db.query(sql, [project_id], callback);
}


exports.getLabelList = function( callback){
	var sql = "select project_label,count(*) as count from project group by project_label order by count(*) desc";
	db.query(sql, [], callback);
}

exports.getProjectByLabel = function(label, limit, callback){
	if(limit)
	{
		var sql = "select project.project_id,project.project_title,project.project_label,project.project_date,project.login_id,login.login_name,count(comment.project_id) as count from project left join login on (project.login_id=login.login_id) left join comment on (project.project_id=comment.project_id) where project.project_label=? group by project.project_id order by count desc limit " + limit;
		db.query(sql, [label], callback);
	}
	else
	{
		sql = "select project.project_id,project.project_title,project.project_label,project.project_date,project.login_id,login.login_name,count(comment.project_id) as count from project left join login on (project.login_id=login.login_id) left join comment on (project.project_id=comment.project_id) where project.project_label=? group by project.project_id order by count desc"
		db.query(sql, [label], callback);
	}
}