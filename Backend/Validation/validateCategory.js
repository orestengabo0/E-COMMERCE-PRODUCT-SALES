const Joi = require('joi')

const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().required().trim()
    })
    return schema.validate(category)
}
module.exports = { validateCategory }