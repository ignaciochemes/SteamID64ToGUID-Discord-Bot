//NOT FINISH YET

const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

let resultado = [];
module.exports = {
    usage: "-totalguids",
    name: "totalguids",
    category: "informacion",
    description: "Returns the Hash request (Steam Id 64 to MD5 hash GUID)",
    run: async(client, message, args) => {
        let siEnviarEmbed = new Discord.MessageEmbed();
        siEnviarEmbed.setDescription("<@" + message.author.id + ">")
            .addField('Total Guids converted:', `Total Guids converted ${resultadoMysql}`)
            .setColor("#F8C300")
            .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`)
    }
}