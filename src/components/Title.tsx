import React from "react";
import icon from '../assets/icon.png'
import {Box, Typography} from "@mui/material";

function Title(): React.JSX.Element {

    return (
        <Box display="flex" alignItems="center" sx={{direction:"ltr"}} justifyContent={"center"}>
            <Box component="img" src={icon} alt="Movie Time logo" sx={{maxWidth: "7em"}}/>
            <Typography variant={"h1"} fontSize={{xs: "2.5em", md:"3em"}} lineHeight={1.1} fontWeight={"bold"}>
                Movie Time
            </Typography>
        </Box>
    )
}

export default Title
