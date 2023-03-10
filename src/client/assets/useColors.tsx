import { useColorModeValue } from "@chakra-ui/react";

const useColors = () => {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("teal.600", "teal.200");
  return { bgColor, color };
};

export default useColors;
