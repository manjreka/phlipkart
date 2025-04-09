const express = require("express");

const {
  createProducts,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} = require("../controller/product.controller");

const {
  authenticateUser,
  checkAuthority,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/createProducts",
  authenticateUser,
  checkAuthority,
  createProducts
);

router.put("/editProducts", authenticateUser, checkAuthority, updateProduct);

router.delete(
  "/deleteProduct/:id",
  authenticateUser,
  checkAuthority,
  deleteProduct
);

router.get("/getProduct/:id", getSingleProduct);

router.get("/getProducts", getProducts);

module.exports = router;
