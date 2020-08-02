const mysql = require('mysql');

//Start mysql connection
const conexionDb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tatin",
    database: "tatin"
});

module.exports = {
    conexionDb
}