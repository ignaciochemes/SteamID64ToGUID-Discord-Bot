const { model, Schema } = require('mongoose');

const generalAlmacenamientoSchema = new Schema({
    comando: { type: String },
    user: { type: String },
    name: { type: String },
});

module.exports = model('generalAlmacenamiento', generalAlmacenamientoSchema);