"use client";
import { Flex, useColorModeValue } from "@chakra-ui/react";

const PrincipalLayout = ({ children }: { children: React.ReactNode }) => {
  const bg = useColorModeValue("brand.700", "brand.900");

  return (
    <Flex bg={bg} height="100%" alignItems="center" justifyContent="center">
      {children}
    </Flex>
  );
};

export default PrincipalLayout;
