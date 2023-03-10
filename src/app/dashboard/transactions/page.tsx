"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const TransactionsPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("transactions");
  }, [setPage]);
  return (
    <>
      <Heading>Transactions Page</Heading>
    </>
  );
};

export default TransactionsPage;
