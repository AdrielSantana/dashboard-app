"use client";

import DataGrid from "@/client/components/layout/dataGrid/DataGrid";
import DataGridSkeleton from "@/client/components/layout/dataGrid/DataGridSkeleton";
import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import { fetchAdmins } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import useSearchStore from "@/client/state/useSearchStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { customerCollums } from "@/client/constants/collums";

const AdminPage = () => {
  const { setPage } = usePageStore();

  const [tablePage, setTablePage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [sortType, setSortType] = useState<string>("_id");
  const { search, usedSearch, setUsedSearch } = useSearchStore();

  useEffect(() => {
    setPage("admin");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["admins", tablePage, rowsPerPage, sortType, search, usedSearch],
    queryFn: () => {
      if (usedSearch) {
        setTablePage(1);
      }
      setUsedSearch(false);

      return fetchAdmins(tablePage, rowsPerPage, sortType, search);
    },
  });

  return (
    <Flex overflowY={"auto"} h={"100%"} pb={6} gap={"6"} direction={"column"}>
      <Header title="Administração" subTitle="Lista de Administração" />
      {isSuccess && data.status && (
        <DataGrid
          data={data.admins}
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
      {isLoading || (!data && <DataGridSkeleton rows={20} collums={5} />)}
      {isError || (data?.status == false && <ErrorMessage />)}
    </Flex>
  );
};

export default AdminPage;
