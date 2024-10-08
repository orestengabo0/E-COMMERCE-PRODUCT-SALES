const Joi = require("joi");

const validateCreateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().trim().max(500).optional(),
    price: Joi.number().required().min(0),
    categoryId: Joi.string().min(2).max(50).required(),
    stock: Joi.number().integer().required().min(0),
    brand: Joi.string().required(),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          altText: Joi.string().trim().required(),
        })
      )
      .optional()
  });
  return schema.validate(product);
};

const validateUpdateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().trim().max(500).optional(),
    price: Joi.number().optional().min(0),
    category: Joi.string().min(2).max(50).optional(),
    stock: Joi.number().integer().optional().min(0),
    brand: Joi.string().optional(),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().optional(),
          altText: Joi.string().trim().optional(),
        })
      )
      .optional()
  });
  return schema.validate(product);
};

const validateRatingProduct = (rating) => {
  const schema = Joi.object({
      productId: Joi.string().required(),
      rating: Joi.number().min(1).max(5).required()
  })
  return schema.validate(rating)
}
module.exports = {validateCreateProduct, validateUpdateProduct, validateRatingProduct};
