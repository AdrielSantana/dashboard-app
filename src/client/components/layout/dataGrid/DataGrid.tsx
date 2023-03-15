import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import useSearchStore from "@/client/state/useSearchStore";
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
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  data: any[];
  collums: {
    field: string;
    headerName: string;
    renderCell?: (params: any) => string;
    disableSort?: boolean;
  }[];

  SSR?: boolean;
  total?: number;

  tablePage?: number;
  setTablePage?: Dispatch<SetStateAction<number>>;

  rowsPerPage?: number;
  setRowsPerPage?: Dispatch<SetStateAction<number>>;

  sortType?: string;
  setSortType?: Dispatch<SetStateAction<string>>;
};

const DataGrid = ({
  data,
  SSR = true,
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
  const { bgColor, colors, bgAltColor } = useColors();

  const [CRtablePage, setCRTablePage] = useState<number>(1);
  const [CRrowsPerPage, setCRRowsPerPage] = useState<number>(20);
  const [CRsortType, setCRSortType] = useState<string>("_id");

  if (!SSR) {
    const total = data.length;

    data = data.slice(
      (CRtablePage - 1) * CRrowsPerPage,
      CRtablePage * CRrowsPerPage
    );

    data = data.sort((a: any, b: any) => {
      return a[CRsortType] - b[CRsortType];
    });

    const lastTablePage: number =
      Math.ceil(total / CRrowsPerPage) == 0
        ? 1
        : Math.ceil(total / CRrowsPerPage);

    const handleRadioChange = (value: number) => {
      setCRRowsPerPage(value);

      const newLastTablePage: number = Math.ceil(total / value);

      if (newLastTablePage < lastTablePage && CRtablePage >= newLastTablePage) {
        setCRTablePage(newLastTablePage);
      }
    };

    const handleSortChange = (sort: string) => {
      if (sort === CRsortType) {
        setCRSortType("_id");
      } else {
        setCRSortType(sort);
      }
    };

    const handleChangeTablePage = (jump: number) => {
      const navBetweenPages =
        !(CRtablePage == 1 && jump < 0) &&
        !(CRtablePage == lastTablePage && jump > 0);
      if (navBetweenPages) {
        setCRTablePage(CRtablePage + jump);
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
                  value={CRrowsPerPage.toString()}
                >
                  <Stack direction="row">
                    <Radio borderColor={bgAltColor} value="20">
                      20
                    </Radio>
                    <Radio borderColor={bgAltColor} value="50">
                      50
                    </Radio>
                  </Stack>
                </RadioGroup>

                <Text color={colors.primary} fontSize={"lg"}>
                  |
                </Text>
                <Text fontSize={"lg"}>{total}</Text>
              </Flex>
              <Flex alignItems={"center"} gap={5}>
                <Text fontSize={"lg"}>Página:</Text>
                <Text fontSize={"lg"}>{CRtablePage}</Text>
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
                        CRsortType === collum.field ? (
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
  }

  console.log(tablePage);

  const SSRCondition =
    SSR == true &&
    setTablePage != undefined &&
    tablePage != undefined &&
    rowsPerPage != undefined &&
    setRowsPerPage != undefined &&
    sortType != undefined &&
    setSortType != undefined &&
    total != undefined;
  if (SSRCondition) {
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
                    <Radio borderColor={bgAltColor} value="20">
                      20
                    </Radio>
                    <Radio borderColor={bgAltColor} value="50">
                      50
                    </Radio>
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
  }
  return <></>;
};

export default DataGrid;
