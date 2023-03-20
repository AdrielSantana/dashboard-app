"use client";
import { fetchGetUserByToken } from "@/client/services/api";
import useUserStore from "@/client/state/useUserStore";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const [showPage, setShowPage] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const user = await (await fetchGetUserByToken()).user;

      if (user) {
        const isUserAuthenticated = ["admin", "superadmin", "user"].includes(
          user?.role
        );
        setShowPage(isUserAuthenticated);
        if (!isUserAuthenticated) {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    })();
  }, [user, router, showPage]);

  return (
    <>
      {!showPage && null}
      {showPage && children}
    </>
  );
};

export default PrivateRoute;
