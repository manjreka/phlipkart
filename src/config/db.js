const mongoose = require("mongoose");

const { mongoUrl } = require("./env");
const connectDB = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("DB connected Successfully!!");
    })
    .catch((error) => {
      console.error("Error connecting to DB:", error);
      process.exit(1); // Exit if there's a connection error
    });
};

module.exports = connectDB;
