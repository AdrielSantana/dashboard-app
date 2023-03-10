import { useColorModeValue } from "@chakra-ui/react";

const useColors = () => {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("teal.600", "teal.200");
  const cardBgColor = useColorModeValue("gray.300", "gray.600");
  return { bgColor, color, cardBgColor };
};

export default useColors;
