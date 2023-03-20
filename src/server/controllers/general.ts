import { ObjectId, WithId } from "mongodb";
import { NextRequest } from "next/server";
import { User, UserType } from "../models/User";
import { OverallStat } from "../models/OverallStat";
import { Transaction } from "../models/Transaction";
import { LoginParamProps, UserProps } from "@/client/services/useAuth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (params: { id: string }) => {
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

export const userLogin = async ({ email, password }: LoginParamProps) => {
  try {
    if (!email || !password) {
      return { error: "email ou senha não fornecidos", status: false };
    }

    const userCollection = await User;
    const user = await userCollection.findOne({
      email: email,
    });

    if (!user) {
      return { error: "email não encontrado", status: false };
    }

    const isUserAuth = await bcrypt.compare(password, user.password);

    if (isUserAuth) {
      const userTokenValue = { id: user._id.toString(), role: user.role };
      const token = jwt.sign(userTokenValue, process.env.JWT_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 2,
      });

      return { token, status: true };
    }

    return { error: "senha inválida", status: false };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type userLoginResponse = {
  user: UserProps | null;
  status: boolean;
};

export const getDashboardStats = async () => {
  try {
    // valores pre-setados
    const currentMonth = "November";
    const currenteYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await (await Transaction)
      .find()
      .limit(50)
      .sort({ createdAt: -1 })
      .toArray();

    const overralStat = await (await OverallStat)
      .find({ year: currenteYear })
      .toArray();

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = overralStat[0];

    const thisMonthStats = overralStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overralStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    return {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
      status: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: false };
    }
  }
};

export type getDashboardDataResponse = {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  salesByCategory: Record<string, number>;
  thisMonthStats: {
    month: string;
    totalSales: number;
    totalUnits: number;
  };
  todayStats: {
    date: string;
    totalSales: number;
    totalUnits: number;
  };
  transactions: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    cost: number;
    products: string[];
  }[];
  status: boolean;
};
