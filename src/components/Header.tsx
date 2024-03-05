import { useState } from "react";
import "./header.css";
import MobileNav from "./navigation/MobileNav";
import NavActions from "./navigation/NavActions";
import NavLinks from "./navigation/NavLinks";
import NavTitle from "./navigation/NavTitle";
import useCountryContext from "../hooks/CountryHooks";

function Header() {
  const [toggle, setToggleNav] = useState(false);

  const { country, setCountry } = useCountryContext();

  async function getLocation(lat: number, long: number) {
    const url = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${long}`;
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": "FepNx2009aiODhuEpUeJuQ==eSNDaznaPlKYXeat",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    if (data.length > 0) {
      return data[0];
    } else {
      throw new Error("Something went wrong");
    }
  }

  if (country === null) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const data = await getLocation(lat, long);
        setCountry({
          name: data.name,
          country: data.country,
          latitude: lat,
          longitude: long,
        });
      });
    }
  }

  function handleToggleNav() {
    setToggleNav((value) => !value);
  }

  return (
    <header className="header container">
      <nav className="header__nav">
        <NavLinks />
        <NavTitle />
        <NavActions />
        <button className="header__hamburger" onClick={handleToggleNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="header__hamburger"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>
      <MobileNav toggle={toggle} />
    </header>
  );
}

export default Header;
