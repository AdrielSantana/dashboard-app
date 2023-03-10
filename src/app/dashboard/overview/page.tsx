"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const OverviewPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("overview");
  }, [setPage]);
  return (
    <>
      <Heading>Overview Page</Heading>
    </>
  );
};

export default OverviewPage;