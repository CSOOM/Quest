var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var secret = require('./secret.json');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var cookieParser = require('cookie-parser');
// var bodyParser   = require('body-parser');
//var session      = require('express-session');

app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: 'yaaaaaaaho'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

var server = http.createServer(app).listen(3000, function () {
    console.log('server running at http://local.knowreapi.com:3000');
});

passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});
 
passport.deserializeUser(function(user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    done(null, user);
    //});
});

passport.use(new GoogleStrategy({
	    clientID: secret.clientID,
	    clientSecret: secret.clientSecret,
	    callbackURL: "http://local.knowreapi.com:3000/oauth2callback"
	},
	function(accessToken, refreshToken, profile, done) {
		console.log(profile);
		console.log(profile.birthday);
		done(null,profile);
		/*
	    User.findOrCreate({ googleId: profile.id }, function (err, user) {
	      return done(err, user);
	    });
		*/
  	}
));

app.get('/', function (request, response) {
	var locals = {
    	title: 'This is my sample app',
    	url: '/auth/google'
    };
	response.render('index.jade', locals);
});

app.get('/auth/google',
	passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login' }));

app.get('/oauth2callback', 
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	}
);