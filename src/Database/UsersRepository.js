import { query } from './PgPool.js';

/**
 * Busca un usuario por su `discord_user_id` y lo crea si no existe.
 * Retorna el `id` interno de la tabla `users`.
 * @param {string} discordUserId - Snowflake del usuario en Discord.
 * @returns {Promise<number>} ID del usuario en Postgres.
 */
export async function findOrCreateUserByDiscordId(discordUserId) {
  // Intentar encontrar el usuario existente
  const existing = await query('SELECT id FROM users WHERE discord_user_id = $1', [discordUserId]);
  if (existing.rows.length > 0) {
    return Number(existing.rows[0].id);
  }
  // Crear si no existe
  const inserted = await query(
    'INSERT INTO users (discord_user_id) VALUES ($1) RETURNING id',
    [discordUserId]
  );
  return Number(inserted.rows[0].id);
}