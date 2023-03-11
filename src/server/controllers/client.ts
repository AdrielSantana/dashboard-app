import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";
import { User } from "../models/User";

export const getUser = async (req: NextRequest, params: { id: string }) => {
  try {
    const id = params.id;
    const convertedId = new ObjectId(id);
    const userCollection = await User;
    const user = await userCollection.findOne({ _id: convertedId });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export const getProducts = async () => {
  try {
    const productsCollection = await Product;
    const products = await productsCollection.find().toArray();

    const productsWithStatus = await Promise.all(
      products.map(async (product) => {
        const productStatsCollection = await ProductStat;
        const stat = await productStatsCollection.findOne({
          productId: product._id.toString(),
        });
        return { ...product, stat };
      })
    );

    return productsWithStatus;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
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

export const getCustomers = async (
  page: number | null,
  pageSize: number | null,
  sort: string | null
) => {
  try {
    if (page && pageSize && sort) {
      const userCollection = await User;
      const customers = await userCollection
        .find(
          { role: "user" },
          { projection: { password: 0 }, sort: { [sort]: 1 } }
        )
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();

      const total = await userCollection.countDocuments({ role: "user" });

      return { total, customers };
    } else {
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export type getCustomersResponse = {
  total: number;
  customers: UserWithoutPassword[];
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
