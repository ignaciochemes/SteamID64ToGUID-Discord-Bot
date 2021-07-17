const { GeneralDao } = require('../../src/daos/commands.dao');
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const { MessageEventService } = require('../../src/services/messageEvent.services');

module.exports = {
    name: "ping",
    aliases: ["p"],
	category: "information",
    description: "Returns the latency of the API to the server",
	usage: "-ping",
    run: async(client, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'ping');
        await GeneralDao.generalAlmacenamientoDao(message, 'ping', GeneralConstantes.COMANDOS)
        const msg = await message.channel.send(`Doing Ping...`)
        return msg.edit(`Pong!\nThe Server-User Latency is \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\`ms\nAPI latency with respect to the server is \`${Math.round(client.ws.ping)}\`ms\nIf the latency is high, don't worry ... This doesn't affect the bot's performance.`);
    }
}