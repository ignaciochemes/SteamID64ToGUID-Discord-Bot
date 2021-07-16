const { model, Schema } = require('mongoose');

const arma3IpSchema = new Schema({
    Arma3Ip: { type: String },
	Arma3Port: { type: String },
    GuildID: { type: String }
});

module.exports = model('arma3ip', arma3IpSchema);