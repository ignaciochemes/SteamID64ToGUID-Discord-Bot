const { MessageEmbed } = require("discord.js");
const { GeneralDao } = require("../../src/daos/commands.dao");
const { GeneralConstantes } = require("../../src/constants/generalConstants");
const { MessageEventService } = require("../../src/services/messageEvent.services");

module.exports = {
    name: "invite",
    aliases: ["dis"],
    category: "information",
    description: "Bot invite link",
    usage: "-invite",
    run: async(bot, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'invite');
		await GeneralDao.generalAlmacenamientoDao(message, 'invite', GeneralConstantes.COMANDOS)
        const discordinfo = new MessageEmbed()
            .setTitle("Hi, im open source!")
            .setColor(GeneralConstantes.DEFAULT_COLOR)
            .setThumbnail(GeneralConstantes.THUMBNAIL)
            .addField("Bot Invite Link", GeneralConstantes.BOT_INVITE_LINK)
            .addField("Github Project", GeneralConstantes.GITHUB_LINK)
            .addField("Support Discord", GeneralConstantes.SUPORT_DISCORD)
			.setFooter(GeneralConstantes.DEFAULT_FOOTER);
        return message.channel.send(discordinfo);
    }
}