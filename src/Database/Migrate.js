import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getEnvironment from '../Configs/EnvironmentSelector.js';
import { getPool, query, closePool } from './PgPool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Obtiene la ruta absoluta al directorio del proyecto.
 * @returns {string} Ruta al root del proyecto.
 */
function getProjectRoot() {
  return path.resolve(__dirname, '../../');
}

/**
 * Lista y ordena los archivos .sql en el directorio de migraciones.
 * @param {string} migrationsDir - Ruta al directorio de migraciones.
 * @returns {string[]} Lista ordenada de rutas de archivo .sql.
 */
function listSqlFiles(migrationsDir) {
  if (!fs.existsSync(migrationsDir)) {
    throw new Error(`No existe el directorio de migraciones: ${migrationsDir}`);
  }
  const files = fs.readdirSync(migrationsDir)
    .filter((f) => f.toLowerCase().endsWith('.sql'))
    .sort((a, b) => a.localeCompare(b));
  return files.map((f) => path.join(migrationsDir, f));
}

/**
 * Aplica cada archivo SQL dentro de una transacción individual.
 * Muestra progreso por consola.
 * @param {string[]} sqlFiles - Rutas de archivos SQL a ejecutar.
 * @returns {Promise<void>} Promesa cuando todas las migraciones han sido aplicadas.
 */
async function applyMigrations(sqlFiles) {
  const pool = getPool();
  for (const filePath of sqlFiles) {
    const sql = fs.readFileSync(filePath, 'utf8');
    console.log(`Aplicando migración: ${path.basename(filePath)}`);
    await query('BEGIN');
    try {
      await query(sql);
      await query('COMMIT');
      console.log(`OK: ${path.basename(filePath)}`);
    } catch (err) {
      await query('ROLLBACK');
      console.error(`ERROR: ${path.basename(filePath)} -> ${err.message}`);
      throw err;
    }
  }
}

/**
 * Punto de entrada: carga entorno, lista migraciones y las aplica.
 * Finaliza el pool al terminar.
 */
async function main() {
  getEnvironment();
  const projectRoot = getProjectRoot();
  const migrationsDir = path.join(projectRoot, 'db', 'migrations');
  const files = listSqlFiles(migrationsDir);
  await applyMigrations(files);
  await closePool();
}

// Ejecutar si es llamado directamente
main().catch((err) => {
  console.error('Falló la migración:', err);
  process.exitCode = 1;
});