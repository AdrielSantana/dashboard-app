import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  GridItem,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  value: number;
  increase: number;
  icon: any;
  description: string;
};

const StatBox = ({ title, value, increase, icon, description }: Props) => {
  const { colors, bgAltColor, bgColor, cardBgColor } = useColors();
  const { isNonMediumScreens, isNonMobile } = useDesktopMediaQuery();

  return (
    <GridItem rowSpan={1} colSpan={isNonMediumScreens ? 2 : 12} w="100%" h="100%">
      <Card
        p={isNonMediumScreens ? 0 : 4}
        bg={cardBgColor}
        w="100%"
        h={"100%"}
      >
        <CardBody>
          <Flex h={"100%"} direction={"column"} justifyContent="space-between">
            <Flex alignItems={"center"} justifyContent="space-between">
              <Text fontSize={isNonMediumScreens ? "18px" : "26px"}>
                {title}
              </Text>
              <Text fontSize={isNonMediumScreens ? "18px" : "26px"}>
                {icon}
              </Text>
            </Flex>
            <Heading
              color={colors.primary}
              size={isNonMediumScreens ? "md" : "lg"}
            >
              {value}
            </Heading>
            <Flex alignItems={"center"} justifyContent="space-between">
              <HStack>
                <Text as={"i"} fontSize={isNonMediumScreens ? "18px" : "26px"}>
                  {increase < 0 ? "" : "+"}
                  {increase}%
                </Text>
                {increase < 0 ? (
                  <TriangleDownIcon color={"red.400"} />
                ) : (
                  <TriangleUpIcon color={"green.400"} />
                )}
              </HStack>
              <Text fontSize={isNonMediumScreens ? "16px" : "24px"}>
                {description}
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default StatBox;
