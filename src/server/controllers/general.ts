import { NextRequest } from "next/server";
import { User } from "../models/User";
import { ObjectId } from "mongodb";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "../data/index";
import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";
import { Transaction } from "../models/Transaction";
import { OverallStat } from "../models/OverallStat";
import { AffiliateStats } from "../models/AffiliateStat";

// USAR FUNÇÕES SÓ UMA VEZ PARA POVOAR BANCO

export const insertUsers = async () => {
  try {
    const userCollection = await User;
    const usersConverted = dataUser.map((user) => {
      const { _id: _, ...userWithoutId } = user;
      const userWithConvertedId = {
        _id: new ObjectId(user._id),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userWithoutId,
      };
      return userWithConvertedId;
    });
    const user = await userCollection.insertMany(usersConverted);
    return { user };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export const insertProducts = async () => {
  try {
    const productsCollection = await Product;

    const productsConverted = dataProduct.map((product) => {
      const { _id: _, ...productWithoutId } = product;
      const productWithConvertedId = {
        _id: new ObjectId(product._id),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...productWithoutId,
      };
      return productWithConvertedId;
    });

    const products = await productsCollection.insertMany(productsConverted);
    return { products };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export const insertProductStats = async () => {
  try {
    const productStatsCollection = await ProductStat;

    const productStatsConverted = dataProductStat.map((productStat) => {
      const { _id: _, ...productStatWithoutId } = productStat;
      const productStatWithConvertedId = {
        _id: new ObjectId(productStat._id),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...productStatWithoutId,
      };
      return productStatWithConvertedId;
    });

    const productStats = await productStatsCollection.insertMany(
      productStatsConverted
    );
    return { productStats };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export const insertTransactions = async () => {
  try {
    const transactionsCollection = await Transaction;

    const transactionsConverted = dataTransaction.map((transaction) => {
      const { _id: _, ...transactionWithoutId } = transaction;
      const transactionWithConvertedId = {
        _id: new ObjectId(transaction._id),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...transactionWithoutId,
      };
      return transactionWithConvertedId;
    });

    const transactions = await transactionsCollection.insertMany(
      transactionsConverted
    );
    return { transactions, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export const insertOverallStats = async () => {
  try {
    const overallStatsCollection = await OverallStat;

    const overallStatsConverted = dataOverallStat.map((overallStat) => {
      const {
        _id: _,
        createdAt,
        updatedAt,
        ...overallStatWithoutIdAndStringDates
      } = overallStat;

      const overallStatWithConvertedIdAndDates = {
        _id: new ObjectId(overallStat._id),
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        ...overallStatWithoutIdAndStringDates,
      };
      return overallStatWithConvertedIdAndDates;
    });

    const overallStats = await overallStatsCollection.insertMany(
      overallStatsConverted
    );
    return { overallStats, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export const insertAffiliateStats = async () => {
  try {
    const affiliateStatsCollection = await AffiliateStats;

    const affiliateStatsConverted = dataAffiliateStat.map((affiliateStat) => {
      const {
        _id: _,
        userId,
        affiliateSales,
        ...affiliateStatWithoutId
      } = affiliateStat;

      const affiliateSalesConverted = affiliateSales.map((affiliateSale) => {
        return new ObjectId(affiliateSale);
      });

      const affiliateStatWithConvertedId = {
        _id: new ObjectId(affiliateStat._id),
        affiliateSales: affiliateSalesConverted,
        userId: new ObjectId(userId),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...affiliateStatWithoutId,
      };
      return affiliateStatWithConvertedId;
    });

    const affiliateStats = await affiliateStatsCollection.insertMany(
      affiliateStatsConverted
    );
    return { affiliateStats, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};
