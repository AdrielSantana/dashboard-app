"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const PerformancePage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("performance");
  }, [setPage]);
  return (
    <>
      <Heading>Performance Page</Heading>
    </>
  );
};

export default PerformancePage;