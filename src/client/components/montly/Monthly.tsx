"use client";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import { Box, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSales } from "@/client/services/api";
import useColors from "@/client/assets/useColors";
import { ResponsiveLine } from "@nivo/line";
import ErrorMessage from "../layout/ErrorMessage";
import ResponsiveLineSkeleton from "../layout/responsiveLine/ResponsiveLineSkeleton";

const Monthly = () => {
  const { isNonMobile } = useDesktopMediaQuery();
  const { colors, bgAltColor } = useColors();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["sales"],
    queryFn: () => {
      return fetchSales();
    },
  });

  const [formattedData] = useMemo(() => {
    if (!data?.overallStats) return [];

    const { monthlyData } = data.overallStats;

    const totalSalesLine = {
      id: "Vendas Totais",
      data: new Array(),
    };

    const totalUnitsLine = {
      id: "Unidades Totais",
      data: new Array(),
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];

      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data, colors]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex minH={"100%"} overflow={"hidden"} justifyContent={"center"}>
      <Box
        h={isNonMobile ? "750px" : "500px"}
        w={"100%"}
        minW={"320px"}
        maxW={"1920px"}
      >
        {isLoading && <ResponsiveLineSkeleton />}
        {data?.status == false || (isError && <ErrorMessage />)}
        {isSuccess && data.status && (
          <ResponsiveLine
            data={formattedData!}
            colors={{ scheme: "dark2" }}
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
            curve="linear"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Mês",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
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
    </Flex>
  );
};

export default Monthly;
