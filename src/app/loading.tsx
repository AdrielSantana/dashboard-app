"use client";
import useColors from "@/client/assets/useColors";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  const { bgColor } = useColors();

  return (
    <Flex
      bg={bgColor}
      h={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner size="xl" />
    </Flex>
  );
};

export default Loading;
