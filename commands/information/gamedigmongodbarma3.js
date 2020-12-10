const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const Gamedig = require('gamedig');
const ARMA3IP = require('../../database/setarma3server');

module.exports = {
    name: "arma3serverinfo",
    aliases: ["conect"],
	category: "information",
    description: "Return your Arma 3 server information.",
	usage: "-arma3serverinfo",
    run: async(client, message, args) => {
        const data = await ARMA3IP.findOne({
            GuildID: message.guild.id
        });
        if(data) {
            const host = data.Arma3Ip;
    
            let resolve = await Gamedig.query({
                type: 'arma3',
                host: host
            }).then((state) => {
                const inline = true;
                if (state.password === false) {
                    state.password = "No"
                };
                if (state.password === true) {
                    state.password = "Yes"
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
                    { name: "Extra Info", value:'```' + `Version: ${state.raw.version} \nMission: ${state.game} \nBattleye: ${state.raw.secure}` + '```', inline},
                    )
                //.setFooter(`2020 © ${client.user.username}.`)
                .setFooter(`2020 © Id64ToGuid - Develop by oaki`)
                .setTimestamp()
    
                message.channel.send(embed);
                //console.log(state);
            }).catch((error) => {
                console.log(error);
            });
        } else if (!data) {
            return message.reply(`No ip related to your discord server was found. Please enter the following command to configure one. \`-setarma3server\`.`)
            .then(m => m.delete({timeout: 30000}));
        }
    }
}