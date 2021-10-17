const { BotClient } = require("./src/client/client");
const { getEnvironment } = require("./src/configs/environment");
const { DatabaseConnection } = require("./src/database/dbConnection");
//const { ServerExpress } = require("./src/webServer");

getEnvironment();
let client = BotClient.getInstance();
DatabaseConnection.getInstance();
//ServerExpress.getInstancia();

module.exports = client;