import { model, Schema } from 'mongoose';

const guidStoreSchema = new Schema({
    guid: { type: String },
    user: { type: String },
    name: { type: String },
    numero: { type: Number }
});

export default model('guidAlmacenamiento', guidStoreSchema);
