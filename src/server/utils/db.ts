import { MongoClient } from "mongodb";

if (!process.env.MONGO_URL) {
  throw new Error("Missing MONGO_URL in .env");
}

if (!process.env.DB_NAME) {
  throw new Error("Missing DB_NAME in .env");
}

const url = process.env.MONGO_URL;
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
