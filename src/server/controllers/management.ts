import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { Transaction } from "../models/Transaction";
import { User, UserType } from "../models/User";
import { UserWithoutPassword } from "./client";

export const getAdmins = async (
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
    const admins = await userCollection
      .find(
        {
          role: "admin",
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
      role: "admin",
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

    return { total, admins, status: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type getAdminsResponse = {
  total: number;
  admins: UserWithoutPassword[];
  status: boolean;
};

export const getUserPerformance = async (
  req: NextRequest,
  params: { id: string }
) => {
  try {
    const id = params.id;
    const convertedId = new ObjectId(id);
    const userCollection = await User;
    const userWithStats = await userCollection
      .aggregate([
        { $match: { _id: convertedId } },
        {
          $lookup: {
            from: "affiliateStats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats",
          },
        },
        { $unwind: "$affiliateStats" },
      ])
      .toArray();

    const transactionsCollection = await Transaction;

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id: ObjectId) => {
        return transactionsCollection.findOne({ _id: id });
      })
    );

    const filteredSaleTransactions = saleTransactions.filter((transaction) => {
      return transaction !== null;
    });

    return {
      user: userWithStats[0],
      sales: filteredSaleTransactions,
      status: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type getUserPerformanceResponse = {
  user: UserType;
  status: boolean;
};
