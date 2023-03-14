import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env");
}

if (!process.env.DB_NAME) {
  throw new Error("Missing DB_NAME in .env");
}

const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url);

const db = client
  .connect()
  .then((mongo) => {
    return mongo.db(dbName);
  })
  .catch((error) => {
    throw new Error(error);
  });

export default db;
