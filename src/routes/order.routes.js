const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const { createOrder, getOrders } = require("../controller/order.controller");

const router = express.Router();

router.post("/createOrder", authenticateUser, createOrder);

router.get("/getOrders", authenticateUser, getOrders);

module.exports = router;
