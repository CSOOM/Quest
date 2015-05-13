var secret = require('./secret.json');
var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');

var db = mysql.createConnection({
	host: "jpdev.silver.knowre.com",
	port: 3306,
	user: secret.user,
	password: secret.password,
	database: 'smcho'
});

var app = express();
app.use(app.router);

http.createServer(app).listen(2222, function () {
    console.log('server running at http://localhost:2222');
});

var query1 = "SELECT b.bid, b.title, a.name, b.publisher "
		+ "FROM Book b, Author a, Writes w "
		+ "WHERE b.bid = w.bid AND w.aid = a.aid "
		+ "ORDER BY b.bid;";


app.get('/', function (request, response) {
    fs.readFile('page.html', 'utf8', function (error, data) {
        db.query(query1, function (error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
            console.log(results);
        });
    });
});

app.get('/style.css', function (request, response){
	fs.readFile('style.css', function(error, data){
		response.writeHead(200, {"Content-Type": "text/css"});
    	response.write(data);
    	response.end();
	});
});

