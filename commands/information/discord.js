const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ["dis"],
    category: "information",
    description: "Bot invite link",
    usage: "-invite",
    run: async(bot, message, args) => {
		console.log("Se utilizo comando INVITE");
        const discordinfo = new Discord.MessageEmbed()
            .setTitle("Hi")
            .setColor("#F8C300")
            .setFooter("Developed by siegmund - oaki")
            .setThumbnail('https://i.imgur.com/NGQMjSA.jpg')
            .addField("Bot Invite Link", `\n https://discordapp.com/api/oauth2/authorize?client_id=706139732073250860&permissions=523328&scope=bot`)
			.addField("Support Discord", `\n https://discord.gg/6YtgFUg`)
			.setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`);
        message.channel.send(discordinfo);
    }
}