const { ArmaDao } = require('../../src/daos/arma.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralDao } = require('../../src/daos/commands.dao');
const { GeneralConstantes } = require('../../src/constants/generalConstants');

let puerto = [];

module.exports = {
    name: "setarma3server",
    aliases: ["sds"],
	category: "information",
    description: "Set information from your Arma 3 server",
	usage: "-setarma3server",
    run: async(client, message, args) => {
        await GeneralDao.generalAlmacenamientoDao(message, 'setArmaServer', GeneralConstantes.COMANDOS);
        let data = await ArmaDao.getArmaDao(message);
        if (!args[0]) return message.channel.send(TextConstants.SETARMA_NO_ARGS);
        if (args[0].length > 15) return message.channel.send(TextConstants.SETARMA_MAYOR_ARGS)
        const filter = m => m.author.id === message.author.id;
        message.reply(TextConstants.QUERY_PORT)
            .then(r => r.delete({timeout: GeneralConstantes.GENERAL_TIMEOUT}));
        await message.channel.awaitMessages(filter, { max: 1, time: GeneralConstantes.GENERAL_TIMEOUT})
            .then(collected => { puerto = collected.first().content
                if (collected.first().content === "cancel") return message.reply(TextConstants.CANCEL);
                if (!collected.first().content) return message.reply(TextConstants.NO_QUERY_PORT);
            });
        if (data) {
            await ArmaDao.setArmaDao(message);
            await ArmaDao.armaDao(message, args[0], puerto);
            return message.channel.send(`The new Arma 3 server ip is now **\`${args[0]}\`**:**\`${puerto}\`** \n Now you can execute the \`arma3serverinfo\` command`);
        } else {
            await ArmaDao.armaDao(message, args[0], puerto);
            return message.channel.send(`The new Arma 3 server ip is now **\`${args[0]}\`**:**\`${puerto}\`** \n Now you can execute the \`arma3serverinfo\` command`);
        }
    }
}