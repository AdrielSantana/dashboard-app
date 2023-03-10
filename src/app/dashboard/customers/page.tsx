"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const CustomersPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("customers");
  }, [setPage]);
  return (
    <>
      <Heading>Customers Page</Heading>
    </>
  );
};

export default CustomersPage;
