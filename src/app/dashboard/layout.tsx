"use client";
import Navbar from "@/client/components/layout/Navbar";
import Sidebar from "@/client/components/layout/Sidebar";
import {
  Flex,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  const [isNonMobile] = useMediaQuery("(min-width: 750px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={bg}
      height="100%"
      width="100%"
      alignItems="center"
      direction="column"
    >
      <Sidebar isNonMobile={isNonMobile} onClose={onClose} isOpen={isOpen} />
      <Navbar isNonMobile={isNonMobile} onOpen={onOpen} />
      {children}
    </Flex>
  );
};

export default DashboardLayout;
