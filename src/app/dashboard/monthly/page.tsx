"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const MonthlyPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("monthly");
  }, [setPage]);
  return (
    <>
      <Heading>Monthly Page</Heading>
    </>
  );
};

export default MonthlyPage;