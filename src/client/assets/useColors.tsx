import { useColorModeValue } from "@chakra-ui/react";

const useColors = () => {
  const bgColor = useColorModeValue("#E2E8F0", "#2D3748");
  const bgAltColor = useColorModeValue("#2D3748", "#E2E8F0");
  const cardBgColor = useColorModeValue("#CBD5E0", "#4A5568");

  const colors: { [color: string]: string | string } = {};
  
  colors["quaternary"] = useColorModeValue("#1D4044", "#B2F5EA");
  colors["primary"] = useColorModeValue("#2C7A7B", "#81E6D9");
  colors["secondary"] = useColorModeValue("#4FD1C5", "#319795");
  colors["tertiary"] = "#38B2AC";

  return { bgColor, bgAltColor, colors, cardBgColor };
};

export default useColors;
