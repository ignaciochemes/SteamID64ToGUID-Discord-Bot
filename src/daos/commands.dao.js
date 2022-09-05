const uidAlmacenamientoSchema = require('../Database/models/uidalmacenamiento')
const guidAlmacenamientoSchema = require('../Database/models/guidalmacenamiento');
const generalAlmacenamientoSchema = require('../Database/models/generalAlmacenamiento');

class GeneralDao {
    constructor() { }

    static async generalAlmacenamientoDao(commandName, userId, commandType) {
        let newDataGeneral = new generalAlmacenamientoSchema({
            comando: commandName,
            user: userId,
            name: commandType
        });
        await newDataGeneral.save();
        let count = await generalAlmacenamientoSchema.aggregate([{ $group: { _id: "$name", Total: { $sum: 1 } } }]);
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

    static async guidAlmacenamientoDao(guid, userId, aggregate) {
        let newData = new guidAlmacenamientoSchema({
            guid: guid,
            user: userId,
            name: "guid",
            numero: aggregate,
        });
        await newData.save();
    }
}

module.exports = { GeneralDao };