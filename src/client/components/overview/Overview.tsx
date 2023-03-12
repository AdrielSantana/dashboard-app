"use client";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import { Box, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import OverviewChart from "./OverviewChart";

const Overview = () => {
  const [view, setView] = useState<string>("units");
  const { isNonMobile } = useDesktopMediaQuery();

  return (
    <Flex minH={"100%"} overflow={"hidden"} justifyContent={"center"}>
      <Box
        h={isNonMobile ? "750px" : "500px"}
        w={"100%"}
        minW={"320px"}
        maxW={"1920px"}
      >
        <Select
          width={"150px"}
          variant={"filled"}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="units">Unidades</option>
          <option value="sales">Vendas</option>
        </Select>
        <OverviewChart view={view} />
      </Box>
    </Flex>
  );
};

export default Overview;
