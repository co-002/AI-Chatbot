import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ChatGPT",
    });
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;