const Joi = require("joi");

const loggedUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const validateLoggedUser = (userData) => {
  const { error } = loggedUserValidationSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = validateLoggedUser;
