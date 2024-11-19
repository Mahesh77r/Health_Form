import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);

    console.warn("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);  }
};

export default connectDB;
