var express = require('express');
var router = express.Router();
var sendemail = require('../modules/register/sendEmail.js');
var find = require('../store/find.js');
var save = require('../store/save.js');
var del = require('../store/del.js');

router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/sendemail', function(req, res, next) {
	var userinfo = {
		email : req.body.email,
  		name : req.body.name,
  		password : req.body.password
	};
	userinfo.password = new Buffer(userinfo.password, "base64").toString();
	find.existByEmailOrName(userinfo.email, userinfo.name, function(err, result){
		if(err)
			return res.render('emailback',{message: "服务器宕机啦~请稍后再试",href:"/"});
		if(!result)
			return res.render('emailback',{message: "该邮箱或昵称已被注册，请使用其他邮箱或昵称注册或直接登录",href:"/register"});

		var password = JSON.stringify(userinfo);

		var p = sendemail.encrypt(password);
		
		sendemail.send(userinfo, p, function(err, info){
			if(err)
			{
				res.render('emailback',{message: "认证邮件发送失败，请检查邮件地址是否正确或请稍后再试",href:"/register"});
			}
			else
				res.render('emailback',{message: "认证邮件已发送至您的邮箱，请注意查收",href : "/login"});
		});

	});
	
});

router.get('/sendemail/:password', function(req, res, next) {
	var password = req.params.password;
	try{
		var userinfo = JSON.parse(sendemail.decrypt(password));
	}
	catch(err){
		console.log("err email :",err);
		userinfo = false;
	}
	if(userinfo && userinfo.email && userinfo.name && userinfo.password)
	{
		find.existByEmailOrName(userinfo.email, userinfo.name, function(err, result){
			if(err)
				return res.render('emailback',{message: "服务器宕机啦~请稍后再试",href:"/"});
			if(!result)
				return res.render('emailback',{message: "该邮箱或昵称已被注册，请使用其他邮箱或昵称注册或直接登录",href:"/register"});

			console.log(userinfo)

			save.addLoginInfo(userinfo, function(err, result){
				if(err)
					return res.render('emailback',{message: "服务器宕机啦~请稍后再试",href:"/"});
				save.addUserInfoFrist(result.insertId, function(err, result){
					if(err)
					{
						del.delLoginInfo(result.insertId,function(){});
						return res.render('emailback',{message: "服务器宕机啦~请稍后再试",href:"/"});
					}
					return res.render('emailback',{message: "注册成功，你可以登陆啦",href : "/login"});
				});
				
			});

		});
		return;
	}
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
  	console.log("123");
});

router.get('/existbyemail', function(req, res, next) {
  var email = req.query.email;
  if(!email) return res.json({err: true, result: {}});
  find.existByEmail(email, function(err, result) {
  	if(err)
  		return res.json({err: err, result: {}});
  	return res.json({err: false, result: result});
  });
});

router.get('/existbyname', function(req, res, next) {
  var name = req.query.name;
  if(!name) return res.json({err: true, result: {}});
  find.existByName(name, function(err, result) {
  	if(err)
  		return res.json({err: err, result: {}});
  	return res.json({err: false, result: result});
  });
});


module.exports = router;