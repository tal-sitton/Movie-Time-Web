import React from "react";
import {Box, Checkbox, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {FiltersContext, FiltersType} from "../../contexts/filtersContext.ts";


const TypeFilter: React.FC<object> = () => {

    const [filters, setFilters] = React.useContext(FiltersContext);

    const checkedTypes = filters.types;

    const setCheckedTypes = (set: (prevChecked: string[]) => string[]) => {
        setFilters((prevFilters: FiltersType) => {
            const prevTypes = prevFilters.types
            return {...prevFilters, types: set(prevTypes)}
        })
    }

    const availableTypes: string[] = [
        "2D",
        "3D",
        "IMAX",
        "VIP",
        "SCREENX",
        "4DX",
    ]

    const handleToggle = (type: string) => {
        if (checkedTypes.indexOf(type) === -1) {
            setCheckedTypes((prevChecked) => [...prevChecked, type])
        } else {
            setCheckedTypes((prevChecked) => prevChecked.filter((value) => value !== type))
        }
    }

    return (
        <Box display="flex" alignItems="center">
            <List
                sx={{width: "100%"}}
                component="nav"
            >
                {
                    availableTypes.map((type: string) =>
                        <ListItemButton onClick={() => handleToggle(type)} key={type}>
                            <ListItemIcon>
                                <Checkbox checked={checkedTypes.indexOf(type) !== -1}/>
                            </ListItemIcon>
                            <ListItemText primary={type}/>
                        </ListItemButton>
                    )
                }
            </List>
        </Box>
    )
}

export default TypeFilter
