import { model, Schema } from 'mongoose';

const dayzSchema = new Schema({
    DayzIp: { type: String },
    DayzPort: { type: String },
    GuildID: { type: String }
});

export default model('dayzip', dayzSchema);
