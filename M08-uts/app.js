var express = require('express');
var logger = require('morgan');

var port = 8000
var app = express();
app.use(logger('dev'));

app.get("/persegi/:panjang/:lebar", function (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    var panjang = req.params.panjang;
    var lebar = req.params.lebar;
    var luas = panjang * lebar

    res.send({
        luas: luas
    });
});

app.listen(port, function() {
    console.log(`app is running on ${port}`);
});