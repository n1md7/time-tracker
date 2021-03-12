require('dotenv').config();
var mysql = require('mysql2');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});

migration.init(connection, __dirname + '/migrations/mysql', function () {
    console.log("finished running MySql migrations");
});
