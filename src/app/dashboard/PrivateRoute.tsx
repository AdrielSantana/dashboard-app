import useUserStore from "@/client/state/useUserStore";
import { redirect, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();
  const router = useRouter();

  const isUserAuthenticated = !!user;

  useEffect(() => {
    if (!isUserAuthenticated) {
      router.push("/");
    }
  }, [user, isUserAuthenticated, router]);

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
