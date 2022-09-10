const { model, Schema } = require('mongoose');

const uidStoreSchema = new Schema({
    uid: { type: String },
    user: { type: String },
    name: { type: String },
    numero: { type: Number },
});

module.exports = model('uidAlmacenamiento', uidStoreSchema);