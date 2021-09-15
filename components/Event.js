import { React, useState } from "react";
import Image from "next/image";
import EventDateTime from "./EventDateTime";
import BookingAction from "./BookingAction";
import styles from "../styles/Event.module.css";

export default function Event(props) {
  const [showMoreInfo, toggleShowMoreInfo] = useState(props.featured);
  const { event } = props;
  const date = new Date(event.date);
  const saleStartDate = new Date(event.sale_start_date);
  const advanceBooking = saleStartDate > new Date();
  const hasAudio =
    event.apple_music_tracks.length > 0 || event.spotify_tracks.length > 0
      ? true
      : false;

  console.log(event);

  const priceFormat = (amount) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    })
      .format(amount)
      .replace(".00", "");

  const handleToggleShowMore = () => {
    toggleShowMoreInfo((prevState) => (prevState ? false : true));
  };

  const eventImage = props.featured
    ? { src: event.event_images.landscape, height: 384 }
    : { src: event.event_images.square, height: 640 };

  return (
    <>
      <div className={styles.imageHolder}>
        <Image
          src={eventImage.src}
          alt="band image"
          width={640}
          height={eventImage.height}
          className="card__image"
        />
        {props.featured && <div className={styles.featured}>FEATURED</div>}
        {hasAudio && (
          <div className={styles.audio}>
            <Image src="/play.svg" height={30} width={30} alt="play audio" />
          </div>
        )}
      </div>
      {advanceBooking && <p>ADVANCEBOOKING</p>}

      {date && <EventDateTime date={date} />}
      <h3 className={styles.name}>{event.name}</h3>
      <h4 className={styles.venue}>{event.venue}</h4>
      <p className={styles.location}>
        {event.location.city}, {event.location.country}
      </p>
      {event.featured && (
        <div>--- ---- ---- ---- FEATURED ---- ---- ---- ----</div>
      )}
      <div className={styles.moreInfo}>
        <p className={styles.moreInfoLabel} onClick={handleToggleShowMore}>
          <strong>More info</strong>
        </p>
        <div className={styles.icon}>+</div>
        {showMoreInfo && (
          <>
            <div className={styles.description}>{event.description}</div>
            <div className={styles.moreInfoSection}>
              <p className={styles.label}>LINE UP</p>
              {event.lineup.map((item) => {
                return (
                  <p key={item.details}>
                    {item.details}{" "}
                    {item.time.length > 0 && (
                      <>
                        {" "}
                        - <strong>{item.time}</strong>
                      </>
                    )}
                  </p>
                );
              })}
            </div>
            <div className={styles.moreInfoSection}>
              <p className={styles.label}>TICKETS</p>
              {event.ticket_types.map((ticket) => {
                return (
                  <p key={ticket.id}>
                    {ticket.name}{" "}
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
      <div className={styles.eventFooter}>
        <BookingAction event={event} advanceBooking={advanceBooking} />
        <div className={styles.price}>
          {priceFormat(event.ticket_types[0].price.total / 100)}
        </div>
      </div>
    </>
  );
}
