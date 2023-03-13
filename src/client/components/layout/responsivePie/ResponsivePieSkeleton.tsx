import useColors from "@/client/assets/useColors";
import { Box } from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import React from "react";

const ResponsivePieSkeleton = ({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) => {
  const { bgAltColor } = useColors();
  return (
    <Box
      minH={isDashboard ? "400px" : "600px"}
      maxH={isDashboard ? "400px" : "600px"}
      w={"100%"}
    >
      <ResponsivePie
        data={[
          {
            id: "",
            label: " ",
            value: 1,
          },
          {
            id: "  ",
            label: "  ",
            value: 2,
          },
          {
            id: "   ",
            label: "   ",
            value: 3,
          },
          {
            id: "    ",
            label: "    ",
            value: 4,
          },
          {
            id: "     ",
            label: "     ",
            value: 5,
          },
        ]}
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
        enableArcLabels={false}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor={bgAltColor}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[]}
      />
    </Box>
  );
};

export default ResponsivePieSkeleton;
