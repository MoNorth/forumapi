var crypto = require('crypto');
var secret = require('../../config/secret.js').secret;
var emailuser = require('../../config/email.js');
var nodemailer = require('nodemailer');

var localhost = "http://172.20.0.144:32000/register/sendemail/";

var transporter = nodemailer.createTransport(emailuser.sender);


exports.send = function(info, password, callback){
	var mailOptions = {
	    from: 'postmaster@yan622.com',
	    to: info.email,
	    subject: 'Forum注册确认邮件',
	    text: '请点击下列链接确认注册，请勿回复系统邮件',
	    html: '<h1>' + info.name + '你好，这里是Froum邮件服务中心</h1><h3>请点击下列链接确认注册，请勿回复系统邮件</h3><a href="' 
	    		+ localhost + password + '">Forum邮件确认</a>'
	};
	transporter.sendMail(mailOptions, callback);
}


exports.encrypt = function(password){
	var cipher = crypto.createCipher('aes192', secret);
	var enc = cipher.update(password, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
}

exports.decrypt = function(password){
	var decipher = crypto.createDecipher('aes192', secret);
	var enc = decipher.update(password, 'hex', 'utf8');
	enc += decipher.final('utf8');
	return enc;
}