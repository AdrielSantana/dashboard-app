"use client";

import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import ProductCardGroup from "@/client/components/products/ProductCardGroup";
import SkeletonProductCardGroup from "@/client/components/products/SkeletonProductCardGroup";
import { fetchProducts } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ProductsPage = () => {
  const { page, setPage } = usePageStore();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  useEffect(() => {
    setPage("products");
  }, [setPage]);
  return (
    <Flex h={"100%"} overflowY={"auto"} pb={6} gap={"12"} direction={"column"}>
      <Header title={"Produtos"} subTitle={"Veja sua lista de produtos"} />
      {isError && <ErrorMessage />}
      {isLoading && <SkeletonProductCardGroup numberOfCards={6} />}
      {isSuccess && <ProductCardGroup products={data} />}
    </Flex>
  );
};

export default ProductsPage;
