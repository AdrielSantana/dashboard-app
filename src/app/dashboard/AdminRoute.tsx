"use client";
import NotAuthorizedMessage from "@/client/components/layout/NotAuthorizedMessage";
import { fetchGetUserByToken } from "@/client/services/api";
import useUserStore from "@/client/state/useUserStore";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const [showPage, setShowPage] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const user = await (await fetchGetUserByToken()).user;

      if (user) {
        const isUserAuthenticated = ["admin", "superadmin"].includes(
          user?.role
        );
        setShowPage(isUserAuthenticated);
      } else {
        router.push("/");
      }
    })();
  }, [user, router, showPage]);

  return (
    <>
      {!showPage && <NotAuthorizedMessage />}
      {showPage && children}
    </>
  );
};

export default AdminRoute;
