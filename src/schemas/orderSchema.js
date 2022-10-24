import Joi from "joi";

const orderSchema = Joi.object({
    clientId: Joi.number().integer().positive().required(),
    cakeId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().min(1).max(4).required(),
    totalPrice: Joi.number().precision(2).positive().required()
});

export default orderSchema;