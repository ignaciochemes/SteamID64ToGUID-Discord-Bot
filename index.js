const fs = require("fs");
const configjson = require('./config.json');
const { Client, Collection } = require("discord.js");
const prefix = require('./src/database/models/prefix');
const { DatabaseConnection } = require('./src/database/dbConnection');

const client = new Client({
    disableEveryone: true
});

//Conexion a la base de datos MONGODB
DatabaseConnection.getInstance();

//Inicio de servidor web
require('./src/webServer');

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

    console.log(data);
    if(data) {
        const prefix = data.Prefix;
        //const prefix = '!';

        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    } else if (!data) {
        const prefix = configjson.PREFIX;
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    }

});

//BOT LOGIN - YOUR DISCORD BOT BE HERE.
client.login(configjson.TOKEN);

module.exports = client;