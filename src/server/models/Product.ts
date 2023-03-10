import db from "../utils/db";

import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  rating: z.number(),
  supply: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const Product = db.then((db) => {
  return db.collection<ProductType>("products");
});
