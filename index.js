const { Client, Collection, MessageEmbed, Discord } = require("discord.js");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});
const { config } = require("dotenv");

const mongoose = require('mongoose');
const prefix = require('./database/prefix');

//Conexion a la base de datos MONGODB
mongoose.connect('mongodb://localhost:27017/id64toguid', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Inicio de servidor web
require('./src/webserver');


//Top.gg - Web data start
// const DBL = require("dblapi.js");
// const dbl = new DBL('YOUR-DBL-TOKEN-HERE', client);

// dbl.on('posted', () => {
//     console.log('Server count posted');
// })

// dbl.on('error', e => {
//     console.log(`Oops! ${e}`);
// })

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
    module.exports = {
        username: client.user.username,
        users: client.users.cache.size,
        guilds: client.guilds.cache.size
    };
    console.log(`Estoy online, mi nombre es ${client.user.username}`);
	let actividades = [`id64toguid.tk`, `Dayz`, `Arma`], i = 0;
    setInterval(() => client.user.setActivity(`-help | ${actividades[i++ % actividades.length]}`, { type: "WATCHING"}), 20000);  
	setInterval(() => {
        dbl.postStats(client.guilds.size, client.shards.total);
    }, 18000000);
});

//MESSAGE LISTENER - ASYNC
client.on("message", async message => {
    if (message.author.bot) return;
    //const prefix = process.env.PREFIX;
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if(data) {
        //const prefix = data.Prefix;
        const prefix = '!';

        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    } else if (!data) {
        //set the default prefix here
        const prefix = "-";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    }

});

//BOT LOGIN - YOUR DISCORD BOT BE HERE.
client.login(process.env.TOKEN);

module.exports = client;