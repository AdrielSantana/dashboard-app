import {
  getCustomersResponse,
  getTransactionsResponse,
  getUserResponse,
  getProductsResponse,
  getGeographyResponse,
  getSalesResponse,
} from "@/server/controllers/client";
import { getAdminsResponse } from "@/server/controllers/management";

export const fetchUser: (userId: string) => Promise<getUserResponse> = async (
  userId: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/user/${userId}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const user: getUserResponse = await res.json();
  return user;
};

export const fetchProducts: (
  search: string
) => Promise<getProductsResponse> = async (search) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products?search=${search}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const products: getProductsResponse = await res.json();
  return products;
};

export const fetchGeography: () => Promise<getGeographyResponse> = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/geography`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const geography: getGeographyResponse = await res.json();
  return geography;
};

export const fetchCustomers: (
  page: number,
  pageSize: number,
  sort: string,
  search: string
) => Promise<getCustomersResponse> = async (page, pageSize, sort, search) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/customers?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const customers: getCustomersResponse = await res.json();
  return customers;
};

export const fetchTransactions: (
  page: number,
  pageSize: number,
  sort: string,
  search: string
) => Promise<getTransactionsResponse> = async (
  page,
  pageSize,
  sort,
  search
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/transactions?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const transactions: getTransactionsResponse = await res.json();
  return transactions;
};

export const fetchSales: () => Promise<getSalesResponse> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/sales`, {
    next: { revalidate: 60 },
    method: "GET",
  });
  const sales: getSalesResponse = await res.json();
  return sales;
};

export const fetchAdmins: (
  page: number,
  pageSize: number,
  sort: string,
  search: string
) => Promise<getAdminsResponse> = async (page, pageSize, sort, search) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/admins?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const admins: getAdminsResponse = await res.json();
  return admins;
};
