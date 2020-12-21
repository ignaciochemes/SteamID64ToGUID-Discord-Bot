const Discord = require('discord.js');
const SteamAPI = require('steamapi');
const steam = new SteamAPI('9FA9188E3EBDF682BF1974024B8469CA');

let id64Resolve = [];
module.exports = {
    name: "steam",
    aliases: ["steam"],
	category: "information",
    description: "Returns Steam ID 64",
	usage: "-steam <Your account URL here>",
    run: async(client, message, args) => {
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
                    const embed1 = new Discord.MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor("#F8C300")
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`);
                    message.channel.send(embed1);
                } else {
                    const embed2 = new Discord.MessageEmbed()
                        .setTitle(`Steam Information`)
                        .setColor("#F8C300")
                        .addField("General:", `Nickname: \`${summary.nickname}\` \nReal Name: \`${summary.realName}\` \nCountry Code: \`${summary.countryCode}\``)
                        .addField("Extra Information:", `Steam ID: \`${summary.steamID}\``)
                        .addField("Is Playing?", `Game Server IP: \`${summary.gameServerIP}\` \nGame Server ID: \`${summary.gameServerSteamID}\` \nGame Info: \`${summary.gameExtraInfo}\` \nGame AppId: \`${summary.gameID}\`` )
                        .setThumbnail(`${summary.avatar.large}`)
                        .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`);
                    message.channel.send(embed2);
                }
            });
        }
    }
}