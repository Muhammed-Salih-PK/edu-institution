import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("Please define MONGO_URL in .env.local");
}

let client;
let db;

const connectToDatabase = async () => {
  try {
    if (!client) {
      client = await new MongoClient(uri).connect();
      console.log("Connected to MongoDB with MongoClient");
    }
    if (!db) {
      db = client.db(dbName);
    }
    // Connect Mongoose *after* the MongoClient connection
    if (mongoose.connection.readyState === 0) {
      try {
        await mongoose.connect(uri, {
          dbName: dbName, // Use the same dbName
        });
        console.log("Connected to MongoDB with Mongoose");
      } catch (mongooseErr) {
        console.error("Mongoose connection error:", mongooseErr);
        // *Don't* throw here.  MongoClient is our primary connection.
        //  Mongoose connection failure should be handled, but not
        //  prevent the app from running if MongoClient is OK.
      }
    }

    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Re-throw for critical MongoClient connection errors
  }
};

const getDb = async () => {
  //helper function
  if (!db) {
    await connectToDatabase();
  }
  return db;
};

export { connectToDatabase, getDb };
