import {
  getCustomersResponse,
  getTransactionsResponse,
  ProductWithStatsType,
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

export const fetchCustomers: (
  page: number,
  pageSize: number,
  sort: string | null
) => Promise<getCustomersResponse | undefined> = async (
  page,
  pageSize,
  sort
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/customers?page=${page}&pageSize=${pageSize}&sort=${sort}`,
    { next: { revalidate: 30 }, method: "GET" }
  );
  const customers: getCustomersResponse | undefined = await res.json();
  return customers;
};

export const fetchTransactions: (
  page: number,
  pageSize: number,
  sort: string | null
) => Promise<getTransactionsResponse | undefined> = async (
  page,
  pageSize,
  sort
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/transactions?page=${page}&pageSize=${pageSize}&sort=${sort}`,
    { next: { revalidate: 30 }, method: "GET" }
  );
  const transactions: getTransactionsResponse | undefined = await res.json();
  return transactions;
};
