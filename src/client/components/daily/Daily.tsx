"use client";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { fetchSales } from "@/client/services/api";
import useColors from "@/client/assets/useColors";
import { ResponsiveLine } from "@nivo/line";
import ErrorMessage from "../layout/ErrorMessage";
import ResponsiveLineSkeleton from "../layout/responsiveLine/ResponsiveLineSkeleton";

const Daily = () => {
  const { isNonMobile } = useDesktopMediaQuery();
  const { colors, bgAltColor } = useColors();
  const [startDate, setStartDate] = useState<Date>(new Date("2021-01-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2021-01-15"));

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["sales"],
    queryFn: () => {
      return fetchSales();
    },
  });

  const [formattedData] = useMemo(() => {
    if (!data?.overallStats) return [];

    const { dailyData } = data.overallStats;

    const totalSalesLine = {
      id: "Vendas Totais",
      data: new Array(),
    };

    const totalUnitsLine = {
      id: "Unidades Totais",
      data: new Array(),
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data, startDate, endDate, colors]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex minH={"100%"} overflow={"hidden"} justifyContent={"center"}>
      <Stack
        h={"100%"}
        direction={"column"}
        w={"100%"}
        minW={"320px"}
        maxW={"1920px"}
      >
        <Flex
          direction={"column"}
          gap={3}
          alignItems={isNonMobile ? "flex-start" : "center"}
        >
          <Text>Data Inicial:</Text>
          <Box>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Text>Data Final:</Text>
          <Box>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date!)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Flex>
        <Box h={isNonMobile ? "750px" : "500px"}>
          {isLoading && <ResponsiveLineSkeleton />}
          {data?.status == false || (isError && <ErrorMessage />)}
          {isSuccess && data.status && (
            <ResponsiveLine
              data={formattedData!}
              colors={[colors.secondary, colors.quaternary]}
              theme={{
                axis: {
                  domain: { line: { stroke: bgAltColor } },
                  legend: { text: { fill: bgAltColor } },
                  ticks: {
                    line: { stroke: bgAltColor, strokeWidth: 1 },
                    text: { fill: bgAltColor },
                  },
                },
                legends: {
                  text: {
                    fill: bgAltColor,
                  },
                },
                tooltip: {
                  container: {
                    color: "#212121",
                  },
                },
              }}
              margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="catmullRom"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: "Dia",
                legendOffset: 60,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Total",
                legendOffset: -50,
                legendPosition: "middle",
              }}
              enableGridX={false}
              enableGridY={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "top-right",
                  direction: "column",
                  justify: false,
                  translateX: 50,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "right-to-left",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default Daily;
