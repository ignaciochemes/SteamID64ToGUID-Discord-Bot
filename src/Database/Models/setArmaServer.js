import { model, Schema } from 'mongoose';

const armaSchema = new Schema({
    Arma3Ip: { type: String },
    ArmaPort: { type: String },
    GuildID: { type: String }
});

export default model('arma3ip', armaSchema);
