import { NextRequest } from "next/server";
import { User } from "../models/User";
import { ObjectId } from "mongodb";
import { dataUser } from "../data/index";

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
      return { error: error.message };
    }
  }
};
