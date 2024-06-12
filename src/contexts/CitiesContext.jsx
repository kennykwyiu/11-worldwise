import {
  act,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        // currentCity: action.payload,
      };
    case "cities/deleted":

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknow action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]); // eslint-disable-line no-unused-vars
  // const [isLoading, setIsLoading] = useState(false); // eslint-disable-line no-unused-vars
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      // const res = await fetch(`${BASE_URL}/cities/?id=${id}`);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      // const res = await fetch(`${BASE_URL}/cities/?id=${id}`);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "Post",
        body: JSON.stringify(newCity),
        headers: { "content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      setCities((cities) => [...cities, data]);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city.",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
