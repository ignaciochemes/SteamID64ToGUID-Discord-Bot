//CONFIGURE IT FOR USAGE
//THIS COMMAND RETURNS ESPECIFIC SERVER DATA

const dayzIpModel = require('../../src/database/models/setdayzserver');
const generalAlmacenamiento = require('../../src/database/models/generalAlmacenamiento');

let puerto = [];

module.exports = {
    name: "setdayzserver",
    aliases: ["sds"],
	category: "information",
    description: "Set information from your dayz server",
	usage: "-setdayzserver",
    run: async(client, message, args) => {
        
        let newDataGeneral = new generalAlmacenamiento({
            comando: "setdayzserver",
            user: message.author.id,
            name: "comandos",
        });
        newDataGeneral.save()
        
        const data = await dayzIpModel.findOne({
            GuildID: message.author.id
        });
    
        if (!args[0]) return message.channel.send(`You must provide your **Dayz Server IP** and **QUERY PORT** not Game port`);
    
        if (args[0].length > 15) return message.channel.send('Your new prefix must be under \`15\` characters!')
        
        const filter = m => m.author.id === message.author.id;

            message.reply(`Now I need you to put the QUERY port of the server to trace. Write the number and press ENTER \nThis message will be deleted in a minute.`)
                .then(r => r.delete({timeout: 60000}));

            await message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000
            }).then(collected => {

                puerto = collected.first().content;

                if (collected.first().content === "cancel") {
                    return message.reply("Operation canceled!");
                }
                if (!collected.first().content) {
                    return message.reply(`You didnt enter the QUERY port. You have to start the operation again!`);
                }
            });

        if (data) {
            await dayzIpModel.findOneAndRemove({
                GuildID: message.author.id
            })
            
            message.channel.send(`The new Dayz server ip is now **\`${args[0]}\`**:**\`${puerto}\`** \n Now you can execute the \`dayzserverinfo\` command`);
    
            let newData = new dayzIpModel({
                DayzIp: args[0],
                DayzPort: puerto,
                GuildID: message.author.id
            })
            newData.save();
        } else if (!data) {
            message.channel.send(`The new Dayz server ip is now **\`${args[0]}\`**:**\`${puerto}\`** \n Now you can execute the \`dayzserverinfo\` command`);
    
            let newData = new dayzIpModel({
                DayzIp: args[0],
                DayzPort: puerto,
                GuildID: message.author.id
            })
            newData.save();
        }
    }
}