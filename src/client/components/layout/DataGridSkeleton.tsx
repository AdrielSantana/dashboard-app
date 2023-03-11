import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import { range } from "@/client/functions/range";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Table,
  TableCaption,
  Flex,
  Text,
  TableContainer,
  Select,
  Box,
  IconButton,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Skeleton,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";

type Props = {
  rows: number;
  collums: number;
};

const DataGridSkeleton = ({ rows, collums }: Props) => {
  const { isNonMobile } = useDesktopMediaQuery();
  const { bgColor, color } = useColors();

  const rangeOfRows = range(1, rows);
  const rangeOfCollums = range(1, collums);

  return (
    <TableContainer overflowY={"visible"} h={"100%"} as={Box}>
      <Table size="md" colorScheme={"teal"} h={"100%"} variant="striped">
        <TableCaption zIndex={1} position="sticky" bg={bgColor} bottom={0}>
          <Flex
            h={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={isNonMobile ? "row" : "row-reverse"}
          >
            <Flex alignItems={"center"} gap={5}>
              <Text fontSize={"lg"}>Itens Por Página:</Text>
              <RadioGroup>
                <Stack direction="row">
                  <Radio value="20">20</Radio>
                  <Radio value="50">50</Radio>
                </Stack>
              </RadioGroup>
              <Text color={color} fontSize={"lg"}>
                {" "}
                |{" "}
              </Text>
              <Skeleton w="35px" h="25px" />
            </Flex>
            <Flex alignItems={"center"} gap={5}>
              <Text fontSize={"lg"}>Página: </Text>
              <Skeleton w="20px" h="25px" />
              <Text color={color} fontSize={"lg"}>|</Text>
              <Skeleton w="20px" h="25px" />

              <IconButton
                aria-label="left-table"
                colorScheme={"teal"}
                variant={"ghost"}
                icon={<ArrowLeftIcon boxSize={5} />}
              />
              <IconButton
                aria-label="right-table"
                colorScheme={"teal"}
                variant={"ghost"}
                icon={<ArrowRightIcon boxSize={5} />}
              />
            </Flex>
          </Flex>
        </TableCaption>
        <Thead zIndex={1} position="sticky" bg={bgColor} top={0}>
          <Tr>
            {rangeOfCollums.map((collum) => {
              return (
                <Th key={collum}>
                  <Skeleton w="50px" h="25px" />
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {rangeOfRows.map((row) => {
            return (
              <Tr key={row}>
                {rangeOfCollums.map((collum) => {
                  return (
                    <Td key={collum}>
                      <Skeleton w="80px" h="25px" />
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataGridSkeleton;
