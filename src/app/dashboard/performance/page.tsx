"use client";

import DataGrid from "@/client/components/layout/dataGrid/DataGrid";
import DataGridSkeleton from "@/client/components/layout/dataGrid/DataGridSkeleton";
import ErrorMessage from "@/client/components/layout/ErrorMessage";
import Header from "@/client/components/layout/Header";
import { fetchUserPerformance } from "@/client/services/api";
import usePageStore from "@/client/state/usePageStore";
import useSearchStore from "@/client/state/useSearchStore";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { transactionCollums } from "@/client/constants/collums";
import useUserStore from "@/client/state/useUserStore";

const AdminPage = () => {
  const { setPage } = usePageStore();
  const { userId } = useUserStore();

  const [tablePage, setTablePage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [sortType, setSortType] = useState<string>("_id");
  const { search, usedSearch, setUsedSearch } = useSearchStore();

  useEffect(() => {
    setPage("perfomance");
  }, [setPage]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [
      "perfomance",
      tablePage,
      rowsPerPage,
      sortType,
      search,
      usedSearch,
    ],
    queryFn: () => {
      if (usedSearch) {
        setTablePage(1);
      }
      setUsedSearch(false);

      return fetchUserPerformance(
        userId,
        tablePage,
        rowsPerPage,
        sortType,
        search
      );
    },
  });

  return (
    <Flex overflowY={"auto"} h={"100%"} pb={6} gap={"6"} direction={"column"}>
      <Header title="Performance" subTitle="Perfomance de Seus Afiliados" />
      {isSuccess && data.status && (
        <DataGrid
          data={data.sales}
          total={data.total}
          collums={transactionCollums}
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
