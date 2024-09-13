import React from "react";
import isEqual from 'lodash/isEqual';

import {Box, Button, ClickAwayListener, Collapse} from "@mui/material";
import {DEFAULT_FILTERS, FiltersContext, FiltersType} from "../../contexts/filtersContext.ts";

interface FilterProps {
    name: string;
    children: React.ReactNode;
    handleOpenedFilter: (name: string, collapse: React.ReactNode) => void;
    openedFilter: string;
    filterName: keyof FiltersType;
    showCollapsable: boolean;
}


const Filter: React.FC<FilterProps> = ({
                                           name,
                                           children,
                                           handleOpenedFilter,
                                           openedFilter,
                                           filterName,
                                           showCollapsable: showCollapsable
                                       }) => {
    const [filters, _] = React.useContext(FiltersContext);

    const handleFilter = () => {
        handleOpenedFilter(name, children)
    }
    const handleClickAway = () => {
        if (openedFilter === name && showCollapsable) {
            handleFilter()
        }

    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box display="flex" flexDirection="column" width={"100%"}>
                <Button variant="contained" onClick={handleFilter}
                        sx={{height: "3em"}}
                        color={openedFilter === name && !showCollapsable ? "success" : isEqual(filters[filterName], DEFAULT_FILTERS[filterName]) ? "secondary" : "warning"}
                >
                    {openedFilter === name && !showCollapsable ? "אישור" : name}
                </Button>
                {showCollapsable ? (
                    <Collapse in={openedFilter === name} timeout="auto" unmountOnExit
                              sx={{
                                  backgroundColor: "secondary.main",
                                  borderBottomLeftRadius: "10px",
                                  borderBottomRightRadius: "10px",
                                  maxHeight: "25em",
                                  overflowY: "auto",
                                  position: "absolute",
                                  zIndex: 1,
                                  marginTop: "2.6em",
                                  width: "16.5em"
                              }}>
                        {children}
                    </Collapse>
                ) : <></>}
            </Box>
        </ClickAwayListener>
    )
}

export default Filter