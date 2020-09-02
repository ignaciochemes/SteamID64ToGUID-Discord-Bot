//NOT FINISH YET

const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const con = require('../../handler/database');

module.exports = {
    usage: "-guid",
    name: "guid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to MD5 hash GUID)",
    run: async(client, message, args) => {
        let siEnviarEmbed = new Discord.MessageEmbed();
        let sql = `SELECT COUNT(guid) FROM guids`;
            con.query(sql, function (err, result) {
                if (err) throw err;
            console.log("1 record inserted");
        });
        try {
            siEnviarEmbed.setDescription("<@" + message.author.id + ">")
					.addField('Total Guids converted:', `${sql}`, true)
					.setColor("#F8C300")
					.setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`)
        } catch (e) {
        console.log(`Error al convertir GUID`);
                 siEnviarEmbed.setTitle(`Error, cant connect to database`)
                 .setColor("#A62019")
                 .setDescription(`Algo paso`);
        } finally {message.channel.send(siEnviarEmbed)}
    }
}