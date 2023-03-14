"use client";

import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import NotFoundMessage from "@/client/components/layout/NotFoundMessage";
import ProductCardGroup from "@/client/components/products/ProductCardGroup";
import SkeletonProductCardGroup from "@/client/components/products/SkeletonProductCardGroup";
import { fetchProducts } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import useSearchStore from "@/client/state/useSearchStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ProductsPage = () => {
  const { setPage } = usePageStore();

  const { search } = useSearchStore();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProducts(search),
  });

  useEffect(() => {
    setPage("products");
  }, [setPage]);

  return (
    <Flex h={"100%"} pb={6} gap={"12"} direction={"column"}>
      <Header title={"Produtos"} subTitle={"Veja sua lista de produtos"} />
      {(isError || data?.status == false) && <ErrorMessage />}
      {isLoading && <SkeletonProductCardGroup numberOfCards={6} />}
      {isSuccess && data.status && data.products.length > 0 && (
        <ProductCardGroup products={data.products} />
      )}
      {isSuccess && data.status && data.products.length <= 0 && (
        <NotFoundMessage />
      )}
    </Flex>
  );
};

export default ProductsPage;
