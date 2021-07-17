const { model, Schema } = require('mongoose');

const armaSchema = new Schema({
    Arma3Ip: { type: String },
	ArmaPort: { type: String },
    GuildID: { type: String }
});

module.exports = model('arma3ip', armaSchema);