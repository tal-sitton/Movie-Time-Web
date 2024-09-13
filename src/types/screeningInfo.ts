export interface Cinema {
    name: string
    location: string
}

export const generateCinemaTitle = (cinema: Cinema) => `${cinema.name} - ${cinema.location}`

export interface ScreeningInfo {
    cinema: Cinema;
    coords: string[];
    date: Date;
    district: string;
    dubbed: boolean;
    engTitle: string;
    link: string;
    title: string;
    type: string;
}