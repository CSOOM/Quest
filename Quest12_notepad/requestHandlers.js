var querystring = require("querystring");
var fs = require('fs');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');

function start(response, postData) {
	console.log("Request handler 'start' was called.");

	fs.readFile('notepad.html', function(error, data){
        if(error) throw error;

		var html;
		html = data;
		response.writeHead(200, {"Content-Type": "text/html"});
    	response.write(html);
    	response.end();
	});

}

function load(response, postData) {
    console.log("Request handler 'load' was called.");

    var filelist = fs.readdirSync("./data");

    var data = "";
    data = data + filelist;

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(data);
    response.end();
    console.log("Send!");
}

function fileload(response, postData){
    var filename = "./data/"+postData;
    console.log("Request handler 'file load' was called.");
    fs.readFile(filename, function(error, data){
        if(error) throw error;

        data = iconv.convert(data).toString('UTF-8');
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(data);
        response.end();
    });
}

function save(response, postData) {  
    console.log("Request handler 'save' was called.");
    console.log(postData);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: "+
    querystring.parse(postData).text);
    response.end();
}


function save_title_changed(response, postData) {  
    console.log("Request handler 'save_title_changed' was called.");
    console.log(postData);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: "+
    querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.load = load;
exports.fileload = fileload;
exports.save = save;
exports.save_title_changed = save_title_changed;