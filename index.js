const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, REST, Collection, Routes, ActivityType } = require("discord.js");
const { getEnvironment } = require("./src/Configs/EnvironmentSelector");
const { DatabaseConnection } = require("./src/Database/DbConnection");
const { WebServer } = require('./src/WebServer');

getEnvironment();
DatabaseConnection.getInstance();
new WebServer().listen();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, './src/Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logeado como ${client.user.tag}`);
    let actividades = ['Arma', 'Dayz'], i = 0;
    setInterval(() => { client.user.setActivity(`/help | ${actividades[i++ % actividades.length]}`, { type: ActivityType.Watching }) }, 30000);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);