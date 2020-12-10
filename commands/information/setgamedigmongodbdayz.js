//CONFIGURE IT FOR USAGE
//THIS COMMAND RETURNS ESPECIFIC SERVER DATA

const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const Gamedig = require('gamedig');
const dayzIpModel = require('../../database/setdayzserver');

module.exports = {
    name: "setdayzserver",
    aliases: ["sds"],
	category: "information",
    description: "Set information from your dayz server",
	usage: "-setdayzserver",
    run: async(client, message, args) => {
        const data = await dayzIpModel.findOne({
            GuildID: message.guild.id
        });
    
        if (!args[0]) return message.channel.send(`You must provide your **Dayz Server IP** without the port!!! ONLY THE IP \n 
        It only works with port 2302 at the moment`);
    
        if (args[0].length > 15) return message.channel.send('Your new prefix must be under \`15\` characters!')
    
        if (data) {
            await dayzIpModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            
            message.channel.send(`The new Dayz server ip is now **\`${args[0]}\`** \n Now you can execute the \`dayzserverinfo\` command`);
    
            let newData = new dayzIpModel({
                DayzIp: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            message.channel.send(`The new Dayz server ip is now **\`${args[0]}\`** \n Now you can execute the \`dayzserverinfo\` command`);
    
            let newData = new dayzIpModel({
                DayzIp: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    }
}