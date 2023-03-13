import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import {
  Card,
  CardBody,
  Flex,
  GridItem,
  HStack,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";

const StatBoxSkeleton = () => {
  const { cardBgColor } = useColors();
  const { isNonMediumScreens } = useDesktopMediaQuery();

  return (
    <GridItem rowSpan={1} colSpan={2} w="100%" h="100%">
      <Card
        p={isNonMediumScreens ? 0 : 4}
        bg={cardBgColor}
        w="100%"
        h={isNonMediumScreens ? "100%" : "300px"}
      >
        <CardBody>
          <Flex h={"100%"} direction={"column"} justifyContent="space-between">
            <Flex alignItems={"center"} justifyContent="space-between">
              <Skeleton
                w={isNonMediumScreens ? "45px" : "80px"}
                h={isNonMediumScreens ? "20px" : "30px"}
              />
              <Skeleton w={"30px"} h={"30px"} />
            </Flex>
            <Skeleton
              w={isNonMediumScreens ? "65px" : "100px"}
              h={isNonMediumScreens ? "25px" : "38px"}
            />
            <Flex alignItems={"center"} justifyContent="space-between">
              <HStack>
                <Skeleton
                  w={isNonMediumScreens ? "45px" : "80px"}
                  h={isNonMediumScreens ? "20px" : "30px"}
                />
              </HStack>
              <Skeleton
                w={isNonMediumScreens ? "80px" : "80px"}
                h={isNonMediumScreens ? "20px" : "30px"}
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default StatBoxSkeleton;
