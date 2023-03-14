import {
  getCustomersResponse,
  getTransactionsResponse,
  getProductsResponse,
  getGeographyResponse,
  getSalesResponse,
} from "@/server/controllers/client";
import {
  getDashboardDataResponse,
  getUserResponse,
} from "@/server/controllers/general";
import {
  getAdminsResponse,
  getUserPerformanceResponse,
} from "@/server/controllers/management";

export const fetchUser: (userId: string) => Promise<getUserResponse> = async (
  userId: string
) => {
  const res = await fetch(`/api/user/${userId}`, {
    next: { revalidate: 60 },
    method: "GET",
  });
  const user: getUserResponse = await res.json();
  return user;
};

export const fetchProducts: (
  search: string
) => Promise<getProductsResponse> = async (search) => {
  const res = await fetch(`/api/products?search=${search}`, {
    next: { revalidate: 60 },
    method: "GET",
  });
  const products: getProductsResponse = await res.json();
  return products;
};

export const fetchGeography: () => Promise<getGeographyResponse> = async () => {
  const res = await fetch(`/api/geography`, {
    next: { revalidate: 60 },
    method: "GET",
  });
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
    `/api/customers?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
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
    `/api/transactions?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const transactions: getTransactionsResponse = await res.json();
  return transactions;
};

export const fetchSales: () => Promise<getSalesResponse> = async () => {
  const res = await fetch(`/api/sales`, {
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
    `/api/admins?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const admins: getAdminsResponse = await res.json();
  return admins;
};

export const fetchUserPerformance: (
  userId: string,
  page: number,
  pageSize: number,
  sort: string,
  search: string
) => Promise<getUserPerformanceResponse> = async (
  userId,
  page,
  pageSize,
  sort,
  search
) => {
  const res = await fetch(
    `/api/performance/${userId}?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
    { next: { revalidate: 60 }, method: "GET" }
  );
  const userPerformance: getUserPerformanceResponse = await res.json();
  return userPerformance;
};

export const fetchDashboardData: () => Promise<getDashboardDataResponse> =
  async () => {
    const res = await fetch(`/api/dashboard`, {
      next: { revalidate: 60 },
      method: "GET",
    });
    const dashboardData: getDashboardDataResponse = await res.json();
    return dashboardData;
  };
