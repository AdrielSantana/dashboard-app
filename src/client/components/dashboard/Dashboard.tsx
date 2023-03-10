"use client";
import { Flex, Heading, Button, useColorMode } from "@chakra-ui/react";

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex direction="column" gap={5}>
        <Heading>Dashboard</Heading>
        <Button w="200px" colorScheme="teal" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Flex>
    </>
  );
};

export default Dashboard;
