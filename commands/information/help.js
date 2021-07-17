const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { GeneralDao } = require("../../src/daos/commands.dao");
const { GeneralConstantes } = require("../../src/constants/generalConstants");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "information",
    description: "Returns all the commands, specifying each one",
    usage: "-help",
    run: async(client, message, args) => {
        await GeneralDao.generalAlmacenamientoDao(message, 'help', GeneralConstantes.COMANDOS);
        if (args[0]) return getCMD(client, message, args[0]);
        return getAll(client, message);
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setTitle(`Commands List \nPrefix \`-\`\nEx: \`-guid\``)
		.setColor(GeneralConstantes.DEFAULT_COLOR)
		.setDescription(`Type the command -help + <command> ex: \`-help ping\` to see the functions`)
		.setThumbnail(GeneralConstantes.THUMBNAIL);
		

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `There is no information about the command **${input.toLowerCase()}**`;
    if (!cmd) return message.channel.send(embed.setColor("RED").setDescription(info));
    if (cmd.name) info = `**Command Name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Alias**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**How to use**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <-> = required, [] = optional`);
    }
    return message.channel.send(embed.setColor(GeneralConstantes.DEFAULT_COLOR).setDescription(info));
}