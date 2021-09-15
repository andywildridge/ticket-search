import React from 'react';
import priceFormat from "../utils/priceFormat";
import styles from "../styles/Event.module.css";

export default function Price(props) {
  const { ticketTypes } = props;
  const minPrice = Math.min(...ticketTypes.map(ticket => ticket.price.total));
  return (
    <div className={styles.price}>
      {ticketTypes.length > 1 && <div className={styles.fromPrice}>FROM</div>}
      <div>{priceFormat(minPrice / 100)}</div>
    </div>
  );
}
