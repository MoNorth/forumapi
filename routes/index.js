var express = require('express');
var router = express.Router();
var oauth = require("../modules/oauth.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("http://127.0.0.1:8081");
});

module.exports = router;
