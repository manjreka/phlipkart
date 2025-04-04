// const mongoose = require("mongoose");
const Category = require("./src/models/category.model");
const categorySeed = require("./src/seed/category.seed.json");
// require("dotenv").config();
// const { mongoUrl } = require("./env");
// console.log(mongoUrl, "*****", process.env.MONGO_URL);
// const connectDB = require("./db");

// const seedCategoryCollection = async () => {
//   connectDB();
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     if (categorySeed.length === 0) {
//       console.log("⚠️ No categories found in seed file.");
//       return;
//     }

//     const bulkUploads = categorySeed.map((cat) => ({
//       updateOne: {
//         filter: { name: cat.name },
//         update: { $set: cat },
//         upsert: true,
//       },
//     }));

//     if (bulkUploads.length > 0) {
//       await Category.bulkWrite(bulkUploads, { session });
//       await session.commitTransaction();
//       console.log("✅ Categories seeded successfully!");
//     } else {
//       console.log("⚠️ No valid categories to insert.");
//     }
//   } catch (err) {
//     await session.abortTransaction();
//     console.error("❌ Category seeding failed:", err.message, err.stack);
//   } finally {
//     session.endSession();
//     mongoose.connection.close(() => {
//       console.log("🔴 MongoDB connection closed.");
//     });
//   }
// };

// seedCategoryCollection();
const connectDB = require("./src/config/db");

connectDB();
const seedCategoryCollection = async () => {
  try {
    await Category.insertMany(categorySeed);
    console.log("successfully uploaded!!");
  } catch (err) {
    console.log("error uploading categories", err);
  }
};

seedCategoryCollection();
