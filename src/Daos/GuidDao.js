import { query } from "../Database/PgPool.js";

export class GuidDao {
    /**
     * Retorna el total de conversiones GUID en formato similar a Mongoose aggregate.
     * @returns {Promise<Array<{_id: string, Total: number}>>} Lista con un único agregado.
     */
    static async agregate() {
        const res = await query('SELECT COUNT(*) AS total FROM guid_conversions');
        const total = Number(res.rows[0].total);
        return [{ _id: "guid", Total: total }];
    }
}