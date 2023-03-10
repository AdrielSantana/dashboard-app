"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const GeographyPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("geography");
  }, [setPage]);
  return (
    <>
      <Heading>Geography Page</Heading>
    </>
  );
};

export default GeographyPage;