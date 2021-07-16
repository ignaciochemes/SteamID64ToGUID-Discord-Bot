const generalAlmacenamiento = require('../database/models/generalAlmacenamiento');

const generalAlmacenamientoDao = async(message) => {
    let newDataGeneral = new generalAlmacenamiento({
        comando: "botinfo",
        user: message.author.id,
        name: "comandos"
    });
    await newDataGeneral.save();
    let count = await generalAlmacenamiento.aggregate([{ $group: { _id: "$name", Total: { $sum:1 } } }]);
    return count;
}

module.exports = {
    generalAlmacenamientoDao
}