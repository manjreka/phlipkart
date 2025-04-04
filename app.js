const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

connectDB();
const userRoutes = require("./src/routes/user.routes");
const productRoutes = require("./src/routes/product.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

module.exports = { app };
