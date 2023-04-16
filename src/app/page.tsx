"use client";

import useColors from "@/client/assets/useColors";
import LoginCard from "@/client/components/login/LoginCard";
import { Flex } from "@chakra-ui/react";

const DashboardPage = () => {
  const { bgColor } = useColors();

  return (
    <Flex
      backgroundColor={bgColor}
      minHeight="100%"
      alignItems="center"
      justifyContent="center"
      py={5}
    >
      <LoginCard />
    </Flex>
  );
};

export default DashboardPage;
