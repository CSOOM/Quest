var express = require('express');
var app = express();
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var secret = require('./secret.json');
var passport = require('passport');
var mysql = require('mysql');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: 'yaaaaaaaho'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

var db = mysql.createConnection({
	host: "jpdev.silver.knowre.com",
	port: 3306,
	user: secret.user,
	password: secret.password,
	database: 'smcho'
});

var server = http.createServer(app).listen(3000, function () {
    console.log('server running at http://local.knowreapi.com:3000');
});


passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});
 
passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    done(null, user);
});


passport.use(new GoogleStrategy({
	    clientID: secret.clientID,
	    clientSecret: secret.clientSecret,
	    callbackURL: "http://local.knowreapi.com:3000/oauth2callback"
	},
	function(accessToken, refreshToken, profile, done) {
		var birthday = profile._json.birthday;
		done(null, birthday);
  	}
));

app.get('/', function (request, response) {
    fs.readFile('login.html', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
    });

});

app.get('/auth/google',
	passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login' }));

app.get('/oauth2callback', 
	passport.authenticate('google', { successRedirect: '/signup', failureRedirect: '/' }));

app.get('/style.css', function (request, response){
	fs.readFile('style.css', function(error, data){
		response.writeHead(200, {"Content-Type": "text/css"});
    	response.write(data);
    	response.end();
	});
});

app.post('/login', function (request, response){
	var query = 'SELECT birthday FROM User WHERE id = ? AND password = ?';

	db.query(query, [request.param('userid'), request.param('password')],
	function (error, result){
		if(result.length == 0){
			fs.readFile('login_fail.html', 'utf8', function (error, data) {
		        response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
				response.end();
		    });
		}else{
			fs.readFile('login_success.html', 'utf8', function (error, data) {
		        response.send(ejs.render(data, {
	            	result: result[0]
	            }));
		    });
		}
	});
});


app.get('/signup', function (request, response){
	fs.readFile('signup.html', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
    });
});

app.post('/signup_success', function (request, response){
	var query = 'INSERT INTO User(id, password, birthday) VALUES (?, ?, ?);';
	
	db.query(query, [request.param('userid'), request.param('password'), request.user], 
    function (error, result){
    	if(error){
    		console.log("ERROR: Same ID!");
    		fs.readFile('signup_fail.html', 'utf8', function (error, data) {
    			response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
				response.end();
		    });
    	}else{
    		fs.readFile('signup_success.html', 'utf8', function (error, data) {
    			response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
				response.end();
		    });
    	}
    });

});


