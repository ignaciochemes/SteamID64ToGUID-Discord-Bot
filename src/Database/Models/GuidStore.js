const { model, Schema } = require('mongoose');

const guidStoreSchema = new Schema({
    guid: { type: String },
    user: { type: String },
    name: { type: String },
    numero: { type: Number }
});

module.exports = model('guidAlmacenamiento', guidStoreSchema);