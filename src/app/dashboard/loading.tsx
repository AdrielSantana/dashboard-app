"use client";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <Flex h={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Spinner size="xl" />
      </Flex>
    </>
  );
};

export default Loading;
