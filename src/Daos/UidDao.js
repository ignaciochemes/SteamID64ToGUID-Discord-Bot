import { query } from "../Database/PgPool.js";

export class UidDao {

    /**
     * Retorna el total de conversiones UID en formato similar a Mongoose aggregate.
     * @returns {Promise<Array<{_id: string, Total: number}>>} Lista con un único agregado.
     */
    static async agregate() {
        const res = await query('SELECT COUNT(*) AS total FROM uid_conversions');
        const total = Number(res.rows[0].total);
        return [{ _id: "uid", Total: total }];
    }
}
