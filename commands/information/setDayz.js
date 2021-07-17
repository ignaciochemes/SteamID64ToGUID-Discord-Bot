const { DayzDao } = require('../../src/daos/dayz.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralDao } = require('../../src/daos/commands.dao');
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const { MessageEventService } = require('../../src/services/messageEvent.services');

let puerto = [];

module.exports = {
    name: "setdayzserver",
    aliases: ["sds"],
	category: "information",
    description: "Set information from your dayz server",
	usage: "-setdayzserver",
    run: async(client, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'setDayzServer');
        await GeneralDao.generalAlmacenamientoDao(message, 'setDayzServer', GeneralConstantes.COMANDOS);        
        let data = await DayzDao.getDayzDao(message);
        if (!args[0]) return message.channel.send(TextConstants.SETDAYZ_NO_ARGS);
        if (args[0].length > 15) return message.channel.send(TextConstants.SETDAYZ_MAYOR_ARGS);
        const filter = m => m.author.id === message.author.id;
        message.reply(TextConstants.QUERY_PORT)
            .then(r => r.delete({timeout: GeneralConstantes.GENERAL_TIMEOUT}));
        await message.channel.awaitMessages(filter, { max: 1, time: GeneralConstantes.GENERAL_TIMEOUT})
            .then(collected => { puerto = collected.first().content
                if (collected.first().content === "cancel") return message.reply(TextConstants.CANCEL);
                if (!collected.first().content) return message.reply(TextConstants.NO_QUERY_PORT);
            });
        if (data) {
            await DayzDao.setDayzDao(message);
            await DayzDao.dayzDao(message, args[0], puerto)
            return message.channel.send(`The new Dayz server ip is now **\`${args[0]}\`**:**\`${puerto}\`** \n Now you can execute the \`dayzserverinfo\` command`);
        } else {
            await DayzDao.dayzDao(message, args[0], puerto)
            return message.channel.send(`The new Dayz server ip is now **\`${args[0]}\`**:**\`${puerto}\`** \n Now you can execute the \`dayzserverinfo\` command`);
        }
    }
}