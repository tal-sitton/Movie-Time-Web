import "react-day-picker/style.css";
import React from "react";
import {FiltersContext, FiltersType} from "../../contexts/filtersContext.ts";
import {DayPicker} from "react-day-picker";
import {he} from "date-fns/locale";

const addDays = (date: Date, days: number): Date => {
    const dateResult = new Date(date);
    dateResult.setDate(dateResult.getDate() + days);
    return dateResult;
}

const DateFilter: React.FC<object> = () => {

    const [filters, setFilters] = React.useContext(FiltersContext);

    const checkedDates = filters.dates;

    const today: Date = new Date()
    today.setHours(0, 0, 0, 0)

    const availableDates: Date[] = []

    for (let i = 0; i < 8; i++) {
        availableDates.push(addDays(today, i))
    }

    const setCheckedDays = (dates: Date[]) => {
        setFilters((prevFilters: FiltersType) => {
            return {
                ...prevFilters,
                dates: (dates.map(date => date.getTime() === today.getTime() ? new Date() : date))
            }
        })
    }

    return (
        <DayPicker
            captionLayout="label"
            dir="rtl"
            fixedWeeks
            hideNavigation
            mode="multiple"
            numberOfMonths={1}
            required
            showOutsideDays
            weekStartsOn={0}
            locale={he}
            selected={checkedDates}
            onSelect={setCheckedDays}
            disabled={(date: Date) => date < availableDates[0] || date > availableDates[availableDates.length - 1]}
        />
    )
}

export default DateFilter
