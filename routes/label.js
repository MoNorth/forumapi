var express = require('express');
var router = express.Router();
var oauth = require("../modules/oauth.js");
var find = require('../store/find.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  find.getLabelList(function(err, result){
  	res.json({err: err, result: result})
  })
});

router.get('/project/:label', function(req, res, next) {
	var label = req.params.label;
	var limit = req.query.limit || false;
	if(!label)
		return res.json({err: true, result:"参数不全"});

	find.getProjectByLabel(label, limit, function(err, result){
		res.json({err: err, result: result})
	})
});

module.exports = router;
