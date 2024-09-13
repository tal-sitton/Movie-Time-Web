import React from "react";
import {Box, Checkbox, Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {FiltersContext, FiltersType} from "../../contexts/filtersContext.ts";
import {Cinema, generateCinemaTitle} from "../../types";
import _ from 'lodash';
import {cachedFetchCinemasFromScreenings} from "../../backend/fetchCinemas.ts";
import {ScreeningsContext} from "../../contexts/screeningsContext.ts";


const CinemaFilter: React.FC<object> = () => {

    const [open, setOpen] = React.useState("");
    const [filters, setFilters] = React.useContext(FiltersContext);
    const {screeningsInfo} = React.useContext(ScreeningsContext);


    const checkedCinemas = filters.cinemas;

    const setCheckedCinemas = (set: (prevChecked: Cinema[]) => Cinema[]) => {
        setFilters((prevFilters: FiltersType) => {
            const prevCinemas = prevFilters.cinemas
            return {...prevFilters, cinemas: set(prevCinemas)}
        })
    }

    const cinemas: Record<string, Cinema[]> = cachedFetchCinemasFromScreenings(screeningsInfo.screenings, filters)

    const isCinemaChecked = (cinema: Cinema) => checkedCinemas.some((checkedCinema) => _.isEqual(checkedCinema, cinema))

    const handleToggle = (cinema: Cinema) => {
        if (!isCinemaChecked(cinema)) {
            setCheckedCinemas((prevChecked) => [...prevChecked, cinema])
        } else {
            setCheckedCinemas((prevChecked) => prevChecked.filter((value) => value !== cinema))
        }
    }

    const handleOpen = (region: string) => {
        if (open == region) {
            setOpen("")
        } else {
            setOpen(region)
        }
    }

    return (
        <Box display="flex" alignItems="center">
            <List
                sx={{width: "100%"}}
                component="nav"
            >
                {
                    Object.keys(cinemas).map((region: string) =>
                        <Box key={region}>
                            <ListItemButton onClick={() => handleOpen(region)}>
                                <ListItemText primary={region}/>
                                {open == region ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>

                            <Collapse in={open == region} timeout="auto" unmountOnExit>
                                <List>
                                    {
                                        cinemas[region].map((cinema: Cinema) => {
                                                const cinemaTitle = generateCinemaTitle(cinema)
                                                return (
                                                    <ListItemButton onClick={() => handleToggle(cinema)} key={cinemaTitle}>
                                                        <ListItemIcon>
                                                            <Checkbox checked={isCinemaChecked(cinema)}/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={cinemaTitle}/>
                                                    </ListItemButton>
                                                )
                                            }
                                        )
                                    }
                                </List>
                            </Collapse>
                        </Box>
                    )
                }
            </List>
        </Box>
    )
}

export default CinemaFilter
