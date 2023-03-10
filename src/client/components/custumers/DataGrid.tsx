import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Box,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  data: any[];
  collums: {
    field: string;
    headerName: string;
  }[];
};

const DataGrid = ({ data, collums }: Props) => {
  const [tablePage, setTablePage] = useState<number>(1);

  const { isNonMobile } = useDesktopMediaQuery();
  const { bgColor } = useColors();

  const maxItemsPerPage = 50;
  const itemsTotal = data.length;
  const lastTablePage = Math.ceil(itemsTotal / maxItemsPerPage);
  const dataToShow = data.slice(
    maxItemsPerPage * (tablePage - 1),
    maxItemsPerPage * tablePage - 1
  );

  const handleChangeTablePage = (jump: number) => {
    const navBetweenPages =
      !(tablePage == 1 && jump < 0) &&
      !(tablePage == lastTablePage && jump > 0);
    if (navBetweenPages) {
      setTablePage(tablePage + jump);
    }
  };

  return (
    <TableContainer as={Box} overflowY={"auto"} maxH={"100%"}>
      <Table size="md" colorScheme={"teal"} variant="striped">
        <TableCaption h={"50px"} position="sticky" bg={bgColor} bottom={0}>
          <Flex
            h={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={isNonMobile ? "row" : "row-reverse"}
          >
            <Text fontSize={"md"}>
              Itens Por Página: {maxItemsPerPage} / {itemsTotal}
            </Text>
            <Flex alignItems={"center"} gap={5}>
              <Text fontSize={"lg"}>
                Página: {tablePage} / {lastTablePage}
              </Text>
              <IconButton
                aria-label="left-table"
                colorScheme={"teal"}
                variant={"ghost"}
                icon={<ArrowLeftIcon boxSize={5} />}
                onClick={(e) => {
                  handleChangeTablePage(-1);
                }}
              />
              <IconButton
                aria-label="right-table"
                colorScheme={"teal"}
                variant={"ghost"}
                icon={<ArrowRightIcon boxSize={5} />}
                onClick={(e) => {
                  handleChangeTablePage(1);
                }}
              />
            </Flex>
          </Flex>
        </TableCaption>

        <Thead position="sticky" bg={bgColor} top={0}>
          {collums.map((collum) => {
            return <Th key={collum.field}>{collum.headerName}</Th>;
          })}
        </Thead>

        <Tbody>
          {dataToShow.map((obj) => {
            return (
              <Tr key={obj._id}>
                {collums.map((collum) => {
                  return <Td key={collum.field}>{obj[collum.field]}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataGrid;
