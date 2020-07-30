const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "user",
    aliases: ["u"],
    category: "information",
	description: "Returns user information",
    usage: "-user | -user <username>",
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));
        console.log("Se ejecuto el comando -Usuario");
        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

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

        message.channel.send(embed);
    }
}