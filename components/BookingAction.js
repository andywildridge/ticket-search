import React from "react";
import styles from "../styles/BookingAction.module.css";

export default function BookingAction(props) {
  const { event, preSale } = props;
  if (!event.sold_out && !preSale)
    return <button className={styles.bookNow}>BOOK NOW</button>;
  if (event.sold_out) return <div className={styles.soldOut}>SOLD OUT</div>;
  return <button className={styles.bookNow}>GET REMINDED</button>;
}
