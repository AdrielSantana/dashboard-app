import React from "react";
import Image from "next/image";
import { HStack, Heading } from "@chakra-ui/react";
import logo from "/public/images/logo.svg";

const Logo = () => {
  return (
    <HStack gap={3}>
      <Image alt="Logo" src={logo} width={40} height={40} />
      <Heading size={"lg"}>Dashboard</Heading>
    </HStack>
  );
};

export default Logo;
