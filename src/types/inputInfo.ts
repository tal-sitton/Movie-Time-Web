import {MovieInfo} from "./movieInfo.ts";
import {ScreeningInfo} from "./screeningInfo.ts";

export interface InputScreeningInfo {
    cinema: string;
    coords: string[];
    date: string
    district: string
    dubbed: boolean
    eng_title: string
    link: string
    location: string
    time: string
    title: string
    type: string
}

export interface InputInfo {
    Movies: MovieInfo[];
    Screenings: InputScreeningInfo[];
}

export interface ParsedScreeningsInfo {
    movies: MovieInfo[];
    screenings: ScreeningInfo[];
}