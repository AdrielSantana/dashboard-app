"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const BreakdownPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("breakdown");
  }, [setPage]);
  return (
    <>
      <Heading>Breakdown Page</Heading>
    </>
  );
};

export default BreakdownPage;
