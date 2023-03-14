import React from "react";
import { Choropleth } from "@nivo/geo";
import { geoData } from "@/client/constants/geo-data";
import { Box, Flex } from "@chakra-ui/react";
import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";

type Props = {
  data: {
    id: string;
    value: number;
  }[];
};

const GeographyMap = ({ data }: Props) => {
  const { bgAltColor, colors, bgColor } = useColors();
  const { isNonMobile } = useDesktopMediaQuery();

  let maxDomain = 0;
  if (data.length > 0) {
    data.forEach(({ id, value }) => {
      maxDomain = value > maxDomain ? value : maxDomain;
    });
  }

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      overflowX={"auto"}
      overflowY={"hidden"}
    >
      <Choropleth
        data={data}
        width={1280}
        height={720}
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
              color: "#212121",
            },
          },
        }}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
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
        projectionScale={isNonMobile ? 150 : 130}
        projectionTranslation={isNonMobile ? [0.5, 0.6] : [0.65, 0.6]}
        projectionRotation={[0, 0, 0]}
        borderWidth={1.5}
        borderColor={bgColor}
        legends={[
          {
            anchor: "top-right",
            direction: "column",
            justify: true,
            translateX: 0,
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
    </Flex>
  );
};

export default GeographyMap;
