const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GeneralConstants } = require("../Constants/GeneralConstants");
const { GeneralDao } = require("../Daos/CommandsDao");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows all commands"),
    async execute(interaction) {
        let aggregate = await GeneralDao.generalStoreDao(interaction.commandName, interaction.user.id, GeneralConstants.COMANDOS);
        aggregate[0] ? aggregate = aggregate[0].Total : aggregate = 1;
        let embed = new EmbedBuilder();
        const allCommands = interaction.client.commands.map(command => command.data.toJSON());
        const commands = allCommands.map(command => {
            return {
                name: `\`/${command.name}\``,
                value: `Description: ${command.description} \nUsage: /${command.name}`,
            }
        });
        embed.setTitle(`Commands`);
        embed.setDescription('For use a command, type / before the command name');
        embed.setColor(GeneralConstants.DEFAULT_COLOR);
        embed.addFields(commands);
        embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
        await interaction.reply({ embeds: [embed] });
    }
}