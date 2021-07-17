const { createHash } = require("crypto");
const { MessageEmbed } = require("discord.js");
const { GeneralDao } = require("../../src/daos/commands.dao");
const { TextConstants } = require("../../src/constants/textConstants");
const { GeneralConstantes } = require("../../src/constants/generalConstants");
const guidAlmacenamiento = require('../../src/database/models/guidAlmacenamiento');
const { MessageEventService } = require("../../src/services/messageEvent.services");

let bytes = [];

module.exports = {
    usage: "-guid",
    name: "guid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to MD5 hash GUID)",
    run: async(client, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'guid');
        let res = await guidAlmacenamiento.aggregate([{ $group: { _id: "$name", Total: { $sum:1 } } }]);
        res[0] ? res = res[0].Total : res = 1;
        await GeneralDao.generalAlmacenamientoDao(message, 'guid', GeneralConstantes.COMANDOS)
        let pwd = `${args}`;
		let tmp = message.content.split(" ");
        let siEnviarEmbed = new MessageEmbed();
			if(!args[0]) return message.reply(TextConstants.GUID_NO_ARGS)
                .then(msg => { msg.delete({ timeout: GeneralConstantes.GENERAL_TIMEOUT }) });
            if (`${pwd.length}` != 17) return message.reply(TextConstants.GUID_MENOR_ARGS)
                .then(msg => { msg.delete({ timeout: GeneralConstantes.GENERAL_TIMEOUT }) });
            try { 
                for (let i = 0; i < 8; i++) {
                    bytes.push(Number((BigInt(tmp[1]) >> (8n * BigInt(i))) & 0xFFn));
                }
                let guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
                bytes = [];
                await GeneralDao.guidAlmacenamientoDao(guid, message, res);
                siEnviarEmbed.setDescription("<@" + message.author.id + ">" + "    " + `Global GUID converted: \`${res}\``)
					.addField('Your GUID encryption is:', `${guid}`, true)
					.setColor(GeneralConstantes.DEFAULT_COLOR)
					.setFooter(GeneralConstantes.DEFAULT_FOOTER)
            } catch(e) {
                 siEnviarEmbed.setTitle(`Error converting`)
                 .setColor("#A62019")
                 .setDescription(`Are you sure you entered a correct number? \nExecute -steam and enter your Steam Link. Like this: \`-steam 765611....\` \nYou have to find your SteamId64 765611 .... and then, use it with the command \`-guid 765611.....\` to return the hash.`)
            } finally { return message.channel.send(siEnviarEmbed) }
    }
}