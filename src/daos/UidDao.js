const guidalmacenamiento = require("../Database/models/guidalmacenamiento");

class UidDao {
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

module.exports = { UidDao };