const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    comando: {
        type: String
    },
    user: {
        type: String
    },
    name: {
        type: String
    },
});

const generalAlmacenamiento = module.exports = mongoose.model('generalAlmacenamiento', PrefixSchema);