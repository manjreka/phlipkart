const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const { makePaymentUsingStrip } = require("../controller/payment.controller");

const router = express.Router();

router.post("/pay", authenticateUser, makePaymentUsingStrip);

module.exports = router;
