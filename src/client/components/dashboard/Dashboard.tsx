"use client";
import { fetchDashboardData } from "@/client/services/api";
import { Flex, Grid, GridItem, Heading, Icon } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import BreakdownChart from "../breakdown/BreakdownChart";
import OverviewChart from "../overview/OverviewChart";
import DataGrid from "../layout/dataGrid/DataGrid";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import useColors from "@/client/assets/useColors";
import StatBox from "./StatBox";

import { EmailIcon } from "@chakra-ui/icons";
import ErrorMessage from "../layout/ErrorMessage";
import StatBoxSkeleton from "./StatBoxSkeleton";
import { FaCashRegister, FaTrafficLight } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";

const Dashboard = () => {
  const { isNonMediumScreens, isNonMobile } = useDesktopMediaQuery();
  const { colors, bgAltColor, bgColor } = useColors();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["geography"],
    queryFn: () => {
      return fetchDashboardData();
    },
  });

  return (
    <Grid
      templateColumns={
        isNonMediumScreens ? "repeat(12, 1fr)" : "repeat(1, 1fr)"
      }
      minH={"100%"}
      gridAutoRows={"160px"}
      gap={"20px"}
    >
      {isLoading && (
        <>
          <StatBoxSkeleton />
          <StatBoxSkeleton />
          <StatBoxSkeleton />
          <StatBoxSkeleton />
        </>
      )}
      {isError || (data?.status == false && <ErrorMessage />)}
      {isSuccess && data.status && (
        <>
          <StatBox
            title="Clientes Totais"
            value={data.totalCustomers}
            increase={5}
            icon={<EmailIcon color={colors.primary} boxSize={"26px"} />}
            description={"Último Mês"}
          />
          <StatBox
            title="Vendas Hoje"
            value={data.todayStats.totalSales}
            increase={-3}
            icon={
              <Icon
                as={FaCashRegister}
                color={colors.primary}
                boxSize={"26px"}
              />
            }
            description={"Último Mês"}
          />
          <StatBox
            title="Vendas Mês"
            value={data.thisMonthStats.totalSales}
            increase={21}
            icon={
              <Icon
                as={BsFillPersonPlusFill}
                color={colors.primary}
                boxSize={"26px"}
              />
            }
            description={"Último Mês"}
          />
          <StatBox
            title="Vendas Ano"
            value={data.yearlySalesTotal}
            increase={7}
            icon={
              <Icon
                as={FaTrafficLight}
                color={colors.primary}
                boxSize={"26px"}
              />
            }
            description={"Último Mês"}
          />
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
