import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
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
  Button,
  Input,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: any[];
  total: number;
  collums: {
    field: string;
    headerName: string;
    renderCell?: (params: any) => string;
    disableSort?: boolean;
  }[];

  tablePage: number;
  setTablePage: Dispatch<SetStateAction<number>>;

  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;

  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
};

const DataGrid = ({
  data,
  total,
  collums,
  tablePage,
  setTablePage,
  rowsPerPage,
  setRowsPerPage,
  sortType,
  setSortType,
}: Props) => {
  const { isNonMobile } = useDesktopMediaQuery();
  const { bgColor, colors } = useColors();

  const lastTablePage: number =
    Math.ceil(total / rowsPerPage) == 0 ? 1 : Math.ceil(total / rowsPerPage);

  const handleRadioChange = (value: number) => {
    setRowsPerPage(value);

    const newLastTablePage: number = Math.ceil(total / value);

    if (newLastTablePage < lastTablePage && tablePage >= newLastTablePage) {
      setTablePage(newLastTablePage);
    }
  };

  const handleSortChange = (sort: string) => {
    if (sort === sortType) {
      setSortType("_id");
    } else {
      setSortType(sort);
    }
  };

  const handleChangeTablePage = (jump: number) => {
    const navBetweenPages =
      !(tablePage == 1 && jump < 0) &&
      !(tablePage == lastTablePage && jump > 0);
    if (navBetweenPages) {
      setTablePage(tablePage + jump);
    }
  };

  return (
    <TableContainer h={"100%"} as={Box} overflowY={"auto"}>
      <Table size="md" colorScheme={"teal"} h={"100%"} variant="striped">
        <TableCaption position="sticky" bg={bgColor} bottom={0}>
          <Flex
            h={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={isNonMobile ? "row" : "row-reverse"}
          >
            <Flex alignItems={"center"} gap={5}>
              <Text fontSize={"lg"}>Itens Por Página:</Text>

              <RadioGroup
                colorScheme={"teal"}
                name={"rows-per-page"}
                onChange={(e) => {
                  handleRadioChange(parseFloat(e));
                  console.log(parseFloat(e));
                }}
                value={rowsPerPage.toString()}
              >
                <Stack direction="row">
                  <Radio value="20">20</Radio>
                  <Radio value="50">50</Radio>
                </Stack>
              </RadioGroup>

              <Text color={colors.primary} fontSize={"lg"}>
                |
              </Text>
              <Text fontSize={"lg"}>{total}</Text>
            </Flex>
            <Flex alignItems={"center"} gap={5}>
              <Text fontSize={"lg"}>Página:</Text>
              <Text fontSize={"lg"}>{tablePage}</Text>
              <Text color={colors.primary} fontSize={"lg"}>
                |
              </Text>

              <Text fontSize={"lg"}> {lastTablePage}</Text>
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
          <Tr>
            {collums.map((collum) => {
              return (
                <Th key={collum.field}>
                  <Button
                    _hover={{ textDecoration: "none" }}
                    variant={"link"}
                    isDisabled={collum.disableSort}
                    rightIcon={
                      sortType === collum.field ? (
                        <ChevronDownIcon boxSize={5} />
                      ) : (
                        <ChevronUpIcon boxSize={5} />
                      )
                    }
                    onClick={(e) => {
                      handleSortChange(collum.field);
                    }}
                  >
                    {collum.headerName}
                  </Button>
                </Th>
              );
            })}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((obj) => {
            return (
              <Tr key={obj._id}>
                {collums.map((collum) => {
                  let cell = obj[collum.field];
                  if (collum.renderCell) {
                    cell = collum.renderCell(obj[collum.field]);
                  }
                  return <Td key={collum.field}>{cell}</Td>;
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
