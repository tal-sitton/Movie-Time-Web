import React, {createContext} from "react";
import {ParsedScreeningsInfo} from "../types/inputInfo.ts";
import {ScreeningInfo} from "../types";

interface ScreeningsContextType {
    screeningsInfo: ParsedScreeningsInfo;
    filteredScreenings: ScreeningInfo[] | undefined;
    setFilteredScreenings: React.Dispatch<React.SetStateAction<ScreeningInfo[] | undefined>>;
}

export const ScreeningsContext = createContext<ScreeningsContextType>({} as ScreeningsContextType);