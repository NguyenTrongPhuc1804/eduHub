"use server";

import mongoose from "mongoose";

let isConnected: boolean = false;
export const connectToDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "ucademy",
    });
    isConnected = true;
    console.log("MongoDB new connected");
  } catch (error) {
    console.log(error);
  }
};
