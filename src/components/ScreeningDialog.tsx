import React from "react";
import {Box, Button, Dialog, DialogTitle, Typography} from "@mui/material";
import {ScreeningContext} from "../contexts/screeningContext.ts";
import {ScreeningsContext} from "../contexts/screeningsContext.ts";
import {MovieInfo} from "../types/movieInfo.ts";

const ScreeningDialog: React.FC = () => {
    const [screening, setScreening] = React.useContext(ScreeningContext);
    const {screeningsInfo} = React.useContext(ScreeningsContext);


    if (!screening) {
        return null;
    }

    const movieInfo: MovieInfo = screeningsInfo.movies.find(movie => movie.name === screening.title) ||
        {
            english_name: screening.title,
            name: screening.title,
            description: "לא נמצא מידע על הסרט",
            rating: -1,
            image_url: "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg",
        };

    const hour = screening.date.toLocaleTimeString('he', {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <Dialog open={true} onClose={() => setScreening(null)} sx={{direction: "rtl"}}
                PaperProps={{sx: {bgcolor: "primary.dark", borderRadius: "0.5em"}}}>
            <DialogTitle variant={"h3"} fontSize={{xs:"2em", md: "3em"}}
                         align={"center"}>{screening.title + (screening.dubbed ? " - מדובב":"")}</DialogTitle>
            <hr style={{width: "95%", marginBottom: "1em"}}/>
            <Box display={"flex"} maxHeight={"17em"} justifyContent={"space-between"}>
                <Box overflow={"auto"} dir={"ltr"} paddingRight={1} flexGrow="1">
                    <Box dir={"rtl"}>
                        <Typography variant={"h5"} fontSize={{xs:"1em", md: "1.5em"}}>{movieInfo.description}</Typography>
                    </Box>
                </Box>
                <Box display={"flex"} minWidth="11em" flexDirection="column" justifyContent={"center"}>
                    <Box component="img" src={movieInfo.image_url} alt={movieInfo.english_name}
                         sx={{height: "90%", width: "fit-content"}}/>
                    <Box display={"flex"} alignItems="center" justifyContent="center">
                        <Typography variant={"h5"} align={"center"}>{movieInfo.rating}</Typography>
                        <Box component="img" alt={movieInfo.english_name}
                             height={"3em"}
                             src={"https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png"}/>
                    </Box>
                </Box>
            </Box>

            <Typography variant={"h4"} align={"center"} marginTop="0.5em" fontSize={{xs:"1.5em", md: "2em"}}>{"שעה: " + hour}</Typography>
            <Typography variant={"h4"}
                        align={"center"}  fontSize={{xs:"1.5em", md: "2em"}}>{"קולנוע: " + screening.cinema.name + " " + screening.cinema.location}</Typography>
            <Button variant={"contained"}
                    sx={{
                        fontSize: "1.5em",
                        marginTop: "0.5em",
                        ':hover': {bgcolor: 'secondary.dark', color: 'secondary.contrastText'}
                    }}
                    color={"secondary"}
                    href={screening.link} target="_blank">
                {"להזמנת כרטיסים"}
            </Button>
        </Dialog>
    )
}
export default ScreeningDialog