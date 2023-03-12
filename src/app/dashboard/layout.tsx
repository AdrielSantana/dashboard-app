"use client";
import useColors from "@/client/assets/useColors";
import Navbar from "@/client/components/layout/navbar/Navbar";
import Sidebar from "@/client/components/layout/sidebar/Sidebar";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { bgColor } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={bgColor}
      px={5}
      gap={5}
      h="100%"
      width="100%"
      direction="column"
      overflowY={"auto"}
    >
      <Navbar onOpen={onOpen} />
      <Sidebar onClose={onClose} isOpen={isOpen} />
      {children}
    </Flex>
  );
};

export default DashboardLayout;
