import FormaterResponse from "../Models/Response/FormaterResponse.js";
import { ServersService } from "../services/ServersService.js";

/**
 * Controlador de servidores.
 */
export class ServersController {

    static async getServerInfo(req, res) {
        const response = await ServersService.getServerInfo(req);
        return res.json(new FormaterResponse(response));
    }

    static async getGamesList(req, res) {
        const response = await ServersService.getGamesList();
        return res.json(new FormaterResponse(response));
    }

    /**
     * Crea/actualiza servidor del usuario (Discord) para un juego.
     * Body: `{ discord_user_id, game, host, port? }`
     * @param {import('express').Request} req - Request
     * @param {import('express').Response} res - Response
     */
    static async setUserServer(req, res) {
        const response = await ServersService.setUserServer(req);
        return res.json(new FormaterResponse(response));
    }

    /**
     * Obtiene servidor guardado del usuario para un juego.
     * Query: `discord_user_id`, `game`
     * @param {import('express').Request} req - Request
     * @param {import('express').Response} res - Response
     */
    static async getUserServer(req, res) {
        const response = await ServersService.getUserServer(req);
        return res.json(new FormaterResponse(response));
    }

    /**
     * Elimina servidor guardado del usuario para un juego.
     * Query: `discord_user_id`, `game`
     * @param {import('express').Request} req - Request
     * @param {import('express').Response} res - Response
     */
    static async deleteUserServer(req, res) {
        const response = await ServersService.deleteUserServer(req);
        return res.json(new FormaterResponse(response));
    }
}
