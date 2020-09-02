const mysql = require('mysql');

let con = mysql.createConnection({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    database: "guid",
    password: ""
});

con.connect(function(err) {
    if (err) console.log("Database connection = False");
    console.log("Dabatase connection = True");
});

module.exports = con;