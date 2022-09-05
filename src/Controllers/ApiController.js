const { FormaterResponse } = require("../Models/Response/FormaterResponse");
const { ApiService } = require("../services/ApiService");

class ApiController {

    static async guidController(req, res) {
        const response = await ApiService.obtainGuid(req);
        return res.json(new FormaterResponse(response));
    }

    static uidController(req, res) {
        const response = ApiService.uidService(req);
        return res.json(new FormaterResponse(response));
    }

}

module.exports = { ApiController };