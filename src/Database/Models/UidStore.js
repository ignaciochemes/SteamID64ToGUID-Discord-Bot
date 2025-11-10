import { model, Schema } from 'mongoose';

const uidStoreSchema = new Schema({
    uid: { type: String },
    user: { type: String },
    name: { type: String },
    numero: { type: Number },
});

export default model('uidAlmacenamiento', uidStoreSchema);
