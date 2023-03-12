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
    <Flex overflow={"auto"} h={"100%"} pb={6} gap={"8"} direction={"column"}>
      <Header title="Vendas" subTitle="Total de Vendas" />
      <Overview />
    </Flex>
  );
};

export default OverviewPage;
