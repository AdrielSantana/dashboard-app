import { NextRequest } from "next/server";
import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";

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

type ProductWithStatsType = {
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

export default ProductWithStatsType;
