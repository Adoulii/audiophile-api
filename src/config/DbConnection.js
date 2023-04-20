import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();
const connect = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewURlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected!");
  } catch (e) {
    console.error(e);
  }
  const db = mongoose.connection;
  // db.on("error", console.error.bind(console, "connection error:"));
  // db.once("open", function () {
  // });
};
export { connect };
