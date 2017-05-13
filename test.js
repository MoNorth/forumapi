// var db = require('./store/find.js');
// db.existByEmailOrName('qq','aa',function(err, data){
// 	console.log(err, data);
// })


// var s = {
// 	a : "qwe",
// 	b: "123"
// }

// console.log(s.join(","));

// function utf8to16(str) {  
//     var out, i, len, c;  
//     var char2, char3;  
//     out = "";  
//     len = str.length;  
//     i = 0;  
//     while(i < len) {  
//          c = str.charCodeAt(i++);  
//          switch(c >> 4)  
//          {   
//            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:  
//              out += str.charAt(i-1);  
//              break;  
//            case 12: case 13:  
//              char2 = str.charCodeAt(i++);  
//              out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));  
//              break;  
//            case 14:  
//              char2 = str.charCodeAt(i++);  
//              char3 = str.charCodeAt(i++);  
//              out += String.fromCharCode(((c & 0x0F) << 12) |  
//                 ((char2 & 0x3F) << 6) |  
//                 ((char3 & 0x3F) << 0));  
//              break;  
//          }  
//     }  
  
//     return out;  
// }  

// console.log(utf8to16("阿斯顿"))


// function Annular(n) {
//     n = parseInt(n);
//     var divisor = [];
//     for (var i = 1; i <= n; i++) {
//         if (n % i == 0) {
//             divisor.push(i);
//         }
//     }
//     var len = divisor.length;
//     if (len % 2 == 0) {
//         var mid = len / 2;
//         var row = divisor[mid - 1];
//         var col = divisor[mid];
//     } else {
//         var row = divisor[Math.floor(len / 2)];
//         var col = row;
//     }
//     //console.log("行：" + row + "  列：" + col);
//     var arr = new Array(row)
//     for (var j = 0; j < arr.length; j++) {
//         arr[j] = new Array(col)
//     }
//     var quan = Math.ceil(row / 2);
//     var begin = 1;
//     var q = 0;
//     while (q < quan) {
//         var top = col - q * 2;
//         for (var i = 0; i < top; i++) {
//             arr[q][i + q] = begin + i;
//         }
//         var right = row - q * 2;
//         for (var i = 0; i < right; i++) {
//             arr[i + q][col - 1 - q] = begin + top - 1 + i;
//         }
//         var bottom = col - q * 2;
//         for (var i = 0; i < bottom; i++) {
//             arr[row - 1 - q][bottom - i - 1 + q] = begin + top - 1 + right - 1 + i;
//         }
//         var left = row - q * 2 - 1;
//         for (var i = 0; i < left; i++) {
//             arr[row - 1 - q - i][q] = begin + top - 1 + right - 1 + bottom - 1 + i;
//         }
//         var stop = begin + top + right + bottom + left - 4;
//         begin = stop + 1;
//         q++;
//     }

//     for(var i = 0;i<100;i++)
//     	for(var j = 0;j<100;j++)
//     		document.write(arr[i][j])
// }

// Annular(10000);




// var s = new Buffer('lkansdknalsd').toString('base64');
// console.log(s);


var project = require("./store/projectMongo.js");

// project.getAll(1, function(err, result){
// 	console.log(result)
// })

// project.del(3, {login_id:1, login_name:"hahah"}, function(err, result){
// 	console.log(result)
// })

project.count(3, function(err, result){
	console.log(result)
})

// project.create(1, [], function(err, result){
// 	console.log(result)
// })