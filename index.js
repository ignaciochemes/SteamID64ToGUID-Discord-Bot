const { BotClient } = require("./src/client/client");
const { ServerExpress } = require("./src/webServer");

let client = BotClient.getInstance();
ServerExpress.getInstancia();

module.exports = client;