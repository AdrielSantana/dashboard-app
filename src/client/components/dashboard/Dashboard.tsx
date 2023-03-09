"use client";
import useBearStore from "@/client/state";
import { Flex, Heading, Button, useColorMode } from "@chakra-ui/react";

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { bears, increase } = useBearStore();

  return (
    <>
      <Flex direction="column" gap={5}>
        <Heading>Dashboard</Heading>
        <Heading>{bears}</Heading>
        <Button w="200px" colorScheme="teal" onClick={(e) => increase(2)}>
          Total bears
        </Button>
        <Button w="200px" colorScheme="teal" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Flex>
    </>
  );
};

export default Dashboard;
