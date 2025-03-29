import mongoose from "mongoose";

const Mongo_DB_URL = process.env.DB_URL;


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(Mongo_DB_URL);
    console.log("⚙️ Connected to MongoDB Server⚙️");
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error While Connecting to MongoDB ", error);
    process.exit(1);
  }
};

export default connectDB;
