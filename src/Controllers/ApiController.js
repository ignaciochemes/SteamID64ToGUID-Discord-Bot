import FormaterResponse from "../Models/Response/FormaterResponse.js";
import { ApiService } from "../services/ApiService.js";

/**
 * Controlador de API: maneja endpoints GUID y UID.
 */
export class ApiController {

    static async guidController(req, res) {
        const response = await ApiService.obtainGuid(req);
        return res.json(new FormaterResponse(response));
    }

    static uidController(req, res) {
        const response = ApiService.uidService(req);
        return res.json(new FormaterResponse(response));
    }

}
