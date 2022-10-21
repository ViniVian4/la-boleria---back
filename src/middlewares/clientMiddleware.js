import connection from '../db/database.js';
import clientSchema from '../schemas/clientSchema.js'

async function validateClient(req, res, next) {
    const newClient = req.body;

    const validation = clientSchema.validate(newClient, { abortEarly: true });

    if (validation.error) {
        return res.sendStatus(400);
    }

    try {
        const dbClient = await connection.query(
            `SELECT * FROM clients WHERE name ILIKE $1 
            AND address ILIKE $2 
            AND phone ILIKE $3`,
            [newClient.name, newClient.address, newClient.phone]
        );

        if (dbClient.rows.length !== 0) {
            return res.sendStatus(409);
        }
    } catch (error) {
        return res.sendStatus(500);
    }

    next();
}

export default validateClient;