import "dotenv/config";

import mongoose from "mongoose";

const connectionURI: string = process.env.CONNECTION_DB_URI as string;
mongoose
  .connect(connectionURI)
  .then((data) => console.log("Connected to mongoDB"))
  .catch((err) => console.error(err));

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(connectionURI);
    console.log("Successfully connected to DB!");
  } catch (err) {
    console.error("Error connecting to DB: ", err);
  }
}
