var connect = require('connect');
var connectRoute = require('connect-route');
var fs = require('fs');

var user1_id = "knowre";
var user1_password = "1111";
var user1_nickname = "KnowRe";

var user2_id = "cathy";
var user2_password = "1234";
var user2_nickname = "캐시";

var user3_id = "smcho";
var user3_password = "0000";
var user3_nickname = "수민";

var server = connect.createServer();

server.use(connect.cookieParser());
server.use(connect.bodyParser());
server.use(connectRoute(function (app){
	app.get('/Login', function (request, response){
		if(request.cookies.auth === 'true'){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write("<h1>Login Success</h1>");
			response.end();
		} else {
			fs.readFile('login.html', function(error, data){
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
				response.end();
			});
		}
	});

	app.post('/Login', function (request, response){
		if (request.body.id === user1_id && request.body.password === user1_password){
			response.writeHead (302, {
				'Location': '/Login',
				'Set-Cookie': ['auth = true']
				//'Set-Cookie': ['auth = true', 'nickname = user1_nickname']
			});
			response.end();
		} else { //로그인실패
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write("<h1>Login FAIL</h1>");
			response.end();
		}
	});
}));

server.listen(2222, function(){
	console.log('Server running at http://localhost:2222');
});