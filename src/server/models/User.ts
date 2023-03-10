import db from "../utils/db";

import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().min(5).max(50),
  password: z.string().min(6),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  occupation: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  transactions: z.string().array().nullable(),
  role: z.string().default("admin"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserType = z.infer<typeof UserSchema>;

export const User = db.then((db) => {
  return db.collection<UserType>("users");
});
