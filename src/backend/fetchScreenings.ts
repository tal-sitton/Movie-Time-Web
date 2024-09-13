import {useQuery} from "react-query";
import {InputInfo, ParsedScreeningsInfo} from "../types/inputInfo.ts";
import {ScreeningInfo} from "../types";

const parseScreenings = (rawInfo: InputInfo): ParsedScreeningsInfo => {
    const parsedInfo: ParsedScreeningsInfo = {movies: rawInfo.Movies, screenings: []};
    parsedInfo.screenings = rawInfo.Screenings.map((screening): ScreeningInfo => {
        const dateParts = screening.date.split("-").map((part) => parseInt(part));
        const timeParts = screening.time.split(":").map((part) => parseInt(part));
        const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);
        return {
            cinema: {name: screening.cinema, location: screening.location},
            coords: screening.coords,
            date,
            district: screening.district,
            dubbed: screening.dubbed,
            engTitle: screening.eng_title,
            link: screening.link,
            title: screening.title,
            type: screening.type
        };
    });
    return parsedInfo;
}

const fetchScreenings = async (): Promise<ParsedScreeningsInfo> => {
    const res = await fetch("https://raw.githubusercontent.com/tal-sitton/Movie-Time-Server/master/movies.json");
    const rawInfo: InputInfo = await res.json();
    return parseScreenings(rawInfo);
};
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
export const useFetchScreenings = () => {
    return useQuery("screenings", fetchScreenings, {staleTime: DAY_IN_MILLISECONDS, cacheTime: Infinity});
}