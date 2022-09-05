const { client } = require('../../index');
const { GeneralConstants } = require("../Constants/GeneralConstants");

class MessageEventService {
    static _client;
    constructor() {
        this._client = client;
    }

    static async enviarLogsChannel(interaction) {
        console.log(this._client);
        //let channel = await client.channels.cache.get(GeneralConstants.LOGS_CHANNEL);
        // const guild = this._client.guilds.cache.get(interaction.guildId);
        // const channel = guild.channels.cache.get(interaction.channelId);
        // const author = interaction.user.username + '#' + interaction.user.discriminator;
        // let messageAuthor = await message.author.tag;
        // let messageChannel = await message.channel.name;
        // let messageGuild = await message.guild.name;
        // if (!channel) throw new Error('No se encontro el channel');
        // return channel.send(`Se ejecuto el comando: \`${interaction.commandName}\` => { \n Usuario: ${author} \n Channel: ${channel} \n Guild: ${guild.name} \n }; `)
    }
}

module.exports = { MessageEventService };