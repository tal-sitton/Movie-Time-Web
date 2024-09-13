import React from "react";
import {Button, Typography} from "@mui/material";
import {ScreeningInfo} from "../types";
import {ScreeningContext} from "../contexts/screeningContext.ts";

interface ScreeningProps {
    info: ScreeningInfo
}


const Screening: React.FC<ScreeningProps> = ({info}) => {
    const [_, setScreening] = React.useContext(ScreeningContext);

    const title = `${info.title} (${info.type}) ${info.dubbed ? "מדובב" : ""}`;

    return (
        <Button
            color='primary'
            variant="contained"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                width: '100%',
                minHeight: {xs: "10em", md: "15em"},
                borderRadius: "1em",
                padding: "6px 10px"
            }}
            onClick={() => setScreening(info)}
        >

            <Typography sx={{textDecoration: 'underline'}}>{info.date.toLocaleTimeString('he', {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
            })}</Typography>

            <Typography fontSize={{xs: "1.05em", md: "1.5em"}} fontWeight={"bold"}
                        sx={{direction: "rtl"}}>{title}</Typography>
            <div>
                <Typography variant={"body1"} fontSize={{xs: "1em", md: "1.2em"}} fontWeight={"bold"} >{info.cinema.location}</Typography>
                <Typography variant={"body2"} fontSize={{xs: "1em", md: "1.2em"}}>{info.cinema.name}</Typography>
            </div>
        </Button>
    )
}
export default Screening