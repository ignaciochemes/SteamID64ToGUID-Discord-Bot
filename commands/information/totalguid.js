//NOT FINISH YET

const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const con = require('../../handler/database');
const { query } = require("../../handler/database");
//const resultadoMysql = require('../../handler/resultadoMaxId');

let resultado = [];
module.exports = {
    usage: "-totalguids",
    name: "totalguids",
    category: "informacion",
    description: "Returns the Hash request (Steam Id 64 to MD5 hash GUID)",
    run: async(client, message, args) => {
        let siEnviarEmbed = new Discord.MessageEmbed();
        //let resultadoMysql = [];
        let sql = `SELECT MAX(id) AS popise FROM guids`;
        con.query(sql, function resultadoMysql(err, result) {
            resultadoMysql = result[0].popise;
                console.log(resultadoMysql);
            return resultadoMysql;
            if (err) throw err;
        });
        console.log(resultadoMysql);
        siEnviarEmbed.setDescription("<@" + message.author.id + ">")
            .addField('Total Guids converted:', `Total Guids converted ${resultadoMysql}`)
            .setColor("#F8C300")
            .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | siegmund - oaki`)
    }
}