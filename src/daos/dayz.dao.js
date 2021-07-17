const dayzSchema = require('../database/models/setDayzServer');

class DayzDao {
    constructor(){}
    
    static async dayzDao(message, ip, puerto) {
        let newData = new dayzSchema({
            dayzIp: ip,
            dayzPort: puerto,
            guildId: message.author.id,
        })
        await newData.save();
    };

    static async setDayzDao(message) {
        await dayzSchema.findOneAndRemove({ GuildID: message.author.id });
    };

    static async getDayzDao(message) {
        await dayzSchema.findOne({ GuildID: message.author.id });
    }
}

module.exports = { DayzDao };