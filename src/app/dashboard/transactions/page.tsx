"use client";

import DataGrid from "@/client/components/custumers/DataGrid";
import DataGridSkeleton from "@/client/components/custumers/DataGridSkeleton";
import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import { fetchTransactions } from "@/client/services/api";
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
    field: "userId",
    headerName: "User ID",
  },
  {
    field: "createdAt",
    headerName: "Criado Em",
  },
  {
    field: "products",
    headerName: "# De Produtos",
    renderCell: (params: []) => params.length.toString(),
    disableSort: true,
  },
  {
    field: "cost",
    headerName: "Custo",
    renderCell: (params: number) => `$${params.toFixed(2)}`,
  },
];

const TransactionsPage = () => {
  const { setPage } = usePageStore();

  const [tablePage, setTablePage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [sortType, setSortType] = useState<string>("_id");

  useEffect(() => {
    setPage("transactions");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["transactions", tablePage, rowsPerPage, sortType],
    queryFn: () => fetchTransactions(tablePage, rowsPerPage, sortType),
  });

  return (
    <Flex overflowY={"auto"} h={"100%"} pb={6} gap={"6"} direction={"column"}>
      <Header title="Transações" subTitle="Lista de Transações" />
      {isSuccess && data != undefined && (
        <DataGrid
          data={data.transactions}
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
      {isLoading && <DataGridSkeleton rows={10} collums={5} />}
      {isError || (isSuccess && data == undefined && <ErrorMessage />)}
    </Flex>
  );
};

export default TransactionsPage;
