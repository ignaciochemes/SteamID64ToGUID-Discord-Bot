const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const { steamapi } = require('./config.json');
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

// WEB TEMPLATE NOT BE FINISHED YET...
//Express const
const express = require('express');
const app = express();
const puerto = 3000;

//Start Express server
app.use(express.static('src'));

app.listen(puerto, () => {
    console.log(`Express listen in port ${puerto}`);
});
//End Express server

//Top.gg - Web data start
// const DBL = require("dblapi.js");
// const dbl = new DBL('Your-top.gg-bot-token', client);

// dbl.on('posted', () => {
//     console.log('Server count posted');
// })

// dbl.on('error', e => {
//     console.log(`Oops! ${e}`);
// })

//End Top.gg - Web data.
//If you dont have Top.gg bot, you can comment/clear top.gg info.
//If you have top.gg discord information, uncomment lines 27 to 36.
//Uncomment line 62.

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

//Config path .env
config({
    path: __dirname + "/.env"
});

//Handler Commands
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

//Start bot iformation
client.on("ready", () => {
    console.log(`Im Online!, My name is ${client.user.username}. Develop by oaki.`);
    setInterval(() => {
        client.user.setActivity(`-help | ${client.guilds.cache.size} Servers`, { type: "LISTENING" });
    //    dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 60000);

});

//Message listen - Async
client.on("message", async message => {
    const prefix = "-";
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

//Bot Login - your discord bot token be there.
client.login(process.env.TOKEN);