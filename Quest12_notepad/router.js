var fs = require('fs');

function route(handle, pathname, response, postData) {
	console.log("About to route a request for " + pathname);
	if(pathname==='/style.css'){
		fs.readFile('style.css', function(error, data){
			response.writeHead(200, {"Content-Type": "text/css"});
	    	response.write(data);
	    	response.end();
		});
	} else if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;