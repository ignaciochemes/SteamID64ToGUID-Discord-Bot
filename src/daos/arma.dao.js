const armaSchema = require('../database/models/setArmaServer');

class ArmaDao {
    constructor(){}
    static async armaDao(message, ip, puerto) {
        let newData = new armaSchema({
            armaIp: ip,
            armaPort: puerto,
            guildId: message.author.id,
        })
        await newData.save();
    };

    static async setArmaDao(message) {
        await armaSchema.findOneAndRemove({ guildId: message.author.id });
    };

    static async getArmaDao(message) {
        await armaSchema.findOne({ guildId: message.author.id });
    };
}

module.exports = { ArmaDao };