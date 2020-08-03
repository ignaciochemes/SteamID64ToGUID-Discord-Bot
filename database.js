const mysql = require('mysql');

//Here you can change a database connection

//Start mysql connection
const conexionDb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tatin"
});
//End mysql connection

module.exports = {
    conexionDb
};