const uidAlmacenamientoSchema = require('../database/models/uidAlmacenamiento');
const guidAlmacenamientoSchema = require('../database/models/guidAlmacenamiento');
const generalAlmacenamientoSchema = require('../database/models/generalAlmacenamiento');

class GeneralDao {
    constructor(){}

    static async generalAlmacenamientoDao(message, comando, name) {
        let newDataGeneral = new generalAlmacenamientoSchema({
            comando: comando,
            user: message.author.id,
            name: name
        });
        await newDataGeneral.save();
        let count = await generalAlmacenamientoSchema.aggregate([{ $group: { _id: "$name", Total: { $sum:1 } } }]);
        return count;
    };

    static async uidAlmacenamientoDao(uid, message, res) {
        let newData = new uidAlmacenamientoSchema({
            uid: uid,
            user: message.author.id,
            name: "uid",
            numero: res,
        });
        await newData.save();
    }

    static async guidAlmacenamientoDao(guid, message, res) {
        let newData = new guidAlmacenamientoSchema({
            uid: guid,
            user: message.author.id,
            name: "guid",
            numero: res,
        });
        await newData.save();
    }
}

module.exports = { GeneralDao };