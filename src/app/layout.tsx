"use client";
import { usePathname } from "next/navigation";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/client/assets/theme";

import { checkIsPublicRoute } from "@/client/functions/check-is-public-route";
import PrincipalLayout from "@/client/components/layout/PrincipalLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname);

  return (
    <html style={{ height: "100%" }} lang="pt-br">
      <head />
      <body style={{ height: "100%" }}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <PrincipalLayout>{children}</PrincipalLayout>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
