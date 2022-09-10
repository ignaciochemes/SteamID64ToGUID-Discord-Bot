const guidalmacenamiento = require("../Database/Models/GuidStore");

class GuidDao {
    static async agregate() {
        return await guidalmacenamiento.aggregate([
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