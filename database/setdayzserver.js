const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    DayzIp: {
        type: String
    },
    GuildID: String
});

const MessageModel = module.exports = mongoose.model('dayzip', PrefixSchema);