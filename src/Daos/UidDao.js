const uidalmacenamiento = require("../Database/Models/UidStore");

class UidDao {

    static async agregate() {
        return await uidalmacenamiento.aggregate([
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