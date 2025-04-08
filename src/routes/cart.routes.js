const express = require("express");
const { configureCart, getCart } = require("../controller/cart.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/configureCart", authenticateUser, configureCart);

router.get("/getCart", authenticateUser, getCart);

module.exports = router;
