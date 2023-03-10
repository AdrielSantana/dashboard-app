"use client";

import usePageStore from "@/client/state/usePageStore";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const AdminPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("admin");
  }, [setPage]);
  return (
    <>
      <Heading>Admin Page</Heading>
    </>
  );
};

export default AdminPage;