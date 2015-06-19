var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    client = '265249425724-cv6oab62v0uh031n8k2ddiqjl1vsssho.apps.googleusercontent.com',
    secret = 'mI1YC6eKZJWjXBvehdsreZnS',
    redirect = 'http://localhost:3000/oauth2callback';

var oauth2Client = new OAuth2Client(client, secret, redirect);
//var oauth2 = googleapis.oauth2('v2');
//var calendar = googleapis.calendar('v3');
/*
var url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: 'https://www.googleapis.com/auth/plus.me'
});
*/
var calendar_auth_url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
});

var profile_auth_url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: 'https://www.googleapis.com/auth/plus.me'
});

exports.ping = function() {
    console.log('pong');
};


//------------------------------------------
var callback = function(clients) {
	exports.cal = clients.calendar;
	exports.oauth = clients.oauth2;
	exports.plus = clients.plus;
	exports.client = oauth2Client;
	//exports.url = calendar_auth_url;
	exports.url = profile_auth_url;
};


googleapis
	.discover('calendar', 'v3')
	.discover('plus', 'v1')
	.discover('oauth2', 'v2')
	.execute(function(err, client){
		if(!err){
			callback(client);
		}
});




