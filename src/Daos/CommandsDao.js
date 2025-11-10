import { query } from '../Database/PgPool.js';
import { findOrCreateUserByDiscordId } from '../Database/UsersRepository.js';

export class GeneralDao {

    /**
     * Registra la ejecución de un comando en `commands_log` y retorna un agregado simple.
     * El agregado retorna el total global en formato similar a Mongoose aggregate.
     * @param {string} commandName - Nombre del comando ejecutado.
     * @param {string} userDiscordId - Snowflake del usuario en Discord.
     * @param {string} commandType - Tipo de comando (para compatibilidad con el retorno).
     * @returns {Promise<Array<{_id: string, Total: number}>>} Agregado con total global.
     */
    static async generalStoreDao(commandName, userDiscordId, commandType) {
        const userId = await findOrCreateUserByDiscordId(userDiscordId);
        await query(
            'INSERT INTO commands_log (user_id, command_name) VALUES ($1, $2)',
            [userId, commandName]
        );
        const totalRes = await query('SELECT COUNT(*) AS total FROM commands_log');
        const total = Number(totalRes.rows[0].total);
        return [{ _id: commandType, Total: total }];
    };

    /**
     * Guarda una conversión de UID en `uid_conversions` con referencia al usuario.
     * @param {string} uid - UID calculado (CFTools/Bohemia).
     * @param {string} userDiscordId - Snowflake del usuario en Discord.
     * @param {number} aggregate - Contador global (no usado en Postgres, se mantiene por compatibilidad).
     * @param {string} steamId64 - SteamId64 original utilizado para la conversión.
     * @returns {Promise<void>} Nada.
     */
    static async uidStoreDao(uid, userDiscordId, aggregate, steamId64) {
        const userId = await findOrCreateUserByDiscordId(userDiscordId);
        // Usamos el mismo valor para cftools_uid y bohemia_uid hasta separar fuentes.
        await query(
            'INSERT INTO uid_conversions (user_id, steam_id64, cftools_uid, bohemia_uid) VALUES ($1, $2, $3, $4)',
            [userId, steamId64, uid, uid]
        );
    }

    /**
     * Guarda una conversión de GUID en `guid_conversions` con referencia al usuario.
     * @param {string} guid - GUID calculado (md5 a partir de SteamId64).
     * @param {string} userDiscordId - Snowflake del usuario en Discord.
     * @param {number} aggregate - Contador global (no usado en Postgres, se mantiene por compatibilidad).
     * @param {string} steamId64 - SteamId64 original utilizado para la conversión.
     * @returns {Promise<void>} Nada.
     */
    static async guidStoreDao(guid, userDiscordId, aggregate, steamId64) {
        const userId = await findOrCreateUserByDiscordId(userDiscordId);
        await query(
            'INSERT INTO guid_conversions (user_id, steam_id64, guid) VALUES ($1, $2, $3)',
            [userId, steamId64, guid]
        );
    }
}
