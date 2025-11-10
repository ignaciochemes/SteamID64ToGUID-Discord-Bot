import { upsertUserServerByDiscordId, getUserServerByDiscordId, deleteUserServerByDiscordId } from '../Database/UserServersRepository.js';

class ArmaDao {

    /**
     * Guarda o actualiza el servidor de Arma3 para el usuario (Discord).
     * @param {import('discord.js').Message} message - Mensaje de Discord.
     * @param {string} ip - IP/host del servidor.
     * @param {number|string} puerto - Puerto de consulta.
     * @returns {Promise<{id:number, host:string, query_port:number, game_key:string}>} Fila persistida.
     */
    static async save(message, ip, puerto) {
        const discordId = message.author.id;
        return await upsertUserServerByDiscordId(discordId, 'arma3', ip, Number(puerto));
    };

    /**
     * Elimina el servidor configurado de Arma3 para el usuario.
     * @param {import('discord.js').Message} message - Mensaje de Discord.
     * @returns {Promise<number>} Cantidad de filas eliminadas.
     */
    static async setServer(message) {
        const discordId = message.author.id;
        return await deleteUserServerByDiscordId(discordId, 'arma3');
    };

    /**
     * Obtiene el servidor configurado de Arma3 para el usuario.
     * @param {import('discord.js').Message} message - Mensaje de Discord.
     * @returns {Promise<{id:number, host:string, query_port:number, game_key:string} | null>} Fila encontrada o null.
     */
    static async getServer(message) {
        const discordId = message.author.id;
        return await getUserServerByDiscordId(discordId, 'arma3');
    };
}

export default ArmaDao;
