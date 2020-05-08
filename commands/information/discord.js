const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "discorddsadsadasdas",
    aliases: ["dis"],
    category: "informacion",
    description: "Return Discord information",
    usage: "-discord",
    run: async(bot, message, args) => {
        let sicon = message.guild.iconURL;
        const discordinfo = new Discord.MessageEmbed()
            .setTitle("Id64ToGUID")
            .setColor("#15f153")
            .setFooter("Developed by siegmund")
            .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
            .addField("Server Name", message.guild.name)
            .addField("Founder", message.guild.owner.user.tag)
            .addField("Created in", message.guild.createdAt.toUTCString())
            .addField("Region", message.guild.region.toUpperCase())
            .addField("Total Members", `${message.guild.memberCount} Total Members\n ${message.guild.members.filter(m => !m.user.bot).size} User cache\n ${message.guild.members.filter(m => m.user.bot).size} Bot Cache`)
            .addField("Voice channels", message.guild.channels.filter(channel => channel.type === 'voice').size)
            .addField("Text channels", message.guild.channels.filter(channel => channel.type === 'text').size)
            .addField("Server emojis", guildEmojis)
        message.channel.send(discordinfo);
    }
}