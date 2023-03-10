import { NextRequest } from "next/server";
import { User } from "../models/User";
import { ObjectId } from "mongodb";
import { dataUser, dataProduct, dataProductStat } from "../data/index";
import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";

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
      return { error: error.message };
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
      return { error: error.message };
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
      return { error: error.message };
    }
  }
};
