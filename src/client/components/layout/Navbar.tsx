"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import UserOptions from "./UserOptions";

type Props = {
  onOpen: () => void;
  isNonMobile: boolean;
};

const Navbar = ({ onOpen, isNonMobile }: Props) => {
  return (
    <Flex
      px={10}
      py={5}
      gap={5}
      justifyContent="center"
      flexWrap={"wrap"}
      width="100%"
    >
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
