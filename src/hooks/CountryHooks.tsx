import { useContext } from "react";
import { CountryContext } from "../context/CountryContext";

function useCountryContext() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("Something went wrong");
  }

  return context;
}
export default useCountryContext;
