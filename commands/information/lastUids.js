const Discord = require('discord.js');
const uidAlmacenamiento = require('../../database/uidalmacenamiento');

module.exports = {
    name: "last10uid",
    aliases: ["l10u"],
    category: "information",
    description: "Show last 10 global uids convertion",
    usage: "-last10uid",
    run: async(client, message, args) => {
        let enviarEmbed = new Discord.MessageEmbed();
        
        await uidAlmacenamiento.find({
            name: "uid"
        }).sort({numero: -1}).limit(10).exec(
            function(err, res) {
                if (err) {
                    console.log(err);
                }
                console.log(res);
                enviarEmbed.setDescription("<@" + message.author.id + ">")
                .setColor("#F8C300")
                .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`)
                res.forEach(element => {
                    enviarEmbed.addField(`Number: ${element.numero}`, `UID: \`${element.uid}\``)
                });
                message.channel.send(enviarEmbed);
            }
        )
    }
}