const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log(`DB is Connected to: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = connectDB;
