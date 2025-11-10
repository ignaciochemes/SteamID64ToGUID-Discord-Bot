import { model, Schema } from 'mongoose';

const generalStoreSchema = new Schema({
    comando: { type: String },
    user: { type: String },
    name: { type: String },
});

export default model('generalAlmacenamiento', generalStoreSchema);
