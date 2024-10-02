import React, {useEffect, useState} from "react";
import Screening from "./Screening.tsx";
import Grid from '@mui/material/Unstable_Grid2';
import {ScreeningsContext} from "../contexts/screeningsContext.ts";
import {ScreeningInfo} from "../types";
import {Box, Typography} from "@mui/material";
import noResults from "../assets/no-results.png";

const Screenings: React.FC<{
    shouldUpdateScreenings: boolean,
    setShouldUpdateScreenings: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({shouldUpdateScreenings, setShouldUpdateScreenings}) => {

    const itemsPerLoad = 50
    const {filteredScreenings} = React.useContext(ScreeningsContext);

    const [visibleItems, setVisibleItems] = useState<ScreeningInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Initially load a few items
        loadMoreItems();
    }, [filteredScreenings]);

    const loadMoreItems = () => {
        setIsLoading(true);
        if (filteredScreenings) {
            if (shouldUpdateScreenings) {
                const newItems = filteredScreenings.slice(
                    0,
                    itemsPerLoad
                );
                setVisibleItems(newItems);
                setShouldUpdateScreenings(false);
            } else {
                const newItems = filteredScreenings.slice(
                    visibleItems.length,
                    visibleItems.length + itemsPerLoad
                );
                setVisibleItems((prevItems) => [...prevItems, ...newItems]);
            }
        } else {
            setVisibleItems([]);
        }
        setIsLoading(false);
    };

    const handleScroll = () => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

        if (
            scrollHeight - scrollTop <= clientHeight + 500 && // Check if user is near the bottom
            !isLoading && // Ensure no other load operation is ongoing
            filteredScreenings && // Ensure filteredScreenings is not null/undefined
            visibleItems.length < filteredScreenings.length // Ensure there are more items to load
        ) {
            loadMoreItems();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoading, filteredScreenings, visibleItems]);

    return <>
    {visibleItems.length ? <Grid container spacing={{xs: 0.5, md: 2}} justifyContent={'center'}
                                 sx={{/*height: {xs: '40vh', md: '62vh'},*/ overflowY: 'auto'}} onScroll={handleScroll}
                                 flexDirection={"row-reverse"}>
            {visibleItems?.map((screeningInfo, index) => {
                return <Grid key={index} xs={4} md={2}>
                    <Screening info={screeningInfo}/>
                </Grid>
            })}
        </Grid>
        : <Box>
            <Typography variant={"h4"} fontFamily={"Rubik Dirt"}>לא נמצאו הקרנות</Typography>
            <img src={noResults} alt={"no results found"} style={{width: "13em"}}/>
            <Typography variant={"h4"}>נסה לבחור יום אחר, או סינונים אחרים</Typography>
        </Box>

    }
    </>;
}

export default Screenings