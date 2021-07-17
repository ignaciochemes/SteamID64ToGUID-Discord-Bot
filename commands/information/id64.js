const SteamAPI = require('steamapi');
const { MessageEmbed } = require('discord.js');
const configjson = require('../../config.json');
const { GeneralDao } = require('../../src/daos/commands.dao');
const { TextConstants } = require('../../src/constants/textConstants');
const { GeneralConstantes } = require('../../src/constants/generalConstants');

const steam = new SteamAPI(configjson.STEAM_API);
let id64Resolve = [];

module.exports = {
    name: "steam",
    aliases: ["steam"],
	category: "information",
    description: "Returns Steam ID 64",
	usage: "-steam <Your account URL here>",
    run: async(client, message, args) => {
        await GeneralDao.generalAlmacenamientoDao(message, 'steam', GeneralConstantes.COMANDOS);
        if(!args[0]) return message.reply(TextConstants.ID64_NO_ARGS)
            .then(msg => { msg.delete({ timeout: GeneralConstantes.GENERAL_TIMEOUT }) })
        try {
            let resolve = await steam.resolve(`${args}`).then(id => {
                id64Resolve = id;
                if(id64Resolve.toString().length != 17) return message.reply('Something is wrong. Please try again.')
                    .then(msg => { msg.delete({ timeout: GeneralConstantes.GENERAL_TIMEOUT })
                });
                return id64Resolve;
            });
            steam.getUserSummary(resolve).then(summary => {
                if (summary.gameServerIP, summary.gameServerSteamID, summary.gameExtraInfo, summary.gameID === undefined) {
                    const embed = new MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor(GeneralConstantes.DEFAULT_COLOR)
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(GeneralConstantes.DEFAULT_FOOTER);
                    return message.channel.send(embed);
                } else {
                    const embed = new MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor(GeneralConstantes.DEFAULT_COLOR)
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .addField("Is Playing?", `Game Server IP: \`${summary.gameServerIP}\` \nGame Server ID: \`${summary.gameServerSteamID}\` \nGame Info: \`${summary.gameExtraInfo}\` \nGame AppId: \`${summary.gameID}\`` )
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(GeneralConstantes.DEFAULT_FOOTER);
                    return message.channel.send(embed);
                }
            });
        } catch (e) {
            return message.channel.send(e);
        }
    }
}