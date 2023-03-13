"use client";

import Daily from "@/client/components/daily/Daily";
import Header from "@/client/components/layout/Header";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const DailyPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("daily");
  }, [setPage]);
  return (
    <Flex pb={6} gap={"8"} direction={"column"}>
      <Header title="Vendas Diárias" subTitle="Total de Vendas Diárias" />
      <Daily />
    </Flex>
  );
};

export default DailyPage;
