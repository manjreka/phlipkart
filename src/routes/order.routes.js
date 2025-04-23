const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const { getOrders } = require("../controller/order.controller");

const router = express.Router();

router.get("/getOrders", authenticateUser, getOrders);

module.exports = router;
