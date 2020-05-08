  
const Discord = require("discord.js")


module.exports = {
	name: "online",
    description: "Shows Bot active time",
    usage: "-online",
	category: "information",
    aliases: ["un"],
	run: async (client, message, args) => {
		function duration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString()
		const min = Math.floor((ms / (1000 * 60)) % 60).toString()
		const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
		const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
		return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} min, ${sec.padStart(2, '0')} seconds, `
		}

		let uptime = new Discord.MessageEmbed()
            .setTitle(`I'm online since: ${duration(client.uptime)}`)
            .setColor("RANDOM")
		message.channel.send(uptime);
	}
}