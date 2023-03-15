import React from "react";
import Image from "next/image";
import { HStack, Heading } from "@chakra-ui/react";

const Logo = () => {
  return (
    <HStack gap={3}>
      <Image alt="Logo" src={"/images/logo.svg"} width={40} height={40} />
      <Heading size={"lg"}>Dashboard</Heading>
    </HStack>
  );
};

export default Logo;
