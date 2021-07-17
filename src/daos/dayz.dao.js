const dayzSchema = require('../database/models/setDayzServer');

class DayzDao {
    constructor(){}
    
    static async dayzDao(message, ip, puerto) {
        let newData = new dayzSchema({
            DayzIp: ip,
            DayzPort: puerto,
            GuildID: message.author.id,
        })
        await newData.save();
    };

    static async setDayzDao(message) {
        await dayzSchema.findOneAndRemove({ GuildID: message.author.id });
    };

    static async getDayzDao(message) {
        let res = await dayzSchema.findOne({ GuildID: message.author.id });
        return res;
    }
}

module.exports = { DayzDao };