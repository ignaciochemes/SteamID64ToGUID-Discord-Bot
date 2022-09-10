const dayzSchema = require('../Database/Models/setDayzServer');

class DayzDao {

    static async save(message, ip, puerto) {
        const newData = new dayzSchema({
            DayzIp: ip,
            DayzPort: puerto,
            GuildID: message.author.id,
        })
        await newData.save();
    };

    static async setServer(message) {
        await dayzSchema.findOneAndRemove({ GuildID: message.author.id });
    };

    static async getServer(message) {
        const query = await dayzSchema.findOne({ GuildID: message.author.id });
        return query;
    }
}

module.exports = { DayzDao };