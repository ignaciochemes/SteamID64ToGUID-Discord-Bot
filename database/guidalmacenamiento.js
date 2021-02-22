const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    guid: {
        type: String
    },
    user: {
        type: String
    },
    name: {
        type: String
    },
});

const guidAlmacenamiento = module.exports = mongoose.model('guidAlmacenamiento', PrefixSchema);