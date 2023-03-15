import { MoonIcon, SettingsIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, useColorMode } from "@chakra-ui/react";

import React from "react";

const Options = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        onClick={(e) => console.log("Open settings")}
      />
    </HStack>
  );
};

export default Options;
