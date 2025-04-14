const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const {
  makePaymentUsingStrip,
  stripeWebhookHandler,
} = require("../controller/payment.controller");

const router = express.Router();

router.post("/pay", authenticateUser, makePaymentUsingStrip);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);

module.exports = router;
