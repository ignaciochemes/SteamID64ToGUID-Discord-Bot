const mysql = require('mysql');

let con = mysql.createConnection({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    database: "guid",
    password: "password"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;