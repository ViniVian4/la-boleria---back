import connection from "../db/database.js";
import orderSchema from "../schemas/orderSchema.js";

async function validateOrder(req, res, next) {
    const newOrder = req.body;

    const validation = orderSchema.validate(newOrder, { abortEarly: true });

    if (validation.error) {
        return res.sendStatus(400);
    }

    try {
        const dbClient = await connection.query(
            `SELECT * FROM clients WHERE id=$1`,
            [newOrder.clientId]
        );

        const dbCake = await connection.query(
            `SELECT * FROM cakes WHERE id=$1`,
            [newOrder.cakeId]
        );

        if (dbClient.rows.length === 0 || dbCake.rows.length === 0) {
            return res.sendStatus(404);
        }
    } catch (error) {
        return res.sendStatus(500);
    }

    next();
}

export default validateOrder;