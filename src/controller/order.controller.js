const { getOrderService } = require("../services/order.services");

const getOrders = async (req, res) => {
  try {
    const { decoded } = req;
    const userId = decoded.id;
    const response = await getOrderService(userId);
    return res.status(200).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getOrders };
