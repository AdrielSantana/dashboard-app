"use client";
import { Box, FormControl, Select } from "@chakra-ui/react";
import { useState } from "react";
import OverviewChart from "./OverviewChart";

const Overview = () => {
  const [view, setView] = useState<string>("units");

  return (
    <Box pb={10} overflow={"hidden"}>
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
  );
};

export default Overview;
