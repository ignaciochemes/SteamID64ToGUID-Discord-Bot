const { ApiService } = require('../services/api.services');

class ApiController {
    static _apiService = ApiService;
    constructor(){}

    static guidController(req, res) {
        if (!req.query.steam) {
            return res.json({
                api: "/api/guid?steam=your-steam-id-64-here",
                message: "Enter the query parameters",
                typeof: "Error"
            })
        };
        
        let argumentos = req.query.steam;
        if (argumentos.length != 17) {
            return res.json({
                message: "Argument must be 17 characters",
                typeof: "Error"
            });
        };

        return this._apiService.guidService(argumentos);
    }

    static uidController(req, res) {
        if (!req.query.steam) {
            return res.json({
                api: "/api/uid?steam=your-steam-id-64-here",
                message: "Enter the query parameters",
                typeof: "Error"
            })
        }
        
        let argumentos = req.query.steam;
        return this._apiService.uidService(argumentos);
    }
    
}

module.exports = { ApiController };