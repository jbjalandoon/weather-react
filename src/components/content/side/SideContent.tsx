import "./SideContent.css";
import weatherCodeJson from "../../../assets/weather.json";
import { ThreeDots } from "react-loader-spinner";
import { DailyForecastData } from "../Content";
import ForecastItem from "./forecast_side_item/ForecastItem";

function SideContent(props: { dailyForecast: DailyForecastData | null }) {
  let renderElement;

  const { dailyForecast } = props;

  if (!dailyForecast) {
    renderElement = <ThreeDots />;
  } else {
    const { weatherCode, time, temperatureMax, temperatureMin } =
      dailyForecast.data;

    const {
      temperatureMax: temperatureMaxUnits,
      temperatureMin: temperatureMinUnits,
    } = dailyForecast.units;
    console.log(dailyForecast.units);
    renderElement = (
      <div className="content__side-forecast-list">
        {time.map((e, i) => {
          const date = new Date(e);
          const weatherCodeString: string = weatherCode[i].toString();

          const weatherCodeImage =
            weatherCodeJson[weatherCodeString as keyof typeof weatherCodeJson]
              .day.image;

          return (
            <ForecastItem
              date={date}
              weatherCodeImage={weatherCodeImage}
              temperatureMax={temperatureMax[i]}
              temperatureMin={temperatureMin[i]}
              temperatureMaxUnits={temperatureMaxUnits}
              temperatureMinUnits={temperatureMinUnits}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div className="content__side-forecast">
      <div className="content__side-forecast-title">
        7 Days Weather Forecast
      </div>
      {renderElement}
    </div>
  );
}

export default SideContent;
