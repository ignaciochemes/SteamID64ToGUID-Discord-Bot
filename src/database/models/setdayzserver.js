const { model, Schema } = require('mongoose');

const dayzSchema = new Schema({
    dayzIp: { type: String },
	dayzPort: { type: String },
    guildId: {type: String}
});

module.exports = model('dayz', dayzSchema);