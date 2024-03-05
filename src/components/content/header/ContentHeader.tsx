import { ThreeDots } from "react-loader-spinner";
import useCountryContext from "../../../hooks/CountryHooks";
import "./ContentHeader.css";
import { CurrentForecastData } from "../Content";

function ContentHeader(props: { currentForecast: CurrentForecastData | null }) {
  const { country } = useCountryContext();

  const { currentForecast } = props;

  return (
    <div className="main-forecast__header">
      <div className="main-forecast__title">
        <span className="main-forecast__weather">Weather Forecast</span>
        <span className="main-forecast__city">
          {country !== null ? (
            `${country.name} ${country.country}`
          ) : (
            <ThreeDots wrapperClass="three-dots__wrapper" />
          )}
        </span>
      </div>
      <div className="main-forecast__details">
        <div className="main-forecast__details-left">
          <img src="https://files.readme.io/48b265b-weather_icon_small_ic_clear3x.png" />
          <span>
            {currentForecast !== null ? (
              `${currentForecast.data.temperatureAvg} ${currentForecast.units.temperatureAvg}`
            ) : (
              <ThreeDots />
            )}
          </span>
        </div>
        <div className="main-forecast__details-right">
          <div className="main-forecast__details-item">
            Cloud Cover:{" "}
            {currentForecast !== null ? (
              `${currentForecast.data.cloudCover} ${currentForecast.units.cloudCover}`
            ) : (
              <ThreeDots wrapperClass="three-dots__daily-forecast" />
            )}
          </div>
          <div className="main-forecast__details-item">
            Feels Like:{" "}
            {currentForecast !== null ? (
              `${currentForecast.data.apparentTemperature} ${currentForecast.units.apparentTemperature}`
            ) : (
              <ThreeDots wrapperClass="three-dots__daily-forecast" />
            )}
          </div>
          <div className="main-forecast__details-item">
            Wind Speed:{" "}
            {currentForecast !== null ? (
              `${currentForecast.data.windSpeed} ${currentForecast.units.windSpeed}`
            ) : (
              <ThreeDots wrapperClass="three-dots__daily-forecast" />
            )}
          </div>
          <div className="main-forecast__details-item">
            Humidity:{" "}
            {currentForecast !== null ? (
              `${currentForecast.data.relativeHumidity} ${currentForecast.units.relativeHumidity}`
            ) : (
              <ThreeDots wrapperClass="three-dots__daily-forecast" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;
