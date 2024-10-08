const Joi = require('joi')

const validateBrand = (brand) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        brandImage: Joi.string().required().uri()
    })
    return schema.validate(brand)
}
module.exports = { validateBrand }