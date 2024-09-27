import React from "react";
import {FormControlLabel, Switch} from "@mui/material";
import {FiltersContext, FiltersType} from "../../contexts/filtersContext.ts";


const DubFilter: React.FC<object> = () => {

    const [filters, setFilters] = React.useContext(FiltersContext);

    const checkedDubbed = filters.dub;

    const setCheckedDubbed = (dub: boolean) => {
        setFilters((prevFilters: FiltersType) => {
            return {...prevFilters, dub}
        })
    }

    return (
        <FormControlLabel sx={{width: {md: "100%"}}} id={"dubbed-filter"}
                          control={
                              <Switch
                                  checked={checkedDubbed}
                                  onChange={(_, checked) => setCheckedDubbed(checked)}
                              />}
                          label="אפשר מדובב"/>
    )
}

export default DubFilter
