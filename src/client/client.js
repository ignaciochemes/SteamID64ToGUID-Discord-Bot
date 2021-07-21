const { join } = require('path');
const { readdirSync } = require('fs');
const configJson = require("../../config.json");
const { Client, Collection } = require("discord.js");
const { PrefixController } = require("../controllers/prefix.controller");

class BotClient {
    static _instancia;
    constructor(){
        this.clientOn();
        //this.getTopGg();
    }

    static getInstance() {
        if(BotClient._instancia) throw new Error('Ya existe una instancia de BotClient');
        BotClient._instancia = new BotClient();
        return BotClient._instancia;
    }

    getTopGg() {
        const DBL = require('dblapi.js');
        const dbl = new DBL('YOUR-DBL-TOKEN-HERE', client);
        dbl.on('posted', () => { console.log('Posted') })
        dbl.on('error', (err) => { console.log(err) })
    }

    clientOn() {
        const client = new Client({ 
            disableEveryone: true
        });
        client.commands = new Collection();
        client.aliases = new Collection();
        client.categories = readdirSync(join(__dirname, '../../commands/'));
        ['command'].forEach(handler => { require(`../handler/${handler}`)(client) });
        
        client.on('ready', () => {
            module.exports = { username: client.user.username, users: client.users.cache.size, guilds: client.guilds.cache.size };
            console.log('Bot prendido correctamente con el nombre', client.user.username)
            let actividades = ['id64toguid.tk', 'Dayz', 'Arma'], i = 0;
            setInterval(() => { client.user.setActivity(`-help | ${actividades[i++ % actividades.length]}`, { type: 'WATCHING' }) }, 30000);
            setInterval(() => { dbl.postStats(client.guilds.size, client.shards.total)}, 18000000);
        });
        
        client.on('message', async(message) => {
            let data = { guildId: message.guild.id }
            const prefixData = await PrefixController.getPrefix(data);
            let prefix;
            prefixData.Prefix ? prefix = prefixData.Prefix : prefix = configJson.PREFIX;
            if(message.author.bot) return;
            const messageArray = message.content.split(' ');
            const cmd = messageArray[0];
            const args = messageArray.slice(1);
            if(!message.content.startsWith(prefix)) return;
            const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
            commandfile.run(client, message, args);
        });

        client.login(configJson.TOKEN);
    }
}

module.exports = { BotClient };