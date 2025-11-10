import FormaterResponse from "../Models/Response/FormaterResponse.js";

/**
 * Controlador de Health Check.
 */
export class HealthCheckController {

    static async healthCheck(req, res) {
        const response = { status: "OK", message: "Server is running" };
        return res.json(new FormaterResponse(response));
    }

}
