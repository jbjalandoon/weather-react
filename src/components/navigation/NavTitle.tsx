import useCountryContext from "../../hooks/CountryHooks";
import "./NavTitle.css";

function NavTitle() {
  const { country } = useCountryContext();
  console.log(country)
  return (
    <span className="header__title">
      {country === null ? "Fetching..." : country.name}
    </span>
  );
}

export default NavTitle;
