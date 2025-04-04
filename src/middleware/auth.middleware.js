const { verifyToken } = require("../utils/jwt.utlis");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = verifyToken(token);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong!!" });
  }
};

const checkAuthority = (req, res, next) => {
  try {
    const { decoded } = req;
    const { role } = decoded;
    if (role === "admin") {
      next();
    }
    return res.status(500).json({ error: "Not authorized to make this call" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong!!" });
  }
};

module.exports = { authenticateUser, checkAuthority };
