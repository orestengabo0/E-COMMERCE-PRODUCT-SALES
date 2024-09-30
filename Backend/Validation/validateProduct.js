const Joi = require("joi");

const validateCreateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().trim().max(500).optional(),
    price: Joi.number().required().min(0),
    category: Joi.string().min(2).max(50).required(),
    stock: Joi.number().integer().required().min(0),
    brand: Joi.string().required(),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          altText: Joi.string().trim().required(),
        })
      )
      .optional(),
    ratings: Joi.array()
      .items(
        Joi.object({
          user: Joi.string().optional(),
          rating: Joi.number().min(1).max(5).required(),
          comment: Joi.string().trim().required(),
        })
      )
      .optional(),
  });
  return schema.validate(product);
};
module.exports = validateCreateProduct;
