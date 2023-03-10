import { useMediaQuery } from "@chakra-ui/react";

const useDesktopMediaQuery = () => {
  const [isNonMobile] = useMediaQuery("(min-width: 750px)");
  return { isNonMobile };
};

export default useDesktopMediaQuery;
