var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');

var server = express();
server.use(express.static(__dirname + "/publik"));
server.use(logger("dev"));

var data = bodyParser.urlencoded({
    extended: false
});

server.get("/users/:userId/books/:bookId", function (req, res) {
    res.send(res.params)
})

server.post("/api/datamhs", data, function (req, res) {
    res.send(req.body)
})

server.listen(4000, function () {
    console.log("Server run");
  });

