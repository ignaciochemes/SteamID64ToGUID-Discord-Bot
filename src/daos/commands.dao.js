const uidAlmacenamiento = require('../database/models/uidalmacenamiento');
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

const uidAlmacenamientoDao = async(uid, message, numero) => {
    let newData = new uidAlmacenamiento({
        uid: uid,
        user: message.author.id,
        name: "uid",
        numero: numero,
    });
    await newData.save();
}

module.exports = {
    generalAlmacenamientoDao,
    uidAlmacenamientoDao
}