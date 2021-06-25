var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");

const jwtKey = "key-middleware"

var app = express();
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'db-a239fj.pmberjaya.com',
    user: 'doadmin',
    password: 'ft39sejhzpbehfbq',
    database: 'xdrug',
    port: '25060',
});

const auth = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({Message:"token not provided"})
    }

    const jwtToken = auth.split(" ")[1];
    jwt.verify(jwtToken, jwtKey, function(err, decoded) {
        if (err) {
            return res.status(401).json({Message:"invalid token"})
        }

        req.user = decoded
        next();
    });
}

app.post("/api/user/register", function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    var query = `INSERT INTO user(username, password) VALUES ('${req.body.username}', '${hashedPassword}')`

    connection.connect();

    connection.query(query, function (err, results, fields) {
        if (err) throw err;
        console.log(results);
    })

    connection.end();

    res.statusCode = 200;
    res.setHeader("Context-type", "application/json");
    res.send(`register success`);
})

app.post("/api/user/login", function (req, res) {
    var query = `SELECT * FROM user WHERE username = '${req.body.username}'`

    connection.connect();

    connection.query(query, function (err, results, fields) {
        if (err) throw err;

        console.log(req.body.password, results.password)

        var isPasswordTrue = bcrypt.compareSync(
            req.body.password,
            results[0].password
        );
    
        if (!isPasswordTrue) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
    
        var token = jwt.sign({ id: results.id }, jwtKey, {
            expiresIn: 86400 // 24 hours
        });
    
        var response = {
            id: results[0].id,
            username: results[0].username,
            token: token,
        }
    
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.send(response);
    })

    connection.end();
})

app.get("/api/drug/detail/:id", auth, function (req, res) {
    var id = req.params.id;
    var query = `SELECT * FROM drug WHERE id = ${id}`

    connection.connect();

    connection.query(query, function (err, results, fields) {
        if (err) throw error;

        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.send(results[0]);
    })

    connection.end();
})

app.post("/api/drug/add", auth, function (req, res) {
    var name = req.body.name;
    var stock = req.body.stock;
    var query = `INSERT INTO drug(name, stock) VALUES ('${name}', '${stock}')`;

    connection.connect();

    connection.query(query, function(err, result) {
        if (err) throw err;
        console.log("row affected: 1");
    })

    connection.end();

    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.send('success');
})

app.put("/api/drug/edit", auth, function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var stock = req.body.stock;
    var query = `UPDATE drug SET name = '${name}', stock = '${stock}' WHERE id = '${id}'`

    connection.connect();

    connection.query(query, function(err, result) {
        if (err) throw err;

        var resp = {
            id: id,
            name: name,
            stock: stock
        }

        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.send(resp);
    })

    connection.end();
})

app.delete("/api/drug/delete/:id", auth, function (req, res) {
    var id = req.params.id;
    var query = `DELETE FROM drug WHERE id = '${id}'`

    connection.connect();

    connection.query(query, function (err, result) {
        if (err) throw err;

        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.send('success');
    });

    connection.end();
})

app.listen(4000, function() {
    console.log("server running");
})