"use client";

import Dashboard from "@/client/components/dashboard/Dashboard";
import Header from "@/client/components/layout/Header";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const DashboardPage = () => {
  const { setPage } = usePageStore();
  useEffect(() => {
    setPage("/");
  }, [setPage]);

  return (
    <Flex pb={6} gap={"6"} direction={"column"}>
      <Header title="Dashboard" subTitle="" />
      <Dashboard />
    </Flex>
  );
};

export default DashboardPage;
