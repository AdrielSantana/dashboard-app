import db from "../utils/db";

import { z } from "zod";

export const OverallStatSchema = z.object({
  totalCustomers: z.number(),
  yearlySalesTotal: z.number(),
  yearlyTotalSoldUnits: z.number(),
  year: z.number(),
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
  salesByCategory: z.record(z.string().min(1), z.number()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type OverallStatType = z.infer<typeof OverallStatSchema>;

export const OverallStat = db.then((db) => {
  return db.collection<OverallStatType>("overallStats");
});
