"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const ProductsPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("products");
  }, [setPage]);
  return (
    <>
      <Heading>Products Page</Heading>
    </>
  );
};

export default ProductsPage;