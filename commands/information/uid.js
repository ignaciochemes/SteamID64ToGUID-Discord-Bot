const { createHash } = require("crypto");
const { MessageEmbed } = require("discord.js");
const { GeneralDao } = require('../../src/daos/commands.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const uidAlmacenamiento = require('../../src/database/models/uidAlmacenamiento');

module.exports = {
    usage: "-uid",
    name: "uid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to base64 hash UID)",
    run: async(client, message, args) => {
        let pwd = `${args}`;
        let res = await uidAlmacenamiento.aggregate([{ $group: { _id: "$name", Total: {$sum: 1} } }]);
        res[0] ? res = res[0].Total : res = 1;
        await GeneralDao.generalAlmacenamientoDao(message, "uid", GeneralConstantes.COMANDOS)
        let siEnviarEmbed = new MessageEmbed();
        if (!args[0]) return message.reply(TextConstants.UID_NO_ARGS)
            .then(msg => { msg.delete({ timeout: GeneralConstantes.GENERAL_TIMEOUT }) });
        if (`${pwd.length}` != 17) return message.reply(TextConstants.UID_MENOR_ARGS)
            .then(msg => { msg.delete({ timeout: GeneralConstantes.GENERAL_TIMEOUT }) });
        try {
            let hash = createHash('sha256').update(pwd).digest('base64');
            let tomaHash = hash.replace(GeneralConstantes.MAS_REGEX, GeneralConstantes.GUION);
            let reemplazaHash = tomaHash.replace(GeneralConstantes.BARRA_REGEX, GeneralConstantes.GUION_BAJOionBajo);
            await GeneralDao.uidAlmacenamientoDao(reemplazaHash, message, res)
            siEnviarEmbed.setDescription("<@" + message.author.id + ">" + "    " + `Global UIDS converted: \`${res}\``)
                .addField('Your UID encryption is:', `✅ Works: \`${reemplazaHash}\` \n\n⁉️ Test: \`${hash}\``, true)
                .setColor(GeneralConstantes.DEFAULT_COLOR)
                .setFooter(GeneralConstantes.DEFAULT_FOOTER)
        } catch (e) {
            siEnviarEmbed.setTitle(`Error converting`)
                .setColor("#A62019")
                .setDescription(`Are you sure you entered a correct number? \nExecute -steam and enter your Steam Link.\nYou have to find your SteamId64 765611 .... and then, use it with the command \`-uid 765611.....\` to return the hash.`)
        } finally { message.channel.send(siEnviarEmbed) }
    }
}