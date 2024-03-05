import "./SearchItem.css";
import useCountryContext from "../../hooks/CountryHooks";
import { CityData } from "./SearchContainer";
import { Dispatch } from "react";

function SearchItem(
  props: CityData & {
    setQuery: Dispatch<React.SetStateAction<string>>;
  }
) {
  const { country, name, latitude, longitude, setQuery } = props;
  const { country: data, setCountry } = useCountryContext();

  function handleClick() {
    setCountry({
      country,
      name,
      latitude,
      longitude,
    });
    console.log(data);
    setQuery("");
  }

  return (
    <li className="search__list-item" onClick={handleClick}>
      <span className="search__country">{country}</span>
      <div className="search__location">
        <div>
          <span className="search__city">{name}</span>
        </div>
        <div>
          <span className="search__geolocation">
            Latitude: {latitude}, Longitude: {longitude}
          </span>
        </div>
      </div>
    </li>
  );
}

export default SearchItem;
