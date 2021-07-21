const { DatabaseConnection } = require('./src/database/dbConnection');
const { BotClient } = require("./src/client/client");

//Conexion a la base de datos MONGODB
DatabaseConnection.getInstance();
let client = BotClient.getInstance();
//Inicio de servidor web
require('./src/webServer');


module.exports = client;