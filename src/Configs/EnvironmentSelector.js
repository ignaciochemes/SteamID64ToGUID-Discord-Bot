import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import EnvironmentConstants from '../Constants/EnvironmentConstants.js';

const PROD = EnvironmentConstants.PROD;
const DEV = EnvironmentConstants.DEV;
const LOCAL = EnvironmentConstants.LOCAL;

// Resuelve __dirname en módulos ESM para acceder a archivos .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let envData = {};

/**
 * Determina el entorno activo y carga el archivo .env correspondiente.
 * Retorna nada; establece variables de entorno en process.env.
 */
const getEnvironment = () => {
    switch (process.env.STEAMID_ENV) {
        case PROD:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env') }).parsed;
            console.log('Environment: Production');
            break;
        case DEV:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env.dev') }).parsed;
            console.log('Environment: Development');
            break
        case LOCAL:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env.local') }).parsed;
            console.log('Environment: Local');
            break
        default:
            envData = dotenv.config({ path: path.resolve(__dirname, '../../.env') }).parsed;
    }
};

export default getEnvironment;
