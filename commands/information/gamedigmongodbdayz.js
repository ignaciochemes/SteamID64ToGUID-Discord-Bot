const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const Gamedig = require('gamedig');
const DAYZIP = require('../../database/setdayzserver');

module.exports = {
    name: "dayzserverinfo",
    aliases: ["conect"],
	category: "information",
    description: "Return your Dayz server information.",
	usage: "-serverinfo",
    run: async(client, message, args) => {
        const data = await DAYZIP.findOne({
            GuildID: message.author.id
        });
        if(data) {
            const host = data.DayzIp;
            const port = data.DayzPort;
    
            let resolve = await Gamedig.query({
                type: 'dayz',
                host: host,
                port: port
            }).then((state) => {
                const inline = true;
                if (state.password === false) {
                    state.password = "No"
                };
                if (state.raw.rules.dedicated === '1') {
                    state.raw.rules.dedicated = "Its Dedicated Server"
                } else if (state.raw.rules.dedicated === '0') {
                    state.raw.rules.dedicated = "Its not a Dedicated Server"
                };
                if (state.raw.secure === 1) {
                    state.raw.secure = "Server Protected by **BattlEye**"
                } else if (state.raw.secure = 0) {
                    state.raw.secure = "Server not protected"
                };
                const embed = new Discord.MessageEmbed()
                .setColor("#F8C300")
                .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".png")
                .addFields(
                    { name: "Server Info", value:'```' + `Name: ${state.name} \nMap: ${state.map} \nPassword: ${state.password}` + '```', inline},
                    { name: "Users", value:'```' + `Online: ${state.raw.numplayers} \nMax players: ${state.maxplayers}` + '```', inline},
                    { name: 'Ping', value:'```' + `Ping to Argentina Server: ${state.ping}` + '```', inline},
                    { name: "Extra Info", value:'```' + `Version: ${state.raw.version} \nDedicated Server?: ${state.raw.rules.dedicated} \nBattleye: ${state.raw.secure}` + '```', inline},
                    )
                .setFooter(`2021 © Id64ToGuid - Develop by oaki`)
                .setTimestamp()
    
                message.channel.send(embed);
                //console.log(state);
            }).catch((error) => {
                console.log(error);
                message.reply(`An error was found with your ip address: ${host}\n
                Error: Failed all 2 attempts
                Attempt #1 - Port=27016 Retry=0:
                Error: UDP - Timed out after 2000ms
                Attempt #2 - Port=${port} Retry=0:
                Error: UDP - Timed out after 2000ms`)
                .then(m => m.delete({timeout: 40000}));
            });
        } else if (!data) {
            return message.reply(`No ip related to your discord profile.id was found. Please enter the following command to configure one. \`-setdayzserver\`.`)
            .then(m => m.delete({timeout: 30000}));
        }
    }
}