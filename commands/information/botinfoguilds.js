const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "botinfoguilds",
    aliases: ["btg"],
    category: "informacion",
    description: "Return Discord guilds information",
    usage: "-botinfoguilds",
    run: async(client, message, args) => {
        let guilds = client.guilds.cache.map(guild => guild.name)
        const botinfoguilds = new MessageEmbed()
            .setTitle("Id64ToGUID")
            .setColor("#15f153")
            .setFooter("Developed by siegmund")
            .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
            .addField("Guilds", guilds)
        message.channel.send(botinfoguilds);
    }
}