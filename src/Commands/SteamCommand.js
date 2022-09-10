const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const SteamAPI = require("steamapi");
const { GeneralConstants } = require("../Constants/GeneralConstants");
const { GeneralDao } = require("../Daos/CommandsDao");

const steam = new SteamAPI(process.env.STEAM_API);
let id64Resolve = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("steam")
        .setDescription("Convert Steam profile url to SteamId64")
        .addStringOption(option =>
            option.setName("steamurl")
                .setDescription("Enter your Steam profile url")
                .setRequired(true)
        ),
    async execute(interaction) {
        await GeneralDao.generalStoreDao(interaction.commandName, interaction.user.id, GeneralConstants.COMANDOS);
        const pwd = interaction.options._hoistedOptions[0].value;
        let embed = new EmbedBuilder();
        try {
            let resolve = await steam.resolve(pwd).then(id => {
                id64Resolve = id;
                if (id64Resolve.toString().length != 17) return interaction.reply('Something is wrong. Please try again.');
                return id64Resolve;
            });
            steam.getUserSummary(resolve).then(summary => {
                const { nickName, realName, countryCode } = _steamInfoCorrector(summary.nickname, summary.realName, summary.countryCode);
                if (summary.gameServerIP, summary.gameServerSteamID, summary.gameExtraInfo, summary.gameID === undefined) {
                    embed.setTitle(`Steam Information`);
                    embed.setColor(GeneralConstants.DEFAULT_COLOR);
                    embed.addFields(
                        {
                            name: "General:",
                            value: `Nickname: \`${nickName}\` \nReal Name: \`${realName}\` \nCountry Code: \`${countryCode}\``,
                            inline: true
                        },
                        {
                            name: "Steam ID 64:",
                            value: `Steam ID: \`${summary.steamID}\``,
                            inline: true
                        }
                    );
                    embed.setThumbnail(`${summary.avatar.large}`);
                    embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
                    return interaction.reply({ embeds: [embed] });
                } else {
                    embed.setTitle(`Steam Information`);
                    embed.setColor(GeneralConstants.DEFAULT_COLOR);
                    embed.addFields(
                        {
                            name: "General:",
                            value: `Nickname: \`${nickName}\` \nReal Name: \`${realName}\` \nCountry Code: \`${countryCode}\``,
                            inline: true
                        },
                        {
                            name: "Steam ID 64:",
                            value: `Steam ID: \`${summary.steamID}\``,
                            inline: true
                        },
                        {
                            name: "Game:",
                            value: `\nGame Server IP: \`${summary.gameServerIP}\` \nGame Server Steam ID: \`${summary.gameServerSteamID}\` \nGame Extra Info: \`${summary.gameExtraInfo}\` \nGame ID: \`${summary.gameID}\``,
                            inline: true
                        }
                    );
                    embed.setThumbnail(`${summary.avatar.large}`);
                    embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
                    return interaction.reply({ embeds: [embed] });
                }
            });
        } catch (error) {
            embed.setTitle(`Steam Information`);
            embed.setColor(GeneralConstants.DEFAULT_COLOR);
            embed.setDescription(`Something is wrong. Please try again.`);
            embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
        }
    }
}

const _steamInfoCorrector = (nickName, realName, countryCode) => {
    !nickName || nickName === null ? nickName = 'Not found' : nickName = nickName;
    !realName || realName === null ? realName = 'Not found' : realName = realName;
    !countryCode || countryCode === null ? countryCode = 'Not found' : countryCode = countryCode;
    return { nickName, realName, countryCode };
}