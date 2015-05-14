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



app.get('/', function (request, response) {
	var query1 = "SELECT b.bid, b.title, a.name, b.publisher "
		+ "FROM Book b, Author a, Writes w "
		+ "WHERE b.bid = w.bid AND w.aid = a.aid "
		+ "ORDER BY b.bid;";

    fs.readFile('page.html', 'utf8', function (error, data) {
        db.query(query1, function (error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
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

app.get('/search_white.png', function (request, response){
	fs.readFile('search_white.png', function(error, data){
		response.writeHead(200, {"Content-Type": "img/png"});
    	response.write(data);
    	response.end();
	});
});

app.get('/search', function (request, response) {
	var title, author, publisher; 

	if (request.query['title'] === "전체") {
		title = "%%";
	} else {
		title = "%" + request.query['title'] + "%";
	}

	if (request.query['author'] === "전체") {
		author = "%%";
	} else {
		author = "%" + request.query['author'] + "%";
	}

	if (request.query['publisher']==="전체") {
		publisher = "%%";
	} else {
		publisher = "%" + request.query['publisher'] + "%";
	}

	var query2 = "SELECT b.bid, b.title, a.name, b.publisher "
		+ "FROM Book b, Author a, Writes w "
		+ "WHERE b.bid = w.bid AND w.aid = a.aid "
		+ "AND b.title LIKE ? AND a.name LIKE ? AND b.publisher LIKE ? "
		+ "ORDER BY b.bid;";

	fs.readFile('page.html', 'utf8', function (error, data) {
        db.query(query2, [title, author, publisher], function (error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });

});

app.get('/record', function (request, response) {
	var query3 = "SELECT b.bid, b.title, a.name, b.publisher "
		+ "FROM Book b, Author a, Writes w "
		+ "WHERE b.bid = w.bid AND w.aid = a.aid AND b.bid = ? "
		+ "ORDER BY b.bid;";

	var query4 = "SELECT rid, personName, timeLend, timeReturn "
		+ "FROM RecordList "
		+ "WHERE bid = ? "
		+ "ORDER BY rid;";

	fs.readFile('record.html', 'utf8', function (error, data) {
        db.query(query3, request.query['id'], function (error, result) {
        	db.query(query4, request.query['id'], function (error, results) {
	        	console.log(results);
	            response.send(ejs.render(data, {
	            	book: result[0],
	                record: results
	            }));
	        });
        });
/*
        db.query(query4, request.query['id'], function (error, results) {
        	console.log(results);
            ejs.render(data, {
                record: results
            });
        });
*/

    });

});