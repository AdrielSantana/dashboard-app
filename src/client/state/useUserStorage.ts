import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: "63701cc1f03239b7f700000e",
      serUser: (id: string) => set({ userId: id }),
    }),
    {
      name: "user-id",
    }
  )
);

export default useUserStore;
