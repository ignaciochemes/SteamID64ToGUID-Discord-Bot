import { Pool } from 'pg';

let pool;

/**
 * Obtiene una instancia única de Pool de Postgres.
 * Lee configuración desde `PG_URI` o variables `PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE`.
 * Soporta SSL si `PG_SSL` está en `true|1|yes`.
 * @returns {Pool} Pool de conexiones a Postgres.
 */
export function getPool() {
  if (!pool) {
    const sslEnabled = ['true', '1', 'yes'].includes(String(process.env.PG_SSL || '').toLowerCase());
    const ssl = sslEnabled ? { rejectUnauthorized: false } : undefined;

    const connectionString = process.env.PG_URI || process.env.DATABASE_URL;
    if (connectionString) {
      pool = new Pool({ connectionString, ssl });
    } else {
      pool = new Pool({
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT || 5432),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl,
      });
    }
  }
  return pool;
}

/**
 * Ejecuta una consulta SQL parametrizada contra Postgres.
 * @param {string} text - SQL con placeholders $1, $2, ...
 * @param {any[]} [params] - Valores para los placeholders.
 * @returns {Promise<import('pg').QueryResult>} Resultado de la consulta.
 */
export async function query(text, params = []) {
  const p = getPool();
  return p.query(text, params);
}

/**
 * Cierra el Pool de Postgres si está inicializado.
 * Útil para scripts de migración/seed.
 * @returns {Promise<void>} Promesa cuando el pool se ha cerrado.
 */
export async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}