const Joi = require('joi')

const validateOrder = (order) => {
    const schema = Joi.object({
        products: Joi.array().items(
            Joi.object({
                product: Joi.string().required(),
                quantity: Joi.number().min(1).required(),
            })
        ).required(),
        shippingAddress: Joi.object({
            street: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required()
        }).required()
    })
    return schema.validate(order)
}
module.exports = { validateOrder }