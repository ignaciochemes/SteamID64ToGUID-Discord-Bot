const prefixModel = require('../database/models/prefix');

class PrefixDao {
    constructor(){}

    static async prefixDao(prefix, message) {
        let newData = new prefixModel({
            Prefix: prefix,
            GuildID: message.guild.id
        })
        await newData.save();
    };
    
    static async setPrefixDao(message) {
        await prefixModel.findOneAndRemove({ GuildID: message.guild.id });
    }
    
    static async getPrefixDao(message) {
        let res = await prefixModel.findOne({ GuildID: message.guild.id });
        return res;
    }
}


module.exports = { PrefixDao }