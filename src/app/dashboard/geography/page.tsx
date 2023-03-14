"use client";

import GeographyMap from "@/client/components/geography/GeographyMap";
import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import { fetchGeography } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const GeographyPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("geography");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["geography"],
    queryFn: () => {
      return fetchGeography();
    },
  });

  return (
    <Flex pb={6} gap={"8"} direction={"column"}>
      <Header title="Geografia" subTitle="Mapa dos Usuários" />
      {isLoading || !data && <GeographyMap data={[{ id: "BRA", value: 0 }]} />}
      {isError || (data?.status == false && <ErrorMessage />)}
      {isSuccess && data.status == true && (
        <GeographyMap data={data.formattedLocations} />
      )}
    </Flex>
  );
};

export default GeographyPage;
