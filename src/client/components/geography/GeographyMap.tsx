import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "@/client/constants/geo-data";
import { Box } from "@chakra-ui/react";
import useColors from "@/client/assets/useColors";

type Props = {
  data: {
    id: string;
    value: number;
  }[];
};

const GeographyMap = ({ data }: Props) => {
  const { bgAltColor, colors, bgColor } = useColors();

  let maxDomain = 0;
  data.forEach(({ id, value }) => {
    maxDomain = value > maxDomain ? value : maxDomain;
  });

  return (
    <Box overflow={"auto"} h={"100%"}>
      <ResponsiveChoropleth
        data={data}
        theme={{
          axis: {
            domain: { line: { stroke: colors.primary } },
            legend: { text: { fill: colors.primary } },
            ticks: {
              line: { stroke: colors.primary, strokeWidth: 1 },
              text: { fill: colors.primary },
            },
          },
          legends: {
            text: {
              fill: colors.primary,
            },
          },
          tooltip: {
            container: {
              color: colors.primary,
            },
          },
        }}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
        colors={[
          colors.quaternary,
          colors.primary,
          colors.tertiary,
          colors.secondary,
        ]}
        domain={[0, maxDomain]}
        unknownColor={bgAltColor}
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[0.45, 0.6]}
        projectionRotation={[0, 0, 0]}
        borderWidth={1.5}
        borderColor={bgColor}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: true,
            translateX: -50,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 35,
            itemDirection: "right-to-left",
            itemTextColor: bgAltColor,
            itemOpacity: 0.85,
            symbolSize: 30,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: colors.primary,
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default GeographyMap;
