module.exports = {
    name: "ping",
    aliases: ["p"],
	category: "information",
    description: "Returns the latency of the API to the server",
	usage: "-ping",
    run: async(client, message, args) => {
        const msg = await message.channel.send(`Doing Ping...`)
        msg.edit(`Pong!\nThe Server-User Latency is \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\`ms\nAPI latency with respect to the server is \`${Math.round(client.ws.ping)}\`ms\nIf the latency is high, don't worry ... This doesn't affect the bot's performance.`);
    }
}