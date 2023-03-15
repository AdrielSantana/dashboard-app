import NotAuthorizedMessage from "@/client/components/layout/NotAuthorizedMessage";
import useUserStore from "@/client/state/useUserStore";
import React, { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();

  const admins = ["admin", "superadmin"];

  const isUserAdmin = admins.includes(user!.role);

  return (
    <>
      {!isUserAdmin && <NotAuthorizedMessage />}
      {isUserAdmin && children}
    </>
  );
};

export default PrivateRoute;
