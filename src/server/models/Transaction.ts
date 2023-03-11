import db from "../utils/db";

import { z } from "zod";

export const TransactionSchema = z.object({
  userId: z.string(),
  cost: z.number(),
  products: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;

export const Transaction = db.then((db) => {
  return db.collection<TransactionType>("transactions");
});
