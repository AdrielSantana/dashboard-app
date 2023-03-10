import {
  ProductWithStatsType,
  UserWithoutPassword,
} from "@/server/controllers/client";
import { UserType } from "@/server/models/User";

export const fetchUser: (userId: string) => Promise<UserType> = async (
  userId: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/user/${userId}`,
    { next: { revalidate: 30 }, method: "GET" }
  );
  const user: UserType = await res.json();
  return user;
};

export const fetchProducts: () => Promise<
  ProductWithStatsType[]
> = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`,
    { next: { revalidate: 30 }, method: "GET" }
  );
  const products: ProductWithStatsType[] = await res.json();
  return products;
};

export const fetchCustomers: () => Promise<
  UserWithoutPassword[]
> = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/customers`,
    { next: { revalidate: 30 }, method: "GET" }
  );
  const customers: UserWithoutPassword[] = await res.json();
  return customers;
};