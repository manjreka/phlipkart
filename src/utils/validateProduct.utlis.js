const Joi = require("joi");

const productValidationSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  price: Joi.number().positive().required(),
  discountPercentage: Joi.number().min(0).max(100).default(0),
  rating: Joi.number().min(0).max(5).default(0),
  stock: Joi.number().integer().min(0).required(),
  brand: Joi.string().trim().required(),
  availabilityStatus: Joi.string()
    .valid("available", "out of stock")
    .default("available"),
  minimumOrderQuantity: Joi.number().integer().min(1).default(1),
  images: Joi.string().trim().required(),
  categoryId: Joi.string().trim().required(),
});

const updateProductValidationSchema = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  price: Joi.number().positive().optional(),
  discountPercentage: Joi.number().min(0).max(100).optional(),
  rating: Joi.number().min(0).max(5).optional(),
  stock: Joi.number().integer().min(0).optional(),
  brand: Joi.string().trim().optional(),
  availabilityStatus: Joi.string()
    .valid("available", "out of stock")
    .optional(),
  minimumOrderQuantity: Joi.number().integer().min(1).optional(),
  images: Joi.string().trim().optional(),
  categoryId: Joi.string().trim().optional(),
}).min(1);

const validateProduct = (productDetails) => {
  const { error } = productValidationSchema.validate(productDetails);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const validateUpdateProduct = (productDetails) => {
  const { error } = updateProductValidationSchema.validate(productDetails);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = { validateProduct, validateUpdateProduct };
