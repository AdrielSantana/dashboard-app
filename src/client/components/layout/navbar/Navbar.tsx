"use client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Spacer } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import UserOptions from "../profile/UserOptions";
import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";

type Props = {
  onOpen: () => void;
};

const Navbar = ({ onOpen }: Props) => {
  const { isNonMobile } = useDesktopMediaQuery();

  return (
    <Flex py={5} gap={5} justifyContent="center" flexWrap={"wrap"} width="100%">
      <HStack gap={3}>
        <IconButton
          colorScheme="teal"
          aria-label="Open Sidebar"
          variant={"ghost"}
          size={"lg"}
          icon={<HamburgerIcon boxSize={8} />}
          onClick={onOpen}
        />
        <SearchBar />
      </HStack>

      {isNonMobile && (
        <>
          <Spacer />
          <UserOptions />
        </>
      )}
    </Flex>
  );
};

export default Navbar;
