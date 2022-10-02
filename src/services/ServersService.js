const GD = require('gamedig');
const { GameList } = require('../Constants/GameListConstants');
const { HttpConstants } = require('../Constants/HttpConstants');
const { ErrorResponse } = require('../Models/Response/ErrorResponse');

class ServersService {

    static async getServerInfo(req) {
        const query = req.query;
        if (!query?.game) return new ErrorResponse(HttpConstants.BAD_REQUEST, "Enter game query parameter", "/api/servers?game=arma3");
        if (!query?.host) return new ErrorResponse(HttpConstants.BAD_REQUEST, "Enter host query parameter", "/api/servers/game=arma3?host=your-ip-here");
        let game = Object.values(GameList);
        let findGame;
        for (const g of game) {
            const find = Object.keys(g).find(key => key === query.game);
            if (find !== undefined) {
                findGame = g[find];
                break;
            }
        }
        if (!game || !findGame) return new ErrorResponse(HttpConstants.BAD_REQUEST, "Game or Service not found", "/api/servers?game=dayz");
        try {
            const ping = await GD.query({
                type: query.game.toLowerCase(),
                host: query.host,
                port: query?.port ? query.port : 2302
            });
            return ping;
        } catch (e) {
            return new ErrorResponse(HttpConstants.BAD_REQUEST, "Error to fetch the server");
        }
    }

    static async getGamesList() {
        const games = GameList;
        return games;
    }
}

module.exports = { ServersService };