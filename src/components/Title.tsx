import React from "react";
import icon from '../assets/icon.png'
import {Box} from "@mui/material";

function Title(): React.JSX.Element {

    return (
        <Box display="flex" alignItems="center" sx={{direction:"ltr"}} justifyContent={"center"}>
            <Box component="img" src={icon} alt="Movie Time logo" sx={{maxWidth: "7em"}}/>
            <h1>
                Movie Time
            </h1>
        </Box>
    )
}

export default Title
