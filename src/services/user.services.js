const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.utlis");

const userRegisterServices = async (userDetails) => {
  try {
    const { email, firstName, lastName, password, role } = userDetails;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use!!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserDetails = {
      firstName,
      lastName,
      role,
      password: hashedPassword,
      email,
    };

    await User.create(newUserDetails);
    return "User Created Successfully!!";
  } catch (err) {
    throw err;
  }
};

const userLoginServices = async (userDetails) => {
  try {
    const { email, password } = userDetails;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return "Not registered user or verify login credentials";
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return "passwords not matching";
    }
    const token = generateToken(existingUser);
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = { userRegisterServices, userLoginServices };
