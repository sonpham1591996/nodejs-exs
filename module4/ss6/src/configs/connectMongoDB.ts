import { connect } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL ?? "";

export const connectMongoDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    connect(MONGODB_URL)
      .then(() => {
        console.log("Connected to MongoDB");
        resolve();
      })
      .catch((err) => reject(err));
  });
};
