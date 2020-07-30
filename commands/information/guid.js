const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { createHash } = require("crypto");

let bytes = [];
module.exports = {
    usage: "-guid",
    name: "guid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to MD5 hash GUID)",
    run: async(client, message, args) => {
        let tmp = message.content.split(" ");
        let siEnviarEmbed = new Discord.MessageEmbed();
            try { 
                for (let i = 0; i < 8; i++) {
                    bytes.push(Number((BigInt(tmp[1]) >> (8n * BigInt(i))) & 0xFFn));
                }
                let guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
                bytes = [];
                
                siEnviarEmbed.setTitle(`Your GUID encryption is`)
                    .setColor("#F8C300")
                    .setDescription(`${guid}`)
                    .setThumbnail('https://i.imgur.com/NGQMjSA.jpg');
            } catch(e)
            {
                 console.warn(`Error al convertir GUID - Err `);
                 siEnviarEmbed.setTitle(`Error converting`)
                 .setColor("#A62019")
                 .setDescription(`Are you sure you entered a correct number? \nGo to this page https://steamid.io/ and enter your Steam Link. \nYou have to find your SteamId64 765611 .... and then, use it with the command \`-guid 765611.....\` to return the hash.`)
                 .setThumbnail('https://i.imgur.com/NGQMjSA.jpg');
            } finally {message.channel.send(siEnviarEmbed)}
    }
}