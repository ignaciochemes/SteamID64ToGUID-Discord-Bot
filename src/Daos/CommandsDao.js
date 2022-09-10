const uidStoreSchema = require('../Database/Models/UidStore');
const guidStoreSchema = require('../Database/Models/GuidStore');
const generalStoreSchema = require('../Database/Models/GeneralStore');

class GeneralDao {

    static async generalStoreDao(commandName, userId, commandType) {
        const newDataGeneral = new generalStoreSchema({
            comando: commandName,
            user: userId,
            name: commandType
        });
        await newDataGeneral.save();
        const count = await generalStoreSchema.aggregate([{ $group: { _id: "$name", Total: { $sum: 1 } } }]);
        return count;
    };

    static async uidStoreDao(uid, userId, aggregate) {
        const newData = new uidStoreSchema({
            uid: uid,
            user: userId,
            name: "uid",
            numero: aggregate,
        });
        await newData.save();
    }

    static async guidStoreDao(guid, userId, aggregate) {
        const newData = new guidStoreSchema({
            guid: guid,
            user: userId,
            name: "guid",
            numero: aggregate,
        });
        await newData.save();
    }
}

module.exports = { GeneralDao };