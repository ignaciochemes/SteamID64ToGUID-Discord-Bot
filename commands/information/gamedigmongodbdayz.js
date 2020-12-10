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
            GuildID: message.guild.id
        });
        if(data) {
            const host = data.DayzIp;
    
            let resolve = await Gamedig.query({
                type: 'dayz',
                host: host
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
                    state.raw.secure = "Server Protected by BattlEye"
                } else if (state.raw.secure = 0) {
                    state.raw.secure = "Server not protected"
                };
                const embed = new Discord.MessageEmbed()
                .setColor("#F8C300")
                .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".png")
                .addFields(
                    { name: "Server Info", value:'```' + `Online: ${state.name} \nMap: ${state.map} \nPassword: ${state.password}` + '```', inline},
                    { name: "Users", value:'```' + `Online: ${state.raw.numplayers} \nMax players: ${state.maxplayers}` + '```', inline},
                    { name: 'Ping', value:'```' + `Ping to Argentina Server: ${state.ping}` + '```', inline},
                    { name: "Extra Info", value:'```' + `Version: ${state.raw.version} \nDedicated Server?: ${state.raw.rules.dedicated} \nBattleye: ${state.raw.secure}` + '```', inline},
                    )
                .setFooter(`2020 © Id64ToGuid - Develop by oaki`)
                .setTimestamp()
    
                message.channel.send(embed);
                //console.log(state);
            }).catch((error) => {
                console.log(error);
            });
        } else if (!data) {
            return message.reply(`No ip related to your discord server was found. Please enter the following command to configure one. \`-setdayzserver\`.`)
            .then(m => m.delete({timeout: 30000}));
        }
    }
}