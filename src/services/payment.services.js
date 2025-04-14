const payment = require("../models/payment.model");

const configureStripPaymentServices = async (cartDetails) => {
  try {
    payment.create(cartDetails);
    return "payment made successfullY!!";
  } catch (err) {
    throw err;
  }
};

module.exports = { configureStripPaymentServices };
