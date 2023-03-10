import { create } from "zustand";

interface UserState {
  userId: string;
}

const useUserStore = create<UserState>()((set) => ({
  userId: "63701cc1f03239b7f700000e",
}));

export default useUserStore;
