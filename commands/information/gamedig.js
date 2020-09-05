const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const Gamedig = require('gamedig');

module.exports = {
    name: "conectados",
    aliases: ["conect"],
	category: "information",
    description: "Retorna la cantidad de usuarios conectados",
	usage: "-conectados",
    run: async(client, message, args) => {
        let resolve = await Gamedig.query({
            type: 'dayz',
            host: ''
        }).then((state) => {
            const inline = true;
            const embed = new Discord.MessageEmbed()
            .setColor("#F8C300")
            .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".png")
            //.addField('**Name**', userName)
            //.addField('**Nombre del servidor**', `🛡 ${state.name}`)
            //.addField('**Mapa**', `🛡 ${state.map}`)
            //.addField('**Total Users**', `${usersize}`, inline)
            .addFields(
                //{ name: "Online", value:'```' + `Intel i5 4690k \n3.5 Ghz - 4.2 Ghz` + '```', inline: true },
                { name: "Usuarios", value:'```' + `Online: ${state.raw.numplayers} \nMax players: ${state.maxplayers}` + '```', inline},
                { name: 'Latencia', value:'```' + `Ping: ${state.ping}` + '```', inline},
                //{ name: "Memory", value:'```' + `Total: ${Math.round(OS.totalmem()/1000000)} MB \nFree: ${Math.round(OS.freemem()/1000000)} MB \nUsed: ${Math.round(OS.totalmem()-OS.freemem())/1000000} MB` + '```', inline: true },
                //{ name: "OS", value:'```' + `This bot run in Win ${os.arch()} exact ${os.type()} \nUptime: ${os.uptime()/1000} Hs` + '```', inline: true },
                //{ name: "Versions", value:'```' + `Node Version: ${process.versions.node} \nv8: ${process.versions.v8}` + '```', inline: true },
                //{ name: "Server", value:'```' + `Server is Online! \n Since: ${os.uptime()/1000} Hs \nServer Ubication: Argentina` + '```', inline: true },
                )
            //.setFooter(`2020 © ${client.user.username}.`)
            .setFooter(`2020 © Sudestada ARG - Develop by oaki`)
            .setTimestamp()

            message.channel.send(embed);
            console.log(state);
        }).catch((error) => {
            console.log(error);
        });
    }
}