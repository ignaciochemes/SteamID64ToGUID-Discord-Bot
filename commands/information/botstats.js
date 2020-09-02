const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "botstatssss",
    description: "Returns Bot information",
    usage: "!botstats",
    category: "informations",
    run: async(client, message, args) => {
		console.log("Se utilizo comando BOTSTATS");
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField(`Discord Totales`, client.guilds.cache.size)
            .addField(`Canales Totales`, client.channels.cache.size)
            .addField(`Usuarios Totales`, client.users.cache.size)
			.setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`)

        message.channel.send(embed);
    }
}