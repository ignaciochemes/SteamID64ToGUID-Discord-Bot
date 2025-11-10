import OS from 'os';
import os from 'os';
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { GeneralConstants } from "../Constants/GeneralConstants.js";
import { GeneralDao } from "../Daos/CommandsDao.js";
import { formatUptime } from '../Helpers/GenericFunctions.js';

export default {
    data: new SlashCommandBuilder()
        .setName("bot-info")
        .setDescription("Shows server info"),
    async execute(interaction) {
        let aggregate = await GeneralDao.generalStoreDao(interaction.commandName, interaction.user.id, GeneralConstants.COMANDOS);
        aggregate[0] ? aggregate = aggregate[0].Total : aggregate = 1;
        let embed = new EmbedBuilder();
        embed.setTitle(`Bot Information`);
        embed.setColor(GeneralConstants.DEFAULT_COLOR);
        embed.addFields(
            {
                name: "General:",
                value: `Name: \`${interaction.client.user.username}\` \nID: \`${interaction.client.user.id}\` \nGuilds: \`${interaction.client.guilds.cache.size}\` \nUsers: \`${interaction.client.users.cache.size}\``,
                inline: true
            },
            {
                name: "Developer:",
                value: `Name: \`${interaction.client.users.cache.get(GeneralConstants.DEVELOPER_ID).username}\` \nID: \`${GeneralConstants.DEVELOPER_ID}\``,
                inline: true
            },
            {
                name: "System:",
                value: `Platform: \`${OS.platform()}\` \nCPU: \`${OS.cpus()[0].model}\` \nRAM: \`${Math.round(OS.totalmem() / 1024 / 1024)} MB\``
            },
            {
                name: "Process Usage:",
                value: `CPU: \`${Math.round(process.cpuUsage().system / 1024 / 1024)} %\` \nRAM: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB\``,
                inline: true
            },
            {
                name: "System Free Resources:",
                value: `CPU: \`${Math.round(os.loadavg()[0] * 100)} %\` \nRAM: \`${Math.round(os.freemem() / 1024 / 1024)} MB\``,
                inline: true
            },
            {
                name: "Node.js:",
                value: `Version: \`${process.version}\` \nArchitecture: \`${process.arch}\``,
            },
            {
                name: "Statistics:",
                value: `Commands used: \`${aggregate}\``,
                inline: true
            },
            {
                name: "Uptime:",
                value: `\`${formatUptime(os.uptime())}\``,
                inline: true
            }
        );
        embed.setThumbnail(`${interaction.client.user.displayAvatarURL()}`);
        embed.setFooter({ text: GeneralConstants.DEFAULT_FOOTER });
        await interaction.reply({ embeds: [embed] });
    }
}