const mysql = require('mysql');

//Start mysql connection
const conexionDb = mysql.createConnection({
    host: "localhost",
    user: "your-database-user",
    password: "your-database-pass",
    database: "your-database-name"
  });

module.exports = {
    conexionDb
}