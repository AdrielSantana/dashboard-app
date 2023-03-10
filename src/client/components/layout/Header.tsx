import { Heading, Stack } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  subTitle: string;
};

const Header = ({ title, subTitle }: Props) => {
  return (
    <Stack textAlign={"center"} direction={"column"}>
      <Heading>{title}</Heading>
      <Heading fontWeight={600} size={"md"}>
        {subTitle}
      </Heading>
    </Stack>
  );
};

export default Header;
