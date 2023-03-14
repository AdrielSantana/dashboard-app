"use client";

import DataGrid from "@/client/components/layout/dataGrid/DataGrid";
import DataGridSkeleton from "@/client/components/layout/dataGrid/DataGridSkeleton";
import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import { customerCollums } from "@/client/constants/collums";
import { fetchCustomers } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import useSearchStore from "@/client/state/useSearchStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const CustomersPage = () => {
  const { setPage } = usePageStore();

  const [tablePage, setTablePage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [sortType, setSortType] = useState<string>("_id");
  const { search, usedSearch, setUsedSearch } = useSearchStore();

  useEffect(() => {
    setPage("customers");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["customers", tablePage, rowsPerPage, sortType, search],
    queryFn: () => {
      if (usedSearch) {
        setTablePage(1);
      }
      setUsedSearch(false);

      return fetchCustomers(tablePage, rowsPerPage, sortType, search);
    },
  });

  return (
    <Flex overflowY={"auto"} h={"100%"} pb={6} gap={"6"} direction={"column"}>
      <Header title="Clientes" subTitle="Lista de Clientes" />
      {isSuccess && data.status && (
        <DataGrid
          data={data.customers}
          total={data.total}
          collums={customerCollums}
          tablePage={tablePage}
          setTablePage={setTablePage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          sortType={sortType}
          setSortType={setSortType}
        />
      )}
      {isLoading || (!data && <DataGridSkeleton rows={20} collums={7} />)}
      {isError || (data?.status == false && <ErrorMessage />)}
    </Flex>
  );
};

export default CustomersPage;
