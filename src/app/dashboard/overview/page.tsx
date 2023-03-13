"use client";

import Header from "@/client/components/layout/Header";
import Overview from "@/client/components/overview/Overview";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const OverviewPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("overview");
  }, [setPage]);

  return (
    <Flex pb={6} gap={"8"} direction={"column"}>
      <Header title="Visão Geral" subTitle="Total de Vendas" />
      <Overview />
    </Flex>
  );
};

export default OverviewPage;
