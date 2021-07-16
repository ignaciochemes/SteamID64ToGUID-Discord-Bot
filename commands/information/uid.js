const { createHash } = require("crypto");
const { MessageEmbed } = require("discord.js");
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const uidAlmacenamiento = require('../../src/database/models/uidalmacenamiento');
const { generalAlmacenamientoDao, uidAlmacenamientoDao } = require('../../src/daos/commands.dao');

module.exports = {
    usage: "-uid",
    name: "uid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to base64 hash UID)",
    run: async(client, message, args) => {
        let pwd = `${args}`;
        let res = await uidAlmacenamiento.aggregate([{ $group: { _id: "$name", Total: {$sum: 1} } }]);
        await generalAlmacenamientoDao(message, "uid", GeneralConstantes._comandos)
        let siEnviarEmbed = new MessageEmbed();
        if (!args[0]) return message.reply(TextConstants.UID_NO_ARGS)
            .then(msg => { msg.delete({ timeout: 25000 }) });
        if (`${pwd.length}` != 17) return message.reply(TextConstants.UID_MENOR_ARGS)
            .then(msg => { msg.delete({ timeout: 25000 }) });
        try {
            let hash = createHash('sha256').update(pwd).digest('base64');
            let tomaHash = hash.replace(GeneralConstantes.MAS_REGEX, GeneralConstantes.GUION);
            let reemplazaHash = tomaHash.replace(GeneralConstantes.BARRA_REGEX, gueneralConstantes.GUION_BAJOionBajo);
            await uidAlmacenamientoDao(reemplazaHash, message, res[0].Total)
            siEnviarEmbed.setDescription("<@" + message.author.id + ">" + "    " + `Global UIDS converted: \`${pepe[0].Total}\``)
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