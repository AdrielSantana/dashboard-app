"use client";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/client/assets/theme";

import { checkIsPublicRoute } from "@/client/functions/check-is-public-route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/client/services/queryClient";
import PrivateRoute from "./dashboard/PrivateRoute";

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
        <QueryClientProvider client={queryClient}>
          <CacheProvider>
            <ChakraProvider theme={theme}>
              {isPublicPage && children}
              {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
            </ChakraProvider>
          </CacheProvider>
        </QueryClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
