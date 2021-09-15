import { React, useState } from 'react';
import styles from "../styles/VenueInput.module.css";

export default function VenueInput(props) {
  const [searchValue, setSearchValue] = useState('');
  const venueSearch = (e) => {
    e.preventDefault();
    props.venueSearch(searchValue);
  }
  const handleSearchterm = (e) => {
    setSearchValue(e.target.value);
  }
  return (
    <form onSubmit={venueSearch}>
      <input
        type="search"
        onChange={handleSearchterm}
        className={styles.search}
      />
      <button>Search</button>
    </form>
  );
}
