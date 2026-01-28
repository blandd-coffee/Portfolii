import "dotenv/config";

import mongoose from "mongoose";

const connectionURI: string = process.env.CONNECTION_DB_URI as string;

export default async function connectDB() {
  try {
    await mongoose.connect(connectionURI);
    console.log("Successfully connected to DB!");
  } catch (err) {
    console.error("Error connecting to DB: ", err);
    process.exit(1);
  }
}
