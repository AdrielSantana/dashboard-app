import { create } from "zustand";

interface SearchState {
  search: string;
  usedSearch: boolean;
  setUsedSearch: (used: boolean) => void;
  setSearch: (search: string) => void;
}

const useSearchStore = create<SearchState>()((set) => ({
  search: "",
  usedSearch: false,
  setUsedSearch: (used) => set((state) => ({ usedSearch: used })),
  setSearch: (search) => set((state) => ({ search: search })),
}));

export default useSearchStore;
