import {ScreeningInfo} from "../types";
import _ from 'lodash';
import {FiltersType} from "../contexts/filtersContext.ts";
import {cachedFilterScreenings} from "./filterScreenings.ts";

const fetchMoviesFromScreenings = (screenings: ScreeningInfo[], filters: FiltersType): string[] => {
    screenings = cachedFilterScreenings(screenings, {...filters, movies: []})
    return Array.from(new Set(screenings.map(s => s.title)))
        .sort((a, b) => (Number(filters.movies.includes(b)) - Number(filters.movies.includes(a))) || a.localeCompare(b));
}

// use memoize to cache the result of fetchCinemasFromScreenings, resolver is the second argument
export const cachedFetchMoviesFromScreenings = _.memoize(fetchMoviesFromScreenings, (_a, filters) => filters)