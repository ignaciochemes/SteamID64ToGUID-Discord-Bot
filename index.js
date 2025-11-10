import fs from 'node:fs';
import path from 'node:path';
import { Client, GatewayIntentBits, REST, Collection, Routes, ActivityType } from "discord.js";
import { fileURLToPath, pathToFileURL } from 'node:url';
import getEnvironment from "./src/Configs/EnvironmentSelector.js";
// import { DatabaseConnection } from "./src/Database/DbConnection";
import WebServerModule from './src/WebServer.js';
// import { default as AutoPoster } from 'topgg-autoposter';
// import raw from './config.json' assert { type: 'json' };
// const config = raw;

// Resuelve __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

getEnvironment();
// if (config.database.active === true) {
//     DatabaseConnection.getInstance();
// }
// Arranque opcional del servidor HTTP según variable de entorno.
if (process.env.API_ACTIVE === 'true') {
    new WebServerModule.WebServer().listen();
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, './src/Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = [];

/**
 * Carga dinámicamente los comandos desde la carpeta ./src/Commands en ESM.
 */
async function loadCommands() {
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const module = await import(pathToFileURL(filePath).href);
        const command = module.default;
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }
}

// Registro de comandos vía REST (ejecuta tras cargar comandos)

// setInterval(async () => {
//     if (process.env.STEAMID_ENV === 'production') {
//         const ap = AutoPoster(process.env.DBL_TOKEN, client);
//         ap.on('posted', () => {
//             console.log('Server count posted!');
//         })
//     }
// }, 3600000);

(async () => {
    try {
        await loadCommands();
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
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
    /**
     * Maneja interacciones de comandos (slash) de Discord.
     * Si ocurre un error, responde de forma segura usando `reply` o `followUp`
     * según si la interacción ya fue reconocida (deferred/replied) para evitar
     * el error "Interaction has already been acknowledged".
     * Usa `flags: 64` para respuestas efímeras (deprecado `ephemeral`).
     * @param {import('discord.js').Interaction} interaction - Interacción entrante.
     */
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const errorPayload = { content: 'There was an error while executing this command!', flags: 64 };
        try {
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp(errorPayload);
            } else {
                await interaction.reply(errorPayload);
            }
        } catch (e) {
            // Evita que el proceso se caiga si no puede responder
            console.error('Failed to send error response for interaction:', e);
        }
    }
});

client.login(process.env.TOKEN);