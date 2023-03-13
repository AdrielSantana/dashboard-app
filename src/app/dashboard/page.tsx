"use client";

import Dashboard from "@/client/components/dashboard/Dashboard";
import Header from "@/client/components/layout/Header";
import { Flex } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <Flex pb={6} gap={"6"} direction={"column"}>
      <Header title="Dashboard" subTitle="" />
      <Dashboard />
    </Flex>
  );
};

export default DashboardPage;
