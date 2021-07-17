const { MessageEmbed } = require('discord.js');
const { GeneralDao } = require('../../src/daos/commands.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const guidAlmacenamiento = require('../../src/database/models/guidAlmacenamiento');
const { MessageEventService } = require('../../src/services/messageEvent.services');

module.exports = {
    name: "last10guid",
    aliases: ["l10g"],
    category: "information",
    description: "Show last 10 global guids convertion",
    usage: "-last10guid",
    run: async(client, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'last10Guid');
        await GeneralDao.generalAlmacenamientoDao(message, 'last10Guid', GeneralConstantes.COMANDOS)
        let enviarEmbed = new MessageEmbed();
        await guidAlmacenamiento.find({ name: "guid" }).sort({ numero: -1 }).limit(10).exec(
            function(err, res) {
                if (err) throw new Error(TextConstants.DB_SORT_ERROR)
                enviarEmbed.setDescription("<@" + message.author.id + ">")
                .setColor(GeneralConstantes.DEFAULT_COLOR)
                .setFooter(GeneralConstantes.DEFAULT_FOOTER)
                res.forEach(element => {
                    enviarEmbed.addField(`Number: ${element.numero}`, `GUID: \`${element.guid}\``)
                });
                return message.channel.send(enviarEmbed);
            }
        )
    }
}