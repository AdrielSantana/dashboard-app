import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import SidebarButton from "./SidebarButton";

type Props = {
  label: string;
  btnGroup: {
    label: string;
    leftIcon: JSX.Element;
    tag: string;
  }[];
};

const SidebarButtonGroup = ({ label, btnGroup }: Props) => {
  return (
    <Stack gap={3} direction={"column"}>
      <Text>{label}</Text>
      <Stack gap={3} direction={"column"}>
        {btnGroup.map(({ label, leftIcon, tag }) => {
          return (
            <SidebarButton
              key={label}
              tag={tag}
              label={label}
              leftIcon={leftIcon}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SidebarButtonGroup;
