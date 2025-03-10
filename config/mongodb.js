import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(`Db connected to ${url}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
