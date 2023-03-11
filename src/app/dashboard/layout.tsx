"use client";
import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import Navbar from "@/client/components/layout/navbar/Navbar";
import Sidebar from "@/client/components/layout/sidebar/Sidebar";
import { Flex, useDisclosure } from "@chakra-ui/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { bgColor } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={bgColor}
      px={5}
      gap={5}
      height="100%"
      width="100%"
      direction="column"
    >
      <Navbar onOpen={onOpen} />
      <Sidebar onClose={onClose} isOpen={isOpen} />
      {children}
    </Flex>
  );
};

export default DashboardLayout;
