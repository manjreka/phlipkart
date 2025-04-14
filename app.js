const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const userRoutes = require("./src/routes/user.routes");
const productRoutes = require("./src/routes/product.routes");
const cartRoutes = require("./src/routes/cart.routes");
const orderRoutes = require("./src/routes/order.routes");
const addressRoutes = require("./src/routes/address.routes");
const paymentRoutes = require("./src/routes/payment.routes");
const { stripeWebhookHandler } = require("./src/controller/payment.controller");

connectDB();

const app = express();
app.use(cors());

app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = { app };
