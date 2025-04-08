const {
  configureCartServices,
  getCartService,
} = require("../services/cart.services");

const configureCart = async (req, res) => {
  try {
    const { decoded } = req;
    const userId = decoded.id;
    // validate cart details using joi
    const cartDetails = req.body;
    const response = await configureCartServices(userId, cartDetails);
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

const getCart = async (req, res) => {
  try {
    const { decoded } = req;
    const userId = decoded.id;
    const response = await getCartService(userId);
    return res.status(200).json({ cart: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong!!" });
  }
};

module.exports = { configureCart, getCart };
