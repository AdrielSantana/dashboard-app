"use client";
import useColors from "@/client/assets/useColors";
import Navbar from "@/client/components/layout/navbar/Navbar";
import Sidebar from "@/client/components/layout/sidebar/Sidebar";
import { checkIsAdminRoute } from "@/client/functions/check-is-admin-route";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import AdminRoute from "./AdminRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { bgColor } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pathname = usePathname();
  const isAdminPage = checkIsAdminRoute(pathname);

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
      {!isAdminPage && children}
      {isAdminPage && <AdminRoute>{children}</AdminRoute>}
    </Flex>
  );
};

export default DashboardLayout;
