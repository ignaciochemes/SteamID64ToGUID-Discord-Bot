const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { GeneralDao } = require('../../src/daos/commands.dao');
const { getMember, formatDate } = require("../../functions.js");
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const { MessageEventService } = require("../../src/services/messageEvent.services");

module.exports = {
    name: "user",
    aliases: ["u"],
    category: "information",
	description: "Returns user information",
    usage: "-user | -user <username>",
    run: async(client, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'user');
        await GeneralDao.generalAlmacenamientoDao(message, "user", GeneralConstantes.COMANDOS);
        let member = getMember(message, args.join(" "));
        let joined = formatDate(member.joinedAt);
        let roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';
        let created = formatDate(member.user.createdAt);
        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(GeneralConstantes.THUMBNAIL)
            .setColor(member.displayHexColor === GeneralConstantes.DISPLAY_COLOR_1 ? 
                GeneralConstantes.DISPLAY_COLOR_2 : member.displayHexColor)
            .addField('Information:', stripIndents `**- Name:** ${member.displayName}
                **- Join in:** ${joined}
                **- Roles:** ${roles}`, true)
            .addField('User Information:', stripIndents `**- ID:** ${member.user.id}
                **- Username**: ${member.user.username}
                **- Tag**: ${member.user.tag}
                **- Created**: ${created}`, true)
            .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Currently playing', stripIndents `** name:** ${member.user.presence.game.name}`);

        return message.channel.send(embed);
    }
}