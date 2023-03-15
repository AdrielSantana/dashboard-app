import { redirect } from "next/navigation";
import { useState } from "react";
import useUserStore from "../state/useUserStore";
import { fetchLogin } from "./api";

export type UserProps = {
  id: string;
  role: string;
};

export type LoginParamProps = { email: string; password: string };

const useAuth = () => {
  const { setUser } = useUserStore();
  const [failedLogin, setFailedLogin] = useState<boolean>(false);

  const login = async ({ email, password }: LoginParamProps) => {
    const response = await fetchLogin(email, password);

    if (response.user != null) {
      setUser(response.user);
      setFailedLogin(false);
    } else {
      setFailedLogin(true);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    failedLogin,
    login,
    logout,
  };
};

export default useAuth;
