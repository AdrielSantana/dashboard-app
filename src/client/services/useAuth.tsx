import { redirect } from "next/navigation";
import { useState } from "react";
import useUserStore from "../state/useUserStore";
import { fetchDeleteUserByToken, fetchGetUserByToken, fetchLogin } from "./api";

export type UserProps = {
  id: string;
  role: string;
};

export type LoginParamProps = { email: string; password: string };

const useAuth = () => {
  const { setUser } = useUserStore();
  const [failedLogin, setFailedLogin] = useState<boolean>(false);

  const login = async ({ email, password }: LoginParamProps) => {
    const responseLogin = await fetchLogin(email, password);

    if (responseLogin.status) {
      const responseUser = await fetchGetUserByToken();

      if (responseUser.status) {
        setUser(responseUser.user!);
        setFailedLogin(false);
      } else {
        setFailedLogin(true);
      }
    } else {
      setFailedLogin(true);
    }
  };

  const logout = async () => {
    await fetchDeleteUserByToken();
    setUser(null);
  };

  const checkToken = async () => {
    const responseUser = await fetchGetUserByToken();
    return responseUser.status;
  };

  return {
    failedLogin,
    login,
    logout,
    checkToken
  };
};

export default useAuth;
