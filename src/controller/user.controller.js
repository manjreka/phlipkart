const {
  userRegisterServices,
  userLoginServices,
} = require("../services/user.services");
const validateLoggedUser = require("../utils/validateLoggedUser.utlis");
const validateUser = require("../utils/validateUser.utlis");

const loginUser = async (req, res) => {
  try {
    validateLoggedUser(req.body);
    const response = await userLoginServices(req.body);
    return res
      .status(200)
      .json({ token: response, message: "User Logged in Successfully!!" });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong!!" });
  }
};

const registerUser = async (req, res) => {
  try {
    validateUser(req.body);
    const response = await userRegisterServices(req.body);
    return res.status(201).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong!!" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
