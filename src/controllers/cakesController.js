import connection from "../db/database.js"

async function postCakes(req, res) {
    const { name, price, image, description } = req.body;

    try {
        console.log('1');
        await connection.query(
            `INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)`,
            [name, price, image, description]);
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { postCakes }