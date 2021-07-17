const Gamedig = require('gamedig');
const { MessageEmbed } = require("discord.js");
const { DayzDao } = require('../../src/daos/dayz.dao');
const { GeneralDao } = require('../../src/daos/commands.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');

module.exports = {
    name: "dayzserverinfo",
    aliases: ["conect"],
	category: "information",
    description: "Return your Dayz server information.",
	usage: "-serverinfo",
    run: async(client, message, args) => {
        await GeneralDao.generalAlmacenamientoDao(message, 'dayzServerInfo', GeneralConstantes.COMANDOS);
        let data = await DayzDao.getDayzDao(message);
        if(data) {
            const host = data.DayzIp;
            const port = data.DayzPort;
            await Gamedig.query({
                type: 'dayz',
                host: host,
                port: port
            }).then((state) => {
                const inline = true;
                if (state.password === false) state.password = "No";
                if (state.raw.rules.dedicated === '1') state.raw.rules.dedicated = "Its Dedicated Server";
                if (state.raw.rules.dedicated === '0') state.raw.rules.dedicated = "Its not a Dedicated Server";
                if (state.raw.secure === 1) state.raw.secure = "Server Protected by **BattlEye**";
                if (state.raw.secure = 0) state.raw.secure = "Server not protected";
                const embed = new MessageEmbed()
                .setColor(GeneralConstantes.DEFAULT_COLOR)
                .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".png")
                .addFields(
                    { name: "Server Info", value:'```' + `Name: ${state.name} \nMap: ${state.map} \nPassword: ${state.password}` + '```', inline},
                    { name: "Users", value:'```' + `Online: ${state.raw.numplayers} \nMax players: ${state.maxplayers}` + '```', inline},
                    { name: 'Ping', value:'```' + `Ping to Argentina Server: ${state.ping}` + '```', inline},
                    { name: "Extra Info", value:'```' + `Version: ${state.raw.version} \nDedicated Server?: ${state.raw.rules.dedicated} \nBattleye: ${state.raw.secure}` + '```', inline},
                    )
                .setFooter(GeneralConstantes.DEFAULT_FOOTER)
                .setTimestamp()
                return message.channel.send(embed);

            }).catch(() => {
                message.reply(`An error was found with your ip address: ${host}\n
                Error: Failed all 2 attempts
                Attempt #1 - Port=27016 Retry=0:
                Error: UDP - Timed out after 2000ms
                Attempt #2 - Port=${port} Retry=0:
                Error: UDP - Timed out after 2000ms`)
                .then(m => m.delete({timeout: GeneralConstantes.GENERAL_TIMEOUT}));
            });
        } else if (!data) {
            return message.reply(TextConstants.DAYZ_NO_USER_IP)
            .then(m => m.delete({timeout: GeneralConstantes.GENERAL_TIMEOUT}));
        }
    }
}