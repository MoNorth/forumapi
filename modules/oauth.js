var jwt = require('jsonwebtoken');
var secret = require("../config/secret.js").secret;

module.exports = function(req, res, next)
{
	var token = req.headers.token || req.cookies.forum_token;
	var login_id = req.cookies.forum_id - 0;
	var login_name = req.cookies.forum_name;
	var login_email = req.cookies.forum_email;
	var userinfo = req.session.user;
	try{
		var userdata = jwt.verify(token, secret);
	}catch(e){
		userdata = false;
	}

	if(!(userdata && login_id && login_name && login_email && userinfo) || 
		!(userdata.data.login_id == login_id && userdata.data.login_name == login_name && userdata.data.email == login_email) ||
		!(userinfo.login_id == login_id && userinfo.login_name == login_name && userinfo.email == login_email))
	{

		var referer = req.headers.referer;
		if(!referer) return res.redirect("/login");
		var index = referer.indexOf('?');
		if(index != -1)
			referer = referer.substring(0, index);
		
		return res.json({
			err: true,
			result: {
				newurl: "http://127.0.0.1:32000/login?action=" + referer
			}
		})
	}

	req.app.locals.user = userinfo;
	next();
}