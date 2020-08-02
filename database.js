const mysql = require('mysql');

//Start mysql connection
const conexionDb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tatin"
});

module.exports = {
    conexionDb
}