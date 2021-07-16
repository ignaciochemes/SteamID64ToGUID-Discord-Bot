const { model, Schema } = require('mongoose');

const dayzSchema = new Schema({
    DayzIp: { type: String },
	DayzPort: { type: String },
    GuildID: {type: String}
});

module.exports = model('dayzIp', dayzSchema);