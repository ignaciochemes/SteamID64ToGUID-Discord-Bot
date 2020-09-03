const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const crypto = require("crypto");
const con = require('../../handler/database');

module.exports = {
    usage: "-uid",
    name: "uid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to base64 hash UID)",
    run: async(client, message, args) => {
		let discordUserTag = message.member.user.tag;
        let discordServer = message.guild.name;
        let tmp = message.content.split(" ");
        let pwd = `${args}`;
        let siEnviarEmbed = new Discord.MessageEmbed();
			if(!args[0]) return message.reply(`Insert account id64 | -uid <your id64 here> | -uid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`)
			.then(msg => {
			  msg.delete({ timeout: 25000 })
			});
            try {
                let hash = crypto.createHash('sha256').update(pwd).digest('base64');
				
                    //let sql = `INSERT INTO guids (id64, guid, discordserver, usuariotag) VALUES ('${args}', '${guid}', '${discordServer}', '${discordUserTag}')`;
                    //con.query(sql, function (err, result) {
                      //if (err) throw err;
                      //console.log("1 record inserted");
                    //});
				
                console.log(`Conversion de Guid exitosa`);
                siEnviarEmbed.setDescription("<@" + message.author.id + ">")
					.addField('Your UID encryption is:', `${hash}`, true)
					.setColor("#F8C300")
					.setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`)
            } catch(e)
            {
                 console.log(`Error al convertir UID ${e}`);
                 siEnviarEmbed.setTitle(`Error converting`)
                 .setColor("#A62019")
                 .setDescription(`Are you sure you entered a correct number? \nExecute -steam and enter your Steam Link.\nYou have to find your SteamId64 765611 .... and then, use it with the command \`-uid 765611.....\` to return the hash.`)
            } finally {message.channel.send(siEnviarEmbed)}
    }
}