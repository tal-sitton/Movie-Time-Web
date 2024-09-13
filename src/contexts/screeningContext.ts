import React, {createContext} from "react";
import {ScreeningInfo} from "../types";


type ScreeningContextType = [ScreeningInfo | null, React.Dispatch<React.SetStateAction<ScreeningInfo | null>>]


export const ScreeningContext = createContext<ScreeningContextType>([null, () => {
}] as ScreeningContextType)