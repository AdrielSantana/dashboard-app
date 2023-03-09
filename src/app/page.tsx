"use client";

import { Link } from "@chakra-ui/next-js";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";

const DashboardPage = () => {
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      backgroundColor={bg}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Link href="/dashboard">
        <Button colorScheme="teal">Dashboard</Button>
      </Link>
    </Flex>
  );
};

export default DashboardPage;
