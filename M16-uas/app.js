var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(logger('dev'));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_database'
});

const auth = (req, res, next) => {
    if (req.header('token') === nil) {
        var err = {
            status: "401",
            message: "unauthorized",
        }

        next(err);
    }

    if (req.header("token") !== "rahasia") {
        var err = {
            status: "401",
            message: "unauthorized",
        }

        next(err);
    }

    next();
}

app.get("/api/drug/:id", auth, function (req, res, next) {
    var id = req.params.id;
    var query = 'SELECT * FROM drug WHERE id = ?'

    connection.connect();

    connection.query(query, function (err, results, fields) {
        if (err) throw error;

        console.log(results);
    })

    connection.end();

    res.statusCode = 200;
    res.setHeader("Context-type", "application/json");
    res.send(results);
})

app.post("/api/drug/add", auth, function (req, res, next) {
    var name = req.query.name;
    var stock = req.query.stock;
    var query = 'INSERT INTO drug(name, stock) VALUES (?, ?)';

    connection.connect();

    connection.query(query, function(err, result) {
        if (err) throw err;
        console.log("row affected: 1");
    })

    connection.end();

    res.statusCode = 200;
    res.setHeader("Context-type", "application/json");
    res.send('success');
})

app.put("/api/drug/edit", auth, function (req, res, next) {
    var id = req.query.id;
    var name = req.query.name;
    var stock = req.query.stock;
    var query = 'UPDATE drug SET name = ?, stock = ?, WHERE id = ?'

    connection.connect();

    connection.query(query, function(err, result) {
        if (err) throw err;
        console.log('row effected: 1');
    })

    res.statusCode = 200;
    res.setHeader("Context-type", "application/json");
    res.send('success');
})

app.delete("/api/drug/delete/:id", auth, function (res, req, next) {
    var id = req.params.id; 
    var query = 'DELETE FROM drug WHERE id = ?'

    connection.connect();

    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("record deleted: 1")
    });

    connection.end();

    res.statusCode = 200;
    res.setHeader("Context-type", "application/json");
    res.send('success');
})