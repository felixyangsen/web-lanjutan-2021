const http = require("http");

http
    .createServer(function (req, res) {
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.write("<h1> Module HTTP Mobile and Web </h1>");

        res.end();
    })
    .listen(3400);