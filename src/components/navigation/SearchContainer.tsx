import { Dispatch, useEffect } from "react";
import "./SearchContainer.css";
import SearchItem from "./SearchItem";

export type CityData = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

function SearchContainer(props: {
  query: string;
  isLoading: boolean;
  setQuery: Dispatch<React.SetStateAction<string>>;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  setCities: Dispatch<React.SetStateAction<CityData[]>>;
  cities: CityData[];
}) {
  const { query, isLoading, setIsLoading, setQuery, setCities, cities } = props;
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query) {
        const data = await fetchCities(query);
        setIsLoading(false);

        setCities(
          data.map(
            (element: {
              name: string;
              latitude: number;
              longitude: number;
              country: string;
              population: number;
              is_capital: boolean;
            }) => {
              return {
                name: element.name,
                latitude: element.latitude,
                longitude: element.longitude,
                country: element.country,
              };
            }
          )
        );
      } else {
        setCities([]);
        setIsLoading(false);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [query, setIsLoading, setCities]);

  async function fetchCities(query: string) {
    try {
      const url: string = `https://api.api-ninjas.com/v1/city?name=${query}&limit=5`;

      const response = await fetch(url, {
        headers: {
          "X-Api-Key": "FepNx2009aiODhuEpUeJuQ==eSNDaznaPlKYXeat",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    } catch (error) {
      return [];
    }
  }
  return (
    <div
      className={`search__container${
        (cities.length > 0 && !isLoading) || isLoading || query !== ""
          ? " active"
          : ""
      }`}
    >
      {cities.length > 0 && !isLoading && (
        <ul className="search__list">
          {cities.map((e, i) => (
            <SearchItem
              key={i}
              name={e.name}
              longitude={e.longitude}
              latitude={e.latitude}
              country={e.country}
              setQuery={setQuery}
            />
          ))}
        </ul>
      )}
      {isLoading && <div className="search__loading">Searching...</div>}
    </div>
  );
}

export default SearchContainer;
