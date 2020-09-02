const axios = require('axios');
const { steamapi } = require('./config.json');
const { Client, Collection, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

//START EXPRESS WEB SERVER - app.js
// 1- If you want the web template, just uncomment the following line.
// 2- Also, you have to go to botinfo.js and uncomment on all the lines that are from mysql.
// 3- Line 6 and from 30 to 40.
//const app = require('./app');

//START DATABASE - database.js
// 1- If you want the web template, just uncomment the following line.
//const database = require('./database');


//TOP.GG - START SEND DATA FROM API
// const DBL = require("dblapi.js");
// const dbl = new DBL('Your-top.gg-bot-token', client);

// dbl.on('posted', () => {
//     console.log('Server count posted');
// });

// dbl.on('error', e => {
//     console.log(`Oops! ${e}`);
// });

//END TOP.GG WEB DATA
// 1- If you dont have Top.gg bot, you can comment/clear top.gg info.
// 2- If you have top.gg discord information, uncomment lines 23 to 32.
// 3- Uncomment line 58.

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

//CONFIG PATH .ENV
config({
    path: __dirname + "/.env"
});

//HANDLER COMANDS
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

//START BOT INFORMATION
client.on("ready", () => {
    console.log(`Im Online!, My name is ${client.user.username}. Develop by oaki.`);
    setInterval(() => {
        client.user.setActivity(`-help | ${client.guilds.cache.size} Servers`, { type: "LISTENING" });
    //    dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 60000);

});

//MESSAGE LISTENER - ASYNC
client.on("message", async message => {
    const prefix = process.env.PREFIX;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.lenght === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);

});

//BOT LOGIN - YOUR DISCORD BOT BE HERE.
client.login(process.env.TOKEN);