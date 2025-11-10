import getEnvironment from '../Configs/EnvironmentSelector.js';
import { query, closePool } from './PgPool.js';
import { GameList } from '../Constants/GameListConstants.js';

/**
 * Inserta/actualiza la tabla `games` usando los valores de GameList.
 * Usa UPSERT sobre la clave primaria `key`.
 * @returns {Promise<void>} Promesa cuando el seed ha finalizado.
 */
export async function seedGames() {
  await query('BEGIN');
  try {
    const entries = Object.entries(GameList.games);
    for (const [key, displayName] of entries) {
      await query(
        `INSERT INTO games (key, display_name)
         VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET display_name = EXCLUDED.display_name`,
        [key, displayName]
      );
    }
    await query('COMMIT');
    console.log(`Seed de games OK: ${entries.length} entradas`);
  } catch (err) {
    await query('ROLLBACK');
    console.error('Seed de games falló:', err.message);
    throw err;
  }
}

/**
 * Entry point: carga entorno y ejecuta seed.
 */
async function main() {
  getEnvironment();
  await seedGames();
  await closePool();
}

// Ejecutar si es llamado directamente
main().catch((err) => {
  console.error('Falló seed de games:', err);
  process.exitCode = 1;
});