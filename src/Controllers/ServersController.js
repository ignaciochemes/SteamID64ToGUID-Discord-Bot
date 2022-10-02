const { FormaterResponse } = require("../Models/Response/FormaterResponse");
const { ServersService } = require("../services/ServersService");

class ServersController {

    static async getServerInfo(req, res) {
        const response = await ServersService.getServerInfo(req);
        return res.json(new FormaterResponse(response));
    }

    static async getGamesList(req, res) {
        const response = await ServersService.getGamesList();
        return res.json(new FormaterResponse(response));
    }
}

module.exports = { ServersController };