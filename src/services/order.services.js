const Order = require("../models/order.models");

const getOrderService = async (userId) => {
  try {
    const listOrders = await Order.find({ userId }).populate(
      "products.productId"
    );

    return listOrders;
  } catch (err) {
    throw err;
  }
};

module.exports = { getOrderService };
