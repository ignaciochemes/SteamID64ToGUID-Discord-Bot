const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "information",
    description: "Returns all the commands, specifying each one",
    usage: "-help",
    run: async(client, message, args) => {
        console.log("Se ejecuto el comando -Help");
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setTitle(`Commands List \nPrefix \`-\`\nEx: \`-guid\``)
		.setColor("RANDOM")
		.setDescription(`Type the command -help + <command> ex: \`-help ping\` to see the functions`)
		.setThumbnail('https://i.imgur.com/mnSJzVk.jpg');
		

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

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Command Name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Alias**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**How to use**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <-> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}