const { FormaterResponse } = require("../Models/Response/FormaterResponse");

class HealthCheckController {

    static async healthCheck(req, res) {
        const response = { status: "OK", message: "Server is running" };
        return res.json(new FormaterResponse(response));
    }

}

module.exports = { HealthCheckController };