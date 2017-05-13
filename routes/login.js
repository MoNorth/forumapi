var express = require('express');
var router = express.Router();
var find = require('../store/find.js');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret.js').secret;


router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {
	var userinfo = {
		email : req.body.email,
  		password : req.body.password
	};
	userinfo.password = new Buffer(userinfo.password, "base64").toString();
	find.testUser(userinfo.email, function(err, data){
		if(err)
			return res.json({err: 500, result: "服务器错误，请稍后再试"});
		if(data.length != 1)
			return res.json({err: 404, result: "该用户不存在"});
		if(data[0]["login_password"] != userinfo.password)
			return res.json({err: 303, result: "密码错误"});
		delete userinfo["password"];
		userinfo.login_id = data[0]["login_id"];
		userinfo.login_name = data[0]["login_name"];
		req.session.user = userinfo;
		return res.json({err: false, result: {
			login_id: data[0]["login_id"],
			login_name: data[0]["login_name"],
			login_email: data[0]["login_email"],
			login_token: jwt.sign({
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
				data: userinfo
			}, secret)
		}})
	});
});

module.exports = router;
