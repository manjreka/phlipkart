const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const {
  addAddress,
  getAddresses,
} = require("../controller/address.controller");

const router = express.Router();

router.post("/addAddress", authenticateUser, addAddress);

router.get("/getAddresses", authenticateUser, getAddresses);

module.exports = router;
