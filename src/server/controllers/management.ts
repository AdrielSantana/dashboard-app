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
  params: { id: string },
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

    const id = params.id;
    const convertedId = new ObjectId(id);
    const userCollection = await User;

    const transactions = await userCollection.aggregate([
      { $match: { _id: convertedId } },
      {
        $lookup: {
          from: "affiliateStats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "affiliateStats.affiliateSales",
          foreignField: "_id",
          as: "affiliateStats.transactions",
        },
      },
      {
        $replaceRoot: {
          newRoot: { transaction: "$affiliateStats.transactions" },
        },
      },
      {
        $project: {
          transaction: {
            $filter: {
              input: "$transaction",
              as: "t",
              cond: {
                $or: [
                  {
                    $regexMatch: {
                      input: "$$t.userId",
                      regex: new RegExp(search, "i"),
                    },
                  },
                  { $gte: ["$$t.cost", parseFloat(search)] },
                ],
              },
            },
          },
        },
      },
      { $unwind: "$transaction" },
      { $sort: { [`transaction.${sort}`]: 1 } },
    ]);

    const totalCursor = transactions.clone();

    const total = (await totalCursor.toArray()).length;

    const transactionsPaged = await transactions
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const transactionsPagedFormmated = transactionsPaged.map((transaction) => {
      return transaction.transaction;
    });

    return {
      sales: transactionsPagedFormmated,
      total: total,
      status: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type getUserPerformanceResponse = {
  sales: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    cost: number;
    products: string[];
  }[];
  total: number;
  status: boolean;
};
