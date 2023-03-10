"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const DailyPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("daily");
  }, [setPage]);
  return (
    <>
      <Heading>Daily Page</Heading>
    </>
  );
};

export default DailyPage;