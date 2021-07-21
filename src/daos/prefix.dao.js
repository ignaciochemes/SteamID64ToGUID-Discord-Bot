const prefixModel = require('../database/models/prefix');

class PrefixDao {
    constructor(){}

    static async prefixDao(prefix, message) {
        let newData = new prefixModel({
            Prefix: prefix,
            GuildID: message.guildId
        })
        await newData.save();
    };
    
    static async setPrefixDao(message) {
        await prefixModel.findOneAndRemove({ GuildID: message.guildId });
    }
    
    static async getPrefixDao(message) {
        let res = await prefixModel.findOne({ GuildID: message.guildId });
        return res;
    }
}


module.exports = { PrefixDao }