const { MessageEmbed } = require('discord.js');
const guidAlmacenamiento = require('../../src/database/models/guidalmacenamiento');

module.exports = {
    name: "last10guid",
    aliases: ["l10g"],
    category: "information",
    description: "Show last 10 global guids convertion",
    usage: "-last10guid",
    run: async(client, message, args) => {
        let enviarEmbed = new MessageEmbed();
        
        await guidAlmacenamiento.find({
            name: "guid"
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
                    enviarEmbed.addField(`Number: ${element.numero}`, `GUID: \`${element.guid}\``)
                });
                message.channel.send(enviarEmbed);
            }
        )
    }
}