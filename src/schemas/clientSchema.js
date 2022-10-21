import Joi from "joi";

const clientShema = Joi.object({
    name: Joi.string().max(50).required(),
    address: Joi.string().max(60).required(),
    phone: Joi.string().min(10).max(11).pattern(/^[0-9]+$/).required()
});

export default clientShema;