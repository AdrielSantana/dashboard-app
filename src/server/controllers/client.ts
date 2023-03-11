import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";
import { Transaction } from "../models/Transaction";
import { User, UserType } from "../models/User";
import getCountryISO3 from "country-iso-2-to-3";

export const getUser = async (req: NextRequest, params: { id: string }) => {
  try {
    const id = params.id;
    const convertedId = new ObjectId(id);
    const userCollection = await User;
    const user = await userCollection.findOne({ _id: convertedId });
    return { user, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type getUserResponse = {
  user: UserType;
  status: boolean;
};

export const getGeography = async () => {
  try {
    const userCollection = await User;
    const users = await userCollection.find().toArray();

    const mappedLocations = users.reduce(
      (acc: { [index: string]: number }, { country }) => {
        let countryISO3 = "";

        if (country) {
          countryISO3 = getCountryISO3(country);
        }

        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      },
      {}
    );

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    return { formattedLocations, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type getGeographyResponse = {
  formattedLocations: {
    id: string;
    value: number;
  }[];
  status: boolean;
};

export const getProducts = async (search: string | null) => {
  try {
    if (!search) {
      search = "";
    }

    const productsCollection = await Product;

    const products = await productsCollection
      .aggregate([
        { $addFields: { priceStr: { $toString: "$price" } } },
        {
          $match: {
            $or: [
              { name: { $regex: new RegExp(search, "i") } },
              { category: { $regex: new RegExp(search, "i") } },
              { priceStr: { $regex: new RegExp(search, "i") } },
            ],
          },
        },
      ])
      .toArray();

    const productsWithStatus = await Promise.all(
      products.map(async (product) => {
        const productStatsCollection = await ProductStat;
        const stat = await productStatsCollection.findOne({
          productId: product._id.toString(),
        });
        return { ...product, stat };
      })
    );

    return { products: productsWithStatus, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type ProductWithStatsType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  createdAt: Date;
  updatedAt: Date;
  stat: {
    createdAt: Date;
    updatedAt: Date;
    productId: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    monthlyData: {
      month: string;
      totalSales: number;
      totalUnits: number;
    }[];
    dailyData: {
      date: string;
      totalSales: number;
      totalUnits: number;
    }[];
  };
};

export type getProductsResponse = {
  products: ProductWithStatsType[];
  status: boolean;
};

export const getCustomers = async (
  page: number | null,
  pageSize: number | null,
  sort: string | null,
  search: string | null
) => {
  try {
    if (!page) {
      page = 1;
    }

    if (!pageSize) {
      pageSize = 20;
    }

    if (!sort) {
      sort = "_id";
    }

    if (!search) {
      search = "";
    }

    const userCollection = await User;
    const customers = await userCollection
      .find(
        {
          role: "user",
          $or: [
            { name: { $regex: new RegExp(search, "i") } },
            { email: { $regex: new RegExp(search, "i") } },
            { city: { $regex: new RegExp(search, "i") } },
            { state: { $regex: new RegExp(search, "i") } },
            { country: { $regex: new RegExp(search, "i") } },
            { occupation: { $regex: new RegExp(search, "i") } },
            { phoneNumber: { $regex: new RegExp(search, "i") } },
          ],
        },
        { projection: { password: 0 }, sort: { [sort]: 1 } }
      )
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const total = await userCollection.countDocuments({
      role: "user",
      $or: [
        { name: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
        { city: { $regex: new RegExp(search, "i") } },
        { state: { $regex: new RegExp(search, "i") } },
        { country: { $regex: new RegExp(search, "i") } },
        { occupation: { $regex: new RegExp(search, "i") } },
        { phoneNumber: { $regex: new RegExp(search, "i") } },
      ],
    });

    return { total, customers, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type UserWithoutPassword = {
  _id: string;
  name: string;
  email: string;
  city: string | null;
  state: string | null;
  country: string | null;
  occupation: string | null;
  phoneNumber: string | null;
  transactions: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};

export type getCustomersResponse = {
  total: number;
  customers: UserWithoutPassword[];
  status: boolean;
};

export const getTransactions = async (
  page: number | null,
  pageSize: number | null,
  sort: string | null,
  search: string | null
) => {
  try {
    if (!page) {
      page = 1;
    }

    if (!pageSize) {
      pageSize = 20;
    }

    if (!sort) {
      sort = "_id";
    }

    if (!search) {
      search = "";
    }

    const transactionCollection = await Transaction;

    const transactions = await transactionCollection
      .aggregate([
        { $addFields: { costStr: { $toString: "$cost" } } },
        {
          $match: {
            $or: [
              { userId: { $regex: new RegExp(search, "i") } },
              { costStr: { $regex: new RegExp(search, "i") } },
            ],
          },
        },
        { $sort: { [sort]: 1 } },
      ])
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const total = await transactionCollection.countDocuments({
      $or: [
        { userId: { $regex: new RegExp(search, "i") } },
        { costStr: { $regex: new RegExp(search, "i") } },
      ],
    });

    return { total, transactions, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type getTransactionsResponse = {
  total: number;
  transactions: {
    userId: string;
    cost: number;
    products: string[];
    createdAt: Date;
    updatedAt: Date;
  }[];
  status: boolean;
};
