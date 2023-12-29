import React, { FC, useCallback, useMemo, useRef } from "react";
import { CheckBox } from "../atomic/CheckBox";
import FilterCard from "../FilterCard";
import { TRANSLATIONS, TimeFilters } from "./constants";
import Styles from "./Filters.module.scss";
import InputRange from "../atomic/InputRange";
import { SelectBox } from "../atomic/SelectBox";
import { FlightsType } from "../../types/flights";

interface Airline {
  code: string;
  name: string;
  logo_filename: string;
}

interface FiltersProps {
  data: FlightsType[];
  onFilter: () => void;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  selectedAirlines: string[];
  setSelectedAirlines: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  minPrice: number;
  maxPrice: number;
}

const Filters: FC<FiltersProps> = ({
  data,
  selectedTime,
  setSelectedTime,
  selectedAirlines,
  setSelectedAirlines,
  setPriceRange,
  minPrice,
  maxPrice
}) => {
  const multiRangeSliderRef = useRef<any>(null);

  const uniqueAirlines = useMemo(() => {
    const airlines: Airline[] = Array.from(
      new Set(data.map((flight) => flight.airline.code))
    ).map((code) => {
      const matchingFlight = data.find((flight) => flight.airline.code === code);
      return {
        code: matchingFlight?.airline.code || "",
        name: matchingFlight?.airline.name || "",
        logo_filename: matchingFlight?.airline.logo_filename || "",
      };
    });

    return airlines;
  }, [data]);

  const resetInputRange = useCallback(() => {
    multiRangeSliderRef.current?.handleReset();
  }, []);

  const handleRangeChange = useCallback((min: number, max: number) => {
    setPriceRange({ min, max });
  }, [setPriceRange]);

  const handleReset = useCallback(() => {
    setSelectedTime("0");
    setSelectedAirlines([]);
    setPriceRange({
      min: minPrice,
      max: maxPrice,
    });
    resetInputRange();
  }, [minPrice, maxPrice, resetInputRange, setSelectedTime, setSelectedAirlines, setPriceRange]);

  const handleTimeChange = useCallback((value: string) => {
    setSelectedTime(value);
  }, [setSelectedTime]);

  const handleAirlineChange = useCallback((airlineCode: string) => {
    setSelectedAirlines((prevSelectedAirlines) => {
      const updatedSelectedAirlines = prevSelectedAirlines.includes(airlineCode)
        ? prevSelectedAirlines.filter((code) => code !== airlineCode)
        : [...prevSelectedAirlines, airlineCode];
      return updatedSelectedAirlines;
    });

  }, [setSelectedAirlines]);

  return (
    <div className={Styles.filters}>
      <FilterCard
        resetTitle={TRANSLATIONS.resetFilters}
        filterTitle={TRANSLATIONS.filters}
        handleReset={handleReset}
      />
      <FilterCard label={TRANSLATIONS.byPrice}>
        <InputRange
          ref={multiRangeSliderRef}
          max={maxPrice}
          min={minPrice}
          onChange={handleRangeChange}
        />
      </FilterCard>
      <FilterCard label={TRANSLATIONS.byTime} icon>
        <SelectBox options={TimeFilters} value={selectedTime} onChange={handleTimeChange} />
      </FilterCard>
      <FilterCard label={TRANSLATIONS.byAirline} icon border={false}>
        <div className={Styles.airlines}>
          {uniqueAirlines.map((airline) => (
            <CheckBox
              key={airline.code}
              id={airline.code}
              title={airline.name}
              checked={selectedAirlines.includes(airline.code)}
              onChange={() => handleAirlineChange(airline.code)}
            />
          ))}
        </div>
      </FilterCard>
    </div>
  );
};

export default Filters;