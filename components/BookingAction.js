import React from "react";
import styles from "../styles/Event.module.css";

export default function BookingAction(props) {
  const { event, advanceBooking } = props;
  if (!event.sold_out && !advanceBooking)
    return <button className={styles.bookNow}>BOOK NOW</button>;
  if (event.sold_out) return <div className={styles.soldOut}>SOLD OUT</div>;
  return <button className={styles.bookNow}>GET REMINDED</button>;
}
