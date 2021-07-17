const { PrefixDao } = require('../../src/daos/prefix.dao')
const { GeneralDao } = require('../../src/daos/commands.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');

module.exports = {
    name: "setprefix",
    aliases: ["stp"],
    category: "information",
    description: "Change bot prefix in your discord server",
    usage: "-setprefix",
    run: async(client, message, args) => {
        await GeneralDao.generalAlmacenamientoDao(message, 'setPrefix', GeneralConstantes.COMANDOS)
        let data = await PrefixDao.getPrefixDao(message);
        if (!args[0]) return message.channel.send(TextConstants.SETPREFIX_NO_ARGS);
        if (args[0].length > 5) return message.channel.send(TextConstants.SETPREFIX_MAYOR_ARGS)
        if (data) {
            await PrefixDao.setPrefixDao(message);
            await PrefixDao.prefixModelDao(args[0], message);
            return message.channel.send(`The new prefix is now **\`${args[0]}\`**`);
        } else if (!data) {
            await PrefixDao.prefixModelDao(args[0], message);
            return message.channel.send(`The new prefix is now **\`${args[0]}\`**`);
        }
    
    }
}