import connection from '../db/database.js';
import cakeSchema from '../schemas/cakesSchema.js'

async function validateCake(req, res, next) {
    const newCake = req.body;
    newCake.image = `https://${newCake.image}`;

    const validation = cakeSchema.validate(newCake, { abortEarly: true });

    if (validation.error) {        
        if (validation.error.details[0].context.label == 'image') {
            return res.sendStatus(422);
        }
        else {
            return res.sendStatus(400);
        }
    }

    try {
        const dbCake = await connection.query(
            `SELECT * FROM cakes WHERE name ILIKE $1`,
            [newCake.name]
        );

        if (dbCake.rows.length !== 0) {
            return res.sendStatus(409);
        }
    } catch (error) {
        return res.sendStatus(500);
    }

    next();
}

export default validateCake;