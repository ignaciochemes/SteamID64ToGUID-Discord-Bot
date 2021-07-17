const { MessageEmbed } = require("discord.js");
const { GeneralDao } = require('../../src/daos/commands.dao')
const { GeneralConstantes } = require("../../src/constants/generalConstants");

module.exports = {
        name: "discordinfo",
        description: "Pulls the guild server info!",
        usage: "-discordinfo",
        category: "information",
		run: async (client, message, args) => {
			await GeneralDao.generalAlmacenamientoDao(message, "discordInfo", GeneralConstantes.COMANDOS)
			const onlineMembers = message.guild.members.cache.filter(m => m.presence.status !== "offline").size;
			let sEmbed = new MessageEmbed()
			.setColor(GeneralConstantes.DEFAULT_COLOR)
			.setTitle("Server Info")
			.setThumbnail('https://i.imgur.com/NGQMjSA.jpg')
			.setAuthor(`${message.guild.name} Info`)
			.addField("**Name:**", `${message.guild.name}`, true)
			.addField("**Founder:**", `${message.guild.owner}`, true)
			.addField("**Member Count:**", `${message.guild.memberCount}`, true)
			.addField("**👥 Members:**", `**${message.guild.memberCount}** (of which **${onlineMembers}** ${onlineMembers === 1 ? "is" : "are"} online)`, true)
			.addField("**⌨️ Text:**", `**${message.guild.channels.cache.filter(c => c.type === "text").size}**`, true)
			.addField("**🔉 Voice:**", `**${message.guild.channels.cache.filter(c => c.type === "voice").size}**`, true)
			.addField("**📁 Categories:**", `**${message.guild.channels.cache.filter(c => c.type === "category").size}**`, true)
			.setFooter(GeneralConstantes.DEFAULT_FOOTER);
		message.channel.send(sEmbed);
    }
}