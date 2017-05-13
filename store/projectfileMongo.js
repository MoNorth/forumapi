var mongo = require("./mongo.js");
var model = mongo.projectFileModel;


exports.addFile = function (fileInfo, callback) {
	model.create(fileInfo, function(err, result){
		if(err)
		{
			console.log(err);
			callback("Server Error",error);
			return;
		}
		callback(false, result);
	})
}