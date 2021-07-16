const { createHash } = require("crypto");
const { MessageEmbed } = require("discord.js");
const guidAlmacenamiento = require('../../src/database/models/guidalmacenamiento');
const generalAlmacenamiento = require('../../src/database/models/generalAlmacenamiento');

let bytes = [];
module.exports = {
    usage: "-guid",
    name: "guid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to MD5 hash GUID)",
    run: async(client, message, args) => {
        
        let pepe = await guidAlmacenamiento.aggregate([{$group:{_id:"$name", Total:{$sum:1}}}]);

        let newDataGeneral = new generalAlmacenamiento({
            comando: "guid",
            user: message.author.id,
            name: "comandos",
        });
        newDataGeneral.save()
        
        let pwd = `${args}`;
		let tmp = message.content.split(" ");
        let siEnviarEmbed = new MessageEmbed();
			if(!args[0]) return message.reply(`Insert account id64 | -guid <your id64 here> | -guid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`)
			    .then(msg => {
			    msg.delete({ timeout: 25000 })
            });
            if (`${pwd.length}` != 17) return message.reply(`The entered arguments are wrong or not complete. Please check the data. \nIf you have any questions, just enter the uid comman. | -guid <your id64 here> | -guid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`)
                .then(msg => {
                    msg.delete({ timeout: 25000 })
            });
            try { 
                for (let i = 0; i < 8; i++) {
                    bytes.push(Number((BigInt(tmp[1]) >> (8n * BigInt(i))) & 0xFFn));
                }
                let guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
                bytes = [];
                
                let newData = new guidAlmacenamiento({
                    guid: guid,
                    user: message.author.id,
                    name: "guid",
                    numero: pepe[0].Total,
                });
                console.log(newData);
                newData.save();
                
                console.log(`Conversion de Guid exitosa`);
                siEnviarEmbed.setDescription("<@" + message.author.id + ">" + "    " + `Global GUID converted: \`${pepe[0].Total}\``)
					.addField('Your GUID encryption is:', `${guid}`, true)
					.setColor("#F8C300")
					.setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`)
            } catch(e)
            {
                 console.log(`Error al convertir GUID`);
                 siEnviarEmbed.setTitle(`Error converting`)
                 .setColor("#A62019")
                 .setDescription(`Are you sure you entered a correct number? \nExecute -steam and enter your Steam Link. Like this: \`-steam 765611....\` \nYou have to find your SteamId64 765611 .... and then, use it with the command \`-guid 765611.....\` to return the hash.`)
            } finally {message.channel.send(siEnviarEmbed)}
    }
}