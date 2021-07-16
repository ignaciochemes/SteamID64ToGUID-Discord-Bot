const OS = require('os');
const os = require('os');
const moment = require('moment');
const { MessageEmbed } = require("discord.js");
const { generalAlmacenamientoDao } = require('../../src/daos/commands.dao');

moment.locale('America/Argentina/Buenos_Aires');

let oldCPUTime = 0
let oldCPUIdle = 0

module.exports = {
    name: 'botinfo',
    category: 'information',
    description: 'Show Bot information.',
    usage: '-botinfo',
    run: async (client, message, args) => {
    let res = await generalAlmacenamientoDao(message);
    console.log("Se utilizo comando BOTINFO");	
    const inline = true;
    const userName = client.user.username;
    const servsize = client.guilds.cache.size;
    const usersize = client.users.cache.size;
    const status = {
      online: '`🟢` Online',
      offline: '`⚫` Offline'
    };

    const embed = new MessageEmbed()
      .setColor("#F8C300")
      .setAuthor(message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".png")
      .addField('**Name**', userName)
      .addField('**My ID**', client.user.id, inline)
      .addField('**Total Servers**', `🛡 ${servsize}`, true)
      .addField('**Total Users**', `${usersize}`, inline)
      .addFields(
        { name: "CPU", value:'```' + `Intel i5 4690k \n3.5 Ghz - 4.2 Ghz` + '```', inline: true },
        { name: "CPU Usage", value:'```' + `Usage: ${getLoad().CPU} % \nAVG Use: ${os.loadavg()} %` + '```', inline: true },
        { name: 'Network', value:'```' + '1 Gbps' + '```', inline: true },
        { name: "Memory", value:'```' + `Total: ${Math.round(OS.totalmem()/1000000)} MB \nFree: ${Math.round(OS.freemem()/1000000)} MB \nUsed: ${Math.round(OS.totalmem()-OS.freemem())/1000000} MB` + '```', inline: true },
        { name: "OS", value:'```' + `This bot run in Win ${os.arch()} exact ${os.type()} \nUptime: ${os.uptime()/1000} Hs` + '```', inline: true },
        { name: "Versions", value:'```' + `Node Version: ${process.versions.node} \nv8: ${process.versions.v8}` + '```', inline: true },
        { name: "Server", value:'```' + `Server is Online! \n Since: ${os.uptime()/1000} Hs \nServer Ubication: Argentina` + '```', inline: true },
        )
	    .setFooter(`2020 © Id64ToGuid | Bohemia Interactive - Battleye | Develop by oaki`)
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        '**Status**',
        `${status[client.user.presence.status]} \n Total Bot Uses: \`${res[0].Total}\``,
        inline,
        true
      )
    }
    message.channel.send(embed);
  },
  
  conf: {},
}

/**
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}
function getLoad(){
    let cpus = OS.cpus()
    let totalTime = -oldCPUTime
    let totalIdle = -oldCPUIdle
    for(let i = 0; i < cpus.length; i++) {
        let cpu = cpus[i]
        for(let type in cpu.times) {
            totalTime += cpu.times[type];
            if(type == "idle"){
                totalIdle += cpu.times[type];
            }
        }
    }

    let CPUload = 100 - Math.round(totalIdle/totalTime*100)
    
    oldCPUTime = totalTime
    oldCPUIdle = totalIdle
    return {
        CPU: CPUload,
        mem: 100 - Math.round(OS.freemem()/OS.totalmem()*100)
    }       
}