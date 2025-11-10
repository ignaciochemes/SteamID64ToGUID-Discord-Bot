import { createHash } from "crypto";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { GeneralConstants } from "../Constants/GeneralConstants.js";
import { TextConstants } from "../Constants/TextConstants.js";
import { GeneralDao } from "../Daos/CommandsDao.js";
import { UidDao } from "../Daos/UidDao.js";

export default {
    data: new SlashCommandBuilder()
        .setName('uid')
        .setDescription('Convert SteamId64 to UID')
        .addStringOption(option =>
            option.setName('steamid64')
                .setDescription('Enter your SteamId64')
                .setRequired(true)
        ),
    async execute(interaction) {
        let aggregate = await UidDao.agregate();
        aggregate[0] ? aggregate = aggregate[0].Total : aggregate = 1;
        await GeneralDao.generalStoreDao(interaction.commandName, interaction.user.id, GeneralConstants.COMANDOS);
        const steamId64 = interaction.options.getString('steamid64');
        if (!/^\d{17}$/.test(steamId64)) {
            return interaction.reply({ content: TextConstants.UID_MENOR_ARGS, ephemeral: true });
        };
        let embed = new EmbedBuilder();
        try {
            let pwdToBase64 = createHash('sha256').update(steamId64).digest('base64');
            let pwdReplace = pwdToBase64.replace(GeneralConstants.MAS_REGEX, GeneralConstants.GUION);
            let pwdFinally = pwdReplace.replace(GeneralConstants.BARRA_REGEX, GeneralConstants.GUION_BAJO);
            await GeneralDao.uidStoreDao(pwdFinally, interaction.user.id, aggregate, steamId64);
            embed.setDescription("<@" + interaction.user.id + ">" + "    " + `Global UIDS converted: \`${aggregate}\``);
            embed.addFields(
                { name: 'SteamId64', value: `\`${steamId64}\``, inline: true },
                { name: '✅ Works UID', value: `\`${pwdFinally}\`` },
                { name: '❌ Test UID', value: `\`${pwdToBase64}\`` }
            );
            embed.setColor(GeneralConstants.DEFAULT_COLOR);
            embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
        } catch (error) {
            embed.setTitle('Error converting');
            embed.setDescription(`Are you sure you entered a correct number? \nExecute /steam and enter your Steam Link. Like this: \`/steam 765611....\` \nYou have to find your SteamId64 765611 .... and then, use it with the command \`/uid 765611.....\` to return the hash.`)
            embed.setColor("#A62019");
        } finally {
            return interaction.reply({ embeds: [embed] });
        }
    }

}