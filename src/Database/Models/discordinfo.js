import { model, Schema } from 'mongoose';

const discordInfoSchema = new Schema({
    Servers: { type: String },
    Users: { type: String },
    Channels: { type: String }
});

export default model('discordinfo', discordInfoSchema);
