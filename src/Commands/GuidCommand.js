const { createHash } = require("crypto");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GeneralConstants } = require("../Constants/GeneralConstants");
const { TextConstants } = require("../Constants/TextConstants");
const { GeneralDao } = require("../Daos/CommandsDao");
const { GuidDao } = require("../Daos/GuidDao");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guid')
        .setDescription('Convert SteamId64 to GUID')
        .addStringOption(option =>
            option.setName('steamid64')
                .setDescription('Enter your SteamId64')
                .setRequired(true)
        ),
    async execute(interaction) {
        let aggregate = await GuidDao.agregate();
        aggregate[0] ? aggregate = aggregate[0].Total : aggregate = 1;
        await GeneralDao.generalStoreDao(interaction.commandName, interaction.user.id, GeneralConstants.COMANDOS);
        const pwd = interaction.options._hoistedOptions[0].value;
        if (pwd.length != 17) return interaction.reply({ content: TextConstants.GUID_MENOR_ARGS, ephemeral: true });
        let embed = new EmbedBuilder();
        let bytes = [];
        let guid;
        try {
            for (let i = 0; i < 8; i++) {
                bytes.push(Number((BigInt(pwd) >> (8n * BigInt(i))) & 0xFFn));
            }
            guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
            bytes = [];
            await GeneralDao.guidStoreDao(guid, interaction.user.id, aggregate)
            embed.setDescription("<@" + interaction.user.id + ">" + "    " + `Global GUID converted: \`${aggregate}\``);
            embed.addFields(
                { name: 'SteamId64', value: `\`${pwd}\``, inline: true },
                { name: 'GUID', value: `\`${guid}\``, inline: true }
            );
            embed.setColor(GeneralConstants.DEFAULT_COLOR);
            embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
        } catch (error) {
            embed.setTitle('Error converting');
            embed.setDescription(`Are you sure you entered a correct number? \nExecute /steam and enter your Steam Link. Like this: \`/steam 765611....\` \nYou have to find your SteamId64 765611 .... and then, use it with the command \`/guid 765611.....\` to return the hash.`)
            embed.setColor("#A62019");
        } finally {
            return interaction.reply({ embeds: [embed] });
        }
    }
}