const generalAlmacenamiento = require('../../database/generalAlmacenamiento');

module.exports = {
    name: "ping",
    aliases: ["p"],
	category: "information",
    description: "Returns the latency of the API to the server",
	usage: "-ping",
    run: async(client, message, args) => {
        
        let newDataGeneral = new generalAlmacenamiento({
            comando: "ping",
            user: message.author.id,
            name: "comandos",
        });
        newDataGeneral.save()
        
        console.log("Se ejecuto el comando -Ping");
        const msg = await message.channel.send(`Doing Ping...`)
        msg.edit(`Pong!\nThe Server-User Latency is \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\`ms\nAPI latency with respect to the server is \`${Math.round(client.ws.ping)}\`ms\nIf the latency is high, don't worry ... This doesn't affect the bot's performance.`);
    }
}