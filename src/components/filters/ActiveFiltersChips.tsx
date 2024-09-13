import React from "react";
import {FiltersContext, FiltersType} from "../../contexts/filtersContext.ts";
import {Box, Chip} from "@mui/material";
import {Cinema, generateCinemaTitle} from "../../types";
import _ from 'lodash';

const ActiveFiltersChips: React.FC<object> = () => {
    const [filters, setFilters] = React.useContext(FiltersContext);

    const removeFilter = (filter: string, type: keyof Omit<FiltersType, 'dub' | 'dates' | 'cinemas'>) => {
        setFilters((prevFilters) => {
            const prevFilter: string[] = filters[type]
            return {...prevFilters, [type]: prevFilter.filter((value) => value !== filter)}
        })
    }

    const createChips = (filters: string[], type: keyof Omit<FiltersType, 'dub' | 'dates' | 'cinemas'>) => {
        return filters.map((filter: string) => <Chip key={filter} label={filter} color={"warning"}
                                                     onDelete={() => removeFilter(filter, type)}
                                                     sx={{direction: 'ltr', margin: "3px"}}/>
        )
    }

    const removeCinemaFilter = (cinema: Cinema) => {
        setFilters((prevFilters) => {
            const prevCinemas: Cinema[] = filters.cinemas
            return {...prevFilters, cinemas: prevCinemas.filter((value) => !_.isEqual(value, cinema))}
        })
    }

    const createCinemasChips = (cinemas: Cinema[]) => {
        return cinemas.map((cinema: Cinema) => <Chip key={generateCinemaTitle(cinema)}
                                                     label={generateCinemaTitle(cinema)} color={"warning"}
                                                     onDelete={() => removeCinemaFilter(cinema)}
                                                     sx={{direction: 'ltr', margin: "3px"}}/>)
    }

    return (
        <Box maxWidth={"40em"} minHeight={"2.5em"}>
            {createCinemasChips(filters.cinemas)}
            {
                (Object.keys(filters) as Array<keyof FiltersType>).map((filterType: keyof FiltersType) => {
                    if (filterType !== 'dub' && filterType !== 'dates' && filterType !== 'cinemas' && filters[filterType].length > 0) {
                        return createChips(filters[filterType], filterType)
                    }
                })
            }
        </Box>
    )
}

export default ActiveFiltersChips