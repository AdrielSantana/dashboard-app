import db from "../utils/db";

import { z } from "zod";

export const ProductStatSchema = z.object({
  productId: z.string(),
  yearlySalesTotal: z.number(),
  yearlyTotalSoldUnits: z.number(),
  monthlyData: z.array(
    z.object({
      month: z.string(),
      totalSales: z.number(),
      totalUnits: z.number(),
    })
  ),
  dailyData: z.array(
    z.object({
      date: z.string(),
      totalSales: z.number(),
      totalUnits: z.number(),
    })
  ),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductStatType = z.infer<typeof ProductStatSchema>;

export const ProductStat = db.then((db) => {
  return db.collection<ProductStatType>("productStats");
});
