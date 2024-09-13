import React from "react";
import {Box, Collapse} from "@mui/material";
import CinemaFilter from "./filters/CinemaFilter.tsx";
import Filter from "./filters/Filter.tsx";
import MovieFilter from "./filters/MovieFilter.tsx";
import ActiveFiltersChips from "./filters/ActiveFiltersChips.tsx";
import DateFilter from "./filters/DateFilter.tsx";
import TypeFilter from "./filters/TypeFilter.tsx";
import DubFilter from "./filters/DubFilter.tsx";
import {SmallDeviceContext} from "../contexts/smallDeviceContext.ts";


const Filters: React.FC<{
    setIsOpendFilter: React.Dispatch<React.SetStateAction<boolean>>
}> = ({setIsOpendFilter}) => {

    const [openedFilter, setOpenedFilter] = React.useState("");
    const [collapsableChildren, setCollapsableChildren] = React.useState<React.ReactNode>(<></>);
    const isSmallDevice = React.useContext(SmallDeviceContext);


    const handleOpenFilter = (changedFilter: string, collapsable: React.ReactNode) => {
        if (openedFilter == changedFilter) {
            setIsOpendFilter(false)
            setOpenedFilter("")
        } else {
            if (isSmallDevice) {
                setIsOpendFilter(true)
                setCollapsableChildren(collapsable)
            }
            setOpenedFilter(changedFilter)
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minWidth={"100%"} zIndex={1}
             sx={{direction: "rtl"}}>
            <ActiveFiltersChips/>

            <Box display="flex" justifyContent="center" alignItems="start" gap="3%" width={"100%"}>
                <Filter name={"קולנוע"} handleOpenedFilter={handleOpenFilter} openedFilter={openedFilter}
                        filterName={"cinemas"} showCollapsable={!isSmallDevice}>
                    <CinemaFilter/>
                </Filter>
                <Filter name={"סרט"} handleOpenedFilter={handleOpenFilter} openedFilter={openedFilter}
                        filterName={"movies"} showCollapsable={!isSmallDevice}>
                    <MovieFilter/>
                </Filter>
                <Filter name={"תאריך"} handleOpenedFilter={handleOpenFilter} openedFilter={openedFilter}
                        filterName={"dates"} showCollapsable={!isSmallDevice}>
                    <DateFilter/>
                </Filter>
                <Filter name={"סוג הקרנה"} handleOpenedFilter={handleOpenFilter} openedFilter={openedFilter}
                        filterName={"types"} showCollapsable={!isSmallDevice}>
                    <TypeFilter/>
                </Filter>
                {!isSmallDevice && <DubFilter/>}
            </Box>
            {isSmallDevice && <>
                <DubFilter/>
                <Collapse in={openedFilter != ""} timeout="auto" unmountOnExit autoFocus={true}
                          sx={{
                              backgroundColor: "secondary.main",
                              borderBottomLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                              minHeight: "25em",
                              overflowY: "auto",
                              width: "100%"
                          }}>
                    {collapsableChildren}
                </Collapse>
            </>
            }
        </Box>
    )
}

export default Filters
