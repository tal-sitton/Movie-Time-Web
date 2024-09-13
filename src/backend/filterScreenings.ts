import {ScreeningInfo} from "../types";
import {FiltersType} from "../contexts/filtersContext.ts";
import _ from 'lodash';

const filterDate = (screening: ScreeningInfo, dates: Date[]): boolean => {
    return dates.some((date) => {
        return (
            screening.date.getDate() === date.getDate() &&
            screening.date.getMonth() === date.getMonth() &&
            screening.date.getFullYear() === date.getFullYear() &&
            screening.date.getTime() >= date.getTime()
        )
    })
}

const filterScreenings = (screenings: ScreeningInfo[], filters: FiltersType) => {
    return screenings.filter((screening) => {
        return (
            (filters.cinemas.length ? filters.cinemas.some((cinema) => _.isEqual(cinema, screening.cinema)) : true) &&
            (filters.movies.length ? filters.movies.includes(screening.title) : true) &&
            (filters.dates.length ? filterDate(screening, filters.dates) : true) &&
            (filters.types.length ? filters.types.includes(screening.type) : true) &&
            (!filters.dub ? !screening.dubbed : true)
        )
    }).sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const cachedFilterScreenings = _.memoize(filterScreenings, (_a, filters) => filters)