var express = require('express');
var router = express.Router();
var oauth = require("../modules/oauth.js");

var save = require("../store/save.js");
var find = require("../store/find.js");
var del = require("../store/del.js");
var sort = require("../modules/comment/commentSort.js");
var projectMongo = require("../store/projectMongo.js");

var  multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/files/')
    }, 
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});  

var upload = multer({
    storage: storage
});



/* GET home page. */
router.get('/',oauth, function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/comment/:id', function(req, res, next) {
	var project_id = req.params.id;
	if(!project_id)
		return res.json({err: true, result:"参数不全"});
	find.getProjectComment(project_id, function(err, result){
		var newResult = sort(result)

		return res.json({err: err, result: newResult});
	});
});

router.get('/del/:id', oauth, function(req, res, next) {
	var project_id = req.params.id;
	var userinfo = req.app.locals.user;
	if(!project_id)
		return res.json({err: true, result:"参数不全"});
	del.delProject(userinfo.login_id, project_id, function(err, result){
		console.log(result)
		return res.json({err: err, result: result});
	});
});


router.get('/assist/:id', oauth, function(req, res, next) {
	var project_id = req.params.id;
	var userinfo = req.app.locals.user;
	if(!project_id)
		return res.json({err: true, result:"参数不全"});
	projectMongo.assist(project_id, {login_id: userinfo.login_id, login_name: userinfo.login_name}, function(err, result){
		return res.json({err: err, result: result})
	})
});


router.get('/assistall/:id', function(req, res, next) {
	var project_id = req.params.id;
	if(!project_id)
		return res.json({err: true, result:"参数不全"});
	projectMongo.getAll(project_id, function(err, result){
		return res.json({err: err, result: result})
	})
});


router.post('/comment/:id', oauth, function(req, res, next) {
	var project_id = req.params.id;
	var userinfo = req.app.locals.user;
	var comment = {
		comment_context: req.body.comment_context,
		comment_comment: req.body.comment_comment || 0
	}

	if(!project_id || !comment.comment_context)
		return res.json({err: true, result:"参数不全"});
	save.addComment(userinfo.login_id, project_id, comment, function(err, result){
		return res.json({err: err, result: result});
	})
});


router.post('/addprojectfile', upload.any(), function(req, res, next){
	res.json({err: false, result:{url: "/files/" + req.files[0].filename, name: req.files[0].originalname}});

});


module.exports = router;
