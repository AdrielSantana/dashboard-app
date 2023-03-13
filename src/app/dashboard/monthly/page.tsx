"use client";

import Header from "@/client/components/layout/Header";
import Monthly from "@/client/components/montly/Monthly";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const MonthlyPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("monthly");
  }, [setPage]);
  return (
    <Flex pb={6} gap={"8"} direction={"column"}>
      <Header title="Vendas Mensais" subTitle="Total de Vendas Mensais" />
      <Monthly />
    </Flex>
  );
};

export default MonthlyPage;
