const payment = require("../models/payment.model");

const configureStripPaymentServices = async (cartDetails) => {
  try {
    payment.create(cartDetails);
    return "payment is made successfullY!!";
  } catch (err) {
    throw err;
  }
};

module.exports = { configureStripPaymentServices };
