var querystring = require("querystring");
var fs = require('fs');


function start(response, postData) {
	console.log("Request handler 'start' was called.");

	fs.readFile('notepad.html', function(error, data){
		var html;
		html = data;
		response.writeHead(200, {"Content-Type": "text/html"});
    	response.write(html);
    	response.end();
	});

}

function load(response, postData) {
    console.log("Request handler 'load' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: "+
    querystring.parse(postData).text);
    response.end();
}

function save(response, postData) {
    console.log("Request handler 'load' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: "+
    querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.load = load;
exports.save = save;