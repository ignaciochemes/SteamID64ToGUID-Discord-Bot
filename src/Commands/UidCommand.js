const { createHash } = require("crypto");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GeneralConstants } = require("../Constants/GeneralConstants");
const { TextConstants } = require("../Constants/TextConstants");
const { GeneralDao } = require("../daos/commands.dao");
const { UidDao } = require("../daos/UidDao");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uid')
        .setDescription('Convert GUID to SteamId64')
        .addStringOption(option =>
            option.setName('steamid64')
                .setDescription('Enter your SteamId64')
                .setRequired(true)
        ),
    async execute(interaction) {
        console.log(interaction)
        let aggregate = await UidDao.agregate();
        aggregate[0] ? aggregate = aggregate[0].Total : aggregate = 1;
        await GeneralDao.generalAlmacenamientoDao(interaction.commandName, interaction.user.id, GeneralConstants.COMANDOS);
        const pwd = interaction.options._hoistedOptions[0].value;
        if (pwd.length != 17) return interaction.reply({ content: TextConstants.UID_MENOR_ARGS, ephemeral: true });
        let embed = new EmbedBuilder();
        try {
            let pwdToBase64 = createHash('sha256').update(pwd).digest('base64');
            let pwdReplace = pwdToBase64.replace(GeneralConstants.MAS_REGEX, GeneralConstants.GUION);
            let pwdFinally = pwdReplace.replace(GeneralConstants.BARRA_REGEX, GeneralConstants.GUION_BAJOionBajo);
            await GeneralDao.uidAlmacenamientoDao(pwdFinally, interaction.user.id, aggregate);
            embed.setDescription("<@" + interaction.user.id + ">" + "    " + `Global UIDS converted: \`${aggregate}\``);
            embed.addFields(
                { name: 'SteamId64', value: `\`${pwd}\``, inline: true },
                { name: '✅ Works UID', value: `\`${pwdFinally}\``, inline: true },
                { name: '❌ Test UID', value: `\`${pwdToBase64}\``, inline: true }
            );
            embed.setColor(GeneralConstants.DEFAULT_COLOR);
            embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
        } catch (error) {
            console.log(error);
            embed.setTitle('Error converting');
            embed.setDescription(`Are you sure you entered a correct number? \nExecute /steam and enter your Steam Link. Like this: \`/steam 765611....\` \nYou have to find your SteamId64 765611 .... and then, use it with the command \`/uid 765611.....\` to return the hash.`)
            embed.setColor("#A62019");
        } finally {
            return interaction.reply({ embeds: [embed] });
        }
    }

}