"use client";

import DataGrid from "@/client/components/custumers/DataGrid";
import Header from "@/client/components/layout/Header";
import { fetchCustomers } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const collums = [
  {
    field: "_id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Nome",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "phoneNumber",
    headerName: "Telefone",
  },
  {
    field: "country",
    headerName: "País",
  },
  {
    field: "occupation",
    headerName: "Ocupação",
  },
  {
    field: "role",
    headerName: "Função",
  },
];

const CustomersPage = () => {
  const { setPage } = usePageStore();

  useEffect(() => {
    setPage("customers");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchCustomers(),
  });

  return (
    <Flex overflowY={"auto"} h={"100%"} pb={6} gap={"6"} direction={"column"}>
      <Header title="Clientes" subTitle="Lista de Clientes" />
      {isSuccess && <DataGrid data={data} collums={collums} />}
    </Flex>
  );
};

export default CustomersPage;
