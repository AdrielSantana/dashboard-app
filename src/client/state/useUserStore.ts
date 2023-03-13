import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string;
  setUser: (id: string) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: "63701cc1f03239b7f700000e",
      setUser: (id: string) => set({ userId: id }),
    }),
    {
      name: "user-id",
    }
  )
);

export default useUserStore;
