const Joi = require("joi");

const userValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string().valid("admin", "buyer").default("buyer"),
});

const validateUser = (userData) => {
  const { error } = userValidationSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = validateUser;
