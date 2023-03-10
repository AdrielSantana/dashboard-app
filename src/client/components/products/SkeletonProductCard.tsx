import useColors from "@/client/assets/useColors";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import {
  SkeletonText,
  Skeleton,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";

const SkeletonProductCard = () => {
  const { cardBgColor, bgColor, color } = useColors();
  const { isNonMobile } = useDesktopMediaQuery();

  return (
    <Flex
      direction={"column"}
      h={"350px"}
      justifyContent={"space-between"}
      padding="8"
      w={isNonMobile ? "450px" : "300px"}
      boxShadow="lg"
      borderRadius={"lg"}
      bg={cardBgColor}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <SkeletonText
          mt="4"
          w={"6rem"}
          noOfLines={3}
          spacing="4"
          skeletonHeight="3"
        />

        <CircularProgress
          size="70px"
          thickness="10px"
          value={40}
          color={color}
          trackColor={bgColor}
          isIndeterminate
        />
      </Flex>
      <SkeletonText noOfLines={3} spacing="4" skeletonHeight="2" />
      <Skeleton w={"7rem"} h={"3rem"} borderRadius={"lg"} />
    </Flex>
  );
};

export default SkeletonProductCard;
