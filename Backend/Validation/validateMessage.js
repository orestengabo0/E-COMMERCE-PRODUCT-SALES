const Joi = require("joi")

const validateMessage = (message) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        message: Joi.string().required()
    })
    return schema.validate(message)
}
module.exports = {validateMessage}