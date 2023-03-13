import useColors from "@/client/assets/useColors";
import { ResponsiveLine } from "@nivo/line";
import React from "react";

const ResponsiveLineSkeleton = () => {
  const { bgAltColor } = useColors();

  return (
    <ResponsiveLine
      data={[]}
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
  );
};

export default ResponsiveLineSkeleton;
