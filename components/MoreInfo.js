import { React, useState } from "react";
import priceFormat from "../utils/priceFormat";
import styles from "../styles/MoreInfo.module.css";

export default function MoreInfo(props) {
  const [showMoreInfo, toggleShowMoreInfo] = useState(props.featured);
  const { event } = props;

  const handleToggleShowMore = () => {
    toggleShowMoreInfo((prevState) => (prevState ? false : true));
  };
  return (
    <div className={styles.moreInfo}>
      <p className={styles.moreInfoLabel} onClick={handleToggleShowMore}>
        <strong>More info</strong>
      </p>
      <div className={styles.icon}>+</div>
      {showMoreInfo && (
        <>
          <div className={styles.description}>{event.description}</div>
          <p className={styles.label}>LINE UP</p>
          <div role="list" className={styles.moreInfoSection}>
            {event.lineup.map((item) => {
              return (
                <p role="listitem" key={item.details}>
                  {item.details}{" "}
                  {item.time.length > 0 && (
                    <>
                      {" - "}
                      <strong>{item.time}</strong>
                    </>
                  )}
                </p>
              );
            })}
          </div>
          <p className={styles.label}>TICKETS</p>
          <div role="list" className={styles.moreInfoSection}>
            {event.ticket_types.map((ticket) => {
              return (
                <p role="listitem" key={ticket.id}>
                  {ticket.name}
                  {" - "}
                  <strong>{priceFormat(ticket.price.total / 100)}</strong>{" "}
                  {ticket.sold_out && (
                    <span className={styles.soldOutTicket}>SOLD OUT</span>
                  )}
                </p>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
