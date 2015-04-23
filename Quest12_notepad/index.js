var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/load"] = requestHandlers.load;
handle["/fileload"] = requestHandlers.fileload;
handle["/save"] = requestHandlers.save;
handle["/save_title_changed"] = requestHandlers.save_title_changed;

server.start(router.route, handle);