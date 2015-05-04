var fs = require('fs');
var http = require('http');
var url = require('url');

http.createServer(function (request, response){
	var query = url.parse(request.url, false).query;


	fs.readFile('page.html', function(error, data){
		var html;
		if(request.method == 'GET'){
			console.log(query);
			html = data+query;
			response.writeHead(200);
			response.write(html);
			response.end();
		}else if(request.method == 'POST'){
			request.on('data', function(text){
				console.log(text);
				html = data+text;
				response.writeHead(200);
				response.write(html);
				response.end();
			});
		}

	});

}).listen(2222, function(){
	console.log("Server Running at http://localhost:2222");
});