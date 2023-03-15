import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProps } from "../services/useAuth";

interface UserState {
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserProps | null) => set({ user: user }),
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;
