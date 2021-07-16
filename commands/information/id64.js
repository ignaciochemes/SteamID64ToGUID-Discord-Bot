const SteamAPI = require('steamapi');
const { MessageEmbed } = require('discord.js');
const configjson = require('../../config.json');
const generalAlmacenamiento = require('../../src/database/models/generalAlmacenamiento');

const steam = new SteamAPI(configjson.STEAM_API);
let id64Resolve = [];
module.exports = {
    name: "steam",
    aliases: ["steam"],
	category: "information",
    description: "Returns Steam ID 64",
	usage: "-steam <Your account URL here>",
    run: async(client, message, args) => {
        
        let newDataGeneral = new generalAlmacenamiento({
            comando: "id64",
            user: message.author.id,
            name: "comandos",
        });
        newDataGeneral.save()
        
        if(!args[0]) return message.reply('Insert account url | -steam <your steam account url here> ')
        .then(msg => {
          msg.delete({ timeout: 15000 })
        })
        else {
            let resolve = await steam.resolve(`${args}`).then(id => {
                id64Resolve = id;
                if (id64Resolve.toString().length != 17)
                    return message.reply('Something is wrong. Please try again.')
                    .then(msg => {
                        msg.delete({ timeout: 15000 })
                });
                return id64Resolve;
            });
            let getSummary = steam.getUserSummary(resolve).then(summary => {
                if (summary.gameServerIP, summary.gameServerSteamID, summary.gameExtraInfo, summary.gameID === undefined) {
                    const embed1 = new MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor("#F8C300")
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`);
                    message.channel.send(embed1);
                } else {
                    const embed2 = new MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor("#F8C300")
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .addField("Is Playing?", `Game Server IP: \`${summary.gameServerIP}\` \nGame Server ID: \`${summary.gameServerSteamID}\` \nGame Info: \`${summary.gameExtraInfo}\` \nGame AppId: \`${summary.gameID}\`` )
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`);
                    message.channel.send(embed2);
                }
            });
        }
    }
}