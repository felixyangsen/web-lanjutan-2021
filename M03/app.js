var express = require('express');
var logger = require('morgan');

var server = express();

server.use(logger('dev'));
server.use(express.static(__dirname + "/publik"));
server.listen(4000, function() {
    console.log("Server running");
});