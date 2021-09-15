import { React } from "react";
import EventHeader from "./EventHeader";
import EventDateTime from "./EventDateTime";
import BookingAction from "./BookingAction";
import Price from "./Price";
import MoreInfo from "./MoreInfo";
import styles from "../styles/Event.module.css";

export default function Event(props) {
  const { event } = props;
  const date = new Date(event.date);
  const saleStartDate = new Date(event.sale_start_date);
  const preSale = saleStartDate > new Date();

  return (
    <>
      <EventHeader
        event={event}
        preSale={preSale}
        featured={props.featured}
        saleStartDate={saleStartDate}
      />

      <div>
        <EventDateTime date={date} />
      </div>
      <h3 className={styles.name}>{event.name}</h3>
      <h4 className={styles.venue}>{event.venue}</h4>
      <p className={styles.location}>
        {event.location.city}, {event.location.country}
      </p>

      <MoreInfo event={event} featured={props.featured} />

      <div className={styles.eventFooter}>
        <BookingAction event={event} preSale={preSale} />
        <Price ticketTypes={event.ticket_types} />
      </div>
    </>
  );
}
