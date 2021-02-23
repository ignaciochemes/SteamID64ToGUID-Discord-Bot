const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const crypto = require("crypto");
const uidAlmacenamiento = require('../../database/uidalmacenamiento');
const generalAlmacenamiento = require('../../database/generalAlmacenamiento');

module.exports = {
    usage: "-uid",
    name: "uid",
    category: "information",
    description: "Returns the Hash request (Steam Id 64 to base64 hash UID)",
    run: async(client, message, args) => {

        let pepe = await uidAlmacenamiento.aggregate([{$group:{_id:"$name", Total:{$sum:1}}}]);

        let newDataGeneral = new generalAlmacenamiento({
            comando: "uid",
            user: message.author.id,
            name: "comandos",
        });
        newDataGeneral.save()
        

        let pwd = `${args}`;
        let siEnviarEmbed = new Discord.MessageEmbed();
        if (!args[0]) return message.reply(`Insert account id64 | -uid <your id64 here> | -uid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`)
            .then(msg => {
                msg.delete({ timeout: 25000 })
            });
        if (`${pwd.length}` != 17) return message.reply(`The entered arguments are wrong or not complete. Please check the data. \nIf you have any questions, just enter the uid comman. | -uid <your id64 here> | -uid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`)
            .then(msg => {
                msg.delete({ timeout: 25000 })
            });
        try {
            const mas = /\+/g;
            const guion = '-';
            const barra = /\//g;
            const guionBajo = '_';
            let hash = crypto.createHash('sha256').update(pwd).digest('base64');
            let tomaHash = hash.replace(mas, guion);
            let reemplazaHash = tomaHash.replace(barra, guionBajo);

            let newData = new uidAlmacenamiento({
                uid: reemplazaHash,
                user: message.author.id,
                name: "uid",
                numero: pepe[0].Total,
            });
            console.log(newData);
            newData.save();

            console.log(`Conversion de Guid exitosa`);
            siEnviarEmbed.setDescription("<@" + message.author.id + ">" + "    " + `Global UIDS converted: \`${pepe[0].Total}\``)
                .addField('Your UID encryption is:', `✅ Works: \`${reemplazaHash}\` \n\n⁉️ Test: \`${hash}\``, true)
                .setColor("#F8C300")
                .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`)
        } catch (e) {
            console.log(`Error al convertir UID ${e}`);
            siEnviarEmbed.setTitle(`Error converting`)
                .setColor("#A62019")
                .setDescription(`Are you sure you entered a correct number? \nExecute -steam and enter your Steam Link.\nYou have to find your SteamId64 765611 .... and then, use it with the command \`-uid 765611.....\` to return the hash.`)
        } finally { message.channel.send(siEnviarEmbed) }
    }
}