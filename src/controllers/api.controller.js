const { guidService, uidService } = require('../services/api.services');

const guidController = (req, res) => {
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

    return guidService(argumentos);

}

const uidController = (req, res) => {
    if (!req.query.steam) {
        return res.json({
            api: "/api/uid?steam=your-steam-id-64-here",
            message: "Enter the query parameters",
            typeof: "Error"
        })
    }
    
    let argumentos = req.query.steam;
    return uidService(argumentos);
}

module.exports = {
    guidController,
    uidController
}