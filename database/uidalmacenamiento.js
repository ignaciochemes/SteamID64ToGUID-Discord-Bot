const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    user: {
        type: String
    },
    name: {
        type: String
    },
});

const uidAlmacenamiento = module.exports = mongoose.model('uidAlmacenamiento', PrefixSchema);