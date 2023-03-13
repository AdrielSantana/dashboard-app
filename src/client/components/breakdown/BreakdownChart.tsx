import React from "react";
import { ResponsivePie, ComputedDatum, DefaultRawDatum } from "@nivo/pie";
import { Box } from "@chakra-ui/react";
import useColors from "@/client/assets/useColors";
import { fetchSales } from "@/client/services/api";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../layout/ErrorMessage";
import ResponsivePieSkeleton from "../layout/responsivePie/ResponsivePieSkeleton";

type Props = {
  isDashboard?: boolean;
};

const CenteredMetric = ({
  dataWithArc,
  centerX,
  centerY,
}: {
  dataWithArc: ComputedDatum<DefaultRawDatum>[];
  centerX: number;
  centerY: number;
}) => {
  const { bgAltColor } = useColors();
  let total = 0;
  dataWithArc.forEach((datum) => {
    total += datum.value;
  });

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      fill={bgAltColor}
      style={{
        fontSize: "24px",
      }}
    >
      ${total}
    </text>
  );
};

const BreakdownChart = ({ isDashboard = false }: Props) => {
  const { bgAltColor, colors } = useColors();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["sales"],
    queryFn: () => {
      return fetchSales();
    },
  });

  const formattedData = (data: Record<string, number>) => {
    return Object.entries(data).map(([category, sales]) => ({
      id: category,
      label: category,
      value: sales,
    }));
  };

  return (
    <>
      {isError || (data?.status == false && <ErrorMessage />)}
      {isLoading && <ResponsivePieSkeleton />}
      {isSuccess && data?.status == true && (
        <Box
          minH={isDashboard ? "400px" : "600px"}
          maxH={isDashboard ? "400px" : "600px"}
          w={"100%"}
        >
          <ResponsivePie
            layers={[
              "arcs",
              "arcLabels",
              "arcLinkLabels",
              "legends",
              CenteredMetric,
            ]}
            enableArcLabels={false}
            arcLinkLabel={(d) => `${d.id}: $${d.value}`}
            data={formattedData(data.overallStats.salesByCategory)}
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
            colors={{ scheme: "dark2" }}
            margin={
              isDashboard
                ? { top: 30, right: 30, bottom: 30, left: 40 }
                : { top: 30, right: 60, bottom: 60, left: 60 }
            }
            sortByValue={true}
            innerRadius={0.45}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={!isDashboard}
            arcLinkLabelsTextColor={bgAltColor}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 10,
                translateY: isDashboard ? 30 : 56,
                itemsSpacing: isDashboard ? 0 : 10,
                itemWidth: 85,
                itemHeight: 18,
                itemTextColor: bgAltColor,
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: colors.primary,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      )}
    </>
  );
};

export default BreakdownChart;
