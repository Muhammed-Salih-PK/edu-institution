// lib/mongodbClient.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;

if (!uri) {
  throw new Error("Please define MONGO_URL in your environment variables");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
