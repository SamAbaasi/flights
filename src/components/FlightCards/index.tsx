import { FC } from "react";
import FlightCard from "../FlightCard";
import { FlightsType } from "../../types/flights";

type Props = {
  flights: FlightsType[]
}
const FlightCards: FC<Props> = ({flights}) => {
  return (
    <div>
        {
        flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
          )
        )
        }
    </div>
  )
}
export default FlightCards;