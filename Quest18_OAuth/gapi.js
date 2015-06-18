var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    client = '265249425724-cv6oab62v0uh031n8k2ddiqjl1vsssho.apps.googleusercontent.com',
    secret = 'mI1YC6eKZJWjXBvehdsreZnS',
    redirect = 'http://localhost:3000/oauth2callback';

oauth2Client = new OAuth2Client(client, secret, redirect);
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

exports.ping = function() {
    console.log('pong');
};


//------------------------------------------
/*
googleapis
  .discover('calendar', 'v3')
  .discover('oauth2', 'v2')
  .execute(function(err, client){
    if(!err)
      callback(client);
  });

var callback = function(clients) {
  console.log(clients);
  exports.cal = clients.calendar;
  exports.oauth = clients.oauth2;
  exports.client = oauth2Client;
  exports.url = calendar_auth_url;
};
*/

exports.cal = client.calendar;
exports.oauth = client.oauth2;
exports.url = calendar_auth_url;
exports.client = oauth2Client;