const armaSchema = require('../database/models/setArmaServer');

class ArmaDao {
    constructor(){}
    static async armaDao(message, ip, puerto) {
        let newData = new armaSchema({
            Arma3Ip: ip,
            ArmaPort: puerto,
            GuildID: message.author.id,
        })
        await newData.save();
    };

    static async setArmaDao(message) {
        return await armaSchema.findOneAndRemove({ GuildID: message.author.id });
    };

    static async getArmaDao(message) {
        let res = await armaSchema.findOne({ GuildID: message.author.id });
        return res;
    };
}

module.exports = { ArmaDao };