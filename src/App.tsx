import './App.css'
import React, {useEffect} from "react";
import Title from "./components/Title.tsx";
import Filters from "./components/Filters.tsx";
import {DEFAULT_FILTERS, FiltersContext} from "./contexts/filtersContext.ts";
import Screenings from "./components/Screenings.tsx";
import {Box, CircularProgress, createTheme, ThemeProvider} from "@mui/material";
import {ScreeningContext} from "./contexts/screeningContext.ts";
import {ScreeningInfo} from "./types";
import ScreeningDialog from "./components/ScreeningDialog.tsx";
import {useFetchScreenings} from "./backend/fetchScreenings.ts";
import {ScreeningsContext} from "./contexts/screeningsContext.ts";
import {cachedFilterScreenings} from "./backend/filterScreenings.ts";
import {SmallDeviceContext} from "./contexts/smallDeviceContext.ts";

function App(): React.JSX.Element {

    const [filters, setFilters] = React.useState(DEFAULT_FILTERS);
    const [prevFilters, setPrevFilters] = React.useState(DEFAULT_FILTERS);
    const [screening, _setScreening] = React.useState<ScreeningInfo | null>(null);
    const [filteredScreenings, setFilteredScreenings] = React.useState<ScreeningInfo[] | undefined>(undefined);
    const [shouldUpdateScreenings, setShouldUpdateScreenings] = React.useState<boolean>(false);
    const [isSmallScreen, setIsSmallScreen] = React.useState<boolean>(false);
    const [isOpendFilter, setIsOpendFilter] = React.useState<boolean>(false);
    const {data: screenings, status} = useFetchScreenings()

    const setScreening: React.Dispatch<React.SetStateAction<ScreeningInfo | null>> = (_screening: React.SetStateAction<ScreeningInfo | null>) => {
        if (_screening) {
            window.history.pushState({screeningDialogOpen: true}, '');
            window.history.pushState({screeningDialogOpen: true}, '');
            _setScreening(_screening);
        } else {
            window.history.back();
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                contrastText: '#fff',
                main: '#0AAFC3',
            },
            secondary: {
                main: '#6200EE',
                dark: '#4502aa',
                light: '#7d4dff',
                contrastText: '#fff',
            },
        },
        direction: 'rtl',
        typography: {
            fontFamily: [
                'Rubik',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    });

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.screeningDialogOpen) {
                // If dialog state exists, close the dialog instead of navigating back
                _setScreening(null);
            } else {
                // If no dialog state, allow the browser to navigate back normally
                window.history.go(-1);
            }
        };

        // Listen for the popstate event
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    if (!screenings) {
        if (status === "error") {
            return <div>Failed to load data</div>
        }
        return <CircularProgress/>
    }

    if (filters !== prevFilters || filteredScreenings === undefined) {
        const filtered = cachedFilterScreenings(screenings.screenings, filters)
        setFilteredScreenings(filtered)
        setPrevFilters(filters)
        setShouldUpdateScreenings(true)
    }


    return (
        <ThemeProvider theme={theme}>
            <SmallDeviceContext.Provider value={isSmallScreen}>
                <FiltersContext.Provider value={[filters, setFilters]}>
                    <ScreeningContext.Provider value={[screening, setScreening]}>
                        <ScreeningsContext.Provider
                            value={{screeningsInfo: screenings, filteredScreenings, setFilteredScreenings}}>
                            <Box width="90vw" maxWidth="80em" padding={"16px"}>
                                <Box position='sticky' top='0px' zIndex={1} paddingBottom={'1em'} id={'header'}>
                                    <Title/>
                                    <Filters setIsOpendFilter={setIsOpendFilter}/>
                                </Box>
                                {!isOpendFilter &&
                                    <Screenings shouldUpdateScreenings={shouldUpdateScreenings}
                                                setShouldUpdateScreenings={setShouldUpdateScreenings}/>
                                }
                                <ScreeningDialog/>
                            </Box>
                        </ScreeningsContext.Provider>
                    </ScreeningContext.Provider>
                </FiltersContext.Provider>
            </SmallDeviceContext.Provider>
        </ThemeProvider>
    )
}

export default App
