"use client";

import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import BreakdownChart from "@/client/components/breakdown/BreakdownChart";
import Header from "@/client/components/layout/Header";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const BreakdownPage = () => {
  const { setPage } = usePageStore();
  const { isNonMobile } = useDesktopMediaQuery();

  useEffect(() => {
    setPage("breakdown");
  }, [setPage]);
  return (
    <Flex
      overflowX={"hidden"}
      pb={6}
      gap={"8"}
      alignItems={"center"}
      direction={"column"}
    >
      <Header title="Resumo" subTitle="Resumo de Venda Dos Produtos" />
      {isNonMobile && <BreakdownChart />}
      {!isNonMobile && <BreakdownChart isDashboard />}
    </Flex>
  );
};

export default BreakdownPage;
