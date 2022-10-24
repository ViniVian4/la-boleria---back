import connection from "../db/database.js";

async function postOrders(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        console.log(1);
        await connection.query(
            `INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice") VALUES ($1, $2, $3, $4)`,
            [clientId, cakeId, quantity, totalPrice]
        );
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function getOrders(req, res) {
    const { date } = req.query;

    try {
        const orders = await connection.query(
            `SELECT orders.id AS "orderId",
                    orders."createdAt",
                    orders.quantity,
                    orders."totalPrice",
                    clients.id AS "clientId",
                    clients.name AS "clientName",
                    clients.address,
                    clients.phone,
                    cakes.id AS "cakeId",
                    cakes.name AS "cakeName",
                    cakes.price,
                    cakes.description,
                    cakes.image FROM orders
            JOIN clients
                ON orders."clientId" = clients.id
            JOIN cakes
                ON orders."cakeId" = cakes.id;`
        );

        let ordersList = orders.rows;

        if (date) {
            const dateFormat = new Date(date);
            ordersList = ordersList.filter((data) =>
            (data.createdAt.getDate() == dateFormat.getDate() &&
                data.createdAt.getMonth() == dateFormat.getMonth() &&
                data.createdAt.getFullYear() == dateFormat.getFullYear()));
        }

        if (ordersList.length == 0) {
            return res.sendStatus(404);
        }

        const finalList = ordersList.map((data) => (
            {
                client: {
                    id: data.clientId,
                    name: data.clientName,
                    address: data.address,
                    phone: data.phone
                },
                cake: {
                    id: data.cakeId,
                    name: data.cakeName,
                    price: data.price,
                    description: data.description,
                    image: data.image
                },
                orderId: data.orderId,
                createdAt: `${date} ${data.createdAt.getHours()}:${data.createdAt.getMinutes()}`,
                quantity: data.quantity,
                totalPrice: data.totalPrice
            }));

        return res.status(200).send(finalList);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function getOrderId(req, res) {
    const { id } = req.params;

    try {
        const order = await connection.query(`
        SELECT 
            orders.id AS "orderId",
            orders."createdAt",
            orders.quantity,
            orders."totalPrice",
            clients.id AS "clientId",
            clients.name AS "clientName",
            clients.address,
            clients.phone,
            cakes.id AS "cakeId",
            cakes.name AS "cakeName",
            cakes.price,
            cakes.description,
            cakes.image FROM orders
        JOIN clients
            ON orders."clientId" = clients.id
        JOIN cakes
            ON orders."cakeId" = cakes.id WHERE orders.id=$1;`, [id]);

        if (order.rows.length === 0) {
            return res.sendStatus(404);
        }

        const finalOrder = 
        {
            client: {
                id: order.rows[0].clientId,
                name: order.rows[0].clientName,
                address: order.rows[0].address,
                phone: order.rows[0].phone
            },
            cake: {
                id: order.rows[0].cakeId,
                name: order.rows[0].cakeName,
                price: order.rows[0].price,
                description: order.rows[0].description,
                image: order.rows[0].image
            },
            orderId: order.rows[0].orderId,
            createdAt: `${order.rows[0].createdAt.getFullYear()}-${order.rows[0].createdAt.getMonth()}-${order.rows[0].createdAt.getDate()} ${order.rows[0].createdAt.getHours()}:${order.rows[0].createdAt.getMinutes()}`,
            quantity: order.rows[0].quantity,
            totalPrice: order.rows[0].totalPrice
        }

        res.status(200).send(finalOrder);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { postOrders, getOrders, getOrderId }