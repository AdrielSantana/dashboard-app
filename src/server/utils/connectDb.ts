import { MongoClient } from "mongodb";

if (!process.env.MONGO_URL) {
  throw new Error("Missing MONGO_URL in .env");
}

if (!process.env.DB_NAME) {
  throw new Error("Missing DB_NAME in .env");
}

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

const connectDb = async () => {
  try {
    console.log("connecting to db");
    await client.connect();
    console.log("connected to db");
  } catch (error) {
    console.log(`Error trying to connect to db: ${error}`);
  }
};

export default connectDb;
