const Gamedig = require('gamedig');
const { MessageEmbed } = require("discord.js");
const { ArmaDao } = require('../../src/daos/arma.dao');
const { GeneralDao } = require('../../src/daos/commands.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');
const { MessageEventService } = require('../../src/services/messageEvent.services');

module.exports = {
    name: "arma3serverinfo",
    aliases: ["conect"],
	category: "information",
    description: "Return your Arma 3 server information.",
	usage: "-arma3serverinfo",
    run: async(client, message, args) => {
        await MessageEventService.enviarLogsChannel(client, message, 'armaServerInfo');
        await GeneralDao.generalAlmacenamientoDao(message, 'armaServerInfo', GeneralConstantes.COMANDOS);
        let data = await ArmaDao.getArmaDao(message);
        if(data) {
            let host = data.Arma3Ip;
            let port = data.ArmaPort;
            await Gamedig.query({
                type: 'arma3',
                host: host,
                port: port
            }).then((state) => {
                const inline = true;
                if(state.password === false) state.password = "No";
                if(state.password === true) state.password = "Yes";
                if(state.raw.secure === 1) state.raw.secure = "Server Protected by **BattlEye**";
                if(state.raw.secure = 0) state.raw.secure = "Server not protected";
                const embed = new MessageEmbed()
                .setColor(GeneralConstantes.DEFAULT_COLOR)
                .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".png")
                .addFields(
                    { name: "Server Info", value:'```' + `Name: ${state.name} \nMap: ${state.map} \nPassword: ${state.password}` + '```', inline},
                    { name: "Users", value:'```' + `Online: ${state.raw.numplayers} \nMax players: ${state.maxplayers}` + '```', inline},
                    { name: 'Ping', value:'```' + `Ping to Argentina Server: ${state.ping}` + '```', inline},
                    { name: "Extra Info", value:'```' + `Version: ${state.raw.version} \nMission: ${state.game} \nBattleye: ${state.raw.secure}` + '```', inline},
                    )
                    .setFooter(GeneralConstantes.DEFAULT_FOOTER)
                .setTimestamp()
                state.players.forEach(element => {
                    embed.addField(`${element.name}`, `Score: \`${element.score}\` | Time: \`${Math.round(element.time)}\` seconds`)
                })
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
        } else {
            return message.reply(TextConstants.ARMA_NO_USER_IP)
            .then(m => m.delete({timeout: GeneralConstantes.GENERAL_TIMEOUT}));
        }
    }
}