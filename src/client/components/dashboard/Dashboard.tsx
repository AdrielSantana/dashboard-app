"use client";
import { fetchDashboardData } from "@/client/services/api";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
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
import { transactionCollums } from "@/client/constants/collums";
import DataGridSkeleton from "../layout/dataGrid/DataGridSkeleton";

const Dashboard = () => {
  const { isNonMediumScreens, isNonMobile } = useDesktopMediaQuery();
  const { colors, bgAltColor, bgColor, cardBgColor } = useColors();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => {
      return fetchDashboardData();
    },
  });

  return (
    <>
      {isLoading && (
        <>
          <Grid
            templateColumns={"repeat(12, 1fr)"}
            minH={"100%"}
            gridAutoRows={isNonMediumScreens ? "160px" : "320px"}
            gap={"20px"}
          >
            <StatBoxSkeleton />
            <StatBoxSkeleton />
            <GridItem colSpan={isNonMediumScreens ? 8 : 12} rowSpan={2}>
              <Card p={0} bg={cardBgColor} w="100%" h={"100%"}>
                <CardBody overflow={"hidden"}>
                  <Heading></Heading>
                  <OverviewChart view="sales" isDashboard />
                </CardBody>
              </Card>
            </GridItem>
            <StatBoxSkeleton />
            <StatBoxSkeleton />
            <GridItem colSpan={isNonMediumScreens ? 8 : 12} rowSpan={3}>
              <Card
                p={isNonMediumScreens ? 0 : 4}
                bg={cardBgColor}
                w="100%"
                h={"100%"}
              >
                <DataGridSkeleton rows={20} collums={5} />
              </Card>
            </GridItem>

            <GridItem
              colSpan={isNonMediumScreens ? 4 : 12}
              rowSpan={isNonMediumScreens ? 3 : 2}
            >
              <Card bg={cardBgColor} w="100%" h={"100%"}>
                <VStack justifyContent={"center"} h={"100%"}>
                  <BreakdownChart isDashboard />
                </VStack>
              </Card>
            </GridItem>
          </Grid>
        </>
      )}
      {(isError || data?.status == false) && <ErrorMessage />}
      {isSuccess && data.status == true && (
        <>
          <Grid
            templateColumns={"repeat(12, 1fr)"}
            minH={"100%"}
            gridAutoRows={isNonMediumScreens ? "160px" : "320px"}
            gap={"20px"}
          >
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

            <GridItem colSpan={isNonMediumScreens ? 8 : 12} rowSpan={2}>
              <Card p={0} bg={cardBgColor} w="100%" h={"100%"}>
                <CardBody overflow={"hidden"}>
                  <VStack justifyContent={"center"} h={"100%"}>
                    <Heading size={"lg"} textAlign={"center"}>
                      Vendas Por Categoria
                    </Heading>
                    <OverviewChart view="sales" isDashboard />
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

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

            <GridItem colSpan={isNonMediumScreens ? 8 : 12} rowSpan={3}>
              <Card
                p={isNonMediumScreens ? 0 : 4}
                bg={cardBgColor}
                w="100%"
                h={"100%"}
              >
                <DataGrid
                  SSR={false}
                  data={data.transactions}
                  collums={transactionCollums}
                />
              </Card>
            </GridItem>

            <GridItem
              colSpan={isNonMediumScreens ? 4 : 12}
              rowSpan={isNonMediumScreens ? 3 : 2}
            >
              <Card bg={cardBgColor} w="100%" h={"100%"}>
                <VStack justifyContent={"center"} h={"100%"}>
                  <Heading size={"lg"} textAlign={"center"}>
                    Vendas Por Categoria
                  </Heading>
                  <BreakdownChart isDashboard />
                </VStack>
              </Card>
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
};

export default Dashboard;
