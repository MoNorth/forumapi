var mongoose = require("mongoose");

var options = {  
		server: {
			auto_reconnect: true,
			poolSize: 5
		}
	};

mongoose.connect('mongodb://127.0.0.1:27017/forum', options, function(err, res){
	if(err)
		console.log(err);
});

var db = mongoose.connection;


var projectSchema = new mongoose.Schema({
	project_id: {type: Number},
	assist: [{
		login_id: {type: Number},
		login_name: {type: String}
	}]
})

var projectFileSchema = new mongoose.Schema({
	file_name: {type: String},
	file_path: {type: String}
})

exports.projectModel = db.model('project', projectSchema);

exports.projectFileModel = db.model('file', projectFileSchema);



exports.init = function(exports, model){

	var create = function(project_id, assist, callback){
		model.create({project_id: project_id, assist: assist}, function(err, result){
			if(err)
			{
				console.log(err);
				callback("Server Error",error);
				return;
			}
			callback(false, result);
		})
	}



	exports.getAll = function(project_id, callback){
		model.find({project_id: project_id}, function(err, result){
			if(err)
			{
				console.log(err);
				callback("Server Error",error);
				return;
			}
			if(result.length < 1)
				return callback(false,[]);
			callback(false,result[0].assist);
		})
	}

	exports.assist = function(project_id, userInfo, callback){
		model.find({project_id: project_id}, function(err, result){
			if(err)
			{
				console.log(err);
				callback("Server Error",error);
				return;
			}
			if(result.length < 1)
				return exports.add(project_id, userInfo, callback);
			for(var i = 0; i < result[0].assist.length; i++)
			{
				if(result[0].assist[i].login_id == userInfo.login_id)
				{
					console.log(123)
					return exports.del(project_id, userInfo, callback);
				}
			}
			return exports.add(project_id, userInfo, callback);

		})
	}




	exports.add = function(project_id, userInfo, callback){
		model.update({project_id: project_id}, {$push: {assist: userInfo}}, function(err, result){
			if(err)
			{
				console.log(err);
				callback("Server Error",error);
				return;
			}
			if(result["nModified"] < 1)
				return create(project_id, [userInfo], callback)
			callback(false,result);
		})
	}

	exports.del = function(project_id, userInfo, callback){
		model.update({project_id: project_id}, {$pull: {assist: userInfo}}, function(err, result){
			if(err)
			{
				console.log(err);
				callback("Server Error",error);
				return;
			}
			callback(false,result);
		})
	}

	exports.count = function(project_id, callback){
		model.find({project_id: project_id}, function(err, result){
			if(err)
			{
				console.log(err);
				callback("Server Error",error);
				return;
			}
			var count = 0;
			if(result && result[0] && result[0].assist && result[0].assist.length)
				count = result[0].assist.length;
			callback(false, {result: count});
		})
	}
}



