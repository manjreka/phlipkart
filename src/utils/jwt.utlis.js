const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/env");

const generateToken = (userDetails) => {
  const payload = { id: userDetails._id, role: userDetails.role };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1day" });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // decoded contains the payload
  } catch (err) {
    throw new Error("Invalid or expired Token");
  }
};

const decodeToken = () => {
  try {
    const decoded = jwt.decode(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error("Failed to decode token");
  }
};

module.exports = { generateToken, verifyToken, decodeToken };
