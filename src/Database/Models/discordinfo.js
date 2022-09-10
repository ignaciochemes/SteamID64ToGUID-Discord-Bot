const { model, Schema } = require('mongoose');

const discordInfoSchema = new Schema({
    Servers: { type: String },
    Users: { type: String },
    Channels: { type: String }
});

module.exports = model('discordinfo', discordInfoSchema);