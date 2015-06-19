var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    gapi = require('./gapi');

app.use(app.router);
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());

/*
app.configure('development', function() {
	app.use(express.errorHandler());
});

*/
var server = http.createServer(app).listen(3000, function () {
    console.log('server running at http://localhost:3000');
});


app.get('/', function (request, response) {
	/*
	fs.readFile('_index.html', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
    });
	*/
	var locals = {
    	title: 'This is my sample app',
    	url: gapi.url
    };
    console.log(gapi.url);
	response.render('index.jade', locals);
});

app.get('/oauth2callback', function(req, res) {
  	var code = req.query.code;
  	console.log(code);

  	gapi.client.getToken(code, function(err, tokens){
  		gapi.client.credentials = tokens;
    	getData();
  	});

  	var locals = {
        title: 'My sample app',
        url: gapi.url
 	};
  	res.render('index.jade', locals);
});

var my_profile = {};

var getData = function() {
	gapi.oauth.userinfo.get().withAuthClient(gapi.client).execute(function(err, results){
    	console.log(results);
	});

	console.log(gapi.plus);
/*
	gapi.cal.calendarList.list().withAuthClient(gapi.client).execute(function(err, results){
    	console.log(results);
  	});
*/
//	console.log(gapi.cal.events.list());
//	console.log(gapi.cal.calendarList.list());

};
