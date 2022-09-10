const guidStoreSchema = require("../Database/Models/GuidStore");

class GuidDao {
    static async agregate() {
        return await guidStoreSchema.aggregate([
            {
                $group: {
                    _id: "$name",
                    Total: { $sum: 1 }
                }
            }
        ])
    }
}

module.exports = { GuidDao };