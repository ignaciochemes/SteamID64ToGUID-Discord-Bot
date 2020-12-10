//CONFIGURE IT FOR USAGE
//THIS COMMAND RETURNS ESPECIFIC SERVER DATA

const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const Gamedig = require('gamedig');
const arma3IpModel = require('../../database/setarma3server');

module.exports = {
    name: "setarma3server",
    aliases: ["sds"],
	category: "information",
    description: "Set information from your Arma 3 server",
	usage: "-setarma3server",
    run: async(client, message, args) => {
        const data = await arma3IpModel.findOne({
            GuildID: message.guild.id
        });
    
        if (!args[0]) return message.channel.send(`You must provide your **Arma 3 Server IP** without the port!!! ONLY THE IP \n 
        It only works with port 2302 at the moment`);
    
        if (args[0].length > 15) return message.channel.send('Your new prefix must be under \`15\` characters!')
    
        if (data) {
            await arma3IpModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            
            message.channel.send(`The new Arma 3 server ip is now **\`${args[0]}\`** \n Now you can execute the \`arma3serverinfo\` command`);
    
            let newData = new arma3IpModel({
                Arma3Ip: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            message.channel.send(`The new Arma 3 server ip is now **\`${args[0]}\`** \n Now you can execute the \`arma3serverinfo\` command`);
    
            let newData = new arma3IpModel({
                Arma3Ip: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    }
}