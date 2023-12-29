import { FC, useState, useCallback, useEffect, useMemo } from 'react';
import Filters from '../../components/Filters';
import Styles from './Flights.module.scss';
import FlightCards from '../../components/FlightCards';
import { TRANSLATIONS } from './constants';
import { MockData } from './constants';
import { FlightsType } from '../../types/flights';
import { TimeFilters } from './constants';

type Props = {};

const Flights: FC<Props> = () => {
  const [data] = useState<FlightsType[]>(MockData);
  const [filteredData, setFilteredData] = useState<FlightsType[]>(data);
  const minPrice = useMemo(() => minPriceCal(data), [data]);
  const maxPrice = useMemo(() => maxPriceCal(data), [data]);
  const [selectedTime, setSelectedTime] = useState<string>('0');
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: minPrice,
    max: maxPrice,
  });

  const handleFilter = useCallback(() => {
    const filteredData = data.filter((flight) => {
      if (selectedTime !== '0') {
        const selectedTimeFilter = TimeFilters.find(
          (filter) => filter.value === parseInt(selectedTime, 10)
        );
        if (selectedTimeFilter) {
          const filterStartHour = selectedTimeFilter.value * 6;
          const filterEndHour = (selectedTimeFilter.value + 1) * 6;
          const flightHour = parseInt(
            flight.flightTime.split('T')[1].split(':')[0],
            10
          );
          if (!(flightHour >= filterStartHour && flightHour < filterEndHour)) {
            return false;
          }
        }
      }

      const flightPrice = parseFloat(flight.price);
      if (flightPrice < priceRange.min || flightPrice > priceRange.max) {
        return false;
      }

      if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline.code)) {
        return false;
      }

      return true;
    });

    setFilteredData(filteredData);
  }, [data, selectedTime, priceRange, selectedAirlines]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <div>
      <h1>{TRANSLATIONS.header}</h1>
      <div className={Styles.flightsContainer}>
        <div className={Styles.filters}>
          <Filters
            data={data}
            onFilter={handleFilter}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
        <FlightCards flights={filteredData} />
      </div>
    </div>
  );
};

export default Flights;

function maxPriceCal(data: FlightsType[]) {
  return Math.max(...data.map((flight) => parseFloat(flight.price)));
}

function minPriceCal(data: FlightsType[]) {
  return Math.min(...data.map((flight) => parseFloat(flight.price)));
}
