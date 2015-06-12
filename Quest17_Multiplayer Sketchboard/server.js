var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var express = require('express');

var app = express();
app.use(app.router);

var server = http.createServer(app).listen(2222, function () {
    console.log('server running at http://localhost:2222');
});


app.get('/', function (request, response) {
    fs.readFile('sketchboard.html', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
    });
});

app.get('/style.css', function (request, response){
	fs.readFile('style.css', function(error, data){
		response.writeHead(200, {"Content-Type": "text/css"});
    	response.write(data);
    	response.end();
	});
});

app.get('/function.js', function (request, response){
	fs.readFile('function.js', function(error, data){
		response.writeHead(200, {"Content-Type": "text/javascript"});
    	response.write(data);
    	response.end();
	});
});

app.get('/function_socket.js', function (request, response){
	fs.readFile('function_socket.js', function(error, data){
		response.writeHead(200, {"Content-Type": "text/javascript"});
    	response.write(data);
    	response.end();
	});
});

// 소켓 서버
var io = socketio.listen(server);

var num_client = 0;

io.sockets.on('connection', function (socket) {
    console.log("connected");
    num_client++;
    console.log("number of clients: "+num_client);

    if(num_client>1){
    	socket.broadcast.emit('information',{});
    }
    socket.on('information', function(data){
        console.log(data);
        socket.broadcast.emit('set', data);
    });

    socket.on('disconnect', function (){
    	console.log("Good Bye");
        num_client--;
        console.log(num_client);
    });

   	socket.on('new circle', function(data){
   		socket.broadcast.emit('new circle', data);
   	});

   	socket.on('new rectangle', function(data){
   		socket.broadcast.emit('new rectangle', data);
   	});

  	socket.on('new triangle', function(data){
   		socket.broadcast.emit('new triangle', data);
   	});

   	socket.on('keydown', function(data){
   		socket.broadcast.emit('keydown', data);
   	});

   	socket.on('active', function(data){
   		socket.broadcast.emit('active', data);
   	});
    
});


