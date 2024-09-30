const Joi = require('joi')
const validateRegistration = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}

const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}
module.exports = {validateRegistration, validateLogin}