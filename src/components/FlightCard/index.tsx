import { FC } from "react";
import { FlightsType } from "../../types/flights";
import Styles from './FlightCard.module.scss'
type Props = {
    flight: FlightsType
}
const FlightCard: FC<Props> = ({flight}) => {
  return (
    <div className={Styles.card}>
        <div className={Styles.titleSec}>
            <img src={flight.airline.logo_filename} alt={flight.airline.name} />
            <p>{flight.airline.name}</p>
        </div>
        <div className={Styles.timeSec}>
            <p>{flight.flightTime}</p>
            <p>{flight.arrivalTime}</p>
        </div>
        <div className={Styles.dateSec}>

        </div>
        <div className={Styles.priceSec}>
            <div>{flight.price}<span>تومان</span></div>
        </div>
    </div>
  )
}
export default FlightCard;