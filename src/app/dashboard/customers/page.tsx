"use client";

import DataGrid from "@/client/components/layout/DataGrid";
import DataGridSkeleton from "@/client/components/layout/DataGridSkeleton";
import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import { fetchCustomers } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
    renderCell: (params: string) => {
      return params.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
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
    disableSort: true,
  },
];

const CustomersPage = () => {
  const { setPage } = usePageStore();

  const [tablePage, setTablePage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [sortType, setSortType] = useState<string>("_id");

  useEffect(() => {
    setPage("customers");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["customers", tablePage, rowsPerPage, sortType],
    queryFn: () => fetchCustomers(tablePage, rowsPerPage, sortType),
  });

  return (
    <Flex overflowY={"auto"} h={"100%"} pb={6} gap={"6"} direction={"column"}>
      <Header title="Clientes" subTitle="Lista de Clientes" />
      {isSuccess && data != undefined && (
        <DataGrid
          data={data.customers}
          total={data.total}
          collums={collums}
          tablePage={tablePage}
          setTablePage={setTablePage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          sortType={sortType}
          setSortType={setSortType}
        />
      )}
      {isLoading && <DataGridSkeleton rows={10} collums={7} />}
      {isError || (isSuccess && data == undefined && <ErrorMessage />)}
    </Flex>
  );
};

export default CustomersPage;
