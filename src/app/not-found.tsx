"use client";
import useColors from "@/client/assets/useColors";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const NotFound = () => {
  const { bgColor } = useColors();

  return (
    <Flex
      bg={bgColor}
      h={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
    >
      <Heading>Página não encontrada</Heading>
      <Link href="/">
        <Button colorScheme="teal">Voltar</Button>
      </Link>
    </Flex>
  );
};

export default NotFound;
