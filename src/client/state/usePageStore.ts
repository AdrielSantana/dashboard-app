import { create } from "zustand";

interface PageState {
  page: string;
  setPage: (page: string) => void;
}

const usePageStore = create<PageState>()((set) => ({
  page: "",
  setPage: (page) => set((state) => ({ page: page })),
}));

export default usePageStore;
