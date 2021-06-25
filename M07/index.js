var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_database'
});

connection.connect();

connection.query('SELECT name FROM user WHERE id = 1', function (error, results, fields) {
    if (error) throw error;
    console.log('The name is: ', results[0].name);
});

connection.end();