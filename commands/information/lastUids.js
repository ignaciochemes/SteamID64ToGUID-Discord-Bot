const { MessageEmbed } = require('discord.js');
const { GeneralDao } = require('../../src/daos/commands.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const uidAlmacenamiento = require('../../src/database/models/uidAlmacenamiento');
const { MessageEventService } = require('../../src/services/messageEvent.services');

module.exports = {
    name: "last10uid",
    aliases: ["l10u"],
    category: "information",
    description: "Show last 10 global uids convertion",
    usage: "-last10uid",
    run: async(client, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'last10Uid');
        await GeneralDao.generalAlmacenamientoDao(message, 'last10Uid', GeneralConstantes.COMANDOS)
        let enviarEmbed = new MessageEmbed();
        await uidAlmacenamiento.find({ name: "uid" }).sort({numero: -1}).limit(10).exec(
            function(err, res) {
                if (err) throw new Error(TextConstants.DB_SORT_ERROR)
                enviarEmbed.setDescription("<@" + message.author.id + ">")
                .setColor(GeneralConstantes.DEFAULT_COLOR)
                .setFooter(GeneralConstantes.DEFAULT_FOOTER)
                res.forEach(element => {
                    enviarEmbed.addField(`Number: ${element.numero}`, `UID: \`${element.uid}\``)
                });
                return message.channel.send(enviarEmbed);
            }
        )
    }
}