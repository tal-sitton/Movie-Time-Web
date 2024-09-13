import React from "react";
import {Box, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import {FiltersContext, FiltersType} from "../../contexts/filtersContext.ts";
import {cachedFetchMoviesFromScreenings} from "../../backend/fetchMovies.ts";
import {ScreeningsContext} from "../../contexts/screeningsContext.ts";


const MovieFilter: React.FC<object> = () => {

    const [filters, setFilters] = React.useContext(FiltersContext);
    const [search, setSearch] = React.useState("");
    const {screeningsInfo} = React.useContext(ScreeningsContext);


    const checkedMovies = filters.movies;

    const setCheckedMovies = (set: (prevChecked: string[]) => string[]) => {
        setFilters((prevFilters: FiltersType) => {
            const prevMovies = prevFilters.movies
            return {...prevFilters, movies: set(prevMovies)}
        })
    }

    const movies: string[] = cachedFetchMoviesFromScreenings(screeningsInfo.screenings, filters)

    const visibleMovies: string[] = movies.filter((movie) => movie.includes(search))

    const handleToggle = (movie: string) => {
        if (checkedMovies.indexOf(movie) === -1) {
            setCheckedMovies((prevChecked) => [...prevChecked, movie])
        } else {
            setCheckedMovies((prevChecked) => prevChecked.filter((value) => value !== movie))
        }
    }

    return (
        <Box display="flex" alignItems="center" sx={{color: "white"}}>
            <List
                sx={{width: "100%"}}
                component="nav"
            >
                <ListItem>
                    <TextField variant="standard" value={search} onChange={(e) => setSearch(e.target.value)}
                               placeholder={"חיפוש"} sx={{input: {color: 'white'}}}/>
                </ListItem>
                {
                    visibleMovies.map((movie: string) =>
                        <ListItemButton onClick={() => handleToggle(movie)} key={movie}>
                            <ListItemIcon>
                                <Checkbox checked={checkedMovies.indexOf(movie) !== -1}/>
                            </ListItemIcon>
                            <ListItemText primary={movie}/>
                        </ListItemButton>
                    )
                }
            </List>
        </Box>
    )
}

export default MovieFilter
