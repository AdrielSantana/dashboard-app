import { useMediaQuery } from "@chakra-ui/react";

const useDesktopMediaQuery = () => {
  const [isNonMobile] = useMediaQuery("(min-width: 750px)");
  const [isNonMediumScreens] = useMediaQuery("(min-width: 1200px)");

  return { isNonMobile, isNonMediumScreens };
};

export default useDesktopMediaQuery;
