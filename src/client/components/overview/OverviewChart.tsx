import React, { useMemo } from "react";

import { ResponsiveLine } from "@nivo/line";
import { fetchSales } from "@/client/services/api";
import { useQuery } from "@tanstack/react-query";
import useColors from "@/client/assets/useColors";
import ErrorMessage from "../layout/ErrorMessage";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import ResponsiveLineSkeleton from "../layout/responsiveLine/ResponsiveLineSkeleton";

type Props = {
  isDashboard?: boolean;
  view: string;
};

const OverviewChart = ({ isDashboard = false, view }: Props) => {
  const { colors, bgAltColor } = useColors();
  const { isNonMobile } = useDesktopMediaQuery();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["sales"],
    queryFn: () => {
      return fetchSales();
    },
  });

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
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

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales: number = acc.sales + totalSales;
        const curUnits: number = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data, colors]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <ResponsiveLineSkeleton isDashboard={isDashboard} />;
  if (data?.status == false || isError) return <ErrorMessage />;
  return (
    <>
      {isSuccess && data.status && (
        <ResponsiveLine
          data={view === "sales" ? totalSalesLine! : totalUnitsLine!}
          colors={view == "sales" ? [colors.secondary] : [colors.quaternary]}
          enableArea={isDashboard}
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
          margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
            format: (v) => {
              if (isDashboard || !isNonMobile) return v.slice(0, 3);
              return v;
            },
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : "Mês",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard
              ? ""
              : `${view === "units" ? "Unidades" : "Vendas"} Totais Por Ano`,
            legendOffset: -60,
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
          legends={
            !isDashboard
              ? [
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
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
                ]
              : undefined
          }
        />
      )}
    </>
  );
};

export default OverviewChart;
