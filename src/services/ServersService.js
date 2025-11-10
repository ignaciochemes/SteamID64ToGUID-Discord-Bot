import * as GD from 'gamedig';
import { GameList } from '../Constants/GameListConstants.js';
import { HttpConstants } from '../Constants/HttpConstants.js';
import ErrorResponse from '../Models/Response/ErrorResponse.js';
import { getUserServerByDiscordId, upsertUserServerByDiscordId, deleteUserServerByDiscordId } from '../Database/UserServersRepository.js';

/**
 * Servicio de servidores: consulta y lista juegos/servicios.
 */
class ServersService {

    /**
     * Consulta información del servidor vía `gamedig`.
     * Parámetros de query:
     * - `game` (requerido): clave del juego, ej. `arma3`, `dayz`.
     * - `host` (opcional): IP/host del servidor; si no se provee y existe
     *   `discord_user_id`, se buscará el servidor guardado del usuario.
     * - `port` (opcional): puerto de consulta; por defecto `2302`.
     * - `discord_user_id` (opcional): Snowflake del usuario de Discord para recuperar servidor guardado.
     * Devuelve objeto de `gamedig` o `ErrorResponse`.
     * @param {import('express').Request} req - Request de Express con query.
     * @returns {Promise<any>} Respuesta con info del servidor o error formateado.
     */
    static async getServerInfo(req) {
        const query = req.query;
        const gameParam = query?.game;
        const hostParam = query?.host;
        const portParam = query?.port;
        const discordUserId = query?.discord_user_id;

        if (!gameParam) {
            return new ErrorResponse(
                HttpConstants.BAD_REQUEST,
                "Enter game query parameter",
                "/api/servers?game=arma3"
            );
        }

        // Validar que el juego exista en GameList
        let gameListValues = Object.values(GameList);
        let findGame;
        for (const g of gameListValues) {
            const find = Object.keys(g).find(key => key === gameParam);
            if (find !== undefined) {
                findGame = g[find];
                break;
            }
        }
        if (!gameListValues || !findGame) {
            return new ErrorResponse(
                HttpConstants.BAD_REQUEST,
                "Game or Service not found",
                "/api/servers?game=dayz"
            );
        }

        // Resolver host y puerto: primero por query explícito; si falta y hay discord_user_id, buscar guardado
        let resolvedHost = hostParam;
        let resolvedPort = portParam ? Number(portParam) : 2302;

        if (!resolvedHost && discordUserId) {
            const saved = await getUserServerByDiscordId(discordUserId, gameParam);
            if (saved) {
                resolvedHost = saved.host;
                resolvedPort = saved.query_port ?? resolvedPort;
            } else {
                return new ErrorResponse(
                    HttpConstants.BAD_REQUEST,
                    "No saved server found for user and game",
                    `/api/servers?game=${gameParam}&discord_user_id=${discordUserId}`
                );
            }
        }

        if (!resolvedHost) {
            return new ErrorResponse(
                HttpConstants.BAD_REQUEST,
                "Enter host query parameter or provide discord_user_id",
                `/api/servers?game=${gameParam}&host=your-ip-here`
            );
        }

        try {
            const ping = await GD.query({
                type: gameParam.toLowerCase(),
                host: resolvedHost,
                port: resolvedPort
            });
            return ping;
        } catch (e) {
            return new ErrorResponse(HttpConstants.BAD_REQUEST, "Error to fetch the server");
        }
    }

    /**
     * Retorna listado de juegos/servicios soportados.
     */
    static async getGamesList() {
        const games = GameList;
        return games;
    }

    /**
     * Crea o actualiza el servidor guardado para un usuario y juego.
     * Body requerido: `discord_user_id`, `game`, `host`; opcional `port`.
     * @param {import('express').Request} req - Request de Express con body.
     * @returns {Promise<any>} Fila persistida o ErrorResponse.
     */
    static async setUserServer(req) {
        const body = req.body || {};
        const discordUserId = body.discord_user_id;
        const gameKey = body.game;
        const host = body.host;
        const port = body?.port ? Number(body.port) : 2302;

        if (!discordUserId || !gameKey || !host) {
            return new ErrorResponse(
                HttpConstants.BAD_REQUEST,
                "Missing required fields",
                "Body must include discord_user_id, game and host"
            );
        }

        try {
            const saved = await upsertUserServerByDiscordId(discordUserId, gameKey, host, port);
            return saved;
        } catch (e) {
            return new ErrorResponse(HttpConstants.INTERNAL_SERVER_ERROR, "Error saving user server");
        }
    }

    /**
     * Obtiene el servidor guardado para un usuario y juego.
     * Query requerido: `discord_user_id`, `game`.
     * @param {import('express').Request} req - Request de Express con query.
     * @returns {Promise<any>} Fila encontrada o ErrorResponse.
     */
    static async getUserServer(req) {
        const query = req.query || {};
        const discordUserId = query.discord_user_id;
        const gameKey = query.game;

        if (!discordUserId || !gameKey) {
            return new ErrorResponse(
                HttpConstants.BAD_REQUEST,
                "Missing required query",
                "Provide discord_user_id and game"
            );
        }

        try {
            const saved = await getUserServerByDiscordId(discordUserId, gameKey);
            if (!saved) {
                return new ErrorResponse(HttpConstants.NOT_FOUND, "No saved server found");
            }
            return saved;
        } catch (e) {
            return new ErrorResponse(HttpConstants.INTERNAL_SERVER_ERROR, "Error fetching user server");
        }
    }

    /**
     * Elimina el servidor guardado para un usuario y juego.
     * Query requerido: `discord_user_id`, `game`.
     * @param {import('express').Request} req - Request de Express con query.
     * @returns {Promise<any>} Resultado con conteo de eliminados o ErrorResponse.
     */
    static async deleteUserServer(req) {
        const query = req.query || {};
        const discordUserId = query.discord_user_id;
        const gameKey = query.game;

        if (!discordUserId || !gameKey) {
            return new ErrorResponse(
                HttpConstants.BAD_REQUEST,
                "Missing required query",
                "Provide discord_user_id and game"
            );
        }

        try {
            const rowCount = await deleteUserServerByDiscordId(discordUserId, gameKey);
            return { deleted: rowCount };
        } catch (e) {
            return new ErrorResponse(HttpConstants.INTERNAL_SERVER_ERROR, "Error deleting user server");
        }
    }
}

export { ServersService };
