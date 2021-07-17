const { model, Schema } = require('mongoose');

const armaSchema = new Schema({
    armaIp: { type: String },
	armaPort: { type: String },
    guildId: { type: String }
});

module.exports = model('arma', armaSchema);