import {ProductWithStatsType} from "@/server/controllers/client";
import { Flex } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";

type Props = {
  products: ProductWithStatsType[];
};

const ProductCardGroup = ({ products }: Props) => {
  return (
    <Flex wrap={"wrap"} justifyContent={"space-evenly"} gap={8}>
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </Flex>
  );
};

export default ProductCardGroup;
