const { GeneralConstantes } = require("../constants/generalConstants");

class MessageEventService {
    constructor(){}

    static async enviarLogsChannel(client, message, command) {
        let channel = await client.channels.cache.get(GeneralConstantes.LOGS_CHANNEL);
        let messageAuthor = await message.author.tag;
        let messageChannel = await message.channel.name;
        let messageGuild = await message.guild.name;
        if(!channel) throw new Error('No se encontro el channel');
        return channel.send(`Se ejecuto el comando: \`${command}\` => { \n Usuario: ${messageAuthor} \n Channel: ${messageChannel} \n Guild: ${messageGuild} \n }; `)
    }
}

module.exports = { MessageEventService };