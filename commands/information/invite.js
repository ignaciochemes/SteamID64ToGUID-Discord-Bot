const { MessageEmbed } = require("discord.js");
const generalAlmacenamiento = require('../../src/database/models/generalAlmacenamiento');

module.exports = {
    name: "invite",
    aliases: ["dis"],
    category: "information",
    description: "Bot invite link",
    usage: "-invite",
    run: async(bot, message, args) => {
		
        let newDataGeneral = new generalAlmacenamiento({
            comando: "invite",
            user: message.author.id,
            name: "comandos",
        });
        newDataGeneral.save()
        
        console.log("Se utilizo comando INVITE");
        const discordinfo = new MessageEmbed()
            .setTitle("Hi, im open source!")
            .setColor("#F8C300")
            .setFooter("Developed by Develop by oaki")
            .setThumbnail('https://i.imgur.com/NGQMjSA.jpg')
            .addField("Bot Invite Link", `\n https://discordapp.com/api/oauth2/authorize?client_id=706139732073250860&permissions=523328&scope=bot`)
            .addField("Github Project", `\n https://github.com/siegmund0/SteamID64ToGUID-Discord-Bot`)
            .addField("Support Discord", `\n https://discord.gg/6YtgFUg`)
			.setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`);
        message.channel.send(discordinfo);
    }
}