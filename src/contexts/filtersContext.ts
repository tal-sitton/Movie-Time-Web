import React, {createContext} from "react";
import {Cinema} from "../types";

export interface FiltersType {
    cinemas: Cinema[]
    movies: string[]
    dates: Date[]
    types: string[]
    dub: boolean
}

const today: Date = new Date()
export const DEFAULT_FILTERS: FiltersType = {
    cinemas: [],
    movies: [],
    dates: [today],
    types: [],
    dub: true
}

type FilterContextType = [FiltersType, React.Dispatch<React.SetStateAction<FiltersType>>]

export const FiltersContext = createContext<FilterContextType>([DEFAULT_FILTERS, () => {
}] as FilterContextType)