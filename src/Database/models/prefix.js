const { model, Schema } = require('mongoose');

const prefixSchema = new Schema({
    Prefix: { type: String },
    GuildID: { type: String },
});

module.exports = model('prefixes', prefixSchema);