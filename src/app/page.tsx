"use client";

import useColors from "@/client/assets/useColors";
import LoginCard from "@/client/components/login/LoginCard";
import { Flex } from "@chakra-ui/react";

const DashboardPage = () => {
  const { bgColor } = useColors();

  return (
    <Flex
      backgroundColor={bgColor}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <LoginCard />
    </Flex>
  );
};

export default DashboardPage;
