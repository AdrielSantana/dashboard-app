"use client";

import useColors from "@/client/assets/useColors";
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
  const { bgColor } = useColors();

  useEffect(() => {
    setPage("geography");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["customers"],
    queryFn: () => {
      return fetchGeography();
    },
  });

  return (
    <Flex
      overflow={"auto"}
      h={"100%"}
      bgColor={bgColor}
      pb={6}
      gap={"8"}
      direction={"column"}
    >
      <Header title="Geografia" subTitle="Mapa dos Usuários" />
      {isLoading && <GeographyMap data={[]} />}
      {isError || (data?.status == false && <ErrorMessage />)}
      {isSuccess && data.status && (
        <GeographyMap data={data.formattedLocations} />
      )}
    </Flex>
  );
};

export default GeographyPage;
