import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useCallback } from "react";
import Card from "../components/Card";
import Event from "../components/Event";
import VenueInput from "../components/VenueInput";

export default function Home() {
  const [venue, setVenue] = useState("");
  const [eventList, setEventList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchUrl = `https://events-api.dice.fm/v1/events?page[number]=1&page[size]=12&sort[order]=asc&filter[venues]`;

  const getEvents = async (url) => {
    setIsLoading(true);
    setShowMore(false);
    const res = await fetch("/api/gigs?url=" + encodeURIComponent(url));
    const resultJSON = await res.json();
    setEventList(prev => [...prev, ...resultJSON.data]);
    if (resultJSON?.links?.next) {
      setShowMore(resultJSON.links.next);
    }
    setIsLoading(false);
  };

  const loadMoreEvents = () => {
    setShowMore(false);
    getEvents(showMore);
  };

  const handleVenueSearch = (venue) => {
    setEventList([]);
    setVenue(venue);
    getEvents(`${searchUrl}=${venue}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dice.fm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://dice.fm/favicon.ico" />
      </Head>

      <VenueInput venueSearch={handleVenueSearch} />
      {venue.length > 0 && (
        <p>
          Upcoming events at <strong>{venue}</strong>
        </p>
      )}

      <main>
        {!isLoading && !eventList.length > 0 && <p>No results</p>}
        {eventList.length > 0 && (
          <div className={styles.grid}>
            {eventList.map((event, index) => {
              return (
                /* 
                  Set status of first result to 'featured',
                  iterate and display results
                */
                <Card key={event.id}>
                  <Event event={event} featured={index === 0 ? true : false} />
                </Card>
              );
            })}
          </div>
        )}
        {isLoading && <div className={styles.loading}>Loading...</div>}
        {showMore && (
          <button onClick={loadMoreEvents} className={styles.loadMore}>
            Load More
          </button>
        )}
      </main>
    </div>
  );
}
