var express = require('express');
var logger = require("morgan");
var jwt = require('jsonwebtoken');

const jwtKey = "belajar-middleware"

var app = express();
app.use(logger("dev"));

const jwtMiddeware = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({Message: "token not provided"})
    }

    const jwtToken = auth.split(" ")[1];
    jwt.verify(jwtToken, jwtKey, function(err, decoded) {
        if (err) {
            return res.status(401).json({Message: "invalid token"})
        }

        req.user = decoded
        next();
    });
}

app.get("/api/mahasiswa", jwtMiddeware, function (req, res) {
    res.setHeader("Content-Type", "application/json");

    res.status(200)
    res.send({data: req.user});
});

app.get("/api/auth/:nim", function (req, res) {
    res.setHeader("Content-Type", "application/json");

    var id = req.params.id
    var token = jwt.sign({ id: id }, jwtKey, {
        expiresIn: 86400 
    });

    res.status(200)
    res.send({ token: token });
});

app.use((error, req, res, next) => {
    res.send(error);
})

app.listen(4000, function() {
    console.log("server running");
})