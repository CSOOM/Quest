var num = process.argv[2];
var file = './config'+num;
var config = require(file);

config.print();