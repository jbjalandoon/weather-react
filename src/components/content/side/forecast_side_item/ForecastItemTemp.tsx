import "./ForecastItemTemp.css";

function ForecastItemTemp(props: {
  temperatureMax: number;
  temperatureMin: number;
  temperatureMaxUnits: string;
  temperatureMinUnits: string;
}) {
  const {
    temperatureMax,
    temperatureMin,
    temperatureMaxUnits,
    temperatureMinUnits,
  } = props;

  return (
    <div className="content__side-forecast-temp">{`${temperatureMin} ${temperatureMinUnits} ~ ${temperatureMax} ${temperatureMaxUnits}`}</div>
  );
}

export default ForecastItemTemp;
