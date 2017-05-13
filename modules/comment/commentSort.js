module.exports = function(commentArray){
	var newArray = [];
	eachComment(0, commentArray, newArray, "");
	return newArray;


}


function eachComment (id, commentArray, newArray, name) {
	for(var i = 0; i< commentArray.length; i++)
	{
		if(commentArray[i]["comment_comment"] == id)
		{
			if(id != 0)
				commentArray[i]["comment_name"] = name;
			newArray.push(commentArray[i]);
			eachComment(commentArray[i]["comment_id"], commentArray, newArray, commentArray[i]["login_name"]);
		}
	}

}

function findComment (id, commentArray) {
	for(var i = 0; i< commentArray.length; i++)
	{
		if(commentArray[i]["comment_comment"] == id)
			return 
	}
		
}