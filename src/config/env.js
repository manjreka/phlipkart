require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;
const secretKey = process.env.SECRET_KEY;

module.exports = { mongoUrl, secretKey };
