const Joi = require('joi')
const validateUserAddress = (address) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        street: Joi.string().required(),
        City: Joi.string().required(),
        ZipCode: Joi.string().required(),
        Country: Joi.string().required()
    })
}