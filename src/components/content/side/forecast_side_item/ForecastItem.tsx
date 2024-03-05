import "./ForecastItem.css";
import ForecastItemDate from "./ForecastItemDate";
import ForecastItemImage from "./ForecastItemImage";
import ForecastItemTemp from "./ForecastItemTemp";

function ForecastItem(props: {
  date: Date;
  weatherCodeImage: string;
  temperatureMax: number;
  temperatureMin: number;
  temperatureMaxUnits: string;
  temperatureMinUnits: string;
}) {
  const {
    date,
    weatherCodeImage,
    temperatureMax,
    temperatureMin,
    temperatureMaxUnits,
    temperatureMinUnits,
  } = props;

  const [month, week] = date
    .toLocaleDateString("en-US", {
      month: "long",
      weekday: "long",
    })
    .split(" ");
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });

  return (
    <div className="content__side-forecast-list-item">
      <ForecastItemDate month={month} week={week} day={day}></ForecastItemDate>
      <ForecastItemImage img={weatherCodeImage} />
      <ForecastItemTemp
        temperatureMax={temperatureMax}
        temperatureMin={temperatureMin}
        temperatureMaxUnits={temperatureMaxUnits}
        temperatureMinUnits={temperatureMinUnits}
      />
    </div>
  );
}

export default ForecastItem;
