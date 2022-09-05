const { PrefixDao } = require("../daos/prefix.dao");

class PrefixController {
    constructor() {}

    static async getPrefix(message) {
        let response = await PrefixDao.getPrefixDao(message);
        return response;
    }
}

module.exports = { PrefixController };