var express = require('express');
var logger = require('morgan');
var bodyParser = require("body-parser");

var app = express();
app.use(logger('dev'));

app.get("/api/cari", function (req, res, next) {
    var nama = req.query.nama;
    var umur = req.query.umur;
    
    console.log(`nama : ${nama}`);
    console.log(`umur : ${umur}`);

    res.send(umur);
});

app.get("api/:nim/:nama", function (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.send(req.params);
});

app.listen(4000, function() {
    console.log("server running");
});