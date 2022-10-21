import Joi from 'joi';

const cakeSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    price: Joi.number().positive().precision(2).required(),
    image: Joi.string().uri().required(),
    description: Joi.string().required().allow("")
});

export default cakeSchema;