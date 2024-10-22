const Joi = require("joi");
const validateUserAddress = (address) => {
  const schema = Joi.object({
    Street: Joi.string().required(),
    City: Joi.string().required(),
    ZipCode: Joi.string().required(),
    Country: Joi.string().required(),
    isDefault: Joi.boolean().optional()
  });
  return schema.validate(address);
};

const validateUpdateUserAddress = (address) => {
  const schema = Joi.object({
    _id: Joi.string().optional(),
    Street: Joi.string().optional(),
    City: Joi.string().optional(),
    ZipCode: Joi.string().optional(),
    Country: Joi.string().optional(),
    isDefault: Joi.boolean().optional()
  });
  return schema.validate(address);
};

module.exports = { validateUserAddress, validateUpdateUserAddress };
