const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const generalAlmacenamiento = require('../../database/generalAlmacenamiento');

module.exports = {
        name: "discordinfo",
        description: "Pulls the guild server info!",
        usage: "-discordinfo",
        category: "information",
		run: async (client, message, args) => {
			
			let newDataGeneral = new generalAlmacenamiento({
				comando: "discordinfo",
				user: message.author.id,
				name: "comandos",
			});
			newDataGeneral.save()
			
			console.log("Se utilizo comando SERVERINFO");
			const onlineMembers = message.guild.members.cache.filter(m => m.presence.status !== "offline").size;
			let sEmbed = new Discord.MessageEmbed()
			.setColor("#F8C300")
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
			.setFooter(`Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`);
		message.channel.send(sEmbed);
    }
}