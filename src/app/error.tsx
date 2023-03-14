"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Button, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";

import theme from "@/client/assets/theme";

import { queryClient } from "@/client/services/queryClient";
import useColors from "@/client/assets/useColors";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { bgColor } = useColors();

  return (
    <html style={{ height: "100%" }} lang="pt-br">
      <head></head>
      <body style={{ height: "100%" }}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider>
            <ChakraProvider theme={theme}>
              <Flex
                h={"100%"}
                direction="column"
                alignItems={"center"}
                justifyContent={"center"}
                gap={5}
                bg={bgColor}
              >
                <Heading>Algo Deu Errado!</Heading>
                <Button onClick={() => reset()}>Tentar Novamente</Button>
              </Flex>
            </ChakraProvider>
          </CacheProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
