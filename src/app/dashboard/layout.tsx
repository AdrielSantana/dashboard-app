"use client";
import useColors from "@/client/assets/useColors";
import Navbar from "@/client/components/layout/Navbar";
import Sidebar from "@/client/components/layout/Sidebar";
import { Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { bgColor } = useColors();
  const [isNonMobile] = useMediaQuery("(min-width: 750px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={bgColor}
      height="100%"
      width="100%"
      alignItems="center"
      direction="column"
    >
      <Navbar isNonMobile={isNonMobile} onOpen={onOpen} />
      <Sidebar isNonMobile={isNonMobile} onClose={onClose} isOpen={isOpen} />
      {children}
    </Flex>
  );
};

export default DashboardLayout;
