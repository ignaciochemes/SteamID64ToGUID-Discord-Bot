const { createHash } = require('crypto');
const { HttpConstants } = require('../Constants/HttpConstants');
const { GeneralConstants } = require('../Constants/GeneralConstants');
const { ErrorResponse } = require('../Models/Response/ErrorResponse');
const { ObtainGuidResponse } = require('../Models/Response/ObtainGuidResponse');
const { ObtainUidResponse } = require('../Models/Response/ObtainUidResponse');

class ApiService {

    static async obtainGuid(req) {
        if (!req.query.steam) return new ErrorResponse(HttpConstants.BAD_REQUEST, "Enter the query parameters", "/api/guid?steam=your-steam-id-64-here");
        if (req.query.steam.length != 17) return new ErrorResponse(HttpConstants.BAD_REQUEST, "Argument must be 17 characters");
        let bytes = [];
        try {
            for (let i = 0; i < 8; i++) {
                bytes.push(Number((BigInt(req.query.steam) >> (8n * BigInt(i))) & 0xFFn))
            }
            let guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
            bytes = [];
            const response = new ObtainGuidResponse(guid, req.query.steam);
            return response;
        } catch (e) {
            return new ErrorResponse(HttpConstants.INTERNAL_SERVER_ERROR, "Fatal Error");
        }
    }

    static uidService(req) {
        if (!req.query.steam) return new ErrorResponse(HttpConstants.BAD_REQUEST, "Enter the query parameters", "/api/uid?steam=your-steam-id-64-here");
        if (req.query.steam.length != 17) return new ErrorResponse(HttpConstants.BAD_REQUEST, "Argument must be 17 characters");
        try {
            let pwdToBase64 = createHash('sha256').update(req.query.steam).digest('base64');
            let pwdReplace = pwdToBase64.replace(GeneralConstants.MAS_REGEX, GeneralConstants.GUION);
            let pwdFinally = pwdReplace.replace(GeneralConstants.BARRA_REGEX, GeneralConstants.GUION_BAJO);
            const response = new ObtainUidResponse(pwdFinally, pwdToBase64, req.query.steam);
            return response;
        } catch (e) {
            return new ErrorResponse(HttpConstants.INTERNAL_SERVER_ERROR, "Fatal Error");
        }
    }
}

module.exports = { ApiService }