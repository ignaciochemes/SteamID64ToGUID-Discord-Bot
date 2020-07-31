const { steamapi } = require('./config.json');
const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

//Top.gg - Web data start
const DBL = require("dblapi.js");
const dbl = new DBL('Your-top.gg-bot-token', client);

dbl.on('posted', () => {
    console.log('Server count posted');
})

dbl.on('error', e => {
    console.log(`Oops! ${e}`);
})

//End Top.gg - Web data
//If you dont have Top.gg bot, you can comment/clear top.gg info
//Line 12 to 22. (index.js) and Line 43 to 45 (index.js)
// Line 43 --- setInterval(() => {... to line 45 --- 1800000);

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Estoy online, mi nombre es ${client.user.username}. Develop by oaki.`);
    client.user.setActivity(`-help | ${client.guilds.cache.size} Servers`, { type: "LISTENING" });
    setInterval(() => {
        dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);

});

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

client.login(process.env.TOKEN);