import connection from "../db/database.js";

async function postOrders(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        console.log(1);
        await connection.query(
            `INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice") VALUES ($1, $2, $3, $4)`,
            [ clientId, cakeId, quantity, totalPrice ]
        );
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { postOrders }