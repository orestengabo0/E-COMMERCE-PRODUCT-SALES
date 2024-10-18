const Joi = require("joi");
const validateUserAddress = (address) => {
  const schema = Joi.object({
    Street: Joi.string().required(),
    City: Joi.string().required(),
    ZipCode: Joi.string().required(),
    Country: Joi.string().required(),
  });
  return schema.validate(address);
};

const validateUpdateUserAddress = (address) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    Street: Joi.string().optional(),
    City: Joi.string().optional(),
    ZipCode: Joi.string().optional(),
    Country: Joi.string().optional(),
  });
  return schema.validate(address);
};

module.exports = { validateUserAddress, validateUpdateUserAddress };
