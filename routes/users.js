var express = require('express');
var router = express.Router();
var find = require("../store/find.js");
var oauth = require("../modules/oauth.js");
var save = require("../store/save.js");



var multer  = require('multer')
var upload = multer({ dest: __dirname + '/../public/images/project/'})
var uploadheader = multer({ dest: __dirname + '/../public/images/header/'})

var fs = require("fs");

router.post('/fixmsg', oauth, function(req, res, next){
	var login_id = req.app.locals.user.login_id;
	var msg = req.body.msg;
	if(!msg)
		return res.json({
					err: true,
					result: "参数不齐"
				});
	save.updateMsg(login_id, msg, function(err, result){
		return res.json({
					err: false,
					result: result
				});
	})
});

router.post('/fiximg/:id', uploadheader.single('img'), function(req, res, next){
	
	var login_id = req.params.id;
	save.updateImg(login_id, "/images/header/" + req.file.filename, function(err, result){
		return res.json({
					err: false,
					result: result
				});
	})
	
});


router.get('/aboutme', oauth, function(req, res, next) {

	var userinfo = req.app.locals.user;
	find.getUserInfo(userinfo.login_id, function(err, result){
		if(err)
		{
			return res.json({err: 500, result:"服务器出错"});
		}
		if(result.length != 1)
		{
			return res.json({err: 404, result:"该用户不存在"});
		}
		userinfo.info_img = result[0].info_img;
		userinfo.info_msg = result[0].info_msg;
		return res.json({
			err: false,
			result: userinfo
		});
	});
});

router.get('/userinfo/:id',  function(req, res, next) {

	var login_id = req.params.id;
	find.getUserInfoAndName(login_id, function(err, result){
		if(err)
		{
			return res.json({err: 500, result:"服务器出错"});
		}
		if(result.length != 1)
		{
			return res.json({err: 404, result:"该用户不存在"});
		}
		return res.json({
			err: false,
			result: result[0]
		});
	});
});

router.post('/addproject', oauth, function(req, res, next){
	var userinfo = req.app.locals.user;
	var project = {
		project_title : req.body.title,
		project_context: req.body.context,
		project_label: req.body.label
	}
	if(!userinfo || !project.project_title || !project.project_context || !project.project_label)
		return res.json({err:true, result:"内容不全"});
	save.addProject(userinfo.login_id, project, function(err, result){
		if(err)
			return res.json({err:true, result:"服务器崩了"});
		return res.json({err: false, result:result.insertId});
	})
});

router.post('/addprojectimg', upload.single('img'), function(req, res, next){
	res.json({err: false, result:{url: "/images/project/" + req.file.filename}});

});



router.get('/project/:id', function(req, res, next) {

	var login_id = req.params.id;
	find.getUserProject(login_id, function(err, result){
		if(err)
		{
			return res.json({err: 500, result:"服务器出错"});
		}
		console.log("12312312312")
		res.json({err: false, result: result})
	})
	
});

router.get('/projectbyid/:id', function(req, res, next) {

	var project_id = req.params.id;
	find.getProjectById(project_id, function(err, result){
		if(err)
		{
			return res.json({err: 500, result:"服务器出错"});
		}



		res.json({err: false, result: result})
	})
	
});








module.exports = router;
