"use client";

import useColors from "@/client/assets/useColors";
import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

const DashboardPage = () => {
  const { bgColor } = useColors();

  return (
    <Flex
      backgroundColor={bgColor}
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
