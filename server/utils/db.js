const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI; 

    if (!URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
