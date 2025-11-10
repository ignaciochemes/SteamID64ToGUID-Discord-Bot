import { query } from './PgPool.js';
import { findOrCreateUserByDiscordId } from './UsersRepository.js';

/**
 * Inserta o actualiza el servidor del usuario para un juego (upsert).
 * Usa clave única `(user_id, game_key)`.
 * @param {string} discordUserId - Snowflake del usuario de Discord.
 * @param {string} gameKey - Clave de juego (ej.: 'arma3', 'dayz').
 * @param {string} host - IP/host del servidor.
 * @param {number} queryPort - Puerto de consulta (por defecto 2302).
 * @returns {Promise<{id:number, host:string, query_port:number, game_key:string}>} Fila persistida.
 */
export async function upsertUserServerByDiscordId(discordUserId, gameKey, host, queryPort = 2302) {
  const userId = await findOrCreateUserByDiscordId(discordUserId);
  const res = await query(
    `INSERT INTO user_servers (user_id, game_key, host, query_port, updated_at)
     VALUES ($1, $2, $3, $4, now())
     ON CONFLICT (user_id, game_key)
       DO UPDATE SET host = EXCLUDED.host, query_port = EXCLUDED.query_port, updated_at = now()
     RETURNING id, host, query_port, game_key`,
    [userId, gameKey, host, Number(queryPort)]
  );
  return res.rows[0];
}

/**
 * Obtiene el servidor configurado por usuario y juego.
 * @param {string} discordUserId - Snowflake del usuario de Discord.
 * @param {string} gameKey - Clave de juego.
 * @returns {Promise<{id:number, host:string, query_port:number, game_key:string} | null>} Fila encontrada o null.
 */
export async function getUserServerByDiscordId(discordUserId, gameKey) {
  const res = await query(
    `SELECT us.id, us.host, us.query_port, us.game_key
     FROM user_servers us
     JOIN users u ON u.id = us.user_id
     WHERE u.discord_user_id = $1 AND us.game_key = $2`,
    [discordUserId, gameKey]
  );
  return res.rows[0] || null;
}

/**
 * Elimina el servidor configurado por usuario y juego.
 * @param {string} discordUserId - Snowflake del usuario de Discord.
 * @param {string} gameKey - Clave de juego.
 * @returns {Promise<number>} Cantidad de filas afectadas.
 */
export async function deleteUserServerByDiscordId(discordUserId, gameKey) {
  const res = await query(
    `DELETE FROM user_servers us
     USING users u
     WHERE us.user_id = u.id
       AND u.discord_user_id = $1
       AND us.game_key = $2`,
    [discordUserId, gameKey]
  );
  return res.rowCount;
}