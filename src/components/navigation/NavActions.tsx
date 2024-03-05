import { ChangeEvent, useState } from "react";
import "./NavActions.css";
import SearchContainer, { CityData } from "./SearchContainer";
import { useDebounce } from "@uidotdev/usehooks";

function NavActions() {
  const [cities, setCities] = useState<CityData[] | []>([]);
  const [country, setCountry] = useState("");
  const debounceCountry = useDebounce(country, 200);
  const [isLoading, setIsLoading] = useState(false);
  function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    setCountry(event.target.value);
  }

  return (
    <div className="header__actions">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="header__search-icon"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="text"
        className="header__search"
        value={country}
        onChange={handleChangeSearch}
        onBlur={() => {
          setTimeout(() => {
            setCities([]);
            setCountry("");
          }, 300);
        }}
      ></input>
      <a>Other Projects</a>
      <SearchContainer
        query={debounceCountry}
        setQuery={setCountry}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setCities={setCities}
        cities={cities}
      />
    </div>
  );
}

export default NavActions;
