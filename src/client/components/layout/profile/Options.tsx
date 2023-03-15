import useAuth from "@/client/services/useAuth";
import { MoonIcon, SettingsIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, useColorMode } from "@chakra-ui/react";

import React from "react";

const Options = ({ isLogin = false }: { isLogin?: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { login } = useAuth();

  const handleFakeLogin = () => {
    login({ email: "fhartzog5q@wsj.com", password: "Gbu0dgwBqM0" });
  };

  return (
    <HStack gap={3}>
      <IconButton
        colorScheme="teal"
        aria-label="Change Theme"
        size={"lg"}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
      <IconButton
        colorScheme="teal"
        aria-label="Option"
        variant={"ghost"}
        size={"lg"}
        icon={<SettingsIcon />}
        onClick={(e) => (isLogin ? handleFakeLogin() : console.log("Faço nada"))}
      />
    </HStack>
  );
};

export default Options;
