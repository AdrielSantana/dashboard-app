import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import { convertRatingToPercentage } from "@/client/functions/covert-rating-to-percentage";
import { ProductWithStatsType } from "@/server/controllers/client";
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
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

type Props = {
  product: ProductWithStatsType;
};

const ProductCard = ({ product }: Props) => {
  const { cardBgColor, bgColor, colors } = useColors();
  const { isNonMobile } = useDesktopMediaQuery();

  const convertedRating = convertRatingToPercentage(product.rating);

  return (
    <Accordion allowToggle>
      <AccordionItem borderColor={"transparent"}>
        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          padding="8"
          h={"350px"}
          w={isNonMobile ? "450px" : "300px"}
          boxShadow="lg"
          borderRadius={"lg"}
          bg={cardBgColor}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Stack>
              <Text color={colors.primary} fontSize={"md"}>
                {product.category}
              </Text>
              <Text fontSize={"lg"}>{product.name}</Text>
              <Text fontWeight={600} color={colors.primary}>
                $ {product.price}
              </Text>
            </Stack>

            <Spacer />

            <CircularProgress
              size="70px"
              thickness="10px"
              value={convertedRating}
              color={colors.primary}
              trackColor={bgColor}
            >
              <CircularProgressLabel>{convertedRating}%</CircularProgressLabel>
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
        <AccordionPanel w={isNonMobile ? "450px" : "300px"}>
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
