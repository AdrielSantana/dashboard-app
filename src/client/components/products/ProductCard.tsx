import useColors from "@/client/assets/useColors";
import ProductWithStatsType from "@/server/controllers/client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

type Props = {
  product: ProductWithStatsType;
};

const ProductCard = ({ product }: Props) => {
  const { cardBgColor, bgColor, color } = useColors();

  return (
    <Accordion allowToggle>
      <AccordionItem borderColor={"transparent"}>
        <Flex
          direction={"column"}
          h={"350px"}
          justifyContent={"space-between"}
          padding="8"
          w={"450px"}
          boxShadow="lg"
          borderRadius={"lg"}
          bg={cardBgColor}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Stack>
              <Text color={color} fontSize={"md"}>
                {product.category}
              </Text>
              <Text fontSize={"lg"}>{product.name}</Text>
              <Text fontWeight={600} color={color}>
                $ {product.price}
              </Text>
            </Stack>

            <CircularProgress
              capIsRound
              size="70px"
              thickness="10px"
              value={40}
              color={color}
              trackColor={bgColor}
            >
              <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress>
          </Flex>

          <Text>{product.description}</Text>
          <AccordionButton
            as={Button}
            colorScheme={"teal"}
            variant="solid"
            w={"7rem"}
            h={"3rem"}
            borderRadius={"lg"}
            rightIcon={<AccordionIcon />}
          >
            Ver Mais
          </AccordionButton>
        </Flex>
        <AccordionPanel w={"450px"}>
          <Text>id: {product._id}</Text>
          <Text>Estoque: {product.supply}</Text>
          <Text>Vendas Anuais Desse Ano: {product.stat.yearlySalesTotal}</Text>
          <Text>
            Unidades Vendidas Esse Ano: {product.stat.yearlyTotalSoldUnits}
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCard;
