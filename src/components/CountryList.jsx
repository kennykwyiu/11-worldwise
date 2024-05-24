/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  const countires = [];

  return (
    <ul className={styles.countryList}>
      {countires.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
