const armaSchema = require('../database/models/setArmaServer');

class ArmaDao {

    static async save(message, ip, puerto) {
        const newData = new armaSchema({
            Arma3Ip: ip,
            ArmaPort: puerto,
            GuildID: message.author.id,
        })
        await newData.save();
    };

    static async setServer(message) {
        return await armaSchema.findOneAndRemove({ GuildID: message.author.id });
    };

    static async getServer(message) {
        const query = await armaSchema.findOne({ GuildID: message.author.id });
        return query;
    };
}

module.exports = { ArmaDao };