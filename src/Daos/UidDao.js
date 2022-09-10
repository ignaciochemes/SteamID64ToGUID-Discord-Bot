const uidStoreSchema = require("../Database/Models/UidStore");

class UidDao {

    static async agregate() {
        return await uidStoreSchema.aggregate([
            {
                $group: {
                    _id: "$name",
                    Total: { $sum: 1 }
                }
            }
        ])
    }
}

module.exports = { UidDao };