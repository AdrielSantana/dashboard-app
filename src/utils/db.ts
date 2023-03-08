import { MongoClient } from "mongodb";

if (!process.env.MONGO_URL) {
  throw new Error("Missing MONGO_URL in .env");
}

if (!process.env.DB_NAME) {
  throw new Error("Missing DB_NAME in .env");
}

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
client.connect();
export default client.db(process.env.DB_NAME);
