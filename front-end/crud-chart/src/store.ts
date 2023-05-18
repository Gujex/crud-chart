import create from 'zustand';
import {PersonData} from "./types/store-types";


type store = {
    data: PersonData[];
    setInitialData: (data: PersonData[]) => void;
}

export const useStore = create<store>((set) => ({
    data: [],
    setInitialData: (data: PersonData[]) => set({data}),
}))
