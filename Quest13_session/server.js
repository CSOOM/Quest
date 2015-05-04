var user1_id = "knowre";
var user1_password = "1111";
var user1_nickname = "KnowRe";

var user2_id = "cathy";
var user2_password = "1234";
var user2_nickname = "캐시";

var user3_id = "smcho";
var user3_password = "0000";
var user3_nickname = "수민";

var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(app.router);

app.get('/', function (request, response) {
	console.log("start");
	response.cookie('auth', false);
	fs.readFile('login.html', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
    });
});

app.get('/Login', function (request, response) {
	console.log(request.cookies);
    if (request.cookies.auth === "true") { //성공
        response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
		response.write("<p>Login Success</p><p>nickname: "+request.cookies.nickname+"</p>");
		response.end();
    } else { //실패
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write("<p>Login Fail</p>");
		response.end();
    }
   
});

app.post('/Login', function (request, response) {
    // 쿠키를 생성합니다.
    var id = request.param('id');
    var password = request.param('password');

    // 출력합니다.
    console.log(id, password);

    // 로그인 확인.
    if (id== user1_id && password === user1_password) {// 로그인 성공
        response.cookie('auth', true);
        response.cookie('nickname', user1_nickname);
        response.redirect('/Login');
    } else if (id== user2_id && password === user2_password) {// 로그인 성공
        response.cookie('auth', true);
        response.cookie('nickname', user2_nickname);
        response.redirect('/Login');
    } else if (id== user3_id && password === user3_password) {// 로그인 성공
        response.cookie('auth', true);
        response.cookie('nickname', user3_nickname);
        response.redirect('/Login');
    } else {// 로그인 실패
        console.log('fail');
        response.redirect('/Login');
    }

});

http.createServer(app).listen(2223, function () {
    console.log('Server running at http://127.0.0.1:2223');
});