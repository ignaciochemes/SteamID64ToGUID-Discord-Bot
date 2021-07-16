const generalAlmacenamiento = require('../database/models/generalAlmacenamiento');

const generalAlmacenamientoDao = async(message, comando, name) => {
    let newDataGeneral = new generalAlmacenamiento({
        comando: comando,
        user: message.author.id,
        name: name
    });
    await newDataGeneral.save();
    let count = await generalAlmacenamiento.aggregate([{ $group: { _id: "$name", Total: { $sum:1 } } }]);
    return count;
}

module.exports = {
    generalAlmacenamientoDao
}