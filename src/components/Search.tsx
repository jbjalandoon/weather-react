import "./Search.css";
import { ChangeEvent, useState } from "react";
import SearchContainer, { CityData } from "./navigation/SearchContainer";
import { useDebounce } from "@uidotdev/usehooks";

function Search(props: { className: string | undefined }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className } = props;

  const [country, setCountry] = useState("");
  const [cities, setCities] = useState<CityData[] | []>([]);
  const debounceCountry = useDebounce(country, 200);
  const [isLoading, setIsLoading] = useState(false);
  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    setCountry(e.currentTarget.value);
  }

  return (
    <div className="search__wrapper">
      <input
        type="text"
        className="search__input"
        value={country}
        onChange={handleChangeSearch}
        onBlur={() => {
          setTimeout(() => {
            //   setCities([]);
            //   setCountry("");
          }, 300);
        }}
      ></input>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="search__icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
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

export default Search;
