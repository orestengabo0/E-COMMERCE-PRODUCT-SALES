const Joi = require('joi')

const validateCreateProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().trim().max(500).optional(),
        price: Joi.number().required().min(0),
        category: Joi.string().min(2).max(50).required(),
        stock: Joi.number().integer().required().min(0),
        imageUrl: Joi.string().uri().optional().allow("")
    })
    return schema.validate(product)
}
module.exports = validateCreateProduct