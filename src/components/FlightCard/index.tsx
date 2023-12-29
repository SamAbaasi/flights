import { FC } from "react";
import { FlightsType } from "../../types/flights";
import Styles from './FlightCard.module.scss'
import { convertTimeToHour, convertTimeToPersianDate, formatPrice } from "../../utils";
type Props = {
    flight: FlightsType
}
const FlightCard: FC<Props> = ({flight}) => {
  return (
    <div className={Styles.card}>
        <div className={Styles.titleSec}>
            <img className={Styles.logo} src={flight.airline.logo_filename} alt={flight.airline.name} />
            <h3 className={Styles.flight}>{flight.airline.name}</h3>
        </div>
        <div className={Styles.timeSec}>
            <p>{convertTimeToHour(flight.flightTime)}</p>
            <span className={Styles.arrow}>{'---->'}</span>
            <p>{convertTimeToHour(flight.arrivalTime)}</p>
        </div>
        <div className={Styles.dateSec}>
            {convertTimeToPersianDate(flight.flightTime)}
        </div>
        <div className={Styles.priceSec}>
            <div>{formatPrice(flight.price)}<span className={Styles.currency}>تومان</span></div>
        </div>
    </div>
  )
}
export default FlightCard;