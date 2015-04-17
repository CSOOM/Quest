var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/load"] = requestHandlers.load;
handle["/save"] = requestHandlers.save;

server.start(router.route, handle);