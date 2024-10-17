const Joi = require("joi");
const validateRegistration = (user) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
const validateUpdateProfile = (user) => {
  const schema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    currentPassword: Joi.string().optional(),
    newPassword: Joi.string().optional(),
    confirmPassword: Joi.string().optional(),
  });
  return schema.validate(user);
};
module.exports = { validateRegistration, validateLogin, validateUpdateProfile };
