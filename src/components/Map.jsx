import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

function Map() {
  const { searchParams, setSearchParams } = useSearchParams();

  const lat = searchParams?.get("lat");
  const lng = searchParams?.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 25, lng: 300 });
        }}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
