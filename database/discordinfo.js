const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    Servers: {
        type: String
    },
    Users: {
        type: String
    },
    Channels: {
        type: String
    }
});

const discordInfo = module.exports = mongoose.model('discordinfo', PrefixSchema);