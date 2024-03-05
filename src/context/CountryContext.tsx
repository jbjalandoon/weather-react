import { Dispatch, ReactNode, createContext, useState } from "react";
import { CityData } from "../components/navigation/SearchContainer";

export const CountryContext = createContext<{
  country: CityData | null;
  setCountry: Dispatch<React.SetStateAction<CityData | null>>;
} | null>(null);

function CountryContextProvider(props: { children: ReactNode }) {
  const [country, setCountry] = useState<CityData | null>(null);

  // to be fixed with geolocation javascript API
  // setCountry({
  //   name: "Manila",
  //   latitude: 14.5995,
  //   longitude: 120.9842,
  //   country: "PH",
  //   population: 100,
  //   is_capital: true,
  // });

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {props.children}
    </CountryContext.Provider>
  );
}

export default CountryContextProvider;
