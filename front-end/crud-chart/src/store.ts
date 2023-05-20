import { create } from "zustand";
import { customFormData } from "./types/modal-types";

type store = {
  data: customFormData[];
  setInitialData: (data: customFormData[]) => void;
};

export const useStore = create<store>((set) => ({
  data: [],
  setInitialData: (data: customFormData[]) => set({ data }),
}));
