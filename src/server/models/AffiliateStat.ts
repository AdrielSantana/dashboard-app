import db from "../utils/db";

import { z } from "zod";
import { ObjectId } from "mongodb";

export const AffiliateStatsSchema = z.object({
  userId: z.custom<ObjectId>(),
  affiliateSales: z.array(z.custom<ObjectId>()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AffiliateStatsType = z.infer<typeof AffiliateStatsSchema>;

export const AffiliateStats = db.then((db) => {
  return db.collection<AffiliateStatsType>("affiliateStats");
});
