import {Cinema, ScreeningInfo} from "../types";
import _ from 'lodash';
import {FiltersType} from "../contexts/filtersContext.ts";
import {cachedFilterScreenings} from "./filterScreenings.ts";

const fetchCinemasFromScreenings = (screenings: ScreeningInfo[], filters: FiltersType): Record<string, Cinema[]> => {
    screenings = cachedFilterScreenings(screenings, {...filters, cinemas: []})
    const cinemas: Record<string, Cinema[]> = {}
    screenings.forEach((screening) => {
        if (!cinemas[screening.district]) {
            cinemas[screening.district] = []
        }
        if (!cinemas[screening.district].some((cinema) => _.isEqual(cinema, screening.cinema))) {
            cinemas[screening.district].push(screening.cinema)
        }
    })
    return cinemas
}

// use memoize to cache the result of fetchCinemasFromScreenings, resolver is the second argument
export const cachedFetchCinemasFromScreenings = _.memoize(fetchCinemasFromScreenings, (_a, filters) => filters)