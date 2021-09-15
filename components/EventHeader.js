import React from "react";
import Image from "next/image";
import EventDateTime from "./EventDateTime";
import styles from "../styles/Event.module.css";

export default function EventHeader(props) {
  const { event, preSale, saleStartDate, featured } = props;

  const hasAudio =
    event.apple_music_tracks.length > 0 || event.spotify_tracks.length > 0
      ? true
      : false;
  const audioLink = (event) => {
    if (event.spotify_tracks.length > 0) {
      return event.spotify_tracks[0].open_url;
    } else if (event.apple_music_tracks.length > 0) {
      return event.apple_music_tracks[0].open_url;
    }
  };

  const eventImage = featured
    ? { src: event.event_images.landscape, height: 384 }
    : { src: event.event_images.square, height: 640 };

  return (
    <div className={styles.imageHolder}>
      <Image
        src={eventImage.src}
        alt="band image"
        width={640}
        height={eventImage.height}
        className="card__image"
      />
      {!preSale && props.featured && (
        <div className={styles.featured}>FEATURED</div>
      )}
      {preSale && (
        <div className={styles.preSale}>
          On sale <EventDateTime date={saleStartDate} shortDate={true} />
        </div>
      )}
      {hasAudio && (
        <div className={styles.audio}>
          <a href={audioLink(event)} target="_blank" rel="noreferrer">
            <Image src="/play.svg" height={30} width={30} alt="play audio" />
          </a>
        </div>
      )}
    </div>
  );
}
